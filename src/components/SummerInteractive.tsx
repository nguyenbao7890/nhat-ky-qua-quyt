import React, { useState, useEffect } from 'react';
import { SeasonInfo } from '../seasonsData';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Wind, CloudRain, Sun, Calendar, ChevronRight, Check, Send, Sparkles, Timer } from 'lucide-react';

interface SummerInteractiveProps {
  season: SeasonInfo;
}

export default function SummerInteractive({ season }: SummerInteractiveProps) {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [activeReflectionIndex, setActiveReflectionIndex] = useState<number | null>(null);
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<number, string>>({});
  const [carryingAnswers, setCarryingAnswers] = useState<Record<string, string>>({});
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && countdown > 0) {
      interval = setInterval(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, countdown]);

  if (season.id !== 'summer') return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Compact Reflection Card (Left) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-card p-6 border-brand-orange/10 bg-white/60">
            <div className="flex items-center gap-2 mb-4">
              <CloudRain className="w-4 h-4 text-brand-orange" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
                Bản đồ cơn bão
              </span>
            </div>
            
            <h3 className="text-xl font-display font-bold mb-6">Cơn bão gần nhất của tôi</h3>
            
            <div className="space-y-4">
              {season.reflection?.questions.map((q, i) => (
                <div key={i} className="space-y-3">
                  <button
                    onClick={() => setActiveReflectionIndex(activeReflectionIndex === i ? null : i)}
                    className={cn(
                      "w-full flex items-center justify-between p-6 rounded-[32px] text-left transition-all border group",
                      activeReflectionIndex === i 
                        ? "bg-white border-brand-orange shadow-xl shadow-brand-orange/10" 
                        : "bg-brand-orange/[0.02] border-brand-orange/5 hover:border-brand-orange/20"
                    )}
                  >
                    <div className="flex gap-4 items-center">
                      <span className={cn(
                        "text-[13px] font-black tabular-nums transition-colors",
                        activeReflectionIndex === i ? "text-brand-orange" : "text-brand-orange/40"
                      )}>0{i + 1}</span>
                      <span className={cn(
                        "text-lg font-bold transition-colors",
                        activeReflectionIndex === i ? "text-brand-orange" : "text-brand-text"
                      )}>{q}</span>
                    </div>
                    <ChevronRight className={cn(
                      "w-5 h-5 transition-all text-brand-muted/30 group-hover:translate-x-1",
                      activeReflectionIndex === i ? "rotate-90 text-brand-orange" : ""
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
                            placeholder="Chia sẻ của em tại đây..."
                            className="w-full bg-white border-2 border-brand-orange/10 rounded-[32px] p-8 text-xl font-serif italic focus:outline-none focus:border-brand-orange/30 transition-all min-h-[160px] resize-none shadow-inner text-brand-text"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-brand-orange/5 border-l-2 border-brand-orange rounded-r-xl italic text-[11px] text-brand-muted leading-relaxed font-serif">
              {season.reflection?.footer}
            </div>
          </div>
        </div>

        {/* Carrying Items Table (Right) */}
        <div className="xl:col-span-8 space-y-8">
          <div className="glass-card p-10 border-brand-orange/10 bg-white/40">
            <h3 className="text-2xl font-display font-bold mb-8 text-left uppercase tracking-widest text-brand-text/90">
              “{season.carryingItems?.title}”
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-brand-orange/10">
                    <th className="p-6 text-left"></th>
                    {season.carryingItems?.columns.map(col => (
                      <th key={col} className="p-6 text-center text-[11px] font-black uppercase tracking-widest text-brand-muted">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {season.carryingItems?.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-brand-orange/5 group hover:bg-brand-orange/[0.02] transition-colors">
                      <td className="p-6 text-brand-text font-bold text-lg leading-tight w-1/2">{item}</td>
                      {season.carryingItems?.columns.map(col => (
                        <td key={col} className="p-6 text-center">
                          <button
                            onClick={() => setCarryingAnswers({ ...carryingAnswers, [item]: col })}
                            className={cn(
                              "w-10 h-10 rounded-xl border-2 transition-all flex items-center justify-center mx-auto",
                              carryingAnswers[item] === col 
                                ? "bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/20" 
                                : "border-brand-orange/10 hover:border-brand-orange/30 bg-white"
                            )}
                          >
                            {carryingAnswers[item] === col && <Check className="w-5 h-5" />}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Immediate Actions */}
            <div className="mt-12 space-y-10">
              <div className="text-left">
                <div className="inline-flex items-center gap-2 mb-4">
                   <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                   <span className="text-[11px] font-black uppercase tracking-widest text-brand-orange">chọn 1 hành động NGAY</span>
                </div>
                
                <h4 className="text-xl font-display font-bold italic mb-8 text-brand-text/80">
                  “{season.carryingItems?.immediateActionPrompt}”
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {season.carryingItems?.immediateActions.map(action => (
                    <button
                      key={action.id}
                      onClick={() => {
                        setActiveAction(activeAction === action.id ? null : action.id);
                        if (action.type === 'timer') {
                          setCountdown(parseInt(action.details) * 60);
                          setIsTimerRunning(false);
                        }
                      }}
                      className={cn(
                        "p-6 rounded-[32px] border-2 transition-all text-center group relative overflow-hidden",
                        activeAction === action.id 
                          ? "bg-brand-orange border-brand-orange text-white shadow-xl shadow-brand-orange/20" 
                          : "bg-white border-brand-orange/10 hover:border-brand-orange/40"
                      )}
                    >
                      <div className="text-3xl mb-3">{action.icon}</div>
                      <div className="font-display font-black uppercase tracking-wider text-[11px] mb-1">{action.label}</div>
                      <div className={cn(
                        "text-[9px] uppercase font-bold tracking-tight opacity-60",
                        activeAction === action.id ? "text-white" : "text-brand-muted"
                      )}>{action.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeAction && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-10 rounded-[40px] bg-brand-cream/40 border-2 border-brand-orange/5 text-center">
                      {activeAction === 'write' ? (
                        <div className="space-y-6">
                          <h4 className="text-2xl font-serif italic font-bold text-brand-text">"{season.carryingItems?.immediateActions.find(a => a.id === 'write')?.details}"</h4>
                          <textarea
                            placeholder="Trải lòng của em..."
                            className="w-full bg-white rounded-3xl border border-brand-orange/10 p-6 min-h-[150px] font-serif italic text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-orange/5"
                          />
                          <button className="flex items-center gap-2 px-8 py-3 bg-brand-orange text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all mx-auto">
                            <Check className="w-4 h-4" /> Hoàn thành bước đầu
                          </button>
                        </div>
                      ) : activeAction === 'breath' ? (
                        <div className="space-y-10 py-6">
                          <div className="relative flex items-center justify-center">
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute w-48 h-48 bg-brand-orange/10 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.1, 0.3] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute w-72 h-72 bg-brand-orange/5 rounded-full"
                            />
                            <div className="relative z-10 text-6xl font-display font-black text-brand-orange tabular-nums">
                              {formatTime(countdown)}
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                             <p className="text-brand-orange font-black uppercase tracking-widest text-[11px]">Hít vào ... Thở ra</p>
                             <p className="text-brand-muted font-serif italic text-lg">Hãy để cơ thể em được nghỉ ngơi thật sự.</p>
                          </div>

                          <button 
                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                            className={cn(
                              "px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 mx-auto shadow-xl",
                              isTimerRunning 
                                ? "bg-white text-brand-orange border border-brand-orange/20 shadow-brand-orange/5" 
                                : "bg-brand-orange text-white shadow-brand-orange/20 hover:scale-105"
                            )}
                          >
                            <Timer className="w-5 h-5" />
                            {isTimerRunning ? 'Dừng lại' : 'Bắt đầu 2 phút'}
                          </button>

                          {countdown === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl text-brand-orange font-bold font-serif italic">
                              Cảm ơn em vì đã dịu dàng với chính mình.
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-8">
                          <div className="w-20 h-20 rounded-[35px] bg-brand-orange text-white flex items-center justify-center mx-auto shadow-xl shadow-brand-orange/20">
                            <Sparkles className="w-10 h-10" />
                          </div>
                          <h4 className="text-2xl font-display font-bold">Mở lòng để được kết nối</h4>
                          <p className="text-2xl text-brand-text font-serif italic leading-relaxed max-w-lg mx-auto">
                            “{season.carryingItems?.immediateActions.find(a => a.id === 'connect')?.details}”
                          </p>
                          <div className="pt-6 border-t border-brand-orange/10 max-w-md mx-auto">
                             <p className="text-[10px] text-brand-muted font-black uppercase tracking-widest mb-2 opacity-60">Gợi ý từ Chương Hạ:</p>
                             <p className="text-brand-muted italic">Đôi khi chỉ cần một lời chào chân thành cũng đủ để xua tan cái nóng rát của cô đơn.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Challenge Section */}
      {season.sevenDayChallenge && (
        <section id="challenge" className="space-y-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-orange/10 rounded-full text-brand-orange text-[10px] font-black uppercase tracking-widest">
              <Calendar className="w-3 h-3" /> 7 Ngày Thử Thách
            </div>
            <h3 className="text-4xl font-display font-bold">{season.sevenDayChallenge.title}</h3>
            <p className="text-brand-muted text-lg font-serif italic">
              {season.sevenDayChallenge.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {season.sevenDayChallenge.days.map((day, i) => (
              <motion.button
                key={day.day}
                whileHover={{ y: -5 }}
                onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                className={cn(
                  "p-8 rounded-[40px] border-2 transition-all text-left relative group overflow-hidden",
                  activeDay === day.day 
                    ? "bg-brand-orange border-brand-orange text-white shadow-xl shadow-brand-orange/20" 
                    : "bg-white border-brand-orange/10 hover:border-brand-orange/40"
                )}
              >
                <div className={cn(
                  "text-4xl font-display font-black mb-4",
                  activeDay === day.day ? "text-white/40" : "text-brand-orange/20"
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
                    <ChevronRight className="w-5 h-5 text-brand-orange" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-orange/10 rounded-full text-brand-orange text-[10px] font-black uppercase tracking-widest">
            <Wind className="w-3 h-3" /> Chữa lành & hồi phục
          </div>
          <h4 className="text-3xl font-display font-bold">Ba bước hồi phục khi đời "nóng rát"</h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-4 p-8 bg-white border border-brand-orange/5 rounded-[40px] hover:shadow-xl hover:shadow-brand-orange/5 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-black text-xs">01</div>
                <h5 className="text-xl font-bold uppercase tracking-tight">Dừng lại</h5>
              </div>
              <p className="text-brand-muted leading-relaxed font-serif italic text-lg">Không phản ứng ngay khi cảm xúc bùng lên. Hãy hít một hơi thật sâu và ngồi yên cùng nó.</p>
            </div>
            
            <div className="flex-1 space-y-4 p-8 bg-brand-orange text-white rounded-[40px] shadow-xl shadow-brand-orange/20 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-xs">02</div>
                <h5 className="text-xl font-bold uppercase tracking-tight">Gọi tên</h5>
              </div>
              <p className="text-white/90 leading-relaxed font-serif italic text-lg">"Mình đang buồn", "Mình đang thấy bị bỏ rơi", "Mình đang rất thất vọng". Hãy gọi đúng tên nó.</p>
            </div>
            
            <div className="flex-1 space-y-4 p-8 bg-white border border-brand-orange/5 rounded-[40px] hover:shadow-xl hover:shadow-brand-orange/5 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-black text-xs">03</div>
                <h5 className="text-xl font-bold uppercase tracking-tight">Hành động nhỏ</h5>
              </div>
              <p className="text-brand-muted leading-relaxed font-serif italic text-lg">Uống miếng nước, đi bộ ngắn, viết ra giấy, hoặc nhắn cho người em tin cậy.</p>
            </div>
          </div>
        </div>
        
        <div className="p-10 bg-brand-cream/30 border-2 border-brand-orange/5 rounded-[50px] relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1">
               <p className="text-brand-text font-serif italic text-2xl leading-relaxed">
                 “Cảm xúc không phải kẻ thù, nó là tín hiệu. Đau buồn không làm em yếu đi, nó cho em biết điều gì đang thực sự quan trọng.”
               </p>
            </div>
            <div className="shrink-0 flex items-center gap-4 bg-white px-8 py-5 rounded-[32px] border border-brand-orange/10 shadow-lg shadow-brand-orange/5">
               <img src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" className="w-8 h-8" alt="Icon" />
               <span className="text-[12px] font-black uppercase tracking-[0.2em] text-brand-orange">Thông điệp cốt lõi</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
