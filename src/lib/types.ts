export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  genre: string;
  year: number;
  coverArt: string; // URL to image
  audioUrl: string; // URL to audio file
}

export interface Playlist {
  id: string;
  userId: string;
  name: string;
  description: string;
  songIds: string[];
  createdAt: string;
}

export interface User {
  id:string;
  username: string;
  email: string;
}
