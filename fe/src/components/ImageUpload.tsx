import { Upload, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

const ImageUpload = ({ onImageSelect, isLoading }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative w-full max-w-2xl mx-auto p-12 rounded-2xl border-2 border-dashed 
        transition-all duration-300 cursor-pointer
        ${isDragging 
          ? "border-primary bg-primary/5 scale-[1.02]" 
          : "border-border hover:border-primary/50 hover:bg-accent/5"
        }
        ${isLoading ? "opacity-50 pointer-events-none" : ""}
      `}
      style={{ boxShadow: isDragging ? "var(--shadow-md)" : "var(--shadow-sm)" }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isLoading}
      />
      
      <div className="flex flex-col items-center gap-4">
        <div className="p-6 rounded-full bg-primary/10">
          {isDragging ? (
            <ImageIcon className="w-12 h-12 text-primary animate-bounce" />
          ) : (
            <Upload className="w-12 h-12 text-primary" />
          )}
        </div>
        
        <div className="text-center">
          <Button 
            variant="default" 
            size="lg" 
            className="mb-3 font-semibold shadow-lg hover:shadow-xl transition-all"
            disabled={isLoading}
          >
            <Upload className="w-5 h-5 mr-2" />
            Pilih Gambar
          </Button>
          <p className="text-sm text-muted-foreground">
            Seret & lepas foto beras di sini, atau klik untuk memilih
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Format: JPG, PNG, WEBP (Max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
