
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rotas = Router();
const filePath = path.join(__dirname, '..', 'utils', 'db.json');

function readFile() {
    try {
        const dados = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(dados || '[]');
    } catch (error) {
        console.log("Erro ao ler");
        return [];
    }
}

function salvar(usuarios) {
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
}

rotas.put('/:id', (req, res) => {
    const usuarios = readFile();
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex((a) => a.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuarios[index] = { ...usuarios[index], ...req.body };

    salvar(usuarios);

    res.json(usuarios[index]);
});

rotas.delete('/:id', (req, res) => {
    let usuarios = readFile();

    const id = parseInt(req.params.id);

    usuarios = usuarios.filter((a) => a.id !== id);
    salvar(usuarios);
    res.status(204).send();
})


export default rotas;

// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getUsers,
//   updateUser,
//   deleteUser
// } from "../controllers/usersController.js";

// import auth from "../middleware/auth.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// router.get("/", auth, getUsers);
// router.put("/:id", auth, updateUser);
// router.delete("/:id", auth, deleteUser);

// export default router;