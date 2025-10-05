// controllers/wishlistController.js
import db from "../database.js";

// @desc    Get user's wishlist
// @route   GET /api/wishlist
export const getWishlist = (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT p.* FROM products p
    JOIN wishlist w ON p.id = w.product_id
    WHERE w.user_id = ?
  `;
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    res.json(rows);
  });
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist
export const addToWishlist = (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const sql = "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)";
  db.run(sql, [userId, productId], function (err) {
    if (err) {
      // Handles case where item is already in wishlist due to UNIQUE constraint
      return res
        .status(400)
        .json({ message: "Item already in wishlist or invalid product" });
    }
    res
      .status(201)
      .json({ message: "Added to wishlist", wishlistId: this.lastID });
  });
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
export const removeFromWishlist = (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const sql = "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?";
  db.run(sql, [userId, productId], function (err) {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }
    res.json({ message: "Removed from wishlist" });
  });
};
