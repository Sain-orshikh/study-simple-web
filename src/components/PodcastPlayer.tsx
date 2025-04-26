"use client"

import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { MdOutlineSpeed, MdDownload } from 'react-icons/md';
import { Modal, Box } from '@mui/material';

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
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [audioLoaded, setAudioLoaded] = useState(false);
  
  // Button ref for positioning the modal
  const speedButtonRef = useRef<HTMLButtonElement>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  
  // Audio element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Update modal position when button is clicked
  const updateModalPosition = () => {
    if (speedButtonRef.current) {
      const rect = speedButtonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top - 130, // Position above the button
        left: rect.left - 40
      });
    }
  };
  
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
    const isAudioReady = loadAudio();
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (isAudioReady) {
          const playPromise = audioRef.current.play();
          
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
      setShowSpeedModal(false);
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
      {/* Hidden audio element - empty src initially */}
      <audio ref={audioRef} preload="none" />
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 cursor-pointer" onClick={(e) => {
        if (!audioLoaded) loadAudio();
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        if (audioRef.current) {
          audioRef.current.currentTime = percent * duration;
          setCurrentTime(percent * duration);
        }
      }}>
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        ></div>
      </div>
      
      {/* Controls */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center space-x-2">
          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay} 
            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
          </button>
          
          {/* Time Display */}
          <div className="text-xs text-gray-500 font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Volume Control */}
          <div className="flex items-center">
            <button 
              onClick={toggleMute} 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FaVolumeMute className="text-sm" /> : <FaVolumeUp className="text-sm" />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={isMuted ? 0 : volume} 
              onChange={handleVolumeChange}
              className="w-12 h-1 ml-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
              aria-label="Volume"
            />
          </div>
          
          {/* Playback Speed */}
          <button 
            ref={speedButtonRef}
            onClick={() => {
              updateModalPosition();
              setShowSpeedModal(true);
            }}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Playback speed"
          >
            <MdOutlineSpeed className="text-lg mr-1" />
            <span className="text-xs">{playbackSpeed}x</span>
          </button>
          
          {/* MUI Modal for Speed Options */}
          <Modal
            open={showSpeedModal}
            onClose={() => setShowSpeedModal(false)}
            aria-labelledby="playback-speed-modal"
            BackdropProps={{
              style: { backgroundColor: 'transparent' }
            }}
            disableAutoFocus
          >
            <Box
              sx={{
                position: 'absolute',
                width: 180, // Increased from 120px to 180px to accommodate all buttons
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 1,
                borderRadius: 1,
                border: '1px solid #e2e8f0',
                top: modalPosition.top,
                left: modalPosition.left,
              }}
            >
              <div className="text-sm font-medium mb-1 px-1">Playback Speed</div>
              <div className="grid grid-cols-3 gap-1">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                  <button 
                    key={speed} 
                    onClick={() => changePlaybackSpeed(speed)}
                    className={`text-xs py-1 px-2 rounded ${
                      playbackSpeed === speed 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </Box>
          </Modal>
          
          {/* Download Button */}
          <a 
            href={audioSrc} 
            download 
            className="text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Download podcast"
            onClick={() => loadAudio()}
          >
            <MdDownload className="text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
