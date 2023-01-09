import express from "express";
import cors from 'cors';

const servidor = express()
const array_de_usuarios = []
const array_de_tweets = []
servidor.use(express.json())
servidor.use(cors())

// Preciss fazer 2 posts e 1 get

// O primeiro post é para conseguir solicitar dados do login no meu servidor
// Fiz de forma bastante semlelhante ao exercício da semana
servidor.post("/sign-up", (require, response) => {
    const novoUsuario = require.body
    const {username, avatar} = require.body
    array_de_usuarios.push(novoUsuario) // Adicionar o usuário na variável global de usuários (array_de_usuarios)
    response.send("OK")
})

// O segundo post é para que um usuário consiga enviar um tweet para o servidor
servidor.post("/tweets", (require, response) => {
    const { username, tweet} = require.body
    const tweetDoUsuario = { username, tweet }
    if (username == false || tweet == false) {
      response.send("UNAUTHORIZED")
      return
    }
    array_de_tweets.push(tweetDoUsuario) // Adiciona o tweet na variável global de tweets (array_de_tweets)
    response.send("OK")
})

servidor.listen(5000, () => console.log(`Running on port 5000`))