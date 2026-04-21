import { useState } from 'react';
import { Info, Bell, BellDot, Calendar, CheckCircle2, CreditCard, Shield, Zap, Clock, Globe } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { motion } from 'motion/react';

interface KueskiPayWidgetProps {
  productPrice?: number;
  currency?: string;
}

export function KueskiPayWidget({ productPrice: initialPrice, currency = '$' }: KueskiPayWidgetProps) {
  const [amount, setAmount] = useState(initialPrice || 15000);
  const [weeks, setWeeks] = useState(12);
  const [selectedInstallments, setSelectedInstallments] = useState(4);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [priceAlertActive, setPriceAlertActive] = useState(false);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  // Calculate payment details
  const interestRate = 0.15; // 15% interés
  const totalInterest = amount * interestRate;
  const totalCost = amount + totalInterest;
  const biweeklyPayments = Math.ceil(weeks / 2);
  const biweeklyPayment = totalCost / biweeklyPayments;

  // Calculate next payment date
  const getNextPaymentDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14); // 14 days from now
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const installmentOptions = [2, 4, 6];

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
            <h3 className="font-semibold text-gray-900">Kueski Pay</h3>
            <p className="text-xs text-gray-500">Buy now, pay later</p>
          </div>
        </div>
        <button
          onClick={() => setShowInfoModal(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="How it works"
        >
          <Info className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Info Cards - Ventajas clave */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Clock className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">Aprobación</p>
            <p className="text-xs text-gray-600">&lt;5 min</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Globe className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">100% online</p>
            <p className="text-xs text-gray-600">Sin papeleo</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <Zap className="w-6 h-6 text-[#0057FF] mb-1" />
            <p className="text-xs font-medium text-gray-900">24/7</p>
            <p className="text-xs text-gray-600">Disponible</p>
          </div>
        </div>
      </div>

      {/* Sliders para ajustar monto y plazo */}
      <div className="mb-6 space-y-4">
        {/* Slider de Monto */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Monto del préstamo</label>
            <motion.span
              key={amount}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-[#0057FF]"
            >
              {currency}{amount.toLocaleString()}
            </motion.span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={(value) => setAmount(value[0])}
            min={1000}
            max={50000}
            step={500}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{currency}1,000</span>
            <span>{currency}50,000</span>
          </div>
        </div>

        {/* Slider de Plazo */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Plazo (semanas)</label>
            <motion.span
              key={weeks}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-[#0057FF]"
            >
              {weeks} semanas
            </motion.span>
          </div>
          <Slider
            value={[weeks]}
            onValueChange={(value) => setWeeks(value[0])}
            min={4}
            max={52}
            step={2}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>4 semanas</span>
            <span>52 semanas</span>
          </div>
        </div>
      </div>

      {/* Main Payment Breakdown */}
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
          <span className="text-base text-gray-600">({biweeklyPayments} pagos)</span>
        </motion.div>
        <div className="flex items-center gap-1.5 mt-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <p className="text-sm text-gray-700">No credit card required</p>
        </div>
      </div>

      {/* Total Cost Transparency */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-gray-600">Monto solicitado</span>
          <span className="text-sm font-medium text-gray-900">
            {currency}{amount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-gray-600">Intereses (15%)</span>
          <span className="text-sm font-medium text-gray-900">
            {currency}{totalInterest.toFixed(2)}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total a pagar</span>
            <span className="text-lg font-bold text-[#0057FF]">
              {currency}{totalCost.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Smart Payment Reminder */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Próximo pago</p>
          <p className="text-xs text-gray-600">{getNextPaymentDate()}</p>
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex gap-2">
        {/* Price Alert */}
        <button
          onClick={() => setPriceAlertActive(!priceAlertActive)}
          className={`flex-1 px-3 py-2.5 rounded-lg border transition-all flex items-center justify-center gap-2 ${
            priceAlertActive
              ? 'bg-[#0057FF] border-[#0057FF] text-white'
              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
          }`}
        >
          {priceAlertActive ? (
            <BellDot className="w-4 h-4" />
          ) : (
            <Bell className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {priceAlertActive ? 'Tracking' : 'Track price'}
          </span>
        </button>

        {/* Calendar Sync */}
        <button
          onClick={() => setShowCalendarOptions(!showCalendarOptions)}
          className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Add to calendar</span>
        </button>
      </div>

      {/* Calendar Options Dropdown */}
      {showCalendarOptions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden"
        >
          <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            Google Calendar
          </button>
          <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 border-t border-gray-100">
            <Calendar className="w-4 h-4 text-gray-600" />
            Outlook Calendar
          </button>
        </motion.div>
      )}

      {/* Info Modal */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              How Kueski Pay works
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-[#0057FF]">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Fill application</h4>
                <p className="text-sm text-gray-600">
                  Complete a quick application with basic information. No credit card needed.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-[#0057FF]">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Get approval</h4>
                <p className="text-sm text-gray-600">
                  Receive instant approval in less than 5 minutes. Most applications are approved immediately.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-[#0057FF]">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Enjoy your purchase</h4>
                <p className="text-sm text-gray-600">
                  Complete your purchase and pay over time with flexible biweekly payments.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Quick approval</h4>
              </div>
              <p className="text-sm text-gray-700">
                ✓ Approval in less than 5 minutes<br />
                ✓ No impact on credit score<br />
                ✓ Transparent pricing with no hidden fees
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowInfoModal(false)}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
            <Button className="flex-1 bg-[#0057FF] hover:bg-[#0041CC]">
              Apply now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}