import React from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, Heart } from 'lucide-react';

export default function Home({ onExplore }: { onExplore: (seasonId?: any) => void }) {
  return (
    <div className="flex flex-col gap-24 py-10 relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[600px] rounded-[48px] overflow-hidden flex items-center px-12 md:px-20 mx-6">
        <img 
          src="https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=2000" 
          alt="Tangerines" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        
        <div className="relative z-10 max-w-2xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display font-medium text-5xl md:text-7xl leading-[1.1] mb-6 shadow-text">
              Khi đời ném cho ta những quả quýt chua...
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-10 font-medium italic">
              "Ta sẽ không vứt bỏ chúng, mà học cách thưởng thức từng múi, vắt lấy hương thơm và hong khô những vết thương."
            </p>
            <button 
              onClick={() => onExplore('spring')}
              className="bg-[#f26622] hover:bg-[#d9561a] text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#f26622]/20"
            >
              Bắt đầu hành trình
            </button>
          </motion.div>
        </div>
      </section>

      {}
      <section className="max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-8"
           >
              <div className="inline-flex items-center gap-2 text-brand-orange font-black text-xs uppercase tracking-[0.3em]">
                 <Heart className="w-4 h-4 fill-current" /> Hành trình của chúng mình
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-brand-text leading-tight">
                Cuộc đời luôn có <br />
                <span className="text-brand-orange">vị hăng & ngọt ngào</span>
              </h2>
              <p className="text-xl text-brand-muted leading-relaxed font-medium">
                Cũng giống như một bộ phim đầy màu sắc, hành trình khám phá EQ của "Nhật ký Quả Quýt" sẽ cùng bạn đi qua những cung bậc cảm xúc chân thực nhất. Từ những bỡ ngỡ ban đầu đến khoảnh khắc thấu hiểu bản thân trọn vẹn.
              </p>
           </motion.div>

           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
           >
              <div className="absolute -inset-4 bg-brand-orange/10 rounded-[64px] blur-2xl -z-10" />
              <img 
                src="flim.png" 
                className="w-full h-auto rounded-[48px] shadow-2xl border-8 border-white"
              />
              <div className="absolute bottom-10 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-brand-border max-w-[200px] hidden md:block">
                 <p className="text-xs font-black text-brand-orange uppercase tracking-widest mb-2">Cảm hứng</p>
                 <p className="text-sm font-bold text-brand-text italic">"Hãy tin vào những ngày nắng đẹp sau cơn mưa."</p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-24"
        >
          <div className="text-center space-y-8 relative">
            <motion.div 
               animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="flex justify-center mb-4"
            >
               <div className="relative">
                 <img src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" alt="Icon" className="w-24 h-24 drop-shadow-2xl" />
                 <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
               </div>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-brand-text leading-tight">
              Chúng mình là Nhật Ký Quả Quýt 🍊
            </h2>
            <div className="relative">
              <div className="absolute -left-4 top-0 text-6xl text-brand-orange opacity-20 font-serif">“</div>
              <p className="text-xl md:text-2xl text-brand-muted leading-relaxed font-serif max-w-4xl mx-auto px-8">
                Nhật ký Quả Quýt là nền tảng huấn luyện EQ cá nhân hóa hiện đại, tiếp cận hành trình khám phá nội tâm một cách trực quan và sâu sắc. Với lộ trình 4 mùa <span className="text-brand-orange font-bold text-2xl">Xuân – Hạ – Thu – Đông</span> kết hợp bài trắc nghiệm tương tác, podcast chữa lành và nhật ký phản chiếu cảm xúc...
              </p>
              <div className="absolute -right-4 bottom-0 text-6xl text-brand-orange opacity-20 font-serif translate-y-4">”</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[60px] border border-brand-border/40 shadow-xl space-y-8 relative overflow-hidden group"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-colors" />
              <div className="w-20 h-20 rounded-[32px] bg-brand-orange/10 flex items-center justify-center relative">
                <Sparkles className="w-10 h-10 text-brand-orange" />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-xs">🍊</div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-display font-black text-brand-orange">Tầm nhìn & Sứ mệnh 🌟</h3>
                <p className="text-brand-muted leading-relaxed font-medium text-lg">
                  “Nhật ký Quả Quýt” hướng đến trở thành một không gian số an toàn và đáng tin cậy, nơi người trẻ có thể quay về lắng nghe chính mình, nuôi dưỡng trí tuệ cảm xúc và học cách sống cân bằng giữa những “vị” khác nhau của cuộc đời.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-brand-cream border-2 border-brand-orange/20 p-12 rounded-[60px] shadow-xl space-y-8 relative overflow-hidden group"
            >
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-colors" />
              <div className="w-20 h-20 rounded-[32px] bg-white flex items-center justify-center relative shadow-sm">
                <Heart className="w-10 h-10 text-brand-orange fill-brand-orange/10" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold">Cute</div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-display font-black text-brand-orange">Ẩn dụ Quả Quýt 🍊</h3>
                <p className="text-brand-muted leading-relaxed font-medium text-lg">
                  Quả quýt biểu tượng cho những mất mát và cả thành quả. Vừa có lúc chua chát, vừa có khoảnh khắc ngọt ngào. Lớp vỏ sần sùi bảo vệ những múi mọng nước bên trong...
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Journey Steps */}
      <section className="bg-white/40 rounded-[64px] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-20">Hành trình 4 mùa của bạn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'spring', title: 'Chương Xuân', desc: 'Nhận diện bản thân & Giá trị sống', icon: '🌱' },
              { id: 'summer', title: 'Chương Hạ', desc: 'Quản trị cảm xúc & Biến cố', icon: '☀️' },
              { id: 'autumn', title: 'Chương Thu', desc: 'Thấu cảm & Kết nối lại', icon: '🍂' },
              { id: 'winter', title: 'Chương Đông', desc: 'Chấp nhận, Buông bỏ & Tỉnh thức', icon: '❄️' },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onExplore(step.id)}
              >
                <div className="bg-white h-full p-8 rounded-[40px] border border-brand-border/40 hover:border-brand-orange/40 hover:shadow-2xl hover:shadow-brand-orange/10 transition-all">
                  <div className="w-16 h-16 bg-[#fff9f0] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-3">{step.title}</h4>
                  <p className="text-sm text-brand-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Quote */}
      <section className="py-20 text-center max-w-3xl mx-auto px-6">
        <Quote className="w-12 h-12 text-brand-orange/20 mx-auto mb-8" />
        <p className="text-3xl font-display font-medium text-brand-text leading-tight mb-12">
          "Hạnh phúc không đến từ việc né tránh khổ đau, mà từ việc hiểu và ôm lấy nó."
        </p>
        <div className="h-px w-24 bg-brand-orange/20 mx-auto" />
      </section>
    </div>
  );
}
