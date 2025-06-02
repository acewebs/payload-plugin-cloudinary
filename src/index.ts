import { configureCloudinary } from "./utils/cloudinary";
import type { Plugin, Config, Migration } from "payload";
import type { CloudinaryPluginOptions } from "./types";
import { extendUploadConfig } from "./config/extendUploadConfig";

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
        Object.assign(collection, extendUploadConfig(collection));
      }
    }

    return config;
  };
};
