import { useState, useEffect } from 'react';
import { Bell, TrendingUp, Calendar, Plus, X, Play, Pause, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Reminder {
  id: string;
  title: string;
  date: string;
}

interface PriceAlert {
  id: string;
  product: string;
  targetPrice: number;
  direction: 'above' | 'below';
  currentPrice: number;
  isActive: boolean;
  triggered: boolean;
}

export function ControlPanel() {
  const [activeTab, setActiveTab] = useState<'reminders' | 'alerts'>('reminders');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  
  // Form states
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [alertProduct, setAlertProduct] = useState('');
  const [alertPrice, setAlertPrice] = useState('');
  const [alertDirection, setAlertDirection] = useState<'above' | 'below'>('below');

  // Load from localStorage
  useEffect(() => {
    const savedReminders = localStorage.getItem('kueski-reminders');
    const savedAlerts = localStorage.getItem('kueski-alerts');
    
    if (savedReminders) setReminders(JSON.parse(savedReminders));
    if (savedAlerts) setPriceAlerts(JSON.parse(savedAlerts));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('kueski-reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('kueski-alerts', JSON.stringify(priceAlerts));
  }, [priceAlerts]);

  // Simulación de fluctuación de precios
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceAlerts(prev => prev.map(alert => {
        if (!alert.isActive || alert.triggered) return alert;
        
        // Simular cambio de precio ±5%
        const change = (Math.random() - 0.5) * 0.1;
        const newPrice = alert.currentPrice * (1 + change);
        
        // Verificar si se cumple la condición
        const shouldTrigger = 
          (alert.direction === 'below' && newPrice <= alert.targetPrice) ||
          (alert.direction === 'above' && newPrice >= alert.targetPrice);
        
        if (shouldTrigger && !alert.triggered) {
          toast.success(`¡Alerta activada!`, {
            description: `${alert.product} está ${alert.direction === 'below' ? 'por debajo' : 'por encima'} de $${alert.targetPrice}`,
          });
          return { ...alert, currentPrice: newPrice, triggered: true };
        }
        
        return { ...alert, currentPrice: newPrice };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addReminder = () => {
    if (!reminderTitle || !reminderDate) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: reminderTitle,
      date: reminderDate,
    };

    setReminders([...reminders, newReminder]);
    setReminderTitle('');
    setReminderDate('');
    toast.success('Recordatorio agregado');
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast.success('Recordatorio eliminado');
  };

  const addPriceAlert = () => {
    if (!alertProduct || !alertPrice) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      product: alertProduct,
      targetPrice: parseFloat(alertPrice),
      direction: alertDirection,
      currentPrice: parseFloat(alertPrice) * (alertDirection === 'below' ? 1.2 : 0.8),
      isActive: true,
      triggered: false,
    };

    setPriceAlerts([...priceAlerts, newAlert]);
    setAlertProduct('');
    setAlertPrice('');
    toast.success('Alerta de precio creada');
  };

  const toggleAlert = (id: string) => {
    setPriceAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setPriceAlerts(priceAlerts.filter(a => a.id !== id));
    toast.success('Alerta eliminada');
  };

  const getNextPaymentDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 15);
    return `${date.getDate() - new Date().getDate()} días`;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Panel de Control</h2>
          <p className="text-gray-600">Gestiona tus recordatorios y alertas</p>
        </div>
        <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
          Volver a Calculadora
        </Button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 mb-1">Recordatorios activos</p>
              <p className="text-4xl font-bold text-[#0057FF]">{reminders.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-[#0057FF]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 mb-1">Alertas de precio</p>
              <p className="text-4xl font-bold text-[#0057FF]">{priceAlerts.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#0057FF]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 mb-1">Próximo pago</p>
              <p className="text-4xl font-bold text-[#0057FF]">{getNextPaymentDate()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#0057FF]" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('reminders')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'reminders'
              ? 'bg-[#0057FF] text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
          }`}
        >
          <Bell className="w-4 h-4" />
          Recordatorios
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'alerts'
              ? 'bg-[#0057FF] text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Alertas de Precio
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'reminders' ? (
          <motion.div
            key="reminders"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Create Reminder Form */}
            <div className="bg-[#0057FF] text-white rounded-xl p-5 mb-6">
              <h3 className="font-bold text-lg mb-2">Crear Recordatorio</h3>
              <p className="text-sm text-blue-100 mb-4">
                Nunca olvides un pago o fecha importante
              </p>
              
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-sm text-blue-100 mb-1 block">
                    Título del recordatorio
                  </label>
                  <Input
                    value={reminderTitle}
                    onChange={(e) => setReminderTitle(e.target.value)}
                    placeholder="Ej: Pago quincenal Kueski"
                    className="bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-sm text-blue-100 mb-1 block">Fecha</label>
                  <Input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="bg-white text-gray-900"
                  />
                </div>
              </div>
              
              <Button
                onClick={addReminder}
                className="w-full bg-white text-[#0057FF] hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Recordatorio
              </Button>
            </div>

            {/* Reminders List */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Tus Recordatorios</h3>
              
              {reminders.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No tienes recordatorios activos</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <motion.div
                      key={reminder.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bell className="w-5 h-5 text-[#0057FF]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{reminder.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(reminder.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Create Alert Form */}
            <div className="bg-[#0057FF] text-white rounded-xl p-5 mb-6">
              <h3 className="font-bold text-lg mb-2">Crear Alerta de Precio</h3>
              <p className="text-sm text-blue-100 mb-4">
                Recibe notificaciones cuando el precio llegue a tu objetivo
              </p>
              
              <div className="grid md:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="text-sm text-blue-100 mb-1 block">
                    Producto/Artículo
                  </label>
                  <Input
                    value={alertProduct}
                    onChange={(e) => setAlertProduct(e.target.value)}
                    placeholder="Ej: iPhone 15"
                    className="bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-sm text-blue-100 mb-1 block">
                    Precio objetivo (MXN)
                  </label>
                  <Input
                    type="number"
                    value={alertPrice}
                    onChange={(e) => setAlertPrice(e.target.value)}
                    placeholder="15000"
                    className="bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-sm text-blue-100 mb-1 block">Dirección</label>
                  <Select value={alertDirection} onValueChange={(value: 'above' | 'below') => setAlertDirection(value)}>
                    <SelectTrigger className="bg-white text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below">Por debajo de</SelectItem>
                      <SelectItem value="above">Por encima de</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button
                onClick={addPriceAlert}
                className="w-full bg-white text-[#0057FF] hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Alerta
              </Button>
            </div>

            {/* Alerts List */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Tus Alertas de Precio</h3>
              
              {priceAlerts.length === 0 ? (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No tienes alertas de precio configuradas</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {priceAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        alert.triggered
                          ? 'bg-blue-50 border-blue-400'
                          : alert.isActive
                          ? 'bg-gray-50 border-gray-200 hover:border-blue-300'
                          : 'bg-gray-100 border-gray-300 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            alert.triggered ? 'bg-blue-200' : 'bg-blue-100'
                          }`}>
                            {alert.direction === 'below' ? (
                              <ArrowDown className={`w-5 h-5 ${alert.triggered ? 'text-blue-700' : 'text-[#0057FF]'}`} />
                            ) : (
                              <ArrowUp className={`w-5 h-5 ${alert.triggered ? 'text-blue-700' : 'text-[#0057FF]'}`} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{alert.product}</p>
                            <p className="text-sm text-gray-600">
                              Objetivo: ${alert.targetPrice.toLocaleString()} ({alert.direction === 'below' ? 'por debajo' : 'por encima'})
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleAlert(alert.id)}
                            className={`p-2 rounded-full transition-colors ${
                              alert.isActive
                                ? 'bg-blue-100 text-[#0057FF] hover:bg-blue-200'
                                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                            }`}
                          >
                            {alert.isActive ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteAlert(alert.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Precio actual</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${alert.currentPrice.toFixed(2)}
                          </p>
                        </div>
                        {alert.triggered && (
                          <div className="bg-[#0057FF] text-white px-3 py-1 rounded-full text-xs font-medium">
                            ¡Objetivo alcanzado!
                          </div>
                        )}
                        {!alert.triggered && alert.isActive && (
                          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                            Monitoreando...
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}