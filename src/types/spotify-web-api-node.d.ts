declare module 'spotify-web-api-node' {
  interface SpotifyApiOptions {
    clientId?: string;
    clientSecret?: string;
    redirectUri?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface SpotifyApiResponse {
    body: any;
    headers: Record<string, string>;
    statusCode: number;
  }

  class SpotifyWebApi {
    constructor(options?: SpotifyApiOptions);
    
    setAccessToken(accessToken: string): void;
    setRefreshToken(refreshToken: string): void;
    getAccessToken(): string | null;
    getRefreshToken(): string | null;
    
    // Authentication methods
    clientCredentialsGrant(): Promise<SpotifyApiResponse>;
    refreshAccessToken(): Promise<SpotifyApiResponse>;
    
    // Playlist methods
    getPlaylist(playlistId: string): Promise<SpotifyApiResponse>;
    getPlaylistTracks(playlistId: string): Promise<SpotifyApiResponse>;
    
    // Track methods
    getTrack(trackId: string): Promise<SpotifyApiResponse>;
    getTracks(trackIds: string[]): Promise<SpotifyApiResponse>;
    
    // Album methods
    getAlbum(albumId: string): Promise<SpotifyApiResponse>;
    getAlbums(albumIds: string[]): Promise<SpotifyApiResponse>;
    
    // Artist methods
    getArtist(artistId: string): Promise<SpotifyApiResponse>;
    getArtists(artistIds: string[]): Promise<SpotifyApiResponse>;
    
    // Search methods
    searchTracks(query: string, options?: object): Promise<SpotifyApiResponse>;
    searchArtists(query: string, options?: object): Promise<SpotifyApiResponse>;
    searchAlbums(query: string, options?: object): Promise<SpotifyApiResponse>;
    searchPlaylists(query: string, options?: object): Promise<SpotifyApiResponse>;
  }

  export = SpotifyWebApi;
}