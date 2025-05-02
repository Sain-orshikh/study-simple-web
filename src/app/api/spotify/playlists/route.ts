import { NextResponse } from 'next/server';
import { getPlaylists, formatPlaylistData } from '@/lib/spotify';
import { PlaylistType } from '@/data/study-tools/playlists';

// Define the playlist IDs we want to fetch
const PLAYLIST_IDS = [
  '37i9dQZF1DWZeKCadgRdKQ', // Deep Focus
  '37i9dQZF1DX8Uebhn9wzrS', // Study Beats
  '37i9dQZF1DWWEJlAGA9gs0'  // Classical Focus
];

export async function GET() {
  try {
    // Fetch playlists from Spotify API
    const spotifyPlaylists = await getPlaylists(PLAYLIST_IDS);
    
    // Format the data to match our application's structure
    const formattedPlaylists: Partial<PlaylistType>[] = spotifyPlaylists.map((playlist: any, index: any) => {
      const formattedData = formatPlaylistData(playlist);
      
      // Add icon and other meta data from our static data
      return {
        ...formattedData,
        id: index + 1,
        icon: null, // We'll add icons on the client side
      };
    });

    return NextResponse.json({ playlists: formattedPlaylists }, { status: 200 });
  } catch (error) {
    console.error('Error in Spotify playlists API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify playlists' },
      { status: 500 }
    );
  }
}