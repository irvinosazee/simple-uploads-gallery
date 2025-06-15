import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: { maxFileSize: "64MB", maxFileCount: 15 },
        video: { maxFileSize: "128MB", maxFileCount: 15 },
    })
        .onUploadComplete(async ({ file }) => {
            console.log("Upload complete");
            console.log("File URL:", file.ufsUrl);
            console.log("File Name:", file.name);
            console.log("File Size:", file.size);   
            return { uploadedUrl: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
