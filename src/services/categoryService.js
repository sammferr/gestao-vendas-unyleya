const Category = require('../models/Category');

class CategoryService {
  async listarTodas() {
    return await Category.find().sort({ nome: 1 });
  }

  async criar(dados) {
    return await Category.create(dados);
  }

  async deletar(id) {
    return await Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();