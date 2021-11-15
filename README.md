# API de Games

##Endpoints

### Post /autenticar
Esse endpoint é o responsável por realizar o processo de login.
#### Parametros
Email: Email do usuário cadastrado no sistema.

Senha: A senha do usuário cadastrada no sistema

Exemplo:

```
{
    "email": "adm@teste.com.br",
    "senha": 123456789
}
```



#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber o token jwt para acessar endpoints protegidos.
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoiYWRtQHRlc3RlLmNvbS5iciIsImlhdCI6MTYzNjgyOTE2OCwiZXhwIjoxNjM3MDAxOTY4fQ.cCKsL2RNVuZZbIcoDFHohlatMphWFaSHeu549z-xi_I"
}
```

#### Falha na autenticação 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação. Motivos: Senha ou e-mail inválidos.
Exemplo de resposta: 
```
{
    "err": "Credenciais inválidas"
}
```

#### Falha na autenticação 400
Caso essa resposta aconteça, isso significa que não existem usuários com esses dados no sistema.
Exemplo de resposta: 
```
{
    "err": "Usuário não existe"
}
```

### Post /registro
Esse endpoint é o responsável por realizar o processo de registro do usuário no banco de dados.
#### Parametros
Emai, nome e senha.


Exemplo:

```
   {    
    "nome": "Administrador",
    "email": "adm@hotmail.com",
    "senha": "123456789"
}
```



#### Respostas
##### OK! 201
Caso essa resposta aconteça, o usuário será cadastrado no banco de dados.
```
{
    "user": "Usuário cadastrado"
}
```

#### Falha na autenticação 401
Caso essa resposta aconteça, significa que já existe um usuário cadastrado com esses dados no sistema.
Exemplo de resposta: 
```
{
    "err": "Usuário com credencias já registrada"
}
```
#### Requisição inválida 400
Caso essa resposta aconteça, significa que há algum campo inválido.
Exemplo de resposta: 
```
 {
    "erros": [
        "Por favor, verifique o campo e-mail",
        "A senha precisa de pelomenos 5 caracteres",
        "O nome não pode ser vazio"
    ]
}

```


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

### Post /jogos
Esse endpoint é o responsável por inserir jogos no banco de dados.

#### Parametros
Titulo, preço e ano.

#### Respostas
##### OK! 201
Caso essa resposta aconteça, ele irá inserir os dados no sistema. Exemplo:
```
{
    "Dados": "Dados inseridos no sistema"
}

```

#### Falha na inserção de dados 400
Caso essa resposta aconteça, isso significa que há algum dado inserido de forma incorreta.
Exemplo de resposta: 
```
{
   {
    "erros": [
        {
            "msg": "O título não pode ser vazio",
            "param": "titulo",
            "location": "body"
        }
    ]
}
}
```

### Delete /jogos/:id
Esse endpoint é o responsável por remover jogos no banco de dados.

#### Parametros
id.

#### Respostas
##### OK! 201
Caso essa resposta aconteça, ele irá remover os dados no sistema. Exemplo:
```
{
    "Servidor": "Dados removidos do banco de dados"
}

```

#### Falha na inserção de dados 404
Caso essa resposta aconteça, isso significa que há algum dado passado de forma incorreta.
Exemplo de resposta: 
```
{
    "Servidor": "Dados inválidos ou inexistentes no banco de dados"
}
```

### Put /jogos/:id
Esse endpoint é o responsável por Atualizar jogos no banco de dados.

#### Parametros
id.

#### Respostas
##### OK! 200
Caso essa resposta aconteça, os dados serão alterado no banco de dados. Exemplo:
```
{
    "Servidor": "Dados Atualizados"
}

```

#### Falha na procura de dados
Caso essa resposta aconteça, isso significa que há algum dado passado de forma incorreta, ou inexistente.
Exemplo de resposta: 
```
{
    "Servidor": "Os dados para atualizar não está no banco de dados"
}
```
#### Falha na procura de dados
Caso essa resposta aconteça, isso significa que algum dado passado, foi inválido igual a uma string.
Exemplo de resposta: 
```
{
    "Servidor": "A inserção de dados numéricos como paramêtros é necessária"
}
```
