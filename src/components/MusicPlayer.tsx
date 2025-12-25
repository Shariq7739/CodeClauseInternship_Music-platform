'use client';

import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, playNext, playPrevious } = useMusicPlayer();
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
        audioRef.current = new Audio();
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (audioRef.current.src !== currentTrack.audioUrl) {
        audioRef.current.src = currentTrack.audioUrl;
      }
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleEnd = () => playNext();

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [playNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  if (!currentTrack) {
    return null;
  }

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * currentTrack.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
    if(isMuted) setIsMuted(false);
  };

  return (
    <div className="sticky bottom-0 z-50 w-full bg-card border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center h-20">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-md">
              <AvatarImage asChild src={currentTrack.coverArt}>
                  <Image src={currentTrack.coverArt} alt={currentTrack.album} width={48} height={48} />
              </AvatarImage>
              <AvatarFallback className="rounded-md">{currentTrack.title.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm truncate">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={playPrevious} className="h-8 w-8">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button variant="default" size="icon" onClick={togglePlayPause} className="h-10 w-10">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={playNext} className="h-8 w-8">
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 w-full max-w-xs">
              <span className="text-xs text-muted-foreground">{formatTime(audioRef.current?.currentTime ?? 0)}</span>
              <Slider
                value={[progress]}
                onValueChange={handleProgressChange}
                max={100}
                step={1}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{formatTime(currentTrack.duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
              {isMuted || volume === 0 ? <VolumeX className="h-5 w-5"/> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
