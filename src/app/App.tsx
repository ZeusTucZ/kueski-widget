import { useState } from 'react';
import { PurchasedProductWidget } from './components/PurchasedProductWidget';
import { PriceTrackingWidget } from './components/PriceTrackingWidget';
import { MenuWidget } from './components/MenuWidget';
import { ProductDetailPage, getProductById } from './components/ProductDetailPage';
import { CheckoutWidget } from './components/CheckoutWidget';
import { WebSimulator } from './components/WebSimulator';
import { CreditCard, Monitor } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; type: 'purchased' | 'tracked' } | null>(null);
  const [showCheckout, setShowCheckout] = useState<{ productName: string; price: number } | null>(null);
  const [showWebSimulator, setShowWebSimulator] = useState(false);

  const handleProductSelect = (productId: string, type: 'purchased' | 'tracked') => {
    setSelectedProduct({ id: productId, type });
  };

  const handleBackToMenu = () => {
    setSelectedProduct(null);
  };

  const handleBuyNow = (productName: string, price: number) => {
    setShowCheckout({ productName, price });
  };

  const handleBackFromCheckout = () => {
    setShowCheckout(null);
  };

  const handleConfirmPurchase = (installments: number) => {
    toast.success(`¡Compra confirmada! Pagarás en ${installments} cuotas quincenales.`);
    setTimeout(() => {
      setShowCheckout(null);
    }, 2000);
  };

  // If web simulator is active
  if (showWebSimulator) {
    return (
      <>
        <Toaster position="top-right" />
        <WebSimulator onClose={() => setShowWebSimulator(false)} />
      </>
    );
  }

  // If checkout is active, show the checkout widget
  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Toaster position="top-right" />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <CheckoutWidget
            productName={showCheckout.productName}
            productPrice={showCheckout.price}
            onBack={handleBackFromCheckout}
            onConfirmPurchase={handleConfirmPurchase}
          />
        </div>
      </div>
    );
  }

  // If a product is selected, show the detail page
  if (selectedProduct) {
    const product = getProductById(selectedProduct.id);
    if (product) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Toaster position="top-right" />
          <div className="max-w-6xl mx-auto px-4 py-12">
            <ProductDetailPage product={product} onBack={handleBackToMenu} />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      
      {/* Demo Container */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0057FF] to-[#0041CC] rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Kueski Pay Widget</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Opciones de pago flexibles para tus compras en línea
          </p>
          
          {/* Web Simulator Button */}
          <button
            onClick={() => setShowWebSimulator(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0057FF] to-[#0041CC] hover:from-[#0041CC] hover:to-[#002A99] text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            <Monitor className="w-5 h-5" />
            Entrar a Simulador
          </button>
        </div>

        <div className="space-y-12">
          {/* New widgets section */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Widget Collection
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Purchased Product Tracking
                </h3>
                <p className="text-sm text-gray-600">Active payment tracking</p>
              </div>
              <PurchasedProductWidget 
                productName="Premium Headphones"
                productPrice={1299.99}
                paymentsRemaining={3}
                totalPayments={8}
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Price Tracking Widget
                </h3>
                <p className="text-sm text-gray-600">Monitor and buy when ready</p>
              </div>
              <PriceTrackingWidget 
                productName="Gaming Laptop RTX"
                currentPrice={1899.99}
                targetPrice={1699.99}
                historicalLow={1649.99}
                priceChange24h={-5.2}
                onBuyNow={handleBuyNow}
              />
            </div>
          </div>

          {/* Menu Widget - Full width */}
          <div className="mt-6">
            <div className="bg-white rounded-xl p-6 shadow-md mx-auto max-w-2xl">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Dashboard Menu Widget
                </h3>
                <p className="text-sm text-gray-600">Navigate between products</p>
              </div>
              <MenuWidget onProductSelect={handleProductSelect} />
            </div>
          </div>

          {/* Checkout Widget Demo */}
          <div className="mt-6">
            <div className="bg-white rounded-xl p-6 shadow-md mx-auto max-w-2xl">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Checkout Widget
                </h3>
                <p className="text-sm text-gray-600">Complete purchase flow</p>
              </div>
              <CheckoutWidget 
                productName="Premium Wireless Headphones"
                productPrice={1299.99}
                onConfirmPurchase={(installments) => {
                  toast.success(`Demo: Purchase confirmed with ${installments} installments!`);
                }}
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              About This Widget
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The Kueski Pay Widget is designed to be embedded directly into e-commerce 
              product pages, providing customers with transparent Buy Now, Pay Later options. 
              The widget features dynamic payment calculations, installment selection, 
              price tracking, calendar integration, and clear cost breakdowns—all designed 
              to build trust and reduce checkout friction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}