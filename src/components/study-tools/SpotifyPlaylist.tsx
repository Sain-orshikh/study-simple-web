"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlaylistType } from "@/data/study-tools/playlists"
import { SpotifyTrack } from "./SpotifyTrack"
import { MusicIcon, ExternalLinkIcon } from "lucide-react"
import { SpotifyEmbed } from "./SpotifyEmbed"

interface SpotifyPlaylistProps {
  playlist: PlaylistType
}

export function SpotifyPlaylist({ playlist }: SpotifyPlaylistProps) {
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Get current track or null
  const currentTrack = activeTrackIndex !== null 
    ? playlist.tracks[activeTrackIndex] 
    : null
  
  const handlePlay = (index: number) => {
    setActiveTrackIndex(index)
    setIsPlaying(true)
  }
  
  const handlePause = () => {
    setIsPlaying(false)
  }
  
  const handleNext = () => {
    if (activeTrackIndex === null) {
      setActiveTrackIndex(0)
      setIsPlaying(true)
    } else {
      const nextIndex = (activeTrackIndex + 1) % playlist.tracks.length
      setActiveTrackIndex(nextIndex)
      setIsPlaying(true)
    }
  }
  
  const handlePrevious = () => {
    if (activeTrackIndex === null) {
      setActiveTrackIndex(playlist.tracks.length - 1)
      setIsPlaying(true)
    } else {
      const prevIndex = (activeTrackIndex - 1 + playlist.tracks.length) % playlist.tracks.length
      setActiveTrackIndex(prevIndex)
      setIsPlaying(true)
    }
  }
  
  return (
    <Card className="p-6 flex flex-col hover:shadow-md transition-shadow bg-purple-50">
      <div className="mb-4 flex justify-center">
        {playlist.icon}
      </div>
      
      <h2 className="text-xl font-semibold mb-2 text-center">{playlist.name}</h2>
      <p className="text-gray-600 mb-4 text-center">{playlist.description}</p>
      
      {/* Spotify embed for currently selected track */}
      {currentTrack && (
        <div className="mb-4">
          <SpotifyEmbed 
            playlistId={playlist.playlistId}
            trackId={currentTrack.id}
            height={80}
          />
        </div>
      )}
      
      {/* Track listing */}
      <div className="space-y-2 mb-4">
        {playlist.tracks.map((track, index) => (
          <SpotifyTrack
            key={track.id}
            track={track}
            playlistId={playlist.playlistId}
            isPlaying={isPlaying && activeTrackIndex === index}
            onPlay={() => handlePlay(index)}
            onPause={handlePause}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        ))}
      </div>
      
      {/* Full playlist embed (collapsed) */}
      <div className="my-4 border-t pt-4">
        <details className="w-full">
          <summary className="cursor-pointer text-purple-600 font-medium">
            Show full playlist
          </summary>
          <div className="pt-2">
            <SpotifyEmbed 
              playlistId={playlist.playlistId}
              height={380}
            />
          </div>
        </details>
      </div>
      
      <Button asChild className="mt-auto" variant="outline">
        <a href={playlist.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
          Listen on Spotify
          <ExternalLinkIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </Card>
  )
}