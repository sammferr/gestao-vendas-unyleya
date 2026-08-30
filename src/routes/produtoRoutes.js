const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');
const { proteger, autorizar } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Catálogo de produtos e paginação
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista produtos com suporte a paginação
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de itens por página
 *     responses:
 *       200:
 *         description: Lista paginada de produtos
 *   post:
 *     summary: Cadastra um novo produto (Apenas Admin)
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, preco, categoria]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Teclado Mecânico RGB
 *               descricao:
 *                 type: string
 *                 example: Teclado switch blue com iluminação RGB
 *               preco:
 *                 type: number
 *                 example: 250.00
 *               estoque:
 *                 type: number
 *                 example: 15
 *               categoria:
 *                 type: string
 *                 example: ID_DA_CATEGORIA_AQUI
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 */
router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);
router.post('/', proteger, autorizar('admin'), ProdutoController.criar);
router.put('/:id', proteger, autorizar('admin'), ProdutoController.atualizar);
router.delete('/:id', proteger, autorizar('admin'), ProdutoController.deletar);

module.exports = router;