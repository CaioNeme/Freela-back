import { db } from "../database/database.connection.js";

export async function getRange(req, res) {
  const ranges = await db.query(`
    SELECT JSON_BUILD_OBJECT(
      'value', id,
      'label', zone
    ) AS formatted_range
    FROM range
  ;`);
  const reformated = ranges.rows.map((obj) => obj.formatted_range);

  res.status(200).send(reformated);
}
