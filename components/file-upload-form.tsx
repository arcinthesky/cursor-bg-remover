"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { uploadAndProcessImage } from "../app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
    >
      {pending ? "Processing..." : "Upload and Process"}
    </button>
  );
}

export function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    originalImage: string;
    processedImage: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      if (!formData.get("file")) {
        throw new Error("No file selected");
      }
      const result = await uploadAndProcessImage(formData);
      setResult({
        originalImage: result.originalImage,
        processedImage: result.processedImage,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Error processing file. Please try again."
      );
    }
  }

  return (
    <div>
      <form action={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose a file
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        <SubmitButton />
      </form>

      {result && (
        <div>
          <h3 className="font-semibold">Images:</h3>
          <p>Original: {result.originalImage}</p>
          <p>Processed: {result.processedImage}</p>
        </div>
      )}
    </div>
  );
}
