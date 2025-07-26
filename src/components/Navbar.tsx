import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Link } from 'react-router-dom';
import MiniCart from './MiniCart';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#222', color: 'white', position: 'relative' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h2>FakeStore</h2>
      </Link>

      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', position: 'relative' }}
        >
          🛒 ({totalQuantity})
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              right: 0,
              width: '250px',
              background: 'white',
              border: '1px solid #ccc',
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 1000,
              color: '#000',
            }}
          >
            <MiniCart />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
