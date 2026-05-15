'use client';

import { motion } from 'framer-motion';
import {
  Target,
  Briefcase,
  Compass,
  Database,
  Zap,
  Coins,
} from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function AdvantageSection() {

  const advantages = [
    {
      icon: Target,
      title: 'Fokus pada Kreator Lokal',
      description: 'Platform khusus yang memahami dan mendukung kebutuhan unik industri film Indonesia.',
    },
    {
      icon: Briefcase,
      title: 'Portfolio Profesional',
      description: 'Bangun reputation dan showcase semua proyek Anda dengan kredibilitas internasional.',
    },
    {
      icon: Compass,
      title: 'Discovery yang Kuat',
      description: 'Algoritma yang intelligent untuk menghubungkan film dengan audience yang tepat.',
    },
    {
      icon: Database,
      title: 'Credit Film Lebih Rapi',
      description: 'Sistem dokumentasi yang terstruktur untuk setiap peran dalam production.',
    },
    {
      icon: Zap,
      title: 'Membantu Kolaborasi Produksi',
      description: 'Ekosistem yang memudahkan filmmaker untuk menemukan kru dan publisher untuk project.',
    },
    {
      icon: Coins,
      title: 'Siap untuk Monetisasi',
      description: 'Foundasi yang kuat untuk pengembangan ke festival mode dan peluang penghasilan.',
    },
  ];

  return (
    <motion.section 
      className="py-20 bg-slate-950 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Bukan Sekadar Tempat Upload Film
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Cineku adalah ekosistem lengkap yang dirancang untuk pertumbuhan jangka panjang
            kreator dan industri film Indonesia.
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={index}
                className="group p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className="mb-4 p-3 w-fit rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{advantage.title}</h3>
                <p className="text-slate-400 leading-relaxed">{advantage.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
