"use client"
import UploadArea from "../components/upload-area"
import ImageCard from "../components/image-card"
import ImageModal from "../components/image-modal"
import LoadingSkeleton from "../components/loading-skeleton"
import type { ImageFile } from "../types/types"
import { useState, useEffect } from "react"
import { getImages, deleteImage } from "@/utils/api-calls"
import { Upload, Images, Sparkles } from "lucide-react"

export default function UploadGallery() {
    const [images, setImages] = useState<ImageFile[]>([])
    const [showGallery, setShowGallery] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true)
                const { images: fetchedImages } = await getImages()
                setImages(fetchedImages)
                setShowGallery(fetchedImages.length > 0)
            } catch (error) {
                console.error("Error fetching images:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchImages()
    }, [])

    const handleRemove = async (id: string) => {
    try {
        const deleted = await deleteImage(id)
        if (deleted) {
            setImages((prev) => {
                const updated = prev.filter((image) => image._id !== id)
                setShowGallery(updated.length > 0)
                return updated
            })
            // Close modal if the deleted image was being viewed
            if (selectedImage?._id === id) {
                setSelectedImage(null)
            }
        }
    } catch (error) {
        console.error("Error deleting image:", error)
    }
    }

    const handleImageClick = (image: ImageFile, index: number) => {
        setSelectedImage(image)
        setSelectedIndex(index)
    }

    const handleUploadComplete = () => {
        // Refresh images after upload
        const fetchImages = async () => {
            try {
                const { images: fetchedImages } = await getImages()
                setImages(fetchedImages)
                setShowGallery(fetchedImages.length > 0)
            } catch (error) {
                console.error("Error fetching images:", error)
            }
        }
        fetchImages()
    }

    const navigateImage = (direction: "prev" | "next") => {
        if (!selectedImage) return

        let newIndex = selectedIndex
        if (direction === "prev") {
            newIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1
        } else {
            newIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0
        }

        setSelectedIndex(newIndex)
        setSelectedImage(images[newIndex])
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                            <Images className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            Media Gallery
                        </h1>
                        <Sparkles className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="text-center text-slate-600 mt-2 text-sm">Upload, organize, and view your media collection</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Upload Section */}
                <div className="mb-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Upload className="h-4 w-4" />
                            <span>Upload Media</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Add Your Files</h2>
                        <p className="text-slate-600 max-w-md mx-auto">
                            Drag and drop your images and videos, or click to browse. Supports up to 15 files.
                        </p>
                    </div>
                    <UploadArea onUploadComplete={handleUploadComplete} />
                </div>

                {/* Gallery Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-800 flex items-center space-x-2">
                                <Images className="h-6 w-6 text-slate-600" />
                                <span>Your Gallery</span>
                            </h2>
                            <p className="text-slate-600 mt-1">
                                {loading ? "Loading..." : `${images.length} ${images.length === 1 ? "item" : "items"}`}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <LoadingSkeleton />
                    ) : showGallery ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {images.map((image, index) => (
                                <ImageCard
                                    key={image._id}
                                    image={image}
                                    onRemove={() => handleRemove(image._id)}
                                    onClick={() => handleImageClick(image, index)}
                                    showName={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                                <Images className="h-12 w-12 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-medium text-slate-800 mb-2">No media yet</h3>
                            <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                                Upload your first image or video to get started with your gallery.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    isOpen={!!selectedImage}
                    onClose={() => setSelectedImage(null)}
                    onPrevious={() => navigateImage("prev")}
                    onNext={() => navigateImage("next")}
                    currentIndex={selectedIndex}
                    totalImages={images.length}
                />
            )}
        </div>
    )
}
