import { MARKET_DATA } from '../data/marketData';

/**
 * Market Analysis Service
 * Evaluates profitability and market suitability
 */
export class MarketAnalysisService {
  constructor(crop, locationIntelligence) {
    this.crop = crop;
    this.location = locationIntelligence;
    this.marketData = MARKET_DATA[this.getCropKey()] || null;
  }

  // Get crop key from crop name
  getCropKey() {
    const cropName = this.crop.name.toLowerCase();
    // Convert crop name to key format
    return cropName.replace(/\s+/g, '_');
  }

  // Calculate profitability score
  calculateProfitabilityScore() {
    if (!this.marketData) return { score: 0.5, rating: 'Unknown' };
    
    let score = 0;
    
    // Demand level (0-0.4)
    const demandScore = {
      'Very High': 0.40,
      'High': 0.30,
      'Medium': 0.20,
      'Low': 0.10
    };
    score += demandScore[this.marketData.demandLevel] || 0.20;
    
    // Opportunity (0-0.35)
    const opportunityScore = {
      'Good opportunity': 0.35,
      'Moderate opportunity': 0.20,
      'Limited opportunity': 0.10
    };
    score += opportunityScore[this.marketData.opportunity] || 0.20;
    
    // Market access (0-0.25)
    const accessScore = {
      'Excellent': 0.25,
      'Good': 0.18,
      'Moderate': 0.12,
      'Poor': 0.05
    };
    score += accessScore[this.marketData.marketAccess] || 0.12;
    
    // Get rating
    let rating = 'Fair';
    if (score >= 0.8) rating = 'Excellent';
    else if (score >= 0.65) rating = 'Very Good';
    else if (score >= 0.5) rating = 'Good';
    else if (score >= 0.35) rating = 'Fair';
    else rating = 'Poor';
    
    return { score, rating };
  }

  // Calculate risk level
  calculateRiskLevel() {
    let riskScore = 0;
    
    // Climate risk
    const climateRisk = this.location.getClimateRiskLevel();
    riskScore += climateRisk * 0.5;
    
    // Storage life risk (perishables are risky)
    if (this.marketData) {
      if (this.marketData.storageLife.includes('week') || 
          this.marketData.storageLife.includes('Immediate')) {
        riskScore += 0.3;
      } else if (this.marketData.storageLife.includes('3 months')) {
        riskScore += 0.15;
      }
    }
    
    // Market access risk
    if (this.marketData?.marketAccess === 'Poor' || 
        this.marketData?.marketAccess === 'Moderate') {
      riskScore += 0.2;
    }
    
    // Get risk rating
    let riskRating = 'Moderate';
    if (riskScore >= 0.7) riskRating = 'High';
    else if (riskScore >= 0.4) riskRating = 'Moderate';
    else riskRating = 'Low';
    
    return { score: riskScore, rating: riskRating };
  }

  // Get market opportunity summary (simplified, no prices)
  getMarketOpportunity() {
    if (!this.marketData) return null;
    
    return {
      opportunity: this.marketData.opportunity,
      demandLevel: this.marketData.demandLevel,
      marketAccess: this.marketData.marketAccess,
      storageLife: this.marketData.storageLife,
      seasonalDemand: this.marketData.seasonalDemand,
      notes: this.marketData.notes
    };
  }

  // Get seasonal market advantage
  getSeasonalAdvantage() {
    if (!this.marketData?.seasonalDemand) return null;
    
    const demand = this.marketData.seasonalDemand;
    
    let advantage = 'Moderate';
    let description = 'Normal market conditions';
    
    if (demand.includes('Very high')) {
      advantage = 'High';
      description = demand;
    } else if (demand.includes('High')) {
      advantage = 'Good';
      description = demand;
    } else if (demand.includes('Steady')) {
      advantage = 'Moderate';
      description = demand;
    } else {
      advantage = 'Low';
      description = demand;
    }
    
    return { advantage, description };
  }

  // Generate market analysis
  generateAnalysis() {
    const profitability = this.calculateProfitabilityScore();
    const risk = this.calculateRiskLevel();
    const marketOpportunity = this.getMarketOpportunity();
    const seasonalAdvantage = this.getSeasonalAdvantage();
    
    return {
      cropName: this.crop.name,
      profitability: profitability,
      risk: risk,
      marketOpportunity: marketOpportunity,
      seasonalAdvantage: seasonalAdvantage,
      recommendations: this.getMarketRecommendations(profitability, risk)
    };
  }

  // Get market recommendations
  getMarketRecommendations(profitability, risk) {
    const recommendations = [];
    
    if (profitability.score >= 0.7) {
      recommendations.push('This crop has good market opportunity');
    } else if (profitability.score < 0.4) {
      recommendations.push('Consider other crops with better opportunities');
    }
    
    if (risk.rating === 'High') {
      recommendations.push('This crop needs careful planning to reduce risks');
    }
    
    if (this.marketData?.storageLife?.includes('week')) {
      recommendations.push('This crop needs to be sold quickly after harvest');
      recommendations.push('Make sure you can reach buyers before planting');
    }
    
    if (this.marketData?.demandLevel === 'Very High') {
      recommendations.push('Strong demand for this crop');
    }
    
    if (this.marketData?.marketAccess === 'Excellent') {
      recommendations.push('Easy to find buyers for this crop');
    } else if (this.marketData?.marketAccess === 'Moderate') {
      recommendations.push('You may need to work with other farmers to sell');
    }
    
    return recommendations;
  }
}

// Compare multiple crops for market suitability
export function compareMarketSuitability(crops, locationIntelligence) {
  const analyses = crops.map(crop => {
    const service = new MarketAnalysisService(crop, locationIntelligence);
    return service.generateAnalysis();
  });
  
  // Sort by profitability score
  analyses.sort((a, b) => b.profitability.score - a.profitability.score);
  
  return analyses;
}

export default MarketAnalysisService;

