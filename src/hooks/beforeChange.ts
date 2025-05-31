import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { cloudinary, getCloudinaryFolder } from '../utils/cloudinary'
import { logCloudinary } from '../utils/logger'
import { uploadBufferToCloudinary } from '../utils/uploadBuffer'
import { buildCloudinarySizes } from '../utils/buildCloudinarySizes'

export const beforeChange: BeforeChangeHook = async ({ data, req, originalDoc, collection }) => {
  logCloudinary('[CloudinaryPlugin] beforeChange image called ', { data, req, originalDoc })
  const { file } = req
  //const { file } = (req as FileUploadRequest)?.files ?? {}

  if (!file) {
    // Nothing changed in the data,
    // just returning the data to continue
    return data
  }

  const { cloudinaryPublicId } = originalDoc ?? {}
  // If we're here, a new file was uploaded — delete the old one if exists
  if (cloudinaryPublicId) {
    try {
      await cloudinary.uploader.destroy(cloudinaryPublicId)
    } catch (err) {
      req.payload.logger.warn('[CloudinaryPlugin] Failed to delete old asset:', err)
    }
  }

  const { data: buffer, mimetype, name } = file
  if (!buffer) {
    req.payload.logger.error('[CloudinaryPlugin] No file buffer found for upload')
    return data
  }

  logCloudinary('[CloudinaryPlugin] Going to upload file: ', { ...file })
  try {
    const uploadResult = await uploadBufferToCloudinary(buffer, {
      folder: getCloudinaryFolder(),
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
      filename_override: name,
    })
    const { secure_url: cloudinaryURL, public_id, resource_type, format } = uploadResult
    // Log useful details if debugging is enabled
    logCloudinary('[CloudinaryPlugin] Upload successful, with result: ', { ...uploadResult })

    const sizes = buildCloudinarySizes(
      collection.upload?.imageSizes || [],
      cloudinaryURL,
      public_id,
      format,
      mimetype,
    )

    // In the end, we return the previous data,
    // together with the url and id of the upload result
    return {
      ...data,
      cloudinaryURL,
      cloudinaryPublicId: public_id,
      mimeType: resource_type === 'image' ? format : mimetype,
      url: cloudinaryURL,
      thumbnailURL: sizes?.thumbnail?.url ?? cloudinaryURL,
      sizes,
    }
  } catch (error) {
    req.payload.logger.error('[CloudinaryPlugin] Upload error', error)
    return data
  }
}
