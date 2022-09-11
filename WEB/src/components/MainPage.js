import React from "react";
import Sidebar from './Sidebar'
import NavPage from './NavPage'
import '../App.css';

const MainPage = () => {
  return (
    <>
      <section>
        <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-auto bg-light sticky-top' style={{padding: "35px"}}>
              <Sidebar/>
          </div>
          <div className='col-sm p-3 min-vh-100' id="pageSection">
              <NavPage
              />
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;