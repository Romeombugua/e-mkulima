import { CROPS_DATABASE } from '../data/cropsData';

/**
 * Simulated ANN Model
 * Uses weighted scoring with nonlinear activation
 */
export class ANNModel {
  constructor(locationIntelligence, farmSize) {
    this.location = locationIntelligence;
    this.farmSize = farmSize;
    this.weights = {
      soilSuitability: 0.30,
      climateSuitability: 0.25,
      waterAvailability: 0.20,
      nutrientMatch: 0.15,
      farmSizeMatch: 0.10
    };
  }

  // Sigmoid activation function
  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  // ReLU activation function
  relu(x) {
    return Math.max(0, x);
  }

  // Calculate soil suitability score
  calculateSoilScore(crop) {
    let score = 0;
    
    // Soil type match
    if (this.location.isSoilSuitable(crop.soilTypes)) {
      score += 0.5;
    }
    
    // pH suitability
    if (this.location.isPHSuitable(crop.pHRange)) {
      score += 0.3;
    }
    
    // Drainage match
    const waterReqMap = {
      'Very High': 'Poor',
      'High': 'Moderate',
      'Medium': 'Good',
      'Low': 'Good',
      'Very Low': 'Excellent'
    };
    
    if (this.location.soilProfile?.drainage === waterReqMap[crop.waterRequirement]) {
      score += 0.2;
    }
    
    return score;
  }

  // Calculate climate suitability score
  calculateClimateScore(crop) {
    let score = 0;
    
    // Temperature suitability
    if (this.location.isTemperatureSuitable(crop.temperature)) {
      score += 0.6;
    } else {
      // Partial score for near matches
      const climateTempAvg = (this.location.climateData.temperature.min + 
                             this.location.climateData.temperature.max) / 2;
      const cropTempAvg = (crop.temperature.min + crop.temperature.max) / 2;
      const tempDiff = Math.abs(climateTempAvg - cropTempAvg);
      
      if (tempDiff < 10) {
        score += 0.3;
      } else if (tempDiff < 15) {
        score += 0.1;
      }
    }
    
    // Season match
    const climateSeason = this.location.climateData.season.toLowerCase();
    const cropSeason = crop.season.toLowerCase();
    
    if (climateSeason.includes(cropSeason) || 
        cropSeason.includes('year-round') || 
        cropSeason.includes('dual')) {
      score += 0.4;
    }
    
    return score;
  }

  // Calculate water availability score
  calculateWaterScore(crop) {
    const waterAvailability = this.location.getWaterAvailabilityScore();
    const cropWaterNeed = crop.waterMM / 2000; // Normalize to 0-1
    
    // Higher score when availability matches need
    const difference = Math.abs(waterAvailability - cropWaterNeed);
    const score = 1 - difference;
    
    return Math.max(0, score);
  }

  // Calculate nutrient match score
  calculateNutrientScore(crop) {
    const soil = this.location.soilProfile;
    
    if (!soil) return 0;
    
    const nutrientLevelMap = {
      'Very Low': 0.1,
      'Low': 0.3,
      'Medium': 0.6,
      'High': 0.9,
      'Very High': 1.0
    };
    
    const soilN = nutrientLevelMap[soil.nitrogen] || 0.5;
    const soilP = nutrientLevelMap[soil.phosphorus] || 0.5;
    const soilK = nutrientLevelMap[soil.potassium] || 0.5;
    
    const cropN = nutrientLevelMap[crop.nutrients.nitrogen] || 0.5;
    const cropP = nutrientLevelMap[crop.nutrients.phosphorus] || 0.5;
    const cropK = nutrientLevelMap[crop.nutrients.potassium] || 0.5;
    
    // Better score when soil exceeds crop requirements
    const nScore = soilN >= cropN ? 1 : soilN / cropN;
    const pScore = soilP >= cropP ? 1 : soilP / cropP;
    const kScore = soilK >= cropK ? 1 : soilK / cropK;
    
    return (nScore + pScore + kScore) / 3;
  }

  // Calculate farm size match score
  calculateFarmSizeScore(crop) {
    const sizeMap = {
      'Small': 1,
      'Medium': 2
    };
    
    const farmSizeNum = sizeMap[this.farmSize] || 1;
    const cropSizeNum = sizeMap[crop.minFarmSize] || 1;
    
    if (farmSizeNum >= cropSizeNum) {
      return 1.0;
    } else {
      return 0.3; // Penalty for undersized farm
    }
  }

  // Calculate overall suitability for a crop
  calculateSuitability(crop) {
    const soilScore = this.calculateSoilScore(crop);
    const climateScore = this.calculateClimateScore(crop);
    const waterScore = this.calculateWaterScore(crop);
    const nutrientScore = this.calculateNutrientScore(crop);
    const farmSizeScore = this.calculateFarmSizeScore(crop);
    
    // Weighted sum
    const rawScore = (
      soilScore * this.weights.soilSuitability +
      climateScore * this.weights.climateSuitability +
      waterScore * this.weights.waterAvailability +
      nutrientScore * this.weights.nutrientMatch +
      farmSizeScore * this.weights.farmSizeMatch
    );
    
    // Apply sigmoid activation for nonlinear scaling
    const normalizedScore = this.sigmoid((rawScore - 0.5) * 8);
    
    return {
      score: normalizedScore,
      breakdown: {
        soil: soilScore,
        climate: climateScore,
        water: waterScore,
        nutrients: nutrientScore,
        farmSize: farmSizeScore
      }
    };
  }

  // Get expected yield category
  getYieldCategory(suitabilityScore) {
    if (suitabilityScore >= 0.8) return 'High';
    if (suitabilityScore >= 0.6) return 'Medium-High';
    if (suitabilityScore >= 0.4) return 'Medium';
    if (suitabilityScore >= 0.2) return 'Low-Medium';
    return 'Low';
  }

  // Predict for all crops
  predictAll() {
    const predictions = [];
    
    for (const [key, crop] of Object.entries(CROPS_DATABASE)) {
      const suitability = this.calculateSuitability(crop);
      predictions.push({
        cropKey: key,
        cropName: crop.name,
        suitabilityScore: suitability.score,
        yieldCategory: this.getYieldCategory(suitability.score),
        breakdown: suitability.breakdown
      });
    }
    
    // Sort by suitability score
    predictions.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
    
    return predictions;
  }

  // Get top N recommendations
  getTopRecommendations(n = 5) {
    const predictions = this.predictAll();
    return predictions.slice(0, n);
  }
}

export default ANNModel;
