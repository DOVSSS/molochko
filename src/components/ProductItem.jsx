import React from 'react';

const ProductItem = ({ product, quantity, updateQuantity }) => {
  return (
    <div className="product-item">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="quantity-control">
          <button onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}>
            -
          </button>
          <span>{quantity || 0}</span>
          <button onClick={() => updateQuantity(product.id, (quantity || 0) + 1)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;