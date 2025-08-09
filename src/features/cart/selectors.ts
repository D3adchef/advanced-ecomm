// src/features/cart/selectors.ts
import type { RootState } from '../../store';

export const selectCartTotalQty = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + (i.quantity ?? 0), 0);
