'use client';

import { motion, type Variants } from 'framer-motion';
import { Film, Users, Zap, Search } from 'lucide-react';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function AboutCineku() {

  const pillars = [
    {
      icon: Film,
      title: 'Showcase Karya Film',
      description: 'Unggah film Anda dengan metadata lengkap dan jangkau penonton yang tepat.',
    },
    {
      icon: Search,
      title: 'Discovery Film Lokal',
      description: 'Temukan film indie berkualitas dari kreator Indonesia yang berbakat.',
    },
    {
      icon: Users,
      title: 'Portfolio Filmmaker',
      description: 'Bangun profil profesional seperti LinkedIn + IMDb untuk karir kreatif Anda.',
    },
    {
      icon: Zap,
      title: 'Kolaborasi Kreator',
      description: 'Cari kru, publisher, dan kolaborator untuk project berikutnya dengan mudah.',
    },
  ];

  return (
    <motion.section 
      id="about" 
      className="py-20 bg-slate-950 relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Apa Itu Cineku?
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Platform digital yang dirancang untuk menjadi rumah bagi karya film Indonesia.
            Di sini, kreator dapat mengunggah karya, membangun portfolio profesional,
            mendapatkan exposure, menerima feedback, dan menemukan peluang kolaborasi.
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                className="group p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className="mb-4 p-3 w-fit rounded-xl bg-slate-800/60 group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
