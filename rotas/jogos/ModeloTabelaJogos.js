const Sequelize = require('sequelize')
const conexao = require('../../database/bancoDeDados')


const tabela = conexao.define('jogos', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
 })


 module.exports = tabela

 