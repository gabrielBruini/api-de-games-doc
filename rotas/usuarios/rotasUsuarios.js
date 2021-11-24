const {check, validationResult} = require('express-validator')
const rota = require('express').Router()
const TabelaUsuarios = require('./TabelaUsuarios')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const jwtsegredo = "ud0Rga20CX4oOqa"


rota.post("/registro",[
    check('email').isEmail().withMessage("Por favor, verifique o campo e-mail"),
    check('senha').isLength({min: 5}).withMessage("A senha precisa de pelomenos 5 caracteres"),
    check('nome').notEmpty().withMessage("O nome não pode ser vazio")    

],  async (req, res) => { 
        const {nome, email, senha} = req.body     
        const erros = validationResult(req)  

        var arrayErros = erros.errors
        
        if(erros.isEmpty()){
           const usuarios = await TabelaUsuarios.procurar(email)

            if(usuarios == undefined) { 
                const senhahash = bcrypt.hashSync(senha, 10)
                

               TabelaUsuarios.inserir({
                    nome: nome,
                    email: email,
                    senha: senhahash
                })
                res.status(201)
                res.json({user: "Usuário cadastrado"})
               

    
            } else {           
            res.status(401)
            res.json({err:"Usuário com credencias já registrada"})
           
            }        


        } else {
            let arrayMensagens = []
                     
            arrayErros.forEach((mensagens) => {
                
                 arrayMensagens.push(mensagens.msg)
            })
            res.status(400)
            res.json({erros: arrayMensagens})
           
        }
    
})

rota.post("/autenticar", async (req, res) => {
    var {email, senha} = req.body    

    const conta = await TabelaUsuarios.procurar(email)   

    if(conta) {       
        const Senhavalida = await bcrypt.compare(senha, conta.senha)

        if(Senhavalida) {

            jwt.sign({id: conta.id, email: conta.email}, jwtsegredo, {expiresIn: '48h'}, (err, token) => {
                if(err) {
                    res.status(404)
                    res.json({err:"Falha interna"})
                } else {
                    res.status(200)
                    res.json({token: token})
                }
            })       

        } else {
            res.status(401)
            res.json({err:"Credenciais inválidas"})
        }

    } else {        
        res.status(400)
        res.json({err: "Usuário não existe"}) 

    }
}) 
module.exports = rota