import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Link } from 'react-router-dom';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = new Array(132).fill(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
      
    }
    fetchCoins();
  }, [currency, page])

  if(error){
    return <div style={{color: 'red', textAlign: 'center'}}>Error While Fetching Coins</div>
  }

  return (
    <div className='exchanges-main'>
      {
        loading ? (
          <div className='loading-exchanges'>

          </div>
        ) : (
          <>
            <div className="currency-radio">
              <div>
                <select name="currency" id="currency" onChange={(e) => setCurrency(e.target.value)} value={currency} className="currency">
                  <option value="inr">₹ INR</option>
                  <option value="usd">$ USD</option>
                  <option value="eur">€ EUR</option>
                </select>
              </div>
            </div>
            <div className="exchanges">
              {
                coins.map((exchange) => (
                  <CoinCard key={exchange.id} name={exchange.name} image={exchange.image} price={exchange.current_price} id={exchange.id} currencySymbol={currencySymbol} /> // <exchange />
                ))
              }
            </div>
          </>
        )
      }

      <div className="change-page">
        {
          btns.map((item, index) => (
            <button key={index} onClick={() => changePage(index + 1)}>{index + 1}</button>
          ))
        }

        {/* <button onClick={() => changePage(2)}>2</button>
        <button onClick={() => changePage(3)}>3</button>
        <button onClick={() => changePage(4)}>4</button> */}
      </div>
      
    </div>
  )
};

const CoinCard = ({image, name, price, id, currencySymbol="₹"}) => {
  return (
    <Link to={`/coins/${id}`} className="exchanges-item">
      <img src={image} alt="" />
      <span>{name}</span>
      <span>{currencySymbol} {price}</span>
    </Link>
  )
}

export default Coins
