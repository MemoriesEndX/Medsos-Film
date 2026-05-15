'use client';

import { motion } from 'framer-motion';
import {
  Clapperboard,
  Users,
  Edit3,
  Music,
  Camera,
  Building2,
  Eye,
  Award,
} from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function TargetUsers() {

  const users = [
    { icon: Clapperboard, label: 'Filmmaker Indie' },
    { icon: Users, label: 'Sutradara' },
    { icon: Edit3, label: 'Editor' },
    { icon: Users, label: 'Aktor' },
    { icon: Camera, label: 'DOP' },
    { icon: Building2, label: 'Studio Kecil' },
    { icon: Eye, label: 'Penonton Film' },
    { icon: Award, label: 'Juri Festival' },
  ];

  return (
    <motion.section 
      id="target" 
      className="py-20 bg-slate-950 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Dibuat untuk Ekosistem Film Indonesia
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Cineku dirancang untuk semua pihak yang terlibat dalam industri film lokal.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {users.map((user, index) => {
            const Icon = user.icon;
            return (
              <motion.div
                key={index}
                className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-default hover:shadow-lg hover:shadow-amber-500/20"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <Icon className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-slate-200">{user.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional note */}
        <motion.div 
          className="mt-16 text-center p-8 bg-slate-800/30 rounded-2xl border border-slate-700/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-slate-400 text-lg">
            <span className="text-amber-400 font-semibold">Dan komunitas film</span> yang ingin
            mendukung dan berkembang bersama ekosistem film Indonesia yang lebih kuat.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
