import { useState } from 'react';
import { TrendingDown, TrendingUp, Info, Bell, BellDot, Target, Sparkles, Clock, Globe, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface PriceTrackingWidgetProps {
  productName?: string;
  currentPrice?: number;
  targetPrice?: number;
  historicalLow?: number;
  currency?: string;
  priceChange24h?: number;
  onBuyNow?: (productName: string, price: number) => void;
}

export function PriceTrackingWidget({ 
  productName = "Gaming Laptop RTX",
  currentPrice = 1899.99,
  targetPrice = 1699.99,
  historicalLow = 1649.99,
  currency = '$',
  priceChange24h = -5.2,
  onBuyNow
}: PriceTrackingWidgetProps) {
  const [alertActive, setAlertActive] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const priceDifference = currentPrice - targetPrice;
  const percentToTarget = ((currentPrice - historicalLow) / (currentPrice - historicalLow + priceDifference)) * 100;
  const isGoodDeal = priceDifference <= (currentPrice * 0.15); // Within 15% of target
  const savingsFromHigh = 2299.99 - currentPrice; // Mocked historical high

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full max-w-2xl bg-white rounded-xl shadow-sm border-2 p-6 ${
        isGoodDeal ? 'border-green-200 bg-gradient-to-br from-white to-green-50' : 'border-gray-200'
      }`}
    >
      {/* Header with Logo and Alert Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0057FF] to-[#0041CC] rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Price Tracking</h3>
            <p className="text-xs text-gray-500">Monitoring price changes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAlertActive(!alertActive)}
            className={`p-2 rounded-full transition-all ${
              alertActive
                ? 'bg-[#0057FF] text-white'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {alertActive ? (
              <BellDot className="w-5 h-5" />
            ) : (
              <Bell className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Details"
          >
            <Info className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Product Name and Price Change */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Product</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">{productName}</p>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            priceChange24h < 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {priceChange24h < 0 ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <TrendingUp className="w-4 h-4" />
            )}
            <span className="text-sm font-semibold">
              {Math.abs(priceChange24h).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Info Cards - 3 features */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Clock className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Alert</p>
            <p className="text-xs text-gray-600">{alertActive ? 'Active' : 'Paused'}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Globe className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Lowest</p>
            <p className="text-xs text-gray-600">{currency}{historicalLow}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Zap className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Savings</p>
            <p className="text-xs text-gray-600">{currency}{savingsFromHigh.toFixed(0)}</p>
          </div>
        </div>
      </div>

      {/* Good Deal Banner */}
      {isGoodDeal && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-900">Good time to buy!</p>
          </div>
        </motion.div>
      )}

      {/* Current Price Display */}
      <div className="bg-gradient-to-br from-[#F5F7FA] to-[#E8EDF5] rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-600 mb-1">Current Price</p>
        <motion.div
          key={currentPrice}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-baseline gap-2"
        >
          <span className="text-4xl font-bold text-[#0057FF]">
            {currency}{currentPrice.toFixed(2)}
          </span>
          {isGoodDeal && (
            <span className="text-sm font-medium text-green-600">✓ Near target</span>
          )}
        </motion.div>
        <div className="flex items-center gap-1.5 mt-2">
          <Target className="w-4 h-4 text-blue-600" />
          <p className="text-sm text-gray-700">
            {alertActive ? 'Monitoring 24/7' : 'Alerts paused'}
          </p>
        </div>
      </div>

      {/* Price Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-gray-600">Current price</span>
          <span className="text-sm font-medium text-gray-900">
            {currency}{currentPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-gray-600">Target price</span>
          <span className="text-sm font-medium text-[#0057FF]">
            {currency}{targetPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-gray-600">Historical low</span>
          <span className="text-sm font-medium text-green-600">
            {currency}{historicalLow.toFixed(2)}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Savings vs high</span>
            <span className="text-lg font-bold text-green-600">
              {currency}{savingsFromHigh.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        className="w-full px-4 py-2.5 rounded-lg bg-[#0057FF] hover:bg-[#0041CC] text-white transition-all flex items-center justify-center gap-2"
        onClick={() => onBuyNow && onBuyNow(productName, currentPrice)}
      >
        <span className="text-sm font-medium">Buy with Kueski Pay</span>
      </button>
    </motion.div>
  );
}