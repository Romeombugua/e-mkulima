// Location data for Sudan - mapped agro-ecological zones
export const STATES_DATA = {
  "Khartoum": {
    zones: ["Nile Valley", "Semi-Desert"],
    defaultZone: "Nile Valley"
  },
  "Gezira": {
    zones: ["Irrigated Plains", "Clay Plains"],
    defaultZone: "Irrigated Plains"
  },
  "Blue Nile": {
    zones: ["Savanna", "Clay Plains"],
    defaultZone: "Savanna"
  },
  "White Nile": {
    zones: ["Nile Valley", "Clay Plains"],
    defaultZone: "Nile Valley"
  },
  "North Kordofan": {
    zones: ["Semi-Desert", "Gum Arabic Belt"],
    defaultZone: "Gum Arabic Belt"
  },
  "South Kordofan": {
    zones: ["Savanna", "Transition Zone"],
    defaultZone: "Savanna"
  },
  "North Darfur": {
    zones: ["Desert Margin", "Semi-Desert"],
    defaultZone: "Semi-Desert"
  },
  "South Darfur": {
    zones: ["Savanna", "Transition Zone"],
    defaultZone: "Savanna"
  },
  "Kassala": {
    zones: ["Eastern Plains", "Semi-Desert"],
    defaultZone: "Eastern Plains"
  },
  "Gedaref": {
    zones: ["Mechanized Farming Zone", "Clay Plains"],
    defaultZone: "Mechanized Farming Zone"
  },
  "Sennar": {
    zones: ["Clay Plains", "Irrigated Schemes"],
    defaultZone: "Clay Plains"
  },
  "River Nile": {
    zones: ["Nile Valley", "Desert Margin"],
    defaultZone: "Nile Valley"
  }
};

// Soil profiles mapped to Sudan's agro-ecological zones
export const SOIL_PROFILES = {
  "Nile Valley": {
    type: "Alluvial",
    pH: 7.5,
    nitrogen: "Medium",
    phosphorus: "Medium",
    potassium: "High",
    organicMatter: "Medium",
    drainage: "Good"
  },
  "Semi-Desert": {
    type: "Sandy",
    pH: 7.8,
    nitrogen: "Low",
    phosphorus: "Low",
    potassium: "Low",
    organicMatter: "Very Low",
    drainage: "Excellent"
  },
  "Irrigated Plains": {
    type: "Vertisol Clay",
    pH: 7.2,
    nitrogen: "High",
    phosphorus: "High",
    potassium: "High",
    organicMatter: "High",
    drainage: "Moderate"
  },
  "Clay Plains": {
    type: "Heavy Clay",
    pH: 7.5,
    nitrogen: "Medium",
    phosphorus: "Medium",
    potassium: "High",
    organicMatter: "Medium",
    drainage: "Poor"
  },
  "Savanna": {
    type: "Sandy Loam",
    pH: 6.5,
    nitrogen: "Medium",
    phosphorus: "Low",
    potassium: "Medium",
    organicMatter: "Medium",
    drainage: "Good"
  },
  "Gum Arabic Belt": {
    type: "Sandy Clay Loam",
    pH: 7.0,
    nitrogen: "Low",
    phosphorus: "Low",
    potassium: "Medium",
    organicMatter: "Low",
    drainage: "Good"
  },
  "Transition Zone": {
    type: "Loamy",
    pH: 6.8,
    nitrogen: "Medium",
    phosphorus: "Medium",
    potassium: "Medium",
    organicMatter: "Medium",
    drainage: "Good"
  },
  "Desert Margin": {
    type: "Sandy",
    pH: 8.0,
    nitrogen: "Very Low",
    phosphorus: "Very Low",
    potassium: "Low",
    organicMatter: "Very Low",
    drainage: "Excellent"
  },
  "Eastern Plains": {
    type: "Clay Loam",
    pH: 7.0,
    nitrogen: "Medium",
    phosphorus: "Medium",
    potassium: "High",
    organicMatter: "Medium",
    drainage: "Good"
  },
  "Mechanized Farming Zone": {
    type: "Heavy Clay",
    pH: 7.3,
    nitrogen: "High",
    phosphorus: "Medium",
    potassium: "High",
    organicMatter: "Medium",
    drainage: "Moderate"
  },
  "Irrigated Schemes": {
    type: "Vertisol Clay",
    pH: 7.4,
    nitrogen: "High",
    phosphorus: "High",
    potassium: "High",
    organicMatter: "High",
    drainage: "Good"
  },
  "Coastal Plains": {
    type: "Alluvial",
    pH: 6.5,
    nitrogen: "Medium",
    phosphorus: "Low",
    potassium: "High",
    organicMatter: "Medium",
    drainage: "Good"
  }
};

// Climate data for each zone in Sudan
export const CLIMATE_DATA = {
  "Nile Valley": {
    avgRainfall: 150,
    temperature: { min: 15, max: 42 },
    humidity: 30,
    season: "Irrigated year-round",
    riskFactors: ["Extreme heat", "Water scarcity"]
  },
  "Semi-Desert": {
    avgRainfall: 100,
    temperature: { min: 12, max: 45 },
    humidity: 20,
    season: "Very short rainy season",
    riskFactors: ["Severe drought", "Extreme heat", "Sand storms"]
  },
  "Irrigated Plains": {
    avgRainfall: 300,
    temperature: { min: 18, max: 40 },
    humidity: 40,
    season: "June-October rainy",
    riskFactors: ["Occasional drought", "Heat stress"]
  },
  "Clay Plains": {
    avgRainfall: 450,
    temperature: { min: 20, max: 38 },
    humidity: 50,
    season: "June-October rainy",
    riskFactors: ["Waterlogging", "Drought"]
  },
  "Savanna": {
    avgRainfall: 650,
    temperature: { min: 22, max: 36 },
    humidity: 60,
    season: "May-October rainy",
    riskFactors: ["Variable rainfall", "Dry spells"]
  },
  "Gum Arabic Belt": {
    avgRainfall: 350,
    temperature: { min: 15, max: 40 },
    humidity: 35,
    season: "July-September rainy",
    riskFactors: ["Drought", "Erratic rainfall"]
  },
  "Transition Zone": {
    avgRainfall: 500,
    temperature: { min: 20, max: 37 },
    humidity: 55,
    season: "June-October rainy",
    riskFactors: ["Variable rainfall", "Dry periods"]
  },
  "Desert Margin": {
    avgRainfall: 75,
    temperature: { min: 10, max: 48 },
    humidity: 15,
    season: "Minimal rainfall",
    riskFactors: ["Severe drought", "Extreme heat", "Water scarcity"]
  },
  "Eastern Plains": {
    avgRainfall: 550,
    temperature: { min: 20, max: 38 },
    humidity: 50,
    season: "June-October rainy",
    riskFactors: ["Erratic rainfall", "Dry spells"]
  },
  "Mechanized Farming Zone": {
    avgRainfall: 600,
    temperature: { min: 22, max: 37 },
    humidity: 55,
    season: "June-October rainy",
    riskFactors: ["Drought", "Variable rainfall"]
  },
  "Irrigated Schemes": {
    avgRainfall: 400,
    temperature: { min: 20, max: 39 },
    humidity: 45,
    season: "Irrigated schemes",
    riskFactors: ["Water availability", "Heat stress"]
  }
};
