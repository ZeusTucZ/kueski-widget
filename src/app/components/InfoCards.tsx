import { Clock, Globe, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function InfoCards() {
  const features = [
    {
      icon: Clock,
      title: 'Aprobación rápida',
      description: 'Menos de 5 minutos',
      color: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-[#0057FF]',
    },
    {
      icon: Globe,
      title: 'Proceso 100% online',
      description: 'Sin papeleo ni filas',
      color: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
    },
    {
      icon: Zap,
      title: 'Disponible 24/7',
      description: 'Solicita cuando quieras',
      color: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${feature.color} rounded-xl p-5 border ${feature.borderColor} hover:shadow-md transition-shadow`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center flex-shrink-0`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
