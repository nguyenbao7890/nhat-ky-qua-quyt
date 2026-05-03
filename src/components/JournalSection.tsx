import React, { useState } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Send, Hash, Sparkles } from 'lucide-react';
import { handleFirestoreError } from '../lib/firebase-utils';
import { OperationType } from '../types';

import { getRandomIdentity } from '../lib/userUtils';

export default function JournalSection() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const currentWordCount = getWordCount(content);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth.currentUser) return;
    if (!content.trim()) return;

    setLoading(true);
    const identity = getRandomIdentity();

    try {
      await addDoc(collection(db, 'statuses'), {
        content: content.trim(),
        authorId: auth.currentUser?.uid,
        anonymousName: identity.name,
        avatarEmoji: identity.avatar,
        createdAt: serverTimestamp(),
      });
      setContent('');
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Không thể chia sẻ lúc này. Vui lòng kiểm tra kết nối mạng.');
      handleFirestoreError(error, OperationType.CREATE, 'statuses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-12 mb-12 bg-white/40 rounded-[48px] border-none shadow-[0_40px_100px_-30px_rgba(242,102,34,0.08)] relative overflow-hidden group">
      {/* Decorative stars/sparkles as seen in mockup */}
      <div className="absolute top-10 right-10 pointer-events-none opacity-[0.08] lg:opacity-[0.12] transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-110">
         <svg width="160" height="160" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-orange">
            <path d="M60 10L68 45L103 53L68 61L60 96L52 61L17 53L52 45L60 10Z" fill="currentColor"/>
            <circle cx="105" cy="25" r="5" fill="currentColor"/>
            <circle cx="20" cy="85" r="7" fill="currentColor" opacity="0.6"/>
         </svg>
      </div>

      <div className="relative z-10 max-w-2xl">
        <h3 className="text-2xl font-display font-bold mb-3 text-brand-text">Cùng chia sẻ cảm xúc</h3>
        <p className="text-brand-muted mb-10 text-sm font-medium">Chia sẻ để thấy mình không đơn độc.</p>
        
        <form onSubmit={handleSubmit} className="relative z-50 group/form">
          <textarea
            id="journal-textarea"
            value={content}
            onChange={handleContentChange}
            placeholder="Viết ở đây..."
            className="w-full h-48 bg-white border-2 border-brand-orange/10 rounded-[32px] p-8 text-lg focus:ring-[12px] focus:ring-brand-orange/[0.05] focus:border-brand-orange/40 outline-none transition-all resize-none shadow-sm placeholder:text-brand-muted/30 relative z-[60]"
            required
          />
          
          <div className="absolute bottom-6 right-6 flex items-center gap-5 z-[70]">
            <button
              disabled={loading || !content.trim()}
              className="bg-brand-orange/10 text-brand-orange hover:bg-brand-orange hover:text-white px-10 py-4 rounded-full font-bold shadow-2xl shadow-brand-orange/0 hover:shadow-brand-orange/20 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-40"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent animate-spin rounded-full" />
              ) : sent ? (
                'Gửi thành công! ✨'
              ) : (
                <>
                  <Send className="w-5 h-5 translate-x-[-2px] translate-y-[-2px] rotate-[-15deg] stroke-[2.5]" /> Chia sẻ
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-12 flex items-center gap-4">
          <img src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" alt="Tangerine" className="w-7 h-7 drop-shadow-md" />
          <p className="text-[13px] text-brand-muted/80 italic font-medium leading-relaxed">
            Mỗi cảm xúc đều có lý do của nó. <br />
            Em không cần phải cố gắng bỏ ngay bây giờ.
          </p>
        </div>
      </div>

      {/* Precise Mockup Illustrations */}
      <div className="absolute bottom-[-10px] right-10 w-[340px] h-[300px] pointer-events-none hidden lg:block group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] transition-all duration-[2000ms] ease-out">
        <div className="relative w-full h-full">
           {/* Book representation */}
           <div className="absolute bottom-12 right-0 w-72 h-52 bg-[#fffcf8] border-2 border-brand-border/60 rounded-2xl shadow-[40px_40px_100px_-20px_rgba(242,102,34,0.12)] rotate-[-4deg] overflow-hidden">
              <div className="w-full h-10 bg-brand-orange/[0.03] border-b border-brand-border/30 flex items-center px-6 font-mono text-[9px] tracking-[0.3em] text-brand-muted/30 uppercase">Notebook</div>
              <div className="p-8 space-y-4">
                 <div className="w-4/5 h-2 bg-brand-border/20 rounded-full" />
                 <div className="w-full h-2 bg-brand-border/20 rounded-full" />
                 <div className="w-3/5 h-2 bg-brand-border/20 rounded-full" />
                 <div className="pt-8 flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/[0.05] border border-brand-orange/10" />
                    <div className="flex-1 space-y-2.5 pt-2">
                       <div className="w-full h-1.5 bg-brand-border/10 rounded" />
                       <div className="w-3/4 h-1.5 bg-brand-border/10 rounded" />
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Pencil */}
           <div className="absolute bottom-20 right-40 w-56 h-3 bg-[#c7baa8] rounded-full rotate-[16deg] shadow-lg border border-white/30" />
           
           {/* Tea Cup */}
           <div className="absolute bottom-40 right-64 w-28 h-28 group-hover:rotate-[25deg] transition-transform duration-[1500ms] ease-in-out">
              <div className="absolute inset-0 bg-white border-2 border-brand-border rounded-full shadow-2xl flex items-center justify-center p-2.5">
                 <div className="w-full h-full border-2 border-brand-border/20 rounded-full bg-[#fdf2e9] flex items-center justify-center overflow-hidden">
                    <div className="w-16 h-16 border-t-8 border-brand-orange/[0.03] rounded-full animate-pulse" />
                 </div>
                 <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-9 h-11 border-2 border-brand-border rounded-l-full bg-white" />
              </div>
           </div>
           
           {/* Tangerine beside book */}
           <div className="absolute bottom-12 right-64 w-20 h-20 animate-bounce" style={{ animationDuration: '4.2s' }}>
              <img 
                src="https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png" 
                alt="Decoration" 
                className="w-full h-full drop-shadow-[0_20px_40px_rgba(242,102,34,0.35)]" 
              />
           </div>
        </div>
      </div>
    </div>
  );
}
