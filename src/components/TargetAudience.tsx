'use client';

import { motion } from 'framer-motion';
import { Heart, ChefHat, Rocket, Sparkles } from 'lucide-react';

const audiences = [
  {
    title: "For Food Lovers",
    description: "Tired of generic delivery? Rediscover the soul of your city through home-cooked masterpieces. Access exclusive, chef-made meals that aren't available anywhere else.",
    icon: Heart,
    color: "bg-primary",
    textColor: "text-white",
    delay: 0.1
  },
  {
    title: "For Passionate Chefs",
    description: "Your kitchen, your rules, your empire. We provide the platform; you provide the flavor. Turn your hidden talent into a prestigious culinary brand with zero overhead.",
    icon: ChefHat,
    color: "bg-secondary",
    textColor: "text-white",
    delay: 0.2
  },
  {
    title: "For Early Adopters",
    description: "The city is changing, and you're leading the charge. Get VIP access to secret menus, founding-member perks, and a seat at the table of the next food revolution.",
    icon: Rocket,
    color: "bg-white",
    textColor: "text-secondary",
    delay: 0.3,
    border: "border-2 border-gray-100"
  }
];

const TargetAudience = () => {
  return (
    <section className="py-32 md:py-48 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2.5 mb-10 bg-white rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 text-primary font-black text-xs tracking-[0.3em] uppercase"
          >
            <Sparkles size={16} />
            <span>Join the Movement</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black text-secondary mb-8 tracking-tight leading-[0.9]"
          >
            Who Is <br />
            <span className="text-primary italic">TyebLiya</span> For?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: audience.delay, duration: 0.8 }}
              whileHover={{ y: -15 }}
              className={`relative p-10 md:p-12 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 ${audience.color} ${audience.textColor} ${audience.border || ''}`}
            >
              {/* Icon Container */}
              <div className={`w-20 h-20 rounded-3xl mb-10 flex items-center justify-center ${audience.color === 'bg-white' ? 'bg-primary/10 text-primary' : 'bg-white/20 text-white'}`}>
                <audience.icon size={40} strokeWidth={2.5} />
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight leading-tight">
                {audience.title}
              </h3>
              
              <p className={`text-lg md:text-xl font-medium leading-relaxed ${audience.color === 'bg-white' ? 'text-secondary/60' : 'text-white/80'}`}>
                {audience.description}
              </p>

              {/* Decorative Element */}
              <div className={`absolute bottom-8 right-10 opacity-10 font-black text-8xl italic pointer-events-none`}>
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA / Strategy Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <p className="text-secondary/40 font-black text-sm uppercase tracking-[0.4em]">
            Bridging tradition and technology in your city
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudience;