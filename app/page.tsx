"use client"


import UploadArea from "../components/upload-area"
import ImageCard from "../components/image-card"

import { useState } from "react"

// Types
type ImageFile = {
    id: string
    name: string
    url: string
}


export default function UploadGallery() {
    const [images, setImages] = useState<ImageFile[]>([
        { id: "1", name: "beach-sunset.jpg", url: "/placeholder.svg?height=200&width=300" },
        { id: "2", name: "mountain-view.jpg", url: "/placeholder.svg?height=200&width=300" },
        { id: "3", name: "city-skyline.jpg", url: "/placeholder.svg?height=200&width=300" },
        { id: "4", name: "forest-path.jpg", url: "/placeholder.svg?height=200&width=300" },
    ])

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // This would normally process the files, but we're just showing the UI
        console.log("Files selected:", e.target.files)
        // Add placeholder logic here
    }

    const handleRemove = (id: string) => {
        setImages(images.filter((image) => image.id !== id))
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">Uploads Gallery</h1>
                </div>

                <UploadArea onUpload={handleUpload} />

                <div className="mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map((image) => (
                            <ImageCard key={image.id} image={image} onRemove={() => handleRemove(image.id)} showName={true} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

