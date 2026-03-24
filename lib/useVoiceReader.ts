'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { NarrativeVoiceReader, VoiceReaderConfig } from '@/lib/voice-reader';

export interface UseVoiceReaderOptions {
  config?: Partial<VoiceReaderConfig>;
}

export function useVoiceReader(options: UseVoiceReaderOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const readerRef = useRef<NarrativeVoiceReader | null>(null);
  const [isReaderReady, setIsReaderReady] = useState(false);

  // Initialize reader after component mounts (client-side only)
  useEffect(() => {
    readerRef.current = new NarrativeVoiceReader(options.config);
    setIsReaderReady(true);
  }, [options.config]);

  const handlePlayStatusChange = useCallback((status: 'playing' | 'paused' | 'stopped') => {
    setIsPlaying(status === 'playing');
  }, []);

  const read = useCallback((text: string) => {
    if (!readerRef.current) return;
    readerRef.current.read(text, handlePlayStatusChange);
  }, [handlePlayStatusChange]);

  const play = useCallback(() => {
    if (!readerRef.current) return;
    if (isPlaying) {
      readerRef.current.pause();
    } else {
      if (progress.current === 0) {
        // Need to start fresh - requires text
        console.warn('Use read() to start reading with text');
      } else {
        readerRef.current.resume();
      }
    }
  }, [isPlaying, progress.current]);

  const pause = useCallback(() => {
    if (!readerRef.current) return;
    readerRef.current.pause();
  }, []);

  const stop = useCallback(() => {
    if (!readerRef.current) return;
    readerRef.current.stop();
    setProgress({ current: 0, total: 0 });
  }, []);

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
