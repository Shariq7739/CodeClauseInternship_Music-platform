'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import type { Playlist, Song } from '@/lib/types';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { songs as allSongs } from '@/lib/data';

interface PlaylistCardProps {
  playlist: Playlist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { playTrack } = useMusicPlayer();
  const playlistSongs = allSongs.filter(song => playlist.songIds.includes(song.id));
  const coverArt = playlistSongs[0]?.coverArt || 'https://picsum.photos/seed/playlist/400/400';

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlistSongs.length > 0) {
      playTrack(playlistSongs[0], playlistSongs);
    }
  };

  return (
    <Card className="group overflow-hidden relative transition-all hover:shadow-lg hover:bg-card/80">
      <CardHeader className="p-0">
        <Image
          src={coverArt}
          alt={playlist.name}
          width={400}
          height={400}
          className="aspect-square object-cover"
          data-ai-hint="playlist cover"
        />
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
          <Button size="icon" className="rounded-full h-12 w-12 bg-primary hover:bg-primary/80 shadow-lg" onClick={handlePlay}>
            <Play className="h-6 w-6 fill-primary-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="truncate text-base">{playlist.name}</CardTitle>
        <CardDescription className="truncate text-sm mt-1">{playlist.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
