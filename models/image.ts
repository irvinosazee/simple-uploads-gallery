import mongoose, { Schema, Document, models } from 'mongoose'
import { ImageFile } from '../types/types'

export interface IImage extends Omit<ImageFile, '_id'>, Document {}

const ImageSchema: Schema = new Schema<IImage>(
    {
        name: { 
            type: String, 
            required: true 
        },
        url: { 
            type: String, 
            required: true
        }
    },
    { timestamps: true }
)

export default models.Image || mongoose.model<IImage>('Image', ImageSchema)
