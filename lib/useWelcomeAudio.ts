import { useEffect, useState } from 'react';

interface VoiceOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceGender?: 'male' | 'female';
}

export function useWelcomeAudio(
  welcomeMessage: string, 
  enabled = true,
  voiceOptions: VoiceOptions = {}
) {
  const [hasSpoken, setHasSpoken] = useState(false);
  const {
    rate = 0.9,
    pitch = 1,
    volume = 0.8,
    voiceGender = 'female',
  } = voiceOptions;

  useEffect(() => {
    if (!enabled || hasSpoken) return;

    const speakWelcome = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(welcomeMessage);
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        // Try to select appropriate voice based on gender preference
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const preferredVoice = voices.find((voice) => {
            const voiceName = voice.name.toLowerCase();
            if (voiceGender === 'male') {
              return voiceName.includes('male') || voiceName.includes('david') || voiceName.includes('alex') || voiceName.includes('google us english male');
            } else {
              return voiceName.includes('female') || voiceName.includes('victoria') || voiceName.includes('samantha');
            }
          }) || voices[voiceGender === 'male' ? Math.floor(voices.length / 2) : 0];

          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }
        }

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        setHasSpoken(true);
      }
    };

    // Small delay to ensure page is ready and voices are loaded
    const timer = setTimeout(speakWelcome, 500);
    return () => clearTimeout(timer);
  }, [welcomeMessage, enabled, hasSpoken, rate, pitch, volume, voiceGender]);

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return { stop };
}
