export const logCloudinary = (...args: unknown[]): void => {
  if (process.env.DEBUG_CLOUDINARY === 'true') {
    console.debug('[CloudinaryPlugin]', ...args)
  }
}
