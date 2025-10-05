// src/pages/AddProductPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddProductPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !category) {
      setError("Please fill all required fields.");
      return;
    }

    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      category,
      image_url: imageUrl || null,
    };

    try {
      await api.post("/products", newProduct);
      navigate("/");
    } catch (err) {
      setError("Failed to add product.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Add a New Product</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL (Optional)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
