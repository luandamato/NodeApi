const Sequelize = require('sequelize');
const config = require('../Config/database');
const User = require('../Model/User');
const Endereco = require('../Model/Endereco');
const Tech = require('../Model/Tech');

const coonection = new Sequelize(config);

User.init(coonection);
Endereco.init(coonection);
Tech.init(coonection);

Endereco.associate(coonection.models);
User.associate(coonection.models);
Tech.associate(coonection.models);

module.exports = coonection;