const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

class OrderService {
  async criarPedidoDoCarrinho(usuarioId, enderecoEntrega) {
    const carrinho = await Cart.findOne({ usuario: usuarioId }).populate('itens.produto');

    if (!carrinho || carrinho.itens.length === 0) {
      throw new Error('O carrinho está vazio');
    }

    // Validação e decremento de estoque
    for (const item of carrinho.itens) {
      const produto = await Product.findById(item.produto._id);
      if (!produto || produto.estoque < item.quantidade) {
        throw new Error(`Estoque insuficiente para o produto: ${item.produto.nome}`);
      }
      produto.estoque -= item.quantidade;
      await produto.save();
    }

    const itensFormatados = carrinho.itens.map((item) => ({
      produto: item.produto._id,
      nome: item.produto.nome,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario
    }));

    const pedido = await Order.create({
      usuario: usuarioId,
      itens: itensFormatados,
      enderecoEntrega,
      valorTotal: carrinho.valorTotal,
      status: 'pendente'
    });

    // Limpa o carrinho após finalizar o pedido
    carrinho.itens = [];
    carrinho.valorTotal = 0;
    await carrinho.save();

    return pedido;
  }

  async listarPedidosUsuario(usuarioId) {
    return await Order.find({ usuario: usuarioId }).sort({ createdAt: -1 });
  }

  async listarTodos() {
    return await Order.find().populate('usuario', 'nome email').sort({ createdAt: -1 });
  }

  async atualizarStatus(pedidoId, status) {
    const statusPermitidos = ['pendente', 'pago', 'enviado', 'entregue', 'cancelado'];
    if (!statusPermitidos.includes(status)) {
      throw new Error('Status de pedido inválido');
    }

    const pedido = await Order.findByIdAndUpdate(
      pedidoId,
      { status },
      { new: true }
    );

    if (!pedido) throw new Error('Pedido não encontrado');
    return pedido;
  }
}

module.exports = new OrderService();