import React, { useState, useEffect, useRef } from "react";
import { trpc } from "../../utils/trpc";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeXIcon,
} from "lucide-react";
import { Track } from "@/types";
import { Progress } from "@/components/ui/progress";

export function AudioPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const { data: lofiTracks, isLoading } =
    trpc.audio.getLofiTracks.useQuery<Track[]>();

  useEffect(() => {
    if (lofiTracks) {
      setTracks(lofiTracks);
      if (lofiTracks.length > 0) {
        setCurrentTrack(lofiTracks[0]);
      }
    }
  }, [lofiTracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      setProgress((currentTime / duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsAudioLoading(true);
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsAudioLoading(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsAudioLoading(false);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsAudioLoading(false);
        });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  const nextTrack = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(
        (track) => track.id === currentTrack.id
      );
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextIndex]);
    }
  };

  const previousTrack = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(
        (track) => track.id === currentTrack.id
      );
      const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrack(tracks[previousIndex]);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-sm outline outline-1 outline-gray-200 mr-4 w-100">
      {currentTrack && (
        <img
          src={currentTrack.image}
          alt={currentTrack.name}
          className="w-12 h-12 rounded-md object-cover flex-shrink-0"
        />
      )}
      <div className="flex flex-col flex-grow min-w-0 max-w-[210px]">
        <div className="text-sm font-medium truncate">
          {currentTrack ? currentTrack.name : "No track selected"}
        </div>
        <div className="text-xs text-gray-500 truncate">
          {currentTrack ? currentTrack.artist_name : ""}
        </div>
        <Progress value={progress} className="w-full h-1 mt-1" />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={previousTrack}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={togglePlay}>
          {isAudioLoading ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={nextTrack}>
          <SkipForward className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleMute}>
          {isMuted ? (
            <VolumeXIcon className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.audio}
          onEnded={nextTrack}
          muted={isMuted}
          onLoadStart={() => setIsAudioLoading(true)}
          onCanPlay={() => setIsAudioLoading(false)}
        />
      )}
    </div>
  );
}
