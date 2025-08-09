import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { removeFromCart } from '../features/cart/cartReducer';
import { Link } from 'react-router-dom';

const MiniCart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}
            >
              <div>
                <strong>{item.title.slice(0, 10)}...</strong>
                <br />
                <small>Qty: {item.quantity}</small>
              </div>
              <div>
                <button
                  aria-label={`remove-${item.id}`}
                  onClick={() => handleRemove(item.id)}
                  style={{ fontSize: '0.8rem' }}
                  title="Remove from cart"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
          <p>
            <strong>Total: ${total}</strong>
          </p>
          <Link to="/cart">
            <button>Go to Cart</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default MiniCart;
