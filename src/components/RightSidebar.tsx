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
           <div className={cn("w-1.5 h-6 rounded-full", season.id === 'summer' ? 'bg-[#f26622]' : season.id === 'spring' ? 'bg-emerald-500' : season.id === 'autumn' ? 'bg-amber-600' : 'bg-blue-600')} />
           <h4 className="text-sm font-display font-bold text-brand-text">Thực hành ngay</h4>
        </div>
        
        <div className="space-y-4">
          {season.actions.map((action, i) => (
            <PracticeItem 
              key={i}
              icon={action.icon}
              title={action.text}
              season={season}
              onClick={() => onAction(action.text)}
            />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-brand-orange/10">
           <div className="bg-brand-orange/[0.03] border-l-2 border-brand-orange p-5 rounded-r-xl italic text-[11px] text-brand-muted leading-relaxed font-serif">
             {season.id === 'summer' && "Đây chính là bước đầu của trí tuệ cảm xúc: nhận diện – hiểu – và điều chỉnh phản ứng của bản thân trước một tình huống."}
             {season.id === 'spring' && "Mầm xanh EQ bắt đầu từ việc em dám nhìn thẳng vào cảm xúc của chính mình mà không phán xét."}
             {season.id === 'autumn' && "Mùa thu là lúc ta học cách lắng nghe để thấu cảm và hàn gắn những rạn nứt trong các mối quan hệ."}
             {season.id === 'winter' && "Bình an đến từ việc ta học cách buông bỏ những điều không còn thuộc về mình để tái tạo năng lượng."}
           </div>
        </div>
      </div>

      {/* Write to journal button */}
      <button 
        onClick={onOpenJournal}
        className={cn(
          "w-full flex items-center justify-between p-6 rounded-[32px] group transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl text-white",
          season.id === 'summer' ? 'bg-[#f26622] shadow-[#f26622]/20' : 
          season.id === 'spring' ? 'bg-emerald-500 shadow-emerald-500/20' :
          season.id === 'autumn' ? 'bg-amber-600 shadow-amber-600/20' : 'bg-blue-600 shadow-blue-600/20'
        )}
      >
        <div className="text-left">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-0.5">VIẾT VÀO</div>
          <div className="text-lg font-display font-bold leading-tight">Nhật ký Quả Quýt</div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:rotate-12 transition-transform">
          <PenTool className="w-5 h-5" />
        </div>
      </button>

      {/* Navigation help */}
      <div className="flex flex-col items-center pt-4">
         <button className="flex items-center gap-3 group">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-muted/20 group-hover:bg-brand-orange transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted group-hover:text-brand-orange transition-colors">QUAY LẠI HOẠT ĐỘNG</span>
         </button>
      </div>
    </div>
  );
}

interface PracticeItemProps {
  icon: string;
  title: string;
  season: SeasonInfo;
  onClick: () => void;
}

function PracticeItem({ icon, title, season, onClick }: PracticeItemProps) {
  const accentText = season.id === 'summer' ? 'group-hover:text-[#f26622]' : 
                    season.id === 'spring' ? 'group-hover:text-emerald-500' :
                    season.id === 'autumn' ? 'group-hover:text-amber-600' : 'group-hover:text-blue-500';
  
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-[32px] transition-all border border-brand-orange/5 bg-brand-cream/5 hover:bg-white hover:border-brand-orange/20 hover:shadow-xl hover:shadow-brand-orange/5 group"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white border border-brand-orange/10 flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110">
          {icon}
        </div>
        <span className={cn("text-[15px] font-bold text-brand-text/80 transition-colors", accentText)}>
          {title}
        </span>
      </div>
      <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1">
        <ChevronRight className={cn("w-4 h-4 text-brand-muted/30", accentText)} />
      </div>
    </button>
  );
}
