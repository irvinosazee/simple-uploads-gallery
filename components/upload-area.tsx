"use client";

import { UploadButton } from "@/utils/uploadthing";
import { saveMetadata } from "@/utils/api-calls";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    saveMetadata(res[0]);
                    console.log("Files: ", res);
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    console.log("Error: ", error);
                    alert(`ERROR! Check Console for details`);
                }}
            />
        </main>
    );
}
