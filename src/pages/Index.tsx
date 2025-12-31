import { useState, useRef, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
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
  const imageRef = useRef<HTMLImageElement | null>(null); // Keep ref for classifyImage if needed, though we create new Image() in handler
  const { isModelReady, modelError } = useModelLoader();

  useEffect(() => {
    if (modelError) {
      toast.error(modelError);
    }
  }, [modelError]);

  const handleImageSelect = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size too large. Max 10MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image (JPG, PNG, WEBP).");
      return;
    }

    setImageFile(file);
    setPredictions([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setSelectedImage(imageUrl);
      // Auto-analyze could happen here if desired, but user asked for "Result Card: When a result is found"
      // and HeroSection has a "Start Analysis" button.
    };
    reader.onerror = () => toast.error("Failed to read image file");
    reader.readAsDataURL(file);
  };

  const handleStartAnalysis = async () => {
    if (!imageFile || !selectedImage) {
      toast.error("No image selected.");
      return;
    }

    if (!isModelReady) {
      toast.error("Model is still loading...");
      return;
    }

    setIsLoading(true);
    setPredictions([]);

    const img = new Image();
    img.onload = async () => {
      imageRef.current = img;
      try {
        const results = await classifyImage(img);
        setPredictions(results);
        toast.success("Analysis Complete!");
      } catch (error) {
        console.error("Prediction error:", error);
        toast.error("Analysis failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    img.onerror = () => {
      toast.error("Failed to load image for analysis");
      setIsLoading(false);
    };
    img.src = selectedImage;
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPredictions([]);
    setImageFile(null);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 selection:text-blue-200">
      <HeroSection
        onImageSelect={handleImageSelect}
        isLoading={isLoading}
        selectedImage={selectedImage}
        predictions={predictions}
        startAnalysis={handleStartAnalysis}
        isModelReady={isModelReady}
        onClear={handleClear}
      />


    </div>
  );
};

export default Index;
