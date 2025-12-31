import { Loader2 } from "lucide-react";
import ConfidenceBar from "./ConfidenceBar";

interface Prediction {
  className: string;
  probability: number;
}

interface ResultsDisplayProps {
  image: string | null;
  predictions: Prediction[];
  isLoading: boolean;
}

const ResultsDisplay = ({ image, predictions, isLoading }: ResultsDisplayProps) => {
  if (!image) {
    return (
      <div className="w-full max-w-4xl mx-auto p-12 rounded-2xl bg-card text-center" style={{ boxShadow: "var(--shadow-sm)" }}>
        <p className="text-muted-foreground text-lg">
          Hasil identifikasi akan muncul di sini setelah Anda mengunggah foto beras...
        </p>
      </div>
    );
  }

  return (
    <div 
      className="w-full max-w-4xl mx-auto p-8 rounded-2xl bg-card"
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Preview */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Gambar yang Diunggah</h3>
          <div className="relative rounded-xl overflow-hidden bg-secondary" style={{ boxShadow: "var(--shadow-sm)" }}>
            <img
              src={image}
              alt="Uploaded preview"
              className="w-full h-auto object-contain max-h-96"
            />
          </div>
        </div>

        {/* Predictions */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Hasil Prediksi</h3>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground font-medium">Mengidentifikasi jenis beras...</p>
            </div>
          ) : predictions.length > 0 ? (
            <div className="space-y-4">
              {/* Top Prediction */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <ConfidenceBar
                  label={predictions[0].className}
                  confidence={predictions[0].probability}
                  isTopPrediction
                />
              </div>

              {/* Other Top Predictions */}
              {predictions.length > 1 && (
                <div className="pt-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                    Prediksi Alternatif:
                  </h4>
                  <div className="space-y-2">
                    {predictions.slice(1, 5).map((pred, idx) => (
                      <ConfidenceBar
                        key={idx}
                        label={pred.className}
                        confidence={pred.probability}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Tidak ada prediksi tersedia</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
