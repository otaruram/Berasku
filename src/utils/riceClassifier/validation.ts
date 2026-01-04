
// Validasi konsistensi antara prediksi ML dan karakteristik visual
export const validatePredictionConsistency = (
    predictedType: string,
    detectedCharacteristics: any,
    expectedCharacteristics: any
): boolean => {
    try {
        if (!expectedCharacteristics) return true; // Jika tidak ada ekspektasi, terima prediksi

        let consistencyScore = 0;
        let totalChecks = 0;

        // Check brightness consistency
        const brightnessFits = detectedCharacteristics.avgBrightness >= expectedCharacteristics.brightness[0] &&
            detectedCharacteristics.avgBrightness <= expectedCharacteristics.brightness[1];
        if (brightnessFits) consistencyScore++;
        totalChecks++;

        // Check texture variance consistency
        const textureFits = detectedCharacteristics.avgTextureVariance >= expectedCharacteristics.textureVariance[0] &&
            detectedCharacteristics.avgTextureVariance <= expectedCharacteristics.textureVariance[1];
        if (textureFits) consistencyScore++;
        totalChecks++;

        // Check color-specific characteristics
        switch (expectedCharacteristics.color) {
            case 'pure_white':
                if (detectedCharacteristics.whiteRatio > 10) consistencyScore++;
                totalChecks++;
                break;
            case 'cream_white':
                if (detectedCharacteristics.creamRatio > 8) consistencyScore++;
                totalChecks++;
                break;
            case 'pearl_white':
                if (detectedCharacteristics.pearlRatio > 6) consistencyScore++;
                totalChecks++;
                break;
            case 'aged_white':
            case 'jasmine_white':
                if (detectedCharacteristics.translucencyRatio > 8) consistencyScore++;
                totalChecks++;
                break;
        }

        const consistencyRatio = consistencyScore / totalChecks;
        const isConsistent = consistencyRatio >= 0.5; // 50% konsistensi minimum

        // console.log(`Consistency check for ${predictedType}:`, {
        //   consistencyScore,
        //   totalChecks,
        //   consistencyRatio: Math.round(consistencyRatio * 100) + '%',
        //   isConsistent
        // });

        return isConsistent;
    } catch (error) {
        console.warn('Consistency validation failed:', error);
        return true; // Jika gagal validasi, terima prediksi
    }
};
