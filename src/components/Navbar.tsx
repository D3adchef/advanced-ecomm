// src/components/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import MiniCart from './MiniCart';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: '#222',
      color: 'white',
      position: 'relative'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h2>FakeStore</h2>
      </Link>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
            <Link to="/add-product" style={{ color: 'white', textDecoration: 'none' }}>Add Product</Link>
            <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Sign Up</Link>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          </>
        )}

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
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
      </div>
    </nav>
  );
};

export default Navbar;
