import React from 'react';
import './ProductCard.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  stockQty: number;
  tags: string[];
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageURL} alt={product.name} className="product-card-image" />
      <div className="product-card-details">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <p className="product-card-stock">Stock: {product.stockQty}</p>
        <div className="product-card-tags">
          {product.tags.map(tag => (
            <span key={tag} className="product-card-tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;