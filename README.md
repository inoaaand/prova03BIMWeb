# prova03BIMWeb


📦 CRUD JWT JSON
Desenvolver uma API BackEnd com Node.js, Express, JWT e persistência em arquivo JSON.
Implementar o CRUD de usuários e autenticação baseada em token. Os teste deve ser feito utilizando Thunder Client nas respectivas rotas

📌 Rotas da API
POST /register → cadastrar novo usuário.
Dados: { nome, email, senha }

POST /login → autenticação do usuário.
Gera um JWT válido por 1h.

GET /users → listar todos os usuários (rota protegida).
GET /users/:id → buscar um usuário específico por id (rota protegida).
PUT /users/:id → atualizar dados de um usuário (rota protegida).
DELETE /users/:id → remover usuário (rota protegida).

🚀 Tecnologias Sugeridas
Node.js
Express
JWT
bcryptjs
uuid

📂 Estrutura do Projeto
 ├─ db.json
 ├─ server.js
 ├─ utils/
 │     └─ db.js
 ├─ middleware/
 │     └─ auth.js
 ├─ controllers/
 │    ├─ authController.js
 │    └─ usersController.js
 └─ routes/
      ├─ auth.js
      └─ users.js