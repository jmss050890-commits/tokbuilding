/**
 * Shared Voice Reading Utility
 * Allows narrative pages to be read aloud by Mr. KPA's voice
 * Uses Web Speech API with KPA-aligned voice settings
 */

export interface VoiceReaderConfig {
  voiceName?: string; // e.g., "Google US English Male"
  pitch?: number; // 0.5-2.0, default 0.76 for Mr. KPA
  rate?: number; // 0.5-2.0, default 0.84 for Mr. KPA
  voicePattern?: string[]; // Preferred voice names in order
}

const MR_KPA_CONFIG: VoiceReaderConfig = {
  pitch: 0.76,
  rate: 0.84,
  voicePattern: ['david', 'daniel', 'guy', 'aaron', 'roger', 'fred', 'alex', 'tom', 'google'],
};

/**
 * Split text into chunks for SpeechSynthesis
 * Max ~200 words per chunk to avoid browser limits
 */
export function splitIntoSpeechChunks(text: string, maxChunkSize = 200): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';
  let wordCount = 0;

  for (const sentence of sentences) {
    const sentenceWordCount = sentence.trim().split(/\s+/).length;
    
    if (wordCount + sentenceWordCount > maxChunkSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
      wordCount = 0;
    }
    
    currentChunk += sentence;
    wordCount += sentenceWordCount;
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter(chunk => chunk.length > 0);
}

/**
 * Get Mr. KPA-locked voice from available voices
 */
export function getMrKpaVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find voice matching Mr. KPA's preference pattern
  for (const pattern of MR_KPA_CONFIG.voicePattern || []) {
    const voice = voices.find(v => 
      v.name.toLowerCase().includes(pattern.toLowerCase()) &&
      v.name.toLowerCase().includes('male')
    );
    if (voice) return voice;
  }

  // Fallback: any male voice
  const maleVoice = voices.find(v => v.name.toLowerCase().includes('male'));
  if (maleVoice) return maleVoice;

  // Last resort: first available voice
  return voices[0] || null;
}

/**
 * Main voice reader class for narrative pages
 */
export class NarrativeVoiceReader {
  private currentChunks: string[] = [];
  private currentIndex = 0;
  private isPlaying = false;
  private utterances: SpeechSynthesisUtterance[] = [];
  private onPlayStatusChange?: (status: 'playing' | 'paused' | 'stopped') => void;
  private onProgressChange?: (current: number, total: number) => void;
  private config: VoiceReaderConfig;

  constructor(config: Partial<VoiceReaderConfig> = {}) {
    this.config = { ...MR_KPA_CONFIG, ...config };
  }

  /**
   * Start reading text aloud
   */
  public read(text: string, onStatusChange?: (status: 'playing' | 'paused' | 'stopped') => void) {
    this.onPlayStatusChange = onStatusChange;
    this.currentChunks = splitIntoSpeechChunks(text);
    this.currentIndex = 0;
    this.utterances = [];

    if (this.currentChunks.length === 0) return;

    this.playChunk(0);
  }

  /**
   * Play a specific chunk from the queue
   */
  private playChunk(index: number) {
    if (index >= this.currentChunks.length) {
      this.isPlaying = false;
      this.onPlayStatusChange?.('stopped');
      return;
    }

    const chunk = this.currentChunks[index];
    const utterance = new SpeechSynthesisUtterance(chunk);

    const voice = getMrKpaVoice();
    if (voice) utterance.voice = voice;

    utterance.pitch = this.config.pitch || 0.76;
    utterance.rate = this.config.rate || 0.84;
    utterance.volume = 1;

    this.utterances[index] = utterance;
    this.currentIndex = index;
    this.isPlaying = true;

    utterance.onstart = () => {
      this.onPlayStatusChange?.('playing');
    };

    utterance.onend = () => {
      this.onProgressChange?.(index + 1, this.currentChunks.length);
      if (index + 1 < this.currentChunks.length) {
        // Small delay between chunks for natural pacing
        setTimeout(() => this.playChunk(index + 1), 200);
      } else {
        this.isPlaying = false;
        this.onPlayStatusChange?.('stopped');
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      this.isPlaying = false;
      this.onPlayStatusChange?.('stopped');
    };

    window.speechSynthesis.cancel(); // Clear any existing speech
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Pause reading
   */
  public pause() {
    if (this.isPlaying) {
      window.speechSynthesis.pause();
      this.isPlaying = false;
      this.onPlayStatusChange?.('paused');
    }
  }

  /**
   * Resume reading
   */
  public resume() {
    if (!this.isPlaying && this.currentIndex < this.currentChunks.length) {
      window.speechSynthesis.resume();
      this.isPlaying = true;
      this.onPlayStatusChange?.('playing');
    }
  }

  /**
   * Stop reading completely
   */
  public stop() {
    window.speechSynthesis.cancel();
    this.isPlaying = false;
    this.currentIndex = 0;
    this.utterances = [];
    this.onPlayStatusChange?.('stopped');
  }

  /**
   * Check if currently playing
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Get progress info
   */
  public getProgress(): { current: number; total: number } {
    return {
      current: this.currentIndex,
      total: this.currentChunks.length,
    };
  }
}
