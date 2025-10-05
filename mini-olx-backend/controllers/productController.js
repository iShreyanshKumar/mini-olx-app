// controllers/productController.js
import db from "../database.js";

// @desc    Fetch all products with search and filter
// @route   GET /api/products
export const getAllProducts = (req, res) => {
  const { search, category } = req.query;

  let sql = "SELECT * FROM products";
  const params = [];

  if (search || category) {
    sql += " WHERE";
    if (search) {
      sql += " title LIKE ?";
      params.push(`%${search}%`);
    }
    if (category) {
      if (search) sql += " AND";
      sql += " category LIKE ?";
      params.push(`%${category}%`);
    }
  }

  sql += " ORDER BY created_at DESC";

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
    res.json(rows);
  });
};

// ... keep all other functions (getProductById, createProduct, etc.) the same

// @desc    Fetch single product
// @route   GET /api/products/:id
export const getProductById = (req, res) => {
  db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (!row) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(row);
  });
};

// @desc    Create a product
// @route   POST /api/products
export const createProduct = (req, res) => {
  const { title, description, price, category, image_url } = req.body;
  const owner_id = req.user.id; // From authMiddleware

  const sql = `INSERT INTO products (title, description, price, category, image_url, owner_id) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [title, description, price, category, image_url, owner_id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(201).json({ id: this.lastID, ...req.body, owner_id });
  });
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = (req, res) => {
  const { title, description, price, category, image_url } = req.body;
  const productId = req.params.id;
  const userId = req.user.id;

  // First, verify ownership
  db.get(
    "SELECT owner_id FROM products WHERE id = ?",
    [productId],
    (err, product) => {
      if (err || !product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.owner_id !== userId) {
        return res
          .status(403)
          .json({ message: "User not authorized to update this product" });
      }

      // If owner, proceed with update
      const sql = `UPDATE products SET 
                   title = ?, description = ?, price = ?, category = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP 
                 WHERE id = ?`;
      const params = [
        title,
        description,
        price,
        category,
        image_url,
        productId,
      ];
      db.run(sql, params, function (err) {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        res.json({ message: "Product updated successfully" });
      });
    }
  );
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  // First, verify ownership
  db.get(
    "SELECT owner_id FROM products WHERE id = ?",
    [productId],
    (err, product) => {
      if (err || !product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.owner_id !== userId) {
        return res
          .status(403)
          .json({ message: "User not authorized to delete this product" });
      }

      // If owner, proceed with deletion
      db.run("DELETE FROM products WHERE id = ?", [productId], function (err) {
        if (err) {
          return res.status(500).json({ message: "Server error" });
        }
        res.json({ message: "Product deleted successfully" });
      });
    }
  );
};
