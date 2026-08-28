const express = require('express');
const cors = require('cors');
const path = require('path');

const produtoRoutes = require('./src/routes/produtoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api/produtos', produtoRoutes);

// Inicialização
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});