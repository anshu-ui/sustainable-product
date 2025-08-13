import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Dashboard.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  stockQty: number;
  tags: string[];
  category: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `http://localhost:5000/api/products?category=${filter}`;
        const response = await axios.get<Product[]>(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [filter]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Sustainable Products</h1>
      <div className="filter-buttons">
        <button onClick={() => setFilter('')}>All</button>
        <button onClick={() => setFilter('Home Goods')}>Home Goods</button>
        <button onClick={() => setFilter('Apparel')}>Apparel</button>
        <button onClick={() => setFilter('Electronics')}>Electronics</button>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;