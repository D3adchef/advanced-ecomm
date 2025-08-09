import reducer, { addToCart } from '../features/cart/cartReducer';

const blank = () => ({ items: [] as any[] });

test('addToCart adds a new item with quantity=1', () => {
  const payload = { id: 'a1', title: 'X', price: 10, image: '', quantity: 1 };
  const next = reducer(blank(), addToCart(payload));
  expect(next.items).toHaveLength(1);
  expect(next.items[0]).toMatchObject({ id: 'a1', quantity: 1 });
});
