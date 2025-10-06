import * as tf from '@tensorflow/tfjs';

// 5 jenis beras yang didukung - sesuai dengan spesifikasi
export const RICE_CLASSES = [
  'Arborio',
  'Basmati', 
  'Ipsala',
  'Jasmine',
  'Karacadag'
] as const;

// Karakteristik visual detail untuk setiap jenis beras
const RICE_VISUAL_CHARACTERISTICS = {
  'Arborio': {
    shape: 'short_round', // Bulat pendek, gemuk
    size: 'medium_large', // 5-6mm
    color: 'pearl_white', // Putih mutiara
    opacity: 'translucent', // Agak transparan
    surface: 'smooth_glossy', // Permukaan halus mengkilap
    brightness: [180, 240], // Range brightness
    aspectRatio: [1.2, 1.8], // Rasio panjang/lebar
    textureVariance: [8, 20] // Variasi tekstur
  },
  'Basmati': {
    shape: 'long_slender', // Panjang ramping
    size: 'long', // 6-7mm
    color: 'aged_white', // Putih aging
    opacity: 'semi_opaque', // Semi buram
    surface: 'slightly_rough', // Agak kasar
    brightness: [160, 220],
    aspectRatio: [2.5, 4.0], // Sangat panjang
    textureVariance: [10, 25]
  },
  'Ipsala': {
    shape: 'medium_oval', // Oval sedang
    size: 'medium', // 4-5mm
    color: 'pure_white', // Putih bersih
    opacity: 'opaque', // Buram
    surface: 'matte', // Tidak mengkilap
    brightness: [170, 210],
    aspectRatio: [1.8, 2.4],
    textureVariance: [6, 18]
  },
  'Jasmine': {
    shape: 'long_pointed', // Panjang meruncing
    size: 'medium_long', // 5-6mm
    color: 'jasmine_white', // Putih jasmine (sedikit krem)
    opacity: 'translucent', // Transparan
    surface: 'smooth', // Halus
    brightness: [175, 230],
    aspectRatio: [2.2, 3.2],
    textureVariance: [7, 22]
  },
  'Karacadag': {
    shape: 'round_thick', // Bulat tebal
    size: 'small_medium', // 3-4mm
    color: 'cream_white', // Putih krem
    opacity: 'semi_translucent', // Semi transparan
    surface: 'textured', // Bertekstur
    brightness: [150, 200],
    aspectRatio: [1.3, 1.9],
    textureVariance: [12, 30]
  }
};

// Karakteristik untuk semua jenis foto beras dari iStock style
const PROFESSIONAL_RICE_PHOTO_TYPES = {
  // 1. Kitchen/Rustic Setting (seperti attachment + iStock style)
  kitchen_rustic: {
    backgrounds: ['wooden_table', 'rustic_kitchen', 'burlap_sack', 'bamboo_mat'],
    containers: ['wooden_bowl', 'ceramic_bowl', 'clay_pot', 'wooden_spoon', 'sack'],
    lighting: ['warm_natural', 'soft_diffused', 'golden_hour'],
    composition: ['multiple_containers', 'scattered_grains', 'lifestyle'],
    brightnessRange: [100, 240],
    backgroundRatio: [25, 70], // Background lebih dominan
    textureVariance: [10, 50]
  },
  
  // 2. Cooked Rice (nasi matang)
  cooked_rice: {
    appearance: ['fluffy_texture', 'steamy', 'glossy_surface'],
    containers: ['rice_cooker', 'serving_bowl', 'plate', 'bamboo_steamer'],
    characteristics: ['individual_grains_visible', 'moist_appearance', 'white_translucent'],
    brightnessRange: [150, 230],
    textureVariance: [5, 25],
    steamEffect: true
  },
  
  // 3. Raw Rice Grains (beras mentah)
  raw_grains: {
    appearance: ['dry_surface', 'individual_grains', 'scattered_pattern'],
    backgrounds: ['white_background', 'neutral_surface', 'wooden_surface'],
    characteristics: ['sharp_edges', 'matte_finish', 'uniform_color'],
    brightnessRange: [160, 250],
    textureVariance: [15, 35],
    grainDefinition: 'high'
  },
  
  // 4. Basmati Style (long grain)
  basmati_style: {
    grainShape: 'long_slender',
    aspectRatio: [2.5, 4.0],
    characteristics: ['pointed_ends', 'translucent', 'elongated'],
    appearance: ['individual_separation', 'slight_curve'],
    brightnessRange: [140, 210],
    lengthIndicators: true
  },
  
  // 5. Jasmine/Thai Style 
  jasmine_style: {
    grainShape: 'medium_long',
    characteristics: ['aromatic_appearance', 'slightly_sticky', 'pearl_white'],
    appearance: ['clustered_grains', 'soft_texture'],
    brightnessRange: [160, 230],
    clustering: true
  },
  
  // 6. Japanese Rice Style
  japanese_style: {
    grainShape: 'short_round',
    characteristics: ['sticky_texture', 'pearlescent', 'compact_grains'],
    appearance: ['clumped_together', 'glossy_finish'],
    containers: ['traditional_bowl', 'wooden_bowl'],
    brightnessRange: [170, 240]
  },
  
  // 7. Mixed Rice Varieties (berbagai jenis dalam satu foto)
  mixed_varieties: {
    characteristics: ['multiple_grain_types', 'color_variation', 'size_variation'],
    appearance: ['white_brown_mix', 'different_shapes', 'texture_contrast'],
    brightnessRange: [120, 230],
    colorVariety: true
  },
  
  // 8. Stock Photo Commercial Style
  commercial_stock: {
    lighting: ['professional_lighting', 'high_key', 'clean_shadows'],
    composition: ['centered', 'rule_of_thirds', 'negative_space'],
    quality: ['high_resolution', 'sharp_focus', 'color_accurate'],
    backgrounds: ['isolated_white', 'gradient', 'textured_neutral'],
    brightnessRange: [140, 250]
  },
  
  // 9. Scattered Long Grain Style (seperti attachment Basmati)
  scattered_long_grain: {
    grainPattern: 'scattered_random',
    grainShape: 'long_slender',
    characteristics: ['individual_separation', 'no_overlap', 'random_orientation'],
    appearance: ['dry_surface', 'elongated_grains', 'pointed_ends'],
    aspectRatio: [2.5, 4.5], // Sangat panjang
    density: 'sparse_scattered', // Tidak menumpuk
    backgroundColor: ['neutral_beige', 'light_surface'],
    brightnessRange: [140, 220],
    textureVariance: [20, 40], // Tinggi karena banyak edge
    edgeDefinition: 'very_high'
  },
  
  // 10. Bulk Rice Display
  bulk_display: {
    grainPattern: 'dense_packed',
    characteristics: ['overlapping_grains', 'bulk_quantity', 'commercial_display'],
    appearance: ['mass_quantity', 'some_buried_grains', 'natural_pile'],
    density: 'high_density',
    textureVariance: [25, 45],
    depthIndicators: true
  },
  
  // 11. Macro Close-up Style
  macro_closeup: {
    grainPattern: 'detailed_individual',
    characteristics: ['extreme_detail', 'grain_surface_visible', 'high_resolution'],
    appearance: ['texture_details', 'surface_imperfections', 'natural_variations'],
    focus: 'shallow_depth_of_field',
    textureVariance: [35, 60], // Sangat tinggi untuk detail
    grainCount: 'few_grains' // Fokus pada beberapa butir saja
  },
  
  // 12. Bowl Presentation (seperti attachment foto 1)
  bowl_presentation: {
    containerType: 'bowl',
    riceState: 'cooked_fluffy',
    characteristics: ['contained_in_bowl', 'top_down_view', 'circular_boundary'],
    appearance: ['individual_grains_visible', 'fluffy_texture', 'white_translucent'],
    background: ['wooden_table', 'neutral_surface'],
    brightnessRange: [160, 240],
    containerDetection: true,
    steamEffect: 'possible'
  },
  
  // 13. High Contrast Professional (attachment foto 6-7)
  high_contrast_pro: {
    lighting: 'dramatic_contrast',
    background: ['dark_black', 'high_contrast'],
    characteristics: ['professional_studio', 'clean_separation', 'bowl_silhouette'],
    appearance: ['bright_rice_dark_bg', 'crisp_edges', 'studio_quality'],
    brightnessRange: [140, 250],
    backgroundContrast: 'very_high'
  },
  
  // 14. Steamy Hot Rice (attachment dengan steam effect)
  steamy_hot_rice: {
    riceState: 'freshly_cooked',
    characteristics: ['visible_steam', 'hot_appearance', 'moist_surface'],
    appearance: ['steam_wisps', 'glossy_grains', 'just_cooked'],
    effectIndicators: ['steam_blur', 'heat_shimmer', 'moisture_reflection'],
    brightnessRange: [150, 230],
    steamDetection: true
  },
  
  // 15. Multiple Variety Display (attachment dengan berbagai style)
  multiple_variety_display: {
    layout: 'grid_arrangement',
    characteristics: ['different_presentations', 'comparison_style', 'variety_showcase'],
    appearance: ['multiple_containers', 'different_rice_states', 'professional_layout'],
    containerTypes: ['bowls', 'plates', 'traditional_vessels'],
    textureVariance: [20, 50] // Tinggi karena berbagai style
  }
};

// Enhanced detection untuk semua style foto beras termasuk attachment
const detectPhotoStyle = (imageElement: HTMLImageElement, analysis: any): string => {
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

// Advanced visual analysis untuk deteksi 5 jenis beras spesifik + mixed rice photos
const analyzeRiceTypeCharacteristics = (imageElement: HTMLImageElement): {
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
            const prevBrightness = (data[((y * 200 + (x-1)) * 4)] + 
                                  data[((y * 200 + (x-1)) * 4) + 1] + 
                                  data[((y * 200 + (x-1)) * 4) + 2]) / 3;
            const nextBrightness = (data[((y * 200 + (x+1)) * 4)] + 
                                  data[((y * 200 + (x+1)) * 4) + 1] + 
                                  data[((y * 200 + (x+1)) * 4) + 2]) / 3;
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
    
    console.log('Enhanced Rice Analysis:', characteristics);
    
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
        
        console.log(`${riceType} match score:`, Math.round(typeMatch * 100) / 100);
      });
    }
    
    // Validasi akhir
    const isValidRiceType = matchCount > 0 && confidence > 0.4;
    
    console.log('Enhanced Rice Type Validation:', {
      photoType,
      matchCount,
      confidence: Math.round(confidence * 100) / 100,
      isValidRiceType
    });
    
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
const analyzeImageCharacteristics = (imageElement: HTMLImageElement): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return true; // If can't analyze, let ML model decide
    
    canvas.width = 100;
    canvas.height = 100;
    ctx.drawImage(imageElement, 0, 0, 100, 100);
    
    const imageData = ctx.getImageData(0, 0, 100, 100);
    const data = imageData.data;
    
    let totalBrightness = 0;
    let whitePixels = 0;
    let blackPixels = 0;
    let coloredPixels = 0;
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
      
      // Check for highly saturated colors (unlikely in rice photos)
      const maxColor = Math.max(r, g, b);
      const minColor = Math.min(r, g, b);
      const saturation = maxColor - minColor;
      
      if (saturation > 50) coloredPixels++;
      
      // Calculate local texture variance
      if (i > 400 && i < data.length - 400) { // Avoid edges
        const prevBrightness = (data[i-4] + data[i-3] + data[i-2]) / 3;
        textureVariance += Math.abs(brightness - prevBrightness);
      }
    }
    
    const avgBrightness = totalBrightness / totalPixels;
    const whiteRatio = whitePixels / totalPixels;
    const blackRatio = blackPixels / totalPixels;
    const colorRatio = coloredPixels / totalPixels;
    const avgTextureVariance = textureVariance / (totalPixels - 200);
    
    console.log('Advanced Image Analysis:', {
      avgBrightness: avgBrightness.toFixed(2),
      whiteRatio: (whiteRatio * 100).toFixed(1) + '%',
      blackRatio: (blackRatio * 100).toFixed(1) + '%',
      colorRatio: (colorRatio * 100).toFixed(1) + '%',
      avgTextureVariance: avgTextureVariance.toFixed(2)
    });
    
    // Rice characteristics analysis
    const reasonableBrightness = avgBrightness > 50 && avgBrightness < 200;
    const notTooDark = blackRatio < 0.6; // Not mostly black
    const notTooWhite = whiteRatio < 0.8; // Not mostly white/overexposed
    const lowSaturation = colorRatio < 0.4; // Rice has neutral colors
    const hasTexture = avgTextureVariance > 5; // Rice has grain texture
    
    // Detect obviously non-rice objects
    const obviouslyNotRice = 
      colorRatio > 0.6 || // Too colorful (clothes, toys, etc.)
      blackRatio > 0.7 || // Too dark (shadows, dark objects)
      whiteRatio > 0.9 || // Pure white/overexposed
      avgBrightness < 20; // Too dark overall
    
    if (obviouslyNotRice) {
      console.log('Detected obviously non-rice object');
      return false;
    }
    
    // For borderline cases, be more permissive
    const likelyRice = reasonableBrightness && notTooDark && notTooWhite && lowSaturation;
    
    console.log('Rice likelihood analysis:', {
      reasonableBrightness,
      notTooDark,
      notTooWhite,
      lowSaturation,
      hasTexture,
      likelyRice
    });
    
    return likelyRice;
    
  } catch (error) {
    console.warn('Image analysis failed, allowing classification:', error);
    return true; // If analysis fails, let the ML model decide
  }
};

// Validasi konsistensi antara prediksi ML dan karakteristik visual
const validatePredictionConsistency = (
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
    
    console.log(`Consistency check for ${predictedType}:`, {
      consistencyScore,
      totalChecks,
      consistencyRatio: Math.round(consistencyRatio * 100) + '%',
      isConsistent
    });
    
    return isConsistent;
  } catch (error) {
    console.warn('Consistency validation failed:', error);
    return true; // Jika gagal validasi, terima prediksi
  }
};

export const classifyImage = async (imageElement: HTMLImageElement): Promise<PredictionResult[]> => {
  try {
    // Step 1: Advanced visual analysis (tetap pertahankan kompleksitas)
    const riceTypeAnalysis = analyzeRiceTypeCharacteristics(imageElement);
    const generalRiceAnalysis = analyzeImageCharacteristics(imageElement);
    
    console.log('=== ADVANCED ANALYSIS RESULTS ===');
    console.log('Photo Type:', riceTypeAnalysis.photoType);
    console.log('Visual Confidence:', Math.round(riceTypeAnalysis.confidence * 100) + '%');
    console.log('General Rice Check:', generalRiceAnalysis ? 'PASS' : 'FAIL');
    console.log('Detected Characteristics:', riceTypeAnalysis.detectedCharacteristics);

    // Step 2: TensorFlow.js Model Prediction (primary decision maker)
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

    const maxProbability = Math.max(...probabilities);
    
    console.log('=== TENSORFLOW.JS MODEL RESULTS ===');
    console.log('Max Probability:', Math.round(maxProbability * 1000) / 10 + '%');
    console.log('All Predictions:', Array.from(probabilities).map((p, i) => 
      `${RICE_CLASSES[i]}: ${Math.round(p * 1000) / 10}%`
    ));

    // Step 3: Intelligent Hybrid Decision Making
    const results: PredictionResult[] = Array.from(probabilities)
      .slice(0, 5)
      .map((probability, index) => ({
        className: RICE_CLASSES[index],
        probability,
      }))
      .sort((a, b) => b.probability - a.probability);

    // Step 4: Multi-layer validation dengan TF.js sebagai primary
    const topPrediction = results[0];
    const mlConfidence = topPrediction.probability;
    const visualConfidence = riceTypeAnalysis.confidence;
    
    // Enhanced validation logic
    if (mlConfidence < 0.03) {
      // TF.js confidence sangat rendah - kemungkinan bukan beras sama sekali
      if (!generalRiceAnalysis) {
        throw new Error('Objek dalam foto bukan beras. Mohon upload foto beras yang jelas.');
      } else {
        throw new Error('Model tidak dapat mengidentifikasi jenis beras dengan yakin. Foto mungkin kurang jelas atau bukan salah satu dari 5 jenis beras yang didukung.');
      }
    }
    
    if (mlConfidence < 0.08) {
      // TF.js confidence rendah - cross-check dengan visual analysis
      if (!generalRiceAnalysis || visualConfidence < 0.3) {
        throw new Error(`Tingkat kepercayaan rendah. Aplikasi ini hanya dapat mengidentifikasi: ${RICE_CLASSES.join(', ')}. Pastikan foto menampilkan salah satu jenis beras tersebut dengan jelas.`);
      }
    }
    
    if (mlConfidence < 0.15 && !riceTypeAnalysis.isValidRiceType) {
      // TF.js confidence moderate tapi visual analysis menolak
      throw new Error(`Jenis beras tidak termasuk kategori yang didukung atau foto kurang jelas. Aplikasi ini mengenali: ${RICE_CLASSES.join(', ')}.`);
    }

    // Step 5: Advanced consistency validation (tetap pertahankan kompleksitas)
    const expectedCharacteristics = RICE_VISUAL_CHARACTERISTICS[topPrediction.className as keyof typeof RICE_VISUAL_CHARACTERISTICS];
    
    if (expectedCharacteristics && mlConfidence < 0.25) {
      const visualConsistency = validatePredictionConsistency(
        topPrediction.className, 
        riceTypeAnalysis.detectedCharacteristics,
        expectedCharacteristics
      );
      
      if (!visualConsistency && visualConfidence < 0.4) {
        console.warn('Consistency warning:', {
          mlPrediction: topPrediction.className,
          mlConfidence: Math.round(mlConfidence * 100) + '%',
          visualConfidence: Math.round(visualConfidence * 100) + '%',
          visualConsistency
        });
        
        // Warning but still proceed if TF.js confidence is reasonable
        if (mlConfidence < 0.12) {
          throw new Error(`Prediksi ${topPrediction.className} tidak konsisten dengan karakteristik visual. Mohon upload foto yang lebih jelas atau dari angle yang berbeda.`);
        }
      }
    }

    // Step 6: Final combined confidence calculation
    const combinedConfidence = (mlConfidence * 0.75) + (visualConfidence * 0.25); // TF.js dominan
    
    console.log('=== FINAL DECISION ===');
    console.log('TF.js Prediction:', topPrediction.className);
    console.log('TF.js Confidence:', Math.round(mlConfidence * 100) + '%');
    console.log('Visual Confidence:', Math.round(visualConfidence * 100) + '%');
    console.log('Combined Confidence:', Math.round(combinedConfidence * 100) + '%');
    console.log('Photo Style:', riceTypeAnalysis.photoType);

    return results;
  } catch (error) {
    console.error('Classification error:', error);
    if (error instanceof Error) {
      throw error;
    }
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
