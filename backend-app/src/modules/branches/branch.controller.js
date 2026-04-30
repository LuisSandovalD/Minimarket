const branchService = require('./branch.service');
const { validationResult } = require('express-validator');

// 📋 LISTAR
const getAll = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;

    const data = await branchService.getAll({ companyId });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 🔍 GET BY ID
const getById = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { id } = req.params;

    const data = await branchService.getById(id, companyId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 🆕 CREATE
const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const companyId = req.user.companyId;

    const data = await branchService.create(req.body, companyId);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

// ✏️ UPDATE
const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const companyId = req.user.companyId;
    const { id } = req.params;

    const data = await branchService.update(id, req.body, companyId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 🗑 DELETE
const remove = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { id } = req.params;

    await branchService.remove(id, companyId);
    res.json({ message: 'Sucursal eliminada correctamente' });
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