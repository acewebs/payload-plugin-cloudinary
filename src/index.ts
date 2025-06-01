import { configureCloudinary } from "./utils/cloudinary";
import type { Plugin, Config, Migration } from "payload";
import type { CloudinaryPluginOptions } from "./types";
import { extendUploadConfig } from "./config/extendUploadConfig";
import { addCloudinaryFieldsMigration } from "./migrations/2025-06-01--16-48-add-cloudinary-fields";
import { renameCloudinaryUrlMigration } from "./migrations/2025-06-01--16-40-renameCloudinaryUrl";

export type ConfigWithMigrations = Config & {
  migrations?: {
    slug: string;
    migration: Migration;
  }[];
};
export const cloudinaryStoragePlugin = (
  opts: CloudinaryPluginOptions
): Plugin => {
  configureCloudinary(opts);

  return (config: ConfigWithMigrations) => {
    for (const collection of config.collections || []) {
      if (opts.collections.includes(collection.slug) && collection.upload) {
        const modified = extendUploadConfig(collection);
        Object.assign(collection, modified);
      }
    }

    config.migrations = [
      ...(config.migrations || []),
      ...opts.collections.map(renameCloudinaryUrlMigration),
      ...opts.collections.map(addCloudinaryFieldsMigration),
    ];

    return config;
  };
};
