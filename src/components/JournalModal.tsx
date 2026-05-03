import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Clock, Calendar, History, Trash2, Edit3 } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { handleFirestoreError } from '../lib/firebase-utils';
import { OperationType } from '../types';

interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  createdAt: any;
  timestamp: number;
  displayDate?: string;
  displayTime?: string;
}

export default function JournalModal({ isOpen, onClose, accentColor }: { isOpen: boolean; onClose: () => void; accentColor: string }) {
  const [view, setView] = useState<'write' | 'history'>('write');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<JournalEntry[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    if (isOpen && view === 'history') {
      fetchHistory();
    }
  }, [isOpen, view]);

  const fetchHistory = async () => {
    if (!auth.currentUser) return;
    setIsLoadingHistory(true);
    try {
      const q = query(
        collection(db, 'journal_entries'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const entries: JournalEntry[] = [];
      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() } as JournalEntry);
      });
      setHistory(entries);
    } catch (error) {
      console.error('Error fetching history:', error);
      // Fallback for missing index during initial setup
      const fallbackQuery = query(
        collection(db, 'journal_entries'),
        where('userId', '==', auth.currentUser.uid)
      );
      const fallbackSnapshot = await getDocs(fallbackQuery);
      const fallbackEntries: JournalEntry[] = [];
      fallbackSnapshot.forEach((doc) => {
        fallbackEntries.push({ id: doc.id, ...doc.data() } as JournalEntry);
      });
      fallbackEntries.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setHistory(fallbackEntries);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim() || !auth.currentUser) return;
    
    setIsSaving(true);
    try {
      await addDoc(collection(db, 'journal_entries'), {
        userId: auth.currentUser.uid,
        content: content.trim(),
        createdAt: serverTimestamp(),
        timestamp: Date.now(),
        displayDate: dateStr,
        displayTime: timeStr
      });
      setContent('');
      setView('history');
      fetchHistory();
    } catch (error) {
      console.error('Error saving journal: ', error);
      handleFirestoreError(error, OperationType.CREATE, 'journal_entries');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'journal_entries', id));
      setHistory(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `journal_entries/${id}`);
    }
  };

  const formatTimestamp = (entry: JournalEntry) => {
    if (entry.displayDate && entry.displayTime) {
      return `${entry.displayDate} - ${entry.displayTime}`;
    }
    const date = entry.timestamp ? new Date(entry.timestamp) : (entry.createdAt instanceof Timestamp ? entry.createdAt.toDate() : new Date());
    return date.toLocaleString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-text/60 backdrop-blur-xl"
          />

          <motion.div 
            initial={{ scale: 0.95, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 100 }}
            className="relative w-full h-full md:w-[90vw] md:h-[90vh] md:rounded-[48px] bg-[#fffdfa] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook.png")' }} />
            
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-8 bg-white/40 backdrop-blur-sm shrink-0 border-b border-brand-border/10">
               <div className="flex gap-2 p-1 bg-brand-cream/50 rounded-full border border-brand-border/30">
                  <button 
                    onClick={() => setView('write')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${view === 'write' ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'text-brand-muted hover:bg-white/80'}`}
                  >
                    <Edit3 className="w-4 h-4" /> Viết mới
                  </button>
                  <button 
                    onClick={() => setView('history')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${view === 'history' ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'text-brand-muted hover:bg-white/80'}`}
                  >
                    <History className="w-4 h-4" /> Lịch sử
                  </button>
               </div>
               
               <div className="flex items-center gap-4">
                  {view === 'write' && (
                    <button 
                      onClick={handleSave}
                      disabled={isSaving || !content.trim()}
                      className="flex items-center gap-3 bg-brand-orange text-white px-8 py-3 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-orange/20 disabled:opacity-50"
                    >
                      {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <Save className="w-4 h-4" />}
                      LƯU LẠI
                    </button>
                  )}
                  <button 
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/80 border border-brand-border/40 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>
               </div>
            </div>

            {/* Content View */}
            <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide">
              {view === 'write' ? (
                <div className="px-6 md:px-20 py-12 md:py-20 max-w-4xl mx-auto min-h-full">
                  <div className="flex flex-col mb-12 border-l-4 border-brand-orange/20 pl-6">
                     <div className="flex items-center gap-3 text-brand-muted font-black text-xs mb-1 uppercase tracking-[0.3em] opacity-40">
                        <Calendar className="w-4 h-4" /> {dateStr}
                     </div>
                     <div className="flex items-center gap-2 text-brand-orange font-black text-xs uppercase tracking-[0.3em]">
                        <Clock className="w-4 h-4" /> {timeStr}
                     </div>
                  </div>
                  
                  <textarea 
                    autoFocus
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Lúc này, em đang cảm thấy thế nào? Hãy cứ để từng dòng chữ tuôn trào một cách tự nhiên nhất... 🍊"
                    className="w-full min-h-[500px] bg-transparent resize-none outline-none font-serif text-2xl md:text-3xl leading-[2] text-brand-text placeholder:text-slate-200"
                  />
                </div>
              ) : (
                <div className="px-6 md:px-20 py-12 max-w-4xl mx-auto space-y-8">
                  {isLoadingHistory ? (
                    <div className="flex flex-col items-center justify-center py-32 opacity-20">
                       <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent animate-spin rounded-full mb-6" />
                       <p className="font-bold uppercase tracking-widest text-xs">Đang tìm lại những dòng nhật ký...</p>
                    </div>
                  ) : history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 opacity-30 text-center">
                       <div className="w-24 h-24 rounded-full bg-brand-cream flex items-center justify-center mb-8">
                          <History className="w-12 h-12 text-brand-muted" />
                       </div>
                       <h3 className="text-2xl font-display font-bold mb-3">Vườn ký ức còn trống</h3>
                       <p className="text-sm font-medium mb-8">Hành trình vạn dặm bắt đầu từ một mầm nhỏ. <br />Hãy viết múi quýt đầu tiên của em nhé.</p>
                       <button 
                         onClick={() => setView('write')} 
                         className="bg-brand-orange text-white px-10 py-4 rounded-full font-black text-sm shadow-xl shadow-brand-orange/20 hover:scale-105 transition-all"
                       >
                         BẮT ĐẦU VIẾT
                       </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-8">
                      {history.map((entry) => (
                        <motion.div 
                          key={entry.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white p-8 md:p-12 rounded-[40px] border border-brand-border/30 shadow-[0_20px_50px_-20px_rgba(45,45,45,0.05)] space-y-6 group relative"
                        >
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 bg-brand-cream/80 px-4 py-2 rounded-full border border-brand-border/20 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">
                                 <Clock className="w-3.5 h-3.5 text-brand-orange" />
                                 {formatTimestamp(entry)}
                              </div>
                              <button 
                                onClick={() => handleDelete(entry.id)}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-200 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                              >
                                 <Trash2 className="w-5 h-5" />
                              </button>
                           </div>
                           <p className="font-serif text-xl md:text-2xl leading-[1.8] text-brand-text/90 whitespace-pre-wrap">
                              {entry.content}
                           </p>
                           
                           {/* Little tangerine icon in history entries */}
                           <div className="absolute right-8 bottom-8 opacity-[0.03] scale-150 grayscale">
                              <img src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" alt="Orange" className="w-12 h-12" />
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
