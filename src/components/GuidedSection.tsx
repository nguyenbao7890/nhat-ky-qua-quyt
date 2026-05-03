import React from 'react';
import { Brain, Heart, Wind, ChevronRight, PenTool, Share2, Coffee } from 'lucide-react';
import { motion } from 'motion/react';
import { SeasonInfo } from '../seasonsData';
import { cn } from '../lib/utils';

export default function GuidedSection({ season }: { season: SeasonInfo }) {
  const steps = [
    {
      id: 1,
      title: 'Nhận diện',
      desc: 'Điều đang xảy ra với em là sự kiện... hay là cách em đang diễn giải nó?',
      icon: <Brain className="w-6 h-6 text-brand-muted" />,
      tag: 'Dành 30 giây để nghĩ',
    },
    {
      id: 2,
      title: 'Gọi tên cảm xúc',
      desc: 'Hôm nay, em đang cảm thấy điều gì nhiều nhất?',
      icon: <Heart className="w-6 h-6 text-brand-muted" />,
      options: [
        { label: 'Buồn', color: 'bg-blue-100 text-blue-600 border-blue-200' },
        { label: 'Giận', color: 'bg-red-100 text-red-600 border-red-200' },
        { label: 'Lo âu', color: 'bg-amber-100 text-amber-600 border-amber-200' },
      ]
    },
    {
      id: 3,
      title: '3 bước hồi phục',
      desc: 'Thử ngay 3 bước nhỏ để lấy lại sự bình an',
      icon: <Wind className="w-6 h-6 text-brand-muted" />,
      substeps: [
        { title: 'Dừng lại', detail: 'Dừng phản ứng ngay khi cảm xúc bùng lên.', icon: '☁️' },
        { title: 'Gọi tên', detail: 'Nói với mình: "Mình đang buồn", "Mình đang rất mệt".', icon: '❤️' },
        { title: 'Hành động nhỏ', detail: 'Uống nước, đi bộ, viết ra hoặc nhắn cho người tin cậy.', icon: '☕' },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
      <div className="lg:col-span-2 glass-card p-8">
        <div className="flex items-center gap-2 mb-8">
           <img src="https://em-content.zobj.net/source/apple/391/leaf-fluttering-in-wind_1f343.png" alt="Leaf" className="w-6 h-6" />
           <h3 className="text-xl font-display font-bold">Nghe có hướng dẫn</h3>
        </div>
        
        <div className="space-y-12 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-brand-border">
          {steps.map((step) => (
            <div key={step.id} className="relative pl-16">
              <div className={cn("absolute left-0 top-0 w-12 h-12 rounded-full text-white flex items-center justify-center font-bold shadow-lg z-10 transition-colors", season.accentColor)}>
                {step.id}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream border border-brand-border flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{step.title}</h4>
                    <p className="text-brand-muted text-sm max-w-md">{step.desc}</p>
                  </div>
                </div>
                
                {step.tag && (
                  <div className="bg-brand-cream border border-brand-border px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 w-fit">
                    <Coffee className={cn("w-3.5 h-3.5",
                      season.id === 'summer' ? 'text-brand-orange' : 
                      season.id === 'spring' ? 'text-emerald-500' :
                      season.id === 'autumn' ? 'text-amber-600' : 'text-blue-500'
                    )} /> {step.tag}
                  </div>
                )}

                {step.options && (
                  <div className="flex gap-2">
                    {step.options.map(opt => (
                      <button key={opt.label} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 ${opt.color}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {step.substeps && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {step.substeps.map(sub => (
                    <div key={sub.title} className="bg-brand-cream/50 border border-brand-border rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{sub.icon}</span>
                        <h5 className="font-bold text-sm">{sub.title}</h5>
                      </div>
                      <p className="text-[11px] leading-relaxed text-brand-muted">{sub.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Quote Card */}
        <div className={cn("glass-card p-6 border-l-4 relative overflow-hidden", 
          season.id === 'summer' ? 'border-l-[#f26622]' : 
          season.id === 'spring' ? 'border-l-emerald-500' :
          season.id === 'autumn' ? 'border-l-amber-600' : 'border-l-blue-500')}>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <img src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" alt="Orange" className="w-32 h-32" />
          </div>
          <span className={cn("text-4xl font-serif absolute top-2 left-2 italic opacity-20", 
            season.id === 'summer' ? 'text-[#f26622]' : 
            season.id === 'spring' ? 'text-emerald-500' :
            season.id === 'autumn' ? 'text-amber-600' : 'text-blue-500')}>“</span>
          <p className="relative z-10 text-brand-text font-medium leading-relaxed italic pt-4">
            {season.quote}
          </p>
          <div className="mt-4 flex items-center gap-2">
             <div className={cn("w-1.5 h-1.5 rounded-full", season.accentColor)} />
             <span className={cn("text-xs font-bold uppercase", 
               season.id === 'summer' ? 'text-[#f26622]' : 
               season.id === 'spring' ? 'text-emerald-500' :
               season.id === 'autumn' ? 'text-amber-600' : 'text-blue-500')}>Câu nói hôm nay</span>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-3">
          <h3 className="text-lg font-display font-bold flex items-center gap-2 mb-4">
             <img src="https://em-content.zobj.net/source/apple/391/palm-tree_1f334.png" alt="Icon" className="w-5 h-5" />
             Thực hành ngay
          </h3>
          {season.actions.map((action, i) => (
            <button key={i} className="w-full flex items-center justify-between p-4 bg-white border border-brand-border rounded-2xl hover:bg-brand-cream transition-all group">
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg bg-brand-cream flex items-center justify-center transition-all group-hover:text-white", 
                  season.id === 'summer' ? 'group-hover:bg-[#f26622] text-[#f26622]' : 
                  season.id === 'spring' ? 'group-hover:bg-emerald-500 text-emerald-500' :
                  season.id === 'autumn' ? 'group-hover:bg-amber-600 text-amber-600' : 'group-hover:bg-blue-500 text-blue-500')}>
                  <span className="text-sm">{action.icon}</span>
                </div>
                <span className="text-sm font-semibold">{action.text}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-brand-muted" />
            </button>
          ))}
        </div>

        <button className={cn("w-full text-white p-6 rounded-3xl shadow-xl flex items-center justify-between group hover:scale-[1.02] transition-all", 
          season.accentColor,
          season.id === 'summer' ? 'shadow-[#f26622]/20' : 
          season.id === 'spring' ? 'shadow-emerald-500/20' :
          season.id === 'autumn' ? 'shadow-amber-600/20' : 'shadow-blue-500/20')}>
           <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Viết vào Nhật ký</p>
              <p className="text-xl font-display font-bold">Quả Quýt</p>
           </div>
           <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <PenTool className="w-6 h-6" />
           </div>
        </button>
      </div>
    </div>
  );
}
