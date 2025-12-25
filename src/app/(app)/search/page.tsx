'use client';

import { useState, useMemo } from 'react';
import { songs } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SongCard } from '@/components/SongCard';
import { Search as SearchIcon, ListMusic } from 'lucide-react';
import type { Song } from '@/lib/types';

const allGenres = [...new Set(songs.map(song => song.genre))];
const allYears = [...new Set(songs.map(song => song.year.toString()))].sort((a, b) => Number(b) - Number(a));

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');

  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      const matchesQuery = query.length < 2 ||
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase());
      const matchesGenre = genre === 'all' || song.genre === genre;
      const matchesYear = year === 'all' || song.year.toString() === year;

      return matchesQuery && matchesGenre && matchesYear;
    });
  }, [query, genre, year]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">Search Music</h1>
          <p className="text-muted-foreground mt-1">Find your next favorite song by title, artist, genre, or year.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for songs or artists..."
              className="pl-10 h-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {allGenres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {allYears.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center bg-card rounded-lg p-12 h-64">
                <ListMusic className="h-12 w-12 text-muted-foreground mb-4"/>
                <h3 className="text-xl font-semibold">No results found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
