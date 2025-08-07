// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartReducer';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div>
      <h2>All Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid red', padding: '1rem' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%' }} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}>
              Add to Cart
            </button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
