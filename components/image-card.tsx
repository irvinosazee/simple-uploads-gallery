"use client"

import type React from "react"

import type { ImageFile } from "../types/types"
import { X, Eye, Download } from "lucide-react"
import { useState } from "react"

interface ImageCardProps {
    image: ImageFile
    onRemove: () => void
    onClick: () => void
    showName?: boolean
}

export default function ImageCard({ image, onRemove, onClick, showName = false }: ImageCardProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation()
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

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        onRemove()
    }

    const isVideo = image.url.includes(".mp4") || image.url.includes(".mov") || image.url.includes(".webm")

    return (
        <div
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-slate-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className="aspect-square relative overflow-hidden bg-slate-100">
                {isVideo ? (
                    <video
                        src={image.url}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onLoadedData={() => setIsLoading(false)}
                        muted
                        preload="metadata"
                    />
                ) : (
                    <img
                        src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onLoad={() => setIsLoading(false)}
                    />
                )}

                {isLoading && <div className="absolute inset-0 bg-slate-200 animate-pulse" />}

                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
                />

                {/* Action Buttons */}
                <div
                    className={`absolute inset-0 flex items-center justify-center space-x-2 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
                >
                    <button
                        onClick={onClick}
                        className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-200"
                        aria-label="View image"
                    >
                        <Eye className="h-4 w-4 text-slate-700" />
                    </button>
                    <button
                        onClick={handleDownload}
                        className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-200"
                        aria-label="Download image"
                    >
                        <Download className="h-4 w-4 text-slate-700" />
                    </button>
                </div>

                {/* Remove Button */}
                <button
                    onClick={handleRemove}
                    className={`absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                    aria-label="Remove image"
                >
                    <X className="h-3 w-3" />
                </button>

                {/* Video indicator */}
                {isVideo && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
                        Video
                    </div>
                )}
            </div>

            {showName && (
                <div className="p-3">
                    <p className="text-sm text-slate-700 truncate font-medium">{image.name}</p>
                </div>
            )}
        </div>
    )
}
