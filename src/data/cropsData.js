// Comprehensive crop database for Sudan with requirements
export const CROPS_DATABASE = {
  sorghum: {
    name: "Sorghum (Dura)",
    category: "Cereal",
    waterRequirement: "Low",
    waterMM: 400,
    soilTypes: ["Clay", "Sandy Clay", "Loam"],
    pHRange: [5.5, 8.0],
    temperature: { min: 25, max: 40 },
    growingPeriod: 110,
    nutrients: {
      nitrogen: "Medium",
      phosphorus: "Medium",
      potassium: "Low"
    },
    season: "June-July planting",
    minFarmSize: "Small"
  },
  millet: {
    name: "Pearl Millet (Dukhn)",
    category: "Cereal",
    waterRequirement: "Very Low",
    waterMM: 250,
    soilTypes: ["Sandy", "Sandy Loam", "Light Clay"],
    pHRange: [5.0, 8.5],
    temperature: { min: 28, max: 42 },
    growingPeriod: 90,
    nutrients: {
      nitrogen: "Low",
      phosphorus: "Low",
      potassium: "Low"
    },
    season: "July-August planting",
    minFarmSize: "Very Small"
  },
  wheat: {
    name: "Wheat (Gumh)",
    category: "Cereal",
    waterRequirement: "High",
    waterMM: 450,
    soilTypes: ["Clay", "Alluvial", "Loam"],
    pHRange: [6.0, 7.5],
    temperature: { min: 15, max: 28 },
    growingPeriod: 120,
    nutrients: {
      nitrogen: "High",
      phosphorus: "High",
      potassium: "Medium"
    },
    season: "November-December planting",
    minFarmSize: "Small"
  },
  sesame: {
    name: "Sesame (Simsim)",
    category: "Oilseed",
    waterRequirement: "Low",
    waterMM: 350,
    soilTypes: ["Sandy Loam", "Alluvial", "Clay"],
    pHRange: [5.5, 8.0],
    temperature: { min: 25, max: 38 },
    growingPeriod: 100,
    nutrients: {
      nitrogen: "Medium",
      phosphorus: "Medium",
      potassium: "Medium"
    },
    season: "June-July planting",
    minFarmSize: "Small"
  },
  groundnut: {
    name: "Groundnut (Ful Sudani)",
    category: "Legume",
    waterRequirement: "Medium",
    waterMM: 500,
    soilTypes: ["Sandy Loam", "Sandy", "Loam"],
    pHRange: [6.0, 7.5],
    temperature: { min: 25, max: 35 },
    growingPeriod: 120,
    nutrients: {
      nitrogen: "Low",
      phosphorus: "High",
      potassium: "Medium"
    },
    season: "June-July planting",
    minFarmSize: "Small"
  },
  cotton: {
    name: "Cotton (Qutn)",
    category: "Fiber",
    waterRequirement: "High",
    waterMM: 700,
    soilTypes: ["Clay", "Alluvial", "Loam"],
    pHRange: [6.0, 7.5],
    temperature: { min: 25, max: 40 },
    growingPeriod: 180,
    nutrients: {
      nitrogen: "High",
      phosphorus: "High",
      potassium: "High"
    },
    season: "July-August planting",
    minFarmSize: "Medium"
  },
  gumArabic: {
    name: "Gum Arabic (Hashab)",
    category: "Tree Crop",
    waterRequirement: "Very Low",
    waterMM: 200,
    soilTypes: ["Sandy", "Sandy Loam", "Desert"],
    pHRange: [6.0, 8.5],
    temperature: { min: 20, max: 45 },
    growingPeriod: 365,
    nutrients: {
      nitrogen: "Very Low",
      phosphorus: "Low",
      potassium: "Low"
    },
    season: "Year-round",
    minFarmSize: "Medium"
  },
  hibiscus: {
    name: "Hibiscus (Karkadeh)",
    category: "Cash Crop",
    waterRequirement: "Low",
    waterMM: 400,
    soilTypes: ["Sandy Clay", "Clay", "Loam"],
    pHRange: [5.5, 7.5],
    temperature: { min: 25, max: 40 },
    growingPeriod: 150,
    nutrients: {
      nitrogen: "Medium",
      phosphorus: "Medium",
      potassium: "High"
    },
    season: "June-July planting",
    minFarmSize: "Small"
  },
  sunflower: {
    name: "Sunflower (Abbad Al-Shams)",
    category: "Oilseed",
    waterRequirement: "Medium",
    waterMM: 500,
    soilTypes: ["Clay", "Loam", "Sandy Loam"],
    pHRange: [6.0, 7.5],
    temperature: { min: 20, max: 35 },
    growingPeriod: 100,
    nutrients: {
      nitrogen: "Medium",
      phosphorus: "High",
      potassium: "High"
    },
    season: "October-November planting",
    minFarmSize: "Small"
  },
  watermelon: {
    name: "Watermelon (Battikh)",
    category: "Fruit",
    waterRequirement: "Medium",
    waterMM: 450,
    soilTypes: ["Sandy Loam", "Sandy", "Alluvial"],
    pHRange: [6.0, 7.5],
    temperature: { min: 25, max: 40 },
    growingPeriod: 90,
    nutrients: {
      nitrogen: "Medium",
      phosphorus: "Medium",
      potassium: "High"
    },
    season: "December-January planting",
    minFarmSize: "Small"
  },
  cowpea: {
    name: "Cowpea (Lubia)",
    category: "Legume",
    waterRequirement: "Low",
    waterMM: 350,
    soilTypes: ["Sandy Loam", "Loam", "Clay"],
    pHRange: [5.5, 7.5],
    temperature: { min: 25, max: 38 },
    growingPeriod: 80,
    nutrients: {
      nitrogen: "Low",
      phosphorus: "Medium",
      potassium: "Medium"
    },
    season: "July-August planting",
    minFarmSize: "Very Small"
  },
  okra: {
    name: "Okra (Bamia)",
    category: "Vegetable",
    waterRequirement: "Medium",
    waterMM: 500,
    soilTypes: ["Loam", "Clay", "Sandy Loam"],
    pHRange: [6.0, 7.5],
    temperature: { min: 25, max: 38 },
    growingPeriod: 60,
    nutrients: {
      nitrogen: "Medium",
      phosphorus: "Medium",
      potassium: "High"
    },
    season: "March-April planting",
    minFarmSize: "Very Small"
  }
};

// Get crop by key
export const getCrop = (cropKey) => CROPS_DATABASE[cropKey];

// Get all crop keys
export const getAllCropKeys = () => Object.keys(CROPS_DATABASE);

