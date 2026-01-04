import { RICE_VISUAL_CHARACTERISTICS } from './constants';

// Enhanced detection untuk semua style foto beras termasuk attachment
export const detectPhotoStyle = (imageElement: HTMLImageElement, analysis: any): string => {
    const { avgBrightness, backgroundRatio, textureVariance, edgeRatio, centerAvgBrightness, steamyRatio, glossyRatio } = analysis;

    // Bowl presentation detection (foto dalam mangkuk)
    if (backgroundRatio > 20 && backgroundRatio < 60 && centerAvgBrightness > 160 && edgeRatio < 10) {
        return 'bowl_presentation';
    }

    // High contrast professional (dark background, bright rice)
    if (avgBrightness < 120 && centerAvgBrightness > 180 && backgroundRatio > 50) {
        return 'high_contrast_pro';
    }

    // Steamy hot rice detection
    if (steamyRatio > 20 || glossyRatio > 25 || (edgeRatio < 6 && centerAvgBrightness > 180)) {
        return 'steamy_hot_rice';
    }

    // Scattered long grain (seperti Basmati scattered)
    if (edgeRatio > 15 && textureVariance > 25 && backgroundRatio < 30) {
        return 'scattered_long_grain';
    }

    // Kitchen/Rustic style detection
    if (backgroundRatio > 25 && avgBrightness < 200 && textureVariance > 15) {
        return 'kitchen_rustic';
    }

    // Cooked rice detection (lebih halus, kurang edge)
    if (edgeRatio < 8 && avgBrightness > 160 && textureVariance < 20) {
        return 'cooked_rice';
    }

    // Raw grains (lebih tajam, banyak edge)
    if (edgeRatio > 12 && textureVariance > 20) {
        return 'raw_grains';
    }

    // Commercial stock style (background putih/gradient)
    if (backgroundRatio > 40 && avgBrightness > 180) {
        return 'commercial_stock';
    }

    // Multiple variety display (variance sangat tinggi)
    if (textureVariance > 40) {
        return 'multiple_variety_display';
    }

    // Mixed varieties (variance tinggi)
    if (textureVariance > 30) {
        return 'mixed_varieties';
    }

    return 'standard';
};

// Advanced visual analysis untuk deteksi 5 jenis beras spesifik + mixed rice photos
export const analyzeRiceTypeCharacteristics = (imageElement: HTMLImageElement): {
    isValidRiceType: boolean;
    detectedCharacteristics: any;
    confidence: number;
    photoType: string;
} => {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return { isValidRiceType: true, detectedCharacteristics: {}, confidence: 0.5, photoType: 'unknown' };

        canvas.width = 200;
        canvas.height = 200;
        ctx.drawImage(imageElement, 0, 0, 200, 200);

        const imageData = ctx.getImageData(0, 0, 200, 200);
        const data = imageData.data;

        // Analisis karakteristik visual mendalam
        let totalBrightness = 0;
        let whitePixels = 0;
        let creamPixels = 0;
        let pearlPixels = 0;
        let brownPixels = 0; // Untuk background kayu
        let translucencyScore = 0;
        let textureVarianceSum = 0;
        let edgeCount = 0;
        let backgroundPixels = 0;
        let totalPixels = 0;

        // Deteksi area background vs foreground
        const centerRegion = { x: 50, y: 50, width: 100, height: 100 }; // Area tengah untuk beras

        // Analisis setiap pixel untuk karakteristik beras dan background
        for (let y = 0; y < 200; y++) {
            for (let x = 0; x < 200; x++) {
                const i = (y * 200 + x) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                const brightness = (r + g + b) / 3;
                totalBrightness += brightness;
                totalPixels++;

                const isInCenter = x >= centerRegion.x && x < centerRegion.x + centerRegion.width &&
                    y >= centerRegion.y && y < centerRegion.y + centerRegion.height;

                // Deteksi background kayu/rustic (karakteristik foto seperti attachment)
                if (!isInCenter && brightness > 80 && brightness < 160 &&
                    r > g && g > b && (r - b) > 20) {
                    backgroundPixels++;
                }

                // Analisis warna karakteristik beras (fokus pada area tengah)
                if (isInCenter) {
                    if (brightness > 220 && Math.abs(r - g) < 10 && Math.abs(g - b) < 10) {
                        whitePixels++; // Pure white (Ipsala)
                    } else if (brightness > 200 && r > g && g > b && (r - b) < 30) {
                        creamPixels++; // Cream white (Karacadag)
                    } else if (brightness > 190 && Math.abs(r - g) < 8 && (r + g + b) > 570) {
                        pearlPixels++; // Pearl white (Arborio)
                    }

                    // Analisis translucency (Basmati & Jasmine)
                    const colorVariance = Math.abs(r - g) + Math.abs(g - b) + Math.abs(b - r);
                    if (colorVariance < 20 && brightness > 150 && brightness < 210) {
                        translucencyScore++;
                    }

                    // Deteksi texture/edge untuk shape analysis
                    if (x > 10 && x < 190 && y > 10 && y < 190) {
                        const prevBrightness = (data[((y * 200 + (x - 1)) * 4)] +
                            data[((y * 200 + (x - 1)) * 4) + 1] +
                            data[((y * 200 + (x - 1)) * 4) + 2]) / 3;
                        const nextBrightness = (data[((y * 200 + (x + 1)) * 4)] +
                            data[((y * 200 + (x + 1)) * 4) + 1] +
                            data[((y * 200 + (x + 1)) * 4) + 2]) / 3;
                        const variance = Math.abs(brightness - prevBrightness) + Math.abs(brightness - nextBrightness);
                        textureVarianceSum += variance;

                        if (variance > 40) edgeCount++; // Grain edges
                    }
                }
            }
        }

        const avgBrightness = totalBrightness / totalPixels;
        const whiteRatio = (whitePixels / (centerRegion.width * centerRegion.height)) * 100;
        const creamRatio = (creamPixels / (centerRegion.width * centerRegion.height)) * 100;
        const pearlRatio = (pearlPixels / (centerRegion.width * centerRegion.height)) * 100;
        const translucencyRatio = (translucencyScore / (centerRegion.width * centerRegion.height)) * 100;
        const avgTextureVariance = textureVarianceSum / (centerRegion.width * centerRegion.height);
        const edgeRatio = (edgeCount / (centerRegion.width * centerRegion.height)) * 100;
        const backgroundRatio = (backgroundPixels / totalPixels) * 100;

        // Deteksi tipe foto
        let photoType = 'single_grain';
        if (backgroundRatio > 30) photoType = 'kitchen_setting'; // Seperti attachment Anda
        else if (edgeRatio > 15) photoType = 'multiple_containers';
        else if (avgTextureVariance > 25) photoType = 'scattered_grains';

        const characteristics = {
            avgBrightness: Math.round(avgBrightness),
            whiteRatio: Math.round(whiteRatio * 10) / 10,
            creamRatio: Math.round(creamRatio * 10) / 10,
            pearlRatio: Math.round(pearlRatio * 10) / 10,
            translucencyRatio: Math.round(translucencyRatio * 10) / 10,
            avgTextureVariance: Math.round(avgTextureVariance * 10) / 10,
            edgeRatio: Math.round(edgeRatio * 10) / 10,
            backgroundRatio: Math.round(backgroundRatio * 10) / 10,
            photoType
        };

        // console.log('Enhanced Rice Analysis:', characteristics);

        // Validasi berdasarkan tipe foto
        let confidence = 0;
        let matchCount = 0;

        if (photoType === 'kitchen_setting') {
            // Validasi khusus untuk foto seperti attachment (mixed rice in kitchen setting)
            const hasGoodComposition = backgroundRatio > 20 && backgroundRatio < 70;
            const hasRiceCharacteristics = avgBrightness > 120 && avgBrightness < 250;
            const hasReasonableTexture = avgTextureVariance > 5 && avgTextureVariance < 50;

            if (hasGoodComposition && hasRiceCharacteristics && hasReasonableTexture) {
                confidence = 0.8; // High confidence untuk mixed rice photos
                matchCount = 1;
            }
        } else {
            // Validasi untuk single rice type photos
            Object.entries(RICE_VISUAL_CHARACTERISTICS).forEach(([riceType, specs]) => {
                let typeMatch = 0;

                // Brightness check
                if (avgBrightness >= specs.brightness[0] && avgBrightness <= specs.brightness[1]) {
                    typeMatch += 0.3;
                }

                // Texture variance check  
                if (avgTextureVariance >= specs.textureVariance[0] && avgTextureVariance <= specs.textureVariance[1]) {
                    typeMatch += 0.2;
                }

                // Color-specific checks
                switch (specs.color) {
                    case 'pure_white':
                        if (whiteRatio > 12) typeMatch += 0.3;
                        break;
                    case 'cream_white':
                        if (creamRatio > 8) typeMatch += 0.3;
                        break;
                    case 'pearl_white':
                        if (pearlRatio > 6) typeMatch += 0.3;
                        break;
                    case 'aged_white':
                    case 'jasmine_white':
                        if (translucencyRatio > 10) typeMatch += 0.3;
                        break;
                }

                // Surface texture check
                if (specs.surface === 'smooth_glossy' && edgeRatio < 4) typeMatch += 0.2;
                else if (specs.surface === 'textured' && edgeRatio > 8) typeMatch += 0.2;
                else if (['smooth', 'matte', 'slightly_rough'].includes(specs.surface) &&
                    edgeRatio >= 4 && edgeRatio <= 8) typeMatch += 0.2;

                if (typeMatch > 0.5) {
                    matchCount++;
                    confidence = Math.max(confidence, typeMatch);
                }

                // console.log(`${riceType} match score:`, Math.round(typeMatch * 100) / 100);
            });
        }

        // Validasi akhir
        const isValidRiceType = matchCount > 0 && confidence > 0.4;

        // console.log('Enhanced Rice Type Validation:', {
        //   photoType,
        //   matchCount,
        //   confidence: Math.round(confidence * 100) / 100,
        //   isValidRiceType
        // });

        return {
            isValidRiceType,
            detectedCharacteristics: characteristics,
            confidence,
            photoType
        };

    } catch (error) {
        console.warn('Enhanced rice analysis failed:', error);
        return { isValidRiceType: true, detectedCharacteristics: {}, confidence: 0.5, photoType: 'unknown' };
    }
};

export const calculateRiceLikelihood = (imageElement: HTMLImageElement): { score: number; reasons: string[] } => {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return { score: 50, reasons: ['Analysis failed'] }; // Neutral score on error

        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(imageElement, 0, 0, 100, 100);

        const imageData = ctx.getImageData(0, 0, 100, 100);
        const data = imageData.data;

        let totalBrightness = 0;
        let whitePixels = 0;
        let blackPixels = 0;
        let highSaturationPixels = 0;
        let textureVariance = 0;
        let totalPixels = 0;

        // Analyze each pixel
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const brightness = (r + g + b) / 3;
            totalBrightness += brightness;
            totalPixels++;

            // Count pixel types
            if (brightness > 230) whitePixels++;
            else if (brightness < 30) blackPixels++;

            // Check for highly saturated colors (unlikely in rice photos, except maybe brown rice/paddy)
            const maxColor = Math.max(r, g, b);
            const minColor = Math.min(r, g, b);
            const saturation = maxColor - minColor;

            if (saturation > 40) highSaturationPixels++; // Stricter saturation threshold

            // Calculate local texture variance
            if (i > 400 && i < data.length - 400) { // Avoid edges
                const prevBrightness = (data[i - 4] + data[i - 3] + data[i - 2]) / 3;
                textureVariance += Math.abs(brightness - prevBrightness);
            }
        }

        const avgBrightness = totalBrightness / totalPixels;
        const whiteRatio = (whitePixels / totalPixels) * 100;
        const blackRatio = (blackPixels / totalPixels) * 100;
        const highSaturationRatio = (highSaturationPixels / totalPixels) * 100;
        const avgTextureVariance = textureVariance / (totalPixels - 200);

        let score = 100;
        const reasons: string[] = [];

        // 1. Saturation Check (Most effective for non-rice objects like clothes, toys)
        if (highSaturationRatio > 50) {
            score -= 60;
            reasons.push('Terlalu banyak warna cerah/saturasi tinggi');
        } else if (highSaturationRatio > 30) {
            score -= 30;
            reasons.push('Warna tidak natural untuk beras');
        }

        // 2. Brightness Check
        if (avgBrightness < 40) {
            score -= 50;
            reasons.push('Foto terlalu gelap');
        } else if (avgBrightness > 240) {
            score -= 30;
            reasons.push('Foto terlalu terang/overexposed');
        }

        // 3. Black/Dark Area Check
        if (blackRatio > 60) {
            score -= 50;
            reasons.push('Background terlalu dominan gelap');
        }

        // 4. White Area Check (Checking for empty whitespace or plain paper)
        if (whiteRatio > 90 && avgTextureVariance < 5) {
            score -= 50;
            reasons.push('Terlalu putih polos, kurang tekstur');
        }

        // 5. Texture Check (Rice must have texture)
        if (avgTextureVariance < 3) {
            score -= 40;
            reasons.push('Permukaan terlalu halus, tidak ada tekstur butiran');
        }

        // 6. Color Consistency Check (Rice is usually monochromatic-ish)
        // If we detected high saturation earlier, we already penalized.

        // Bonus for good characteristics
        if (avgBrightness > 100 && avgBrightness < 220 && avgTextureVariance > 10) {
            score += 10; // Boost for good lighting and texture
        }

        // Cap score
        score = Math.min(100, Math.max(0, score));

        return { score, reasons };

    } catch (error) {
        console.warn('Likelihood analysis failed:', error);
        return { score: 50, reasons: ['Error during analysis'] };
    }
};

