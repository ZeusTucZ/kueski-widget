import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { PurchasedProductWidget } from './PurchasedProductWidget';
import { PriceTrackingWidget } from './PriceTrackingWidget';

interface ProductData {
  id: string;
  type: 'purchased' | 'tracked';
  name: string;
  price: number;
  paymentsRemaining?: number;
  totalPayments?: number;
  targetPrice?: number;
  historicalLow?: number;
  priceChange24h?: number;
}

interface ProductDetailPageProps {
  product: ProductData;
  onBack: () => void;
}

// Product database
const productDatabase: { [key: string]: ProductData } = {
  // Purchased Products
  'p1': {
    id: 'p1',
    type: 'purchased',
    name: 'Premium Headphones',
    price: 1299.99,
    paymentsRemaining: 3,
    totalPayments: 8,
  },
  'p2': {
    id: 'p2',
    type: 'purchased',
    name: 'Smart Watch Pro',
    price: 799.99,
    paymentsRemaining: 5,
    totalPayments: 8,
  },
  'p3': {
    id: 'p3',
    type: 'purchased',
    name: 'Ultra HD Monitor',
    price: 2499.99,
    paymentsRemaining: 8,
    totalPayments: 12,
  },
  
  // Tracked Products
  't1': {
    id: 't1',
    type: 'tracked',
    name: 'Gaming Laptop RTX',
    price: 1899.99,
    targetPrice: 1699.99,
    historicalLow: 1649.99,
    priceChange24h: -5.2,
  },
  't2': {
    id: 't2',
    type: 'tracked',
    name: 'Mechanical Keyboard',
    price: 189.99,
    targetPrice: 149.99,
    historicalLow: 139.99,
    priceChange24h: 2.1,
  },
  't3': {
    id: 't3',
    type: 'tracked',
    name: 'Office Chair Pro',
    price: 449.99,
    targetPrice: 399.99,
    historicalLow: 389.99,
    priceChange24h: -8.5,
  },
};

export function ProductDetailPage({ product, onBack }: ProductDetailPageProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </Button>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <p className="text-lg text-gray-600">
          {product.type === 'purchased' 
            ? 'Active purchase details and payment tracking' 
            : 'Price monitoring and deal alerts'}
        </p>
      </div>

      {/* Product Image Placeholder */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 flex items-center justify-center mb-8">
        <span className="text-6xl">📦</span>
      </div>

      {/* Widget Display */}
      <div className="flex justify-center">
        {product.type === 'purchased' ? (
          <PurchasedProductWidget
            productName={product.name}
            productPrice={product.price}
            paymentsRemaining={product.paymentsRemaining || 3}
            totalPayments={product.totalPayments || 8}
          />
        ) : (
          <PriceTrackingWidget
            productName={product.name}
            currentPrice={product.price}
            targetPrice={product.targetPrice || product.price * 0.9}
            historicalLow={product.historicalLow || product.price * 0.85}
            priceChange24h={product.priceChange24h || -5.0}
          />
        )}
      </div>

      {/* Additional Information */}
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {product.type === 'purchased' ? 'Payment Information' : 'About Price Tracking'}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {product.type === 'purchased' 
              ? 'Track your biweekly payments, view your payment progress, and never miss a due date. All payments are automatically monitored and you can add reminders to your calendar.'
              : 'We monitor prices 24/7 and notify you when the price drops to your target. Get insights on historical price trends and make informed purchasing decisions.'}
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper function to get product data by ID
export function getProductById(productId: string): ProductData | null {
  return productDatabase[productId] || null;
}
