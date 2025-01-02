import React, { useState, useEffect } from "react";
import axios from 'axios'
import { server } from '../index'
import { useParams } from "react-router-dom";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const params = useParams();

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const high = coin.market_data?.high_24h?.[currency] || 0;
  const low = coin.market_data?.low_24h?.[currency] || 0;
  const currentPrice = coin.market_data?.current_price?.[currency] || 0;
  const range = high - low || 1; 
  const lowPercentage = ((currentPrice - low) / range) * 100;
  const highPercentage = 100 - lowPercentage;

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}`);
        // console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id]);

  if (error) {
    return <div>Error while fetching coin details</div>;
  }

  return (
    <div className="coin-details-main">
      {loading ? (
        <div className="loading-coin-details"></div>
      ) : (
        <div className="coin-details">
          <div className="currency-radio">
            <div>
              <select name="currency" id="currency" onChange={(e) => setCurrency(e.target.value)} value={currency} className="currency">
                <option value="inr">₹ INR</option>
                <option value="usd">$ USD</option>
                <option value="eur">€ EUR</option>
              </select>
            </div>
          </div>

          <div className="last-update">
            <h4>Last Updated On : {Date(coin.market_data.last_updated).split("G")[0]}</h4>
          </div>

          <div className="details">
            <div id="coin-logo">
              <img src={coin.image.large} alt={coin.name} />
              <div id="coin-name">
                <div>
                  <h3>{coin.name}({coin.symbol})</h3>
                  <h2>{currencySymbol} {coin.market_data.current_price[currency]}</h2>
                </div>
                <div>
                  <h1 id="coin-rank">#{coin.market_data.market_cap_rank}</h1>
               </div>
              </div>
            </div>
            <div id="coin-description">
              <div className="perc-up-down-arrow" style={{ display: "flex", alignItems: "center" }}>
                {coin.market_data.price_change_percentage_24h > 0 ? (
                  <h2 className="arrow-up" style={{ color: "green" }}>&#11205;</h2>
                ) : (
                  <h2 className="arrow-down" style={{ color: "red" }}>&#11206;</h2>
                )}
                <h4>{coin.market_data.price_change_percentage_24h} %</h4>
              </div>

              <div id="low-high-bar">
                <div id="low-bar" style={{ width: `${lowPercentage}%`, backgroundColor: "lightgreen" }}></div>
                <div id="high-bar" style={{ width: `${highPercentage}%`, backgroundColor: "grey" }}></div>
              </div>

              <div id="low-high-24" style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
                <h4 style={{ color: "red", marginRight: "1rem" }}> {currencySymbol}{coin.market_data.low_24h[currency]}</h4>
                <h5 style={{ color: "grey",}}>24_HR_RANGE</h5>
                <h4 style={{ color: "green", marginLeft: "1rem" }}> {currencySymbol}{coin.market_data.high_24h[currency]}</h4>
              </div>

              <h4 style={{ marginTop: "10px", width: "100%", textAlign: "center", color: "grey" }}>OTHER DETAILS</h4>

              <div className="max-supply" style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                <h4>Max Suppy</h4>
                <h4 style={{ color: "grey" }}>{coin.market_data.max_supply}</h4>
              </div>

              <div className="max-supply" style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                <h4>Circulating Supply</h4>
                <h4 style={{ color: "grey" }}>{coin.market_data.circulating_supply}</h4>
              </div>

              <div className="max-supply" style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                <h4>Market Cap</h4>
                <h4 style={{ color: "grey" }}>{currencySymbol} {coin.market_data.market_cap[currency]}</h4>
              </div>

              <div className="max-supply" style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                <h4>All Time Low</h4>
                <h4 style={{ color: "grey" }}> {currencySymbol} {coin.market_data.atl[currency]}</h4>
              </div>

              <div className="max-supply" style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                <h4>All Time High</h4>
                <h4 style={{ color: "grey" }}> {currencySymbol} {coin.market_data.ath[currency]}</h4>
              </div>

            </div>
          </div>
          {/* Add your coin details content here */}
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
