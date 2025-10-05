// src/pages/EditProductPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProductData({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category,
          image_url: response.data.image_url || "",
        });
      } catch (err) {
        setError("Failed to fetch product data. You may not be the owner.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, {
        ...productData,
        price: parseFloat(productData.price),
      });
      navigate(`/products/${id}`);
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  if (loading) return <p className="message">Loading...</p>;
  if (error) return <p className="message error">{error}</p>;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Edit Product</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL (Optional)</label>
          <input
            type="text"
            name="image_url"
            value={productData.image_url}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
