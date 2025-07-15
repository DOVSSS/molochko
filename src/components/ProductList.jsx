import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, cart, updateQuantity }) => {
  return (
    <div className="product-list">
      
      {products.map(product => (
        <ProductItem 
          key={product.id}
          product={product}
          quantity={cart[product.id] || 0}
          updateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
};

export default ProductList;