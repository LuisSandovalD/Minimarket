const prisma = require('../../config/prisma');
const { createError } = require('../../middlewares/error.middleware');

// 🔧 GENERADOR DE SLUG
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

// 🔁 SLUG ÚNICO
const generateUniqueSlug = async (name, companyId) => {
  const baseSlug = generateSlug(name);

  const existingSlugs = await prisma.category.findMany({
    where: {
      slug: { startsWith: baseSlug },
      companyId,
    },
    select: { slug: true },
  });

  const slugs = existingSlugs.map((s) => s.slug);

  let slug = baseSlug;
  let count = 1;

  while (slugs.includes(slug)) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
};

// 🔒 VALIDACIÓN
const validateCategoryData = (data) => {
  if (!data.name || !data.name.trim()) {
    throw createError("El nombre de la categoría es obligatorio", 400);
  }

  if (data.name.length < 3) {
    throw createError("La categoría debe tener al menos 3 caracteres", 400);
  }
};

// 🆕 CREAR CATEGORY
const create = async (data, companyId) => {
  validateCategoryData(data);

  // validar nombre único por empresa
  const existingName = await prisma.category.findFirst({
    where: {
      name: data.name,
      companyId,
    },
  });

  if (existingName) {
    throw createError("Ya existe una categoría con ese nombre", 400);
  }

  const slug = await generateUniqueSlug(data.name, companyId);

  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug,
        companyId,
      },
    });

    return category;
  } catch (error) {
    if (error.code === "P2002") {
      throw createError("El slug ya está en uso", 400);
    }
    throw error;
  }
};

// 📋 LISTAR CATEGORÍAS
const getAll = async ({ companyId }) => {
  return await prisma.category.findMany({
    where: { companyId },
    orderBy: { id: "desc" },

    include: {
      _count: {
        select: { products: true }, // 🔥 útil para UI
      },
    },
  });
};

// 🔍 GET BY ID
const getById = async (id, companyId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: Number(id),
      companyId,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    throw createError("Categoría no encontrada", 404);
  }

  return category;
};

// ✏️ UPDATE
const update = async (id, data, companyId) => {
  const category = await getById(id, companyId);

  validateCategoryData({
    name: data.name ?? category.name,
  });

  // validar nombre único
  if (data.name) {
    const exists = await prisma.category.findFirst({
      where: {
        name: data.name,
        companyId,
        NOT: { id: Number(id) },
      },
    });

    if (exists) {
      throw createError("Nombre ya en uso en la empresa", 400);
    }
  }

  // 🚫 seguridad
  delete data.companyId;
  delete data.slug;

  const updated = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });

  return updated;
};

// 🗑 DELETE
const remove = async (id, companyId) => {
  const category = await getById(id, companyId);

  // 🚫 evitar eliminar si tiene productos
  const hasProducts = await prisma.product.findFirst({
    where: { categoryId: Number(id) },
  });

  if (hasProducts) {
    throw createError(
      "No puedes eliminar una categoría con productos asociados",
      400
    );
  }

  return await prisma.category.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};