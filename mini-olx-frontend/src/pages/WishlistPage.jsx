// src/pages/WishlistPage.jsx

import React, { useState, useEffect } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get("/wishlist");
        setWishlist(response.data);
      } catch (err) {
        setError("Failed to fetch wishlist.");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) return <p className="message">Loading your wishlist...</p>;
  if (error) return <p className="message error">{error}</p>;

  return (
    <div className="page-container">
      <h2>My Wishlist</h2>
      <div className="product-grid">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="message">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
