import { CROPS_DATABASE } from '../data/cropsData';

/**
 * Irrigation Recommendation Service
 * Generates irrigation schedules based on crop needs and rainfall
 */
export class IrrigationService {
  constructor(locationIntelligence, crop) {
    this.location = locationIntelligence;
    this.crop = crop;
  }

  // Calculate irrigation requirement
  calculateIrrigationNeed() {
    const cropWaterNeed = this.crop.waterMM;
    const rainfall = this.location.climateData?.avgRainfall || 0;
    
    // Calculate deficit
    const deficit = Math.max(0, cropWaterNeed - rainfall);
    const deficitPercentage = (deficit / cropWaterNeed) * 100;
    
    return {
      totalNeed: cropWaterNeed,
      rainfall: rainfall,
      deficit: deficit,
      deficitPercentage: deficitPercentage.toFixed(1)
    };
  }

  // Get irrigation frequency
  getIrrigationFrequency() {
    const need = this.calculateIrrigationNeed();
    const waterReq = this.crop.waterRequirement;
    
    if (need.deficit === 0) {
      return {
        frequency: 'Rainfed',
        interval: 'No irrigation needed',
        description: 'Natural rainfall is sufficient'
      };
    }
    
    if (need.deficitPercentage < 20) {
      return {
        frequency: 'Minimal',
        interval: 'Once every 15-20 days',
        description: 'Light supplemental irrigation during dry spells'
      };
    }
    
    if (waterReq === 'Very High' || waterReq === 'High') {
      return {
        frequency: 'High',
        interval: 'Every 3-5 days',
        description: 'Regular irrigation throughout growing season'
      };
    }
    
    if (waterReq === 'Medium') {
      return {
        frequency: 'Moderate',
        interval: 'Every 7-10 days',
        description: 'Weekly irrigation during critical stages'
      };
    }
    
    return {
      frequency: 'Low',
      interval: 'Every 12-15 days',
      description: 'Periodic irrigation as needed'
    };
  }

  // Get critical growth stages for irrigation
  getCriticalStages() {
    const cropName = this.crop.name.toLowerCase();
    
    const stageMap = {
      'rice': [
        { stage: 'Transplanting', days: '0-10', priority: 'Critical' },
        { stage: 'Tillering', days: '20-40', priority: 'High' },
        { stage: 'Panicle Initiation', days: '50-60', priority: 'Critical' },
        { stage: 'Flowering', days: '70-80', priority: 'Critical' }
      ],
      'wheat': [
        { stage: 'Crown Root Initiation', days: '20-25', priority: 'Critical' },
        { stage: 'Tillering', days: '30-40', priority: 'High' },
        { stage: 'Jointing', days: '60-70', priority: 'Critical' },
        { stage: 'Flowering', days: '85-95', priority: 'High' }
      ],
      'cotton': [
        { stage: 'Germination', days: '0-15', priority: 'Critical' },
        { stage: 'Flowering', days: '60-90', priority: 'Critical' },
        { stage: 'Boll Development', days: '90-120', priority: 'High' }
      ],
      'maize': [
        { stage: 'Germination', days: '0-10', priority: 'Critical' },
        { stage: 'Vegetative', days: '30-45', priority: 'High' },
        { stage: 'Tasseling', days: '50-60', priority: 'Critical' },
        { stage: 'Grain Filling', days: '65-80', priority: 'Critical' }
      ],
      'default': [
        { stage: 'Germination', days: '0-15', priority: 'Critical' },
        { stage: 'Vegetative Growth', days: '25-50', priority: 'High' },
        { stage: 'Flowering', days: '50-70', priority: 'Critical' },
        { stage: 'Fruiting/Grain Filling', days: '70-90', priority: 'High' }
      ]
    };
    
    return stageMap[cropName] || stageMap['default'];
  }

  // Get irrigation method recommendation
  getIrrigationMethod() {
    const waterReq = this.crop.waterRequirement;
    const soilDrainage = this.location.soilProfile?.drainage;
    
    if (waterReq === 'Very High' || waterReq === 'High') {
      if (this.crop.name === 'Rice') {
        return {
          method: 'Flood Irrigation',
          efficiency: '40-50%',
          description: 'Traditional flooding method suitable for paddy cultivation'
        };
      }
      return {
        method: 'Drip Irrigation',
        efficiency: '90-95%',
        description: 'Highly efficient for high water requirement crops, reduces wastage'
      };
    }
    
    if (soilDrainage === 'Excellent' || soilDrainage === 'Good') {
      return {
        method: 'Drip Irrigation',
        efficiency: '90-95%',
        description: 'Best for well-drained soils, delivers water directly to roots'
      };
    }
    
    return {
      method: 'Sprinkler Irrigation',
      efficiency: '70-80%',
      description: 'Suitable for various crops and soil types'
    };
  }

  // Generate complete irrigation plan
  generatePlan() {
    const need = this.calculateIrrigationNeed();
    const frequency = this.getIrrigationFrequency();
    const criticalStages = this.getCriticalStages();
    const method = this.getIrrigationMethod();
    
    return {
      waterRequirement: need,
      frequency: frequency,
      criticalStages: criticalStages,
      method: method,
      cropName: this.crop.name,
      recommendations: this.getRecommendations(need, frequency)
    };
  }

  // Get specific recommendations
  getRecommendations(need, frequency) {
    const recommendations = [];
    
    if (need.deficit > 0) {
      recommendations.push('Ensure water availability during critical growth stages');
    }
    
    if (frequency.frequency === 'High') {
      recommendations.push('Consider installing drip irrigation for water efficiency');
    }
    
    if (this.location.climateData?.riskFactors?.includes('Drought')) {
      recommendations.push('Store rainwater during monsoon for dry periods');
      recommendations.push('Apply mulch to reduce water evaporation');
    }
    
    if (this.location.climateData?.riskFactors?.includes('Floods')) {
      recommendations.push('Ensure proper drainage to prevent waterlogging');
    }
    
    return recommendations;
  }
}

/**
 * Fertilizer Recommendation Service
 * Generates fertilizer plans based on soil and crop requirements
 */
export class FertilizerService {
  constructor(locationIntelligence, crop) {
    this.location = locationIntelligence;
    this.crop = crop;
  }

  // Calculate nutrient gap
  calculateNutrientGap() {
    const soil = this.location.soilProfile;
    if (!soil) return null;
    
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
    
    const cropN = levelValue[this.crop.nutrients.nitrogen] || 3;
    const cropP = levelValue[this.crop.nutrients.phosphorus] || 3;
    const cropK = levelValue[this.crop.nutrients.potassium] || 3;
    
    return {
      nitrogen: { soil: soil.nitrogen, crop: this.crop.nutrients.nitrogen, gap: cropN - soilN },
      phosphorus: { soil: soil.phosphorus, crop: this.crop.nutrients.phosphorus, gap: cropP - soilP },
      potassium: { soil: soil.potassium, crop: this.crop.nutrients.potassium, gap: cropK - soilK }
    };
  }

  // Get fertilizer recommendation
  getFertilizerRecommendation() {
    const gap = this.calculateNutrientGap();
    if (!gap) return null;
    
    const recommendations = [];
    
    // Nitrogen recommendation
    if (gap.nitrogen.gap > 1) {
      recommendations.push({
        nutrient: 'Nitrogen',
        application: 'High',
        fertilizers: ['Urea', 'Ammonium Sulphate', 'DAP'],
        dosage: '120-150 kg/hectare',
        timing: 'Split application: 50% basal, 25% at 30 days, 25% at 60 days'
      });
    } else if (gap.nitrogen.gap > 0) {
      recommendations.push({
        nutrient: 'Nitrogen',
        application: 'Medium',
        fertilizers: ['Urea', 'DAP'],
        dosage: '80-100 kg/hectare',
        timing: 'Split application: 50% basal, 50% at 30 days'
      });
    } else {
      recommendations.push({
        nutrient: 'Nitrogen',
        application: 'Low',
        fertilizers: ['Organic manure', 'Compost'],
        dosage: '40-60 kg/hectare',
        timing: 'Basal application'
      });
    }
    
    // Phosphorus recommendation
    if (gap.phosphorus.gap > 1) {
      recommendations.push({
        nutrient: 'Phosphorus',
        application: 'High',
        fertilizers: ['Single Super Phosphate (SSP)', 'DAP'],
        dosage: '60-80 kg P2O5/hectare',
        timing: 'Full dose as basal application'
      });
    } else if (gap.phosphorus.gap > 0) {
      recommendations.push({
        nutrient: 'Phosphorus',
        application: 'Medium',
        fertilizers: ['SSP', 'DAP'],
        dosage: '40-50 kg P2O5/hectare',
        timing: 'Basal application'
      });
    } else {
      recommendations.push({
        nutrient: 'Phosphorus',
        application: 'Low',
        fertilizers: ['Rock phosphate', 'Bone meal'],
        dosage: '20-30 kg P2O5/hectare',
        timing: 'Basal application'
      });
    }
    
    // Potassium recommendation
    if (gap.potassium.gap > 1) {
      recommendations.push({
        nutrient: 'Potassium',
        application: 'High',
        fertilizers: ['Muriate of Potash (MOP)'],
        dosage: '80-100 kg K2O/hectare',
        timing: 'Split: 50% basal, 50% at flowering'
      });
    } else if (gap.potassium.gap > 0) {
      recommendations.push({
        nutrient: 'Potassium',
        application: 'Medium',
        fertilizers: ['MOP'],
        dosage: '40-60 kg K2O/hectare',
        timing: 'Basal application'
      });
    } else {
      recommendations.push({
        nutrient: 'Potassium',
        application: 'Low',
        fertilizers: ['Wood ash', 'Compost'],
        dosage: '20-30 kg K2O/hectare',
        timing: 'Basal application'
      });
    }
    
    return recommendations;
  }

  // Calculate cost efficiency
  calculateCostEfficiency() {
    const gap = this.calculateNutrientGap();
    if (!gap) return null;
    
    const totalGap = Math.max(0, gap.nitrogen.gap) + 
                     Math.max(0, gap.phosphorus.gap) + 
                     Math.max(0, gap.potassium.gap);
    
    if (totalGap === 0) {
      return {
        level: 'Excellent',
        description: 'Minimal fertilizer investment needed',
        estimatedCost: 'Low'
      };
    } else if (totalGap <= 3) {
      return {
        level: 'Good',
        description: 'Moderate fertilizer investment',
        estimatedCost: 'Medium'
      };
    } else {
      return {
        level: 'Fair',
        description: 'Significant fertilizer investment required',
        estimatedCost: 'High'
      };
    }
  }

  // Generate complete fertilizer plan
  generatePlan() {
    const gap = this.calculateNutrientGap();
    const recommendations = this.getFertilizerRecommendation();
    const costEfficiency = this.calculateCostEfficiency();
    
    return {
      cropName: this.crop.name,
      nutrientGap: gap,
      recommendations: recommendations,
      costEfficiency: costEfficiency,
      organicAlternatives: this.getOrganicAlternatives(),
      generalTips: [
        'Conduct soil testing before application',
        'Apply fertilizers when soil has adequate moisture',
        'Avoid over-fertilization to prevent environmental damage',
        'Consider organic options for sustainable farming'
      ]
    };
  }

  // Get organic alternatives
  getOrganicAlternatives() {
    return [
      { type: 'Vermicompost', nutrients: 'Balanced NPK', application: '5-10 tons/hectare' },
      { type: 'Farm Yard Manure', nutrients: 'General nutrition', application: '10-15 tons/hectare' },
      { type: 'Green Manure', nutrients: 'Nitrogen-rich', application: 'Grow and incorporate legumes' },
      { type: 'Neem Cake', nutrients: 'Nitrogen + pest control', application: '200-400 kg/hectare' }
    ];
  }
}

export default { IrrigationService, FertilizerService };
