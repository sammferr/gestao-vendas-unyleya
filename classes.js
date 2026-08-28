const fs = require('fs').promises;
const path = require('path');

// 1. CLASSE BASE: Produto
class Produto {
  constructor(nome, preco, categoria) {
    this.nome = nome;
    this.preco = this.validarPreco(preco);
    this.categoria = categoria;
  }

  validarPreco(preco) {
    if (typeof preco !== 'number' || preco <= 0) {
      throw new Error(`Preço inválido para o produto "${this.nome}". O valor deve ser maior que zero.`);
    }
    return preco;
  }

  obterResumo() {
    return `${this.nome} [${this.categoria}] - R$ ${this.preco.toFixed(2)}`;
  }
}

// 2. HERANÇA E POLIMORFISMO
class ProdutoFisico extends Produto {
  constructor(nome, preco, categoria, pesoKg) {
    super(nome, preco, categoria);
    this.pesoKg = pesoKg;
  }

  obterResumo() {
    return `${super.obterResumo()} | Peso: ${this.pesoKg}kg`;
  }
}

// 3. CLASSE PEDIDO (API + JSON)
class Pedido {
  constructor(cliente, produtos = []) {
    this.id = Date.now();
    this.cliente = cliente;
    this.produtos = produtos;
    this.enderecoEntrega = null;
    this.data = new Date().toISOString();
  }

  calcularTotal() {
    return this.produtos.reduce((acc, prod) => acc + prod.preco, 0);
  }

  async definirEnderecoPorCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      throw new Error("CEP inválido! O CEP deve conter exatamente 8 dígitos.");
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado.");
      }

      this.enderecoEntrega = {
        logradouro: data.logradouro || 'N/A',
        bairro: data.bairro || 'N/A',
        cidade: data.localidade,
        uf: data.uf,
        cep: cepLimpo
      };

      return this.enderecoEntrega;
    } catch (error) {
      throw new Error(`Erro ao consultar CEP: ${error.message}`);
    }
  }

  async salvarEmJSON() {
    const caminhoArquivo = path.join(__dirname, 'pedidos.json');
    let pedidosExistentes = [];

    try {
      const conteudo = await fs.readFile(caminhoArquivo, 'utf-8');
      pedidosExistentes = JSON.parse(conteudo);
    } catch (err) {
      pedidosExistentes = [];
    }

    const dadosPedido = {
      id: this.id,
      cliente: this.cliente,
      total: this.calcularTotal(),
      enderecoEntrega: this.enderecoEntrega,
      produtos: this.produtos.map(p => p.obterResumo()),
      data: this.data
    };

    pedidosExistentes.push(dadosPedido);

    await fs.writeFile(caminhoArquivo, JSON.stringify(pedidosExistentes, null, 2), 'utf-8');
    console.log(`\n✅ Pedido #${this.id} salvo com sucesso em 'pedidos.json'!`);
  }
}

module.exports = { Produto, ProdutoFisico, Pedido };