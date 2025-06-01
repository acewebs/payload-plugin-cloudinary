export const hasColumn = async (
  db: any,
  tableName: string,
  columnName: string
): Promise<boolean> => {
  if (db.adapter.name === "postgres") {
    const result = await db.query(
      `
      SELECT 1
      FROM information_schema.columns
      WHERE table_name = $1 AND column_name = $2
      LIMIT 1
    `,
      [tableName, columnName]
    );

    return result.rowCount > 0;
  }

  // For MongoDB, assume dynamic schema — always return false
  if (db.adapter.name === "mongo") {
    return false;
  }

  // Unknown adapters — assume unsafe to check
  return false;
};
