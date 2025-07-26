import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart.Reducer';

// 🧠 Load from sessionStorage
const loadCartFromSession = () => {
  try {
    const serializedCart = sessionStorage.getItem('cart');
    if (serializedCart === null) return undefined;
    return { cart: JSON.parse(serializedCart) };
  } catch (e) {
    console.error('Failed to load cart from sessionStorage', e);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCartFromSession(),
});

// 💾 Save to sessionStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedCart = JSON.stringify(state.cart);
    sessionStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.error('Failed to save cart to sessionStorage', e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
