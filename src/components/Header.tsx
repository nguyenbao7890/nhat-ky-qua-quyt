import React from 'react';
import { auth } from '../lib/firebase';
import { LogOut, Search, Bell, User as UserIcon, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

import { SeasonInfo } from '../seasonsData';

export default function Navbar({ currentView, currentSeason, onNavigate }: { currentView: string, currentSeason?: string, onNavigate: (view: any) => void }) {
  const user = auth.currentUser;

  return (
    <nav className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-xl border-b border-brand-border/40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center gap-14">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <img src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" alt="Logo" className="w-9 h-9 drop-shadow-sm" />
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-black text-brand-text leading-none mb-0.5 italic tracking-tight">Nhật ký Quả Quýt</span>
                <div className="h-0.5 w-full bg-brand-orange/10 rounded-full" />
              </div>
            </div>
            
            <div className="hidden lg:flex gap-8">
              {[
                { name: 'Trang chủ', id: 'home' },
                { name: 'Chương Xuân', id: 'spring' },
                { name: 'Chương Hạ', id: 'summer' },
                { name: 'Chương Thu', id: 'autumn' },
                { name: 'Chương Đông', id: 'winter' },
                { name: 'Lời kết', id: 'conclusion' },
                { name: 'Về chúng tôi', id: 'about' }
              ].map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "text-[12px] font-bold uppercase tracking-[0.1em] transition-all hover:text-brand-orange relative py-1",
                    (item.id === currentView || (['spring', 'summer', 'autumn', 'winter'].includes(item.id) && currentView === 'season' && currentSeason === item.id)) 
                      ? "text-brand-orange after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-0.5 after:bg-brand-orange after:rounded-full" 
                      : "text-brand-muted/70"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center text-brand-muted/60 hover:text-brand-orange transition-colors">
                <Search className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-brand-muted/60 hover:text-brand-orange transition-colors relative">
                <Bell className="w-5 h-5 stroke-[2.5]" />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-orange rounded-full border-2 border-brand-cream" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-brand-border/60">
              <div className="w-12 h-12 rounded-full border-2 border-[#f26622]/20 overflow-hidden flex items-center justify-center p-0.5 shadow-md group cursor-pointer hover:border-[#f26622]/40 transition-all bg-white">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Quýt&backgroundColor=ffdfbf" 
                  alt="Avatar" 
                  className="w-full h-full object-contain rounded-full" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Hero({ season }: { season: SeasonInfo }) {
  return (
    <div className="relative h-[560px] rounded-[64px] overflow-hidden mb-12 shadow-[0_40px_100px_-20px_rgba(242,102,34,0.3)] transition-all duration-700">
      <AnimatePresence mode="wait">
        <motion.img 
          key={season.heroImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={season.heroImage} 
          alt={season.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 text-white">
        <motion.div
          key={season.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className={cn(
            "inline-block px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-xl transition-colors",
            season.accentColor
          )}>
            CHƯƠNG {season.name}
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1.05] mb-6 tracking-tight">
            {season.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-md font-medium leading-relaxed">
            {season.heroSubtitle}
          </p>
          
          <button className={cn(
            "text-white px-10 py-5 rounded-full font-bold shadow-2xl transition-all flex items-center gap-4 group hover:scale-105 active:scale-95",
            season.accentColor,
            season.id === 'spring' ? "shadow-emerald-500/40" : 
            season.id === 'summer' ? "shadow-[#f26622]/40" :
            season.id === 'autumn' ? "shadow-amber-600/40" : "shadow-blue-500/40"
          )}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            </div>
            <span className="text-lg">Nghe khi sẵn sàng</span>
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 flex gap-4 hidden lg:flex items-center">
         <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mr-4">Podcast • 01</div>
         {[...Array(3)].map((_, i) => (
           <div key={i} className={cn(
             "w-3 h-3 rounded-full border-2 transition-all duration-500",
             i === 0 ? "bg-white border-white scale-125" : "border-white/30"
           )} />
         ))}
      </div>
    </div>
  );
}
