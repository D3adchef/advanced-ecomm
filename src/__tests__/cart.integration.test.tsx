import { screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { renderWithStore } from '../test-utils';
import { addToCart } from '../features/cart/cartReducer';

function CartCount() {
  const qty = useSelector((s: any) =>
    (s.cart.items ?? []).reduce((sum: number, it: any) => sum + (it.quantity ?? 0), 0)
  );
  return <div data-testid="cart-count">{qty}</div>;
}

function AddButton() {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() =>
        dispatch(addToCart({ id: 'a1', title: 'X', price: 10, image: '', quantity: 1 }))
      }
    >
      Add to Cart
    </button>
  );
}

test('clicking Add increments cart count', () => {
  renderWithStore(
    <>
      <CartCount />
      <AddButton />
    </>,
    { preloadedState: { cart: { items: [] } } }
  );

expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  fireEvent.click(screen.getByText(/add to cart/i));
  expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
});
