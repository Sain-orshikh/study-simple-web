import SpotifyWebApi from 'spotify-web-api-node';

// Initialize the Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Token management
let tokenExpirationTime = 0;

// Get access token (client credentials flow)
async function getAccessToken() {
  const currentTime = Date.now();
  
  // If token is expired or about to expire, request a new one
  if (currentTime >= tokenExpirationTime) {
    try {
      const data = await spotifyApi.clientCredentialsGrant();
      spotifyApi.setAccessToken(data.body.access_token);
      
      // Set expiration time (subtract 60 seconds to be safe)
      tokenExpirationTime = currentTime + (data.body.expires_in * 1000) - 60000;
      console.log('Spotify access token refreshed');
    } catch (error) {
      console.error('Error getting Spotify access token:', error);
      throw error;
    }
  }
  
  return spotifyApi.getAccessToken();
}

// Get playlist details including tracks
export async function getPlaylist(playlistId: string) {
  await getAccessToken();
  
  try {
    const playlist = await spotifyApi.getPlaylist(playlistId);
    return playlist.body;
  } catch (error) {
    console.error(`Error fetching playlist ${playlistId}:`, error);
    throw error;
  }
}

// Get multiple playlists
export async function getPlaylists(playlistIds: string[]) {
  await getAccessToken();
  
  try {
    const playlists = await Promise.all(
      playlistIds.map(id => spotifyApi.getPlaylist(id))
    );
    
    // Updated type annotation here
    return playlists.map((response: { body: any }) => response.body);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
}

// Get track details
export async function getTrack(trackId: string) {
  await getAccessToken();
  
  try {
    const track = await spotifyApi.getTrack(trackId);
    return track.body;
  } catch (error) {
    console.error(`Error fetching track ${trackId}:`, error);
    throw error;
  }
}

// Types for Spotify data
interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    images: Array<{ url: string }>;
  };
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  external_urls: {
    spotify: string;
  };
  tracks: {
    items: Array<{
      track: SpotifyTrack;
    }>;
  };
}

interface FormattedTrack {
  id: string;
  name: string;
  artist: string;
  coverImage: string;
}

interface FormattedPlaylist {
  id: string;
  name: string;
  description: string;
  playlistId: string;
  link: string;
  tracks: FormattedTrack[];
}

// Convert Spotify API response to our internal format
export function formatPlaylistData(spotifyPlaylist: SpotifyPlaylist): FormattedPlaylist {
  const tracks = spotifyPlaylist.tracks.items.slice(0, 10).map((item) => ({
    id: item.track.id,
    name: item.track.name,
    artist: item.track.artists.map((artist) => artist.name).join(', '),
    coverImage: item.track.album.images[0]?.url || '',
  }));
  
  return {
    id: spotifyPlaylist.id,
    name: spotifyPlaylist.name,
    description: spotifyPlaylist.description || 'Spotify Playlist',
    playlistId: spotifyPlaylist.id,
    link: spotifyPlaylist.external_urls.spotify,
    tracks,
  };
}

export default spotifyApi;