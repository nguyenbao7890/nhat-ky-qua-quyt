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

export default function EQTest() {
  const [status, setStatus] = useState<'intro' | 'testing' | 'result'>('intro');
  const [currentPage, setCurrentPage] = useState(0); 
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const QUESTIONS_PER_PAGE = 5;
  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

  useEffect(() => {
    let timer: any;
    if (status === 'testing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'testing') {
      setStatus('result');
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const handleAnswer = (questionId: number, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = useCallback(() => {
    const correctCount = (Object.values(answers) as boolean[]).filter(v => v === true).length;
    const totalPoints = correctCount * 2;
    const percentage = (correctCount / QUESTIONS.length) * 100;
    
    let level = "";
    let description = "";
    let color = "";
    let popRate = "";

    if (percentage >= 85) {
      level = "Thượng thừa";
      description = "Bạn là người có trí tuệ cảm xúc cực kỳ xuất sắc. Bạn làm chủ nội tâm và thấu hiểu mọi người một cách tự nhiên.";
      color = "text-[#3b82f6]";
      popRate = "5%";
    } else if (percentage >= 70) {
      level = "Khá tốt";
      description = "Bạn thuộc nhóm người được đánh giá là khá tốt. Khoảng điểm EQ này cho thấy bạn có khả năng thấu cảm và làm chủ cảm xúc hiệu quả.";
      color = "text-[#3b82f6]";
      popRate = "15%";
    } else if (percentage >= 50) {
      level = "Trung bình";
      description = "Bạn thuộc nhóm người được đánh giá là nhóm EQ nằm ở mức trung bình. Khoảng điểm EQ này khá phổ biến tương đương với 68% dân số.";
      color = "text-orange-500";
      popRate = "68%";
    } else {
      level = "Cần rèn luyện";
      description = "Chỉ số EQ hiện tại cho thấy bạn cần dành thêm thời gian để kết nối với cảm xúc của mình và học cách thấu hiểu người khác.";
      color = "text-red-500";
      popRate = "12%";
    }

    return { total: totalPoints, percentage, level, description, color, max: 64, popRate };
  }, [answers]);

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
             <h1 className="text-3xl md:text-4xl font-display font-black text-[#2d2d2d] mb-12">Cấu trúc bài kiểm tra</h1>
             
             <div className="max-w-3xl mx-auto mb-16 text-left">
                <div className="flex gap-6 items-start bg-[#fffaf5] p-8 rounded-[32px] border border-brand-orange/10 mb-12">
                   <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-orange/20">
                     <HelpCircle className="w-6 h-6" />
                   </div>
                   <div>
                     <h2 className="text-xl font-display font-black text-brand-orange mb-3">Tìm hiểu về trí tuệ cảm xúc (EQ)</h2>
                     <p className="text-[#5a4a3a] leading-relaxed font-medium">
                        Trí tuệ cảm xúc (EQ) là khả năng nhận diện, thấu hiểu và điều tiết cảm xúc của chính mình, đồng thời nhạy cảm với cảm xúc của những người xung quanh. Không giống như IQ vốn mang tính thiên bẩm, EQ là một năng lực có thể rèn luyện và phát triển theo thời gian. 
                        <br /><br />
                        Bài kiểm tra dưới đây được thiết kế dựa trên các tiêu chuẩn tâm lý học, giúp bạn có cái nhìn tổng quan về các khía cạnh: <span className="font-bold">Tự nhận thức, Kiểm soát cảm xúc, Sự thấu cảm và Kỹ năng xã hội</span>. Kết quả sẽ là gợi ý quý giá để bạn hoàn thiện bản thân và nâng cao chất lượng cuộc sống.
                     </p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: <Puzzle className="w-8 h-8 text-blue-500" />, label: "Số câu hỏi", value: "32 câu hỏi" },
                    { icon: <Clock className="w-8 h-8 text-blue-400" />, label: "Thời gian làm bài", value: "15 phút" },
                    { icon: <FileText className="w-8 h-8 text-blue-600" />, label: "Hình thức", value: "Trắc nghiệm" }
                  ].map((item, i) => (
                    <div key={i} className="bg-[#f8faff] rounded-3xl p-8 flex flex-col items-center text-center border border-blue-50">
                      <div className="mb-4">{item.icon}</div>
                      <span className="text-base font-bold text-[#64748b] mb-1">{item.label}</span>
                      <span className="text-lg font-black text-[#2d2d2d]">{item.value}</span>
                    </div>
                  ))}
                </div>
             </div>

             <div className="flex flex-col items-center gap-8">
                <div className="flex items-center gap-3 text-red-500 font-bold text-sm">
                  <AlertCircle className="w-5 h-5" />
                  <p>Lưu ý: Không tải lại trang hay bấm F5 trong quá trình làm bài nếu không sẽ mất dữ liệu bài làm!</p>
                </div>

                <button
                  onClick={() => setStatus('testing')}
                  className="bg-[#0f172a] text-white px-12 py-5 rounded-full font-black text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200 group"
                >
                  Tôi đã sẵn sàng <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
        </div>
      </motion.div>
    );
  }

  if (status === 'result') {
    const result = calculateScore();
    const timeTakenSeconds = (15 * 60) - timeLeft;
    const timeMins = Math.floor(timeTakenSeconds / 60);
    const timeSecs = timeTakenSeconds % 60;

    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto py-12 px-6">
        <div className="bg-white rounded-[60px] p-8 md:p-20 shadow-[0_45px_120px_-25px_rgba(242,102,34,0.15)] border border-brand-orange/5 relative overflow-hidden">
          {/* Decorative Tangerines */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl" />

          {/* Main Score Section */}
          <div className="text-center mb-24 relative z-10">
            <div className="inline-block bg-brand-orange/10 text-brand-orange px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] mb-10">
              Kết quả hành trình của bạn
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="relative">
                <span className="text-8xl md:text-9xl font-display font-black text-[#2d2d2d] leading-none tracking-tighter">
                  {result.total}
                </span>
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-16 h-16 bg-[#ffedd5] rounded-3xl flex items-center justify-center shadow-lg border-4 border-white text-2xl"
                >
                  🍊
                </motion.div>
              </div>
              <div className="flex flex-col items-start pt-8">
                 <span className="text-3xl md:text-4xl font-black text-[#ccc] leading-none mb-2">/ {result.max}</span>
                 <span className="text-lg font-bold text-brand-orange uppercase tracking-widest font-display">Điểm EQ</span>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
               <p className="text-2xl md:text-3xl text-[#5a4a3a] leading-[1.6] font-bold mb-10">
                  Chào bạn! "Quả Quýt" nhận thấy bạn đang sở hữu <br />
                  <span className="text-brand-orange bg-brand-orange/5 px-4 py-1 rounded-xl">Nhóm EQ ở mức {result.level.toLowerCase()}</span>
               </p>
               
               <div className="bg-[#fffaf5] p-10 rounded-[50px] border-2 border-brand-orange/10 shadow-sm inline-block">
                 <p className="text-xl text-[#8b735b] font-medium leading-[1.8]">
                   Chỉ số này cho thấy bạn là người có khả năng điều tiết cảm xúc ổn định. <br />
                   Khoảng điểm này tương đương với <span className="font-black text-brand-orange">{result.popRate}</span> dân số thế giới.
                 </p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 text-left relative z-10">
            <div>
              <h3 className="text-3xl font-display font-black mb-10 text-[#2d2d2d] flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange flex items-center justify-center text-white shadow-lg shadow-brand-orange/20">
                  <Star className="w-7 h-7 fill-current" />
                </div>
                Điểm nổi bật của bạn
              </h3>
              <div className="space-y-6">
                {[
                  { t: "Nhạy bén xúc cảm", d: "Bạn dễ dàng nhận ra những thay đổi nhỏ trong tâm trạng của mình." },
                  { t: "Lắng nghe chân thành", d: "Mọi người luôn cảm thấy an tâm khi chia sẻ cùng bạn." },
                  { t: "Tự chủ hành vi", d: "Ít khi để những cơn nóng giận nhất thời chi phối quyết định." },
                  { t: "Kính trọng bản thân", d: "Luôn dành thời gian để thấu hiểu và vỗ về đứa trẻ bên trong." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start group">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-orange/30 group-hover:bg-brand-orange mt-2.5 shrink-0 transition-colors" />
                    <p className="text-lg font-medium text-[#6b7280] leading-relaxed">
                       <span className="font-black text-[#2d2d2d] font-display">{item.t}:</span> {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#f8fafc] rounded-[50px] p-12 border border-slate-100 flex flex-col items-center justify-center text-center relative">
               <div className="w-20 h-20 mb-8 rounded-[30px] bg-white shadow-xl flex items-center justify-center text-4xl">
                  📝
               </div>
               <p className="text-[#8e8e8e] font-bold italic leading-relaxed text-xl mb-6">
                 "Mỗi cảm xúc đều là một món quà. <br />Hãy học cách mở quà mỗi ngày."
               </p>
               <span className="text-sm font-black text-brand-orange/40 uppercase tracking-widest">— Nhật Ký Quả Quýt</span>
            </div>
          </div>
          
          <div className="mb-24 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-brand-orange/10 pb-6">
              <h3 className="text-4xl font-display font-black text-[#2d2d2d]">Để "Quýt" ngọt ngào hơn mỗi ngày</h3>
              <p className="text-[#8e8e8e] font-bold">Gợi ý rèn luyện dành riêng cho bạn</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { title: "Lắng nghe sâu", img: "https://api.dicebear.com/7.x/thumbs/svg?seed=listen&backgroundColor=fff7ed", desc: "Dành 10 phút mỗi ngày chỉ để lắng nghe mà không phán xét." },
                { title: "Ghi chép cảm xúc", img: "https://api.dicebear.com/7.x/thumbs/svg?seed=writing&backgroundColor=f0f9ff", desc: "Viết vào Nhật Ký Quả Quýt bất cứ khi nào bạn thấy vui hay buồn." },
                { title: "Thở chậm lại", img: "https://api.dicebear.com/7.x/thumbs/svg?seed=breath&backgroundColor=f0fdf4", desc: "Khi stress, hãy thử hít thở sâu 3 nhịp trước khi phản hồi." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all text-center group">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-2xl font-display font-black text-[#2d2d2d] mb-4 group-hover:text-brand-orange transition-colors">{item.title}</h4>
                  <p className="text-[#8e8e8e] font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8 relative z-10">
            <button onClick={resetTest} className="inline-flex items-center justify-center gap-4 bg-[#0f172a] text-white px-16 py-7 rounded-full font-black shadow-2xl hover:scale-105 active:scale-95 transition-all text-2xl group">
              KHÁM PHÁ LẠI <RotateCcw className="w-7 h-7 group-hover:rotate-180 transition-transform duration-500" />
            </button>
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
                    Câu {q.id}: {q.text}
                  </p>
                  
                  <div className="flex items-center gap-16 ml-3">
                    <button 
                      onClick={() => handleAnswer(q.id, true)}
                      className="group flex items-center gap-4 transition-all"
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shadow-sm",
                        answers[q.id] === true 
                          ? "border-[#4ade80] bg-[#4ade80]" 
                          : "border-[#cbd5e1] group-hover:border-[#4ade80] bg-white"
                      )}>
                        {answers[q.id] === true && <div className="w-3 h-3 rounded-full bg-white shadow-inner" />}
                      </div>
                      <span className={cn(
                        "text-xl font-black font-display tracking-tight transition-colors",
                        answers[q.id] === true ? "text-[#3b82f6]" : "text-[#94a3b8] group-hover:text-[#3b82f6]"
                      )}>Đúng</span>
                    </button>

                    <button 
                      onClick={() => handleAnswer(q.id, false)}
                      className="group flex items-center gap-4 transition-all"
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shadow-sm",
                        answers[q.id] === false 
                          ? "border-[#ef4444] bg-[#ef4444]" 
                          : "border-[#cbd5e1] group-hover:border-[#ef4444] bg-white"
                      )}>
                        {answers[q.id] === false && <div className="w-3 h-3 rounded-full bg-white shadow-inner" />}
                      </div>
                      <span className={cn(
                        "text-xl font-black font-display tracking-tight transition-colors",
                        answers[q.id] === false ? "text-[#f87171]" : "text-[#94a3b8] group-hover:text-[#f87171]"
                      )}>Sai</span>
                    </button>
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
