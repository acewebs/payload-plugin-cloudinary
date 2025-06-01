import type { CollectionConfig } from "payload";
import { adminThumbnail } from "../utils/adminThumbnail";
import { beforeDelete } from "../hooks/beforeDelete";
import { beforeChange } from "../hooks/beforeChange";
import { cloudinaryFields } from "../fields/cloudinaryFields";

export const extendUploadConfig = (
  collection: CollectionConfig
): Partial<CollectionConfig> => {
  const upload = typeof collection.upload === "object" ? collection.upload : {};

  return {
    fields: [...(collection.fields || []), ...cloudinaryFields],
    upload: {
      ...upload,
      disableLocalStorage: true,
      adminThumbnail,
    },
    hooks: {
      beforeChange: [...(collection.hooks?.beforeChange || []), beforeChange],
      beforeDelete: [...(collection.hooks?.beforeDelete || []), beforeDelete],
      afterRead: [
        ...(collection.hooks?.afterRead || []),
        ({ doc }) => {
          if (typeof doc?.cloudinaryUrl === "string") {
            doc.url = doc.cloudinaryUrl;
          }
          return doc;
        },
      ],
    },
  };
};
