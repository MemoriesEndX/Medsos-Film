'use client';

import { motion, type Variants } from 'framer-motion';
import { Clapperboard, Film, Camera, Sparkles } from 'lucide-react';

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

const floatingVariants: Variants = {
  animate: (index: number) => ({
    y: [0, -12 + index * 3, 0],
    rotate: [0, 2, 0],
    transition: {
      duration: 5 + index * 0.3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }),
};

export default function HeroSection() {

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
      
      {/* Spotlight effects */}
      <div className="absolute top-20 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance"
              variants={itemVariants}
            >
              Cineku — Ruang Karya Film Indonesia
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-amber-400 font-semibold"
              variants={itemVariants}
            >
              Platform digital untuk showcase, discovery, portfolio, dan kolaborasi
              filmmaker Indonesia.
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              Cineku membantu filmmaker indie, studio kecil, aktor, editor, DOP, dan penonton
              film lokal untuk saling terhubung dalam satu ekosistem kreatif yang membangun
              karya film Indonesia lebih baik.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={itemVariants}>
              <motion.button 
                className="px-8 py-4 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-colors w-full sm:w-auto"
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                Jelajahi Film
              </motion.button>
              <motion.button 
                className="px-8 py-4 border border-amber-500 text-amber-400 font-bold rounded-lg hover:bg-amber-500/10 transition-colors w-full sm:w-auto"
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                Gabung sebagai Kreator
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right - Floating elements */}
          <div className="relative h-96 hidden lg:block">
            {/* Clapperboard */}
            <motion.div 
              className="absolute top-10 right-10 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-colors"
              custom={0}
              animate="animate"
              variants={floatingVariants}
            >
              <Clapperboard className="w-16 h-16 text-amber-400" />
            </motion.div>

            {/* Film Reel */}
            <motion.div 
              className="absolute top-40 left-0 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-colors"
              custom={1}
              animate="animate"
              variants={floatingVariants}
            >
              <Film className="w-16 h-16 text-blue-400" />
            </motion.div>

            {/* Camera */}
            <motion.div 
              className="absolute bottom-20 right-0 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-colors"
              custom={2}
              animate="animate"
              variants={floatingVariants}
            >
              <Camera className="w-16 h-16 text-red-400" />
            </motion.div>

            {/* Sparkles */}
            <motion.div 
              className="absolute bottom-10 left-20 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-sm"
              custom={3}
              animate="animate"
              variants={floatingVariants}
            >
              <Sparkles className="w-12 h-12 text-purple-400" />
            </motion.div>

            {/* Center glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-amber-500/20 to-blue-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-slate-500 uppercase tracking-widest">Scroll untuk melanjutkan</p>
          <div className="w-6 h-10 border border-slate-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-slate-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
