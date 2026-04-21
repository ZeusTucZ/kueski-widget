import { useState } from 'react';
import { Slider } from './ui/slider';
import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

export function LoanCalculator() {
  const [amount, setAmount] = useState(15000);
  const [weeks, setWeeks] = useState(12);

  // Cálculos financieros
  const interestRate = 0.15; // 15% de interés
  const totalInterest = amount * interestRate;
  const totalPayable = amount + totalInterest;
  const biweeklyPayments = Math.ceil(weeks / 2);
  const biweeklyPayment = totalPayable / biweeklyPayments;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Calculadora de Préstamos
        </h3>
        <p className="text-sm text-gray-600">
          Ajusta el monto y plazo para calcular tus pagos
        </p>
      </div>

      {/* Slider de Monto */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-gray-700">Monto del préstamo</label>
          <motion.span
            key={amount}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-[#0057FF]"
          >
            ${amount.toLocaleString()}
          </motion.span>
        </div>
        <Slider
          value={[amount]}
          onValueChange={(value) => setAmount(value[0])}
          min={1000}
          max={50000}
          step={500}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$1,000</span>
          <span>$50,000</span>
        </div>
      </div>

      {/* Slider de Plazo */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-gray-700">Plazo</label>
          <motion.span
            key={weeks}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-[#0057FF]"
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
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>4 semanas</span>
          <span>52 semanas</span>
        </div>
      </div>

      {/* Resultados del Cálculo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          key={biweeklyPayment}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-[#0057FF]" />
            <p className="text-sm text-gray-700 font-medium">Pago quincenal</p>
          </div>
          <p className="text-2xl font-bold text-[#0057FF]">
            ${biweeklyPayment.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {biweeklyPayments} pagos
          </p>
        </motion.div>

        <motion.div
          key={totalPayable}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-gray-700 font-medium">Total a pagar</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            ${totalPayable.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Incluye intereses
          </p>
        </motion.div>

        <motion.div
          key={totalInterest}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-gray-700 font-medium">Intereses</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">
            ${totalInterest.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {(interestRate * 100).toFixed(0)}% del monto
          </p>
        </motion.div>
      </div>

      {/* Desglose detallado */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Desglose del préstamo</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Monto solicitado</span>
            <span className="font-medium text-gray-900">${amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Intereses ({(interestRate * 100).toFixed(0)}%)</span>
            <span className="font-medium text-gray-900">${totalInterest.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Plazo</span>
            <span className="font-medium text-gray-900">{weeks} semanas ({biweeklyPayments} pagos quincenales)</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total a pagar</span>
              <span className="text-[#0057FF]">${totalPayable.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
