import type { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from './features/cart/cartReducer';

export function renderWithStore(
  ui: React.ReactElement,
  { preloadedState }: { preloadedState?: any } = {}
) {
  const store = configureStore({
    reducer: { cart: cartReducer } as any,
    preloadedState: preloadedState as any,
  });

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
