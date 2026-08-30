const orderService = require('../services/orderService');

exports.criarPedido = async (req, res) => {
  try {
    const { enderecoEntrega } = req.body;
    if (!enderecoEntrega || !enderecoEntrega.rua || !enderecoEntrega.cep) {
      return res.status(400).json({ mensagem: 'Endereço de entrega completo é obrigatório' });
    }
    const pedido = await orderService.criarPedidoDoCarrinho(req.usuario.id, enderecoEntrega);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar pedido', erro: error.message });
  }
};

exports.obterMeusPedidos = async (req, res) => {
  try {
    const pedidos = await orderService.listarPedidosUsuario(req.usuario.id);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar pedidos', erro: error.message });
  }
};

exports.listarTodos = async (req, res) => {
  try {
    const pedidos = await orderService.listarTodos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar todos os pedidos', erro: error.message });
  }
};

exports.atualizarStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const pedido = await orderService.atualizarStatus(req.params.id, status);
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar status do pedido', erro: error.message });
  }
};