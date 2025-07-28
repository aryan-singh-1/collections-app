// routes/collectionRoutes.js
const express = require("express");
const db = require("../db/init");
const router = express.Router();

// Create collection
router.post("/", (req, res) => {
  const { name, customer } = req.body;
  if (!name || !customer) {
    return res.status(400).json({ error: "Name and customer are required" });
  }

  db.run(
    `INSERT INTO collections (name, customer) VALUES (?, ?)`,
    [name, customer],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, customer });
    }
  );
});

// Get all collections
router.get("/", (req, res) => {
  db.all(`SELECT * FROM collections`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
