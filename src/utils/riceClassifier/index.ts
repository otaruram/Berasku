import * as tf from '@tensorflow/tfjs';
import { RICE_CLASSES, RICE_VISUAL_CHARACTERISTICS } from './constants';
import { PredictionResult } from './types';
import { loadModel } from './model';
import { analyzeRiceTypeCharacteristics, calculateRiceLikelihood } from './analysis';
import { validatePredictionConsistency } from './validation';

export { RICE_CLASSES };
export type { PredictionResult };
export { loadModel };
export const preloadModel = loadModel;


export const classifyImage = async (imageElement: HTMLImageElement): Promise<PredictionResult[]> => {
    try {
        // Step 1: Strict Non-Rice Detection (The "Bumper")
        const riceLikelihood = calculateRiceLikelihood(imageElement);

        // Threshold 80% seperti permintaan
        if (riceLikelihood.score < 80) {
            const reasons = riceLikelihood.reasons.length > 0
                ? ` (${riceLikelihood.reasons.join(', ')})`
                : '';
            throw new Error(`Objek tidak terdeteksi sebagai beras${reasons}. Pastikan foto jelas dan menampilkan butiran beras.`);
        }

        // Step 2: Advanced visual analysis
        const riceTypeAnalysis = analyzeRiceTypeCharacteristics(imageElement);

        // Step 3: TensorFlow.js Model Prediction
        const loadedModel = await loadModel();

        const tensor = tf.browser.fromPixels(imageElement)
            .resizeBilinear([128, 128])
            .toFloat()
            .div(255.0)
            .expandDims(0);

        const predictions = loadedModel.predict(tensor) as tf.Tensor;
        const probabilities = await predictions.data();

        tensor.dispose();
        predictions.dispose();

        // Step 4: Hybrid Decision Making
        const results: PredictionResult[] = Array.from(probabilities)
            .slice(0, 5)
            .map((probability, index) => ({
                className: RICE_CLASSES[index],
                probability,
            }))
            .sort((a, b) => b.probability - a.probability);

        // Step 5: Enhanced validation logic (Original Layer)
        const topPrediction = results[0];
        const mlConfidence = topPrediction.probability;

        // Use visual fallback if ML is unsure but visual analysis is strong
        const useVisualFallback = (mlConfidence < 0.4 && riceTypeAnalysis.isValidRiceType && riceTypeAnalysis.confidence > 0.4);

        if (useVisualFallback) {
            // Find best visual match
            let bestVisualMatch = "";
            let bestVisualScore = 0;

            Object.entries(RICE_VISUAL_CHARACTERISTICS).forEach(([riceType, specs]) => {
                let score = 0;
                if (riceTypeAnalysis.detectedCharacteristics.avgBrightness >= specs.brightness[0] &&
                    riceTypeAnalysis.detectedCharacteristics.avgBrightness <= specs.brightness[1]) score += 0.3;

                if (riceType === 'Arborio' && riceTypeAnalysis.detectedCharacteristics.pearlRatio > 5) score += 0.4;
                if (riceType === 'Jasmine' && riceTypeAnalysis.detectedCharacteristics.translucencyRatio > 8) score += 0.4;

                if (score > bestVisualScore) {
                    bestVisualScore = score;
                    bestVisualMatch = riceType;
                }
            });

            if (bestVisualMatch && bestVisualScore > 0.5) {
                const existingIndex = results.findIndex(r => r.className === bestVisualMatch);
                if (existingIndex !== -1) {
                    const visualResult = results[existingIndex];
                    results.splice(existingIndex, 1);
                    visualResult.probability = 0.85;
                    results.unshift(visualResult);
                } else {
                    results.unshift({ className: bestVisualMatch, probability: 0.85 });
                }
            }
        }

        // Final sanity check on ML confidence even if "rice likelihood" passed
        // This catches cases where it looks like rice texture/color wise, but the model has no clue what class it is.
        if (results[0].probability < 0.15 && !useVisualFallback) {
            throw new Error(`Jenis beras tidak dapat dikenali dengan pasti. Coba ambil foto lebih dekat.`);
        }

        return results;

    } catch (error) {
        console.warn('Classification error:', error);
        throw error;
    }
};

