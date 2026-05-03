import React, { useState } from 'react';
import { Brain, Heart, Wind, Coffee } from 'lucide-react';
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
    <div className="glass-card p-10 md:p-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-10">
         <img src="https://em-content.zobj.net/source/apple/391/leaf-fluttering-in-wind_1f343.png" alt="Leaf" className="w-8 h-8" />
         <h3 className="text-2xl font-display font-bold">Nghe có hướng dẫn</h3>
      </div>
      
      <div className="space-y-16 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-1 before:bg-brand-border/30">
        {steps.map((step) => (
          <div key={step.id} className="relative pl-20">
            <div className={cn("absolute left-0 top-0 w-16 h-16 rounded-full text-white flex items-center justify-center font-black text-xl shadow-xl z-10 transition-all hover:scale-110", season.accentColor)}>
              {step.id}
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-cream border border-brand-border/40 flex items-center justify-center shadow-sm">
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{step.title}</h4>
                  <p className="text-brand-muted font-medium text-sm max-w-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
              
              {step.tag && (
                <div className="bg-brand-cream/80 border border-brand-border/30 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 w-fit shadow-sm">
                  <Coffee className={cn("w-4 h-4",
                    season.id === 'summer' ? 'text-brand-orange' : 
                    season.id === 'spring' ? 'text-emerald-500' :
                    season.id === 'autumn' ? 'text-amber-600' : 'text-blue-500'
                  )} /> {step.tag}
                </div>
              )}

              {step.options && (
                <div className="flex gap-3">
                  {step.options.map(opt => (
                    <button key={opt.label} className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 shadow-sm ${opt.color}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {step.substeps && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {step.substeps.map(sub => (
                  <div key={sub.title} className="bg-white border border-brand-border/40 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl transition-transform group-hover:scale-125 duration-500">{sub.icon}</span>
                      <h5 className="font-bold text-base">{sub.title}</h5>
                    </div>
                    <p className="text-sm leading-relaxed text-brand-muted font-medium">{sub.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
