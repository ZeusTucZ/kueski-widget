import { useState } from 'react';
import { Home, Info, ShoppingBag, Eye, ChevronRight, TrendingDown, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Product {
  id: string;
  name: string;
  type: 'purchased' | 'tracked';
  price: number;
  additionalInfo?: string;
  badge?: string;
  priceChange?: number;
}

interface MenuWidgetProps {
  onProductSelect?: (productId: string, type: 'purchased' | 'tracked') => void;
}

export function MenuWidget({ onProductSelect }: MenuWidgetProps) {
  const [showDetails, setShowDetails] = useState(false);

  const products: Product[] = [
    // Active Purchases
    {
      id: 'p1',
      name: 'Premium Headphones',
      type: 'purchased',
      price: 162.50,
      additionalInfo: '3 payments left',
      badge: 'Active',
    },
    {
      id: 'p2',
      name: 'Smart Watch Pro',
      type: 'purchased',
      price: 106.25,
      additionalInfo: '5 payments left',
      badge: 'Active',
    },
    {
      id: 'p3',
      name: 'Ultra HD Monitor',
      type: 'purchased',
      price: 260.42,
      additionalInfo: '8 payments left',
      badge: 'Active',
    },

    // Price Tracking
    {
      id: 't1',
      name: 'Gaming Laptop RTX',
      type: 'tracked',
      price: 1899.99,
      priceChange: -5.2,
      badge: 'Good Deal',
    },
    {
      id: 't2',
      name: 'Mechanical Keyboard',
      type: 'tracked',
      price: 189.99,
      priceChange: 2.1,
    },
    {
      id: 't3',
      name: 'Office Chair Pro',
      type: 'tracked',
      price: 449.99,
      priceChange: -8.5,
      badge: 'Good Deal',
    },
  ];

  const purchasedProducts = products.filter(p => p.type === 'purchased');
  const trackedProducts = products.filter(p => p.type === 'tracked');

  const handleProductClick = (product: Product) => {
    if (onProductSelect) {
      onProductSelect(product.id, product.type);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      {/* Header with Logo */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0057FF] to-[#0041CC] rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Dashboard Menu</h3>
            <p className="text-xs text-gray-500">Manage your products</p>
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Details"
        >
          <Info className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Info Cards - 3 features */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <ShoppingBag className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Active</p>
            <p className="text-xs text-gray-600">{purchasedProducts.length} purchases</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Eye className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Tracking</p>
            <p className="text-xs text-gray-600">{trackedProducts.length} products</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <CheckCircle2 className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Total</p>
            <p className="text-xs text-gray-600">{products.length} items</p>
          </div>
        </div>
      </div>

      {/* Section 1: Active Purchases */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingBag className="w-5 h-5 text-[#0057FF]" />
          <h4 className="font-semibold text-gray-900">Active Purchases</h4>
        </div>
        
        <div className="space-y-2">
          {purchasedProducts.map((product) => (
            <motion.button
              key={product.id}
              onClick={() => handleProductClick(product)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    {product.badge && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{product.additionalInfo}</p>
                  <p className="text-sm font-bold text-[#0057FF] mt-1">
                    ${product.price.toFixed(2)} biweekly
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0057FF] transition-colors" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Section 2: Price Tracking */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold text-gray-900">Price Tracking</h4>
        </div>
        
        <div className="space-y-2">
          {trackedProducts.map((product) => (
            <motion.button
              key={product.id}
              onClick={() => handleProductClick(product)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full border rounded-lg p-3 hover:shadow-md transition-all text-left group ${
                product.badge === 'Good Deal'
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
                  : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    {product.badge && (
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        product.badge === 'Good Deal'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.priceChange !== undefined && (
                      <div className={`flex items-center gap-1 ${
                        product.priceChange < 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.priceChange < 0 ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        <span className="text-xs font-semibold">
                          {Math.abs(product.priceChange).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 transition-colors ${
                  product.badge === 'Good Deal'
                    ? 'text-gray-400 group-hover:text-green-600'
                    : 'text-gray-400 group-hover:text-purple-600'
                }`} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-gray-200">
        <button className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
          <span className="text-sm font-medium">View All Products</span>
        </button>
      </div>
    </motion.div>
  );
}
