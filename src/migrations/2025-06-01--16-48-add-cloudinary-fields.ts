import type { Migration } from "payload";
import { hasColumn } from "../utils/db/hasColumn";

export const addCloudinaryFieldsMigration = (
  collection: string
): { slug: string; migration: Migration } => ({
  slug: `add-cloudinary-fields-${collection}`,
  migration: {
    name: `Add Cloudinary fields to ${collection}`,

    up: async (args: unknown) => {
      const { payload } = args as { payload: any };
      const db = payload.db;

      if (db.adapter.name === "postgres") {
        const missingUrl = !(await hasColumn(db, collection, "cloudinaryUrl"));
        if (missingUrl) {
          await db.query(
            `ALTER TABLE "${collection}" ADD COLUMN "cloudinaryUrl" TEXT;`
          );
        }

        const missingPublicId = !(await hasColumn(
          db,
          collection,
          "cloudinaryPublicId"
        ));
        if (missingPublicId) {
          await db.query(
            `ALTER TABLE "${collection}" ADD COLUMN "cloudinaryPublicId" TEXT;`
          );
        }
      }
    },

    down: async (args: unknown) => {
      const { payload } = args as { payload: any };
      const db = payload.db;

      if (db.adapter.name === "postgres") {
        const existsUrl = await hasColumn(db, collection, "cloudinaryUrl");
        if (existsUrl) {
          await db.query(
            `ALTER TABLE "${collection}" DROP COLUMN "cloudinaryUrl";`
          );
        }

        const existsPublicId = await hasColumn(
          db,
          collection,
          "cloudinaryPublicId"
        );
        if (existsPublicId) {
          await db.query(
            `ALTER TABLE "${collection}" DROP COLUMN "cloudinaryPublicId";`
          );
        }
      }
    },
  },
});
