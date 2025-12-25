import { playlists, songs } from '@/lib/data';
import { PlaylistCard } from '@/components/PlaylistCard';
import { SongCard } from '@/components/SongCard';

export default function DashboardPage() {
  const recentSongs = songs.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <section>
        <h2 className="text-3xl font-bold font-headline tracking-tight mb-4">
          Your Playlists
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline tracking-tight mb-4">
          Recently Added
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </div>
  );
}
