# 📊 Mkulima System Architecture Diagram

## 🎯 Complete System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│                      (UserInputForm.jsx)                         │
│                                                                   │
│  📝 Inputs:                                                      │
│    • Farmer Name                                                 │
│    • State (10 options)                                          │
│    • Agro-Ecological Zone (auto-mapped)                         │
│    • Farm Size (Small/Medium)                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LOCATION INTELLIGENCE                          │
│              (locationIntelligence.js)                          │
│                                                                   │
│  🗺️ Maps Location to:                                           │
│    • Soil Profile (type, pH, NPK, drainage)                     │
│    • Climate Data (rainfall, temp, humidity)                     │
│    • Risk Factors (drought, floods, etc.)                       │
│                                                                   │
│  📦 Data Sources:                                               │
│    • locationData.js (10 states, 30+ zones)                     │
│    • SOIL_PROFILES (15+ soil types)                             │
│    • CLIMATE_DATA (30+ climate profiles)                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AI MODEL SELECTION                            │
│                  (modelSelector.js)                             │
│                                                                   │
│  🤖 Evaluates Both Models:                                       │
│                                                                   │
│  ┌─────────────────┐              ┌──────────────────┐         │
│  │   ANN Model     │              │  LightGBM Model  │         │
│  │ (annModel.js)   │              │(lightgbmModel.js)│         │
│  │                 │              │                  │         │
│  │ Weighted Score: │              │ Tree Rules:      │         │
│  │ • Soil: 30%     │              │ • Soil: 25%      │         │
│  │ • Climate: 25%  │              │ • Water: 22%     │         │
│  │ • Water: 20%    │              │ • Temp: 20%      │         │
│  │ • Nutrients:15% │              │ • Nutrients: 18% │         │
│  │ • Farm Size:10% │              │ • Risk: 15%      │         │
│  │                 │              │                  │         │
│  │ Activation:     │              │ Features:        │         │
│  │ Sigmoid(x)      │              │ Decision Trees   │         │
│  └─────────────────┘              └──────────────────┘         │
│                                                                   │
│  🎯 Selects Best Model Based On:                                │
│    • Climate risk level                                          │
│    • Soil complexity                                             │
│    • Water variance                                              │
│    • Zone characteristics                                        │
│                                                                   │
│  📊 Output: Model selection + Justification                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CROP EVALUATION                               │
│                   (cropsData.js)                                │
│                                                                   │
│  🌾 Evaluates 20 Crops:                                         │
│    • Cereals (4): Rice, Wheat, Maize, Millets                   │
│    • Cash Crops (2): Cotton, Sugarcane                          │
│    • Oilseeds (4): Groundnut, Soybean, Mustard, Sunflower      │
│    • Pulses (2): Chickpea, Pigeon Pea                          │
│    • Vegetables (3): Tomato, Onion, Potato                      │
│    • Fruits (2): Banana, Mango                                  │
│    • Spices (2): Turmeric, Chili                               │
│                                                                   │
│  📈 For Each Crop:                                              │
│    • Suitability Score (0-1)                                     │
│    • Yield Category                                              │
│    • Feature Breakdown                                           │
│                                                                   │
│  🏆 Ranks All Crops by Suitability                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              RECOMMENDATION GENERATION                           │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  💧 IRRIGATION SERVICE (recommendations.js)              │  │
│  │                                                            │  │
│  │  • Calculates water deficit                               │  │
│  │  • Determines irrigation frequency                        │  │
│  │  • Identifies critical growth stages                      │  │
│  │  • Recommends irrigation method                           │  │
│  │  • Provides efficiency ratings                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🌱 FERTILIZER SERVICE (recommendations.js)              │  │
│  │                                                            │  │
│  │  • Calculates NPK gaps                                    │  │
│  │  • Recommends specific fertilizers                        │  │
│  │  • Provides dosage and timing                             │  │
│  │  • Cost efficiency rating                                 │  │
│  │  • Organic alternatives                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  💰 MARKET ANALYSIS (marketAnalysis.js)                  │  │
│  │                                                            │  │
│  │  • Profitability score                                    │  │
│  │  • Risk assessment                                        │  │
│  │  • Revenue estimation                                     │  │
│  │  • Seasonal advantage                                     │  │
│  │  • Market recommendations                                 │  │
│  │                                                            │  │
│  │  Data: marketData.js (prices, demand, stability)         │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     RESULTS DISPLAY                              │
│              (RecommendationResults.jsx)                        │
│                                                                   │
│  📊 Displays:                                                    │
│                                                                   │
│  1️⃣ Header Section                                              │
│     • Farmer name                                                │
│     • Location info                                              │
│     • AI model used + justification                             │
│                                                                   │
│  2️⃣ Climate Warnings (if applicable)                            │
│     • Risk alerts                                                │
│     • Precautionary measures                                     │
│                                                                   │
│  3️⃣ Primary Recommendation                                       │
│     • Top crop with suitability score                           │
│     • Market profitability (rating, revenue)                     │
│     • Irrigation plan (frequency, stages, method)               │
│     • Fertilizer plan (NPK, dosage, timing)                     │
│     • Market recommendations                                     │
│                                                                   │
│  4️⃣ Alternative Crops (3)                                        │
│     • Crop name + suitability                                    │
│     • Market rating                                              │
│     • Risk level                                                 │
│                                                                   │
│  5️⃣ Environmental Context                                        │
│     • Soil profile details                                       │
│     • Climate data                                               │
│                                                                   │
│  6️⃣ Action Buttons                                               │
│     • Get New Recommendations                                    │
│     • Print Recommendations                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Data Flow Architecture

```
Input Form
    │
    ├─> STATES_DATA (10 states)
    │   └─> Auto-select zone
    │
    └─> Submit
        │
        ├─> LocationIntelligence
        │   ├─> SOIL_PROFILES[zone]
        │   └─> CLIMATE_DATA[zone]
        │
        ├─> ModelSelector
        │   ├─> ANNModel.predictAll()
        │   ├─> LightGBMModel.predictAll()
        │   └─> Select best model
        │
        ├─> For top crop:
        │   ├─> IrrigationService.generatePlan()
        │   ├─> FertilizerService.generatePlan()
        │   └─> MarketAnalysisService.generateAnalysis()
        │
        └─> Display Results
```

---

## 🔄 Algorithm Flow

### ANN Model Processing
```
1. For each of 20 crops:
   │
   ├─> Calculate Soil Score
   │   └─> (type_match × 0.5) + (pH_match × 0.3) + (drainage × 0.2)
   │
   ├─> Calculate Climate Score
   │   └─> (temp_suitability × 0.6) + (season_match × 0.4)
   │
   ├─> Calculate Water Score
   │   └─> 1 - |available_water - required_water|
   │
   ├─> Calculate Nutrient Score
   │   └─> avg(N_match, P_match, K_match)
   │
   ├─> Calculate Farm Size Score
   │   └─> farm_size >= crop_min_size ? 1.0 : 0.3
   │
   ├─> Weighted Sum
   │   └─> (soil×0.30 + climate×0.25 + water×0.20 + nutrient×0.15 + size×0.10)
   │
   └─> Apply Sigmoid Activation
       └─> score = 1 / (1 + exp(-(raw_score - 0.5) × 8))

2. Sort crops by score
3. Return top N
```

### LightGBM Model Processing
```
1. For each of 20 crops:
   │
   ├─> Tree Rule: Soil
   │   └─> Decision branches based on soil type, pH
   │
   ├─> Tree Rule: Water
   │   └─> Decision branches based on rainfall, drainage
   │
   ├─> Tree Rule: Temperature
   │   └─> Decision branches based on temp overlap
   │
   ├─> Tree Rule: Nutrients
   │   └─> Count NPK matches
   │
   ├─> Tree Rule: Climate Risk
   │   └─> Adjust for drought/flood tolerance
   │
   └─> Weighted Combination
       └─> (soil×0.25 + water×0.22 + temp×0.20 + nutrient×0.18 + risk×0.15)

2. Sort crops by score
3. Return top N with feature importance
```

---

## 🎨 Component Hierarchy

```
App.jsx
│
├─> State: results, loading
│
├─> if (!results && !loading)
│   └─> UserInputForm
│       ├─> Form inputs
│       ├─> Validation
│       └─> onSubmit -> processRecommendations()
│
├─> if (loading)
│   └─> LoadingContainer
│       ├─> Spinner animation
│       └─> Progress steps
│
└─> if (results && !loading)
    └─> RecommendationResults
        ├─> ResultsHeader
        ├─> ModelInfoCard
        ├─> ClimateWarnings
        ├─> PrimaryRecommendation
        │   ├─> CropCard (featured)
        │   ├─> MarketInfo
        │   ├─> IrrigationSection
        │   ├─> FertilizerSection
        │   └─> MarketRecommendations
        ├─> AlternativeCrops
        │   └─> CropCard[] (alternatives)
        ├─> EnvironmentalContext
        │   ├─> SoilProfile
        │   └─> ClimateData
        └─> ActionButtons
```

---

## 📊 Data Relationships

```
STATES_DATA
    ├─> zones[] 
    └─> defaultZone
         │
         ├─> SOIL_PROFILES[zone]
         │       ├─> type
         │       ├─> pH
         │       ├─> nitrogen, phosphorus, potassium
         │       └─> drainage
         │
         └─> CLIMATE_DATA[zone]
                 ├─> avgRainfall
                 ├─> temperature {min, max}
                 ├─> humidity
                 ├─> season
                 └─> riskFactors[]

CROPS_DATABASE[cropKey]
    ├─> name, category
    ├─> waterRequirement, waterMM
    ├─> soilTypes[]
    ├─> pHRange[min, max]
    ├─> temperature {min, max}
    ├─> growingPeriod
    ├─> nutrients {nitrogen, phosphorus, potassium}
    ├─> season
    └─> minFarmSize

MARKET_DATA[cropKey]
    ├─> demandLevel
    ├─> priceStability
    ├─> avgPrice
    ├─> marketAccess
    ├─> profitMargin
    ├─> storageLife
    └─> seasonalDemand
```

---

## 🎯 Execution Timeline

```
User Submits Form (t=0ms)
    │
    ├─> Validation (t=0-50ms)
    │
    ├─> Set loading=true (t=50ms)
    │
    ├─> Simulated delay (t=50-1550ms)
    │   └─> Show loading animation
    │
    ├─> LocationIntelligence init (t=1550-1570ms)
    │   └─> Map to soil & climate
    │
    ├─> ModelSelector init (t=1570-1590ms)
    │   ├─> ANNModel.predictAll() (evaluates 20 crops)
    │   ├─> LightGBMModel.predictAll() (evaluates 20 crops)
    │   └─> Select best model
    │
    ├─> Generate recommendations (t=1590-1650ms)
    │   ├─> IrrigationService
    │   ├─> FertilizerService
    │   └─> MarketAnalysisService × 4 (top + alternatives)
    │
    ├─> Process climate warnings (t=1650-1670ms)
    │
    ├─> Compile results (t=1670-1700ms)
    │
    └─> Display results (t=1700ms)
        └─> Set results, loading=false
```

**Total Processing Time: ~1.7 seconds**

---

This architecture ensures:
✅ Clean separation of concerns
✅ Reusable services
✅ Maintainable code structure
✅ Efficient data flow
✅ Scalable design
