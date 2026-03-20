"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AGENTS, type AgentConfig } from "../../../lib/lib/lib/agents";

export default function AgentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const [agent, setAgent] = useState<AgentConfig | null>(null);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    if (slug && AGENTS[slug]) {
      const selectedAgent = AGENTS[slug];
      setAgent(selectedAgent);
      setMessages([
        {
          role: "assistant",
          content: selectedAgent.welcomeMessage,
        },
      ]);
    } else if (slug) {
      router.push("/agent");
    }
  }, [slug, router]);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) {
      console.log("Speech synthesis not supported");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice based on agent gender preference
    if (agent?.voiceGender) {
      const voices = window.speechSynthesis.getVoices();
      const genderKeywords = agent.voiceGender === "male" ? 
        ["google us english male", "male", "man", "father"] : 
        ["google us english female", "female", "woman", "mother"];
      
      const selectedVoice = voices.find(voice => 
        genderKeywords.some(keyword => 
          voice.name.toLowerCase().includes(keyword) ||
          voice.lang.toLowerCase().includes("en-us")
        )
      ) || voices.find(v => v.lang === "en-US");
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    utterance.rate = agent?.voiceRate || 1;
    utterance.pitch = agent?.voicePitch || 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleMic = () => {
    if (isListening) {
      stopMic();
      return;
    }
    if (!recognitionRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        alert("Voice input not supported");
        return;
      }
      const r = new SpeechRecognitionAPI();
      r.continuous = false;
      r.interimResults = true;
      r.lang = "en-US";

      r.onstart = () => setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      r.onresult = (e: any) => {
        const transcript = Array.from(e.results)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((result: any) => result[0].transcript)
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
    } catch (_) {}
  };

  const stopMic = () => {
    setIsListening(false);
    try {
      recognitionRef.current?.stop();
    } catch (_) {}
  };

  const handleAutoSend = async (transcript: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: transcript }]);

    try {
      const response = await fetch(`/api/${slug}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: transcript }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
      } else if (data.response) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
        speak(data.response);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "No response received." }]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = `Failed to fetch: ${error instanceof Error ? error.message : String(error)}`;
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    }
    setLoading(false);
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`/api/${slug}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
      } else if (data.response) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
        speak(data.response);
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
    };
    return colors[slug] || "#888";
  };

  const accentColor = getAgentColor(slug || "");

  if (!mounted || !agent) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#111",
          color: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 18, color: "#888" }}>Loading agent...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
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
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "#111",
            }}
          >
            {agent?.avatar || "?"}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20 }}>{agent?.name || "Agent"}</h1>
            <p style={{ margin: "4px 0 0 0", fontSize: 12, color: accentColor }}>
              {agent?.defaultStatus || "Loading..."}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {messages.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "40px", color: "#888" }}>
            <h2>{agent?.welcomeTitle || "Welcome"}</h2>
            <p>{agent?.welcomeMessage || "Loading agent..."}</p>
            {agent?.suggestions && (
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                {agent.suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
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
              }}
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
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          style={{
            flex: 1,
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
            backgroundColor: isListening ? `${accentColor}40` : "#1a1a1a",
            color: isListening ? accentColor : "#888",
            border: `2px solid ${isListening ? accentColor : "#333"}`,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: 12,
            transition: "all 0.2s",
          }}
          title="Click to start/stop listening"
        >
          {isListening ? "🎙 Listening..." : "🎙 Mic"}
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
      `}</style>
    </div>
  );
}