import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface AudioPlayerProps {
  source: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ source }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = source;
      audioRef.current.load(); // Загрузка нового источника
    }
  }, [source]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error attempting to play:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        setVolume(audioRef.current.volume);
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0) {
        setIsMuted(false);
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center w-full bg-[rgb(30,30,30)] p-4 rounded-lg" // Измененный класс для полной ширины
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      <audio ref={audioRef} onCanPlayThrough={() => {
        if (isPlaying) {
          audioRef.current?.play().catch(error => {
            console.error("Error attempting to play:", error);
          });
        }
      }}>
        Ваш браузер не поддерживает аудиовоспроизведение.
      </audio>
      <motion.button
        onClick={togglePlay}
        className="flex items-center justify-center w-24 h-24 rounded-full bg-[rgb(255,113,61)] text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <FaPause size={40} /> : <FaPlay size={40} />}
      </motion.button>
      <div className="relative flex items-center ml-4">
        <motion.button
          onClick={toggleMute}
          className="flex items-center justify-center p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: isMuted ? 'rgb(75, 254, 96)' : 'rgb(255, 113, 61)' }}
        >
          {isMuted ? <FaVolumeMute size={30} color="rgb(75, 254, 96)" /> : <FaVolumeUp size={30} color="rgb(255, 113, 61)" />}
        </motion.button>
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1/2 -translate-y-1/2 left-full ml-2"
            >
              <input
                type="range"
                className="w-32"
                min="0"
                max="1"
                step="0.1"
                value={audioRef.current ? audioRef.current.volume : volume}
                onChange={handleVolumeChange}
                style={{
                  backgroundColor: 'rgb(75, 254, 96)',
                  height: '4px',
                  borderRadius: '2px',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
