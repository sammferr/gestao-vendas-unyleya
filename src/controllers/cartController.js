const cartService = require('../services/cartService');

exports.obterCarrinho = async (req, res) => {
  try {
    const usuarioId = req.usuario?.id || req.user?.id || req.usuario?._id;
    const carrinho = await cartService.obterCarrinhoPorUsuario(usuarioId);
    res.json(carrinho);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar carrinho', erro: error.message });
  }
};

exports.adicionarItem = async (req, res) => {
  try {
    const { produtoId, quantidade } = req.body;
    if (!produtoId || !quantidade) {
      return res.status(400).json({ mensagem: 'produtoId e quantidade são obrigatórios' });
    }
    const usuarioId = req.usuario?.id || req.user?.id || req.usuario?._id;
    const carrinho = await cartService.adicionarItem(usuarioId, produtoId, Number(quantidade));
    res.status(200).json(carrinho);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao adicionar item ao carrinho', erro: error.message });
  }
};

exports.removerItem = async (req, res) => {
  try {
    const usuarioId = req.usuario?.id || req.user?.id || req.usuario?._id;
    const carrinho = await cartService.removerItem(usuarioId, req.params.produtoId);
    res.json(carrinho);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao remover item', erro: error.message });
  }
};