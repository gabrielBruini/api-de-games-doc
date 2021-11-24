const Sequelize = require('sequelize')

const conexao = new Sequelize('apigames','root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
})


module.exports = conexao