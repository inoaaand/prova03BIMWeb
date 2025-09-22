import jwt from "jsonwebtoken";

const secret = "segredo";

export default function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token não fornecido!" });
  }

  jwt.verify(token.split(" ")[1], secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido!" });

    req.userId = decoded.id;
    next();
  });
}
