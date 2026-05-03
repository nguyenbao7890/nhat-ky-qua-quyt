import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  HelpCircle, 
  FileText,
  ArrowRight,
  Info,
  Puzzle,
  Gauge,
  User,
  Star,
  Award,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Question {
  id: number;
  text: string;
  category: string;
}

const QUESTIONS: Question[] = [
  { id: 1, text: "Tôi luôn sẵn sàng kết bạn với nhiều người bất cứ khi nào có thể.", category: "Kỹ năng xã hội" },
  { id: 2, text: "Tôi không cảm thấy thoải mái khi để người khác đợi mình.", category: "Tự điều chỉnh" },
  { id: 3, text: "Tôi thích dành thời gian cho trẻ em và người cao tuổi.", category: "Đồng cảm" },
  { id: 4, text: "Tôi không yêu cầu người khác làm những việc mà họ không muốn làm.", category: "Đồng cảm" },
  { id: 5, text: "Tôi luôn gọi cho mọi người để xác nhận thời gian cuộc họp.", category: "Kỹ năng xã hội" },
  { id: 6, text: "Tôi có thể nhận ra chính xác cảm xúc của mình khi chúng đang xảy ra.", category: "Tự nhận thức" },
  { id: 7, text: "Tôi biết cách kiểm soát những cơn xúc động mạnh như giận dữ hay lo lắng.", category: "Tự điều chỉnh" },
  { id: 8, text: "Tôi thường giữ được sự bình tĩnh trước những lời chỉ trích.", category: "Tự điều chỉnh" },
  { id: 9, text: "Tôi dễ dàng thấu hiểu nỗi đau của người khác dù chưa từng trải qua.", category: "Đồng cảm" },
  { id: 10, text: "Tôi luôn tìm thấy động lực để hoàn thành mục tiêu dù gặp trở ngại.", category: "Động lực" },
  { id: 11, text: "Tôi hiểu rõ những gì là 'ngòi nổ' khiến mình mất kiểm soát.", category: "Tự nhận thức" },
  { id: 12, text: "Tôi thường suy nghĩ kỹ về hậu quả trước khi nói lúc nóng giận.", category: "Tự điều chỉnh" },
  { id: 13, text: "Tôi có khả năng thuyết phục và tạo ảnh hưởng tích cực lên người khác.", category: "Kỹ năng xã hội" },
  { id: 14, text: "Tôi lắng nghe mà không ngắt lời hay phán xét đối phương.", category: "Đồng cảm" },
  { id: 15, text: "Tôi nhận thức rõ những điểm mạnh và điểm yếu của mình.", category: "Tự nhận thức" },
  { id: 16, text: "Tôi sẵn sàng thừa nhận sai lầm thay vì cố gắng đổ lỗi.", category: "Kỹ năng xã hội" },
  { id: 17, text: "Tôi biết cách khích lệ và truyền cảm hứng cho mọi người xung quanh.", category: "Kỹ năng xã hội" },
  { id: 18, text: "Tôi dành thời gian để suy ngẫm về những cảm xúc mình trải qua hàng ngày.", category: "Tự nhận thức" },
  { id: 19, text: "Tôi có thể tập trung vào mục tiêu dài hạn thay vì sự thỏa mãn tức thời.", category: "Động lực" },
  { id: 20, text: "Tôi biết cách hòa giải các mâu thuẫn một cách khéo léo.", category: "Kỹ năng xã hội" },
  { id: 21, text: "Tôi cảm nhận được bầu không khí của căn phòng ngay khi vừa bước vào.", category: "Đồng cảm" },
  { id: 22, text: "Tôi biết cách xây dựng và duy trì các mối quan hệ lâu dài.", category: "Kỹ năng xã hội" },
  { id: 23, text: "Tôi coi trọng việc hiểu về cảm xúc ngang bằng với kiến thức chuyên môn.", category: "Tự nhận thức" },
  { id: 24, text: "Tôi luôn quan tâm đến nhu cầu cảm xúc của bạn bè và người thân.", category: "Đồng cảm" },
  { id: 25, text: "Tôi có thể kiềm chế sự bốc đồng khi đưa ra các quyết định quan trọng.", category: "Tự điều chỉnh" },
  { id: 26, text: "Tôi thường tìm thấy những khía cạnh tích cực ngay cả trong biến cố.", category: "Động lực" },
  { id: 27, text: "Tôi biết cách nói 'không' mà không làm tổn thương người khác.", category: "Kỹ năng xã hội" },
  { id: 28, text: "Tôi nhận diện được các dấu hiệu stress của bản thân từ sớm.", category: "Tự nhận thức" },
  { id: 29, text: "Tôi không để những thất bại làm mình nhụt chí quá lâu.", category: "Động lực" },
  { id: 30, text: "Tôi có khả năng thích nghi nhanh với những thay đổi bất ngờ.", category: "Tự điều chỉnh" },
  { id: 31, text: "Tôi tôn trọng ranh giới cá nhân của tất cả mọi người.", category: "Kỹ năng xã hội" },
  { id: 32, text: "Tôi hiểu rằng cảm xúc là thông điệp cần được lắng nghe thay vì chối bỏ.", category: "Tự nhận thức" },
];

const OPTIONS = [
  { label: "Đúng", value: true },
  { label: "Sai", value: false },
];

import { SeasonInfo } from '../seasonsData';

export default function EQTest({ season, onBack }: { season: SeasonInfo; onBack: () => void }) {
  const [status, setStatus] = useState<'intro' | 'testing' | 'result'>('intro');
  const [currentPage, setCurrentPage] = useState(0); 
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  const QUESTIONS = season.eqTest.questions;
  const OPTIONS = season.eqTest.options;
  const QUESTIONS_PER_PAGE = 5;
  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

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
    if (season.eqTest.results.type === 'pillars') {
      const pillars: Record<string, { total: number; count: number }> = {};
      Object.keys(season.eqTest.results.categories || {}).forEach(cat => {
        pillars[cat] = { total: 0, count: 0 };
      });

      QUESTIONS.forEach(q => {
        const answer = answers[q.id];
        if (answer !== undefined && answer !== null && q.category) {
          let score = answer;
          if (q.reversed) {
            score = 6 - answer; // Assuming 1-5 scale
          }
          pillars[q.category].total += score;
          pillars[q.category].count += 1;
        }
      });

      const processedPillars = Object.entries(pillars).map(([key, data]) => {
        const maxPerQuestion = 5;
        const percentage = Math.round((data.total / (data.count * maxPerQuestion)) * 100);
        return {
          id: key,
          name: season.eqTest.results.categories?.[key] || key,
          score: percentage
        };
      });

      return { type: 'pillars' as const, data: processedPillars };
    } else {
      const totalScore = Object.values(answers).reduce((acc, val) => (acc || 0) + (val || 0), 0);
      const range = season.eqTest.results.ranges?.find(r => totalScore >= r.min && totalScore <= r.max);
      return { type: 'score' as const, score: totalScore, range };
    }
  }, [answers, QUESTIONS, season.eqTest.results]);

  const resetTest = () => {
    setAnswers({});
    setCurrentPage(0);
    setTimeLeft(15 * 60);
    setStatus('intro');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} phút và ${secs.toString().padStart(2, '0')} giây`;
  };

  if (status === 'intro') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto py-12 px-6"
      >
        <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 text-center relative overflow-hidden">
             <div className="flex items-center justify-between mb-8">
               <button onClick={onBack} className="text-brand-muted hover:text-brand-orange font-bold flex items-center gap-2">
                 <ChevronLeft className="w-4 h-4" /> Quay lại {season.name}
               </button>
             </div>
             
             <h1 className="text-3xl md:text-5xl font-display font-black text-[#2d2d2d] mb-6">{season.eqTest.title}</h1>
             <p className="text-xl text-brand-muted font-medium mb-12 max-w-2xl mx-auto">{season.eqTest.description}</p>
             
             <div className="max-w-3xl mx-auto mb-16 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {season.eqTest.instructions.map((inst, i) => (
                     <div key={i} className="flex gap-4 items-start bg-[#fffaf5] p-6 rounded-[24px] border border-brand-orange/10">
                        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-md">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <p className="text-brand-text font-medium">{inst}</p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="flex flex-col items-center gap-8">
                <button
                  onClick={() => setStatus(QUESTIONS.length > 0 ? 'testing' : 'result')}
                  className={cn("text-white px-12 py-5 rounded-full font-black text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl group", season.accentColor)}
                >
                  {QUESTIONS.length > 0 ? "Bắt đầu bài test" : "Xem nội dung chương"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
        </div>
      </motion.div>
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
                    <div className="text-4xl font-display font-black text-brand-orange mb-2">{p.score}%</div>
                    <div className="text-sm font-bold text-brand-muted uppercase tracking-wider">{p.name}</div>
                  </div>
                ))}
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
                Quay lại Hành trình Quả Quýt
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
      <div className="bg-[#f4f7ff] rounded-[50px] p-10 md:p-14 shadow-2xl shadow-blue-900/5 border border-[#e8eeff] relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-[#3b82f6]/10 pb-10">
           <h2 className="text-3xl md:text-4xl font-display font-black text-[#1e293b] tracking-tight whitespace-nowrap">
              CÂU HỎI {startIdx + 1} - {Math.min(startIdx + QUESTIONS_PER_PAGE, QUESTIONS.length)}/{QUESTIONS.length}
           </h2>
           <div className="flex items-center gap-3 text-[#3b82f6] font-black text-xl bg-white px-6 py-3 rounded-2xl border-2 border-[#3b82f6]/10 shadow-sm tabular-nums">
              <Clock className="w-6 h-6" />
              <span>Thời gian còn lại — {formatTime(timeLeft)}</span>
           </div>
        </div>

        <p className="text-[#64748b] font-bold mb-14 text-xl italic opacity-70">Đánh dấu vào câu trả lời phù hợp nhất với con người thật của bạn.</p>

        <div className="space-y-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-0"
            >
              {pageQuestions.map((q, i) => (
                <div key={q.id} className={cn(
                  "py-12 border-b border-[#e2e8f0] last:border-0",
                  i === 0 && "pt-0"
                )}>
                  <p className="text-2xl md:text-3xl font-display font-black text-[#1e293b] mb-10 leading-[1.4] tracking-tight">
                    {q.text}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-8 md:gap-12 ml-3">
                    {OPTIONS.map((opt) => (
                      <button 
                        key={opt.value}
                        onClick={() => handleAnswer(q.id, opt.value)}
                        className="group flex items-center gap-4 transition-all"
                      >
                        <div className={cn(
                          "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shadow-sm",
                          answers[q.id] === opt.value 
                            ? "border-brand-orange bg-brand-orange" 
                            : "border-gray-200 group-hover:border-brand-orange/40 bg-white"
                        )}>
                          {answers[q.id] === opt.value && <div className="w-3 h-3 rounded-full bg-white shadow-inner" />}
                        </div>
                        <span className={cn(
                          "text-lg font-bold font-display tracking-tight transition-colors",
                          answers[q.id] === opt.value ? "text-brand-orange" : "text-gray-400 group-hover:text-brand-orange"
                        )}>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-between items-center px-4">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="flex items-center gap-3 px-10 py-5 rounded-full border-2 border-[#cbd5e1] text-[#64748b] font-black text-lg bg-white hover:bg-[#f8fafc] hover:border-[#3b82f6]/20 transition-all shadow-sm disabled:opacity-20"
          >
            ← Quay lại
          </button>
          
          <button 
            onClick={() => {
              if (isLastPage) {
                setStatus('result');
              } else {
                setCurrentPage(prev => prev + 1);
              }
            }}
            disabled={!allAnsweredOnPage}
            className={cn(
               "flex items-center gap-3 px-12 py-5 rounded-full font-black text-lg transition-all shadow-xl",
               allAnsweredOnPage 
                ? "bg-[#3b82f6] text-white hover:bg-[#2563eb] hover:scale-105 active:scale-95" 
                : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
            )}
          >
            {isLastPage ? "Hoàn thành bài test →" : "Tiếp theo →"}
          </button>
        </div>
      </div>
    </div>
  );
}
