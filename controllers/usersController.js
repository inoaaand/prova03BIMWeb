import db from "../firebase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const secret = "segredoSuperSeguro"; 

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (!snapshot.empty) {
      return res.status(400).json({ message: "Email já cadastrado!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const id = uuidv4();

    await usersRef.doc(id).set({
      id,
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    let user;
    snapshot.forEach((doc) => (user = doc.data()));

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Senha inválida!" });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

    res.json({ message: "Login realizado!", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    const users = snapshot.docs.map((doc) => doc.data());
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

