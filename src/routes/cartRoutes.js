const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { proteger } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: Gerenciamento do carrinho de compras
 */

/**
 * @swagger
 * /api/carrinho:
 *   get:
 *     summary: Retorna o carrinho do usuário autenticado
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do carrinho
 */
router.get('/', proteger, cartController.obterCarrinho);

/**
 * @swagger
 * /api/carrinho/adicionar:
 *   post:
 *     summary: Adiciona um produto ao carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produtoId
 *               - quantidade
 *             properties:
 *               produtoId:
 *                 type: string
 *                 example: 6a9392e25c081685e56bf26b
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item adicionado com sucesso
 */
router.post('/adicionar', proteger, cartController.adicionarItem);

/**
 * @swagger
 * /api/carrinho/remover/{produtoId}:
 *   delete:
 *     summary: Remove um produto do carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removido do carrinho
 */
router.delete('/remover/:produtoId', proteger, cartController.removerItem);

module.exports = router;