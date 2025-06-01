# Payload Cloudinary Storage Plugin

This plugin replaces Payload CMS's local file storage with **Cloudinary**, enabling your media uploads to be automatically pushed to and served from Cloudinary.

### ✅ Features

- Uploading images & videos to Cloudinary
- Automatically deleting old Cloudinary assets on update
- Automatically deleting Cloudinary assets on media deletion
- Displaying Cloudinary images in the admin panel
- Overriding the default `url` field with the Cloudinary URL
- Optional folder prefixing via `CLOUDINARY_FOLDER`
- **Automatic field injection:** `cloudinaryUrl` and `cloudinaryPublicId` added to collections
- **Production-safe schema migrations**: plugin registers migrations for field creation and backward-compatible renaming

---

## 🔧 Installation

1. Add the plugin to your project via local path or NPM.

2. Set environment variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=media          # optional
DEBUG_CLOUDINARY=true            # optional
```

---

## 🚀 Usage

### Register the plugin in `payload.config.ts`

```ts
import { cloudinaryPlugin } from "payload-plugin-cloudinary";

export default buildConfig({
  plugins: [
    cloudinaryPlugin({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      rootFolder: process.env.CLOUDINARY_FOLDER, // optional
      collections: ["media"], // required: collections to apply Cloudinary integration to
    }),
  ],
});
```

---

## 📂 Output Fields

Each configured collection will include the following fields:

- `cloudinaryUrl`: Final URL of the asset served from Cloudinary
- `cloudinaryPublicId`: Unique Cloudinary public identifier

These fields are read-only and automatically managed by the plugin.

---

## ✨ Schema Migrations

This plugin auto-registers **Payload CMS migrations** to ensure:

- Backward compatibility with older `cloudinaryURL` field
- Safe creation of `cloudinaryUrl` and `cloudinaryPublicId` fields
- Idempotent updates (migrations only run when needed)

### Vercel / Production Deployment

Ensure `payload migrate` is included in your `build` script:

```json
"scripts": {
  "build": "payload build && payload migrate"
}
```

This guarantees schema updates are applied on deploy.

---

## 🚪 Development

Use `npm run build` to compile TypeScript to `dist/`.
Use `npm link` or `file:` reference to test the plugin locally in your Payload app.

---

## 🗶 License

MIT
