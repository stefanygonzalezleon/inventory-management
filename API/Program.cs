using dbContext;
using DTO;
using Microsoft.EntityFrameworkCore;
using Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var conectionstring = builder.Configuration.GetConnectionString("sqlite");
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DBContext>((options) => options.UseSqlite(conectionstring));
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => 
    {
        policy.WithOrigins(builder.Configuration["AllowedHosts"]);
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapPost("/Product", async (ProductDTO product, DBContext db) =>
{
    Product dbProduct = new(product);
    await db.AddAsync(dbProduct);
    await db.SaveChangesAsync();
    return Results.Ok(dbProduct);
});

app.MapGet("/ProductAll", (DBContext db) =>
{
    return Results.Ok(db.Products.ToList());
});

app.MapGet("/ProductId", async (int id, DBContext db) =>
{
    var product = await db.Products.Where((w) => w.Id == id).FirstOrDefaultAsync();
    if (product is null)
    {
        return Results.NotFound("No existe dicho producto");
    }
    return Results.Ok(product);
});

app.MapGet("/ProductName", async (string name, DBContext db) =>
{

    var product = await db.Products.Where((w) => w.Name == name).FirstOrDefaultAsync();
    if (product is null)
    {
        return Results.NotFound("No existe dicho producto");
    }
    return Results.Ok(product);
});

app.MapDelete("/ProductId", async (int id, DBContext db) =>
{
    var product = await db.Products.Where((w) => w.Id == id).FirstOrDefaultAsync();
    if (product is null)
    {
        return Results.NotFound("No existe dicho producto");
    }
    db.Remove(product);
    await db.SaveChangesAsync();
    return Results.Ok("Se elimino correctamente el producto");
});

app.MapPut("/Product", async (int id, ProductDTO2 product, DBContext db) =>
{
    var dbProduct = await db.Products.Where((w) => w.Id == id).FirstOrDefaultAsync();
    if (dbProduct is null)
    {
        return Results.NotFound("No existe dicho producto");
    }
    dbProduct.Name = product.Name;
    dbProduct.Category = product.Category;
    dbProduct.Description = product.Description;
    dbProduct.Price = product.Price;
    await db.SaveChangesAsync();
    return Results.Ok("Se actualizo el producto correctamente");
});

app.MapPut("ProductStock", async (int id, int newStock, DBContext db) =>
{
    var dbProduct = await db.Products.Where((w) => w.Id == id).FirstOrDefaultAsync();
    if (dbProduct is null)
    {
        return Results.NotFound("No existe dicho producto");
    }
    dbProduct.Stock = newStock;
    await db.SaveChangesAsync();
    return Results.Ok("Se a actualizado el stock del producto");
});

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

