import {ImageFile} from "../types/types"

import { X } from "lucide-react"

// Image Card Component
interface ImageCardProps {
    image: ImageFile
    onRemove: () => void
    showName?: boolean
}

export default function ImageCard({ image, onRemove, showName = false }: ImageCardProps) {
    return (
        <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="aspect-square relative overflow-hidden">
                <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                    aria-label="Remove image"
                >
                    <X className="h-4 w-4 text-gray-700" />
                </button>
            </div>

            {showName && (
                <div className="p-2 text-center truncate">
                    <p className="text-sm text-gray-700">{image.name}</p>
                </div>
            )}
        </div>
    )
}
