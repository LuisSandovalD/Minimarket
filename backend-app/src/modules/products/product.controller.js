const productService = require('./product.service');
const { validationResult } = require('express-validator');

// 📋 LISTAR PRODUCTOS
const getAll = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;

    const data = await productService.getAll({ companyId });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 🔍 GET PRODUCT BY ID
const getById = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { id } = req.params;

    const data = await productService.getById(id, companyId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 🆕 CREATE PRODUCT
const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const companyId = req.user.companyId;

    const data = await productService.create(req.body, companyId);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

// ✏️ UPDATE PRODUCT
const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const companyId = req.user.companyId;
    const { id } = req.params;

    const data = await productService.update(id, req.body, companyId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 🗑 DELETE PRODUCT
const remove = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { id } = req.params;

    await productService.remove(id, companyId);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};