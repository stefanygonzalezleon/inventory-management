import { React } from 'react'
import { BrowserRouter } from "react-router-dom";
import './App.css';
import MainPage from './components/MainPage';
import { TourProvider } from "@reactour/tour";
import steps from "./steps";
function App() {

  return (
    <>
      <BrowserRouter>
        <TourProvider steps={steps}>
          <MainPage />
        </TourProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
