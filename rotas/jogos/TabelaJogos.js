const Modelo = require('./ModeloTabelaJogos')


module.exports = {
    listar () {
        return Modelo.findAll({ raw: true, limit: 5})
        
    },
    inserir (dados) {
       return Modelo.create(dados)
    },
    atualizar (dados, id) {

        return Modelo.update(dados,{             
                where: {
                    id: id
                }  
        })
    },
    pegarPorId (id) {
        if (id == undefined) {
            throw new Error
        } else {
            return Modelo.findOne({
                where: {
                    id:id
                }
            })
        }

    },
    remover (id) {
       return Modelo.destroy({
           where: {
               id:id
           }
       })
    }
}