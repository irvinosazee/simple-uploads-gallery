"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

// Upload Area Component
interface UploadAreaProps {
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function UploadArea({ onUpload }: UploadAreaProps) {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        // This would normally process the dropped files
        console.log("Files dropped:", e.dataTransfer.files)
    }

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                    <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <p className="text-lg font-medium text-gray-700">Drag and drop your images here</p>
                    <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                </div>
                <label className="inline-block">
                    <input type="file" className="hidden" accept="image/*" multiple onChange={onUpload} />
                    <span className="px-4 py-2 bg-primary text-black rounded-md shadow-sm hover:bg-primary/90 transition-colors cursor-pointer inline-block">
                        Upload Image
                    </span>
                </label>
            </div>
        </div>
    )
}
