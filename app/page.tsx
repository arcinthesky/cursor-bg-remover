import { ImageUploadForm } from "../components/image-upload-form";
import { ImageDisplay } from "../components/image-display";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <ImageUploadForm />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Processed Image</h2>
        <ImageDisplay />
      </div>
    </div>
  );
}
