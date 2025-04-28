"use client"

import { Card } from "@/components/ui/card"
import { MusicIcon } from "lucide-react"
import { PlaylistType } from "@/data/study-tools/playlists"

interface StudyPlaylistsProps {
  playlists: PlaylistType[];
}

export function StudyPlaylists({ playlists }: StudyPlaylistsProps) {
  // Playlist IDs from the embed codes
  const spotifyPlaylistIds = [
    "10M75TUt3X1qbBhpuEw6el",  // First playlist
    "0R4QGSD0t8sjwAeowOCCta",  // Second playlist
    "4tpc6aQQQXpZvnrWjd5bQB"   // Third playlist
  ];
  
  const playlistTitles = [
    "Focus Playlist",
    "Classical Focus",
    "Study Beats"
  ];

  
  const iconColors = [
    "text-blue-500",
    "text-purple-500",
    "text-green-500"
  ];
  
  return (
    <section className="pt-4">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <MusicIcon className="h-6 w-6 mr-2 text-purple-500" />
        Study Playlists
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {spotifyPlaylistIds.map((playlistId, index) => (
          <Card 
            key={playlistId} 
            className="pt-6 pb-4 px-3 hover:shadow-md transition-shadow bg-purple-50 flex flex-col"
          >
            <div className="mb-2 flex justify-center">
              <MusicIcon className={`h-10 w-10 ${iconColors[index]}`} />
            </div>
            
            <h2 className="text-xl font-semibold mb-2 text-center">{playlistTitles[index]}</h2>
            {/* Directly using the iframe embed code */}
            <div className="w-full mb-4">
              <iframe 
                style={{ borderRadius: "0px" }} 
                src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}