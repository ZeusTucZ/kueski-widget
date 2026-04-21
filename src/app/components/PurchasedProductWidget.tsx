import { useState } from 'react';
import { CreditCard, Info, Calendar, CheckCircle2, Clock, Globe, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface PurchasedProductWidgetProps {
  productName?: string;
  productPrice?: number;
  currency?: string;
  paymentsRemaining?: number;
  totalPayments?: number;
}

export function PurchasedProductWidget({ 
  productName = "Premium Headphones",
  productPrice = 1299.99,
  currency = '$',
  paymentsRemaining = 3,
  totalPayments = 8
}: PurchasedProductWidgetProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Calculate payment details
  const interestRate = 0.15;
  const totalWithInterest = productPrice * (1 + interestRate);
  const biweeklyPayment = totalWithInterest / totalPayments;
  const remainingBalance = biweeklyPayment * paymentsRemaining;
  const paidSoFar = totalWithInterest - remainingBalance;
  const progressPercentage = ((totalPayments - paymentsRemaining) / totalPayments) * 100;

  // Next payment date (14 days from now)
  const nextPaymentDate = new Date();
  nextPaymentDate.setDate(nextPaymentDate.getDate() + 14);
  const formattedDate = nextPaymentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

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
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Active Purchase</h3>
            <p className="text-xs text-gray-500">Payment tracking</p>
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

      {/* Product Name */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Product</p>
        <p className="text-lg font-bold text-gray-900">{productName}</p>
      </div>

      {/* Info Cards - 3 features */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Clock className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Next payment</p>
            <p className="text-xs text-gray-600">{formattedDate}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Globe className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Remaining</p>
            <p className="text-xs text-gray-600">{paymentsRemaining} pagos</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Zap className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Progress</p>
            <p className="text-xs text-gray-600">{progressPercentage.toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Payment Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Payment Progress</span>
          <span className="text-sm text-gray-600">
            {totalPayments - paymentsRemaining} of {totalPayments} completed
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#0057FF] to-[#0041CC]"
          />
        </div>
      </div>

      {/* Main Payment Display */}
      <div className="bg-gradient-to-br from-[#F5F7FA] to-[#E8EDF5] rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-600 mb-1">Pago quincenal</p>
        <motion.div
          key={biweeklyPayment}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-baseline gap-2"
        >
          <span className="text-4xl font-bold text-[#0057FF]">
            {currency}{biweeklyPayment.toFixed(2)}
          </span>
          <span className="text-base text-gray-600">({totalPayments} pagos)</span>
        </motion.div>
        <div className="flex items-center gap-1.5 mt-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <p className="text-sm text-gray-700">On track with payments</p>
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-gray-600">Original price</span>
          <span className="text-sm font-medium text-gray-900">
            {currency}{productPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-gray-600">Paid so far</span>
          <span className="text-sm font-medium text-green-600">
            {currency}{paidSoFar.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-gray-600">Remaining balance</span>
          <span className="text-sm font-medium text-gray-900">
            {currency}{remainingBalance.toFixed(2)}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total cost</span>
            <span className="text-lg font-bold text-[#0057FF]">
              {currency}{totalWithInterest.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-medium">Add to calendar</span>
      </button>
    </motion.div>
  );
}
