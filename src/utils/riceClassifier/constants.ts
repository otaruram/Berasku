
// 5 jenis beras yang didukung - sesuai dengan spesifikasi
export const RICE_CLASSES = [
    'Arborio',
    'Basmati',
    'Ipsala',
    'Jasmine',
    'Karacadag'
] as const;

// Karakteristik visual detail untuk setiap jenis beras
export const RICE_VISUAL_CHARACTERISTICS = {
    'Arborio': {
        shape: 'short_round', // Bulat pendek, gemuk
        size: 'medium_large', // 5-6mm
        color: 'pearl_white', // Putih mutiara
        opacity: 'translucent', // Agak transparan
        surface: 'smooth_glossy', // Permukaan halus mengkilap
        brightness: [150, 250], // Range brightness diperluas
        aspectRatio: [1.1, 2.0], // Rasio panjang/lebar diperluas
        textureVariance: [5, 25] // Variasi tekstur diperluas
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
        brightness: [160, 240], // Range diperluas
        aspectRatio: [2.0, 3.5], // Range diperluas
        textureVariance: [5, 30] // Range diperluas
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
export const PROFESSIONAL_RICE_PHOTO_TYPES = {
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
