"use client"

import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { MdOutlineSpeed, MdDownload, MdMoreVert } from 'react-icons/md';

interface PodcastPlayerProps {
  audioSrc: string;
  speaker: {
    name: string;
    image: string;
    title: string;
  };
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ audioSrc, speaker }) => {
  // Audio player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [audioLoaded, setAudioLoaded] = useState(false);
  
  // Audio element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Lazy load audio only when play is clicked
  const loadAudio = () => {
    if (!audioLoaded && audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      setAudioLoaded(true);
      return true;
    }
    return audioLoaded;
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    // Load audio if not loaded yet
    const isAudioReady = loadAudio();
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // If audio is loaded and ready
        if (isAudioReady) {
          const playPromise = audioRef.current.play();
          
          // Handle play promise to avoid the DOMException
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch(error => {
                console.error("Playback failed:", error);
                setIsPlaying(false);
              });
          }
        }
      }
    }
  };
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  // Handle seeking on progress bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    
    // Ensure audio is loaded before seeking
    if (!audioLoaded) {
      loadAudio();
    }
    
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle playback speed change
  const changePlaybackSpeed = (speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSpeedOptions(false);
    }
  };
  
  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Set up audio element
  useEffect(() => {
    // Create audio element but don't load the source yet
    const audio = new Audio();
    audioRef.current = audio;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', () => setIsPlaying(false));
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', () => setIsPlaying(false));
      audio.pause();
      audioRef.current = null;
    };
  }, []);
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Speaker Profile */}
      <div className="flex items-center mb-6">
        <img 
          src={speaker.image} 
          alt={speaker.name} 
          className="w-24 h-24 rounded-full object-cover mr-6 shadow-md border-2 border-blue-100"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{speaker.name}</h2>
          <p className="text-gray-600 italic">{speaker.title}</p>
        </div>
      </div>
      
      {/* Audio Player */}
      <div className="bg-gray-50 rounded-lg p-5 shadow-inner">
        {/* Hidden audio element - empty src initially */}
        <audio ref={audioRef} preload="none" />
        
        {/* Progress Bar */}
        <div className="mb-4">
          <input 
            type="range" 
            min="0" 
            max={duration || 100} // Use 100 as default before duration is known
            value={currentTime} 
            onChange={handleSeek}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${duration ? (currentTime / duration) * 100 : 0}%, #d1d5db ${duration ? (currentTime / duration) * 100 : 0}%, #d1d5db 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span className="font-mono">{formatTime(currentTime)}</span>
            <span className="font-mono">{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Main Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlay} 
              className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="ml-1 text-lg" />}
            </button>
            
            {/* Volume Control */}
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
              <button 
                onClick={toggleMute} 
                className="mr-2 text-gray-600 hover:text-blue-600"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-label="Volume"
              />
            </div>
          </div>
          
          {/* Additional Controls */}
          <div className="flex items-center space-x-4">
            {/* Playback Speed */}
            <div className="relative">
              <button 
                onClick={() => setShowSpeedOptions(!showSpeedOptions)}
                className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm hover:bg-gray-50"
                aria-label="Change playback speed"
              >
                <MdOutlineSpeed className="text-xl mr-1 text-gray-700" />
                <span className="text-gray-800 font-medium">{playbackSpeed}x</span>
              </button>
              
              {/* Speed Options Dropdown */}
              {showSpeedOptions && (
                <div className="absolute bottom-full mb-2 right-0 bg-white shadow-lg rounded-md p-2 z-10 border border-gray-100">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                    <button 
                      key={speed} 
                      onClick={() => changePlaybackSpeed(speed)}
                      className={`block w-full text-left px-4 py-1 rounded hover:bg-gray-100 transition-colors ${
                        playbackSpeed === speed ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                      }`}
                      aria-label={`Set speed to ${speed}x`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Download Button */}
            <a 
              href={audioSrc} 
              download 
              className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm hover:bg-gray-50"
              aria-label="Download podcast"
              onClick={() => loadAudio()} // Ensure the audio src is set before downloading
            >
              <MdDownload className="text-xl text-gray-700" />
            </a>
            
            {/* More Options */}
            <button 
              className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm hover:bg-gray-50"
              aria-label="More options"
            >
              <MdMoreVert className="text-xl text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
