const errorHandler = (err, req, res, _next) => {
  console.error('❌ Error:', err);

  // Errores de Prisma
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'campo';
    return res.status(409).json({ message: `El ${field} ya está en uso` });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ message: 'Registro no encontrado' });
  }

  // Error genérico
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({ message });
};

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = { errorHandler, createError };