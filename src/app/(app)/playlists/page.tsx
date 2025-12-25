import { playlists } from '@/lib/data';
import { PlaylistCard } from '@/components/PlaylistCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function PlaylistsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Your Library
        </h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Playlist
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
        {playlists.length === 0 && (
          <p className="col-span-full text-muted-foreground">
            You haven&apos;t created any playlists yet.
          </p>
        )}
      </div>
    </div>
  );
}
