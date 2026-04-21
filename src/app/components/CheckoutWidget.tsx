import { useState } from 'react';
import { CreditCard, Info, Shield, Zap, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface CheckoutWidgetProps {
  productName?: string;
  productPrice?: number;
  currency?: string;
  onBack?: () => void;
  onConfirmPurchase?: (amount: number, weeks: number) => void;
}

export function CheckoutWidget({ 
  productName = "Premium Wireless Headphones",
  productPrice = 1299.99,
  currency = '$',
  onBack,
  onConfirmPurchase
}: CheckoutWidgetProps) {
  const [amount, setAmount] = useState(productPrice);
  const [weeks, setWeeks] = useState(12);
  const [showDetails, setShowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate payment details based on amount and weeks
  const calculatePaymentDetails = () => {
    // Interest rate based on duration (longer = higher rate)
    const baseRate = 0.10; // 10% base
    const additionalRate = (weeks - 4) / 480 * 0.05; // Up to 5% more for longer terms
    const interestRate = baseRate + additionalRate;
    
    const commission = amount * interestRate;
    const totalCost = amount + commission;
    const biweeklyPayments = Math.ceil(weeks / 2);
    const biweeklyPayment = totalCost / biweeklyPayments;

    return {
      commission,
      totalCost,
      biweeklyPayment,
      biweeklyPayments,
      interestRate: interestRate * 100,
    };
  };

  const paymentDetails = calculatePaymentDetails();

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (onConfirmPurchase) {
        onConfirmPurchase(amount, weeks);
      }
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Back Button */}
      {onBack && (
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Product
          </Button>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Complete Your Purchase
        </h1>
        <p className="text-lg text-gray-600">
          Choose your payment plan with Kueski Pay
        </p>
      </div>

      {/* Main Widget */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0057FF] to-[#0041CC] rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Kueski Pay Checkout</h3>
              <p className="text-xs text-gray-500">Flexible payment options</p>
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
              <Shield className="w-6 h-6 text-[#0057FF] mb-1" />
              <p className="text-xs font-medium text-gray-900">Secure</p>
              <p className="text-xs text-gray-600">256-bit SSL</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
            <div className="flex flex-col items-center text-center">
              <Zap className="w-6 h-6 text-[#0057FF] mb-1" />
              <p className="text-xs font-medium text-gray-900">Instant</p>
              <p className="text-xs text-gray-600">Approval</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
            <div className="flex flex-col items-center text-center">
              <Clock className="w-6 h-6 text-[#0057FF] mb-1" />
              <p className="text-xs font-medium text-gray-900">Flexible</p>
              <p className="text-xs text-gray-600">Terms</p>
            </div>
          </div>
        </div>

        {/* Sliders Section */}
        <div className="space-y-6 mb-6">
          {/* Weeks Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700">
                Plazo (semanas)
              </label>
              <div className="text-right">
                <span className="text-lg font-bold text-[#0057FF]">{weeks} semanas</span>
                <p className="text-xs text-gray-600">({paymentDetails.biweeklyPayments} pagos quincenales)</p>
              </div>
            </div>
            <Slider
              value={[weeks]}
              onValueChange={(value) => setWeeks(value[0])}
              min={4}
              max={52}
              step={2}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>4 semanas</span>
              <span>52 semanas</span>
            </div>
          </div>
        </div>

        {/* Payment Preview with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${amount}-${weeks}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Main Payment Display */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-[#E8EDF5] rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">Pago quincenal</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#0057FF]">
                  {currency}{paymentDetails.biweeklyPayment.toFixed(2)}
                </span>
                <span className="text-base text-gray-600">({paymentDetails.biweeklyPayments} pagos)</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-gray-700">
                  First payment in 14 days
                </p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-gray-600">Monto solicitado</span>
                <span className="text-sm font-medium text-gray-900">
                  {currency}{amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-600">Comisión</span>
                  <span className="text-xs text-gray-500">
                    ({paymentDetails.interestRate.toFixed(2)}%)
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {currency}{paymentDetails.commission.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-gray-600">Plazo de pagos</span>
                <span className="text-sm font-medium text-gray-900">
                  {paymentDetails.biweeklyPayments} pagos quincenales
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Costo total</span>
                  <span className="text-lg font-bold text-[#0057FF]">
                    {currency}{paymentDetails.totalCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Benefits List */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            ✓ Beneficios incluidos
          </p>
          <ul className="space-y-1.5 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              Sin cargos ocultos - Total transparencia en costos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              Aprobación instantánea - Respuesta en segundos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              Recordatorios automáticos - Nunca pierdas un pago
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              Protección de compra - Garantía en todos los productos
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full px-4 py-3 rounded-lg bg-[#0057FF] hover:bg-[#0041CC] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Confirmar compra</span>
              </>
            )}
          </button>
          {onBack && (
            <button
              onClick={onBack}
              className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-gray-300 transition-all"
            >
              Cancelar
            </button>
          )}
        </div>
      </motion.div>

      {/* Additional Information */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 max-w-2xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            ¿Cómo funciona Kueski Pay?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="w-12 h-12 bg-[#0057FF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <p className="font-semibold text-gray-900 mb-1">Elige tu plan</p>
              <p className="text-sm text-gray-600">
                Ajusta el monto y plazo que mejor se ajuste a tu presupuesto
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#0057FF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <p className="font-semibold text-gray-900 mb-1">Aprobación instantánea</p>
              <p className="text-sm text-gray-600">
                Recibe una respuesta en segundos sin complicaciones
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#0057FF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <p className="font-semibold text-gray-900 mb-1">Paga y disfruta</p>
              <p className="text-sm text-gray-600">
                Realiza pagos quincenales automáticos sin preocupaciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}