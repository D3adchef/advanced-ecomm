// src/pages/Cart.tsx
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart, clearCart } from '../features/cart/cartReducer';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} style={{ marginBottom: '1rem', borderBottom: '1px solid gray' }}>
              <img src={item.image} alt={item.title} style={{ width: '100px' }} />
              <h4>{item.title}</h4>
              <p>${item.price} x {item.quantity}</p>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
