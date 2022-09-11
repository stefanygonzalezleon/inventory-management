import { React, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { BsFillPenFill } from "react-icons/bs";
import '../App.css';
import Completed from "../assets/Completed-rafiki.png"
import boxes from "../assets/boxes.png"
import Order from "../assets/Spreadsheets-cuate.png"
import Prioritize from "../assets/Spreadsheets-bro.png"


const Stocks = () => {
  const [show, setShow] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [stocksSelected, setstocksSelected] = useState({
    name: '',
    stock: 0
  });

  useEffect(() => {
    getProductStocks();
  }, [])

  const getProductStocks = async () => {
    await axios.get("https://localhost:7051/ProductAll")

      .then(response => {
        setStocks(response.data)
        // console.log("length : " + response.data.length);
      })
  }
  const totalItems = stocks.length;

  const handleChange = e => {
    const { name, value } = e.target;
    setstocksSelected(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const peticionstocksPut = async (item) => {
    await axios.put(`https://localhost:7051/ProductStock?id=${item.id}&newStock=${item.stock}`)
    stocks.find(s => s.id === item.id).stock = item.stock;
    setStocks(stocks);
    editClose()
  }
  const renderProductStocks = (list) => {
    return list.map((product) => <>
      <tr key={product.id}>
        <th scope="row">{product.id}</th>
        <td> {product.name}</td>
        <td>{product.stock}</td>
        <td><Button className="addStocks" variant="light" onClick={() => editShow(product.id)}><BsFillPenFill /></Button></td>
      </tr>
    </>
    )
  }
  const editClose = () => setShow(false);
  const editShow = (id) => {
    setstocksSelected(stocks.find(p => p.id === id));
    setShow(true)
  };

  return (
    <>
      <div className='stockMetrix'>
        <div className='stockltitle'>
          <h3>Be consistent in how you receive stock</h3>
        </div>
        <div className='stockcount'>
          <h3>Items</h3>
          <h3>{totalItems}</h3>
          <img src={boxes} alt="boxes"></img>
        </div>
      </div>

      <div className='tableContainer'>
        <Table responsive>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">stock</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks != null ? renderProductStocks(stocks) : null}
          </tbody>
        </Table>
      </div>
      <div className='stocks_showcase'>
        <div className='tips'>
          <h3>Do you have your stock up to date?</h3>
          <img className='showcase_img' src={Completed} alt="showcase_img"></img>
        </div>
        <div className='tips'>
          <h3>Order restocks yourself.</h3>
          <img className='showcase_img' src={Order} alt="showcase_img"></img>
        </div>
        <div className='tips'>
          <h3>Prioritize your inventory.</h3>
          <img className='showcase_img' src={Prioritize} alt="showcase_img"></img>
        </div>
      </div>

      <Modal centered show={show} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                name='stock'
                type="number"
                autoFocus
                onChange={handleChange}
                value={stocksSelected && stocksSelected.stock}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => peticionstocksPut(stocksSelected)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Stocks;