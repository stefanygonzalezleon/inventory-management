import { React, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { BsFillPenFill, BsFillEraserFill } from "react-icons/bs";
import showcase from "../assets/showcase.png"

function Items() {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [productSelected, setProductSelected] = useState({
        name: '',
        description: '',
        category: '',
        stock: 0,
        price: 0
    });
    const [searchItem, setSearchItem] = useState("");

    useEffect(() => {
        getAllProduct();
    }, [])

    const getAllProduct = async () => {
        await axios.get("https://localhost:7051/ProductAll")
            .then(response => {
                setProducts(response.data)
            })
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setProductSelected(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSearchChange = e => {
        const { value } = e.target;
        setSearchItem(value);
    }

    const peticionPost = async () => {
        const response = await axios.post("https://localhost:7051/Product", productSelected);
        setProducts([...products, response.data])
        handleClose()
    }

    const DeleteItem = async (id) => {
        await axios.delete(`https://localhost:7051/ProductId?id=${id}`)
        setProducts(products.filter(item => item.id !== id));
    }

    const peticionPut = async (id) => {
        await axios.put(`https://localhost:7051/Product?id=${id}`, productSelected)
        products.find(item => item.id === id).name = productSelected.name;
        products.find(item => item.id === id).description = productSelected.description;
        products.find(item => item.id === id).category = productSelected.category;
        products.find(item => item.id === id).stock = productSelected.stock;
        products.find(item => item.id === id).price = productSelected.price;
        setProducts(products);
        editClose()
    }

    const renderAllProducts = (list) => {
        const products = searchItem.length !== 0 ? list.filter(i =>
            i.name.includes(searchItem) ||
            i.description.includes(searchItem) ||
            i.category.includes(searchItem) ||
            `${i.stock}`.includes(searchItem) ||
            `${i.price}`.includes(searchItem)) : list;

        return products.map((product) => <>
            <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td> {product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                <td><Button className='edit' variant="light" onClick={() => editShow(product.id)}><BsFillPenFill /></Button>{" "}
                    <Button className='delete' variant="light" onClick={() => DeleteItem(product.id)}><BsFillEraserFill /></Button></td>
            </tr>
        </>
        )
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const editClose = () => setShowEdit(false);
    const editShow = (id) => {
        setProductSelected(products.find(p => p.id === id));
        setShowEdit(true)
    };

    return (
        <>
            <h1>Inventory Management</h1>
            <div className='showcase'>
                <div>
                    <h3>Track all product information.</h3>
                    <Button className='addItem_btn' variant="primary" onClick={handleShow}>
                        Add item
                    </Button>
                </div>
                <div>
                    <img className='showcase_img' src={showcase} alt="showcase_img"></img>
                </div>
            </div>
            <div>
                <div className="form-outline mb-4">
                    <input type="search" className="form-control" id="datatable-search-input" placeholder='search' onChange={handleSearchChange} />
                    <label className="form-label" for="datatable-search-input"></label>
                </div>
            </div>

            <div className='tableContainer'>
                <Table responsive>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">category</th>
                            <th scope="col">stock</th>
                            <th scope="col">price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products != null ? renderAllProducts(products) : null}
                    </tbody>
                </Table>
            </div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                name='name'
                                type="string"
                                placeholder="name"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                required
                                name='description'
                                type="string"
                                placeholder="description"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>category</Form.Label>
                            <Form.Control
                                required
                                name='category'
                                type="string"
                                placeholder="category"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                required
                                name='stock'
                                type="number"
                                placeholder="stock"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                required
                                name='price'
                                type="number"
                                placeholder="price"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={peticionPost}>
                        Add Item
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal centered show={showEdit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name='name'
                                type="string"
                                autoFocus
                                onChange={handleChange}
                                value={productSelected && productSelected.name}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name='description'
                                type="string"
                                autoFocus
                                onChange={handleChange}
                                value={productSelected && productSelected.description}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>category</Form.Label>
                            <Form.Control
                                name='category'
                                type="string"
                                autoFocus
                                onChange={handleChange}
                                value={productSelected && productSelected.category}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                name='stock'
                                type="number"
                                autoFocus
                                onChange={handleChange}
                                value={productSelected && productSelected.stock}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                name='price'
                                type="number"
                                autoFocus
                                onChange={handleChange}
                                value={productSelected && productSelected.price}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={editClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => peticionPut(productSelected.id)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default Items;

