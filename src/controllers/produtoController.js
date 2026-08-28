const ProdutoModel = require('../models/produtoModel');

class ProdutoController {
  static async listar(req, res) {
    try {
      const produtos = await ProdutoModel.listarTodos();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar produtos." });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const produto = await ProdutoModel.buscarPorId(req.params.id);
      if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar produto." });
    }
  }

  static async criar(req, res) {
    try {
      const { nome, preco, categoria } = req.body;
      if (!nome || !preco || preco <= 0) {
        return res.status(400).json({ erro: "Nome e preço válido são obrigatórios." });
      }
      const novoProduto = await ProdutoModel.criar({ nome, preco, categoria });
      res.status(201).json(novoProduto);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao criar produto." });
    }
  }

  static async atualizar(req, res) {
    try {
      const produtoAtualizado = await ProdutoModel.atualizar(req.params.id, req.body);
      if (!produtoAtualizado) return res.status(404).json({ erro: "Produto não encontrado." });
      res.status(200).json(produtoAtualizado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar produto." });
    }
  }

  static async deletar(req, res) {
    try {
      const deletado = await ProdutoModel.deletar(req.params.id);
      if (!deletado) return res.status(404).json({ erro: "Produto não encontrado." });
      res.status(200).json({ mensagem: "Produto removido com sucesso." });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao deletar produto." });
    }
  }
}

module.exports = ProdutoController;