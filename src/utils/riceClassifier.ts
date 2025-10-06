import * as tf from '@tensorflow/tfjs';

// 20 kelas jenis beras - sesuaikan dengan label model Anda
export const RICE_CLASSES = [
  'Arborio',
  'Basmati',
  'Ipsala',
  'Jasmine',
  'Karacadag',
  'Beras Merah',
  'Beras Hitam',
  'Beras Coklat',
  'Beras Ketan',
  'Beras Organik',
  'Beras Pandan Wangi',
  'Beras IR64',
  'Beras Mentik Wangi',
  'Beras Ciherang',
  'Beras Rojolele',
  'Beras Jepang',
  'Beras Shirataki',
  'Beras Setra Ramos',
  'Beras Pera',
  'Beras Pulen'
] as const;

let model: tf.GraphModel | null = null;
let isModelLoading = false;

export const loadModel = async (): Promise<tf.GraphModel> => {
  if (model) {
    return model;
  }

  if (isModelLoading) {
    // Wait for the model to finish loading
    while (isModelLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (model) return model;
  }

  try {
    isModelLoading = true;
    console.log('Loading TensorFlow.js model...');
    
    const loadedModel = await tf.loadGraphModel('/model/model.json');
    model = loadedModel;
    
    console.log('Model loaded successfully!');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw new Error('Gagal memuat model AI. Pastikan file model tersedia.');
  } finally {
    isModelLoading = false;
  }
};

export interface PredictionResult {
  className: string;
  probability: number;
}

export const classifyImage = async (imageElement: HTMLImageElement): Promise<PredictionResult[]> => {
  try {
    const loadedModel = await loadModel();

    // Preprocess image to 128x128 as required by the model
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeBilinear([128, 128])
      .toFloat()
      .div(255.0) // Normalize to [0, 1]
      .expandDims(0); // Add batch dimension

    // Make prediction
    const predictions = loadedModel.predict(tensor) as tf.Tensor;
    const probabilities = await predictions.data();

    // Clean up tensors
    tensor.dispose();
    predictions.dispose();

    // Get top 5 predictions
    const results: PredictionResult[] = Array.from(probabilities)
      .map((probability, index) => ({
        className: RICE_CLASSES[index] || `Kelas ${index + 1}`,
        probability,
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 5);

    return results;
  } catch (error) {
    console.error('Classification error:', error);
    throw new Error('Gagal melakukan prediksi. Silakan coba lagi.');
  }
};

export const preloadModel = async (): Promise<void> => {
  try {
    await loadModel();
  } catch (error) {
    console.error('Error preloading model:', error);
  }
};
