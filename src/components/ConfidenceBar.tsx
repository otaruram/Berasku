interface ConfidenceBarProps {
  label: string;
  confidence: number;
  isTopPrediction?: boolean;
}

const ConfidenceBar = ({ label, confidence, isTopPrediction = false }: ConfidenceBarProps) => {
  const percentage = (confidence * 100).toFixed(1);

  return (
    <div className={`w-full ${isTopPrediction ? "mb-6" : "mb-3"}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`font-semibold ${isTopPrediction ? "text-xl" : "text-base"}`}>
          {label}
        </span>
        <span className={`font-bold ${isTopPrediction ? "text-xl text-primary" : "text-sm text-muted-foreground"}`}>
          {percentage}%
        </span>
      </div>
      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            isTopPrediction 
              ? "bg-gradient-to-r from-primary to-accent" 
              : "bg-primary/60"
          }`}
          style={{ 
            width: `${confidence * 100}%`,
            animation: "slideIn 1s ease-out"
          }}
        />
      </div>
    </div>
  );
};

export default ConfidenceBar;
