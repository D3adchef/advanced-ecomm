import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from '../api/products';

import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart.Reducer';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const dispatch = useDispatch();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () =>
      selectedCategory === 'all'
        ? fetchAllProducts()
        : fetchProductsByCategory(selectedCategory),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>All Products</h1>

      {/* Category Filter */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="category-select">Filter by Category: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories?.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products?.map((product: any) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>

            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                )
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
