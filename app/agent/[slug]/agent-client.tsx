"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AGENTS, type AgentConfig } from "@/lib/lib/lib/agents";
import { resolveAgentSlug } from "@/lib/agent-routing";
import {
  getSpeechRecognitionAPI,
  type SpeechRecognitionEventLike,
  type SpeechRecognitionLike,
} from "@/lib/browser-speech";

const VOICE_LOAD_TIMEOUT_MS = 5000;
const VOICE_POLL_INTERVAL_MS = 250;
const TOKFAITH_GUEST_ID_KEY = "tokfaith_guest_user_id";
const MALE_VOICE_PATTERNS = ["david", "daniel", "guy", "aaron", "roger", "fred", "alex", "tom", "mark", "ryan", "james"];
const FEMALE_VOICE_PATTERNS = ["zira", "samantha", "victoria", "moira", "karen", "fiona", "anna", "emma", "bella", "aria", "jenny", "ava"];
const MOBILE_DEVICE_PATTERN = /android|iphone|ipad|ipod|mobile/i;
const WISDOM_SOFT_VOICE_PATTERNS = ["google", "samantha", "zira", "ava", "victoria", "aria", "jenny"];
const TOKFAITH_SOFT_VOICE_PATTERNS = ["moira", "fiona", "samantha", "victoria", "aria", "jenny", "zira", "ava", "emma", "google"];
const TOKFAITH_FEMALE_VOICE_PATTERNS = ["moira", "fiona", "samantha", "victoria", "aria", "jenny", "zira", "ava", "emma", "anna", "bella"];
const MRKPA_SOFT_MALE_VOICE_PATTERNS = ["david", "daniel", "aaron", "roger", "fred", "alex", "tom", "google"];

function voiceLooksMale(voiceName: string) {
  const normalizedVoiceName = voiceName.toLowerCase();
  return (
    MALE_VOICE_PATTERNS.some((pattern) => normalizedVoiceName.includes(pattern)) ||
    normalizedVoiceName.includes("male")
  ) && !FEMALE_VOICE_PATTERNS.some((pattern) => normalizedVoiceName.includes(pattern));
}

function voiceLooksFemale(voiceName: string) {
  const normalizedVoiceName = voiceName.toLowerCase();
  return (
    TOKFAITH_FEMALE_VOICE_PATTERNS.some((pattern) => normalizedVoiceName.includes(pattern)) ||
    FEMALE_VOICE_PATTERNS.some((pattern) => normalizedVoiceName.includes(pattern)) ||
    normalizedVoiceName.includes("female")
  ) && !voiceLooksMale(normalizedVoiceName);
}

function getTokFaithLockedVoice(voices: SpeechSynthesisVoice[], preferredPatterns: string[] = []) {
  const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
  const humanEnglishVoices = englishVoices.filter((voice) => {
    const voiceName = voice.name.toLowerCase();
    return !voiceName.includes("robot") && !voiceName.includes("default");
  });

  const preferredFemaleHumanVoice = humanEnglishVoices.find((voice) => {
    const voiceName = voice.name.toLowerCase();
    const matchesPreference = preferredPatterns.some((pattern) => voiceName.includes(pattern.toLowerCase()));
    return matchesPreference && voiceLooksFemale(voiceName);
  });

  if (preferredFemaleHumanVoice) {
    return preferredFemaleHumanVoice;
  }

  const preferredFemaleVoice = englishVoices.find((voice) => {
    const voiceName = voice.name.toLowerCase();
    const matchesPreference = preferredPatterns.some((pattern) => voiceName.includes(pattern.toLowerCase()));
    return matchesPreference && voiceLooksFemale(voiceName);
  });

  if (preferredFemaleVoice) {
    return preferredFemaleVoice;
  }

  const labeledFemaleHumanVoice = humanEnglishVoices.find((voice) => voiceLooksFemale(voice.name));
  if (labeledFemaleHumanVoice) {
    return labeledFemaleHumanVoice;
  }

  const safeHumanVoice = humanEnglishVoices.find((voice) => !voiceLooksMale(voice.name));
  if (safeHumanVoice) {
    return safeHumanVoice;
  }

  const labeledFemaleVoice = englishVoices.find((voice) => voiceLooksFemale(voice.name));
  if (labeledFemaleVoice) {
    return labeledFemaleVoice;
  }

  return englishVoices.find((voice) => !voiceLooksMale(voice.name));
}

function getMrKpaLockedVoice(voices: SpeechSynthesisVoice[], preferredPatterns: string[] = []) {
  const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
  const humanEnglishVoices = englishVoices.filter((voice) => {
    const voiceName = voice.name.toLowerCase();
    return !voiceName.includes("robot") && !voiceName.includes("default");
  });

  const preferredMaleHumanVoice = humanEnglishVoices.find((voice) => {
    const voiceName = voice.name.toLowerCase();
    const matchesPreference = preferredPatterns.some((pattern) => voiceName.includes(pattern.toLowerCase()));
    return matchesPreference && voiceLooksMale(voiceName);
  });

  if (preferredMaleHumanVoice) {
    return preferredMaleHumanVoice;
  }

  const preferredMaleVoice = englishVoices.find((voice) => {
    const voiceName = voice.name.toLowerCase();
    const matchesPreference = preferredPatterns.some((pattern) => voiceName.includes(pattern.toLowerCase()));
    return matchesPreference && voiceLooksMale(voiceName);
  });

  if (preferredMaleVoice) {
    return preferredMaleVoice;
  }

  const labeledMaleHumanVoice = humanEnglishVoices.find((voice) => voiceLooksMale(voice.name));
  if (labeledMaleHumanVoice) {
    return labeledMaleHumanVoice;
  }

  const labeledMaleVoice = englishVoices.find((voice) => voiceLooksMale(voice.name));
  if (labeledMaleVoice) {
    return labeledMaleVoice;
  }

  return humanEnglishVoices.find((voice) => !voiceLooksFemale(voice.name));
}

function splitIntoSpeechChunks(text: string) {
  const normalizedText = text.replace(/\s+/g, " ").trim();
  if (!normalizedText) {
    return [];
  }

  const sentences = normalizedText.match(/[^.!?]+[.!?]*/g) ?? [normalizedText];
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    const nextChunk = currentChunk ? `${currentChunk} ${sentence}`.trim() : sentence.trim();
    if (nextChunk.length <= 220) {
      currentChunk = nextChunk;
      continue;
    }

    if (currentChunk) {
      chunks.push(currentChunk);
      currentChunk = "";
    }

    if (sentence.length <= 220) {
      currentChunk = sentence.trim();
      continue;
    }

    const words = sentence.trim().split(" ");
    let wordChunk = "";
    for (const word of words) {
      const candidate = wordChunk ? `${wordChunk} ${word}` : word;
      if (candidate.length <= 220) {
        wordChunk = candidate;
      } else {
        if (wordChunk) {
          chunks.push(wordChunk);
        }
        wordChunk = word;
      }
    }

    if (wordChunk) {
      currentChunk = wordChunk;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

function selectVoice(agent: AgentConfig | null, voices: SpeechSynthesisVoice[]) {
  let selectedVoice: SpeechSynthesisVoice | undefined;
  const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
  const humanEnglishVoices = englishVoices.filter((voice) => {
    const voiceName = voice.name.toLowerCase();
    return !voiceName.includes("robot") && !voiceName.includes("default");
  });

  const isMobileDevice = isMobileSpeechDevice();

  if (agent?.slug === "tokfaith" && agent.voicePreferences?.length && !isMobileDevice) {
    selectedVoice = getTokFaithLockedVoice(voices, agent.voicePreferences);
  }

  if (!selectedVoice && agent?.slug === "mr-kpa" && agent.voicePreferences?.length && !isMobileDevice) {
    selectedVoice = getMrKpaLockedVoice(voices, agent.voicePreferences);
  }

  if (!selectedVoice && agent?.voicePreferences?.length) {
    selectedVoice = englishVoices.find((voice) =>
      agent.voicePreferences?.some((pattern) => voice.name.toLowerCase().includes(pattern.toLowerCase())),
    );
  }

  if (!selectedVoice && agent?.voiceName) {
    selectedVoice = selectedVoice ?? voices.find(
      (voice) => voice.name.toLowerCase() === agent.voiceName?.toLowerCase(),
    );

    if (!selectedVoice) {
      selectedVoice = voices.find((voice) =>
        voice.name.toLowerCase().includes(agent.voiceName?.toLowerCase() || ""),
      );
    }

    if (!selectedVoice && agent.voiceName.toLowerCase().includes("google")) {
      const isRequestingFemale = agent.voiceName.toLowerCase().includes("female");
      selectedVoice = voices.find((voice) => {
        const hasGoogleLabel = voice.name.toLowerCase().includes("google");
        const hasFemaleLabel = voice.name.toLowerCase().includes("female");
        return hasGoogleLabel && (isRequestingFemale ? hasFemaleLabel : !hasFemaleLabel);
      });
    }
  }

  if (!selectedVoice && agent?.voiceGender) {
    if (agent.voiceGender === "female") {
      selectedVoice = englishVoices.find((voice) =>
        FEMALE_VOICE_PATTERNS.some((pattern) => voice.name.toLowerCase().includes(pattern)),
      );
    } else {
      // For male voices: prefer male-sounding voices first
      selectedVoice = englishVoices.find((voice) => {
        const voiceName = voice.name.toLowerCase();
        const matchesMalePattern = MALE_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern));
        const soundsFemale = FEMALE_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern));
        return matchesMalePattern && !soundsFemale;
      });
      
      // On mobile: if no explicit male voice found, still prefer non-female voices
      if (!selectedVoice && isMobileDevice) {
        selectedVoice = englishVoices.find((voice) => !voiceLooksFemale(voice.name));
      }
    }
  }

  if (!selectedVoice && agent?.slug === "tokfaith" && !isMobileDevice) {
    selectedVoice = getTokFaithLockedVoice(voices, TOKFAITH_FEMALE_VOICE_PATTERNS);
  }

  if (!selectedVoice && agent?.slug === "first-guardian" && !isMobileDevice) {
    // First Guardian: female voice with warmth
    selectedVoice = englishVoices.find((voice) => {
      const voiceName = voice.name.toLowerCase();
      const voicePattern = agent.voicePreferences?.some((pattern) => voiceName.includes(pattern.toLowerCase()));
      const isFemale = FEMALE_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern));
      return voicePattern || (isFemale && !MALE_VOICE_PATTERNS.some((p) => voiceName.includes(p)));
    });
  }

  if (!selectedVoice && agent?.slug === "mr-kpa") {
    if (!isMobileDevice) {
      // Desktop: strict male voice lock
      selectedVoice = getMrKpaLockedVoice(voices, agent.voicePreferences || MALE_VOICE_PATTERNS);
    } else {
      // Mobile: prefer male-sounding voices (flexible fallback)
      selectedVoice = englishVoices.find((voice) => voiceLooksMale(voice.name));
    }
  }

  if (!selectedVoice) {
    // Final absolute guard for TokFaith: ALWAYS female, no exceptions
    if (agent?.slug === "tokfaith") {
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      selectedVoice = englishVoices.find((voice) => {
        const voiceName = voice.name.toLowerCase();
        // Ensure it's not a known male voice
        const isMale = MALE_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern));
        return !isMale;
      });
    }

    // Final absolute guard for First Guardian: ALWAYS female, no exceptions
    if (!selectedVoice && agent?.slug === "first-guardian") {
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      selectedVoice = englishVoices.find((voice) => {
        const voiceName = voice.name.toLowerCase();
        // Ensure it's not a known male voice
        const isMale = MALE_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern));
        return !isMale;
      });
    }
    
    // General fallback
    selectedVoice = humanEnglishVoices[0] ?? englishVoices[0];
  }

  if (!selectedVoice && voices.length > 0) {
    selectedVoice =
      voices.find(
        (voice) =>
          !voice.name.toLowerCase().includes("robot") &&
          !voice.name.toLowerCase().includes("default"),
      ) || voices[0];
  }

  const isMobile = isMobileSpeechDevice();

  // Final enforcement: override if wrong gender slipped through
  if (agent?.slug === "first-guardian" && selectedVoice) {
    const isMaleVoice = voiceLooksMale(selectedVoice.name);
    if (isMaleVoice) {
      // Wrong gender — force female
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const femaleVoice = englishVoices.find((voice) => {
        const voiceName = voice.name.toLowerCase();
        return FEMALE_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern)) || 
               (!MALE_VOICE_PATTERNS.some((p) => voiceName.includes(p)) && voiceName.includes("female"));
      });
      if (femaleVoice) selectedVoice = femaleVoice;
    }
  }

  if (agent?.slug === "mr-kpa" && selectedVoice) {
    const isFemaleVoice = voiceLooksFemale(selectedVoice.name);
    if (isFemaleVoice) {
      // Wrong gender — force male (strict enforcement)
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const strictMaleVoice = englishVoices.find((voice) => {
        const voiceName = voice.name.toLowerCase();
        return MALE_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern)) && 
               !FEMALE_VOICE_PATTERNS.some((p) => voiceName.includes(p));
      });
      if (strictMaleVoice) selectedVoice = strictMaleVoice;
    }
  }

  if (agent?.slug === "wisdom" && selectedVoice) {
    const isMaleVoice = voiceLooksMale(selectedVoice.name);
    if (isMaleVoice) {
      // Wrong gender — force female
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const femaleVoice = englishVoices.find((voice) => voiceLooksFemale(voice.name));
      if (femaleVoice) selectedVoice = femaleVoice;
    }
  }

  if (agent?.slug === "hatata" && selectedVoice) {
    const isMaleVoice = voiceLooksMale(selectedVoice.name);
    if (isMaleVoice) {
      // Wrong gender — force female
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const femaleVoice = englishVoices.find((voice) => voiceLooksFemale(voice.name));
      if (femaleVoice) selectedVoice = femaleVoice;
    }
  }

  if (agent?.slug === "grace" && selectedVoice) {
    const isMaleVoice = voiceLooksMale(selectedVoice.name);
    if (isMaleVoice) {
      // Wrong gender — force female
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const femaleVoice = englishVoices.find((voice) => voiceLooksFemale(voice.name));
      if (femaleVoice) selectedVoice = femaleVoice;
    }
  }

  if (agent?.slug === "a1" && selectedVoice) {
    const isFemaleVoice = voiceLooksFemale(selectedVoice.name);
    if (isFemaleVoice) {
      // Wrong gender — force male
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const maleVoice = englishVoices.find((voice) => voiceLooksMale(voice.name));
      if (maleVoice) selectedVoice = maleVoice;
    }
  }

  if (agent?.slug === "coach-daniels" && selectedVoice) {
    const isFemaleVoice = voiceLooksFemale(selectedVoice.name);
    if (isFemaleVoice) {
      // Wrong gender — force male
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const maleVoice = englishVoices.find((voice) => voiceLooksMale(voice.name));
      if (maleVoice) selectedVoice = maleVoice;
    }
  }

  if (agent?.slug === "tokseo" && selectedVoice) {
    const isMaleVoice = voiceLooksMale(selectedVoice.name);
    if (isMaleVoice) {
      // Wrong gender — force female
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const femaleVoice = englishVoices.find((voice) => voiceLooksFemale(voice.name));
      if (femaleVoice) selectedVoice = femaleVoice;
    }
  }

  if (agent?.slug === "tok2myia" && selectedVoice) {
    const isMaleVoice = voiceLooksMale(selectedVoice.name);
    if (isMaleVoice) {
      // Wrong gender — force female
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const femaleVoice = englishVoices.find((voice) => voiceLooksFemale(voice.name));
      if (femaleVoice) selectedVoice = femaleVoice;
    }
  }

  if (agent?.slug === "tokfaith" && selectedVoice) {
    const isMaleVoice = voiceLooksMale(selectedVoice.name);
    if (isMaleVoice) {
      // Wrong gender — force female
      const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const femaleVoice = englishVoices.find((voice) => voiceLooksFemale(voice.name));
      if (femaleVoice) selectedVoice = femaleVoice;
    }
  }

  return selectedVoice;
}

function isMobileSpeechDevice() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return MOBILE_DEVICE_PATTERN.test(navigator.userAgent);
}

function getSpeechSettings(agent: AgentConfig | null, selectedVoice?: SpeechSynthesisVoice) {
  const defaultPitch = agent?.voicePitch || 1;
  const defaultRate = agent?.voiceRate || 1;
  const isMobile = isMobileSpeechDevice();

  if (agent?.slug === "tokfaith" && isMobile) {
    const voiceName = selectedVoice?.name.toLowerCase() || "";
    const shouldSoftenVoice = TOKFAITH_SOFT_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern));

    return {
      pitch: shouldSoftenVoice ? Math.min(defaultPitch, 0.88) : Math.min(defaultPitch, 0.84),
      rate: shouldSoftenVoice ? Math.min(defaultRate, 0.8) : Math.min(defaultRate, 0.84),
    };
  }

  if (agent?.slug === "mr-kpa" && isMobile) {
    const voiceName = selectedVoice?.name.toLowerCase() || "";
    const shouldSoftenVoice = MRKPA_SOFT_MALE_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern));

    return {
      pitch: Math.max(0.70, Math.min(defaultPitch, shouldSoftenVoice ? 0.72 : 0.74)),
      rate: shouldSoftenVoice ? Math.min(defaultRate, 0.78) : Math.min(defaultRate, 0.82),
    };
  }

  if (agent?.slug !== "wisdom" || !isMobile) {
    return { pitch: defaultPitch, rate: defaultRate };
  }

  const voiceName = selectedVoice?.name.toLowerCase() || "";
  const shouldSoftenVoice = WISDOM_SOFT_VOICE_PATTERNS.some((pattern) => voiceName.includes(pattern));

  return {
    pitch: shouldSoftenVoice ? Math.min(defaultPitch, 0.94) : Math.min(defaultPitch, 0.98),
    rate: Math.min(defaultRate, 0.88),
  };
}

function getRotatingSuggestions(suggestions: string[], rotationIndex: number, visibleCount = 3) {
  if (suggestions.length <= visibleCount) {
    return suggestions;
  }

  return Array.from({ length: visibleCount }, (_, index) => {
    const suggestionIndex = (rotationIndex + index) % suggestions.length;
    return suggestions[suggestionIndex];
  });
}

function AvatarBadge({
  agent,
  accentColor,
  size,
  fontSize,
}: {
  agent: AgentConfig;
  accentColor: string;
  size: number;
  fontSize: number;
}) {
  if (agent.avatar.startsWith("/")) {
    return (
      <img
        src={agent.avatar}
        alt={`${agent.name} avatar`}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          backgroundColor: "#111",
          border: `2px solid ${accentColor}`,
          boxShadow: "0 10px 24px rgba(0,0,0,0.24)",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: accentColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        fontWeight: "bold",
        color: "#111",
      }}
    >
      {agent.avatar}
    </div>
  );
}

function GuardianPresence({ agent, accentColor, onPromptSelect, suggestions }: {
  agent: AgentConfig;
  accentColor: string;
  onPromptSelect: (prompt: string) => void;
  suggestions: string[];
}) {
  return (
    <div
      style={{
        margin: "0 20px 20px",
        border: `1px solid ${accentColor}`,
        borderRadius: 24,
        padding: 20,
        background:
          "linear-gradient(135deg, rgba(192,132,87,0.24) 0%, rgba(74,52,38,0.55) 48%, rgba(17,17,17,0.96) 100%)",
        boxShadow: "0 18px 48px rgba(0,0,0,0.28)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.24)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#f8eadb",
          }}
        >
          {agent.tagline || "SVL Legacy Edition"}
        </span>
        {agent.protocolLabel ? (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              backgroundColor: "rgba(17,17,17,0.44)",
              border: `1px solid ${accentColor}`,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            Protocol: {agent.protocolLabel}
          </span>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <div>
          <h2 style={{ margin: "0 0 10px", fontSize: 28, lineHeight: 1.1 }}>The house gets protected first.</h2>
          <p style={{ margin: 0, color: "#f3e5d6", lineHeight: 1.7, fontSize: 15 }}>
            {agent.legacyStory || agent.welcomeMessage}
          </p>
        </div>

        <div
          style={{
            borderRadius: 18,
            padding: 16,
            backgroundColor: "rgba(8,8,8,0.34)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p style={{ margin: "0 0 12px", color: "#f8eadb", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
            Protective Presence
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            {(agent.presenceNotes || []).map((note) => (
              <div
                key={note}
                style={{
                  padding: "10px 12px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#fff4ea",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>

      {agent.signatureLines?.length ? (
        <div
          style={{
            marginTop: 18,
            borderRadius: 18,
            padding: 16,
            backgroundColor: "rgba(8,8,8,0.34)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p style={{ margin: "0 0 12px", color: "#f8eadb", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
            Michelle's Voice
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            {agent.signatureLines.map((line) => (
              <div
                key={line}
                style={{
                  padding: "12px 14px",
                  borderLeft: `3px solid ${accentColor}`,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff7ef",
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                "{line}"
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div style={{ marginTop: 18 }}>
        <p style={{ margin: "0 0 10px", color: "#f8eadb", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
          Start With Michelle's Voice
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onPromptSelect(suggestion)}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: `1px solid ${accentColor}`,
                backgroundColor: "rgba(17,17,17,0.42)",
                color: "#fff",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MrKpaPresence({ agent, accentColor, onPromptSelect, suggestions }: {
  agent: AgentConfig;
  accentColor: string;
  onPromptSelect: (prompt: string) => void;
  suggestions: string[];
}) {
  return (
    <div
      style={{
        margin: "0 20px 20px",
        border: `1px solid ${accentColor}`,
        borderRadius: 24,
        padding: 20,
        background:
          "linear-gradient(135deg, rgba(239,68,68,0.18) 0%, rgba(127,29,29,0.48) 42%, rgba(11,11,11,0.98) 100%)",
        boxShadow: "0 18px 48px rgba(0,0,0,0.28)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.24)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fee2e2",
          }}
        >
          {agent.tagline || "Jerome Sanders Legacy Command"}
        </span>
        {agent.protocolLabel ? (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              backgroundColor: "rgba(17,17,17,0.44)",
              border: `1px solid ${accentColor}`,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            Mode: {agent.protocolLabel}
          </span>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <div>
          <h2 style={{ margin: "0 0 10px", fontSize: 28, lineHeight: 1.1 }}>Truth, structure, and mission pressure turned useful.</h2>
          <p style={{ margin: 0, color: "#fee2e2", lineHeight: 1.7, fontSize: 15 }}>
            {agent.legacyStory || agent.welcomeMessage}
          </p>
        </div>

        <div
          style={{
            borderRadius: 18,
            padding: 16,
            backgroundColor: "rgba(8,8,8,0.34)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p style={{ margin: "0 0 12px", color: "#fee2e2", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
            Mr. KPA Presence
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            {(agent.presenceNotes || []).map((note) => (
              <div
                key={note}
                style={{
                  padding: "10px 12px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#fff5f5",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>

      {agent.signatureLines?.length ? (
        <div
          style={{
            marginTop: 18,
            borderRadius: 18,
            padding: 16,
            backgroundColor: "rgba(8,8,8,0.34)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p style={{ margin: "0 0 12px", color: "#fee2e2", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
            Talk Like Jerome
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            {agent.signatureLines.map((line) => (
              <div
                key={line}
                style={{
                  padding: "12px 14px",
                  borderLeft: `3px solid ${accentColor}`,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff7f7",
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                "{line}"
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div style={{ marginTop: 18 }}>
        <p style={{ margin: "0 0 10px", color: "#fee2e2", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
          Start With Mr. KPA
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onPromptSelect(suggestion)}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: `1px solid ${accentColor}`,
                backgroundColor: "rgba(17,17,17,0.42)",
                color: "#fff",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function GuardianSafetyCard({ agent, accentColor }: {
  agent: AgentConfig;
  accentColor: string;
}) {
  if (!agent.safetyCardBullets?.length) {
    return null;
  }

  return (
    <div
      style={{
        margin: "0 20px 16px",
        borderRadius: 18,
        border: `1px solid ${accentColor}`,
        backgroundColor: "rgba(24, 18, 14, 0.78)",
        padding: 16,
      }}
    >
      <p
        style={{
          margin: "0 0 10px",
          color: "#f8eadb",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {agent.safetyCardTitle || "KPA Safety"}
      </p>
      <div style={{ display: "grid", gap: 8 }}>
        {agent.safetyCardBullets.map((bullet) => (
          <div
            key={bullet}
            style={{
              color: "#f7efe8",
              lineHeight: 1.5,
              fontSize: 13,
            }}
          >
            {bullet}
          </div>
        ))}
      </div>
    </div>
  );
}

function FaithPresence({ agent, accentColor, onPromptSelect, suggestions, compact }: {
  agent: AgentConfig;
  accentColor: string;
  onPromptSelect: (prompt: string) => void;
  suggestions: string[];
  compact?: boolean;
}) {
  const compactSummary =
    "Older, wise, faithful, and easy to talk to. Scripture guidance, practical faith, and a stronger next step.";
  const visibleSuggestions = compact ? suggestions.slice(0, 2) : suggestions;

  return (
    <div
      style={{
        margin: compact ? "0 12px 12px" : "0 20px 20px",
        border: `1px solid ${accentColor}`,
        borderRadius: 24,
        padding: compact ? 14 : 20,
        background:
          "linear-gradient(135deg, rgba(244,201,93,0.2) 0%, rgba(146,86,20,0.36) 42%, rgba(20,14,8,0.96) 100%)",
        boxShadow: "0 18px 48px rgba(0,0,0,0.28)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.24)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fdf0c1",
          }}
        >
          {agent.tagline || "Faith Guide"}
        </span>
        {agent.protocolLabel ? (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              backgroundColor: "rgba(17,17,17,0.44)",
              border: `1px solid ${accentColor}`,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            Path: {agent.protocolLabel}
          </span>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: compact ? 12 : 18, gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <div>
          <h2 style={{ margin: "0 0 10px", fontSize: compact ? 22 : 28, lineHeight: 1.1 }}>Faith, strength, and steady footing.</h2>
          <p style={{ margin: 0, color: "#fff5d6", lineHeight: compact ? 1.5 : 1.7, fontSize: compact ? 14 : 15 }}>
            {compact ? compactSummary : agent.legacyStory || agent.welcomeMessage}
          </p>
        </div>

        {!compact ? (
          <div
            style={{
              borderRadius: 18,
              padding: 16,
              backgroundColor: "rgba(8,8,8,0.34)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <p style={{ margin: "0 0 12px", color: "#fdf0c1", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
              Study Lanes
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              {(agent.presenceNotes || []).map((note) => (
                <div
                  key={note}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 14,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "#fff8e7",
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {!compact && agent.signatureLines?.length ? (
        <div
          style={{
            marginTop: 18,
            borderRadius: 18,
            padding: 16,
            backgroundColor: "rgba(8,8,8,0.34)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p style={{ margin: "0 0 12px", color: "#fdf0c1", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
            Speak This In Faith
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            {agent.signatureLines.map((line) => (
              <div
                key={line}
                style={{
                  padding: "12px 14px",
                  borderLeft: `3px solid ${accentColor}`,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff9ec",
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                "{line}"
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {!compact && agent.closingPracticeBullets?.length ? (
        <div
          style={{
            marginTop: 18,
            borderRadius: 18,
            padding: 16,
            backgroundColor: "rgba(8,8,8,0.34)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p style={{ margin: "0 0 12px", color: "#fdf0c1", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
            {agent.closingPracticeTitle || "Closing Practice"}
          </p>
          <div style={{ display: "grid", gap: 8 }}>
            {agent.closingPracticeBullets.map((item) => (
              <div
                key={item}
                style={{
                  color: "#fff5d6",
                  lineHeight: 1.5,
                  fontSize: 14,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div style={{ marginTop: 18 }}>
        <p style={{ margin: "0 0 10px", color: "#fdf0c1", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 12 }}>
          {compact ? "Quick Start" : "Start The Conversation"}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {visibleSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onPromptSelect(suggestion)}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: `1px solid ${accentColor}`,
                backgroundColor: "rgba(17,17,17,0.42)",
                color: "#fff",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MissionMeetingCard({ agent, accentColor, onPromptSelect }: {
  agent: AgentConfig;
  accentColor: string;
  onPromptSelect: (prompt: string) => void;
}) {
  if (!agent.meetingAgenda?.length) {
    return null;
  }

  return (
    <div
      style={{
        margin: "0 20px 16px",
        borderRadius: 20,
        border: `1px solid ${accentColor}`,
        background: `linear-gradient(180deg, ${accentColor}20 0%, rgba(17,17,17,0.96) 100%)`,
        padding: 18,
        boxShadow: "0 18px 44px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: `1px solid ${accentColor}`,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Daily Alignment
        </span>
        {agent.meetingTimeLabel ? (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              backgroundColor: "rgba(0,0,0,0.24)",
              color: "#f6f6f6",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {agent.meetingTimeLabel}
          </span>
        ) : null}
      </div>

      <h2 style={{ margin: "0 0 8px", fontSize: 24, lineHeight: 1.1 }}>
        {agent.meetingCadenceTitle || "Daily Team Meeting"}
      </h2>
      {agent.meetingCadenceCopy ? (
        <p style={{ margin: "0 0 14px", color: "#f1f1f1", lineHeight: 1.65, fontSize: 14 }}>
          {agent.meetingCadenceCopy}
        </p>
      ) : null}

      <div style={{ display: "grid", gap: 10 }}>
        {agent.meetingAgenda.map((item) => (
          <div
            key={item}
            style={{
              padding: "11px 13px",
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff8f4",
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
        <button
          type="button"
          onClick={() => onPromptSelect("Set today's AI Agent Team Meeting agenda")}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: `1px solid ${accentColor}`,
            backgroundColor: "rgba(0,0,0,0.18)",
            color: "#fff",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Build Today's Agenda
        </button>
        {agent.meetingDownloadPath ? (
          <a
            href={agent.meetingDownloadPath}
            style={{
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              backgroundColor: "rgba(255,255,255,0.04)",
              color: "#fff",
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            Download Calendar Invite
          </a>
        ) : null}
      </div>
    </div>
  );
}

function CommandFrameworkCard({ agent, accentColor, onPromptSelect }: {
  agent: AgentConfig;
  accentColor: string;
  onPromptSelect: (prompt: string) => void;
}) {
  if (!agent.commandFrameworkSteps?.length) {
    return null;
  }

  return (
    <div
      style={{
        margin: "0 20px 16px",
        borderRadius: 20,
        border: `1px solid ${accentColor}`,
        background: `linear-gradient(180deg, ${accentColor}18 0%, rgba(17,17,17,0.98) 100%)`,
        padding: 18,
        boxShadow: "0 18px 44px rgba(0,0,0,0.22)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: `1px solid ${accentColor}`,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Command Mode
        </span>
        {agent.protocolLabel ? (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              backgroundColor: "rgba(0,0,0,0.24)",
              color: "#f6f6f6",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {agent.protocolLabel}
          </span>
        ) : null}
      </div>

      <h2 style={{ margin: "0 0 8px", fontSize: 24, lineHeight: 1.1 }}>
        {agent.commandFrameworkTitle || "Command Framework"}
      </h2>
      {agent.commandFrameworkCopy ? (
        <p style={{ margin: "0 0 14px", color: "#f1f1f1", lineHeight: 1.65, fontSize: 14 }}>
          {agent.commandFrameworkCopy}
        </p>
      ) : null}

      <div style={{ display: "grid", gap: 10 }}>
        {agent.commandFrameworkSteps.map((item) => (
          <div
            key={item}
            style={{
              padding: "11px 13px",
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff8f4",
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
        <button
          type="button"
          onClick={() => onPromptSelect("Give me the command-level read on today's SVL state")}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: `1px solid ${accentColor}`,
            backgroundColor: "rgba(0,0,0,0.18)",
            color: "#fff",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Run Command Brief
        </button>
        <button
          type="button"
          onClick={() => onPromptSelect("What do these upgrades now allow us to do that we couldn't before?")}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            backgroundColor: "rgba(255,255,255,0.04)",
            color: "#fff",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Find Leverage
        </button>
      </div>
    </div>
  );
}

export default function AgentClient({ 
  slug, 
  initialAgent 
}: { 
  slug: string;
  initialAgent: AgentConfig | null;
}) {
  const router = useRouter();
  
  const [agent, setAgent] = useState<AgentConfig | null>(initialAgent);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    initialAgent ? [{ role: "assistant", content: initialAgent.welcomeMessage }] : []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isVoiceReady, setIsVoiceReady] = useState(false);
  const [voiceUnlocked, setVoiceUnlocked] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Preparing voice...");
  const [suggestionRotationIndex, setSuggestionRotationIndex] = useState(0);
  const [isCompactMobile, setIsCompactMobile] = useState(false);
  const [showTokFaithDetails, setShowTokFaithDetails] = useState(true);
  const [clientUserId, setClientUserId] = useState<string | null>(null);
  const [clientUserName, setClientUserName] = useState<string | null>(null);
  const [currentSpeakingMessageIndex, setCurrentSpeakingMessageIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const pendingSpeechRef = useRef<string | null>(null);
  const speechQueueRef = useRef<SpeechSynthesisUtterance[]>([]);
  const speakRef = useRef<(text: string, messageIndex?: number) => void>(() => {});
  const hasAutoPlayedWelcomeRef = useRef(false);
  const resolvedSlug = resolveAgentSlug(slug);
  const apiSlug = agent?.slug ?? resolvedSlug ?? null;
  const isTokFaith = agent?.slug === "tokfaith";
  const isFirstGuardian = agent?.slug === "first-guardian";
  const isMrKpa = agent?.slug === "mr-kpa";
  const usesRotatingSuggestions = isTokFaith || isFirstGuardian || isMrKpa;
  const rotatingSuggestions = getRotatingSuggestions(agent?.suggestions || [], suggestionRotationIndex);

  useEffect(() => {
    if (resolvedSlug && resolvedSlug !== slug) {
      router.replace(`/agent/${resolvedSlug}`);
      return;
    }

    if (!agent && resolvedSlug && AGENTS[resolvedSlug]) {
      const selectedAgent = AGENTS[resolvedSlug];
      setAgent(selectedAgent);
      setMessages([
        {
          role: "assistant",
          content: selectedAgent.welcomeMessage,
        },
      ]);
    } else if (!agent && slug) {
      router.push("/agent");
    }
  }, [resolvedSlug, slug, agent, router]);

  useEffect(() => {
    let isMounted = true;

    const ensureGuestUserId = () => {
      const existingGuestId = window.localStorage.getItem(TOKFAITH_GUEST_ID_KEY);
      if (existingGuestId) {
        return existingGuestId;
      }

      const generatedGuestId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? `guest-${crypto.randomUUID()}`
          : `guest-${Date.now()}`;
      window.localStorage.setItem(TOKFAITH_GUEST_ID_KEY, generatedGuestId);
      return generatedGuestId;
    };

    const loadUserIdentity = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
          credentials: "same-origin",
        });

        if (!isMounted) {
          return;
        }

        if (response.ok) {
          const data = await response.json();
          if (data?.authenticated && data?.user?._id) {
            setClientUserId(data.user._id);
            setClientUserName(data.user.name || null);
            return;
          }
        }
      } catch {
        // Fall through to guest identity.
      }

      if (!isMounted) {
        return;
      }

      setClientUserId(ensureGuestUserId());
      setClientUserName(null);
    };

    loadUserIdentity();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setSuggestionRotationIndex(0);

    if (!usesRotatingSuggestions || !agent?.suggestions?.length || agent.suggestions.length <= 3) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSuggestionRotationIndex((currentIndex) => (currentIndex + 1) % agent.suggestions.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [agent, usesRotatingSuggestions]);

  useEffect(() => {
    const updateCompactMode = () => {
      const compactMode = window.innerWidth <= 768;
      setIsCompactMobile(compactMode);
    };

    updateCompactMode();
    window.addEventListener("resize", updateCompactMode);

    return () => window.removeEventListener("resize", updateCompactMode);
  }, []);

  useEffect(() => {
    if (!isTokFaith) {
      setShowTokFaithDetails(true);
      return;
    }

    setShowTokFaithDetails(!isCompactMobile);
  }, [isTokFaith, isCompactMobile]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setVoiceStatus("Voice playback is not supported in this browser.");
      return;
    }

    let isMounted = true;
    let elapsed = 0;

    const loadVoices = () => {
      const nextVoices = window.speechSynthesis.getVoices();
      if (!isMounted) {
        return;
      }

      if (nextVoices.length > 0) {
        setAvailableVoices(nextVoices);
        setIsVoiceReady(true);
        setVoiceStatus(
          voiceUnlocked
            ? `Voice ready: ${nextVoices.length} voices available.`
            : "Voice ready. Tap once anywhere to enable audio.",
        );
      }
    };

    loadVoices();
    const pollId = window.setInterval(() => {
      elapsed += VOICE_POLL_INTERVAL_MS;
      loadVoices();
      if (window.speechSynthesis.getVoices().length > 0 || elapsed >= VOICE_LOAD_TIMEOUT_MS) {
        window.clearInterval(pollId);
        if (window.speechSynthesis.getVoices().length === 0 && isMounted) {
          setIsVoiceReady(true);
          setVoiceStatus("Voice engine did not finish loading. Falling back to the browser default voice.");
        }
      }
    }, VOICE_POLL_INTERVAL_MS);

    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      isMounted = false;
      window.clearInterval(pollId);
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [voiceUnlocked]);

  useEffect(() => {
    if (!("speechSynthesis" in window) || voiceUnlocked) {
      return;
    }

    const unlockVoice = () => {
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
        const unlockUtterance = new SpeechSynthesisUtterance(" ");
        unlockUtterance.volume = 0;
        window.speechSynthesis.speak(unlockUtterance);
      } catch {
        // Some browsers may reject the warm-up utterance.
      }

      setVoiceUnlocked(true);
    };

    window.addEventListener("pointerdown", unlockVoice, { once: true });
    window.addEventListener("keydown", unlockVoice, { once: true });
    window.addEventListener("touchstart", unlockVoice, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockVoice);
      window.removeEventListener("keydown", unlockVoice);
      window.removeEventListener("touchstart", unlockVoice);
    };
  }, [voiceUnlocked]);

  useEffect(() => {
    hasAutoPlayedWelcomeRef.current = false;
  }, [agent?.slug]);

  useEffect(() => {
    if (!pendingSpeechRef.current || !("speechSynthesis" in window)) {
      return;
    }

    if (!isVoiceReady && availableVoices.length === 0) {
      return;
    }

    const queuedText = pendingSpeechRef.current;
    pendingSpeechRef.current = null;
    window.setTimeout(() => {
      speakRef.current(queuedText);
    }, 0);
  }, [availableVoices, isVoiceReady]);

  useEffect(() => {
    if (!agent?.welcomeMessage || !voiceUnlocked || !isVoiceReady || hasAutoPlayedWelcomeRef.current) {
      return;
    }

    if (messages.length !== 1 || messages[0]?.role !== "assistant") {
      return;
    }

    hasAutoPlayedWelcomeRef.current = true;
    window.setTimeout(() => {
      speakRef.current(agent.welcomeMessage);
    }, 120);
  }, [agent, isVoiceReady, messages, voiceUnlocked]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const speak = (text: string, messageIndex?: number) => {
    if (!text.trim()) {
      return;
    }

    if (!("speechSynthesis" in window)) {
      setVoiceStatus("Voice playback is not supported in this browser.");
      return;
    }

    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
    if (voices.length === 0 && !isVoiceReady) {
      pendingSpeechRef.current = text;
      setVoiceStatus("Loading voice engine...");
      return;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    speechQueueRef.current = [];

    const selectedVoice = selectVoice(agent, voices);
    const isMobileDevice = isMobileSpeechDevice();
    
    // Skip voice validation blockers - voice selection logic already enforces correct gender
    // Just proceed with speaking regardless of initial voice detection state


    const speechSettings = getSpeechSettings(agent, selectedVoice);
    const chunks = splitIntoSpeechChunks(text);
    setVoiceStatus(
      selectedVoice
        ? `Speaking with ${selectedVoice.name}.`
        : "Speaking with your browser's default voice.",
    );
    
    // Track which message is currently being spoken
    if (messageIndex !== undefined) {
      setCurrentSpeakingMessageIndex(messageIndex);
    }

    const playChunk = (index: number) => {
      if (index >= chunks.length) {
        setIsSpeaking(false);
        setCurrentSpeakingMessageIndex(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = "en-US";
      }

      utterance.rate = speechSettings.rate;
      utterance.pitch = speechSettings.pitch;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => playChunk(index + 1);
      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentSpeakingMessageIndex(null);
        setVoiceStatus("Voice playback failed on this device/browser.");
      };

      speechQueueRef.current[index] = utterance;
      window.speechSynthesis.speak(utterance);
    };

    playChunk(0);
  };
  speakRef.current = speak;

  const stopSpeaking = () => {
    speechQueueRef.current = [];
    pendingSpeechRef.current = null;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentSpeakingMessageIndex(null);
    setVoiceStatus("Voice playback stopped.");
  };

  const toggleMic = () => {
    if (isListening) {
      stopMic();
      return;
    }
    if (!recognitionRef.current) {
      const SpeechRecognitionAPI = getSpeechRecognitionAPI(window);
      if (!SpeechRecognitionAPI) {
        alert("Voice input not supported");
        return;
      }
      const r = new SpeechRecognitionAPI();
      r.continuous = false;
      r.interimResults = true;
      r.lang = "en-US";

      r.onstart = () => setIsListening(true);
      r.onresult = (e: SpeechRecognitionEventLike) => {
        const transcript = Array.from(
          { length: e.results.length },
          (_, index) => e.results[index][0].transcript,
        )
          .join("");
        setInput(transcript);
        if (e.results[e.results.length - 1].isFinal) {
          stopMic();
          setTimeout(() => {
            setInput(transcript);
            handleAutoSend(transcript);
          }, 300);
        }
      };
      r.onerror = () => stopMic();
      r.onend = () => stopMic();
      recognitionRef.current = r;
    }

    try {
      recognitionRef.current.start();
    } catch {
      // Speech recognition already started
    }
  };

  const stopMic = () => {
    setIsListening(false);
    try {
      recognitionRef.current?.stop();
    } catch {
      // Already stopped
    }
  };

  const handleAutoSend = async (transcript: string) => {
    if (!apiSlug) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "This guardian link is invalid. Redirecting to the guardian hub." },
      ]);
      router.push("/agent");
      return;
    }

    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: transcript }]);

    try {
      const response = await fetch(`/api/${encodeURIComponent(apiSlug)}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: transcript,
          userId: clientUserId,
          userName: clientUserName,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
      } else if (data.response) {
        const newMessageIndex = messages.length + 1; // +1 for the user message already added
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
        speak(data.response, newMessageIndex);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "No response received." }]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = `Failed to fetch: ${error instanceof Error ? error.message : String(error)}`;
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    if (loading) {
      return;
    }

    if (isTokFaith || isFirstGuardian || isMrKpa) {
      setInput("");
      if (agent?.suggestions?.length && agent.suggestions.length > 3) {
        setSuggestionRotationIndex((currentIndex) => (currentIndex + 1) % agent.suggestions.length);
      }
      void handleAutoSend(prompt);
      return;
    }

    setInput(prompt);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    if (!apiSlug) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "This guardian link is invalid. Redirecting to the guardian hub." },
      ]);
      router.push("/agent");
      return;
    }

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`/api/${encodeURIComponent(apiSlug)}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          userId: clientUserId,
          userName: clientUserName,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
      } else if (data.response) {
        const newMessageIndex = messages.length + 1; // +1 for the user message already added
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
        speak(data.response, newMessageIndex);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "No response received." }]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = `Failed to fetch: ${error instanceof Error ? error.message : String(error)}`;
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const getAgentColor = (slug: string) => {
    const colors: Record<string, string> = {
      grace: "#d4a574",
      a1: "#6366f1",
      hatata: "#e05c1a",
      wisdom: "#0fa89e",
      "coach-daniels": "#2ecc71",
      tokseo: "#f59e0b",
      tok2myia: "#1e40af",
      tokfaith: "#f4c95d",
      "first-guardian": "#c08457",
      "mr-kpa": "#ef4444",
    };
    return colors[slug] || "#888";
  };

  const accentColor = getAgentColor(slug || "");
  const hasMissionMeeting = Boolean(agent?.meetingAgenda?.length);
  const hasCommandFramework = Boolean(agent?.commandFrameworkSteps?.length);

  if (!agent) {
    return (
      <div
        suppressHydrationWarning
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          backgroundColor: "#111",
          color: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 18, color: "#888" }}>Loading guardian...</div>
      </div>
    );
  }

  return (
    <div
      suppressHydrationWarning
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        backgroundColor: "#111",
        color: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: `2px solid ${accentColor}`,
          backgroundColor: "#1a1a1a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <AvatarBadge agent={agent} accentColor={accentColor} size={48} fontSize={20} />
          <div>
            <h1 style={{ margin: 0, fontSize: 20 }}>{agent?.name || "Guardian"}</h1>
            <p style={{ margin: "4px 0 0 0", fontSize: 12, color: accentColor }}>
              {agent?.defaultStatus || "Loading..."}
            </p>
            <p style={{ margin: "6px 0 0 0", fontSize: 12, color: "#bdbdbd" }}>
              {voiceStatus}
            </p>
            <button
              type="button"
              onClick={() => speak(agent?.welcomeMessage || "Voice check complete.")}
              style={{
                marginTop: 10,
                padding: "6px 10px",
                borderRadius: 999,
                border: `1px solid ${accentColor}`,
                backgroundColor: "transparent",
                color: accentColor,
                fontSize: 11,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Play Welcome
            </button>
          </div>
        </div>
      </div>

      {isFirstGuardian ? (
        <>
          <GuardianPresence
            agent={agent}
            accentColor={accentColor}
            onPromptSelect={handleSuggestedPrompt}
            suggestions={rotatingSuggestions}
          />
          <GuardianSafetyCard agent={agent} accentColor={accentColor} />
        </>
      ) : null}

      {isTokFaith ? (
        <>
          <FaithPresence
            agent={agent}
            accentColor={accentColor}
            onPromptSelect={handleSuggestedPrompt}
            suggestions={rotatingSuggestions}
            compact={isCompactMobile && !showTokFaithDetails}
          />
          {isCompactMobile ? (
            <div style={{ margin: "0 12px 12px" }}>
              <button
                type="button"
                onClick={() => setShowTokFaithDetails((currentValue) => !currentValue)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 16,
                  border: `1px solid ${accentColor}`,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff7dc",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {showTokFaithDetails ? "Show Less and Stay in Chat" : "Open Full Faith Guide"}
              </button>
            </div>
          ) : null}
          {(!isCompactMobile || showTokFaithDetails) ? (
            <GuardianSafetyCard agent={agent} accentColor={accentColor} />
          ) : null}
        </>
      ) : null}

      {isMrKpa ? (
        <MrKpaPresence
          agent={agent}
          accentColor={accentColor}
          onPromptSelect={handleSuggestedPrompt}
          suggestions={rotatingSuggestions}
        />
      ) : null}

      {hasMissionMeeting ? (
        <MissionMeetingCard
          agent={agent}
          accentColor={accentColor}
          onPromptSelect={handleSuggestedPrompt}
        />
      ) : null}

      {hasCommandFramework ? (
        <CommandFrameworkCard
          agent={agent}
          accentColor={accentColor}
          onPromptSelect={(prompt) => setInput(prompt)}
        />
      ) : null}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isCompactMobile ? "12px" : "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {messages.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "40px", color: "#888" }}>
            <h2>{agent?.welcomeTitle || "Welcome"}</h2>
            <p>{agent?.welcomeMessage || "Loading guardian..."}</p>
            {agent?.suggestions && (
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                {(usesRotatingSuggestions ? rotatingSuggestions : agent.suggestions).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedPrompt(suggestion)}
                    style={{
                      padding: "10px 16px",
                      backgroundColor: `${accentColor}20`,
                      border: `1px solid ${accentColor}`,
                      color: "#fff",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 14,
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: "12px",
              }}
              className="message-group"
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  backgroundColor:
                    msg.role === "user" ? `${accentColor}` : `${accentColor}20`,
                  color: msg.role === "user" ? "#111" : "#fff",
                  wordWrap: "break-word",
                }}
              >
                {msg.content}
              </div>
              
              {msg.role === "assistant" && (
                <button
                  type="button"
                  onClick={() => speak(msg.content, i)}
                  title={currentSpeakingMessageIndex === i ? "Stop" : "Listen to this message"}
                  className="speaker-button"
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    backgroundColor: currentSpeakingMessageIndex === i ? `${accentColor}70` : "rgba(255,255,255,0.15)",
                    border: `1px solid ${currentSpeakingMessageIndex === i ? accentColor : "rgba(255,255,255,0.3)"}`,
                    color: currentSpeakingMessageIndex === i ? "#fff" : "#bbb",
                    fontSize: 11,
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    flex: "0 0 auto",
                  }}
                >
                  {currentSpeakingMessageIndex === i ? "⏹ Stop" : "▶ Listen"}
                </button>
              )}
            </div>
          ))
        )}
        {loading && (
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: accentColor, animation: "pulse 1s infinite" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: accentColor, animation: "pulse 1s infinite 0.1s" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: accentColor, animation: "pulse 1s infinite 0.2s" }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        style={{
          padding: "20px",
          borderTop: `1px solid #333`,
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          style={{
            flex: "1 1 150px",
            padding: "12px 16px",
            borderRadius: 8,
            border: `1px solid ${accentColor}`,
            backgroundColor: "#1a1a1a",
            color: "#fff",
            fontSize: 14,
          }}
        />
        <button
          type="button"
          onClick={toggleMic}
          disabled={loading}
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            backgroundColor: isListening ? accentColor : `${accentColor}20`,
            color: isListening ? "#111" : accentColor,
            border: `2px solid ${accentColor}`,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: 13,
            transition: "all 0.2s",
            boxShadow: isListening ? `0 0 12px ${accentColor}60` : "none",
          }}
          title="Click to speak your message"
        >
          {isListening ? "🎙 Listening..." : "🎤 Speak"}
        </button>
        {isSpeaking && (
          <button
            type="button"
            onClick={stopSpeaking}
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              backgroundColor: "#ff4444",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Stop 🔊
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 24px",
            borderRadius: 8,
            backgroundColor: accentColor,
            color: "#111",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            opacity: loading ? 0.6 : 1,
          }}
        >
          Send
        </button>
      </form>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        input:disabled {
          opacity: 0.6;
        }
        .message-group {
          align-items: flex-start;
        }
        .message-group .speaker-button {
          margin-top: 2px;
          opacity: 0.5;
        }
        .message-group:hover .speaker-button {
          opacity: 1;
          transform: scale(1.05);
        }
        .speaker-button:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
