require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { errorHandler } = require('./middlewares/error.middleware');
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const companyRoutes = require('./modules/companies/company.routes');
const branchRoutes = require('./modules/branches/branch.routes');
const productRoutes = require('./modules/products/product.routes');
const categoryRoutes = require('./modules/category/category.routes');

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middlewares globales ─────────────────────────────────────

// CONFIGURACIÓN DE CORS CORREGIDA
app.use(cors({
  // Permitimos localhost (Nginx) y localhost:3000 (Vite directo)
  origin: ['http://localhost', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ─── Health check ─────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ─── Rutas ────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);

// ─── 404 handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// ─── Error handler ────────────────────────────────────────────
app.use(errorHandler);

// ─── Inicio del servidor ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📦 Entorno: ${process.env.NODE_ENV}`);
});

module.exports = app;