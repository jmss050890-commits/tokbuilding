'use client';

import { useEffect, useId, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { getSiteLanguageLocale, resolveSiteLanguage, type SiteLanguageCode } from '@/lib/site-language';

type VoiceStyle = 'proud' | 'warm' | 'calm';

type VoiceProfile = {
  label: string;
  patterns: string[];
  pitch: number;
  rate: number;
  volume: number;
};

const voiceStyleProfiles: Record<VoiceStyle, VoiceProfile> = {
  proud: {
    label: 'Natural Proud',
    patterns: ['aria', 'jenny', 'zira', 'ava', 'samantha', 'victoria', 'moira', 'karen', 'fiona', 'anna', 'emma'],
    pitch: 0.98,
    rate: 0.9,
    volume: 1,
  },
  warm: {
    label: 'Warm Story',
    patterns: ['samantha', 'ava', 'victoria', 'karen', 'fiona', 'anna', 'emma', 'aria', 'jenny', 'zira'],
    pitch: 1.04,
    rate: 0.9,
    volume: 1,
  },
  calm: {
    label: 'Calm Reflective',
    patterns: ['moira', 'victoria', 'karen', 'fiona', 'anna', 'emma', 'samantha', 'aria', 'jenny', 'zira'],
    pitch: 1,
    rate: 0.84,
    volume: 1,
  },
};

type VoiceStyleSpeakerProps = {
  text: string;
  className?: string;
  selectLabel?: string;
  speakLabel?: string;
  stopLabel?: string;
  speakTitle?: string;
  stopTitle?: string;
  locale?: string;
  languageCode?: SiteLanguageCode;
};

export default function VoiceStyleSpeaker({
  text,
  className = '',
  selectLabel = 'Voice Style',
  speakLabel = 'Speak Message',
  stopLabel = 'Stop Message',
  speakTitle = 'Listen to message',
  stopTitle = 'Stop message',
  locale,
  languageCode,
}: VoiceStyleSpeakerProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>('proud');
  const selectId = useId();
  const resolvedLanguage = resolveSiteLanguage(languageCode);
  const resolvedLocale = locale ?? getSiteLanguageLocale(resolvedLanguage);
  const resolvedLanguagePrefix = resolvedLocale.toLowerCase().split('-')[0];

  const speakText = async () => {
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);

    try {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        await new Promise((resolve) => {
          const handleVoicesChanged = () => {
            voices = window.speechSynthesis.getVoices();
            window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
            resolve(null);
          };

          window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
          setTimeout(resolve, 1000);
        });
      }

      const profile = voiceStyleProfiles[voiceStyle];
      const normalizedVoices = voices
        .filter((voice) => {
          const voiceLanguage = voice.lang?.toLowerCase() ?? '';
          return voiceLanguage.startsWith(resolvedLocale.toLowerCase()) || voiceLanguage.startsWith(resolvedLanguagePrefix);
        })
        .sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          const aIndex = profile.patterns.findIndex((pattern) => aName.includes(pattern));
          const bIndex = profile.patterns.findIndex((pattern) => bName.includes(pattern));
          const aScore = aIndex === -1 ? 999 : aIndex;
          const bScore = bIndex === -1 ? 999 : bIndex;

          return aScore - bScore;
        });

  const selectedVoice = normalizedVoices[0] ?? voices.find((voice) => voice.lang?.toLowerCase().startsWith(resolvedLanguagePrefix));

      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) utterance.voice = selectedVoice;
  utterance.lang = resolvedLocale;
      utterance.pitch = profile.pitch;
      utterance.rate = profile.rate;
      utterance.volume = profile.volume;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`.trim()}>
      <div className="flex items-center gap-2 text-xs text-amber-100">
        <label htmlFor={selectId} className="font-semibold tracking-wide">
          {selectLabel}
        </label>
        <select
          id={selectId}
          value={voiceStyle}
          onChange={(event) => setVoiceStyle(event.target.value as VoiceStyle)}
          className="rounded-md border border-amber-300/40 bg-slate-950/70 px-2 py-1 text-amber-100 focus:border-amber-200 focus:outline-none"
        >
          {Object.entries(voiceStyleProfiles).map(([value, profile]) => (
            <option key={value} value={value} className="bg-slate-950 text-amber-100">
              {profile.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={speakText}
        className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
          isSpeaking
            ? 'border-amber-300/60 bg-amber-500/30 text-amber-50'
            : 'border-amber-300/40 bg-slate-900/50 text-amber-200 hover:bg-slate-800/70 hover:text-white'
        }`}
        title={isSpeaking ? stopTitle : speakTitle}
      >
        {isSpeaking ? (
          <>
            <Pause className="h-4 w-4" />
            {stopLabel}
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            {speakLabel}
          </>
        )}
      </button>
    </div>
  );
}
