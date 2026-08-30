const productService = require('../services/productService');

class ProdutoController {
  static async listar(req, res) {
    try {
      const resultado = await productService.listar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar produtos.", detalhe: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const produto = await productService.buscarPorId(req.params.id);
      if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar produto.", detalhe: error.message });
    }
  }

  static async criar(req, res) {
    try {
      const { nome, preco, categoria, descricao, estoque } = req.body;
      if (!nome || !preco || !categoria) {
        return res.status(400).json({ erro: "Nome, preço e categoria são obrigatórios." });
      }

      const novoProduto = await productService.criar({ nome, preco, categoria, descricao, estoque });
      res.status(201).json(novoProduto);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao criar produto.", detalhe: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const produtoAtualizado = await productService.atualizar(req.params.id, req.body);
      if (!produtoAtualizado) return res.status(404).json({ erro: "Produto não encontrado." });
      res.status(200).json(produtoAtualizado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar produto.", detalhe: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const deletado = await productService.deletar(req.params.id);
      if (!deletado) return res.status(404).json({ erro: "Produto não encontrado." });
      res.status(200).json({ mensagem: "Produto removido com sucesso." });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao deletar produto.", detalhe: error.message });
    }
  }
}

module.exports = ProdutoController;