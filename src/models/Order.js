const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itens: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      nome: String,
      quantidade: Number,
      precoUnitario: Number
    }
  ],
  enderecoEntrega: {
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true }
  },
  valorTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'pago', 'enviado', 'entregue', 'cancelado'],
    default: 'pendente'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);