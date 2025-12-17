// Market opportunity data for different crops in Sudan
export const MARKET_DATA = {
  sorghum: {
    demandLevel: "Very High",
    opportunity: "Good opportunity",
    marketAccess: "Excellent",
    storageLife: "8 months",
    seasonalDemand: "High in dry season",
    notes: "Main food crop with strong local demand"
  },
  millet: {
    demandLevel: "High",
    opportunity: "Good opportunity",
    marketAccess: "Good",
    storageLife: "12 months",
    seasonalDemand: "Steady year-round",
    notes: "Traditional crop with reliable markets"
  },
  wheat: {
    demandLevel: "Very High",
    opportunity: "Good opportunity",
    marketAccess: "Excellent",
    storageLife: "12 months",
    seasonalDemand: "High year-round",
    notes: "Growing demand in urban areas"
  },
  sesame: {
    demandLevel: "Very High",
    opportunity: "Good opportunity",
    marketAccess: "Excellent",
    storageLife: "12 months",
    seasonalDemand: "High year-round",
    notes: "Major export crop with international demand"
  },
  groundnut: {
    demandLevel: "High",
    opportunity: "Good opportunity",
    marketAccess: "Good",
    storageLife: "6 months",
    seasonalDemand: "High in harvest season",
    notes: "Strong local and export markets"
  },
  cotton: {
    demandLevel: "High",
    opportunity: "Moderate opportunity",
    marketAccess: "Good",
    storageLife: "24 months",
    seasonalDemand: "Steady demand",
    notes: "Established crop but requires good water"
  },
  gumArabic: {
    demandLevel: "Very High",
    opportunity: "Good opportunity",
    marketAccess: "Excellent",
    storageLife: "36 months",
    seasonalDemand: "Very high year-round",
    notes: "Sudan produces 70% of world supply"
  },
  hibiscus: {
    demandLevel: "High",
    opportunity: "Good opportunity",
    marketAccess: "Good",
    storageLife: "12 months",
    seasonalDemand: "High year-round",
    notes: "Popular for tea and beverages, good export potential"
  },
  sunflower: {
    demandLevel: "Medium",
    opportunity: "Moderate opportunity",
    marketAccess: "Moderate",
    storageLife: "6 months",
    seasonalDemand: "Moderate demand",
    notes: "Growing market for cooking oil"
  },
  watermelon: {
    demandLevel: "High",
    opportunity: "Good opportunity",
    marketAccess: "Good",
    storageLife: "2 weeks",
    seasonalDemand: "Very high in hot season",
    notes: "Fresh market with strong seasonal demand"
  },
  cowpea: {
    demandLevel: "High",
    opportunity: "Good opportunity",
    marketAccess: "Good",
    storageLife: "12 months",
    seasonalDemand: "Steady year-round",
    notes: "Important protein source with good markets"
  },
  okra: {
    demandLevel: "Medium",
    opportunity: "Moderate opportunity",
    marketAccess: "Moderate",
    storageLife: "1 week fresh",
    seasonalDemand: "High in growing season",
    notes: "Local markets, can be dried for storage"
  }
};

// Get market data for a crop
export const getMarketData = (cropKey) => MARKET_DATA[cropKey];

