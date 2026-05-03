import React from 'react';
import { motion } from 'motion/react';
import { Users, GraduationCap, Heart, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

const teamMembers = [
  { name: 'Nguyễn Thị Linh Chi', id: '22010387', role: 'Trưởng nhóm' },
  { name: 'Bùi Quỳnh Anh', id: '22050009', role: 'Nội dung' },
  { name: 'Trần Thị Khánh Linh', id: '23010632', role: 'Nội dung' },
  { name: 'Lê Thu Hằng', id: '22010342', role: 'Thiết kế' },
  { name: 'Nguyễn Thu Anh', id: '22010381', role: 'Podcast & Thiết kế' },
  { name: 'Phạm Ngọc Anh', id: '23010008', role: 'Podcast & Nội dung' },
];

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-24 relative z-10"
      >
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] shadow-sm">
             Đội ngũ sáng tạo
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-brand-text tracking-tight italic">
            Về Chúng Tôi
          </h1>
          <p className="text-lg md:text-xl text-brand-text/70 font-medium max-w-2xl mx-auto leading-relaxed">
            Chúng mình là nhóm sinh viên chuyên ngành Ngôn ngữ Anh đến từ <br />
            <span className="text-brand-orange font-bold">Trường Đại học Ngoại ngữ - ĐHQGHN (ULIS)</span>.
          </p>
          <div className="flex justify-center gap-4 text-brand-orange/30">
             {[...Array(3)].map((_, i) => (
                <Heart key={i} className={cn("w-4 h-4 fill-current", i === 1 && "scale-150 mx-2 text-brand-orange/50")} />
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="glass-card p-10 space-y-6 relative overflow-hidden group border-brand-orange/10 bg-white/90 hover:shadow-2xl transition-all">
            <div className="absolute -top-10 -right-10 text-9xl opacity-[0.03] group-hover:opacity-10 transition-opacity">🧡</div>
            <div className="w-16 h-16 rounded-3xl bg-brand-orange/10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-brand-orange" />
            </div>
            <h3 className="text-2xl font-display font-black text-brand-orange">Sứ mệnh của dự án</h3>
            <p className="text-brand-muted leading-relaxed font-medium">
              Dự án "Nhật ký Quả Quýt" ra đời từ mong muốn tạo ra một không gian số an toàn, nơi người trẻ (18-25 tuổi) có thể quay về lắng nghe chính mình, nuôi dưỡng EQ và học cách cân bằng giữa những "vị chua" của cuộc sống.
            </p>
          </div>

          <div className="glass-card p-10 space-y-6 relative overflow-hidden group border-brand-orange/10 bg-white/90 hover:shadow-2xl transition-all">
            <div className="absolute -top-10 -right-10 text-9xl opacity-[0.03] group-hover:opacity-10 transition-opacity">📖</div>
            <div className="w-16 h-16 rounded-3xl bg-brand-orange/10 flex items-center justify-center">
               <GraduationCap className="w-8 h-8 text-brand-orange" />
            </div>
            <h3 className="text-2xl font-display font-black text-brand-orange">Câu chuyện hình thành</h3>
            <p className="text-brand-muted leading-relaxed font-medium">
              Bắt đầu từ những bài tập nhỏ về tâm lý học và ngôn ngữ, chúng mình đã kết hợp tình yêu với điện ảnh và sự quan tâm đến sức khỏe tinh thần để xây dựng nên lộ trình 4 mùa đầy ý nghĩa này.
            </p>
          </div>

          <div className="glass-card p-10 bg-brand-orange text-white overflow-hidden relative shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform">
             <div className="absolute top-0 right-0 p-8 text-6xl opacity-20 transform rotate-12">🍊</div>
             <div>
               <h3 className="text-3xl font-display font-black mb-6">Lời chia sẻ</h3>
               <p className="text-lg italic font-serif leading-relaxed opacity-90 relative z-10 font-bold">
                 "Nhật ký Quả Quýt không chỉ là một trang web, nó là một cái ôm cho tâm hồn. Hy vọng bạn sẽ tìm thấy sự xoa dịu ở đây."
               </p>
             </div>
             <div className="mt-8 pt-8 border-t border-white/20 flex items-center justify-between">
                <span className="font-bold tracking-widest text-xs uppercase">— Nhóm 6 ULIS-VNU</span>
                <div className="flex -space-x-2">
                   {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40" />
                   ))}
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-16">
          <div className="text-center space-y-4">
             <h2 className="text-4xl font-display font-black text-brand-text">Thành viên dự án 🍊</h2>
             <p className="text-brand-muted text-lg font-medium">Nhóm sinh viên chuyên ngành Ngôn ngữ Anh — ĐH Ngoại Ngữ, ĐHQGHN</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-10 rounded-[40px] border border-brand-border/40 hover:border-brand-orange/40 hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-orange/[0.02] rounded-full group-hover:bg-brand-orange/[0.05]" />
                <div className="w-16 h-16 rounded-2xl bg-brand-cream border border-brand-border/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-3xl">
                   🍊
                </div>
                <h4 className="text-xl font-black text-brand-text mb-2 tracking-tight">{member.name}</h4>
                <p className="text-xs font-bold text-brand-orange uppercase tracking-[0.2em] mb-6">{member.role}</p>
                <div className="flex items-center justify-between text-xs font-bold text-brand-muted/40 border-t border-slate-50 pt-4">
                   <span>ULIS - VNU</span>
                   <span>ID: {member.id}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-brand-text text-white p-12 md:p-20 rounded-[80px] shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/40 to-transparent opacity-20 pointer-events-none" />
           <div className="text-center space-y-10 relative z-10">
              <h3 className="text-3xl md:text-5xl font-display font-black text-white">Kết nối với chúng mình 👋</h3>
              <div className="h-1 w-20 bg-brand-orange mx-auto rounded-full" />
              <p className="text-xl opacity-70 max-w-2xl mx-auto">
                 Nếu bạn có bất kỳ câu hỏi nào hoặc muốn chia sẻ hành trình của mình, đừng ngần ngại liên hệ nhé!
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
                <a href="mailto:thuanhnguyen382@gmail.com" className="group flex items-center gap-4 bg-white text-brand-text px-10 py-5 rounded-full font-black text-lg transition-all hover:scale-105 hover:bg-brand-orange hover:text-white shadow-xl shadow-black/20">
                   <Mail className="w-6 h-6" /> thuanhnguyen382@gmail.com
                </a>
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-black text-lg border border-white/20">
                   <Users className="w-6 h-6" /> Nhật ký Quả Quýt
                </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
