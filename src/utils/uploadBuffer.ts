import { UploadApiOptions, UploadApiResponse } from 'cloudinary'
import { Readable } from 'stream'
import { cloudinary } from './cloudinary'

export const uploadBufferToCloudinary = (
  buffer: Buffer,
  options: UploadApiOptions = {},
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err)
      resolve(result as UploadApiResponse)
    })

    const readable = new Readable()
    readable.push(buffer)
    readable.push(null)
    readable.pipe(stream)
  })
}
