import { configureCloudinary } from "./utils/cloudinary";
import type { Plugin } from "payload";
import type { CloudinaryPluginOptions } from "./types";
import { extendUploadConfig } from "./config/extendUploadConfig";

export const cloudinaryStoragePlugin = (
  opts: CloudinaryPluginOptions
): Plugin => {
  configureCloudinary(opts);

  return (config) => {
    for (const collection of config.collections || []) {
      if (opts.collections.includes(collection.slug) && collection.upload) {
        Object.assign(collection, extendUploadConfig(collection));
      }
    }

    return config;
  };
};
