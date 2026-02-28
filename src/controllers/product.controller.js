const service = require("../services/product.service");

function toId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "id must be a positive integer." });
    return null;
  }
  return id;
}

async function create(req, res, next) {
  try {
    const result = await service.create(req.body);
    if (result.error) return res.status(400).json({ error: result.error });
    return res.status(201).json(result.data);
  } catch (e) {
    next(e);
  }
}

async function list(req, res, next) {
  try {
    const result = await service.list();
    return res.json(result.data);
  } catch (e) {
    next(e);
  }
}

async function get(req, res, next) {
  try {
    const id = toId(req, res);
    if (!id) return;

    const result = await service.get(id);
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    return res.json(result.data);
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const id = toId(req, res);
    if (!id) return;

    const result = await service.update(id, req.body);
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    return res.json(result.data);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const id = toId(req, res);
    if (!id) return;

    const result = await service.remove(id);
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    return res.json(result.data);
  } catch (e) {
    next(e);
  }
}

module.exports = { create, list, get, update, remove };