import { Field } from 'payload'

export const cloudinaryFields: Field[] = [
  { name: 'cloudinaryURL', type: 'text', admin: { readOnly: true } },
  { name: 'cloudinaryPublicId', type: 'text', admin: { readOnly: true } },
]
