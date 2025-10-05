// src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { useDebounce } from "use-debounce";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);
        if (category) params.append("category", category);

        const response = await api.get(`/products?${params.toString()}`);
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm, category]);

  return (
    <div className="homepage-container">
      {/* NEW: Hero Search Section */}
      <div className="hero-section">
        <h1 className="hero-title">Explore the Marketplace</h1>
        <p className="hero-subtitle">
          Find what you're looking for, or sell your own items.
        </p>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Filter by category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {loading && <p className="message">Loading...</p>}
      {error && <p className="message error">{error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <p className="message">No products found for your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
