import React from 'react';
import { Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import { SeasonInfo } from '../seasonsData';

export default function EpisodeList({ 
  season, 
  currentTrackIndex = 0, 
  onSelectTrack 
}: { 
  season: SeasonInfo;
  currentTrackIndex?: number;
  onSelectTrack?: (index: number) => void;
}) {
  const tracks = season.tracks;

  return (
    <div className="glass-card p-6 border-none shadow-[0_20px_60px_-15px_rgba(45,45,45,0.03)] bg-white/50 h-full">
      <h3 className="text-sm font-display font-bold mb-6 uppercase tracking-widest text-brand-muted/60">Danh sách tập</h3>
      <div className="space-y-1">
        {tracks.map((track, idx) => (
          <button
            key={track.id}
            disabled={track.locked}
            onClick={() => onSelectTrack?.(idx)}
            className={cn(
              "w-full flex items-center gap-4 p-2.5 rounded-2xl transition-all group",
              currentTrackIndex === idx ? "bg-white shadow-sm border border-brand-border/40" : "bg-transparent border border-transparent hover:bg-black/[0.02]"
            )}
          >
            <div className="w-12 h-12 shrink-0 overflow-hidden rounded-xl shadow-sm bg-brand-border">
              <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className={cn(
                "text-xs font-bold truncate mb-0.5 transition-colors", 
                currentTrackIndex === idx ? "text-[#2d2d2d]" : "text-brand-text/80",
                currentTrackIndex === idx && season.id === 'summer' ? "text-[#f26622]" : 
                currentTrackIndex === idx && season.id === 'spring' ? "text-emerald-500" :
                currentTrackIndex === idx && season.id === 'autumn' ? "text-amber-600" :
                currentTrackIndex === idx && season.id === 'winter' ? "text-blue-500" : ""
              )}>
                {idx + 1}. {track.title}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-brand-muted/60 uppercase tracking-widest">{track.duration}</span>
                {track.locked && <Lock className="w-3 h-3 text-brand-muted/40" />}
              </div>
            </div>
            {currentTrackIndex === idx && (
               <div className="flex gap-0.5 items-end h-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={cn("w-[2px] animate-pulse", season.accentColor)} style={{ height: `${40 + Math.random() * 60}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
               </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
