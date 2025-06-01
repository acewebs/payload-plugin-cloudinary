import type { Migration } from "payload";
import { hasColumn } from "../utils/db/hasColumn";

export const renameCloudinaryUrlMigration = (
  collection: string
): { slug: string; migration: Migration } => ({
  slug: `rename-cloudinary-url-${collection}`,
  migration: {
    name: `Rename CloudinaryURL field in ${collection}`,
    up: async (args: unknown) => {
      const { payload } = args as { payload: any };
      const db = payload.db;

      if (db.adapter.name === "postgres") {
        const shouldRename = await hasColumn(db, collection, "cloudinaryURL");
        if (shouldRename) {
          await db.query(`
            ALTER TABLE "${collection}" RENAME COLUMN "cloudinaryURL" TO "cloudinaryUrl";
          `);
        }
      }
    },

    down: async (args: unknown) => {
      const { payload } = args as { payload: any };
      const db = payload.db;

      if (db.adapter.name === "postgres") {
        const shouldRenameBack = await hasColumn(
          db,
          collection,
          "cloudinaryUrl"
        );
        if (shouldRenameBack) {
          await db.query(`
            ALTER TABLE "${collection}" RENAME COLUMN "cloudinaryUrl" TO "cloudinaryURL";
          `);
        }
      }
    },
  },
});
