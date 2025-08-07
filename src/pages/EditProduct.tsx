// src/pages/EditProduct.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ title: '', description: '', price: 0 });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data() as typeof product);
      } else {
        console.error('Product not found');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...product,
      price: parseFloat(String(product.price)),
    });
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={product.title}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Title"
          required
        />
        <input
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Description"
          required
        />
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Price"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
