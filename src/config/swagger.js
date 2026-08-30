const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Marketplace API - Sistema de Gestão de Vendas',
      version: '4.0.0',
      description: 'Documentação da API com autenticação JWT, CRUDs e MongoDB'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor Local' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './server.js']
};

module.exports = swaggerJsDoc(options);