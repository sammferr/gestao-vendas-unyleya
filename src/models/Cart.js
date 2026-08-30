const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  itens: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantidade: {
        type: Number,
        required: true,
        min: [1, 'A quantidade mínima é 1'],
        default: 1
      },
      precoUnitario: {
        type: Number,
        required: true
      }
    }
  ],
  valorTotal: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);