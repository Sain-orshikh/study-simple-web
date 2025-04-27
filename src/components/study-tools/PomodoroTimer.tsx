"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Timer, Pause, Play, RotateCcw, Bell, BellOff } from "lucide-react";
import { toast } from "react-hot-toast";

export function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to set a 10-second test timer
  const setTestTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(10);
    setMode('work');
    setTimeout(() => {
      setIsActive(true);
    }, 300);
  };

  // Create audio element on component mount
  useEffect(() => {
    // Create an actual HTML audio element instead of using the Audio constructor
    const audio = document.createElement('audio');
    audio.src = '/alarm/audio1.wav';
    audio.preload = 'auto';
    
    // Add error handling
    audio.addEventListener('error', (e) => {
      console.error("Error loading audio file:", e);
      console.error("Audio error details:", audio.error);
      toast.error("Could not load alarm sound.");
      
      // Try fallback to MP3 if WAV doesn't work
      if (audio.src.includes('.wav')) {
        console.log("Attempting fallback to MP3...");
        // First check if the backup file exists
        fetch('/alarm/audio1.mp3')
          .then(response => {
            if (response.ok) {
              audio.src = '/alarm/audio1.mp3';
              audio.load();
            } else {
              console.error("MP3 fallback also failed");
            }
          })
          .catch(err => console.error("Failed to check for MP3 fallback:", err));
      }
    });
    
    audioRef.current = audio;
    
    // Add a canplaythrough event to confirm loading is successful
    audio.addEventListener('canplaythrough', () => {
      console.log("Audio file loaded successfully");
    });
    
    // Test play a silent version to initialize audio context
    // (This helps with browsers that need user interaction to play audio)
    const testPlay = () => {
      const originalVolume = audio.volume;
      audio.volume = 0;
      audio.play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = originalVolume;
        })
        .catch(e => {
          console.log("Silent test play failed, which is expected in some browsers:", e);
          // This is expected to fail in some browsers due to autoplay policies
        });
    };
    
    // Try the test play after a short delay
    setTimeout(testPlay, 1000);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (interval) clearInterval(interval);
            // Handle timer completion
            const nextMode = mode === 'work' ? 'shortBreak' : 'work';
            const message = mode === 'work' 
              ? "Work session complete! Time for a break." 
              : "Break time over! Back to work.";
            
            // Play sound notification if enabled
            if (soundEnabled && audioRef.current) {
              const playPromise = audioRef.current.play();
              
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    console.log("Alarm played successfully");
                  })
                  .catch(error => {
                    console.error("Error playing alarm:", error);
                    toast.error("Could not play alarm sound. Try interacting with the page first.");
                  });
              }
            }
            
            // Show toast notification
            toast.success(message, {
              duration: 4000,
              position: "top-center",
              icon: mode === 'work' ? '☕' : '💪',
            });
            
            if (mode === 'work') {
              setMode('shortBreak');
              setMinutes(5);
            } else if (mode === 'shortBreak') {
              setMode('work');
              setMinutes(25);
            } else if (mode === 'longBreak') {
              setMode('work');
              setMinutes(25);
            }
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, mode, soundEnabled]);

  // Function to test the alarm sound
  const testAlarmSound = () => {
    if (audioRef.current && soundEnabled) {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            toast.success("Alarm sound is working!");
          })
          .catch(error => {
            console.error("Error testing alarm:", error);
            toast.error("Could not play alarm sound. Try clicking this button again.");
          });
      }
    } else if (!soundEnabled) {
      toast.success("Sound is currently disabled. Enable it first!");
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMinutes(25);
    } else if (mode === 'shortBreak') {
      setMinutes(5);
    } else if (mode === 'longBreak') {
      setMinutes(15);
    }
    setSeconds(0);
  };

  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'work') {
      setMinutes(25);
    } else if (newMode === 'shortBreak') {
      setMinutes(5);
    } else if (newMode === 'longBreak') {
      setMinutes(15);
    }
    setSeconds(0);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  // More compact UI for grid layout
  return (
    <div className="w-full">
      <div className="flex justify-center mb-2 gap-1">
        <Button 
          variant={mode === 'work' ? "default" : "outline"}
          onClick={() => switchMode('work')}
          className="text-xs px-2 py-1 h-8"
          size="sm"
        >
          Work
        </Button>
        <Button 
          variant={mode === 'shortBreak' ? "default" : "outline"}
          onClick={() => switchMode('shortBreak')}
          className="text-xs px-2 py-1 h-8"
          size="sm"
        >
          Short
        </Button>
        <Button 
          variant={mode === 'longBreak' ? "default" : "outline"}
          onClick={() => switchMode('longBreak')}
          className="text-xs px-2 py-1 h-8"
          size="sm"
        >
          Long
        </Button>
      </div>
      
      <div className="text-4xl font-bold text-center my-4">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <div className="flex justify-center gap-2 mb-2">
        <Button onClick={toggleTimer} className="gap-1 px-3 h-8" size="sm">
          {isActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button variant="outline" onClick={resetTimer} className="gap-1 px-3 h-8" size="sm">
          <RotateCcw className="h-3 w-3" />
          Reset
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSound} 
          className="gap-1 px-2 h-8"
        >
          {soundEnabled ? <Bell className="h-3 w-3" /> : <BellOff className="h-3 w-3" />}
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500">
        {mode === 'work' ? "Focus time" : "Break time"}
      </div>

      {/* Hidden but real audio element as backup */}
      <audio id="pomodoro-alarm" src="/alarm/audio1.wav" preload="auto" style={{ display: 'none' }} />
    </div>
  );
}