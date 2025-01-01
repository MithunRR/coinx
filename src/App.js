import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Coins from './components/Coins';
import Exchanges from './components/Exchanges';
import CoinDetails from './components/CoinDetails';
import Footer from './components/Footer';

import './styles/App.css';
import "./styles/header.css";
import "./styles/exchanges.css";
import "./styles/coin_details.css";
import "./styles/footer.css";
import "./styles/home.css";

export const CoinContext = createContext();

function App() {
  const [coin, setCoin] = useState({});

  return (
    <CoinContext.Provider value={{ coin, setCoin }}>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/coins/:id" element={<CoinDetails />} />
        </Routes>
        <Footer/>
      </Router>
    </CoinContext.Provider>
  );
}

export default App;
