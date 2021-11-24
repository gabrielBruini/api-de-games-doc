const ModeloTabela = require('./ModeloTabelaUsuarios')


module.exports = {
     inserir(dados) {
    return ModeloTabela.create(dados)
       
    },
    procurar(email) {
        return ModeloTabela.findOne({where:{email: email}})
    },
    listar() {
        return ModeloTabela.findAll({ raw: true})
    }
}