import express from "express";
import cors from 'cors';

const servidor = express()
const array_de_usuarios = []
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











servidor.listen(5000, () => console.log(`Rodando na porta de número 5000...`))




