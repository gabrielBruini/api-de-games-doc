# API de Games

##Endpoints

### GET /jogos
Esse endpoint é o responsável por retorna a listagem de todos os jogos cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça, ela irá retorna a listagem de todos os games. Exemplo:
```
[
    {
        "id": 10,
        "titulo": "Ragnarok",
        "preco": 105,
        "ano": 2015
    },
    {
        "id": 12,
        "titulo": "League of legends",
        "preco": 10,
        "ano": 2012
    },
    {
        "id": 14,
        "titulo": "Call of duty",
        "preco": 250,
        "ano": 2021
    }
]
```

#### Falha na autenticação 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação. Motivos: token inválido, token incorreto, token expirado.
Exemplo de resposta: 
```
{
    "err": "Token incorreto"
}

```
