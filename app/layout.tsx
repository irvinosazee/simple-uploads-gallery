import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Simple Uploads Gallery",
  description: "A simple implementation of storage buckets using Next.js, Uploadthing & Mongo Db",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/favicon/site.webmanifest"/>
      </head>
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
