const categoryService = require('./category.service');
const { validationResult } = require('express-validator');

// 📋 LISTAR CATEGORÍAS
const getAll = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;

    const data = await categoryService.getAll({ companyId });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// 🔍 GET CATEGORY BY ID
const getById = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { id } = req.params;

    const data = await categoryService.getById(id, companyId);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// 🆕 CREATE CATEGORY
const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const companyId = req.user.companyId;

    const data = await categoryService.create(req.body, companyId);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ✏️ UPDATE CATEGORY
const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const companyId = req.user.companyId;
    const { id } = req.params;

    const data = await categoryService.update(id, req.body, companyId);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// 🗑 DELETE CATEGORY
const remove = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { id } = req.params;

    await categoryService.remove(id, companyId);

    res.json({
      success: true,
      message: 'Categoría eliminada correctamente',
    });
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