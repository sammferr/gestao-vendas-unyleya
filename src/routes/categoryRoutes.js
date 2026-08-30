const express = require('express');
const router = express.Router();
const { listar, criar, deletar } = require('../controllers/categoryController');
const { proteger, autorizar } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias de produtos
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *   post:
 *     summary: Cria uma nova categoria (Apenas Admin)
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Periféricos
 *     responses:
 *       201:
 *         description: Categoria criada
 */
router.get('/', listar);
router.post('/', proteger, autorizar('admin'), criar);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Remove uma categoria por ID (Apenas Admin)
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria excluída
 */
router.delete('/:id', proteger, autorizar('admin'), deletar);

module.exports = router;