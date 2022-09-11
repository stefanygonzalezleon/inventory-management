import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Items from '../pages/Items.js'
import Stocks from "../pages/Stocks";
import { useTour } from "@reactour/tour";


import steps from "../steps";

const NavPage = () => {

  let location = useLocation();

  const { setSteps, setCurrentStep } = useTour();

  useEffect(() => {

    setCurrentStep(0);

    if (location.pathname === "/page-1") {
      setSteps([
        {
          selector: '[data-tour="step-page"]',
          content: "text page"
        }
      ]);
    } else if (location.pathname === "/page-5") {
      setSteps([
        {
          selector: '[data-tour="step-5"]',
          content: "text page 5"
        }
      ]);
    } else {
      setSteps(steps);
    }
  }, [location.pathname, setCurrentStep, setSteps]);

  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/stocks" element={<Stocks />} />
        </Routes>
      </section>
    </>
  );
};

export default NavPage;