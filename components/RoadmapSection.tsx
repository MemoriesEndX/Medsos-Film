'use client';

import { motion, type Variants } from 'framer-motion';
import {
  Rocket,
  Users,
  Star,
  Award,
  TrendingUp,
  Zap,
} from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function RoadmapSection() {

  const phases = [
    {
      phase: 'Phase 1',
      icon: Rocket,
      title: 'Fondasi Platform',
      description: 'Peluncuran fitur core untuk mulai',
      items: ['Upload film', 'Creator profile', 'Search', 'Like/comment', 'Discovery'],
      color: 'blue',
    },
    {
      phase: 'Phase 2',
      icon: Star,
      title: 'Sistem Kredit & Kolaborasi',
      description: 'Infrastruktur untuk profesional',
      items: ['Credit system', 'Collaboration', 'Rating', 'Portfolio'],
      color: 'purple',
    },
    {
      phase: 'Phase 3',
      icon: TrendingUp,
      title: 'AI & Monetisasi',
      description: 'Pertumbuhan & penghasilan',
      items: ['AI tagging', 'Festival mode', 'Monetization', 'Rcinemammendations'],
      color: 'emerald',
    },
  ];

  const colorClasses = {
    blue: {
      icon: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      hover: 'hover:border-blue-500/50',
      shadow: 'hover:shadow-blue-500/10',
    },
    purple: {
      icon: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      hover: 'hover:border-purple-500/50',
      shadow: 'hover:shadow-purple-500/10',
    },
    emerald: {
      icon: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      hover: 'hover:border-amber-500/50',
      shadow: 'hover:shadow-amber-500/10',
    },
  };

  return (
    <motion.section 
      id="roadmap" 
      className="py-20 bg-slate-900 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Roadmap Pengembangan
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Visi jangka panjang Cineku untuk membangun ekosistem film Indonesia yang sustainable
            dan menguntungkan semua pihak.
          </motion.p>
        </div>

        {/* Desktop Timeline */}
        <motion.div 
          className="hidden lg:block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-stretch gap-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const colors = colorClasses[phase.color as keyof typeof colorClasses];

              return (
                <motion.div key={index} className="flex-1 flex flex-col" variants={itemVariants}>
                  {/* Connector */}
                  {index < phases.length - 1 && (
                    <div className="h-1 bg-slate-700 mb-6" />
                  )}

                  {/* Card */}
                  <motion.div
                    className={`flex-1 p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 ${colors.hover} transition-all duration-300 ${colors.shadow}`}
                    whileHover={{ scale: 1.03, y: -4 }}
                  >
                    <div className={`mb-4 p-3 w-fit rounded-xl ${colors.bg}`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>

                    <div className="mb-4">
                      <p className={`text-sm font-semibold ${colors.icon} uppercase tracking-wider mb-1`}>
                        {phase.phase}
                      </p>
                      <h3 className="text-xl font-bold text-white mb-1">{phase.title}</h3>
                      <p className="text-slate-400 text-sm">{phase.description}</p>
                    </div>

                    <div className="border-t border-slate-700/30 pt-4">
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-400 flex items-center gap-2"
                          >
                            <span className={`w-2 h-2 rounded-full ${colors.bg} border ${colors.border}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mobile Layout */}
        <motion.div 
          className="lg:hidden space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const colors = colorClasses[phase.color as keyof typeof colorClasses];

            return (
              <motion.div key={index} className="relative" variants={itemVariants}>
                {/* Connector line */}
                {index < phases.length - 1 && (
                  <div className="absolute left-6 top-20 w-1 h-12 bg-slate-700" />
                )}

                {/* Card */}
                <motion.div
                  className={`p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 ${colors.hover} transition-all duration-300 ${colors.shadow}`}
                  whileHover={{ scale: 1.03, y: -4 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${colors.bg} flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${colors.icon} uppercase tracking-wider mb-1`}>
                        {phase.phase}
                      </p>
                      <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mb-4">{phase.description}</p>

                  <div className="border-t border-slate-700/30 pt-4">
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-400 flex items-center gap-2"
                        >
                          <span className={`w-2 h-2 rounded-full ${colors.bg} border ${colors.border}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
