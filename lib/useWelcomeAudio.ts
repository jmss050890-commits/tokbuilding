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
          let preferredVoice = null;

          if (voiceGender === 'male') {
            // Search for male voice with multiple strategies
            preferredVoice = 
              voices.find((voice) => {
                const name = voice.name.toLowerCase();
                return name.includes('male');
              }) ||
              voices.find((voice) => {
                const name = voice.name.toLowerCase();
                return name.includes('david') || name.includes('alex') || name.includes('google us english male');
              }) ||
              voices.find((voice) => {
                const name = voice.name.toLowerCase();
                // iOS/Safari names
                return name.includes('aaron') || name.includes('fred') || name.includes('ralph');
              }) ||
              voices.find((voice) => {
                const name = voice.name.toLowerCase();
                // Android names
                return name.includes('googleus-en-us') && !name.includes('female');
              });

            // If still no match, use middle voice (better chance of male on mobile)
            if (!preferredVoice && voices.length > 1) {
              preferredVoice = voices[Math.floor(voices.length / 2)];
            }
          } else {
            // Female voice preference
            preferredVoice = 
              voices.find((voice) => {
                const name = voice.name.toLowerCase();
                return name.includes('female');
              }) ||
              voices.find((voice) => {
                const name = voice.name.toLowerCase();
                return name.includes('victoria') || name.includes('samantha') || name.includes('moira');
              }) ||
              voices[0];
          }

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
