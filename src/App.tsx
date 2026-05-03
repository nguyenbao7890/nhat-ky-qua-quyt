import React, { useState, useEffect } from 'react';
import Navbar, { Hero } from './components/Header';
import AudioPlayer from './components/AudioPlayer';
import JournalSection from './components/JournalSection';
import StatusFeed from './components/StatusFeed';
import GuidedSection from './components/GuidedSection';
import RightSidebar from './components/RightSidebar';
import EQTest from './components/EQTest';
import Library, { SeasonId } from './components/Library';
import { SEASONS_DATA } from './seasonsData';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Loader2 } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'eq-test' | 'library'>('home');
  const [currentSeason, setCurrentSeason] = useState<SeasonId>('summer');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const activeSeason = SEASONS_DATA[currentSeason];

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
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#fff9f0] font-sans text-[#2d2d2d] selection:bg-[#f26622]/10 selection:text-[#f26622]">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8e8e8e] mb-10 px-2 transition-all">
                <span className="hover:text-[#f26622] cursor-pointer transition-colors" onClick={() => setCurrentView('home')}>4 Chương</span>
                <span className="text-[#e2e2e2] mx-1 opacity-50">›</span>
                <span className="hover:text-[#f26622] cursor-pointer transition-colors">
                  {activeSeason.name} — {activeSeason.theme}
                </span>
                <span className="text-[#e2e2e2] mx-1 opacity-50">›</span>
                <span className="text-[#f26622]">Podcast</span>
              </div>

              <Hero season={activeSeason} />

              <div className="flex flex-col xl:flex-row gap-12 items-start mt-12">
                {/* Main Content Area */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="mb-16">
                    <AudioPlayer season={activeSeason} />
                  </div>
                  
                  <div className="mb-16">
                    <GuidedSection season={activeSeason} />
                  </div>

                  <div className="mb-20">
                    <JournalSection />
                  </div>
                  
                  <div className="mb-20">
                    <StatusFeed />
                  </div>
                </div>

                {/* Right Sidebar */}
                <aside className="w-full xl:w-[340px] shrink-0 xl:sticky xl:top-28">
                   <RightSidebar season={activeSeason} />
                </aside>
              </div>
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
                <span className="text-[#f26622]">Test EQ</span>
              </div>
              <EQTest />
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
                <p className="font-display font-bold text-2xl tracking-tight">Nhật ký Quả Quýt</p>
                <p className="text-[11px] text-[#8e8e8e] font-bold uppercase tracking-[0.15em] opacity-60">Lắng nghe chính mình, từng chút một.</p>
             </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-[11px] font-bold text-[#8e8e8e] uppercase tracking-[0.2em] relative z-[50]">
            <button 
              type="button"
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="hover:text-[#f26622] transition-colors uppercase cursor-pointer pointer-events-auto block px-2 py-1"
            >
              Trang chủ
            </button>
            <button 
              type="button"
              onClick={() => {
                setCurrentView('library');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="hover:text-[#f26622] transition-colors uppercase cursor-pointer pointer-events-auto block px-2 py-1"
            >
              Thư viện
            </button>
            <a href="#" className="hover:text-[#f26622] transition-colors">Cộng đồng</a>
            <a href="#" className="hover:text-[#f26622] transition-colors">Về chúng tôi</a>
          </div>
          <p className="text-[11px] text-[#8e8e8e]/40 font-bold uppercase tracking-widest text-center md:text-right">© 2026 Nhật ký Quả Quýt</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
