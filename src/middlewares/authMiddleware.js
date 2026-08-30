const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.proteger = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave_secreta_padrao');

      req.usuario = await User.findById(decoded.id).select('-senha');
      return next();
    } catch (error) {
      return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }
  }

  if (!token) {
    return res.status(401).json({ mensagem: 'Acesso não autorizado, token ausente.' });
  }
};

exports.autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.role)) {
      return res.status(403).json({ mensagem: 'Acesso negado: perfil sem permissão.' });
    }
    next();
  };
};