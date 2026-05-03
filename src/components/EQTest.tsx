import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SeasonInfo } from '../seasonsData';

export default function EQTest({ season, onBack }: { season: SeasonInfo; onBack: () => void }) {
  const [status, setStatus] = useState<'intro' | 'testing' | 'result'>('intro');
  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); 
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  const activeTest = season.eqTests[activeTestIndex] || season.eqTests[0];

  const QUESTIONS = activeTest?.questions || [];
  const OPTIONS = activeTest?.options || [];
  const QUESTIONS_PER_PAGE = 5;
  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

  const stats = activeTest?.stats || {
    questions: QUESTIONS.length,
    time: '8-10 phút',
    scale: [
      { value: 1, label: 'Rất không đúng', emoji: '🟤' },
      { value: 2, label: 'Không đúng', emoji: '🟠' },
      { value: 3, label: 'Bình thường', emoji: '🟡' },
      { value: 4, label: 'Đúng', emoji: '🟢' },
      { value: 5, label: 'Rất đúng', emoji: '🔵' }
    ]
  };

  useEffect(() => {
    let timer: any;
    if (status === 'testing' && timeLeft > 0 && QUESTIONS.length > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'testing') {
      setStatus('result');
    }
    return () => clearInterval(timer);
  }, [status, timeLeft, QUESTIONS.length]);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateResults = useCallback(() => {
    if (!activeTest) return null;

    if (activeTest.results.type === 'pillars') {
      const pillars: Record<string, { total: number; count: number }> = {};
      Object.keys(activeTest.results.categories || {}).forEach(cat => {
        pillars[cat] = { total: 0, count: 0 };
      });

      QUESTIONS.forEach(q => {
        const answer = answers[q.id];
        if (answer !== undefined && answer !== null && q.category) {
          let score = answer;
          if (q.reversed) {
            score = (stats.scale.length + 1) - answer;
          }
          pillars[q.category].total += score;
          pillars[q.category].count += 1;
        }
      });

      const processedPillars = Object.entries(pillars).map(([key, data]) => {
        const maxScore = data.count * stats.scale.length;
        const percentage = maxScore > 0 ? Math.round((data.total / maxScore) * 100) : 0;
        return {
          id: key,
          name: activeTest.results.categories?.[key] || key,
          score: percentage
        };
      });

      return { type: 'pillars' as const, data: processedPillars };
    } else if (activeTest.results.type === 'count') {
      const counts: Record<string, number> = {};
      
      QUESTIONS.forEach(q => {
        const answerVal = answers[q.id];
        const optionsToSearch = q.options || activeTest.options;
        const option = optionsToSearch.find(o => o.value === answerVal);
        if (option?.taste) {
          counts[option.taste] = (counts[option.taste] || 0) + 1;
        }
      });

      // Find dominant taste (>= 5)
      let dominantTaste = "";
      Object.entries(counts).forEach(([taste, count]) => {
        if (count >= 5) dominantTaste = taste;
      });

      const interpretation = dominantTaste 
        ? activeTest.results.countMeanings?.[dominantTaste]
        : {
            title: 'Hương Vị Hỗn Hợp',
            description: 'Em là người trưởng thành về cảm xúc – chấp nhận được cả chua, chát lẫn ngọt. Em linh hoạt, biết điều chỉnh và tìm thấy sự cân bằng trong cuộc sống.',
            challenge: 'Thử thách dành cho em: Hãy viết một bức thư ngắn gửi chính mình của 10 năm sau, kể về những điều em muốn giữ lại và những điều em muốn buông bỏ.'
          };

      return { type: 'count' as const, counts, interpretation };
    } else {
      const totalScore = Object.values(answers).reduce((acc, val) => acc + (val || 0), 0);
      const range = activeTest.results.ranges?.find(r => totalScore >= r.min && totalScore <= r.max);
      return { type: 'score' as const, score: totalScore, range };
    }
  }, [answers, QUESTIONS, activeTest, stats.scale.length]);

  const resetTest = () => {
    setAnswers({});
    setCurrentPage(0);
    setTimeLeft(10 * 60);
    setStatus('intro');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (status === 'intro') {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card p-10 md:p-16 border-none shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-orange/[0.02] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-brand-muted hover:text-brand-text transition-colors mb-12 font-bold uppercase tracking-widest text-[10px]"
            >
              <ArrowLeft className="w-3 h-3" /> Quay lại chương
            </button>

            <div className="flex items-center justify-between gap-4 mb-8">
               {season.eqTests.length > 1 && (
                 <button 
                   onClick={() => setActiveTestIndex(prev => (prev - 1 + season.eqTests.length) % season.eqTests.length)}
                   className="w-10 h-10 rounded-full bg-brand-cream/50 flex items-center justify-center text-brand-muted hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                 >
                   <ChevronLeft className="w-6 h-6" />
                 </button>
               )}
               
               <div className="text-center flex-1">
                 <h2 className="text-4xl font-display font-bold text-[#2d2d2d]">{activeTest.title}</h2>
                 <p className="text-brand-orange font-black text-[10px] uppercase tracking-[0.3em] mt-2">
                   Bài test {activeTestIndex + 1}/{season.eqTests.length}
                 </p>
               </div>

               {season.eqTests.length > 1 && (
                 <button 
                   onClick={() => setActiveTestIndex(prev => (prev + 1) % season.eqTests.length)}
                   className="w-10 h-10 rounded-full bg-brand-cream/50 flex items-center justify-center text-brand-muted hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                 >
                   <ArrowRight className="w-6 h-6" />
                 </button>
               )}
            </div>
            
            <div className="prose prose-orange max-w-none mb-12 text-left">
              <div className="text-lg text-brand-text/80 leading-relaxed font-serif space-y-6">
                <p>{activeTest.description}</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-brand-muted mb-8 flex items-center gap-3">
                 <div className={cn("w-2 h-8 rounded-full", season.accentColor)} />
                 Hướng dẫn làm bài
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-brand-border/40 p-6 rounded-[32px] shadow-sm">
                   <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted/60 mb-2">Số câu hỏi</p>
                   <p className="text-2xl font-display font-black">{stats.questions} câu</p>
                </div>
                <div className="bg-white border border-brand-border/40 p-6 rounded-[32px] shadow-sm">
                   <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted/60 mb-2">Thời gian</p>
                   <p className="text-2xl font-display font-black">{stats.time}</p>
                </div>
                <div className="bg-white border border-brand-border/40 p-6 rounded-[32px] shadow-sm md:col-span-1 text-left">
                   <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted/60 mb-2">Hình thức</p>
                   <p className="text-lg font-bold leading-tight">Chọn mức độ phù hợp nhất</p>
                </div>
              </div>

              <div className="bg-brand-cream/30 border border-brand-border/40 p-8 rounded-[40px] mb-12 text-left">
                <p className="text-xs font-black uppercase tracking-widest text-brand-muted mb-6">Thang đo:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.scale.map((s) => (
                    <div key={s.value} className="flex items-center gap-3 bg-white/60 p-3 rounded-2xl border border-brand-border/20">
                      <span className="text-xl">{s.emoji}</span>
                      <span className="text-sm font-bold text-brand-text/80">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-brand-orange/[0.03] border-l-4 border-brand-orange p-8 rounded-r-3xl mb-12 italic text-left text-brand-text/80 leading-relaxed font-serif">
              <p className="font-bold mb-4 not-italic text-brand-orange uppercase tracking-wider text-sm">Nguyên tắc quan trọng nhất:</p>
              {activeTest.instructions[activeTest.instructions.length - 1]}
            </div>

            <div className="text-center space-y-8 pt-6 border-t border-brand-border/30">
              <p className="text-brand-muted font-medium italic">
                Ngồi thẳng lưng, đặt tay lên ngực, hít một hơi thật chậm. <br />
                Tự nhủ: “Mình đang ở đây. Mình sẵn sàng lắng nghe chính mình.”
              </p>
              
              <button 
                onClick={() => {
                  setStatus('testing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={cn("px-12 py-6 rounded-full text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:scale-105 active:scale-95 transition-all shadow-brand-orange/20", season.accentColor)}
              >
                Khi em sẵn sàng, hãy bấm để bắt đầu
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (status === 'result') {
    const result = calculateResults();

    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto py-12 px-6">
        <div className="bg-white rounded-[60px] p-8 md:p-14 shadow-[0_45px_120px_-25px_rgba(242,102,34,0.15)] border border-brand-orange/5 relative">
          <div className="text-center mb-16">
            <div className="inline-block bg-brand-orange/10 text-brand-orange px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] mb-8">
              Kết thúc hành trình Chương {season.name}
            </div>
            
            {result.type === 'pillars' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
                {result.data.map((p, i) => (
                  <div key={i} className="bg-brand-cream/30 p-8 rounded-[40px] border border-brand-border/40 text-center">
                    <div className="text-4xl font-display font-black text-brand-orange mb-2">{p.score}/100</div>
                    <div className="text-sm font-bold text-brand-muted uppercase tracking-wider">{p.name}</div>
                  </div>
                ))}
              </div>
            ) : result.type === 'count' ? (
              <div className="max-w-2xl mx-auto mb-16">
                {result.interpretation ? (
                  <div className="bg-brand-cream/30 p-10 rounded-[50px] border-2 border-brand-orange/10 text-left">
                    <h3 className="text-4xl font-display font-black text-brand-orange mb-6 text-center">{result.interpretation.title}</h3>
                    <p className="text-xl text-brand-text/90 leading-relaxed font-serif italic mb-8 border-l-4 border-brand-orange pl-6 min-h-[100px]">
                      "{result.interpretation.description}"
                    </p>
                    <div className="bg-brand-orange/10 p-6 rounded-3xl border border-brand-orange/20">
                      <p className="text-brand-orange font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Thử thách dành cho em
                      </p>
                      <p className="text-brand-text font-bold leading-relaxed italic">
                        {result.interpretation.challenge}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-brand-muted italic">Cảm ơn bạn đã dũng cảm nhìn vào bên trong.</div>
                )}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto mb-16">
                {result.range ? (
                  <div className="bg-brand-cream/30 p-10 rounded-[50px] border-2 border-brand-orange/10">
                    <h3 className="text-4xl font-display font-black text-brand-orange mb-6">{result.range.title}</h3>
                    <p className="text-xl text-brand-text font-bold mb-4">{result.range.insight}</p>
                    <p className="text-lg text-brand-muted font-medium">{result.range.suggestion}</p>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-brand-muted italic">Cảm ơn bạn đã dũng cảm nhìn vào bên trong.</div>
                )}
              </div>
            )}

            <div className="max-w-3xl mx-auto bg-brand-orange/5 p-10 rounded-[48px] border-2 border-dashed border-brand-orange/20 mb-16">
               <h4 className="text-2xl font-display font-black text-brand-text mb-6">Lời kết chương</h4>
               <p className="text-xl font-serif italic text-brand-text leading-relaxed">
                 "{season.conclusion}"
               </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button onClick={resetTest} className="px-10 py-5 rounded-full border-2 border-brand-border text-brand-muted font-bold hover:bg-brand-cream transition-all">
                Làm lại bài test
              </button>
              <button onClick={onBack} className={cn("text-white px-12 py-5 rounded-full font-black text-lg transition-all shadow-xl hover:scale-105 active:scale-95", season.accentColor)}>
                Quay lại Chương
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const startIdx = currentPage * QUESTIONS_PER_PAGE;
  const pageQuestions = QUESTIONS.slice(startIdx, startIdx + QUESTIONS_PER_PAGE);
  const isLastPage = currentPage === totalPages - 1;
  const allAnsweredOnPage = pageQuestions.every(q => answers[q.id] !== undefined);

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white/60 p-6 rounded-[32px] border border-brand-border/20 shadow-sm">
           <h2 className="text-2xl font-display font-black text-brand-text italic">
              Câu {startIdx + 1} - {Math.min(startIdx + QUESTIONS_PER_PAGE, QUESTIONS.length)}
           </h2>
           <div className="flex items-center gap-3 text-brand-muted font-black text-[10px] uppercase shadow-sm tracking-[0.2em] bg-white px-6 py-3 rounded-2xl border border-brand-border/20 tabular-nums">
              <Clock className="w-4 h-4 text-brand-orange" />
              <span>Thời gian còn lại: {formatTime(timeLeft)}</span>
           </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {pageQuestions.map((q) => (
                <div key={q.id} className="glass-card p-10 md:p-12 border-none shadow-sm bg-white/80">
                  <p className="text-xl md:text-2xl font-display font-black text-brand-text mb-10 leading-relaxed">
                    {q.text}
                  </p>
                  
                  <div className={cn(
                    "flex flex-wrap items-stretch gap-6 md:gap-8",
                    q.options ? "flex-col" : "flex-row items-center"
                  )}>
                    {(q.options || stats.scale).map((s) => (
                      <button 
                        key={s.value}
                        onClick={() => handleAnswer(q.id, s.value)}
                        className={cn(
                          "group flex items-center gap-4 transition-all text-left",
                          q.options ? "w-full p-4 rounded-3xl border-2" : "flex-col w-auto",
                          answers[q.id] === s.value 
                            ? "border-brand-orange bg-brand-orange/5 shadow-sm" 
                            : "border-gray-100 bg-gray-50/50 hover:border-brand-orange/30 hover:bg-white",
                          !q.options && "border-none bg-transparent p-0"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-2xl border-2 flex shrink-0 items-center justify-center transition-all shadow-sm text-lg font-black",
                          answers[q.id] === s.value 
                            ? "border-brand-orange bg-brand-orange text-white shadow-brand-orange/20" 
                            : "border-gray-100 bg-gray-50 group-hover:border-brand-orange/30 group-hover:bg-white"
                        )}>
                          {s.value}
                        </div>
                        <span className={cn(
                          "font-bold transition-colors",
                          q.options ? "text-lg text-brand-text/90" : "text-[10px] font-black uppercase tracking-widest text-center max-w-[80px] leading-tight",
                          answers[q.id] === s.value ? "text-brand-orange" : "text-brand-muted/60 group-hover:text-brand-orange/60"
                        )}>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-between items-center bg-white/40 p-6 rounded-[40px] border border-brand-border/20">
          <button 
            onClick={() => {
              setCurrentPage(prev => Math.max(0, prev - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-8 py-4 rounded-full text-brand-muted font-bold tracking-widest uppercase text-[10px] hover:bg-white transition-all disabled:opacity-0"
          >
            <ChevronLeft className="w-4 h-4" /> Quay lại
          </button>
          
          <button 
            onClick={() => {
              if (isLastPage) {
                setStatus('result');
              } else {
                setCurrentPage(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={!allAnsweredOnPage}
            className={cn(
               "flex items-center gap-3 px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg",
               allAnsweredOnPage 
                ? "bg-[#2d2d2d] text-white hover:scale-105 active:scale-95" 
                : "bg-brand-border text-brand-muted cursor-not-allowed opacity-50"
            )}
          >
            {isLastPage ? "Xem kết quả" : "Trang tiếp theo"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
    </div>
  );
}
