using System.ComponentModel.DataAnnotations;
using DTO;

namespace Model
{
    public class Product
    {
        public Product() { }
        public Product(ProductDTO product)
        {
            this.Name = product.Name;
            this.Description = product.Description;
            this.Category = product.Category;
            this.Stock = product.Stock;
            this.Price = product.Price;
        }
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Stock { get; set; }
        public double Price { get; set; }
    }
}
