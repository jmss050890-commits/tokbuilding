'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function TokThru() {
  const [apiKey, setApiKey] = useState('');
  const [showHub, setShowHub] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<any>(null);

  const SYSTEM_PROMPT = `You are a crisis support AI from TokThru/KPA (Keeping People Alive) — a personal safety and emergency coaching app.

YOUR IDENTITY:
- Name: KPA AI
- Role: Emergency coaching agent, crisis support guide, safety companion
- Mission: Keeping people alive. Your sole purpose is to provide immediate, calm, actionable support during crisis moments.
- Personality: Grounded, direct, protective, non-judgmental. You speak with calm authority because lives depend on clear communication.

YOUR CAPABILITIES:
- Emergency de-escalation: Guide users through panic, anxiety, fear with evidence-based techniques
- Crisis coaching: Provide immediate, actionable steps for urgent situations (medical, mental health, safety threats, etc.)
- Safety triage: Help users understand severity and appropriate response (when to call 911, when to reach a friend, when to use SOS)
- Calm presence: Be steady, present, and reassuring. Never minimize. Never rush.
- Resource knowledge: Guide to emergency contacts, crisis lines, hospitals, emergency services
- Post-crisis support: Help users process and plan next steps after the immediate crisis passes

ABOUT TOKTHRU/KPA:
TokThru is Jerome Sanders' personal safety and crisis app, part of Sanders Viopro Labs. Features:
- AI-guided emergency coaching (you are this AI)
- Fake emergency call (simulate getting called to escape uncomfortable situations safely)
- Silent SOS with live location sharing (rapid emergency contact alert with precise location)
- Crisis integration with emergency contacts
- Evidence-based de-escalation techniques

THE CRISIS RESPONSE MODEL:
1. Immediate: Assess current danger. If active threat to life → call 911 first, we support simultaneously
2. Ground: Help user ground themselves (breathing, grounding techniques)
3. Triage: Understand what's happening and appropriate response level
4. Guide: Provide step-by-step guidance for their situation
5. Escalate: If beyond our scope, guide to professional help (crisis line, hospital, police)
6. Follow: Stay with them through the crisis, check in on plan

OPERATING PRINCIPLES:
- Always assume good intent. You're talking to someone in pain, fear, or danger.
- Be direct. Vague reassurance kills. Specific guidance saves.
- Never delay professional help. If someone needs a hospital or police, guide them there first.
- Normalize the crisis. Let them know they're not alone and this is manageable.
- If you're uncertain about severity, escalate to professional help (911, crisis line).
- You represent KPA: direct, protective, life-focused, community-powered.
- Lives depend on you being clear, calm, and confident.

You are KPA AI. Safety first. Lives matter.`;

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load API key from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tokthru_api_key');
      if (saved) {
        setApiKey(saved);
        setShowHub(true);
      }
    } catch (e) {}
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SR) {
        const rec = new SR();
        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onstart = () => setIsListening(true);
        rec.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setInput(transcript);
          if (event.results[event.results.length - 1].isFinal) {
            stopMic();
            setTimeout(() => handleSendMessage(transcript), 300);
          }
        };
        rec.onerror = () => stopMic();
        rec.onend = () => setIsListening(false);

        recognitionRef.current = rec;
      }
    }
  }, []);

  // Activate with API key
  const handleActivate = () => {
    if (!apiKey.trim().startsWith('sk-')) {
      alert('Invalid API key. Must start with sk-');
      return;
    }
    try {
      localStorage.setItem('tokthru_api_key', apiKey);
    } catch (e) {}
    setShowHub(true);
  };

  // Toggle microphone
  const toggleMic = () => {
    if (isListening) {
      stopMic();
    } else {
      recognitionRef.current?.start();
    }
  };

  const stopMic = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  // Speak text
  const speakText = (text: string) => {
    if (!autoSpeak || !window.speechSynthesis) return;
    stopSpeech();

    const clean = text
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(clean);
    const voices = window.speechSynthesis.getVoices();

    // Use male voice for KPA (authority/protection)
    const maleVoice = voices.find(v =>
      v.name.toLowerCase().includes('male') ||
      v.name.toLowerCase().includes('guy') ||
      v.name.toLowerCase().includes('samson') ||
      v.name.toLowerCase().includes('google us english male')
    ) || voices.find(v => v.lang === 'en-US') || voices[0];

    if (maleVoice) utterance.voice = maleVoice;
    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = utterance.onerror = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    utteranceRef.current = null;
  };

  // Send message to Claude
  const handleSendMessage = async (messageText?: string) => {
    const text = (messageText || input).trim();
    if (!text || loading || !apiKey) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          system: SYSTEM_PROMPT,
          messages: [
            ...messages,
            { role: 'user', content: text }
          ]
        })
      });

      const data = await res.json();

      if (data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ API Error: ${data.error.message}`
        }]);
        return;
      }

      const reply = data.content[0].text;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      speakText(reply);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ Connection error: ${error.message}`
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Not activated yet
  if (!showHub) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #08080a 0%, #1a0f0a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: '"Barlow", system-ui, sans-serif',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(30,20,20,0.8), rgba(20,10,10,0.8))',
          border: '1px solid rgba(224, 92, 26, 0.3)',
          borderTop: '2px solid #e05c1a',
          borderRadius: '4px',
          padding: '44px 40px',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 24px 60px rgba(224, 92, 26, 0.08)',
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '4px', color: '#5a5a72', marginBottom: '20px', textTransform: 'uppercase' }}>
            Sanders Viopro Labs · Safety Network
          </div>

          <h2 style={{
            fontFamily: '"Bebas Neue", serif',
            fontSize: '38px',
            letterSpacing: '4px',
            background: 'linear-gradient(90deg, #e05c1a, #ffa500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '6px',
          }}>
            TokThru / KPA
          </h2>

          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: '15px',
            color: '#e05c1a',
            marginBottom: '20px',
          }}>
            Keeping People Alive
          </div>

          <p style={{ fontSize: '13px', color: '#5a5a72', lineHeight: '1.6', marginBottom: '24px' }}>
            Personal safety & crisis coaching powered by AI. Emergency support, SOS capability, and protective guidance when you need it most.
          </p>

          <input
            type="password"
            placeholder="sk-ant-..."
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleActivate()}
            style={{
              width: '100%',
              background: '#111118',
              border: '1px solid #1e1e2a',
              borderRadius: '2px',
              color: '#e8e8f0',
              fontFamily: '"Barlow", sans-serif',
              fontSize: '13px',
              padding: '13px 16px',
              outline: 'none',
              letterSpacing: '1px',
              marginBottom: '16px',
              boxSizing: 'border-box',
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#e05c1a'}
            onBlur={e => e.currentTarget.style.borderColor = '#1e1e2a'}
          />

          <button
            onClick={handleActivate}
            style={{
              width: '100%',
              border: 'none',
              borderRadius: '2px',
              fontFamily: '"Bebas Neue", serif',
              fontSize: '19px',
              letterSpacing: '3px',
              padding: '14px',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #e05c1a, #ffa500)',
              color: '#08080a',
              fontWeight: 'bold',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(224, 92, 26, 0.35)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            ACTIVATE KPA
          </button>

          <p style={{ fontSize: '10px', color: '#5a5a72', textAlign: 'center', marginTop: '12px', letterSpacing: '0.5px' }}>
            Sanders Viopro Labs · Mr. KPA · Keeping People Alive
          </p>

          <Link href="/vcc-hub" style={{
            display: 'block',
            textAlign: 'center',
            fontSize: '12px',
            color: '#5a5a72',
            marginTop: '16px',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#e05c1a'}
          onMouseLeave={e => e.currentTarget.style.color = '#5a5a72'}
          >
            ← Back to VCC Hub
          </Link>
        </div>
      </div>
    );
  }

  // Chat interface
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #08080a 0%, #1a0f0a 100%)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Barlow", system-ui, sans-serif',
      color: '#e8e8f0',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 24px',
        borderBottom: '1px solid #1e1e2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(8,8,10,0.95)',
        backdropFilter: 'blur(20px)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Bebas Neue", serif',
            fontSize: '14px',
            background: 'linear-gradient(135deg, #e05c1a, #ffa500)',
            color: '#08080a',
            fontWeight: 'bold',
          }}>
            KPA
          </div>
          <div>
            <div style={{
              fontFamily: '"Bebas Neue", serif',
              fontSize: '20px',
              letterSpacing: '3px',
            }}>
              <span style={{
                background: 'linear-gradient(90deg, #ffa500, #e05c1a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                KPA
              </span>
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: '#5a5a72', textTransform: 'uppercase', marginTop: '2px' }}>
              Crisis Support AI
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '1px', color: '#2ecc71' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2ecc71' }}></div>
            Active
          </div>
          <Link href="/vcc-hub" style={{
            fontFamily: '"Bebas Neue", serif',
            fontSize: '13px',
            letterSpacing: '2px',
            color: '#5a5a72',
            background: 'transparent',
            border: '1px solid #1e1e2a',
            borderRadius: '2px',
            padding: '6px 14px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#e05c1a';
            e.currentTarget.style.borderColor = '#e05c1a';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#5a5a72';
            e.currentTarget.style.borderColor = '#1e1e2a';
          }}
          >
            ← HUB
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '28px 16px', animation: 'fadeUp 0.7s ease both' }}>
            <h1 style={{
              fontFamily: '"Bebas Neue", serif',
              fontSize: 'clamp(40px, 8vw, 68px)',
              letterSpacing: '8px',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #ffa500, #e05c1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px',
            }}>
              KPA
            </h1>
            <div style={{
              fontFamily: '"Dancing Script", cursive',
              fontSize: '17px',
              color: '#e05c1a',
              marginTop: '4px',
              marginBottom: '14px',
            }}>
              Keeping People Alive
            </div>
            <div style={{
              width: '70px',
              height: '1px',
              margin: '14px auto',
              background: 'linear-gradient(90deg, transparent, #e05c1a, transparent)',
            }}></div>
            <div style={{ fontSize: '13px', color: '#5a5a72', lineHeight: '1.7', maxWidth: '400px', margin: '0 auto' }}>
              Crisis support, safety coaching, and protective guidance. I'm here for you right now.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '18px' }}>
              {['How do I stay safe?', 'I need emergency help', 'Guide me through this', "I'm in crisis", 'Safety resources'].map(chip => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.4px',
                    padding: '7px 14px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: '#111118',
                    color: '#5a5a72',
                    border: '1px solid #1e1e2a',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#e05c1a';
                    e.currentTarget.style.color = '#e05c1a';
                    e.currentTarget.style.background = 'rgba(224, 92, 26, 0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#1e1e2a';
                    e.currentTarget.style.color = '#5a5a72';
                    e.currentTarget.style.background = '#111118';
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            gap: '10px',
            animation: 'fadeUp 0.3s ease both',
            maxWidth: '840px',
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Bebas Neue", serif',
              fontSize: '11px',
              flexShrink: 0,
              marginTop: '2px',
              background: msg.role === 'user'
                ? '#1a6fe0'
                : 'linear-gradient(135deg, #e05c1a, #ffa500)',
              color: '#08080a',
              fontWeight: 'bold',
            }}>
              {msg.role === 'user' ? 'J' : 'KPA'}
            </div>
            <div>
              <div style={{
                fontSize: '10px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#5a5a72',
                marginBottom: '3px',
                textAlign: msg.role === 'user' ? 'right' : 'left',
              }}>
                {msg.role === 'user' ? 'You' : 'KPA'}
              </div>
              <div style={{
                padding: '12px 17px',
                borderRadius: '2px',
                fontSize: '14px',
                lineHeight: '1.7',
                maxWidth: '680px',
                background: msg.role === 'user' ? '#0d1f1a' : 'rgba(22, 22, 30, 0.9)',
                borderLeft: msg.role === 'user' ? '2px solid #0fa89e' : '2px solid #e05c1a',
                textAlign: msg.role === 'user' ? 'right' : 'left',
              }}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{
            display: 'flex',
            gap: '10px',
            animation: 'fadeUp 0.3s ease both',
            maxWidth: '840px',
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Bebas Neue", serif',
              fontSize: '11px',
              flexShrink: 0,
              marginTop: '2px',
              background: 'linear-gradient(135deg, #e05c1a, #ffa500)',
              color: '#08080a',
              fontWeight: 'bold',
            }}>
              KPA
            </div>
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5a5a72', marginBottom: '3px' }}>
                KPA
              </div>
              <div style={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                padding: '13px 17px',
                borderRadius: '2px',
                background: 'rgba(22, 22, 30, 0.9)',
                borderLeft: '2px solid #e05c1a',
                width: 'fit-content',
              }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#e05c1a',
                      animation: `typingBounce 1.2s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '14px 20px 18px',
        borderTop: '1px solid #1e1e2a',
        background: 'rgba(8,8,10,0.95)',
        backdropFilter: 'blur(20px)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', maxWidth: '840px', margin: '0 auto' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={isListening ? '🎙 Listening...' : 'Describe what you need...'}
            style={{
              flex: 1,
              background: '#111118',
              borderRadius: '2px',
              color: '#e8e8f0',
              fontFamily: '"Barlow", sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              padding: '12px 15px',
              resize: 'none',
              minHeight: '46px',
              maxHeight: '140px',
              outline: 'none',
              border: '1px solid #1e1e2a',
              transition: 'border-color 0.2s',
              lineHeight: '1.5',
              boxSizing: 'border-box',
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#e05c1a'}
            onBlur={e => e.currentTarget.style.borderColor = '#1e1e2a'}
            disabled={loading}
          />

          <button
            onClick={toggleMic}
            disabled={loading}
            style={{
              width: '46px',
              height: '46px',
              background: '#111118',
              border: isListening ? '1px solid #e05c1a' : '1px solid #1e1e2a',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
              opacity: loading ? 0.4 : 1,
            }}
            onMouseEnter={e => !loading && (e.currentTarget.style.borderColor = '#e05c1a')}
            onMouseLeave={e => !loading && (e.currentTarget.style.borderColor = '#1e1e2a')}
          >
            <svg viewBox="0 0 24 24" style={{
              width: '18px',
              height: '18px',
              stroke: isListening ? '#e05c1a' : '#5a5a72',
              fill: 'none',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              transition: 'stroke 0.2s',
            }}>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>

          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !input.trim()}
            style={{
              width: '46px',
              height: '46px',
              border: 'none',
              borderRadius: '2px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
              background: 'linear-gradient(135deg, #e05c1a, #ffa500)',
              opacity: loading || !input.trim() ? 0.4 : 1,
            }}
            onMouseEnter={e => !loading && input.trim() && (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => !loading && input.trim() && (e.currentTarget.style.transform = 'scale(1)')}
          >
            <svg viewBox="0 0 24 24" style={{ width: '17px', height: '17px', fill: '#08080a' }}>
              <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '840px', margin: '7px auto 0' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            fontSize: '11px',
            color: '#5a5a72',
            cursor: 'pointer',
            letterSpacing: '0.4px',
            userSelect: 'none',
          }}>
            <input
              type="checkbox"
              checked={autoSpeak}
              onChange={e => setAutoSpeak(e.target.checked)}
              style={{ cursor: 'pointer', accentColor: '#e05c1a' }}
            />
            <span>KPA speaks responses</span>
          </label>

          {isSpeaking && (
            <button
              onClick={stopSpeech}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11px',
                fontFamily: '"Barlow", sans-serif',
                letterSpacing: '1px',
                color: '#c0392b',
                background: 'transparent',
                border: '1px solid #c0392b',
                borderRadius: '2px',
                padding: '4px 10px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(192, 57, 43, 0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <svg viewBox="0 0 24 24" width="11" height="11" style={{ fill: 'currentColor' }}>
                <rect x="4" y="4" width="16" height="16" />
              </svg>
              Stop
            </button>
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: '10px', color: '#5a5a72', marginTop: '6px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
          Enter · Shift+Enter for new line · 🎙 mic
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        textarea::placeholder { color: #5a5a72; }
      `}</style>
    </div>
  );
}
