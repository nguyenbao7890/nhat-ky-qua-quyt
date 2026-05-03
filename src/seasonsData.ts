import { Track } from './types';

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonInfo {
  id: SeasonId;
  name: string;
  theme: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  color: string;
  accentColor: string;
  quote: string;
  actions: { icon: string; text: string }[];
  tracks: Track[];
}

export const SEASONS_DATA: Record<SeasonId, SeasonInfo> = {
  spring: {
    id: 'spring',
    name: 'Xuân',
    theme: 'Khởi đầu mới',
    heroTitle: 'Gieo mầm hy vọng',
    heroSubtitle: 'Hãy để những hạt mầm của sự tử tế và hy vọng nảy nở trong trái tim bạn vào những ngày đầu năm.',
    heroImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=2070',
    color: '#10b981',
    accentColor: 'bg-emerald-500',
    quote: 'Có những nhành xuân không nảy mầm từ nắng ấm, mà nảy mầm từ sự kiên nhẫn khi ta chờ đợi chính mình.',
    actions: [
      { icon: '🌱', text: 'Gieo 1 ý niệm tích cực' },
      { icon: '🌸', text: 'Cảm nhận hơi thở mùa xuân' },
      { icon: '✨', text: 'Viết lời cảm ơn cuộc đời' }
    ],
    tracks: [
      {
        id: 'sp1',
        title: 'Lời chào từ mầm xanh',
        subtitle: 'Chương Xuân — Khởi đầu mới',
        duration: '06:30',
        audioUrl: '/xuan.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=2070',
      },
      {
        id: 'sp2',
        title: 'Thanh lọc tâm hồn',
        subtitle: 'Xuân — Khởi đầu mới',
        duration: '07:15',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a1b5d1.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1458006780332-9742c388bc59?auto=format&fit=crop&q=80&w=2070',
      }
    ]
  },
  summer: {
    id: 'summer',
    name: 'Hạ',
    theme: 'Quản trị biến cố',
    heroTitle: 'Khi đời làm mình nóng rát',
    heroSubtitle: 'Một đoạn dừng lại để em không bị cảm xúc cuốn đi. Trở về với chính mình giữa nắng hạ gay gắt.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073',
    color: '#f26622',
    accentColor: 'bg-brand-orange',
    quote: 'Có những mùa hạ không đi qua bằng tiếng cười, mà đi qua bằng những lần ta đủ can đảm để ngồi yên cùng chính mình.',
    actions: [
      { icon: '☀️', text: 'Viết 3 điều em đang cảm thấy' },
      { icon: '🧡', text: 'Nhắn cho một người tin cậy' },
      { icon: '💨', text: 'Nghỉ 5 phút thở sâu' }
    ],
    tracks: [
      {
        id: '1',
        title: 'Khi đời làm mình nóng rát',
        subtitle: 'Chương Hạ — Quản trị biến cố',
        duration: '07:12',
        audioUrl: '/ha.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073',
      },
      {
        id: '2',
        title: 'Nỗi buồn không phải kẻ thù',
        subtitle: 'Hạ — Quản trị biến cố',
        duration: '06:45',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/01/21/audio_31b51829e0.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=2070',
      }
    ]
  },
  autumn: {
    id: 'autumn',
    name: 'Thu',
    theme: 'Buông bỏ nhẹ nhàng',
    heroTitle: 'Rụng rơi để bay xa',
    heroSubtitle: 'Có những điều cần được buông bỏ như những chiếc lá mùa thu, để cây đời được chuẩn bị cho những hành trình tiếp theo.',
    heroImage: 'https://images.unsplash.com/photo-1507783548227-544c3b8fc065?auto=format&fit=crop&q=80&w=2070',
    color: '#d97706',
    accentColor: 'bg-amber-600',
    quote: 'Mùa thu dạy chúng ta rằng vẻ đẹp của việc buông bỏ cũng rực rỡ như lúc bắt đầu, nếu ta biết cách trân trọng những gì còn lại.',
    actions: [
      { icon: '🍂', text: 'Buông bỏ 1 nỗi lo âu' },
      { icon: '☕', text: 'Thưởng thức trà tĩnh lặng' },
      { icon: '📔', text: 'Viết nhật ký chiêm nghiệm' }
    ],
    tracks: [
      {
        id: 'au1',
        title: 'Tiếng thở của lá',
        subtitle: 'Chương Thu — Buông bỏ nhẹ nhàng',
        duration: '05:50',
        audioUrl: '/thu.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=2070',
      },
      {
        id: 'au2',
        title: 'Dòng sông buông bỏ',
        subtitle: 'Thu — Buông bỏ nhẹ nhàng',
        duration: '08:20',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/01/18/audio_6eba30d510.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1507783548227-544c3b8fc065?auto=format&fit=crop&q=80&w=2070',
      }
    ]
  },
  winter: {
    id: 'winter',
    name: 'Đông',
    theme: 'Tĩnh lặng nội tại',
    heroTitle: 'Ủ ấm mầm xanh nội tâm',
    heroSubtitle: 'Mùa đông không phải để lụi tàn, mà là lúc để tích tụ năng lượng cho một mùa xuân rạng rỡ hơn.',
    heroImage: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&q=80&w=1974',
    color: '#3b82f6',
    accentColor: 'bg-blue-500',
    quote: 'Trong sự tĩnh lặng của mùa đông, ta không chỉ tìm thấy sự lạnh giá, mà còn tìm thấy ngọn lửa ấm áp của sự thấu hiểu chính mình.',
    actions: [
      { icon: '❄️', text: 'Tĩnh tâm trong 10 phút' },
      { icon: '🔥', text: 'Tìm kiếm ngọn lửa nội tại' },
      { icon: '🤝', text: 'Kết nối sâu sắc với người thân' }
    ],
    tracks: [
      {
        id: 'wi1',
        title: 'Hơi ấm trong tuyết lạnh',
        subtitle: 'Chương Đông — Tĩnh lặng nội tại',
        duration: '08:10',
        audioUrl: '/dong.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=2070',
      },
      {
        id: 'wi2',
        title: 'Bên đống lửa nhỏ',
        subtitle: 'Đông — Tĩnh lặng nội tại',
        duration: '09:45',
        audioUrl: 'https://cdn.pixabay.com/audio/2023/11/24/audio_3d6b0a1d4b.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&q=80&w=1974',
      }
    ]
  }
};
