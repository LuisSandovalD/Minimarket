const prisma = require('../../config/prisma');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const { createError } = require('../../middlewares/error.middleware');
const { userSelect } = require("../users/user.select");

// =========================
// 🔧 UTIL: SLUG
// Esta función convierte nombres (ej. "Mi Empresa") en rutas URL (ej. "mi-empresa")
// =========================
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remueve acentos y caracteres especiales
    .trim()
    .replace(/\s+/g, "-") // Reemplaza espacios por guiones
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

// =========================
// 🆕 REGISTER
// Maneja el registro simultáneo de una empresa y su administrador inicial
// =========================
const register = async (data) => {
  try {
    // 🔒 Validación defensiva: Evita procesar si faltan campos obligatorios
    if (!data?.email || !data?.password || !data?.name) {
      throw createError("Datos incompletos", 400);
    }

    if (!data.company?.create?.name) {
      throw createError("Datos de empresa inválidos", 400);
    }

    // Iniciamos una transacción: si algo falla dentro, no se guarda nada en la base de datos
    return await prisma.$transaction(async (tx) => {

      // 1. Verificar email único: Antes de avanzar, confirmamos disponibilidad del correo
      const existingUser = await tx.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw createError("El correo ya está registrado", 400);
      }

      // 2. Encriptación: Transformamos la contraseña en un hash seguro
      const hashed = await hashPassword(data.password);

      // =========================
      // 🏢 SLUG EMPRESA
      // Lógica para evitar duplicados de URL en empresas (ej. empresa, empresa-1, empresa-2)
      // =========================
      const baseCompanySlug = generateSlug(data.company.create.name);
      let companySlug = baseCompanySlug;
      let count = 1;

      while (await tx.company.findUnique({ where: { slug: companySlug } })) {
        companySlug = `${baseCompanySlug}-${count++}`;
      }

      // =========================
      // 🏬 CREAR EMPRESA
      // Se inserta la empresa en la base de datos con su slug único
      // =========================
      const company = await tx.company.create({
        data: {
          name: data.company.create.name,
          slug: companySlug,
          ruc: data.company.create.ruc || null,
          address: data.company.create.address,
        },
      });

      // =========================
      // 👤 SLUG USUARIO
      // Generamos un identificador amigable para el perfil del usuario
      // =========================
      const baseUserSlug = generateSlug(data.name);
      let userSlug = baseUserSlug;
      let userCount = 1;

      while (
        await tx.user.findFirst({
          where: { slug: userSlug, companyId: company.id },
        })
      ) {
        userSlug = `${baseUserSlug}-${userCount++}`;
      }

      // =========================
      // 👤 CREAR USUARIO
      // Registramos al usuario vinculándolo a la empresa recién creada
      // =========================
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashed,
          role: data.role || "ADMIN",
          slug: userSlug,
          companyId: company.id,
        },
        select: {
          ...userSelect, // Usamos un selector predefinido para no exponer datos sensibles
          companyId: true,
          company: {
            select: {
              slug: true,
              name: true,
            },
          },
        },
      });

      // =========================
      // 🔐 TOKEN
      // Generamos el JWT para que el usuario quede logueado inmediatamente
      // =========================
      const token = generateToken({
        id: user.id,
        companyId: user.companyId,
        role: user.role,
      });

      return {
        user,
        token,
        slug: company.slug,
      };
    });

  } catch (error) {
    // 🔥 Manejo de errores de base de datos (Unique constraint violation)
    if (error.code === 'P2002') {
      throw createError('El correo ya está registrado', 400);
    }

    throw error;
  }
};

// =========================
// 🔐 LOGIN
// Proceso de verificación de identidad
// =========================
const login = async ({ email, password }) => {
  if (!email || !password) {
    throw createError("Email y contraseña requeridos", 400);
  }

  // Buscamos al usuario incluyendo estados de cuenta (activo/borrado)
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      ...userSelect,
      password: true,
      isActive: true,
      isDeleted: true,
      companyId: true,
      role: true,
      company: {
        select: {
          slug: true,
        },
      },
    },
  });

  // ❌ Validación de seguridad: El usuario debe existir y estar habilitado
  if (!user || !user.isActive || user.isDeleted) {
    throw createError("Credenciales inválidas", 401);
  }

  // Comparamos el password ingresado con el hash de la base de datos
  const valid = await comparePassword(password, user.password);

  if (!valid) {
    throw createError("Credenciales inválidas", 401);
  }

  // 🔐 Generación de acceso tras login exitoso
  const token = generateToken({
    id: user.id,
    companyId: user.companyId,
    role: user.role,
  });

  // 🔒 Limpieza: Protegemos los datos sensibles antes de enviarlos al cliente
  delete user.password;
  delete user.isActive;
  delete user.isDeleted;

  return {
    user,
    token,
    slug: user.company?.slug,
  };
};

module.exports = { register, login };