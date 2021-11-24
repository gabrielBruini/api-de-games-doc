const express = require('express')
const cors = require('cors')
const app = express()
const rotaJogos = require('./rotas/jogos/rotasJogos')
const rotaUsuarios = require('./rotas/usuarios/rotasUsuarios')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(rotaUsuarios)
app.use(rotaJogos)




app.listen(8000, () => {
    console.log("api no ar")
})