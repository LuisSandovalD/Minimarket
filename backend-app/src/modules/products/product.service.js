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

// 🔒 VALIDACIÓN
const validateProductData = (data) => {
  if (!data.name || !data.name.trim()) {
    throw createError("El nombre del producto es obligatorio", 400);
  }

  if (data.price == null || data.price < 0) {
    throw createError("El precio es inválido", 400);
  }
};

// 🔁 SLUG ÚNICO
const generateUniqueSlug = async (name, companyId) => {
  const baseSlug = generateSlug(name);

  const existingSlugs = await prisma.product.findMany({
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

// 🆕 CREAR PRODUCTO
const create = async (data, companyId) => {
  validateProductData(data);

  // validar nombre único por empresa
  const existingName = await prisma.product.findFirst({
    where: {
      name: data.name,
      companyId,
    },
  });

  if (existingName) {
    throw createError("Ya existe un producto con ese nombre", 400);
  }

  const slug = await generateUniqueSlug(data.name, companyId);

  try {
    const product = await prisma.product.create({
      data: {
        ...data,
        slug,
        companyId,
      },
    });

    return product;
  } catch (error) {
    if (error.code === "P2002") {
      throw createError("El slug ya está en uso", 400);
    }
    throw error;
  }
};

// 📋 LISTAR PRODUCTOS
const getAll = async ({ companyId }) => {
  return await prisma.product.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },

    // 🔥 opcional: incluir categoría o inventario
    include: {
      category: true,
    },
  });
};

// 🔍 GET BY ID
const getById = async (id, companyId) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
      companyId,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw createError("Producto no encontrado", 404);
  }

  return product;
};

// ✏️ UPDATE
const update = async (id, data, companyId) => {
  const product = await getById(id, companyId);

  validateProductData({
    name: data.name ?? product.name,
    price: data.price ?? product.price,
  });

  // validar nombre único
  if (data.name) {
    const exists = await prisma.product.findFirst({
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

  const updated = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  return updated;
};

// 🗑 DELETE
const remove = async (id, companyId) => {
  await getById(id, companyId);

  return await prisma.product.delete({
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