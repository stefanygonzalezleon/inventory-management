import React from 'react';
import '../App.css';
import { NavLink } from "react-router-dom";
import {
  BsHouse,
  BsCollectionFill,
  BsBoxSeam,
} from "react-icons/bs";
import logo from "../assets/logo.png";


const SideBar = () => {
  return (

    <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
      <i><img src={logo} style={{ width: "70px" }} alt='logo'></img></i>
      <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center">
        <li className="nav-item">
          <div className="nav-link py-3 px-2" data-bs-placement="right" >
            <i>< BsHouse /></i><NavLink to="/"> Home</NavLink>
          </div>
        </li>
        <li>
          <div className="nav-link py-3 px-2" data-bs-placement="right" >
            <i>< BsCollectionFill /></i><NavLink data-tour="step-1" to="/items"> Items</NavLink>
          </div>
        </li>
        <li>
          <div className="nav-link py-3 px-2" data-bs-placement="right" >
            <i><BsBoxSeam /></i><NavLink data-tour="step-5" to="/stocks"> Stocks</NavLink>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default SideBar;