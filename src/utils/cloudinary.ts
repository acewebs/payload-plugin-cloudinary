import { v2 as cloudinaryCore } from "cloudinary";
import type { CloudinaryPluginOptions } from "../types";

let isConfigured = false;
let defaultFolder: string | undefined;

export const configureCloudinary = (opts: CloudinaryPluginOptions): void => {
  if (!isConfigured) {
    const { cloudName, apiKey, apiSecret, rootFolder: folder } = opts;
    cloudinaryCore.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    defaultFolder = folder;

    isConfigured = true;
  }
};

export const cloudinary = cloudinaryCore;
export const getCloudinaryFolder = (): string | undefined => defaultFolder;
