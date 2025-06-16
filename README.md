# Simple Uploads Gallery

A modern web application for uploading, organizing, and viewing images and videos, built with Next.js, UploadThing, and MongoDB. This project demonstrates a simple storage bucket/gallery implementation with a clean UI and smooth user experience.

## Table of Contents

- [Simple Uploads Gallery](#simple-uploads-gallery)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Setup \& Installation](#setup--installation)
  - [Environment Variables](#environment-variables)
  - [How It Works](#how-it-works)
    - [Uploading Files](#uploading-files)
    - [Saving Metadata](#saving-metadata)
    - [Gallery Display](#gallery-display)
    - [Viewing \& Deleting Media](#viewing--deleting-media)
  - [API Endpoints](#api-endpoints)
    - [POST /api/image](#post-apiimage)
    - [GET /api/image](#get-apiimage)
    - [DELETE /api/image](#delete-apiimage)
    - [UploadThing API](#uploadthing-api)
  - [Key Components \& Files](#key-components--files)
  - [Custom Styling](#custom-styling)
  - [Extending the Project](#extending-the-project)
  - [Troubleshooting](#troubleshooting)
  - [License](#license)


## Features
- Upload images (up to 64MB) and videos (up to 128MB)
- Drag-and-drop or click-to-upload interface
- Gallery view with preview, download, and delete options
- Modal viewer with navigation and file info
- Responsive, accessible, and visually appealing UI
- MongoDB-backed metadata storage


## Project Structure
```
├── app/
│   ├── api/
│   │   ├── image/route.ts         # REST API for image metadata
│   │   └── uploadthing/           # UploadThing API integration
│   ├── globals.css                # Global styles (Tailwind + custom)
│   ├── layout.tsx                 # Root layout (metadata, favicon, etc.)
│   └── page.tsx                   # Main gallery page
├── components/
│   ├── image-card.tsx             # Gallery card for each image/video
│   ├── image-modal.tsx            # Modal for viewing media
│   ├── loading-skeleton.tsx       # Skeleton loader for gallery
│   └── upload-area.tsx            # Upload UI
├── lib/
│   └── mongodb.ts                 # MongoDB connection helper
├── models/
│   └── image.ts                   # Mongoose model for image metadata
├── types/
│   └── types.ts                   # TypeScript types
├── utils/
│   ├── api-calls.ts               # Client-side API helpers
│   └── uploadthing.ts             # UploadThing React helpers
├── public/
│   └── favicon/                   # Favicon assets
├── postcss.config.mjs             # PostCSS config (Tailwind)
├── tailwind.config.js             # Tailwind config (not shown)
├── .env.local                     # Environment variables (not committed)
└── ...
```


## Setup & Installation

1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd simple-uploads-gallery
    ```

2. Install dependencies:
    ```bash
    pnpm install
    # or
    npm install
    ```

3. Configure environment variables:
    - Copy `.env.local.example` to `.env.local` (if provided) or create `.env.local`
    - Add your MongoDB connection string:
      ```
      MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority
      ```
    - Add any required UploadThing credentials (see UploadThing docs)

4. Run the development server:
    ```bash
    pnpm dev
    # or
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables
- `MONGODB_URI` — Your MongoDB connection string.
- `UPLOADTHING_TOKEN` — Your Upload thing Token.

## How It Works

### Uploading Files
- The upload UI is rendered by `components/upload-area.tsx`.
- Uses `UploadButton` from UploadThing for drag-and-drop or click-to-upload.
- Supports images (up to 64MB) and videos (up to 128MB), up to 15 files at once.

### Saving Metadata
- After a successful upload, `saveMetadata` is called for each file.
- Metadata (name, URL) is sent to the backend via `/api/image`.
- Metadata is stored in MongoDB using the Image model.

### Gallery Display
- The gallery is rendered in `app/page.tsx`.
- Images/videos are fetched from the backend using `getImages`.
- Each media item is displayed using `ImageCard`.

### Viewing & Deleting Media
- Clicking a card opens `ImageModal` for preview, navigation, and info.
- Download and delete actions are available in both the card and modal.
- Deleting an item removes it from the database and updates the UI.

## API Endpoints

### POST /api/image
- Body: `{ name: string, url: string }`
- Response: `{ image: ImageFile }`
- Creates a new image/video metadata entry.

### GET /api/image
- Response: `{ images: ImageFile[] }`
- Fetches all images/videos, sorted by newest first.

### DELETE /api/image
- Body: `{ id: string }`
- Response: `{ message: string }`
- Deletes an image/video by ID.

### UploadThing API
- Handled via `app/api/uploadthing/route.ts` and `core.ts`.
- See UploadThing docs for more.

## Key Components & Files
- `app/page.tsx`: Main page, handles state, fetches images, manages modal.
- `components/upload-area.tsx`: Upload UI, integrates UploadThing.
- `components/image-card.tsx`: Card for each gallery item.
- `components/image-modal.tsx`: Modal for viewing and navigating media.
- `utils/api-calls.ts`: Client-side API helpers for CRUD operations.
- `models/image.ts`: Mongoose schema/model for image metadata.
- `lib/mongodb.ts`: MongoDB connection logic.
- `app/globals.css`: Tailwind and custom styles.

## Custom Styling
- Uses Tailwind CSS for utility-first styling.
- Custom scrollbar, button, and modal styles in `app/globals.css`.
- UploadThing buttons styled via `.upload-button-container` classes.

## Extending the Project
- Authentication: Add user accounts to make galleries private.
- Tags/Categories: Add tags or folders for better organization.
- Cloud Storage: Integrate with S3, Cloudinary, or similar for file storage.
- Pagination: Add pagination or infinite scroll for large galleries.
- Image Processing: Add thumbnails, resizing, or video previews.

## Troubleshooting
- MongoDB connection errors: Check your `MONGODB_URI` in `.env.local`.
- Uploads not working: Ensure UploadThing credentials are set and correct.
- CORS issues: Make sure API routes are correctly configured for your deployment.

## License
MIT — See LICENSE for details.

**For questions or contributions, open an issue or pull request!**
