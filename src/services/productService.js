const Product = require('../models/Product');

class ProductService {
  async listar({ page = 1, limit = 10, categoria }) {
    const filtro = categoria ? { categoria } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [produtos, total] = await Promise.all([
      Product.find(filtro)
        .populate('categoria', 'nome')
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Product.countDocuments(filtro)
    ]);

    return {
      total,
      pagina: Number(page),
      totalPaginas: Math.ceil(total / Number(limit)),
      produtos
    };
  }

  async buscarPorId(id) {
    return await Product.findById(id).populate('categoria', 'nome');
  }

  async criar(dados) {
    return await Product.create(dados);
  }

  async atualizar(id, dados) {
    return await Product.findByIdAndUpdate(id, dados, { new: true });
  }

  async deletar(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();