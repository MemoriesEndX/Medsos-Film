'use client';

import { motion } from 'framer-motion';
import {
  User,
  Search,
  Users,
  MessageSquare,
  Zap,
  Heart,
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

export default function FeatureSection() {

  const features = [
    {
      icon: User,
      title: 'Creator Profile',
      description: 'Profil profesional seperti LinkedIn + IMDb untuk membangun reputation dan portfolio karir kreatif Anda.',
    },
    {
      icon: Search,
      title: 'Film Discovery',
      description: 'Temukan film berdasarkan trending, genre, dan release terbaru dari kreator Indonesia berbakat.',
    },
    {
      icon: Users,
      title: 'Credit System',
      description: 'Setiap peran produksi terdokumentasi rapi, membangun rcinemard profesional untuk setiap kreator.',
    },
    {
      icon: MessageSquare,
      title: 'Collaboration System',
      description: 'Cari kru, publisher, dan kolaborator untuk project berikutnya dengan mudah dan transparan.',
    },
    {
      icon: Zap,
      title: 'AI Tag Generator',
      description: 'Bantu determine genre, tags, dan keywords dari sinopsis otomatis menggunakan AI technology.',
    },
    {
      icon: Heart,
      title: 'Social Interaction',
      description: 'Like, comment, share, dan views—bangun community dan engagement di sekitar karya Anda.',
    },
  ];

  return (
    <motion.section 
      id="features" 
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
            Fitur Utama Cineku
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Fitur-fitur yang dirancang untuk memberdayakan kreator film Indonesia dan
            membangun ekosistem yang kuat.
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className="mb-4 p-3 w-fit rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
