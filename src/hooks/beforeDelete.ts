import { CloudinaryMediaDoc } from '../types'
import { BeforeDeleteHook } from 'node_modules/payload/dist/collections/config/types'
import { cloudinary } from '../utils/cloudinary'
import { logCloudinary } from '../utils/logger'

export const beforeDelete: BeforeDeleteHook = async ({ req, collection, id }) => {
  let doc: CloudinaryMediaDoc
  try {
    doc = (await req.payload.findByID({
      collection: collection.slug,
      id,
    })) as unknown as CloudinaryMediaDoc
  } catch (err) {
    req.payload.logger.warn(`[CloudinaryPlugin] Failed to load doc for deletion:`, err)
    return
  }
  const { cloudinaryPublicId } = doc

  if (!cloudinaryPublicId) return

  try {
    await cloudinary.uploader.destroy(cloudinaryPublicId)
    logCloudinary('Deleted asset with id', cloudinaryPublicId)
  } catch (err) {
    req.payload.logger.warn(`[CloudinaryPlugin] Failed to load doc for deletion:`, err)
  }
}
