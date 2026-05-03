import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Flower, Sun, Leaf, Snowflake, ArrowRight } from 'lucide-react';

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

interface LibraryProps {
  onSelectSeason: (seasonId: SeasonId) => void;
}

const seasons = [
  {
    id: 'spring' as SeasonId,
    name: 'Xuân',
    theme: 'Khởi đầu mới',
    description: 'Gieo mầm hy vọng và lắng nghe sự sống đâm chồi trong tâm hồn.',
    icon: Flower,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    hoverBorder: 'hover:border-emerald-300',
    img: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'summer' as SeasonId,
    name: 'Hạ',
    theme: 'Quản trị biến cố',
    description: 'Trở về với chính mình giữa những biến động gay gắt của cuộc đời.',
    icon: Sun,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/5',
    borderColor: 'border-brand-orange/10',
    hoverBorder: 'hover:border-brand-orange/30',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073'
  },
  {
    id: 'autumn' as SeasonId,
    name: 'Thu',
    theme: 'Buông bỏ nhẹ nhàng',
    description: 'Học cách chấp nhận và để những gì không còn phù hợp rơi rụng.',
    icon: Leaf,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    hoverBorder: 'hover:border-amber-300',
    img: 'https://images.unsplash.com/photo-1507783548227-544c3b8fc065?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'winter' as SeasonId,
    name: 'Đông',
    theme: 'Tĩnh lặng nội tại',
    description: 'Tìm thấy sự ấm áp và bình yên trong những khoảng lặng sâu nhất.',
    icon: Snowflake,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    hoverBorder: 'hover:border-blue-300',
    img: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&q=80&w=1974'
  }
];

export default function Library({ onSelectSeason }: LibraryProps) {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-display font-black text-[#2d2d2d] mb-6">Thư viện 4 Mùa</h1>
        <p className="text-xl text-[#8e8e8e] font-medium max-w-2xl mx-auto leading-relaxed">
          Mỗi mùa mang một thông điệp riêng. Hãy chọn một "chương" cảm xúc <br className="hidden md:block" /> mà bạn đang muốn kết nối lúc này.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {seasons.map((season, i) => (
          <motion.div
            key={season.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => onSelectSeason(season.id)}
            className={cn(
              "group relative overflow-hidden rounded-[48px] bg-white border-2 p-8 cursor-pointer transition-all duration-500",
              season.borderColor,
              season.hoverBorder,
              "hover:shadow-[0_30px_80px_-20px_rgba(45,45,45,0.08)]"
            )}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-48 h-48 rounded-[32px] overflow-hidden shrink-0 shadow-inner">
                <img 
                  src={season.img} 
                  alt={season.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm mb-4">
                  <season.icon className={cn("w-6 h-6", season.color)} />
                </div>
                <h3 className="text-3xl font-display font-black text-[#2d2d2d] mb-2">Chương {season.name}</h3>
                <p className={cn("font-bold uppercase tracking-widest text-sm mb-4", season.color)}>
                  — {season.theme}
                </p>
                <p className="text-[#8e8e8e] font-medium leading-relaxed mb-6">
                  {season.description}
                </p>
                <button className={cn(
                  "inline-flex items-center gap-2 font-black text-sm uppercase tracking-wider transition-all",
                  season.color,
                  "group-hover:gap-4"
                )}>
                  Khám phá ngay <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className={cn(
              "absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700",
              season.bgColor
            )} />
          </motion.div>
        ))}
      </div>

      <div className="mt-24 bg-brand-orange/[0.03] rounded-[48px] p-12 text-center border-2 border-dashed border-brand-orange/10">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm mx-auto mb-8 flex items-center justify-center text-3xl">
          📦
        </div>
        <h3 className="text-2xl font-display font-black text-[#2d2d2d] mb-4">Bạn đang tìm kiếm điều gì khác?</h3>
        <p className="text-[#8e8e8e] font-medium mb-8 max-w-md mx-auto">
          Thư viện của chúng tôi vẫn đang tiếp tục được lấp đầy bởi những mẩu chuyện và cảm xúc mới mỗi ngày.
        </p>
        <button className="text-brand-orange font-black uppercase tracking-widest text-sm hover:underline underline-offset-8">
          Gửi yêu cầu chủ đề podcast mới
        </button>
      </div>
    </div>
  );
}
