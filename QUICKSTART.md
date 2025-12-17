# Quick Start Guide - Mkulima Crop Advisory System

## 🚀 Running the Application

### Step 1: Install Dependencies
```bash
cd Mkulima
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: `http://localhost:5173`

## 📋 How to Use

1. **Enter your details:**
   - Farmer name
   - Select your state
   - Choose farm size (Small or Medium)

2. **Click "Get Crop Recommendations"**

3. **View your personalized recommendations:**
   - Top recommended crop with suitability score
   - Market profitability analysis
   - Detailed irrigation schedule
   - Fertilizer recommendations
   - Alternative crop options
   - Climate risk warnings

## 🎯 What the System Does Automatically

- ✅ Maps your location to soil type and climate zone
- ✅ Analyzes 20+ crops for suitability
- ✅ Runs dual AI models (ANN & LightGBM)
- ✅ Selects best AI model for your region
- ✅ Calculates irrigation needs based on rainfall
- ✅ Determines fertilizer requirements from soil profile
- ✅ Evaluates market profitability and risk
- ✅ Generates growth-stage specific irrigation alerts

## 📊 Supported Regions

**10 Indian States** with 30+ agro-ecological zones:
- Andhra Pradesh, Karnataka, Maharashtra, Tamil Nadu
- Punjab, Uttar Pradesh, Gujarat, Rajasthan
- Madhya Pradesh, West Bengal

## 🌾 Crop Categories (20 crops)

- Cereals: Rice, Wheat, Maize, Millets
- Cash Crops: Cotton, Sugarcane
- Oilseeds: Groundnut, Soybean, Mustard, Sunflower
- Pulses: Chickpea, Pigeon Pea
- Vegetables: Tomato, Onion, Potato
- Fruits: Banana, Mango
- Spices: Turmeric, Chili

## 💡 Key Features

### AI Model Selection
The system automatically chooses between:
- **ANN Model**: Best for complex soil/climate patterns
- **LightGBM Model**: Best for high-risk areas and extreme conditions

### Comprehensive Recommendations Include:
1. **Irrigation Plan**
   - Frequency and interval
   - Critical growth stages
   - Recommended irrigation method
   - Efficiency ratings

2. **Fertilizer Plan**
   - NPK requirements
   - Application rates and timing
   - Cost efficiency rating
   - Organic alternatives

3. **Market Analysis**
   - Profitability rating
   - Risk assessment
   - Expected revenue per hectare
   - Market access evaluation

## 🖨️ Generating Reports

Click the "Print Recommendations" button to generate a printer-friendly report of all recommendations.

## 🔧 Troubleshooting

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build for production:**
```bash
npm run build
npm run preview
```

## 📱 Mobile Friendly

The application is fully responsive and works on all devices.

---

**Happy Farming! 🌾** For best results, ensure you select the correct state and zone for accurate recommendations.
