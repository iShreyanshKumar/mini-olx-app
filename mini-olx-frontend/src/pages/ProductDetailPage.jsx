// src/pages/ProductDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);

        if (isAuthenticated) {
          const wishlistRes = await api.get("/wishlist");
          const isInWishlist = wishlistRes.data.some(
            (item) => Number(item.id) === Number(response.data.id)
          );
          setIsWishlisted(isInWishlist);
        }
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, isAuthenticated]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      if (isWishlisted) {
        await api.delete(`/wishlist/${id}`);
        setIsWishlisted(false);
      } else {
        await api.post("/wishlist", { productId: id });
        setIsWishlisted(true);
      }
    } catch (err) {
      alert("Could not update wishlist.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        navigate("/");
      } catch (err) {
        setError("Failed to delete the product.");
      }
    }
  };

  if (loading) return <p className="message">Loading...</p>;
  if (error) return <p className="message error">{error}</p>;
  if (!product) return <p className="message">Product not found.</p>;

  const isOwner = user && user.id === product.owner_id;

  // FIX: Changed to use the local placeholder image for consistency.
  const placeholderImage = "/placeholder.png";

  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <div className="page-container product-detail-container">
      <div className="product-image-container">
        <img
          src={product.image_url || placeholderImage}
          alt={product.title}
          className="product-detail-image"
          onError={handleImageError}
        />
      </div>

      <div className="product-detail-info">
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
        <p className="category">Category: {product.category}</p>
        <p className="description">{product.description}</p>

        {isAuthenticated && (
          <button onClick={handleWishlistToggle} className="button-wishlist">
            {isWishlisted ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
          </button>
        )}

        {isOwner && (
          <div className="owner-actions">
            <Link to={`/edit-product/${id}`} className="button-edit">
              Edit
            </Link>
            <button onClick={handleDelete} className="button-delete">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
