'use client';

import { motion } from 'framer-motion';
import {
  User,
  Upload,
  Tag,
  Eye,
  Heart,
  Handshake,
  ArrowRight,
} from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function HowItWorks() {

  const steps = [
    {
      icon: User,
      title: 'Buat Profil',
      description: 'Kreator membuat profil profesional dengan informasi lengkap.',
    },
    {
      icon: Upload,
      title: 'Upload Film',
      description: 'Upload film atau embed video dari platform lain.',
    },
    {
      icon: Tag,
      title: 'Tambah Metadata',
      description: 'Tambahkan genre, sinopsis, credit, dan tag dengan bantuan AI.',
    },
    {
      icon: Eye,
      title: 'Muncul di Discovery',
      description: 'Film Anda muncul di feed discovery untuk ditemukan penonton.',
    },
    {
      icon: Heart,
      title: 'Dapatkan Engagement',
      description: 'Penonton memberi like, komentar, dan share karya Anda.',
    },
    {
      icon: Handshake,
      title: 'Bangun Kolaborasi',
      description: 'Temukan kolaborator dan peluang untuk project berikutnya.',
    },
  ];

  return (
    <motion.section 
      id="how" 
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
            Cara Kerja Cineku
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Proses yang sederhana untuk mulai showcase karya dan membangun portfolio Anda.
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
          <div className="space-y-8">
            {/* First row (3 items) */}
            <div className="grid grid-cols-3 gap-6">
              {steps.slice(0, 3).map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div key={index} className="relative" variants={itemVariants}>
                    <motion.div className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-all text-center" whileHover={{ scale: 1.03, y: -4 }}>
                      <div className="mb-4 p-3 w-fit mx-auto rounded-full bg-purple-500/10">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm">{step.description}</p>

                      {/* Arrow to next */}
                      {index < 2 && (
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                          <ArrowRight className="w-6 h-6 text-slate-600" />
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Connecting lines between rows */}
            <div className="h-8 flex items-center justify-center">
              <div className="w-1 h-full bg-gradient-to-b from-slate-600 to-transparent" />
            </div>

            {/* Scinemand row (3 items) */}
            <div className="grid grid-cols-3 gap-6">
              {steps.slice(3, 6).map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div key={index + 3} className="relative" variants={itemVariants}>
                    <motion.div className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all text-center" whileHover={{ scale: 1.03, y: -4 }}>
                      <div className="mb-4 p-3 w-fit mx-auto rounded-full bg-amber-500/10">
                        <Icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm">{step.description}</p>

                      {/* Arrow to next */}
                      {index < 2 && (
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                          <ArrowRight className="w-6 h-6 text-slate-600" />
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Mobile Timeline */}
        <motion.div 
          className="lg:hidden space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={index} className="relative" variants={itemVariants}>
                <div className="flex gap-6">
                  {/* Timeline dot and line */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-amber-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-1 h-16 bg-gradient-to-b from-slate-600 to-transparent" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-6">
                    <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
