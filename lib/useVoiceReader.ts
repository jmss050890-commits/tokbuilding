'use client';

import { useState, useCallback, useMemo } from 'react';
import { NarrativeVoiceReader, VoiceReaderConfig } from '@/lib/voice-reader';

export interface UseVoiceReaderOptions {
  config?: Partial<VoiceReaderConfig>;
}

export function useVoiceReader(options: UseVoiceReaderOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const reader = useMemo(() => new NarrativeVoiceReader(options.config), [options.config]);
  const isReaderReady = true;

  const handlePlayStatusChange = useCallback((status: 'playing' | 'paused' | 'stopped') => {
    setIsPlaying(status === 'playing');
  }, []);

  const read = useCallback((text: string) => {
    reader.read(text, handlePlayStatusChange);
  }, [handlePlayStatusChange, reader]);

  const play = useCallback(() => {
    if (isPlaying) {
      reader.pause();
    } else {
      if (reader.getProgress().current === 0) {
        // Need to start fresh - requires text
        console.warn('Use read() to start reading with text');
      } else {
        reader.resume();
      }
    }
  }, [isPlaying, reader]);

  const pause = useCallback(() => {
    reader.pause();
  }, [reader]);

  const stop = useCallback(() => {
    reader.stop();
    setProgress({ current: 0, total: 0 });
  }, [reader]);

  return {
    isPlaying,
    progress,
    read,
    play,
    pause,
    stop,
    isReaderReady,
  };
}
