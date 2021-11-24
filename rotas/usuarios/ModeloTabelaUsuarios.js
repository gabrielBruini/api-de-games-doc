const Sequelize = require('sequelize')
const conexao = require('../../database/bancoDeDados')


const usuariosModeloTabela = conexao.define('usuarios', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
 })

 module.exports = usuariosModeloTabela

 