import { db } from "../database/database.connection.js";

export async function getCategories(req, res) {
  const categories = await db.query(`
    SELECT JSON_BUILD_OBJECT(
      'value', id,
      'label', category
    ) AS formatted_category
    FROM categories
  ;`);
  const reformated = categories.rows.map((obj) => obj.formatted_category);

  res.status(200).send(reformated);
}
