import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../index";
import { Link } from "react-router-dom";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [error, setError] = useState(false);

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&order=market_cap_desc`
        );
        setCoins(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency]);

  const getHigh3Coins = () => {
    return [...coins]
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 3);
  };
  const getLow3Coins = () => {
    return [...coins]
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 3);
  };

  return (
    <div className="home">
      {loading ? (
        <div className="loading-exchanges"></div>
      ) : error ? (
        <p>Error fetching data. Please try again later.</p>
      ) : (
        <>
          <div className="currency-radio">
            <div>
              <select
                name="currency"
                id="currency"
                onChange={(e) => setCurrency(e.target.value)}
                value={currency}
                className="currency"
              >
                <option value="inr">₹ INR</option>
                <option value="usd">$ USD</option>
                <option value="eur">€ EUR</option>
              </select>
            </div>
          </div>
          <div className="high-low-coins">
            <h2>Highest Three (24h)</h2>
            <div className="highest-coins">
              {getHigh3Coins().map((coin) => (
                <Link key={coin.id} to={`/coins/${coin.id}`} className="coin-card">
                  <img src={coin.image} alt="" />
                  <h3>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </h3>
                  <p>
                    Current Price: {currencySymbol}
                    {coin.current_price.toLocaleString()}
                  </p>
                  <p>
                  Price Change Percentage (24h): {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </Link>
              ))}
            </div>
            <hr />
            <h2>Lowest Three (24h)</h2>
            <div className="lowest-coins">
              {getLow3Coins().map((coin) => (
                <Link key={coin.id} to={`/coins/${coin.id}`} className="coin-card">
                  <img src={coin.image} alt="" />

                  <h3>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </h3>
                  <p>
                    Current Price: {currencySymbol}
                    {coin.current_price.toLocaleString()}
                  </p>
                  <p>
                    Price Change Percentage (24h): {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </Link>
              ))}
            </div>
            
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
