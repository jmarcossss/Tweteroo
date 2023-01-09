import express from "express"
import cors from "cors"

const serverUsers = []
const serverTweets = []
const PORT = 5000
const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log(`Running on port ${PORT}`))

app.post("/sign-up", (req, res) => {
    const user = req.body
    serverUsers.push(user)
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const fullTweet = req.body
    const userRegistered = serverUsers.find(item => item.username === fullTweet.username)
    
    if(userRegistered) {
        serverTweets.push(fullTweet)
        return res.send("OK") 
    }

    res.send("UNAUTHORIZED")
})

app.get("/tweets", (_, res) => {
    let lastTweets = []
    let recentTweets = serverTweets.reverse()

    if(recentTweets) {
        if(recentTweets.length > 10) {
            recentTweets = recentTweets.slice(0, 10)
        }
    
        lastTweets = recentTweets.map(item => {
            const nameAndAvatar = serverUsers.find(_item => _item.username === item.username)
    
            return {
                username: item.username,
                avatar: nameAndAvatar.avatar,
                tweet: item.tweet
            }
        })
        res.send(lastTweets)
    }  
})

////////////////////////////////////////////////////////////////////

import express from "express";
import cors from 'cors';

const servidor = express()
const array_de_usuarios = []
const array_de_tweets = []
servidor.use(express.json())
servidor.use(cors())

// Preciss fazer 2 posts e 1 get

// O primeiro post é para conseguir solicitar dados do login no meu servidor
servidor.post("sign-up", (require, response) => {
    const novoUsuario = require.body
    // const {username, avatar} = require.body
    array_de_usuarios.push(novoUsuario) // Adicionar o usuário na variável global (array_de_usuarios)
    response.send("OK");
})

app.post("/tweets", (require, response) => {
    const novoTweet = require.body
    const userRegistered = array_de_usuarios.find(item => item.username === novoTweet.username)
    
    if(userRegistered == true) {
        array_de_tweets.push(fullTweet)
        return response.send("OK") 
    }
    else {
        response.send("UNAUTHORIZED")
    }
})



servidor.listen(5000, () => console.log(`Running on port ${PORT}`))