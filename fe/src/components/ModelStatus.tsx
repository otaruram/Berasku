import { Brain, CheckCircle, Loader2, AlertCircle } from "lucide-react";

interface ModelStatusProps {
  isReady: boolean;
  hasError: boolean;
}

const ModelStatus = ({ isReady, hasError }: ModelStatusProps) => {
  if (hasError) {
    return (
      <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Model gagal dimuat</span>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="fixed bottom-4 right-4 bg-card text-card-foreground px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom border border-border">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <span className="text-sm font-medium">Memuat model AI...</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom">
      <CheckCircle className="w-5 h-5" />
      <span className="text-sm font-medium">Model siap digunakan</span>
    </div>
  );
};

export default ModelStatus;
