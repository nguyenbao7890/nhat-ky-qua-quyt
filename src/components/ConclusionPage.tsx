import React from 'react';
import { motion } from 'motion/react';
import { Quote, Heart, Sparkles, Send } from 'lucide-react';

export default function ConclusionPage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-24"
      >
        <div className="text-center space-y-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block px-8 py-3 rounded-full bg-brand-orange text-white text-xs font-black uppercase tracking-[0.4em] mb-4 shadow-xl shadow-brand-orange/20"
          >
             Kết thúc hành trình 🍊
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-display font-black text-brand-text leading-tight tracking-tighter">
            Khi những mùa không còn là <br /> 
            <span className="text-brand-orange">những trang riêng rẽ</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-muted font-medium max-w-3xl mx-auto leading-relaxed font-serif italic">
            "Bạn đã đọc hết bốn chương. Bạn đã thực hành bốn mùa. <br />
            Nhưng điều kỳ diệu nhất chưa phải là bạn đã “làm xong” một điều gì đó..."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
           <div className="bg-white p-12 md:p-16 rounded-[60px] border border-brand-border/40 shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-6 left-10 text-6xl opacity-10">📖</div>
              <div className="space-y-8 font-serif text-xl leading-[1.8] text-brand-text relative z-10">
                <p>
                  Điều kỳ diệu là: bạn bước ra từ những trang ấy với một cách nhìn khác về chính những điều tưởng chừng rất đỗi bình thường – nỗi buồn, sự mất mát, cô đơn, hoặc thậm chí là cả lỗi lầm.
                </p>
                <p>
                  Bạn nhận ra rằng <span className="text-brand-orange font-bold uppercase tracking-widest text-sm">EQ</span> không phải là một "siêu năng lực" để dập tắt những cơn bão, mà là một đôi bàn tay đủ vững để giữ lấy chiếc la bàn của lòng mình khi sóng gió nổi lên.
                </p>
              </div>
           </div>

           <div className="space-y-8 flex flex-col">
              <div className="bg-brand-cream border-2 border-brand-orange/10 p-10 rounded-[50px] flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6 text-4xl transform -rotate-6">🍊</div>
                 <p className="text-lg font-medium text-brand-muted leading-relaxed">
                   Hành trình cùng <span className="text-brand-orange font-bold">Ae-sun</span> không kết thúc ở mùa Đông. Nó chỉ chuyển sang một trạng thái khác: <span className="font-bold underline decoration-brand-orange/30">Sự thấu cảm</span>.
                 </p>
              </div>
              <div className="bg-[#f0f9ff] border border-blue-100 p-10 rounded-[50px] flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6 text-4xl transform rotate-6">✨</div>
                 <p className="text-lg font-medium text-brand-muted leading-relaxed text-blue-900/60">
                   Hãy giữ lấy sự tỉnh thức này. Đừng quên rằng mỗi ngày đều là một quả quýt mới. Có trái ngọt lịm, có trái chua – nhưng trái nào cũng mang nhựa sống.
                 </p>
              </div>
           </div>
        </div>

        <div className="bg-brand-text text-white p-12 md:p-24 rounded-[80px] text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-transparent pointer-events-none" />
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
             className="absolute -top-20 -right-20 w-64 h-64 border-4 border-dashed border-white/5 rounded-full" 
           />
           
           <Quote className="w-20 h-20 text-brand-orange/20 mx-auto mb-10" />
           <p className="text-3xl md:text-5xl font-display font-black leading-tight mb-12 italic">
             "Mỗi cảm xúc đều là một món quà. <br />
             Hãy học cách mở quà mỗi ngày."
           </p>
           <div className="flex flex-col items-center gap-4">
              <div className="px-6 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm">
                 — Nhật Ký Quả Quýt
              </div>
              <div className="flex gap-2">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="w-2 h-2 rounded-full bg-brand-orange" />
                 ))}
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
