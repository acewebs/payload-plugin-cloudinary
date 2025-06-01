export type CloudinaryPluginOptions = {
  collections: string[];
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  rootFolder?: string;
};

export type CloudinaryMediaDoc = Document & {
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
  mimeType?: string;
  filename?: string;
};

export type ImageSize = {
  width?: number;
  height?: number;
  mimeType?: string;
  filesize?: number;
  filename?: string;
  url?: string;
};

export type ImageSizes = {
  [key: string]: ImageSize;
};
