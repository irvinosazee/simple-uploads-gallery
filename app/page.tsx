"use client"

import type React from "react"

import UploadArea from "../components/upload-area"
import ImageCard from "../components/image-card"
import type { ImageFile } from "../types/types"

import { useState, useEffect } from "react"
import { getImages, deleteImage } from "@/utils/api-calls";

export default function UploadGallery() {
    const [images, setImages] = useState<ImageFile[]>([])
    const [showGallery, setShowGallery] = useState(false)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { images: fetchedImages } = await getImages();
                setImages(fetchedImages);
                setShowGallery(fetchedImages.length > 0);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    },[]);

const handleRemove = async (id: string) => {
    try {
        await deleteImage(id);
        setImages((prev) => {
            const updated = prev.filter((image) => image._id !== id);
            setShowGallery(updated.length > 0);
            return updated;
        });
        console.log("Image deleted successfully");
    } catch (error) {
        console.error("Error deleting image:", error);
    }
};

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">Uploads Gallery</h1>
                </div>

                <div className={`h-40 text-black grid place-items-center`}>
                    <UploadArea />
                </div>

                <div className="text-center mt-8">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8"> Gallery</h1>
                </div>


                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${showGallery ? "max-h-auto opacity-100 mt-10" : "max-h-0 opacity-0 mt-0"
                        }`}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map((image) => (
                            <ImageCard key={image._id} image={image} onRemove={() => handleRemove(image._id)} showName={true} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


