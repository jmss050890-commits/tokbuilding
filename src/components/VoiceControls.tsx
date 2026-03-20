'use client';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  onToggleMic: () => void;
  onToggleSpeaker: () => void;
  speakerEnabled: boolean;
  accentColor: string;
}

export default function VoiceControls({
  isListening,
  isSpeaking,
  onToggleMic,
  onToggleSpeaker,
  speakerEnabled,
  accentColor,
}: VoiceControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onToggleMic}
        title={isListening ? 'Stop listening' : 'Start voice input'}
        className={`relative p-3 rounded-full transition-all duration-200 ${
          isListening
            ? 'bg-red-500 text-white shadow-lg scale-110'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        style={isListening ? {} : { borderColor: accentColor }}
      >
        {isListening && (
          <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-75" />
        )}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isListening ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          )}
        </svg>
      </button>

      <button
        onClick={onToggleSpeaker}
        title={speakerEnabled ? 'Disable voice output' : 'Enable voice output'}
        className={`p-3 rounded-full transition-all duration-200 ${
          speakerEnabled
            ? 'text-white shadow-md'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
        }`}
        style={speakerEnabled ? { backgroundColor: accentColor } : {}}
      >
        {isSpeaking ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {speakerEnabled ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            )}
          </svg>
        )}
      </button>
    </div>
  );
}
