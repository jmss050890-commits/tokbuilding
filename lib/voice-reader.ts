// Voice config for First Guardian (Black woman, motivational, cheerful, calm, reassuring)
const FIRST_GUARDIAN_VOICE_CONFIG: VoiceReaderConfig = {
  pitch: 1.08, // slightly higher for warmth
  rate: 0.97, // calm, not rushed
  voicePattern: [
    // Google/Cloud/Windows voices that sound like Black women or are warm, motivational, and cheerful
    'en-US-Wavenet-F', 'en-US-Wavenet-A', 'en-US-Wavenet-C',
    'Google US English Female', 'Samantha', 'Aria', 'Jenny', 'Michelle', 'Tessa', 'Karen',
    'female', 'woman', 'girl', 'cheerful', 'motivational', 'calm', 'reassuring',
    // Add more as needed for platform coverage
  ],
};

/**
 * Get First Guardian-locked voice (Black woman, motivational, cheerful, calm, reassuring)
 */
export function getFirstGuardianVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Try preferred patterns first
  for (const pattern of FIRST_GUARDIAN_VOICE_CONFIG.voicePattern!) {
    const voice = voices.find(v => {
      const safeName = v.name.toLowerCase();
      const safePattern = pattern.toLowerCase();
      return safeName.includes(safePattern);
    });
    if (voice) return voice;
  }

  // Fallback: any English female voice
  const femaleVoice = voices.find(v =>
    v.lang.startsWith('en-') &&
    (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman'))
  );
  if (femaleVoice) return femaleVoice;

  // Last resort: any English voice
  return voices.find(v => v.lang.startsWith('en-')) || voices[0] || null;
}
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
  voicePattern: ['david', 'daniel', 'guy', 'aaron', 'roger', 'fred', 'alex', 'tom', 'google', 'en-US', 'en_US'],
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
 * Enforces male voice across all platforms (Windows, Mac, iOS, Android)
 */
export function getMrKpaVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Platform-specific male voice patterns for Mr. KPA (Jerome-locked)
  const malePatterns = [
    // Desktop Windows/Mac English male voices
    'david', 'daniel', 'guy', 'aaron', 'roger', 'fred', 'alex', 'tom', 'mark', 'mike',
    // iOS male voices  
    'aaron', 'adam', 'charles', 'david', 'fred', 'gordon', 'james', 'john', 'michael', 'ralph',
    // Android Google male voices
    'en-US-Neural2-A', 'en-US-Neural2-C', 'en-US-Neural2-E', 'en-US-Neural2-G',
    // Generic fallback indicators
    'male', 'man', 'boy', 'male voice', 'masculine',
  ];

  // Try platform-specific patterns first
  for (const pattern of malePatterns) {
    const voice = voices.find(v => {
      const safeName = v.name.toLowerCase();
      const safePattern = pattern.toLowerCase();
      return safeName.includes(safePattern);
    });
    if (voice) return voice;
  }

  // Strict fallback: only accept voices explicitly marked as male
  const maleVoice = voices.find(v => {
    const nameLower = v.name.toLowerCase();
    // Check name AND lang to prefer English male voices
    return (nameLower.includes('male') || nameLower.includes('man')) &&
           (v.lang.startsWith('en-') || v.lang === 'en');
  });
  if (maleVoice) return maleVoice;

  // Second fallback: any English voice (avoid female-only languages)
  const englishVoice = voices.find(v => 
    v.lang.startsWith('en-') && 
    !v.name.toLowerCase().includes('female')
  );
  if (englishVoice) return englishVoice;

  // Last resort: first English voice, period
  return voices.find(v => v.lang.startsWith('en-')) || voices[0] || null;
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
