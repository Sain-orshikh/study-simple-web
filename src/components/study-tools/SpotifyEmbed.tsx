"use client"

interface SpotifyEmbedProps {
  playlistId: string;
  trackId?: string;  // Optional track ID for playing a specific track
  width?: string | number;
  height?: string | number;
}

export function SpotifyEmbed({ 
  playlistId, 
  trackId,
  width = "100%", 
  height = 352 
}: SpotifyEmbedProps) {
  // Determine the embed type (playlist or track) based on whether trackId is provided
  const embedType = trackId ? "track" : "playlist";
  const id = trackId || playlistId;
  
  // Use the exact embed URL format provided by Spotify
  const embedUri = `https://open.spotify.com/embed/${embedType}/${id}?utm_source=generator`;
  
  return (
    <iframe 
      style={{ borderRadius: "12px" }} 
      src={embedUri}
      width={width}
      height={height}
      frameBorder="0" 
      allowFullScreen 
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
}