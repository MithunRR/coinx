import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const {data} = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
      
    }
    fetchExchanges();
  }, [])

  if(error){
    return <div style={{color: 'red', textAlign: 'center'}}>Error While Fetching Exchanges</div>
  }

  return (
    <div className='exchanges-main'>
      {
        loading ? (
          <div className='loading-exchanges'>

          </div>
        ) : (
          <div className="exchanges">
            {
              exchanges.map((exchange) => (
                <ExchangeCard name={exchange.name} image={exchange.image} rank={exchange.trust_score_rank} url={exchange.url} key={exchange.id} /> // <exchange />
                // <div className="exchanges-item">
                //   <img src={exchange.image} alt="" />
                //   <span>{exchange.name}</span>
                // </div>
              ))
            }
          </div>
        )
      }
      
    </div>
  )
};

const ExchangeCard = ({image, name, rank, url}) => {
  return (
    <a className="exchanges-item" href={url} target='blank'>
      <span>({rank})</span>
      <img src={image} alt="" />
      <span>{name}</span>
    </a>
  )
}

export default Exchanges
