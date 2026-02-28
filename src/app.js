const express = require("express");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || "dev" });
});

app.use("/products", productRoutes);

// simple fallback error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = { app };