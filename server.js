require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger');
const conectarDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();

// Conectar ao Banco de Dados
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rota da Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/carrinho', cartRoutes);
app.use('/api/pedidos', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));