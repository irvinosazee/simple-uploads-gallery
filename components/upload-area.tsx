"use client"

import { UploadButton } from "@/utils/uploadthing"
import { saveMetadata } from "@/utils/api-calls"
import { Upload, FileImage, Video, CheckCircle } from "lucide-react"
import { useState } from "react"

interface UploadAreaProps {
    onUploadComplete?: () => void
}

export default function UploadArea({ onUploadComplete }: UploadAreaProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="relative">
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors duration-200 rounded-2xl p-8 bg-white/50 backdrop-blur-sm">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                            {uploadSuccess ? (
                                <CheckCircle className="h-8 w-8 text-white" />
                            ) : (
                                <Upload className="h-8 w-8 text-white" />
                            )}
                        </div>

                        {uploadSuccess ? (
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-green-700">Upload Complete!</h3>
                                <p className="text-sm text-green-600">Your files have been successfully uploaded.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                        {isUploading ? "Uploading..." : "Upload your media"}
                                    </h3>
                                    <p className="text-sm text-slate-600 mb-4">Drag and drop files here, or click to browse</p>
                                </div>

                                <div className="flex items-center justify-center space-x-6 text-xs text-slate-500 mb-6">
                                    <div className="flex items-center space-x-1">
                                        <FileImage className="h-4 w-4" />
                                        <span>Images up to 64MB</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Video className="h-4 w-4" />
                                        <span>Videos up to 128MB</span>
                                    </div>
                                </div>

                                <div className="upload-button-container">
                                    <UploadButton
                                        endpoint="imageUploader"
                                            onUploadBegin={() => {
                                                setIsUploading(true)
                                                setUploadSuccess(false)
                                            }}
                                            onClientUploadComplete={(res) => {
                                                setIsUploading(false)
                                                setUploadSuccess(true)
                                                res.forEach((file) => saveMetadata(file))
                                                console.log("Files: ", res)

                                                // Reset success state after 3 seconds
                                                setTimeout(() => {
                                                    setUploadSuccess(false)
                                                }, 3000)

                                                onUploadComplete?.()
                                            }}
                                            onUploadError={(error: Error) => {
                                                setIsUploading(false)
                                                console.log("Error: ", error)
                                                alert(`Upload failed: ${error.message}`)
                                            }}
                                            appearance={{
                                                container: "space-x-4 grid place-items-center",
                                                button:
                                                    "text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl ut-ready:bg-gradient-to-r ut-ready:from-blue-500 ut-ready:to-purple-600 ut-uploading:bg-slate-400 ut-uploading:cursor-not-allowed",
                                                allowedContent: "text-slate-600 mt-2",
                                            }}
                                        />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {isUploading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-sm font-medium text-slate-700">Uploading your files...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
