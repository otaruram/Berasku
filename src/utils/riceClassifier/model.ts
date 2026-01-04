import * as tf from '@tensorflow/tfjs';

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
        // console.log('Loading TensorFlow.js model...');

        const loadedModel = await tf.loadGraphModel('/model/model.json');
        model = loadedModel;

        // console.log('Model loaded successfully!');
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
        throw new Error('Gagal memuat model AI. Pastikan file model tersedia.');
    } finally {
        isModelLoading = false;
    }
};
