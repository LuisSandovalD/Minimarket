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

// ─── Crear empresa ──────────────────────────────────────────
const create = async (data) => {
  // 🔥 generar slug base
  const baseSlug = generateSlug(data.name);

  let slug = baseSlug;
  let count = 1;

  // evitar duplicados
  while (
    await prisma.company.findUnique({
      where: { slug },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  return prisma.company.create({
    data: {
      ...data,
      slug, // ✅ AQUÍ ESTABA EL ERROR
    },
  });
};

// ─── Listar empresas ────────────────────────────────────────
const getAll = async (user) => {
  return prisma.company.findMany({
    where: {
      id: user.companyId, // 🔥 SOLO SU EMPRESA
    },
  });
};

// ─── Obtener empresa por ID ─────────────────────────────────
const getById = async (id) => {
  const company = await prisma.company.findUnique({
    where: { id },
  });

  if (!company) throw createError('Empresa no encontrada', 404);

  return company;
};

// ─── Actualizar empresa ─────────────────────────────────────
const update = async (id, data) => {
  await getById(id);

  // ⚠️ opcional: regenerar slug si cambia nombre
  if (data.name) {
    const baseSlug = generateSlug(data.name);

    let slug = baseSlug;
    let count = 1;

    while (
      await prisma.company.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      })
    ) {
      slug = `${baseSlug}-${count++}`;
    }

    data.slug = slug;
  }

  return prisma.company.update({
    where: { id },
    data,
  });
};

// ─── Eliminar ───────────────────────────────────────────────
const remove = async (id) => {
  await getById(id);

  return prisma.company.delete({
    where: { id },
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};