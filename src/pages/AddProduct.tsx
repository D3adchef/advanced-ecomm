import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await addDoc(collection(db, 'products'), {
        title,
        price,
        description,
        image,
      });
      navigate('/'); // go back to homepage after adding
    } catch (err: any) {
      console.error('Error adding product:', err.message);
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#222', color: 'white', border: 'none' }}>
          Add Product
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
