import { useState } from 'react';
import { ShoppingCart, Search, Menu, User, Heart, X, ArrowLeft } from 'lucide-react';
import { PurchasedProductWidget } from './PurchasedProductWidget';
import { PriceTrackingWidget } from './PriceTrackingWidget';
import { MenuWidget } from './MenuWidget';
import { CheckoutWidget } from './CheckoutWidget';
import { toast } from 'sonner';

type WidgetView = 'menu' | 'purchased' | 'priceTracking' | 'checkout';

interface WebSimulatorProps {
  onClose?: () => void;
}

export function WebSimulator({ onClose }: WebSimulatorProps) {
  const [extensionOpen, setExtensionOpen] = useState(false);
  const [currentView, setCurrentView] = useState<WidgetView>('menu');
  const [selectedProductData, setSelectedProductData] = useState<{
    name: string;
    price: number;
    paymentsRemaining?: number;
    totalPayments?: number;
  } | null>(null);

  const handleProductSelect = (productId: string, type: 'purchased' | 'tracked') => {
    if (type === 'purchased') {
      setSelectedProductData({
        name: 'Premium Headphones',
        price: 1299.99,
        paymentsRemaining: 3,
        totalPayments: 8
      });
      setCurrentView('purchased');
    } else {
      setSelectedProductData({
        name: 'Gaming Laptop RTX',
        price: 1899.99
      });
      setCurrentView('priceTracking');
    }
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
    setSelectedProductData(null);
  };

  const handleBuyNow = (productName: string, price: number) => {
    setSelectedProductData({ name: productName, price });
    setCurrentView('checkout');
  };

  const renderExtensionContent = () => {
    switch (currentView) {
      case 'menu':
        return (
          <div className="p-4">
            <MenuWidget onProductSelect={handleProductSelect} />
          </div>
        );

      case 'purchased':
        return (
          <div className="p-4">
            <button
              onClick={handleBackToMenu}
              className="flex items-center gap-2 mb-4 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al menú
            </button>
            <PurchasedProductWidget
              productName={selectedProductData?.name || 'Premium Headphones'}
              productPrice={selectedProductData?.price || 1299.99}
              paymentsRemaining={selectedProductData?.paymentsRemaining || 3}
              totalPayments={selectedProductData?.totalPayments || 8}
            />
          </div>
        );

      case 'priceTracking':
        return (
          <div className="p-4">
            <button
              onClick={handleBackToMenu}
              className="flex items-center gap-2 mb-4 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al menú
            </button>
            <PriceTrackingWidget
              productName={selectedProductData?.name || 'Gaming Laptop RTX'}
              currentPrice={selectedProductData?.price || 1899.99}
              targetPrice={1699.99}
              historicalLow={1649.99}
              priceChange24h={-5.2}
              onBuyNow={handleBuyNow}
            />
          </div>
        );

      case 'checkout':
        return (
          <div className="p-4">
            <CheckoutWidget
              productName={selectedProductData?.name || 'Product'}
              productPrice={selectedProductData?.price || 1299.99}
              onBack={handleBackToMenu}
              onConfirmPurchase={(amount, weeks) => {
                toast.success(`Purchase confirmed! $${amount} over ${weeks} weeks`);
                handleBackToMenu();
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Simulated E-commerce Website */}
      <div className="bg-white">
        {/* Website Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-8">
                <h1 className="text-2xl font-bold text-gray-900">TechShop</h1>
                <nav className="hidden md:flex items-center gap-6">
                  <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Electronics</a>
                  <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Computers</a>
                  <a href="#" className="text-sm text-gray-700 hover:text-gray-900">Deals</a>
                </nav>
              </div>

              {/* Right side with Extension Button */}
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search products..."
                    className="bg-transparent outline-none text-sm w-64"
                  />
                </div>

                {/* Icons */}
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <User className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Kueski Pay Extension Button */}
                <button
                  onClick={() => {
                    setExtensionOpen(!extensionOpen);
                    if (!extensionOpen) {
                      setCurrentView('menu');
                    }
                  }}
                  className="relative ml-2 p-2 hover:bg-gray-100 rounded-lg group"
                  title="Kueski Pay Extension"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#0057FF] to-[#0041CC] rounded-lg flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="white"/>
                      <path d="M20 8H4V6H20V8Z" fill="#0057FF"/>
                      <path d="M14 12H6V14H14V12Z" fill="#0057FF"/>
                      <path d="M18 16H6V18H18V16Z" fill="#0057FF"/>
                    </svg>
                  </div>
                  {extensionOpen && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>

                {/* Close Simulator Button */}
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Product Page Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="bg-gray-50 rounded-lg p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="w-64 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 mx-auto"></div>
                <p className="text-sm text-gray-500">Premium Wireless Headphones</p>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Premium Wireless Headphones
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
                <span className="text-sm text-gray-600">(1,234 reviews)</span>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                $1,299.99
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                  <p className="text-gray-700">Active Noise Cancellation</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                  <p className="text-gray-700">30-hour battery life</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                  <p className="text-gray-700">Premium sound quality</p>
                </div>
              </div>
              <button className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Additional Product Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">30-Day Returns</h3>
              <p className="text-sm text-gray-600">Money-back guarantee</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">2-Year Warranty</h3>
              <p className="text-sm text-gray-600">Full manufacturer warranty</p>
            </div>
          </div>
        </main>
      </div>

      {/* Kueski Pay Extension Popup */}
      {extensionOpen && (
        <div className="fixed top-16 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="w-[420px] bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
            {/* Extension Header */}
            <div className="bg-gradient-to-r from-[#0057FF] to-[#0041CC] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="#0057FF"/>
                    <path d="M20 8H4V6H20V8Z" fill="white"/>
                    <path d="M14 12H6V14H14V12Z" fill="white"/>
                    <path d="M18 16H6V18H18V16Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Kueski Pay</h3>
                  <p className="text-blue-100 text-xs">Chrome Extension</p>
                </div>
              </div>
              <button
                onClick={() => setExtensionOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Extension Content */}
            <div className="bg-white max-h-[600px] overflow-y-auto">
              {renderExtensionContent()}
            </div>

            {/* Extension Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
              <p className="text-xs text-center text-gray-500">
                Kueski Pay Extension v1.0.0
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
