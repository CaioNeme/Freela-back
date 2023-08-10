import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { email, name, phone, cpf, password, confirmPassword } = req.body;
  if (password != confirmPassword) {
    return res.status(422).send({ message: "As senhas não coincidem" });
  }
  try {
    const verification = await db.query(`SELECT * FROM users WHERE email=$1;`, [
      email,
    ]);
    if (verification.rowCount > 0) {
      return res
        .status(409)
        .send({ message: "Esse email já esta sendo usado" });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.query(
      `INSERT INTO users (email, name, phone, cpf, password) VALUES ($1, $2, $3, $4, $5);`,
      [email, name, phone, cpf, passwordHash]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const verification = await db.query(`SELECT * FROM users WHERE email=$1;`, [
      email,
    ]);
    if (verification.rowCount != 1) {
      return res.status(401).send({ message: "Dados incorretos" });
    }

    if (bcrypt.compareSync(password, verification.rows[0].password) === false) {
      return res.status(401).send({ message: "Dados incorretos" });
    }

    const token = uuid();
    await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [
      token,
      verification.rows[0].id,
    ]);

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
