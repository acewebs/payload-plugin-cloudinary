import { GetAdminThumbnail } from "payload";
import { PLACEHOLDER_IMAGE } from "../constants";
import { logCloudinary } from "./logger";

export const adminThumbnail: GetAdminThumbnail = ({ doc }) => {
  try {
    const { thumbnailURL, cloudinaryUrl, url: initialUrl, mimeType } = doc;
    const url = thumbnailURL || cloudinaryUrl || initialUrl;
    if (typeof url !== "string") {
      logCloudinary("Typeof url was not string, it was: " + typeof url, {
        url,
        thumbnailURL,
        cloudinaryUrl,
        initialUrl,
      });
      return PLACEHOLDER_IMAGE;
    }

    const ext = url.split(".").pop();
    let thumb = url.replace("/upload", `/upload/w_300,f_auto,q_auto`);

    if (typeof mimeType === "string" && mimeType.startsWith("video/")) {
      thumb = thumb.replace(`.${ext}`, ".webp");
    }

    logCloudinary("Going to return adminThumbnail", { thumb, url, ext });
    return thumb;
  } catch (err) {
    console.warn("[CloudinaryPlugin] adminThumbnail failed", err);
    return PLACEHOLDER_IMAGE;
  }
};
