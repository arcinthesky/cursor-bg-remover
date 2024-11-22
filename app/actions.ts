"use server";

import { fal } from "@fal-ai/client";
import { revalidatePath } from "next/cache";

fal.config({
  credentials: process.env.FAL_KEY!,
});

export async function uploadAndProcessImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file uploaded");
    }

    // อัพโหลดไฟล์ไปที่ Fal storage
    const imageUrl = await fal.storage.upload(file);

    // เรียกใช้ Background Remover API
    const result = await fal.subscribe("fal-ai/birefnet/v2", {
      input: {
        image_url: imageUrl,
        model: "General Use (Light)", // เลือกโมเดลที่ต้องการใช้
        output_format: "png",
        refine_foreground: true,
      },
    });

    revalidatePath("/");

    return {
      originalImage: imageUrl,
      processedImage: result.data.image.url,
    };
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}
