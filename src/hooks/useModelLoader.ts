import { useState, useEffect } from 'react';
import { preloadModel } from '@/utils/riceClassifier';

export const useModelLoader = () => {
  const [isModelReady, setIsModelReady] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);

  useEffect(() => {
    const loadModelAsync = async () => {
      try {
        await preloadModel();
        setIsModelReady(true);
      } catch (error) {
        console.error('Failed to preload model:', error);
        setModelError(error instanceof Error ? error.message : 'Gagal memuat model');
      }
    };

    loadModelAsync();
  }, []);

  return { isModelReady, modelError };
};
