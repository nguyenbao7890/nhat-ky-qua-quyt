import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Quote } from 'lucide-react';
import { SeasonInfo } from '../seasonsData';
import { cn } from '../lib/utils';

export default function StorySection({ season }: { season: SeasonInfo }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className={cn("p-8 md:p-12 border-b border-brand-border/40", season.id === 'spring' ? 'bg-emerald-50/30' : season.id === 'summer' ? 'bg-orange-50/30' : season.id === 'autumn' ? 'bg-amber-50/30' : 'bg-blue-50/30')}>
        <div className="flex items-center gap-3 mb-6">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", season.accentColor)}>
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted">Truyện ngắn bạn đọc</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-4">
          {season.storyTitle}
        </h2>
        
        {season.storyInspiration && (
          <p className="text-xs font-bold text-brand-muted italic mb-8">
            (Lấy cảm hứng từ {season.storyInspiration})
          </p>
        )}

        <div className="prose prose-orange max-w-none mb-12">
          <div className="text-lg text-brand-text leading-[1.8] font-serif space-y-6">
            {season.storyContent.split('\n\n').map((para, i) => (
              <p key={i} className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-brand-orange">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Conclusion Box */}
        <div className="mt-16 p-8 md:p-12 rounded-[40px] bg-white/50 border-2 border-brand-orange/10 relative">
          <div className="absolute -top-6 left-12 bg-brand-orange text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
            Lời kết chương
          </div>
          <p className="text-xl md:text-2xl font-serif italic text-brand-text leading-relaxed text-center">
            "{season.conclusion}"
          </p>
        </div>
      </div>
      
      <div className="p-8 bg-white/50 backdrop-blur-sm flex items-center justify-center">
        <p className="text-sm font-serif italic text-brand-muted">
          Từ bộ phim <span className="font-bold">"Khi cuộc đời cho bạn quả quýt"</span>
        </p>
      </div>
    </div>
  );
}
