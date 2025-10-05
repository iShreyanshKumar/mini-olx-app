// src/components/ProductCard.jsx

import React from "react";
import { Link } from "react-router-dom";

// We need to pass the 'index' prop for the animation delay
const ProductCard = ({ product, index }) => {
  if (!product) {
    return null; // Render nothing if the product is null or undefined
  }

  // FIX: Use an absolute path to the image in the 'public' folder.
  const placeholderImage = "/placeholder.png";

  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  // Apply animation delay based on the index
  const cardStyle = {
    animationDelay: `${index * 0.05}s`,
  };

  return (
    <div className="product-card" style={cardStyle}>
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image_url || placeholderImage}
          alt={product.title}
          className="product-image"
          onError={handleImageError}
        />
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>
          <p className="product-category">{product.category}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
