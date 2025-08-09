import reducer, { addToCart } from '../features/cart/cartReducer';

const blank = () => ({ items: [] as any[] });

test('adding same id twice increments quantity', () => {
  const payload = { id: 'a1', title: 'X', price: 10, image: '', quantity: 1 };
  const s1 = reducer(blank(), addToCart(payload));
  const s2 = reducer(s1, addToCart(payload));
  const line = s2.items.find(i => i.id === 'a1');
  expect(line?.quantity).toBe(2);
});
