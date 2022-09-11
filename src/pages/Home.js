import React from 'react';
import GoodTeam from "../assets/Goodteam.png";
import { useTour } from "@reactour/tour";
const Home = () => {
  const { setIsOpen } = useTour();
  return (

    <>
      <section>
        <div className='homeContainer'>
          <div style={{ maxWidth: "400px" }}>
            <div className="centered text-4xl h-screen">Introduction</div>
            <h1>Welcome to Inventory Management System</h1>
            <p>welcome to your inventory system, here you can add the new
              and existing items of your business, delete those that you no
              longer have and edit the data as you need</p>
            <p>This guide will help you improve your inventory management.</p>
            <button onClick={() => setIsOpen(true)}>Start Tour!</button>
          </div>
          <div>
            <img src={GoodTeam} className="GoodTeam" alt="GoodTeam img" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home