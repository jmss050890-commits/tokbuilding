'use client';

import { useState } from 'react';
import { Play, Pause, Volume2, ChevronUp, ChevronDown, X } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant' | 'assistant-error' | 'intro';
}

interface SpeakerBoxProps {
  messages: Message[];
  currentMessageIndex: number;
  isPlaying: boolean;
  onPlayMessage: (index: number) => void;
  onStop: () => void;
  onDismiss: () => void;
}

export default function SpeakerBox({
  messages,
  currentMessageIndex,
  isPlaying,
  onPlayMessage,
  onStop,
  onDismiss,
}: SpeakerBoxProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const currentMessage = messages[currentMessageIndex];
  const isLastMessage = currentMessageIndex === messages.length - 1;
  const isFirstMessage = currentMessageIndex === 0;

  const handlePrevious = () => {
    if (currentMessageIndex > 0) {
      onPlayMessage(currentMessageIndex - 1);
    }
  };

  const handleNext = () => {
    if (!isLastMessage) {
      onPlayMessage(currentMessageIndex + 1);
    }
  };

  if (!currentMessage || currentMessage.type === 'user') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-slate-900/80 border-t border-blue-700/30 z-40">
      {/* Collapsed View */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-shrink-0 p-2 hover:bg-slate-800 rounded transition"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-blue-300" />
              ) : (
                <ChevronUp className="w-4 h-4 text-blue-300" />
              )}
            </button>

            <Volume2 className="w-4 h-4 text-blue-400 flex-shrink-0" />

            <div className="flex-1 min-w-0">
              <p className="text-sm text-blue-100 truncate">
                {isPlaying ? 'Now reading...' : 'Ready to read'}
              </p>
              <p className="text-xs text-blue-300/60 truncate">
                Message {currentMessageIndex + 1} of {messages.filter((m) => m.type === 'assistant').length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={isPlaying ? onStop : () => onPlayMessage(currentMessageIndex)}
              className="p-2 bg-blue-600/50 hover:bg-blue-600 text-white rounded transition"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={onDismiss}
              className="p-2 hover:bg-slate-800 rounded transition text-blue-300"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-100"
            style={{
              width: isPlaying ? '100%' : '0%',
              transitionDuration: isPlaying ? '20s' : '150ms',
              transitionTimingFunction: 'linear',
            }}
          ></div>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="max-w-6xl mx-auto px-4 py-4 border-t border-blue-700/20 bg-slate-950/50">
          {/* Message Preview */}
          <div className="mb-4 max-h-24 overflow-y-auto">
            <p className="text-sm text-blue-100 leading-relaxed">
              {currentMessage.content.substring(0, 200)}
              {currentMessage.content.length > 200 ? '...' : ''}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={isFirstMessage}
                className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-blue-200 text-sm transition"
                title="Previous message"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                disabled={isLastMessage}
                className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-blue-200 text-sm transition"
                title="Next message"
              >
                Next →
              </button>
            </div>

            {/* Main Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={isPlaying ? onStop : () => onPlayMessage(currentMessageIndex)}
                className={`px-4 py-2 rounded font-medium transition ${
                  isPlaying
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 inline mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 inline mr-2" />
                    Play
                  </>
                )}
              </button>

              <button
                onClick={onDismiss}
                className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-blue-200 transition text-sm"
              >
                Close
              </button>
            </div>

            {/* Message Counter */}
            <div className="text-right text-xs text-blue-300/70">
              <p>Message {currentMessageIndex + 1}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
