# Payload Cloudinary Storage Plugin

This plugin replaces Payload CMS's local file storage with **Cloudinary**, enabling your media uploads to be automatically pushed to and served from Cloudinary.

### ✅ Features

- Uploading images & videos to Cloudinary
- Automatically deleting old Cloudinary assets on update
- Automatically deleting Cloudinary assets on media deletion
- Displaying Cloudinary images in the admin panel
- Overriding the default `url` field with the Cloudinary URL
- Optional folder prefixing via `CLOUDINARY_FOLDER`

---

## 🔧 Installation

1. Add the plugin to your project.

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
    }),
  ],
});
```

---

## 📂 Output Format

Each media document will store:

- `url`: Cloudinary-served URL
- `public_id`: Cloudinary asset ID
- `resource_type`: 'image' | 'video' | etc.

---

## 🛠 Development

Use `npm run build` to compile TypeScript to `dist/`.

---

## 🪪 License

MIT
