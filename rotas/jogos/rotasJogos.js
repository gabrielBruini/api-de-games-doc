const router = require('express').Router()
const TabelaJogos = require('./TabelaJogos')
const cors = require('cors')
const jwt = require("jsonwebtoken")
const {check, validationResult} = require('express-validator')


router.use(cors())

const jwtsegredo = "ud0Rga20CX4oOqa"

function authenticator(req, res, next) {

    const authToken = req.headers['authorization']

    if(authToken != undefined) {

        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token, jwtsegredo,(erro, data) => {
            if(erro) {
                res.status(401)
                res.json({err: "Token inválido"})
            } else {
                req.token = token
                req.usuariologado = {id: data.id, email: data.email}
                next()
            }
        })

    } else {
        res.status(401)
        res.json({err:"Token incorreto"})
    }
    
}


router.get("/jogos", authenticator, async (req, res) => {

    try {
      const resultado = await TabelaJogos.listar()      
      res.send(resultado)
                   
    }
     catch (e) {
         console.log(e)
     }
  
})

router.get("/jogos/:id",authenticator,(req, res) => {   
    const id = parseInt(req.params.id)
    try {
        const resultados =  TabelaJogos.pegarPorId(id)        
       return res.send(resultados)       
               
    } catch (e) {
        console.log(e)
    }
})

router.post("/jogos",[
    check('titulo').notEmpty().withMessage("O título não pode ser vazio"), 
    check('preco').notEmpty().isNumeric().withMessage("O preco não pode ser vazio, e precisa ser numérico"),   
    check('ano')
    .notEmpty()    
    .isNumeric()
    .withMessage("O ano não pode ser vazio, e precisa ser numérico")
], authenticator, (req, res) => {  

    const {titulo, preco, ano} = req.body   

    const erros = validationResult(req)  
    
    if(!erros.isEmpty()) {        
            res.status(400)
            res.json({erros: erros.array()})

    } else {
        TabelaJogos.inserir(
            {titulo: titulo, preco: preco, ano: ano}       
        ).then(() => {
         res.status(201)
         res.send({Dados: "Dados inseridos no sistema"})
 
        }).catch(() => {
            res.status(500)
            res.json({Servidor: "Erro interno na inserção de dados no servidor"})
        })
    }

})

router.delete('/jogos/:id',authenticator, async (req, res) => {

    const id = parseInt(req.params.id)

    if(id) {
        const jogos = await TabelaJogos.pegarPorId(id)

        if(jogos) {
            TabelaJogos.remover(id).then(() => {    
                res.status(200)
                res.json({Servidor: "Dados removidos do banco de dados"})
               
               }).catch(error => {
                   console.log(error)
               })
        } else {
            res.status(404)
            res.json({Servidor: "Dados inválidos ou inexistentes no banco de dados"})
    
        } 

    } else {
        res.status(404)
        res.json({Servidor: "A inserção de dados numéricos como paramêtros é necessária"})

    }

     
})

router.put("/jogos/:id",authenticator, async (req, res) => {

    const id = parseInt(req.params.id)
    const {titulo, preco, ano} = req.body   
    
    
    if(id) {
        const dados = await TabelaJogos.pegarPorId(id)
        console.log(dados)

        if(dados !== null) {            
        TabelaJogos.atualizar({titulo, preco, ano},id)
        .then(() => {   
            res.status(200).json({Servidor: "Dados Atualizados"})            
        }).catch (err => {
            console.log(err)        
        })        

        } else {
            res.status(404).json({Servidor:"Os dados para atualizar não está no banco de dados"})  
        }
        
        } else {
            res.status(404).json({Servidor:"A inserção de dados numéricos como paramêtros é necessária"})    
    }
        
    
})

module.exports = router

