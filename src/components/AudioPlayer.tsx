import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Lock, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import type { Track } from '../types';
import { SeasonInfo } from '../seasonsData';

export default function AudioPlayer({ season }: { season: SeasonInfo }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const tracks = season.tracks;
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Reset track index when season changes
  useEffect(() => {
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setProgress(0);
  }, [season.id]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle track changing
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.log("Playback error", e));
        }
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.error("Play failed:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
      setProgress(newProgress);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="lg:col-span-2 glass-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left shadow-[0_20px_80px_-15px_rgba(45,45,45,0.05)] border-none">
        <div className="w-full md:w-64 h-64 shrink-0 overflow-hidden rounded-[40px] shadow-xl relative group">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>
        
        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
             <div className={cn("w-1.5 h-1.5 rounded-full", season.accentColor)} />
             <span className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-80 text-brand-muted">Podcast • {currentTrack.duration}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.2] mb-4 text-[#2d2d2d]" title={currentTrack.title}>
            {currentTrack.title}
          </h2>
          <p className="text-[#8e8e8e] font-medium mb-10 text-sm">{currentTrack.subtitle}</p>
          
          <div className="relative mb-8 w-full">
            <div className="flex items-end gap-[3px] h-14 mb-4 justify-between px-1">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-[3px] rounded-full transition-all duration-300",
                    i / 40 < progress / 100 ? season.accentColor : "bg-[#e2e2e2]"
                  )} 
                  style={{ 
                    height: `${20 + Math.abs(Math.sin(i * 0.4 + (isPlaying ? Date.now() * 0.001 : 0))) * 80}%`,
                    opacity: i / 40 < progress / 100 ? 1 : 0.5
                  }} 
                />
              ))}
            </div>
            
            <input 
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-14"
            />
            
            <div className="flex justify-between text-[11px] font-bold text-brand-muted/70 tracking-widest mt-2 uppercase">
              <span>{audioRef.current ? Math.floor(audioRef.current.currentTime / 60) + ':' + String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, '0') : '0:00'}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          <audio 
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            <source src={currentTrack.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4 md:gap-8">
              <button 
                onClick={() => skipTime(-15)}
                className="text-[#8e8e8e] hover:text-[#2d2d2d] transition-all p-2 rounded-full"
              >
                <div className="relative flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 stroke-[2.5]" />
                  <span className="absolute text-[7px] font-bold pb-0.5">15</span>
                </div>
              </button>
              
              <button onClick={() => setCurrentTrackIndex(prev => Math.max(0, prev - 1))} className="text-[#2d2d2d]/50 hover:text-[#2d2d2d] transition-colors">
                <SkipBack className="w-5 h-5 fill-current" />
              </button>
              
              <button 
                onClick={togglePlay}
                className={cn(
                  "w-14 h-14 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all",
                  season.accentColor
                )}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 translate-x-0.5 fill-current" />}
              </button>
              
              <button onClick={() => setCurrentTrackIndex(prev => Math.min(tracks.length - 1, prev + 1))} className="text-[#2d2d2d]/50 hover:text-[#2d2d2d] transition-colors">
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
 
              <button 
                onClick={() => skipTime(15)}
                className="text-[#8e8e8e] hover:text-[#2d2d2d] transition-all p-2 rounded-full"
              >
                <div className="relative flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 stroke-[2.5] scale-x-[-1]" />
                  <span className="absolute text-[7px] font-bold pb-0.5">15</span>
                </div>
              </button>
            </div>
            
            <div className="flex items-center gap-3 text-[#8e8e8e] shrink-0 w-max ml-auto md:ml-0">
              <Volume2 className="w-5 h-5 shrink-0" />
              <div className="w-20 md:w-28 h-1.5 bg-[#e2e2e2] rounded-full relative cursor-pointer group shrink-0">
                 <div className={cn("absolute left-0 top-0 h-full rounded-full transition-all", season.accentColor)} style={{ width: `${volume * 100}%` }} />
                 <input 
                  type="range" 
                  min="0" max="1" step="0.01" 
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 z-10 cursor-pointer"
                 />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 border-none shadow-[0_20px_60px_-15px_rgba(45,45,45,0.03)] bg-white/50">
        <h3 className="text-sm font-display font-bold mb-6 uppercase tracking-widest text-brand-muted/60">Danh sách tập</h3>
        <div className="space-y-1">
          {tracks.map((track, idx) => (
            <button
              key={track.id}
              disabled={track.locked}
              onClick={() => setCurrentTrackIndex(idx)}
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
    </div>
  );
}
