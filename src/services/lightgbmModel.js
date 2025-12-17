import { CROPS_DATABASE } from '../data/cropsData';

/**
 * Simulated LightGBM Model
 * Uses decision tree-based rules with feature importance
 */
export class LightGBMModel {
  constructor(locationIntelligence, farmSize) {
    this.location = locationIntelligence;
    this.farmSize = farmSize;
    this.featureImportance = {
      soilType: 0.25,
      waterAvailability: 0.22,
      temperature: 0.20,
      nutrients: 0.18,
      climateRisk: 0.15
    };
  }

  // Tree-based decision rule for soil
  soilTreeRule(crop) {
    let score = 0;
    
    // Primary branch: soil type match
    if (this.location.isSoilSuitable(crop.soilTypes)) {
      score += 0.6;
      
      // Secondary branch: pH check
      if (this.location.isPHSuitable(crop.pHRange)) {
        score += 0.3;
      } else {
        score += 0.1;
      }
    } else {
      // Alternative path: check if soil is similar
      const soilType = this.location.soilProfile?.type || '';
      const cropSoils = crop.soilTypes.join(' ');
      
      if (soilType.includes('Black') && cropSoils.includes('Black')) {
        score += 0.3;
      } else if (soilType.includes('Red') && cropSoils.includes('Red')) {
        score += 0.3;
      } else if (soilType.includes('Alluvial') && cropSoils.includes('Alluvial')) {
        score += 0.3;
      } else {
        score += 0.1;
      }
    }
    
    return score;
  }

  // Tree-based decision rule for water
  waterTreeRule(crop) {
    const rainfall = this.location.climateData?.avgRainfall || 0;
    const cropWaterNeed = crop.waterMM;
    
    let score = 0;
    
    // Primary split: adequate rainfall
    if (rainfall >= cropWaterNeed * 0.8) {
      score += 0.7;
      
      // Check for excess
      if (rainfall > cropWaterNeed * 1.5) {
        // Check drainage
        if (this.location.soilProfile?.drainage === 'Excellent' || 
            this.location.soilProfile?.drainage === 'Good') {
          score += 0.3;
        } else {
          score += 0.1; // Risk of waterlogging
        }
      } else {
        score += 0.3;
      }
    } else if (rainfall >= cropWaterNeed * 0.5) {
      score += 0.4; // Supplemental irrigation needed
    } else {
      score += 0.1; // Heavy irrigation required
    }
    
    return score;
  }

  // Tree-based decision rule for temperature
  temperatureTreeRule(crop) {
    const climateTemp = this.location.climateData?.temperature;
    const cropTemp = crop.temperature;
    
    if (!climateTemp) return 0.5;
    
    let score = 0;
    
    // Check if temperature range overlaps
    const overlaps = climateTemp.min <= cropTemp.max && climateTemp.max >= cropTemp.min;
    
    if (overlaps) {
      // Calculate overlap quality
      const overlapMin = Math.max(climateTemp.min, cropTemp.min);
      const overlapMax = Math.min(climateTemp.max, cropTemp.max);
      const overlapRange = overlapMax - overlapMin;
      const cropRange = cropTemp.max - cropTemp.min;
      
      const overlapRatio = overlapRange / cropRange;
      
      if (overlapRatio >= 0.8) {
        score = 1.0;
      } else if (overlapRatio >= 0.5) {
        score = 0.7;
      } else {
        score = 0.4;
      }
    } else {
      score = 0.1;
    }
    
    return score;
  }

  // Tree-based decision rule for nutrients
  nutrientTreeRule(crop) {
    const soil = this.location.soilProfile;
    if (!soil) return 0.5;
    
    const levelValue = {
      'Very Low': 1,
      'Low': 2,
      'Medium': 3,
      'High': 4,
      'Very High': 5
    };
    
    const soilN = levelValue[soil.nitrogen] || 3;
    const soilP = levelValue[soil.phosphorus] || 3;
    const soilK = levelValue[soil.potassium] || 3;
    
    const cropN = levelValue[crop.nutrients.nitrogen] || 3;
    const cropP = levelValue[crop.nutrients.phosphorus] || 3;
    const cropK = levelValue[crop.nutrients.potassium] || 3;
    
    let score = 0;
    let matchCount = 0;
    
    // Check each nutrient
    if (soilN >= cropN) matchCount++;
    if (soilP >= cropP) matchCount++;
    if (soilK >= cropK) matchCount++;
    
    if (matchCount === 3) {
      score = 1.0;
    } else if (matchCount === 2) {
      score = 0.7;
    } else if (matchCount === 1) {
      score = 0.4;
    } else {
      score = 0.2;
    }
    
    return score;
  }

  // Tree-based decision rule for climate risk
  climateRiskTreeRule(crop) {
    const riskLevel = this.location.getClimateRiskLevel();
    const waterReq = crop.waterRequirement;
    
    let score = 0;
    
    if (riskLevel < 0.3) {
      score = 1.0; // Low risk area
    } else if (riskLevel < 0.6) {
      // Moderate risk - check crop resilience
      if (waterReq === 'Low' || waterReq === 'Very Low') {
        score = 0.8; // Drought-tolerant crops
      } else if (waterReq === 'Medium') {
        score = 0.6;
      } else {
        score = 0.4; // High water need crops risky
      }
    } else {
      // High risk area
      if (waterReq === 'Very Low' || crop.name === 'Millets') {
        score = 0.6; // Only hardy crops
      } else {
        score = 0.3;
      }
    }
    
    return score;
  }

  // Combine tree rules with feature importance
  calculateScore(crop) {
    const soilScore = this.soilTreeRule(crop);
    const waterScore = this.waterTreeRule(crop);
    const tempScore = this.temperatureTreeRule(crop);
    const nutrientScore = this.nutrientTreeRule(crop);
    const riskScore = this.climateRiskTreeRule(crop);
    
    // Weighted combination
    const finalScore = (
      soilScore * this.featureImportance.soilType +
      waterScore * this.featureImportance.waterAvailability +
      tempScore * this.featureImportance.temperature +
      nutrientScore * this.featureImportance.nutrients +
      riskScore * this.featureImportance.climateRisk
    );
    
    return {
      score: finalScore,
      featureScores: {
        soil: soilScore,
        water: waterScore,
        temperature: tempScore,
        nutrients: nutrientScore,
        climateRisk: riskScore
      },
      topFeatures: this.getTopInfluencingFeatures({
        soil: soilScore,
        water: waterScore,
        temperature: tempScore,
        nutrients: nutrientScore,
        climateRisk: riskScore
      })
    };
  }

  // Get top influencing features
  getTopInfluencingFeatures(featureScores) {
    const features = [
      { name: 'Soil Type', score: featureScores.soil, importance: this.featureImportance.soilType },
      { name: 'Water Availability', score: featureScores.water, importance: this.featureImportance.waterAvailability },
      { name: 'Temperature', score: featureScores.temperature, importance: this.featureImportance.temperature },
      { name: 'Nutrients', score: featureScores.nutrients, importance: this.featureImportance.nutrients },
      { name: 'Climate Risk', score: featureScores.climateRisk, importance: this.featureImportance.climateRisk }
    ];
    
    // Sort by weighted influence
    features.sort((a, b) => (b.score * b.importance) - (a.score * a.importance));
    
    return features.slice(0, 3);
  }

  // Predict for all crops
  predictAll() {
    const predictions = [];
    
    for (const [key, crop] of Object.entries(CROPS_DATABASE)) {
      const result = this.calculateScore(crop);
      predictions.push({
        cropKey: key,
        cropName: crop.name,
        suitabilityScore: result.score,
        featureScores: result.featureScores,
        topFeatures: result.topFeatures
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

export default LightGBMModel;
