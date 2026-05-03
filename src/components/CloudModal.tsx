import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface CloudModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function CloudModal({ isOpen, onClose, title, content }: CloudModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-brand-text/30 backdrop-blur-md" onClick={onClose} />
          
          <motion.div 
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="relative w-full max-w-xl"
          >
            {/* Cloud SVG Background */}
            <div className="absolute inset-[-40px] text-white fill-current drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)]">
               <svg viewBox="0 0 512 512" className="w-full h-full">
                  <path d="M448 320c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32z" fill="#f8fafc" opacity="0.1" />
                  <path d="M406.2 193.3c-1.3-48.4-41-87-89.8-87-34.9 0-65.4 20.1-80.4 49.6-11.8-6.1-25.2-9.6-39.4-9.6-43.1 0-78.7 32.2-84 74.1-39.7 7.7-69.6 42.6-69.6 84.4 0 47.4 38.4 85.8 85.8 85.8h213.3c54.3 0 98.3-44 98.3-98.3 0-51.5-39.7-93.7-90.2-99z" fill="white" />
               </svg>
            </div>

            {/* Content Container */}
            <div className="relative z-10 p-12 md:p-20 text-center space-y-6">
               <button 
                 onClick={onClose}
                 className="absolute top-10 right-10 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all shadow-sm"
               >
                 <X className="w-5 h-5" />
               </button>
               
               <div className="text-5xl mb-6 animate-pulse">☁️</div>
               <h3 className="text-2xl font-display font-black text-brand-orange uppercase tracking-widest">{title}</h3>
               <p className="text-xl text-brand-text/80 font-medium leading-[1.6] italic">
                 "{content}"
               </p>
               <div className="pt-6">
                 <button 
                    onClick={onClose}
                    className="bg-brand-orange text-white px-12 py-4 rounded-full font-black text-sm shadow-xl shadow-brand-orange/20 hover:scale-110 active:scale-95 transition-all"
                 >
                    Tớ hiểu rồi 🍊
                 </button>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
