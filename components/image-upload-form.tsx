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
      {pending ? "กำลังประมวลผล..." : "อัพโหลดและลบพื้นหลัง"}
    </button>
  );
}

export function ImageUploadForm() {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      const result = await uploadAndProcessImage(formData);
      const imageDisplay = document.getElementById("image-display");
      if (imageDisplay) {
        imageDisplay.innerHTML = `
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="font-semibold mb-2">รูปภาพต้นฉบับ</h3>
              <img src="${result.originalImage}" alt="Original" class="max-w-full h-auto" />
            </div>
            <div>
              <h3 class="font-semibold mb-2">รูปภาพที่ลบพื้นหลังแล้ว</h3>
              <img src="${result.processedImage}" alt="Processed" class="max-w-full h-auto" />
            </div>
          </div>
        `;
      }
    } catch (error) {
      console.error("Error processing image:", error);
      alert("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ กรุณาลองใหม่อีกครั้ง");
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          เลือกรูปภาพ
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
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
  );
}
