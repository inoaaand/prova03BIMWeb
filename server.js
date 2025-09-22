
import express from 'express';
import rotasAut from './routes/auth.js';
import rotasUser from './routes/users.js';

const app = express();

app.use(express.json());

app.use("/", rotasAut);
app.use("/", rotasUser);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})
