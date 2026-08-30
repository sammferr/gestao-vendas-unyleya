const categoryService = require('../services/categoryService');

exports.listar = async (req, res) => {
  try {
    const categorias = await categoryService.listarTodas();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar categorias.', erro: error.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ mensagem: 'O nome da categoria é obrigatório.' });

    const categoria = await categoryService.criar({ nome });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar categoria.', erro: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const categoria = await categoryService.deletar(req.params.id);
    if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    res.json({ mensagem: 'Categoria removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar categoria.', erro: error.message });
  }
};