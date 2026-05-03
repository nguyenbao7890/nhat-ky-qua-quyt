import React, { useState } from 'react';
import { SeasonInfo } from '../seasonsData';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Heart, MessageCircle, ChevronRight, Check, Calendar, Wind, Sparkles } from 'lucide-react';

interface AutumnInteractiveProps {
  season: SeasonInfo;
}

export default function AutumnInteractive({ season }: AutumnInteractiveProps) {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [activeReflectionIndex, setActiveReflectionIndex] = useState<number | null>(null);
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<number, string>>({});

  if (season.id !== 'autumn') return null;

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Compact Reflection Card (Left) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-card p-6 border-amber-600/10 bg-white/60">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-4 h-4 text-amber-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                Gắn kết trái tim
              </span>
            </div>
            
            <h3 className="text-xl font-display font-bold mb-6">{season.reflection?.title}</h3>
            
            <div className="space-y-4">
              {season.reflection?.questions.map((q, i) => (
                <div key={i} className="space-y-3">
                  <button
                    onClick={() => setActiveReflectionIndex(activeReflectionIndex === i ? null : i)}
                    className={cn(
                      "w-full flex items-center justify-between p-6 rounded-[32px] text-left transition-all border group",
                      activeReflectionIndex === i 
                        ? "bg-white border-amber-600 shadow-xl shadow-amber-600/10" 
                        : "bg-amber-600/[0.02] border-amber-600/5 hover:border-amber-600/20"
                    )}
                  >
                    <div className="flex gap-4 items-center">
                      <span className={cn(
                        "text-[13px] font-black tabular-nums transition-colors",
                        activeReflectionIndex === i ? "text-amber-600" : "text-amber-600/40"
                      )}>0{i + 1}</span>
                      <span className={cn(
                        "text-lg font-bold transition-colors",
                        activeReflectionIndex === i ? "text-amber-600" : "text-brand-text"
                      )}>{q}</span>
                    </div>
                    <ChevronRight className={cn(
                      "w-5 h-5 transition-all text-brand-muted/30 group-hover:translate-x-1",
                      activeReflectionIndex === i ? "rotate-90 text-amber-600" : ""
                    )} />
                  </button>
                  
                  <AnimatePresence>
                    {activeReflectionIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2">
                          <textarea
                            value={reflectionAnswers[i] || ''}
                            onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, [i]: e.target.value })}
                            placeholder="Lời hồi đáp từ tâm hồn..."
                            className="w-full bg-white border-2 border-amber-600/10 rounded-[32px] p-8 text-xl font-serif italic focus:outline-none focus:border-amber-600/30 transition-all min-h-[160px] resize-none shadow-inner text-brand-text"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-amber-600/5 border-l-2 border-amber-600 rounded-r-xl italic text-[11px] text-brand-muted leading-relaxed font-serif">
              {season.reflection?.footer}
            </div>
          </div>
        </div>

        {/* 7-Day Challenge Section (Right) */}
        <div className="xl:col-span-8 space-y-8">
          <div className="glass-card p-10 border-amber-600/10 bg-white/40">
            <div className="flex flex-col items-start gap-4 mb-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-600/10 rounded-full text-amber-600 text-[10px] font-black uppercase tracking-widest">
                <Calendar className="w-3 h-3" /> 7 Ngày Thử Thách
              </div>
              <h3 className="text-4xl font-display font-bold">{season.sevenDayChallenge?.title}</h3>
              <p className="text-brand-muted text-lg font-serif italic">
                {season.sevenDayChallenge?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {season.sevenDayChallenge?.days.map((day, i) => (
                <motion.button
                  key={day.day}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                  className={cn(
                    "p-8 rounded-[40px] border-2 transition-all text-left relative group overflow-hidden",
                    activeDay === day.day 
                      ? "bg-amber-600 border-amber-600 text-white shadow-xl shadow-amber-600/20" 
                      : "bg-white border-amber-600/10 hover:border-amber-600/40"
                  )}
                >
                  <div className={cn(
                    "text-4xl font-display font-black mb-4",
                    activeDay === day.day ? "text-white/40" : "text-amber-600/20"
                  )}>
                    0{day.day}
                  </div>
                  <p className={cn(
                    "text-lg font-bold leading-snug font-serif",
                    activeDay === day.day ? "text-white" : "text-brand-text"
                  )}>
                    {day.content}
                  </p>
                  {activeDay !== day.day && (
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-5 h-5 text-amber-600" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="mt-12 p-8 bg-amber-600/5 rounded-[40px] border border-dashed border-amber-600/20 text-center">
               <MessageCircle className="w-8 h-8 text-amber-600 mx-auto mb-4" />
               <p className="text-brand-text font-serif italic text-lg leading-relaxed">
                 "Em viết những dòng này cũng như đang nói chuyện với một người bạn – nếu em cần, chúng tôi luôn ở đây để lắng nghe em."
               </p>
            </div>
          </div>
        </div>
      </div>

      <section className="p-10 bg-amber-600/[0.03] border-2 border-amber-600/10 rounded-[50px] relative overflow-hidden group">
        <Sparkles className="absolute -bottom-10 -right-10 w-64 h-64 text-amber-600/5 group-hover:text-amber-600/[0.08] transition-colors rotate-12" />
        <h4 className="text-2xl font-display font-bold mb-8 text-amber-600 flex items-center gap-3 relative z-10">
          <Wind className="w-6 h-6" /> Lời khuyên nhỏ dành cho em
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-4 p-8 bg-white shadow-sm border border-amber-600/5 rounded-[40px] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-amber-600/10 flex items-center justify-center text-amber-600 font-black text-xs">A</div>
            <p className="text-brand-text font-serif italic text-lg">Mỗi tối trước khi ngủ, em hãy đặt một tay lên ngực, hít một hơi thật sâu và hỏi chính mình: “Hôm nay em đã thực sự lắng nghe ai chưa? Em đã được ai lắng nghe chưa?”</p>
          </div>
          <div className="space-y-4 p-8 bg-white shadow-sm border border-amber-600/5 rounded-[40px] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-amber-600/10 flex items-center justify-center text-amber-600 font-black text-xs">B</div>
            <p className="text-brand-text font-serif italic text-lg">Ghi chú: Em có thể mua một cuốn sổ nhỏ xinh, mỗi ngày viết một câu – chỉ một câu thôi. Ví dụ: “Ngày 2, em viết thư cho mẹ, em khóc, nhưng lòng nhẹ hơn.”</p>
          </div>
        </div>
      </section>
    </div>
  );
}
