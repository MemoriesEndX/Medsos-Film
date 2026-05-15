'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

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

export default function ProblemSection() {

  const problems = [
    {
      title: 'Film Indie Sulit Ditemukan',
      description: 'Banyak karya film berkualitas dari kreator lokal tidak mendapat eksposur yang layak karena tidak ada platform yang fokus pada film Indonesia.',
    },
    {
      title: 'Belum Ada Portfolio Profesional',
      description: 'Kreator film belum punya tempat untuk membangun portfolio profesional seperti filmmaker lain di platform internasional.',
    },
    {
      title: 'Sulit Mencari Kolaborator',
      description: 'Filmmaker kesulitan menemukan kru, editor, DOP, dan talent untuk project karena tidak ada cinemasystem yang mendukung.',
    },
    {
      title: 'Karya Lokal Kurang Exposure',
      description: 'Karya film Indonesia kurang mendapat rcinemagnition dan opportunity untuk berkembang di kancah lokal maupun internasional.',
    },
    {
      title: 'Credit Tidak Terdokumentasi',
      description: 'Data credit film sering tidak terdokumentasi dengan baik, membuat sejarah karya dan kontribusi kreator tidak tercatat.',
    },
  ];

  return (
    <motion.section 
      className="py-20 bg-slate-900 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Kenapa Cineku Dibutuhkan?
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Industri film Indonesia membutuhkan platform khusus yang memahami kebutuhan kreator lokal.
          </motion.p>
        </div>

        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {problems.map((problem, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="grid md:grid-cols-2 gap-8 items-center p-8 bg-gradient-to-r from-slate-800/40 to-transparent rounded-2xl border border-slate-700/30 hover:border-red-500/20 transition-colors">
                {/* Problem side */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{problem.description}</p>
                    </div>
                  </div>
                </div>

                {/* Solution indicator */}
                <div className="flex items-center justify-end md:justify-start gap-2">
                  <CheckCircle2 className="w-6 h-6 text-amber-400" />
                  <span className="text-amber-400 font-semibold">Cineku Solusinya</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
