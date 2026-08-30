const User = require('../models/User');
const jwt = require('jsonwebtoken');

const gerarToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'chave_secreta_padrao', {
    expiresIn: '7d'
  });
};

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ mensagem: 'Email já cadastrado.' });
    }

    const usuario = await User.create({
      nome,
      email,
      senha,
      role: role || 'user'
    });

    res.status(201).json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      token: gerarToken(usuario._id, usuario.role)
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao registrar usuário.', erro: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email }).select('+senha');
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    res.json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      token: gerarToken(usuario._id, usuario.role)
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao realizar login.', erro: error.message });
  }
};