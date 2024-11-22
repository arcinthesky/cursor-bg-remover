import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Processor",
  description: "Upload and process images",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">AI Background Remover</h1>
          </header>
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <footer className="bg-gray-200 p-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} Digital Midnight - All rights
              reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
