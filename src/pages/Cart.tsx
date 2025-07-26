import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { removeFromCart, clearCart } from '../features/cart.Reducer';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    sessionStorage.removeItem('cart');
    alert('✅ Checkout successful! Your cart has been cleared.');
  };

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="container">
      <h1 className="page-title">Your Cart</h1>
      <ul className="cart-list" style={{ padding: 0 }}>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="card"
            style={{
              listStyle: 'none',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ height: '80px', width: '80px', objectFit: 'contain' }}
            />
            <div>
              <h3>{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>

      <hr />
      <p><strong>Total Items:</strong> {totalItems}</p>
      <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>

      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      <button onClick={handleCheckout} style={{ marginLeft: '1rem' }}>Checkout</button>
    </div>
  );
};

export default Cart;
