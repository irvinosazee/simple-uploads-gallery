"use client"

import type { ImageFile } from "../types/types"
import { X, ChevronLeft, ChevronRight, Download, Info } from "lucide-react"
import { useEffect, useState } from "react"

interface ImageModalProps {
    image: ImageFile
    isOpen: boolean
    onClose: () => void
    onPrevious: () => void
    onNext: () => void
    currentIndex: number
    totalImages: number
}

export default function ImageModal({
    image,
    isOpen,
    onClose,
    onPrevious,
    onNext,
    currentIndex,
    totalImages,
}: ImageModalProps) {
    const [showInfo, setShowInfo] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return

            switch (e.key) {
                case "Escape":
                    onClose()
                    break
                case "ArrowLeft":
                    onPrevious()
                    break
                case "ArrowRight":
                    onNext()
                    break
                case "i":
                case "I":
                    setShowInfo(!showInfo)
                    break
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose, onPrevious, onNext, showInfo])

    const handleDownload = async () => {
        try {
            const response = await fetch(image.url)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = image.name
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error("Download failed:", error)
        }
    }

    const isVideo = image.url.includes(".mp4") || image.url.includes(".mov") || image.url.includes(".webm")

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                        <h3 className="font-medium truncate max-w-md">{image.name}</h3>
                        <span className="text-sm text-white/70">
                            {currentIndex + 1} of {totalImages}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowInfo(!showInfo)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                            aria-label="Toggle info"
                        >
                            <Info className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                            aria-label="Download"
                        >
                            <Download className="h-5 w-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center h-full p-4 pt-20 pb-16">
                <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
                    {isVideo ? (
                        <video
                            src={image.url}
                            controls
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            autoPlay
                        />
                    ) : (
                        <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        />
                    )}
                </div>
            </div>

            {/* Navigation */}
            {totalImages > 1 && (
                <>
                    <button
                        onClick={onPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}

            {/* Info Panel */}
            {showInfo && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="max-w-4xl mx-auto text-white">
                        <h4 className="font-semibold mb-2">File Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-white/70">Name:</span>
                                <span className="ml-2">{image.name}</span>
                            </div>
                            <div>
                                <span className="text-white/70">Type:</span>
                                <span className="ml-2">{isVideo ? "Video" : "Image"}</span>
                            </div>
                        </div>
                        <p className="text-xs text-white/50 mt-4">Press ESC to close • Arrow keys to navigate • I to toggle info</p>
                    </div>
                </div>
            )}

            {/* Click outside to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose} aria-label="Close modal" />
        </div>
    )
}
