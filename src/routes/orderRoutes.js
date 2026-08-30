const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { proteger, autorizar } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento e checkout de pedidos
 */

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Cria um pedido a partir dos itens do carrinho (Checkout)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - enderecoEntrega
 *             properties:
 *               enderecoEntrega:
 *                 type: object
 *                 properties:
 *                   rua: { type: string, example: "Av. Epitácio Pessoa" }
 *                   numero: { type: string, example: "1200" }
 *                   bairro: { type: string, example: "Tambauzinho" }
 *                   cidade: { type: string, example: "João Pessoa" }
 *                   estado: { type: string, example: "PB" }
 *                   cep: { type: string, example: "58042-000" }
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
router.post('/', proteger, orderController.criarPedido);

/**
 * @swagger
 * /api/pedidos/meus-pedidos:
 *   get:
 *     summary: Lista o histórico de pedidos do usuário autenticado
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/meus-pedidos', proteger, orderController.obterMeusPedidos);

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todos os pedidos da plataforma (Apenas Admin)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de pedidos
 */
router.get('/', proteger, autorizar('admin'), orderController.listarTodos);

/**
 * @swagger
 * /api/pedidos/{id}/status:
 *   patch:
 *     summary: Atualiza o status de um pedido (Apenas Admin)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pendente, pago, enviado, entregue, cancelado]
 *                 example: pago
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
router.patch('/:id/status', proteger, autorizar('admin'), orderController.atualizarStatus);

module.exports = router;