"use client"

import { useState } from "react"
import Image from "next/image"
import { TrackType } from "@/data/study-tools/playlists"
import { Play, Pause, SkipForward, SkipBack, ExternalLink } from "lucide-react"
import { Button } from "../ui/button"

interface SpotifyTrackProps {
  track: TrackType
  playlistId: string
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onNext: () => void
  onPrevious: () => void
}

export function SpotifyTrack({
  track,
  playlistId,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious
}: SpotifyTrackProps) {
  const spotifyTrackUrl = `https://open.spotify.com/track/${track.id}`
  
  return (
    <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="relative w-12 h-12 overflow-hidden rounded mr-3 bg-gray-100 flex-shrink-0">
        {track.coverImage ? (
          <img 
            src={track.coverImage} 
            alt={`${track.name} cover`}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-purple-100 text-purple-500">
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <h4 className="font-medium text-sm truncate">{track.name}</h4>
        <p className="text-xs text-gray-500 truncate">{track.artist}</p>
      </div>
      
      <div className="flex items-center space-x-2 ml-4">
        <button 
          onClick={onPrevious}
          aria-label="Previous song"
          className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
        >
          <SkipBack size={14} />
        </button>
        
        <button
          onClick={isPlaying ? onPause : onPlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="p-1.5 bg-purple-600 text-white hover:bg-purple-700 rounded-full transition-colors"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
        
        <button 
          onClick={onNext}
          aria-label="Next song"
          className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
        >
          <SkipForward size={14} />
        </button>
        
        <a 
          href={spotifyTrackUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in Spotify"
          className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
        >
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}