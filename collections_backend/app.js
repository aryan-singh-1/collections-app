 // app.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const db = require("./db/init");

const collectionRoutes = require("./routes/collectionRoutes"); // 👈

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

//Collections route
app.use("/api/collections", collectionRoutes); // 👈

// Upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
  const { name, description, tags } = req.body;
  const filename = req.file.filename;

  db.run(
    `INSERT INTO images (name, description, tags, filename) VALUES (?, ?, ?, ?)`,
    [name, description, tags, filename],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

app.post("/api/images/assign-to-collection", (req, res) => {
  const { imageIds, collectionId } = req.body;

  if (!Array.isArray(imageIds) || !collectionId) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const placeholders = imageIds.map(() => "?").join(",");
  const sql = `UPDATE images SET collection_id = ? WHERE id IN (${placeholders})`;

  db.run(sql, [collectionId, ...imageIds], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

app.get("/api/images", (req, res) => {
  db.all(`SELECT * FROM images`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(5000, () => console.log("Server running at http://localhost:5000"));

