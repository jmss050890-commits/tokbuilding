import { useEffect, useState } from 'react';

export function useWelcomeAudio(welcomeMessage: string, enabled = true) {
  const [hasSpoken, setHasSpoken] = useState(false);

  useEffect(() => {
    if (!enabled || hasSpoken) return;

    const speakWelcome = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(welcomeMessage);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        window.speechSynthesis.cancel(); // Clear any previous speech
        window.speechSynthesis.speak(utterance);
        setHasSpoken(true);
      }
    };

    // Small delay to ensure page is ready
    const timer = setTimeout(speakWelcome, 500);
    return () => clearTimeout(timer);
  }, [welcomeMessage, enabled, hasSpoken]);

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return { stop };
}
