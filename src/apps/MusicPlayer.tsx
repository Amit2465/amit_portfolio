import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat, Volume2 } from 'lucide-react';

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLiked, setIsLiked] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Free music samples from various sources
  const playlist = [
    {
      title: 'Chill Vibes',
      artist: 'Lofi Hip Hop',
      album: 'Study Beats',
      cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Sample audio
      duration: 180
    },
    {
      title: 'Ocean Waves',
      artist: 'Nature Sounds',
      album: 'Relaxation',
      cover: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Sample audio
      duration: 240
    },
    {
      title: 'Jazz Cafe',
      artist: 'Smooth Jazz',
      album: 'Evening Moods',
      cover: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Sample audio
      duration: 200
    },
    {
      title: 'Electronic Dreams',
      artist: 'Synthwave',
      album: 'Neon Nights',
      cover: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Sample audio
      duration: 220
    }
  ];

  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const previousSong = () => {
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 to-pink-50 p-4 pt-16 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Music Player</h2>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={currentSong.url}
          preload="metadata"
        />

        {/* Album Cover */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-lg relative"
        >
          <img
            src={currentSong.cover}
            alt={currentSong.album}
            className="w-full h-full object-cover"
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              />
            </div>
          )}
        </motion.div>

        {/* Song Info */}
        <motion.div 
          className="text-center mb-4"
          key={currentSongIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-1">{currentSong.title}</h3>
          <p className="text-gray-600 text-sm">{currentSong.artist}</p>
          <p className="text-gray-500 text-xs">{currentSong.album}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div 
            className="w-full bg-gray-200 rounded-full h-2 cursor-pointer"
            onClick={seekTo}
          >
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-purple-500" />
            </motion.div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-gray-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Shuffle size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={previousSong}
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <SkipBack size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlayPause}
            disabled={isLoading}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSong}
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <SkipForward size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Repeat size={16} />
          </motion.button>
        </div>

        {/* Like Button */}
        <div className="text-center mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        {/* Playlist */}
        <div className="bg-white rounded-xl p-3 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Playlist</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {playlist.map((song, index) => (
              <motion.div
                key={index}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setIsPlaying(false);
                  setCurrentTime(0);
                }}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  index === currentSongIndex ? 'bg-purple-100' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded overflow-hidden">
                    <img
                      src={song.cover}
                      alt={song.album}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className={`font-medium text-xs ${
                      index === currentSongIndex ? 'text-purple-600' : 'text-gray-800'
                    }`}>
                      {song.title}
                    </p>
                    <p className="text-gray-500 text-xs">{song.artist}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xs">{formatTime(song.duration)}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Now Playing Indicator */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <div className="flex items-center justify-center gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-4 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
                  animate={{
                    scaleY: [1, 2, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Now Playing</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;