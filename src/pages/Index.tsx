import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import ResultsDisplay from "@/components/ResultsDisplay";
import ModelStatus from "@/components/ModelStatus";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { classifyImage } from "@/utils/riceClassifier";
import { useModelLoader } from "@/hooks/useModelLoader";

interface Prediction {
  className: string;
  probability: number;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { isModelReady, modelError } = useModelLoader();

  useEffect(() => {
    if (modelError) {
      toast.error(modelError);
    }
  }, [modelError]);

  useEffect(() => {
    if (isModelReady) {
      toast.success("Model AI berhasil dimuat!");
    }
  }, [isModelReady]);

  const handleImageSelect = async (file: File) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file terlalu besar. Maksimal 10MB.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (JPG, PNG, WEBP).");
      return;
    }

    // Store the file for later analysis
    setImageFile(file);
    setPredictions([]); // Clear previous predictions

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setSelectedImage(imageUrl);
      toast.success("Foto berhasil diupload! Klik 'Mulai Analisis' untuk mengidentifikasi jenis beras.");
    };

    reader.onerror = () => {
      toast.error("Gagal membaca file gambar");
    };

    reader.readAsDataURL(file);
  };

  const handleStartAnalysis = async () => {
    if (!imageFile || !selectedImage) {
      toast.error("Silakan upload foto terlebih dahulu.");
      return;
    }

    // Check if model is ready
    if (!isModelReady) {
      toast.error("Model AI masih dimuat. Mohon tunggu sebentar...");
      return;
    }

    setIsLoading(true);
    setPredictions([]);

    // Create image element for classification
    const img = new Image();
    img.onload = async () => {
      imageRef.current = img;
      
      try {
        // Perform real prediction using TensorFlow.js
        const results = await classifyImage(img);
        setPredictions(results);
        toast.success(`Teridentifikasi sebagai: ${results[0].className}`);
      } catch (error) {
        console.error("Prediction error:", error);
        toast.error(error instanceof Error ? error.message : "Terjadi kesalahan saat memprediksi gambar");
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      toast.error("Gagal memuat gambar");
      setIsLoading(false);
    };

    img.src = selectedImage;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <ImageUpload onImageSelect={handleImageSelect} isLoading={isLoading} />
          
          {selectedImage && (
            <div className="flex justify-center">
              <Button 
                onClick={handleStartAnalysis}
                disabled={isLoading || !isModelReady}
                size="lg"
                className="px-8 py-3 text-lg font-semibold"
              >
                {isLoading ? "Menganalisis..." : "🔍 Mulai Analisis Beras"}
              </Button>
            </div>
          )}
          
          <ResultsDisplay 
            image={selectedImage} 
            predictions={predictions} 
            isLoading={isLoading}
          />
        </div>
      </main>

      <Footer />
      <ModelStatus isReady={isModelReady} hasError={!!modelError} />
    </div>
  );
};

export default Index;
