import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function postContract(req, res) {
  const { startDate } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { id } = req.params;

  if (!token) {
    return res.status(401).send({ message: "Falha na autorização" });
  }
  if (isNaN(id) || id <= 0) {
    return res.status(404).send({ message: "URL não encontrada" });
  }

  try {
    const service = await db.query(`SELECT * FROM services WHERE id = $1;`, [
      id,
    ]);
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);

    if (service.rowCount != 1) {
      return res.status(404).send({ message: "serviço não encontrado." });
    }
    if (session.rowCount != 1) {
      return res.status(404).send({ message: "serviço não encontrado." });
    }
    if (service.rows[0].status == "false") {
      return res
        .status(403)
        .send({ message: "Esse serviço se encontra indisponivel" });
    }

    await db.query(
      `INSERT INTO 
        contracts ("startDate", "userId", "idService") 
      VALUES ($1, $2, $3);`,
      [
        dayjs(startDate).format("MM/DD/YYYY"),
        session.rows[0].userId,
        service.rows[0].id,
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getContract(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ message: "Falha na autorização" });
  }

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);

    if (session.rowCount != 1) {
      return res.status(404).send({ message: "serviço não encontrado." });
    }

    const rajada = await db.query(
      `SELECT
        u."id" AS "userId",
        u."name",
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', c."id",
          'startDate', c."startDate",
          'endDate', c."endDate",
          'idService', c."idService",
          'serviceName', s."title",
          'status', c."status"
        )
      ) AS contracts
      FROM
        "users" u
      JOIN
        "contracts" c ON u."id" = c."userId"
      JOIN
        "services" s ON c."idService" = s."id" 
      WHERE
        u."id" = $1
      GROUP BY
        u."id", u."name";
      `,
      [session.rows[0].userId]
    );

    res.status(200).send(rajada.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateContract(req, res) {
  const { status } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { id } = req.params;

  if (!token) {
    return res.status(401).send({ message: "Falha na autorização" });
  }
  if (isNaN(id) || id <= 0) {
    return res.status(404).send({ message: "URL não encontrada" });
  }

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [
      token,
    ]);

    const contract = await db.query(`SELECT * FROM contracts WHERE id = $1;`, [
      id,
    ]);

    if (contract.rows[0].userId != session.rows[0].userId) {
      return res.status(401).send({ message: "Falha na autorização" });
    }

    await db.query(
      `
      UPDATE contracts 
      SET 
        status = $1,
        "endDate" = now()
      WHERE
        id = $2
    ;`,
      [status, id]
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
