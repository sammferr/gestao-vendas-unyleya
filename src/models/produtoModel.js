const fs = require('fs').promises;
const path = require('path');

const caminhoArquivo = path.join(__dirname, '../../data/produtos.json');

class ProdutoModel {
  static async _lerArquivo() {
    try {
      const data = await fs.readFile(caminhoArquivo, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static async _salvarArquivo(dados) {
    await fs.writeFile(caminhoArquivo, JSON.stringify(dados, null, 2), 'utf-8');
  }

  static async listarTodos() {
    return await this._lerArquivo();
  }

  static async buscarPorId(id) {
    const produtos = await this._lerArquivo();
    return produtos.find(p => p.id === Number(id));
  }

  static async criar(novoProduto) {
    const produtos = await this._lerArquivo();
    const produtoComId = {
      id: Date.now(),
      nome: novoProduto.nome,
      preco: Number(novoProduto.preco),
      categoria: novoProduto.categoria
    };
    produtos.push(produtoComId);
    await this._salvarArquivo(produtos);
    return produtoComId;
  }

  static async atualizar(id, dadosAtualizados) {
    const produtos = await this._lerArquivo();
    const index = produtos.findIndex(p => p.id === Number(id));
    if (index === -1) return null;

    produtos[index] = {
      ...produtos[index],
      nome: dadosAtualizados.nome || produtos[index].nome,
      preco: dadosAtualizados.preco ? Number(dadosAtualizados.preco) : produtos[index].preco,
      categoria: dadosAtualizados.categoria || produtos[index].categoria
    };

    await this._salvarArquivo(produtos);
    return produtos[index];
  }

  static async deletar(id) {
    let produtos = await this._lerArquivo();
    const tamanhoOriginal = produtos.length;
    produtos = produtos.filter(p => p.id !== Number(id));
    if (produtos.length === tamanhoOriginal) return false;

    await this._salvarArquivo(produtos);
    return true;
  }
}

module.exports = ProdutoModel;