import { STATES_DATA, SOIL_PROFILES, CLIMATE_DATA } from '../data/locationData';

/**
 * Location Intelligence Module
 * Maps user location to environmental profiles
 */

export class LocationIntelligence {
  constructor(state, zone = null) {
    this.state = state;
    this.zone = zone || this.getDefaultZone(state);
    this.soilProfile = this.getSoilProfile();
    this.climateData = this.getClimateData();
  }

  getDefaultZone(state) {
    const stateData = STATES_DATA[state];
    return stateData ? stateData.defaultZone : null;
  }

  getAvailableZones(state) {
    const stateData = STATES_DATA[state];
    return stateData ? stateData.zones : [];
  }

  getSoilProfile() {
    return SOIL_PROFILES[this.zone] || null;
  }

  getClimateData() {
    return CLIMATE_DATA[this.zone] || null;
  }

  getLocationSummary() {
    return {
      state: this.state,
      zone: this.zone,
      soil: this.soilProfile,
      climate: this.climateData
    };
  }

  // Check if soil is suitable for crop
  isSoilSuitable(cropSoilTypes) {
    if (!this.soilProfile) return false;
    return cropSoilTypes.includes(this.soilProfile.type);
  }

  // Check if pH is suitable for crop
  isPHSuitable(cropPHRange) {
    if (!this.soilProfile) return false;
    const pH = this.soilProfile.pH;
    return pH >= cropPHRange[0] && pH <= cropPHRange[1];
  }

  // Check if temperature is suitable for crop
  isTemperatureSuitable(cropTempRange) {
    if (!this.climateData) return false;
    const climate = this.climateData.temperature;
    return (
      climate.min <= cropTempRange.max &&
      climate.max >= cropTempRange.min
    );
  }

  // Calculate soil nutrient score (0-1)
  getSoilNutrientScore() {
    if (!this.soilProfile) return 0;
    
    const nutrientMap = {
      'Very Low': 0.1,
      'Low': 0.3,
      'Medium': 0.6,
      'High': 0.9,
      'Very High': 1.0
    };

    const n = nutrientMap[this.soilProfile.nitrogen] || 0.5;
    const p = nutrientMap[this.soilProfile.phosphorus] || 0.5;
    const k = nutrientMap[this.soilProfile.potassium] || 0.5;
    const om = nutrientMap[this.soilProfile.organicMatter] || 0.5;

    return (n + p + k + om) / 4;
  }

  // Calculate water availability score (0-1)
  getWaterAvailabilityScore() {
    if (!this.climateData) return 0;
    
    const rainfall = this.climateData.avgRainfall;
    
    // Normalize rainfall (assuming 0-3000mm range)
    let score = Math.min(rainfall / 1500, 1.0);
    
    // Adjust for drainage
    if (this.soilProfile) {
      const drainageBonus = {
        'Excellent': 0.1,
        'Good': 0.05,
        'Moderate': 0,
        'Poor': -0.1
      };
      score += drainageBonus[this.soilProfile.drainage] || 0;
    }

    return Math.max(0, Math.min(1, score));
  }

  // Get climate risk level (0-1, higher is riskier)
  getClimateRiskLevel() {
    if (!this.climateData) return 0.5;
    
    const riskFactors = this.climateData.riskFactors || [];
    const severeRisks = ['Extreme drought', 'Cyclones', 'Heavy rainfall', 'Extreme heat'];
    
    let riskScore = 0;
    riskFactors.forEach(risk => {
      if (severeRisks.includes(risk)) {
        riskScore += 0.3;
      } else {
        riskScore += 0.15;
      }
    });

    return Math.min(riskScore, 1.0);
  }
}

export default LocationIntelligence;
