'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Music } from 'lucide-react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import type { Song } from '@/lib/types';

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  const { playTrack } = useMusicPlayer();

  return (
    <Card 
      className="group w-full overflow-hidden transition-all hover:bg-accent/50 cursor-pointer"
      onClick={() => playTrack(song)}
    >
      <CardContent className="flex items-center gap-4 p-3">
        <div className="relative">
          <Image
            src={song.coverArt}
            alt={song.album}
            width={56}
            height={56}
            className="aspect-square object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{song.title}</p>
          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>{Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}</p>
        </div>
      </CardContent>
    </Card>
  );
}
