const { pool } = require("../config/db");

async function createProduct({ name, price, description }) {
  const q = `
    INSERT INTO products (name, price, description)
    VALUES ($1, $2, $3)
    RETURNING id, name, price, description, created_at
  `;
  const values = [name, price, description ?? null];
  const { rows } = await pool.query(q, values);
  return rows[0];
}

async function listProducts() {
  const { rows } = await pool.query(
    `SELECT id, name, price, description, created_at FROM products ORDER BY id DESC`
  );
  return rows;
}

async function getProductById(id) {
  const { rows } = await pool.query(
    `SELECT id, name, price, description, created_at FROM products WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

async function updateProduct(id, { name, price, description }) {
  const q = `
    UPDATE products
    SET name = $1,
        price = $2,
        description = $3
    WHERE id = $4
    RETURNING id, name, price, description, created_at
  `;
  const values = [name, price, description ?? null, id];
  const { rows } = await pool.query(q, values);
  return rows[0] || null;
}

async function deleteProduct(id) {
  const { rowCount } = await pool.query(`DELETE FROM products WHERE id = $1`, [id]);
  return rowCount > 0;
}

module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};