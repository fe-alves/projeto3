const database = require("./../database");
const Sequelize = require("sequelize");

const Filme = database.define("filmes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome_filme: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genero_filme: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagem_filme: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  classificacao_filme: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  duracao_filme: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ano_filme: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  diretor_filme: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});

module.exports = Filme;