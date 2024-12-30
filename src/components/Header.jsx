import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='main-header'>
      <div>
        <button>
            <Link to='/'>Home</Link>
        </button>
        <button>
            <Link to='/exchanges'>Exchanges</Link>
        </button>
        <button>
            <Link to='/coins'>Coins</Link>
        </button>
      </div>
    </div>
  )
}

export default Header
