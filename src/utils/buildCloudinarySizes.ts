import { SanitizedCollectionConfig } from 'payload'
import { ImageSizes } from '../types'
import { logCloudinary } from './logger'

export const buildCloudinarySizes = (
  imageSizes: SanitizedCollectionConfig['upload']['imageSizes'],
  cloudinaryURL: string,
  publicId: string,
  format: string,
  mimetype: string,
): ImageSizes | undefined => {
  logCloudinary('buildCloudinarySizes:', { imageSizes, cloudinaryURL })
  if (!cloudinaryURL || !imageSizes) return undefined

  const baseUrl = cloudinaryURL.split('/upload/')[0]
  const uploadPath = cloudinaryURL.split('/upload/')[1]
  logCloudinary({ baseUrl, uploadPath })
  const result: ImageSizes = {}

  for (const size of imageSizes) {
    const { name, width, height } = size
    if (!name || (!width && !height)) continue

    const parts = []
    if (width) parts.push(`w_${width}`)
    if (height) parts.push(`h_${height}`)
    if (width && height) parts.push('c_fill')

    parts.push('f_auto', 'q_auto')
    const transform = parts.join(',')

    result[name] = {
      url: `${baseUrl}/upload/${transform}/${uploadPath}`,
      width,
      height: height ?? 100,
      mimeType: mimetype,
      filename: `${publicId}-${name}.${format}`,
      filesize: 100,
    }
  }
  logCloudinary('result', { ...result })
  return result
}
