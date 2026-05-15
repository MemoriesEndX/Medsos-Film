'use client';

import { motion } from 'framer-motion';
import { Film, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function CTASection() {

  return (
    <motion.section 
      className="py-20 bg-slate-950 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance"
            variants={itemVariants}
          >
            Bangun Ekosistem Film Indonesia Bersama Cineku
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Mulai dari showcase karya, membangun portfolio profesional, hingga menemukan
            kolaborator untuk project berikutnya. Bergabunglah dengan komunitas filmmaker Indonesia
            yang terus berkembang di Cineku.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch"
            variants={itemVariants}
          >
            <motion.button 
              className="group px-8 py-4 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto hover:shadow-lg hover:shadow-amber-500/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Film className="w-5 h-5" />
              Mulai sebagai Kreator
            </motion.button>

            <motion.button 
              className="group px-8 py-4 border-2 border-slate-700 text-slate-300 font-bold rounded-lg hover:border-amber-500 hover:text-amber-400 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto hover:shadow-lg hover:shadow-amber-500/10"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5" />
              Jelajahi Platform
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="mt-16 pt-12 border-t border-slate-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-slate-500 text-sm mb-6">Didukung oleh filmmaker Indonesia berbakat</p>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">100+</p>
              <p className="text-xs text-slate-500">Filmmaker Terdaftar</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">500+</p>
              <p className="text-xs text-slate-500">Film Dipublikasikan</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">10K+</p>
              <p className="text-xs text-slate-500">Viewers Aktif</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
