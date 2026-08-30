const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CartService {
  async obterCarrinhoPorUsuario(usuarioId) {
    let carrinho = await Cart.findOne({ usuario: usuarioId }).populate('itens.produto', 'nome preco estoque');
    if (!carrinho) {
      carrinho = await Cart.create({ usuario: usuarioId, itens: [], valorTotal: 0 });
    }
    return carrinho;
  }

  async adicionarItem(usuarioId, produtoId, quantidade) {
    const produto = await Product.findById(produtoId);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    if (produto.estoque < quantidade) {
      throw new Error('Estoque insuficiente para a quantidade solicitada');
    }

    let carrinho = await Cart.findOne({ usuario: usuarioId });
    if (!carrinho) {
      carrinho = new Cart({ usuario: usuarioId, itens: [], valorTotal: 0 });
    }

    const itemExistenteIndex = carrinho.itens.findIndex(
      (item) => item.produto.toString() === produtoId
    );

    if (itemExistenteIndex > -1) {
      carrinho.itens[itemExistenteIndex].quantidade += quantidade;
      carrinho.itens[itemExistenteIndex].precoUnitario = produto.preco;
    } else {
      carrinho.itens.push({
        produto: produtoId,
        quantidade,
        precoUnitario: produto.preco
      });
    }

    carrinho.valorTotal = carrinho.itens.reduce(
      (acc, item) => acc + item.quantidade * item.precoUnitario,
      0
    );

    await carrinho.save();
    return await carrinho.populate('itens.produto', 'nome preco estoque');
  }

  async removerItem(usuarioId, produtoId) {
    const carrinho = await Cart.findOne({ usuario: usuarioId });
    if (!carrinho) throw new Error('Carrinho não encontrado');

    carrinho.itens = carrinho.itens.filter(
      (item) => item.produto.toString() !== produtoId
    );

    carrinho.valorTotal = carrinho.itens.reduce(
      (acc, item) => acc + item.quantidade * item.precoUnitario,
      0
    );

    await carrinho.save();
    return carrinho;
  }
}

module.exports = new CartService();