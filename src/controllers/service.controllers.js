import { db } from "../database/database.connection.js";

export async function createService(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const {
    title,
    subTitle,
    description,
    price,
    address,
    categoryId,
    range,
    mainImage,
  } = req.body;

  if (!token) {
    return res.status(401).send({ message: "Falha na autorização" });
  }

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [
      token,
    ]);

    if (session.rowCount != 1) {
      return res.status(401).send({ message: "Falha na autorização" });
    }

    const user = await db.query(`SELECT * FROM users WHERE id = $1;`, [
      session.rows[0].userId,
    ]);

    await db.query(
      `INSERT INTO 
        services (title, "subTitle", description, price, address, "categoryId", range, "mainImage", "serviceProviderId", "contactEmail", "contactPhone" ) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        title,
        subTitle,
        description,
        price,
        address,
        categoryId,
        range,
        mainImage,
        user.rows[0].id,
        user.rows[0].email,
        user.rows[0].phone,
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getAllServices(req, res) {
  try {
    const services = await db.query(`SELECT * FROM services;`);
    res.status(200).send(services.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function serviceById(req, res) {
  const { id } = req.params;

  if (isNaN(id) || id <= 0) {
    return res.status(404).send({ message: "URL não encontrada" });
  }

  try {
    const service = await db.query(`SELECT * FROM services WHERE id = $1`, [
      id,
    ]);

    if (service.rowCount != 1) {
      res.status(404).send({ message: "serviço não encontrado." });
    }

    res.status(200).send(service.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateService(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { id } = req.params;
  const {
    title,
    subTitle,
    description,
    price,
    address,
    categoryId,
    range,
    mainImage,
    status,
  } = req.body;

  if (isNaN(id) || id <= 0) {
    return res.status(404).send({ message: "URL não encontrada" });
  }
  if (!token) {
    return res.status(401).send({ message: "Falha na autorização" });
  }

  try {
    const service = await db.query(`SELECT * FROM services WHERE id = $1`, [
      id,
    ]);
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);

    if (service.rows[0].serviceProviderId != session.rows[0].userId) {
      return res.status(401).send({ message: "Falha na autorização" });
    }

    await db.query(
      `UPDATE services 
      SET
        title = $1,
        "subTitle" = $2,
        description = $3,
        price = $4,
        address = $5,
        "categoryId" = $6,
        range = $7,
        "mainImage" = $8,
        status = $9
      WHERE
        id = $10
    ;`,
      [
        title,
        subTitle,
        description,
        price,
        address,
        categoryId,
        range,
        mainImage,
        status,
        id,
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}