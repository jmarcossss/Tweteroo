import express from "express";
import cors from 'cors';

let i = 0
const servidor = express()
const PORTA = 5000
const array_de_usuarios = []
const array_de_tweets = []
servidor.use(express.json())
servidor.use(cors())

// Preciso fazer 2 posts e 1 get
// O primeiro post é para conseguir solicitar dados do login no meu servidor
// Fiz de forma bastante semelhante ao exercício da semana
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
    if(username == false || tweet == false) {
      response.send("UNAUTHORIZED")
      return
    }
    array_de_tweets.push(tweetDoUsuario) // Adiciona o tweet na variável global de tweets (array_de_tweets)
    response.send("OK")
})

// O get serve para pegar os dados lá do servidor e fazer uma requisição dos mesmos
servidor.get("/tweets", (require, response) => {
    const tweetsArmazenados = [];
    for(i = 10; i > 0; i--) {
      const valor_array_de_tweets = array_de_tweets[array_de_tweets.length - i];
      // Se o valor do array de tweets que o servidor tem for nulo ou undefined
      // quer dizer que não existe tweets no servidor ainda
      // se for um vlor diferente disso é porque existe tweets no servidor
      if(valor_array_de_tweets !== null && valor_array_de_tweets !== undefined) {
        const urlDoUsuario = array_de_usuarios.find
        (valor => valor.username === valor_array_de_tweets.username);
        const novo_array_de_tweets = {
            username: valor_array_de_tweets.username,
            avatar: urlDoUsuario.avatar,
            tweet: valor_array_de_tweets.tweet
        }
        tweetsArmazenados.push(novo_array_de_tweets);
      }
    }
    response.send(tweetsArmazenados);
})

servidor.listen(PORTA, () => console.log(`Rodando na porta número ${PORTA}...`))