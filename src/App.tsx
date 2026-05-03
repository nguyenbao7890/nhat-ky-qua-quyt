import React, { useState, useEffect } from 'react';
import Navbar, { Hero } from './components/Header';
import Home from './components/Home';
import StorySection from './components/StorySection';
import AudioPlayer from './components/AudioPlayer';
import JournalSection from './components/JournalSection';
import StatusFeed from './components/StatusFeed';
import GuidedSection from './components/GuidedSection';
import RightSidebar from './components/RightSidebar';
import EpisodeList from './components/EpisodeList';
import EQTest from './components/EQTest';
import JournalModal from './components/JournalModal';
import CloudModal from './components/CloudModal';
import Library, { SeasonId } from './components/Library';
import ConclusionPage from './components/ConclusionPage';
import AboutUs from './components/AboutUs';
import { SEASONS_DATA } from './seasonsData';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Loader2, Gauge, ArrowRight } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'season' | 'eq-test' | 'conclusion' | 'about'>('home');
  const [currentSeason, setCurrentSeason] = useState<SeasonId>('spring');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [instruction, setInstruction] = useState<{ isOpen: boolean; title: string; content: string }>({
    isOpen: false,
    title: '',
    content: ''
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const activeSeason = SEASONS_DATA[currentSeason];

  const handleActionClick = (actionText: string) => {
    const text = actionText.toLowerCase();
    
    if (text.includes('nhật ký')) {
      setIsJournalOpen(true);
      return;
    }

    let title = actionText;
    let content = '';

    if (text.includes('lắng nghe') || text.includes('nghe')) {
      content = 'Hãy dành ít nhất 10 phút ngồi trong không gian yên tĩnh, không điện thoại. Hãy cảm nhận từng nhịp thở, từng âm thanh nhỏ của cuộc sống xung quanh để tìm lại sự tĩnh lặng bên trong mình.🍊';
    } else if (text.includes('viết') || text.includes('vẽ') || text.includes('thư')) {
      content = 'Hãy chuẩn bị giấy và bút. Hãy để cảm xúc tuôn trào qua từng nét vẽ hoặc dòng chữ. Đừng đánh giá, đừng sửa lỗi, chỉ cần để trái tim lên tiếng. Đây là cách tuyệt vời để hữu hình hóa những điều đang diễn ra trong tâm trí bạn.✨';
    } else if (text.includes('gọi') || text.includes('trò chuyện') || text.includes('kết nối')) {
      content = 'Hãy nhấc máy lên và kết nối với một người bạn tin tưởng. Đôi khi chỉ cần một câu hỏi "Bạn có khỏe không?" hoặc chia sẻ một múi quýt nhỏ cũng đủ để thấy ấm lòng hơn. Chia sẻ là cách để gánh nặng trở nên nhẹ bớt.❤️';
    } else if (text.includes('đi bộ') || text.includes('vận động') || text.includes('gieo')) {
      content = 'Hãy dành thời gian chăm sóc cho tâm hồn như chăm sóc một mầm cây. Hãy đứng dậy, vươn vai hoặc đi bộ chậm rãi. Cảm nhận bàn chân chạm đất, gió lướt qua da. Sự chuyển động giúp dòng chảy cảm xúc không bị tắc nghẽn.🌱';
    } else if (text.includes('uống') || text.includes('thưởng thức') || text.includes('chữa lành') || text.includes('thanh lọc')) {
      content = 'Hãy hít một hơi thật sâu. Tưởng tượng em đang được bao bọc bởi sự ấm áp. Mọi cảm xúc tiêu cực đang dần tan ra theo hơi thở. Em xứng đáng được bình yên và yêu thương. Hãy thưởng thức một tách trà nóng hoặc một múi quýt thật chậm nhé.🍊';
    } else if (text.includes('buông') || text.includes('kỳ vọng') || text.includes('thiền')) {
      content = 'Nhắm mắt lại trong 3 phút. Chấp nhận rằng mọi thứ đều vô thường. Những gì đã qua hãy để nó qua, những gì sắp tới hãy cứ để nó tới. Em chỉ cần hiện diện ở đây, ngay bây giờ. Hãy thả lỏng đôi vai và mỉm cười với chính mình.❄️';
    } else {
      content = 'Đây là một hoạt động tuyệt vời để thực hành nuôi dưỡng EQ của em. Hãy dành tâm trí trọn vẹn và thực hiện nó một cách chậm rãi nhất có thể nhé. Trái tim em sẽ tìm được câu trả lời. 🍊';
    }

    setInstruction({ isOpen: true, title, content });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Anonymous sign-in failed:", error);
        }
      } else {
        setUser(currentUser);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectSeason = (seasonId: SeasonId) => {
    setCurrentSeason(seasonId);
    setCurrentTrackIndex(0);
    setCurrentView('season');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: any) => {
    if (['spring', 'summer', 'autumn', 'winter'].includes(view)) {
      handleSelectSeason(view as SeasonId);
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff9f0]">
        <div className="flex flex-col items-center gap-4">
          <img src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" alt="Logo" className="w-16 h-16 animate-bounce" />
          <p className="text-sm font-bold uppercase tracking-widest text-[#f26622]">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9f0] font-sans text-[#2d2d2d] selection:bg-[#f26622]/10 selection:text-[#f26622] relative overflow-x-hidden">
      {/* Tangerine Pattern for Main Pages */}
      {['home', 'about', 'conclusion'].includes(currentView) && (
        <div className="absolute inset-0 tangerine-pattern pointer-events-none -z-10" />
      )}
      
      <Navbar currentView={currentView} currentSeason={currentSeason} onNavigate={handleNavigate} />
      
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <Home onExplore={(seasonId) => handleSelectSeason(seasonId || 'spring')} />
            </motion.div>
          ) : currentView === 'season' ? (
            <motion.div
              key="season"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8e8e8e] mb-10 px-2 transition-all">
                <span className="hover:text-[#f26622] cursor-pointer transition-colors" onClick={() => setCurrentView('home')}>Trang chủ</span>
                <span className="text-[#e2e2e2] mx-1 opacity-50">›</span>
                <span className="hover:text-[#f26622] cursor-pointer transition-colors">
                  Chương {activeSeason.name} — {activeSeason.theme}
                </span>
                <span className="text-[#e2e2e2] mx-1 opacity-50">›</span>
                <span className="text-[#f26622]">Podcast</span>
              </div>

              <Hero season={activeSeason} />

              <div className="space-y-16 mt-12">
                {/* Top Section: Podcast & Episode List */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <AudioPlayer 
                      season={activeSeason} 
                      currentTrackIndex={currentTrackIndex}
                      onTrackChange={setCurrentTrackIndex}
                    />
                  </div>
                  <div className="h-full">
                    <EpisodeList 
                      season={activeSeason} 
                      currentTrackIndex={currentTrackIndex}
                      onSelectTrack={setCurrentTrackIndex}
                    />
                  </div>
                </div>

                {/* Story Section: Spans full width */}
                <div className="w-full">
                  <StorySection season={activeSeason} />
                </div>

                {/* Guided Section: Now fits below the main story to fill the page bridge */}
                <div className="w-full">
                  <GuidedSection season={activeSeason} />
                </div>
                
                {/* Horizontal Grid for Community Content and Practice Sidebar */}
                <div className="flex flex-col xl:flex-row gap-12 items-start">
                  {/* Left Column: Sharing and Community Feed */}
                  <div className="flex-1 min-w-0 w-full space-y-16">
                    {/* Seasonal EQ Test Section */}
                    <div className="glass-card p-10 border-brand-orange/10 bg-gradient-to-br from-white to-brand-orange/[0.02]">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", activeSeason.accentColor)}>
                          <Gauge className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted">Hành trình EQ</span>
                      </div>
                      <h3 className="text-2xl font-display font-bold mb-3">{activeSeason.eqTest.title}</h3>
                      <p className="text-brand-muted leading-relaxed mb-8 max-w-2xl">
                        {activeSeason.eqTest.description}
                      </p>
                      <button 
                        onClick={() => setCurrentView('eq-test')}
                        className={cn("px-8 py-4 rounded-full text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3", activeSeason.accentColor)}
                      >
                        Bắt đầu bài test <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mb-10">
                      <JournalSection />
                    </div>
                    
                    <div className="mb-20">
                      <StatusFeed />
                    </div>
                  </div>

                  {/* Right Sidebar: Sticky practice actions */}
                  <aside className="w-full xl:w-[340px] shrink-0 xl:sticky xl:top-28">
                    <RightSidebar 
                      season={activeSeason} 
                      onAction={handleActionClick}
                      onOpenJournal={() => setIsJournalOpen(true)}
                    />
                  </aside>
                </div>
              </div>

              <JournalModal 
                isOpen={isJournalOpen} 
                onClose={() => setIsJournalOpen(false)} 
                accentColor={activeSeason.accentColor} 
              />

              <CloudModal 
                isOpen={instruction.isOpen}
                onClose={() => setInstruction(prev => ({ ...prev, isOpen: false }))}
                title={instruction.title}
                content={instruction.content}
              />
            </motion.div>
          ) : currentView === 'eq-test' ? (
            <motion.div
              key="eq-test"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="pt-10"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8e8e8e] mb-10 px-2">
                <span className="hover:text-[#f26622] cursor-pointer transition-colors" onClick={() => setCurrentView('home')}>Trang chủ</span>
                <span className="text-[#e2e2e2] mx-1 opacity-50">›</span>
                <span className="hover:text-[#f26622] cursor-pointer transition-colors" onClick={() => handleSelectSeason(activeSeason.id)}>Chương {activeSeason.name}</span>
                <span className="text-[#e2e2e2] mx-1 opacity-50">›</span>
                <span className="text-[#f26622]">Bài test EQ</span>
              </div>
              <EQTest season={activeSeason} onBack={() => setCurrentView('season')} />
            </motion.div>
          ) : currentView === 'conclusion' ? (
            <motion.div
              key="conclusion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8e8e8e] mb-10 px-2">
                <span className="hover:text-[#f26622] cursor-pointer transition-colors" onClick={() => setCurrentView('home')}>Trang chủ</span>
                <span className="text-[#e2e2e2] mx-1 opacity-50">›</span>
                <span className="text-[#f26622]">Lời kết</span>
              </div>
              <ConclusionPage />
            </motion.div>
          ) : currentView === 'about' ? (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8e8e8e] mb-10 px-2">
                <span className="hover:text-[#f26622] cursor-pointer transition-colors" onClick={() => setCurrentView('home')}>Trang chủ</span>
                <span className="text-[#e2e2e2] mx-1 opacity-50">›</span>
                <span className="text-[#f26622]">Về chúng tôi</span>
              </div>
              <AboutUs />
            </motion.div>
          ) : (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="pt-10"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8e8e8e] mb-10 px-2">
                <span className="hover:text-[#f26622] cursor-pointer transition-colors" onClick={() => setCurrentView('home')}>Trang chủ</span>
                <span className="text-[#e2e2e2] mx-1 opacity-50">›</span>
                <span className="text-[#f26622]">Thư viện</span>
              </div>
              <Library onSelectSeason={handleSelectSeason} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white/40 border-t border-[#e2e2e2] py-20 mt-20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-5">
             <img src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" alt="Logo" className="w-12 h-12" />
             <div>
                <p className="font-serif font-black text-2xl tracking-tight italic">Nhật ký Quả Quýt</p>
                <p className="text-[11px] text-[#8e8e8e] font-bold uppercase tracking-[0.15em] opacity-60">Lắng nghe chính mình, từng chút một.</p>
             </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-[11px] font-bold text-[#8e8e8e] uppercase tracking-[0.2em] relative z-[50]">
            <button 
              type="button"
              onClick={() => handleNavigate('home')} 
              className="hover:text-[#f26622] transition-colors uppercase cursor-pointer pointer-events-auto block px-2 py-1"
            >
              Trang chủ
            </button>
            <button 
              type="button"
              onClick={() => handleNavigate('spring')} 
              className="hover:text-[#f26622] transition-colors uppercase cursor-pointer pointer-events-auto block px-2 py-1"
            >
              Chương Xuân
            </button>
            <button 
              type="button"
              onClick={() => handleNavigate('summer')} 
              className="hover:text-[#f26622] transition-colors uppercase cursor-pointer pointer-events-auto block px-2 py-1"
            >
              Chương Hạ
            </button>
            <button 
              type="button"
              onClick={() => handleNavigate('autumn')} 
              className="hover:text-[#f26622] transition-colors uppercase cursor-pointer pointer-events-auto block px-2 py-1"
            >
              Chương Thu
            </button>
            <button 
              type="button"
              onClick={() => handleNavigate('winter')} 
              className="hover:text-[#f26622] transition-colors uppercase cursor-pointer pointer-events-auto block px-2 py-1"
            >
              Chương Đông
            </button>
            <button 
              type="button"
              onClick={() => handleNavigate('conclusion')} 
              className="hover:text-[#f26622] transition-colors uppercase cursor-pointer pointer-events-auto block px-2 py-1"
            >
              Lời kết
            </button>
            <button 
              type="button"
              onClick={() => handleNavigate('about')} 
              className="hover:text-[#f26622] transition-colors uppercase cursor-pointer pointer-events-auto block px-2 py-1"
            >
              Về chúng tôi
            </button>
          </div>
          <p className="text-[11px] text-[#8e8e8e]/40 font-bold uppercase tracking-widest text-center md:text-right">© 2026 Nhật ký Quả Quýt</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
