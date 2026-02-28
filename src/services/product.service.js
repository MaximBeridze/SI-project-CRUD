const repo = require("../repositories/product.repository");

function validateProductPayload(payload) {
  if (!payload || typeof payload !== "object") return "Body must be JSON object.";

  const { name, price } = payload;

  if (typeof name !== "string" || name.trim().length < 2) {
    return "name must be a string with at least 2 characters.";
  }

  const p = Number(price);
  if (!Number.isFinite(p) || p < 0) {
    return "price must be a non-negative number.";
  }

  return null;
}

async function create(payload) {
  const err = validateProductPayload(payload);
  if (err) return { error: err };

  const created = await repo.createProduct({
    name: payload.name.trim(),
    price: Number(payload.price),
    description: payload.description,
  });

  return { data: created };
}

async function list() {
  const items = await repo.listProducts();
  return { data: items };
}

async function get(id) {
  const item = await repo.getProductById(id);
  if (!item) return { error: "Product not found.", status: 404 };
  return { data: item };
}

async function update(id, payload) {
  const err = validateProductPayload(payload);
  if (err) return { error: err };

  const updated = await repo.updateProduct(id, {
    name: payload.name.trim(),
    price: Number(payload.price),
    description: payload.description,
  });

  if (!updated) return { error: "Product not found.", status: 404 };
  return { data: updated };
}

async function remove(id) {
  const ok = await repo.deleteProduct(id);
  if (!ok) return { error: "Product not found.", status: 404 };
  return { data: { deleted: true } };
}

module.exports = { create, list, get, update, remove };