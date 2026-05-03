import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { handleFirestoreError } from '../lib/firebase-utils';
import { OperationType, type MoodStatus } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function StatusFeed() {
  const [statuses, setStatuses] = useState<MoodStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'statuses'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as MoodStatus[];
      setStatuses(docs);
      setLoading(false);
      setError(null);
    }, (err) => {
      console.error('Error fetching statuses:', err);
      setError('Không thể tải dữ liệu từ cộng đồng.');
      setLoading(false);
      handleFirestoreError(err, OperationType.LIST, 'statuses');
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="mt-12 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card p-6 h-32 flex items-center justify-center bg-white/30 border border-brand-border/20">
             <div className="flex flex-col items-center gap-2 opacity-20">
                <div className="w-10 h-10 bg-brand-border rounded-full animate-pulse" />
                <div className="w-32 h-2 bg-brand-border rounded-full animate-pulse" />
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 p-8 glass-card border-brand-orange/20 text-center">
        <p className="text-brand-orange font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-orange transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-display font-bold">Cộng đồng đang cảm thấy gì?</h3>
        <div className="h-px flex-1 mx-8 bg-brand-border/50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {statuses.map((status, idx) => (
            <motion.div
              key={status.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[32px] p-8 border border-brand-orange/5 shadow-[0_20px_50px_-20px_rgba(242,102,34,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(242,102,34,0.1)] transition-all duration-500"
            >
              <div className="flex gap-5 items-center mb-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] border border-brand-border/40 shrink-0">
                  {status.avatarEmoji}
                </div>
                <div>
                  <h4 className="font-display font-bold text-[#f26622] text-lg leading-tight">{status.anonymousName}</h4>
                  <p className="text-[11px] font-bold text-[#8e8e8e] uppercase tracking-[0.1em] opacity-60 mt-1">
                    {status.createdAt ? formatDistanceToNow(status.createdAt.toDate(), { addSuffix: true, locale: vi }) : 'Vừa xong'}
                  </p>
                </div>
              </div>
              
              <p className="text-[#4a4a4a] text-lg leading-relaxed italic font-medium pl-2 border-l-2 border-brand-orange/10">
                "{status.content}"
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {statuses.length === 0 && (
        <div className="text-center py-20 glass-card bg-brand-cream/20">
          <p className="text-brand-muted">Chưa có chia sẻ nào. Hãy là người đầu tiên chia sẻ cảm xúc của mình.</p>
        </div>
      )}
    </div>
  );
}
