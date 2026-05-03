import React from 'react';
import { Quote, ChevronRight, CheckSquare, Pencil, Clock, PenTool, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { SeasonInfo } from '../seasonsData';

export default function RightSidebar({ 
  season, 
  onAction, 
  onOpenJournal 
}: { 
  season: SeasonInfo;
  onAction: (text: string) => void;
  onOpenJournal: () => void;
}) {
  const accentColor = season.id === 'summer' ? 'text-[#f26622]' : 
                     season.id === 'spring' ? 'text-emerald-500' :
                     season.id === 'autumn' ? 'text-amber-600' : 'text-blue-500';

  return (
    <div className="space-y-8">
      {/* Quote of the day */}
      <div className={cn("glass-card p-8 border-none shadow-[0_20px_60px_-15px_rgba(45,45,45,0.05)]", 
        season.id === 'summer' ? 'bg-orange-50/50' : 
        season.id === 'spring' ? 'bg-emerald-50/50' :
        season.id === 'autumn' ? 'bg-amber-50/50' : 'bg-blue-50/50')}>
        <div className={cn("flex gap-2 mb-4", accentColor)}>
          <Quote className="w-5 h-5 fill-current" />
          <Quote className="w-5 h-5 fill-current" />
        </div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted mb-4">Câu nói hôm nay</h4>
        <p className="text-brand-text leading-relaxed font-medium">
          {season.quote}
        </p>
        <div className="mt-8 flex justify-end">
           <img src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" alt="Tangerine" className="w-10 h-10 rotate-12 drop-shadow-sm" />
        </div>
      </div>

      {/* Practice now */}
      <div className="glass-card p-8 border-none bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-8">
           <div className={cn("w-1.5 h-10 rounded-full", season.accentColor)} />
           <h4 className="text-lg font-display font-bold">Thực hành ngay</h4>
        </div>
        
        <div className="space-y-4">
          {season.actions.map((action, i) => (
            <div key={i}>
              <PracticeItem 
                icon={<span className="text-sm">{action.icon}</span>}
                title={action.text}
                season={season}
                onClick={() => onAction(action.text)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Write to journal button */}
      <button 
        onClick={onOpenJournal}
        className={cn("w-full group relative overflow-hidden p-1 rounded-3xl transition-transform hover:scale-[1.02] active:scale-[0.98]", season.accentColor)}
      >
        <div className={cn("text-white px-8 py-5 rounded-[22px] font-bold flex items-center justify-between", season.accentColor)}>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">Viết vào</p>
            <p className="text-lg">Nhật ký Quả Quýt</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <PenTool className="w-6 h-6" />
          </div>
        </div>
      </button>

      {/* Back button */}
      <button className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted hover:text-brand-orange transition-colors flex items-center justify-center gap-3 bg-brand-cream/30 rounded-2xl">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-muted group-hover:bg-brand-orange" />
        Quay lại hoạt động
      </button>
    </div>
  );
}

interface PracticeItemProps {
  icon: React.ReactNode;
  title: string;
  season: SeasonInfo;
  onClick: () => void;
}

function PracticeItem({ icon, title, season, onClick }: PracticeItemProps) {
  const accentText = season.id === 'summer' ? 'group-hover:text-[#f26622]' : 
                    season.id === 'spring' ? 'group-hover:text-emerald-500' :
                    season.id === 'autumn' ? 'group-hover:text-amber-600' : 'group-hover:text-blue-500';
  
  const accentBorder = season.id === 'summer' ? 'hover:border-[#f26622]/10' : 
                      season.id === 'spring' ? 'hover:border-emerald-500/10' :
                      season.id === 'autumn' ? 'hover:border-amber-600/10' : 'hover:border-blue-500/10';

  const accentBg = season.id === 'summer' ? 'hover:bg-[#f26622]/[0.03]' : 
                  season.id === 'spring' ? 'hover:bg-emerald-500/[0.03]' :
                  season.id === 'autumn' ? 'hover:bg-amber-600/[0.03]' : 'hover:bg-blue-500/[0.03]';

  return (
    <button 
      onClick={onClick}
      className={cn("w-full flex items-center justify-between p-4 rounded-2xl bg-brand-cream/20 transition-all border border-transparent group", accentBg, accentBorder)}
    >
      <div className="flex items-center gap-4">
        <div className={cn("w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-muted/60 transition-colors", accentText)}>
          {icon}
        </div>
        <span className={cn("text-sm font-bold text-brand-text/80 transition-colors", accentText)}>{title}</span>
      </div>
      <ChevronRight className={cn("w-4 h-4 text-brand-muted/30 transition-all", accentText)} />
    </button>
  );
}
