/**
 * Aspect ratio tokens for the UI library
 * 
 * This file defines all aspect ratio-related design tokens to ensure consistent
 * proportions across the application. These tokens provide standardized
 * aspect ratios for various UI elements like images, cards, and containers.
 */

// Basic aspect ratios
export const aspectRatios = {
  // Square
  '1:1': '1 / 1',
  square: '1 / 1',
  
  // Landscape orientations
  '16:9': '16 / 9',
  '16:10': '16 / 10',
  '4:3': '4 / 3',
  '3:2': '3 / 2',
  '2:1': '2 / 1',
  '21:9': '21 / 9', // Ultrawide
  
  // Portrait orientations
  '9:16': '9 / 16',
  '10:16': '10 / 16',
  '3:4': '3 / 4',
  '2:3': '2 / 3',
  '1:2': '1 / 2',
  
  // Golden ratio
  golden: '1.618 / 1',
  goldenPortrait: '1 / 1.618',
  
  // Other common ratios
  cinema: '2.35 / 1', // Cinematic widescreen
  ultrawide: '21 / 9',
  widescreen: '16 / 9',
  hdtv: '16 / 9',
  standard: '4 / 3',
  traditional: '3 / 2',
  square: '1 / 1',
  portrait: '3 / 4',
  vertical: '9 / 16',
  
  // Social media specific ratios
  instagram: '1 / 1',
  instagramLandscape: '1.91 / 1',
  instagramPortrait: '4 / 5',
  instagramStory: '9 / 16',
  facebook: '1.91 / 1',
  twitter: '16 / 9',
  linkedin: '1.91 / 1',
  pinterest: '2 / 3',
  youtube: '16 / 9',
  tiktok: '9 / 16',
};

// Decimal values for aspect ratios (width / height)
export const aspectRatioValues = {
  // Square
  '1:1': 1,
  square: 1,
  
  // Landscape orientations
  '16:9': 16 / 9,
  '16:10': 16 / 10,
  '4:3': 4 / 3,
  '3:2': 3 / 2,
  '2:1': 2,
  '21:9': 21 / 9,
  
  // Portrait orientations
  '9:16': 9 / 16,
  '10:16': 10 / 16,
  '3:4': 3 / 4,
  '2:3': 2 / 3,
  '1:2': 1 / 2,
  
  // Golden ratio
  golden: 1.618,
  goldenPortrait: 1 / 1.618,
  
  // Other common ratios
  cinema: 2.35,
  ultrawide: 21 / 9,
  widescreen: 16 / 9,
  hdtv: 16 / 9,
  standard: 4 / 3,
  traditional: 3 / 2,
  portrait: 3 / 4,
  vertical: 9 / 16,
  
  // Social media specific ratios
  instagram: 1,
  instagramLandscape: 1.91,
  instagramPortrait: 4 / 5,
  instagramStory: 9 / 16,
  facebook: 1.91,
  twitter: 16 / 9,
  linkedin: 1.91,
  pinterest: 2 / 3,
  youtube: 16 / 9,
  tiktok: 9 / 16,
};

// Percentage values for padding-bottom technique (height / width * 100%)
export const aspectRatioPercentages = {
  // Square
  '1:1': '100%',
  square: '100%',
  
  // Landscape orientations
  '16:9': '56.25%',
  '16:10': '62.5%',
  '4:3': '75%',
  '3:2': '66.67%',
  '2:1': '50%',
  '21:9': '42.86%',
  
  // Portrait orientations
  '9:16': '177.78%',
  '10:16': '160%',
  '3:4': '133.33%',
  '2:3': '150%',
  '1:2': '200%',
  
  // Golden ratio
  golden: '61.8%',
  goldenPortrait: '161.8%',
  
  // Other common ratios
  cinema: '42.55%',
  ultrawide: '42.86%',
  widescreen: '56.25%',
  hdtv: '56.25%',
  standard: '75%',
  traditional: '66.67%',
  portrait: '133.33%',
  vertical: '177.78%',
  
  // Social media specific ratios
  instagram: '100%',
  instagramLandscape: '52.36%',
  instagramPortrait: '125%',
  instagramStory: '177.78%',
  facebook: '52.36%',
  twitter: '56.25%',
  linkedin: '52.36%',
  pinterest: '150%',
  youtube: '56.25%',
  tiktok: '177.78%',
};

// Component-specific aspect ratios
export const componentAspectRatios = {
  // Image aspect ratios
  avatarSmall: aspectRatios.square,
  avatarLarge: aspectRatios.square,
  heroImage: aspectRatios.widescreen,
  bannerImage: aspectRatios['21:9'],
  thumbnailImage: aspectRatios.square,
  galleryImage: aspectRatios['3:2'],
  productImage: aspectRatios.square,
  landscapeImage: aspectRatios['16:9'],
  portraitImage: aspectRatios['2:3'],
  
  // Card aspect ratios
  cardSquare: aspectRatios.square,
  cardLandscape: aspectRatios['4:3'],
  cardPortrait: aspectRatios['3:4'],
  cardWide: aspectRatios['16:9'],
  cardGolden: aspectRatios.golden,
  
  // Video aspect ratios
  videoStandard: aspectRatios['16:9'],
  videoWide: aspectRatios['21:9'],
  videoVertical: aspectRatios['9:16'],
  videoSquare: aspectRatios.square,
  
  // Carousel aspect ratios
  carouselStandard: aspectRatios['16:9'],
  carouselWide: aspectRatios['21:9'],
  carouselSquare: aspectRatios.square,
  
  // Modal aspect ratios
  modalWide: aspectRatios['16:9'],
  modalSquare: aspectRatios.square,
  modalPortrait: aspectRatios['9:16'],
};

// CSS utility classes for aspect ratios
export const aspectRatioClasses = {
  // Base class
  aspectRatio: `
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
  `,
  
  // Content class
  aspectRatioContent: `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  
  // Specific ratio classes
  square: `
    padding-bottom: ${aspectRatioPercentages.square};
  `,
  
  widescreen: `
    padding-bottom: ${aspectRatioPercentages.widescreen};
  `,
  
  cinema: `
    padding-bottom: ${aspectRatioPercentages.cinema};
  `,
  
  portrait: `
    padding-bottom: ${aspectRatioPercentages.portrait};
  `,
  
  golden: `
    padding-bottom: ${aspectRatioPercentages.golden};
  `,
};

// Helper function to get aspect ratio value
export const getAspectRatio = (key) => {
  if (aspectRatios[key]) {
    return aspectRatios[key];
  }
  
  console.warn(`Aspect ratio "${key}" not found. Using square aspect ratio.`);
  return aspectRatios.square;
};

// Helper function to get aspect ratio percentage
export const getAspectRatioPercentage = (key) => {
  if (aspectRatioPercentages[key]) {
    return aspectRatioPercentages[key];
  }
  
  console.warn(`Aspect ratio percentage "${key}" not found. Using square aspect ratio.`);
  return aspectRatioPercentages.square;
};

export default {
  aspectRatios,
  aspectRatioValues,
  aspectRatioPercentages,
  componentAspectRatios,
  aspectRatioClasses,
  getAspectRatio,
  getAspectRatioPercentage,
};
