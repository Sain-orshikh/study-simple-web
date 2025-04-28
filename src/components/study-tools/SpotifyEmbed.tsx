"use client"

interface SpotifyEmbedProps {
  playlistId: string;
  width?: string | number;
  height?: string | number;
}

export function SpotifyEmbed({ 
  playlistId, 
  width = "100%", 
  height = 352 
}: SpotifyEmbedProps) {
  // Use the exact embed URL format provided by Spotify
  const embedUri = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
  
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