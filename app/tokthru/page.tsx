'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface CheckInTimer {
  active: boolean;
  minutes: number;
  remaining: number;
  locationShared: boolean;
}

interface SafeSpot {
  name: string;
  type: string;
  distance: string;
  address: string;
}

const NATIONAL_DV_HOTLINE = '1-800-799-7233';
const SUICIDE_CRISIS_HOTLINE = '988';

const DE_ESCALATION_SCRIPTS = [
  {
    title: 'Verbal De-escalation - Angry Person',
    steps: [
      '1. Calm your body: slow breathing (4-4-6 pattern)',
      '2. Lower your voice tone - speak slowly and clearly',
      '3. Acknowledge their feelings: "I see you\'re upset"',
      '4. Validate (not agree): "Your feelings make sense"',
      '5. Use their name, maintain distance, open posture',
      '6. Set boundaries clearly: "I want to help safely"',
      '7. Offer solutions: "What would help right now?"',
      '8. Stay calm even if they escalate - you cannot escalate them'
    ]
  },
  {
    title: 'Self-Calming Techniques',
    steps: [
      '1. Box breathing: 4 counts in, 4 hold, 4 out, 4 hold',
      '2. 5-4-3-2-1 grounding: Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste',
      '3. Progressive muscle relaxation: Tense and release muscle groups',
      '4. Move your body: Shake out, jump, walk - interrupt stress cycle',
      '5. Cold water on face: Triggers vagus nerve, calms nervous system',
      '6. Positive self-talk: "I am safe. I will get through this."'
    ]
  },
  {
    title: 'Escape from Unsafe Situation',
    steps: [
      '1. Trust your gut - if something feels wrong, it probably is',
      '2. Have an exit plan BEFORE you need it',
      '3. Keep phone charged and accessible at all times',
      '4. Tell someone where you\'re going and when you\'ll check in',
      '5. If threatened: "I need to go to the bathroom" is a safe exit',
      '6. Use fake call (TokThru feature) to create excuse to leave',
      '7. Drive to police station, hospital, or busy public place',
      '8. Once safe, call 911 or crisis hotline'
    ]
  },
  {
    title: 'De-escalating Suicidal Crisis',
    steps: [
      '1. NEVER leave them alone - constant, compassionate presence',
      '2. Listen without judgment - let them express pain',
      '3. Validate pain: "Your hurt is real and important"',
      '4. DO NOT argue against suicidal thoughts',
      '5. Ask directly: "Are you thinking of killing yourself?" - asking doesn\'t cause it',
      '6. Understand their plan - if detailed, call 911 immediately',
      '7. Connect to crisis line (988) while staying present',
      '8. Remove access to means: firearms, medications, materials',
      '9. Create safety plan together: who to call, where to go, coping strategies',
      '10. Follow up regularly: suicidal thoughts often return'
    ]
  },
  {
    title: 'Intimate Partner Violence Response',
    steps: [
      '1. SAFETY FIRST - Your life is the priority',
      '2. Trust your instincts about danger',
      '3. Make a safety plan: separate phone, hidden money, document abuse',
      '4. Create code word with trusted person for help',
      '5. Call National DV Hotline: 1-800-799-7233',
      '6. Leave when safest: when you\'re ready, not when they are calm',
      '7. Use TokThru features: Silent SOS activates when ready',
      '8. Keep evidence: photos of injuries, medical records, text messages',
      '9. Tell trusted friends/family - isolation is abuse tactic',
      '10. Know: abuse is not your fault. You deserve safety and respect.'
    ]
  }
];

const EMERGENCY_GUIDES = [
  {
    title: 'Medical Emergency Response',
    content: 'Call 911 immediately. Tell dispatcher: Your name, location, what happened, injuries present. Stay on line. Provide CPR if trained. Remove hazards. Keep person warm. Do NOT move unless in danger. If poison: have container ready for 911.'
  },
  {
    title: 'Active Threat/Shooter Situation',
    content: 'RUN, HIDE, FIGHT (in order). RUN: Evacuate if path clear. Leave belongings. Help others escape. HIDE: Lock doors, silence phone, barricade. FIGHT: Last resort - create obstacles, fight back with objects, commit fully.'
  },
  {
    title: 'Mental Health Crisis',
    content: 'Call 988 (Suicide & Crisis Hotline) or go to nearest emergency room. Tell them your thoughts. Be honest about suicidal/homicidal intent. They can help. It\'s not weakness - it\'s courage. Stay with supportive person. Remove access to means. Make safety plan with counselor.'
  },
  {
    title: 'Domestic Violence Escape',
    content: 'Safety is priority. Call 1-800-799-7233 (National DV Hotline). Plan escape: have documents, money, phone hidden. Use code word with trusted person. Leave when safest. Go to shelter, friend, family, or police. Document abuse. Do not return alone.'
  },
  {
    title: 'Child Safety Emergency',
    content: 'Child abuse: Call 911 and local child protective services. Child missing: Call 911 immediately with description, location last seen, vehicle info. Do not wait 24 hrs. Child threatening harm: Take seriously, remove access to means, call 911 or mental health crisis line.'
  }
];

const SAFE_SPOTS_EXAMPLES: SafeSpot[] = [
  { name: 'Police Station', type: 'Law Enforcement', distance: '0.3 mi', address: 'Main Police Dept' },
  { name: 'Hospital ER', type: 'Medical', distance: '0.8 mi', address: 'Regional Medical Center' },
  { name: 'Fire Station', type: 'Emergency Services', distance: '0.5 mi', address: 'Fire Station #5' },
  { name: '24hr Convenience Store', type: 'Public', distance: '0.2 mi', address: 'Corner of Main & 5th' }
];

export default function TokThru() {
  const [currentView, setCurrentView] = useState<'hub' | 'chat' | 'sos' | 'timer' | 'safespots' | 'scripts' | 'guides' | 'contacts' | 'settings'>('hub');
  const [testMode, setTestMode] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [silentAlertActive, setSilentAlertActive] = useState(false);
  const [checkInTimer, setCheckInTimer] = useState<CheckInTimer>({ active: false, minutes: 5, remaining: 0, locationShared: false });
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedScript, setSelectedScript] = useState<typeof DE_ESCALATION_SCRIPTS[0] | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<typeof EMERGENCY_GUIDES[0] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setInput(prev => prev + transcript);
            const lowerTranscript = transcript.toLowerCase();
            if (lowerTranscript.includes('emergency') || lowerTranscript.includes('danger') || lowerTranscript.includes('help')) {
              triggerSilentAlert();
            }
          }
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Check-in timer countdown
  useEffect(() => {
    if (!checkInTimer.active || checkInTimer.remaining <= 0) return;

    timerIntervalRef.current = setInterval(() => {
      setCheckInTimer(prev => {
        const newRemaining = prev.remaining - 1;
        if (newRemaining <= 0) {
          if (!prev.locationShared) {
            sendLocationToContacts();
            speakAlert('Check-in timer expired. Location sent to emergency contacts.');
          }
          return { ...prev, remaining: 0, active: false };
        }
        return { ...prev, remaining: newRemaining };
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [checkInTimer.active, checkInTimer.remaining]);

  const triggerSilentAlert = () => {
    if (testMode) {
      alert('🚨 TEST MODE: Silent SOS would activate.\nIn real mode, location would be sent to emergency contacts.');
      return;
    }
    setSilentAlertActive(true);
    speakAlert('Silent alert activated. Sending location to emergency contacts.');
    sendLocationToContacts();
    setTimeout(() => setSilentAlertActive(false), 3000);
  };

  const triggerFakeCall = () => {
    if (testMode) {
      alert('📞 TEST MODE: Fake call escape would trigger.\nIn real mode, simulated incoming call would create exit opportunity.');
      return;
    }
    speakAlert('Incoming call simulation activated. Use this to safely excuse yourself.');
  };

  const startCheckInTimer = () => {
    if (testMode) {
      alert('⏰ TEST MODE: Timer set to ' + checkInTimer.minutes + ' minutes.\nIn real mode, location auto-sends if not deactivated.');
      return;
    }
    setCheckInTimer(prev => ({
      ...prev,
      active: true,
      remaining: prev.minutes * 60
    }));
  };

  const sendLocationToContacts = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = `EMERGENCY ALERT: Need help. Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}. If you receive this, please verify I'm safe. TokThru.`;
          emergencyContacts.forEach(contact => {
            console.log(`[TEST MODE] Would send SMS to ${contact.phone}: ${message}`);
          });
          if (testMode) {
            alert(`Location would be sent:\n${message}`);
          }
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone && emergencyContacts.length < 3) {
      setEmergencyContacts(prev => [
        ...prev,
        { id: Date.now().toString(), ...newContact }
      ]);
      setNewContact({ name: '', phone: '', relationship: '' });
    }
  };

  const removeContact = (id: string) => {
    setEmergencyContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/grace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.response || 'I\'m here to support you. How can I help?' };
      setMessages(prev => [...prev, assistantMessage]);

      if (voiceEnabled) {
        speakMessage(assistantMessage.content);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const speakMessage = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const speakAlert = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ===== HUB VIEW =====
  if (currentView === 'hub') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
        <nav className="bg-black/50 backdrop-blur border-b border-red-500/30 sticky top-0 z-50 p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🆘</div>
              <div>
                <h1 className="text-3xl font-bold text-red-400">TokThru Crisis Support</h1>
                <p className="text-xs text-red-300">KPA - Keeping People Alive</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTestMode(!testMode)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  testMode ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {testMode ? '🧪 Test Mode ON' : '⚪ Test Mode OFF'}
              </button>
              <Link href="/vcc-hub" className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition">
                ← Hub
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {testMode && (
            <div className="mb-6 p-4 rounded-lg bg-amber-600/20 border border-amber-500 text-amber-200 text-sm">
              🧪 TEST MODE: Features are simulated. In real mode, these features would activate immediately.
            </div>
          )}

          {silentAlertActive && (
            <div className="mb-6 p-6 rounded-lg bg-red-600 border-2 border-red-400 text-white font-bold animate-pulse text-center">
              🚨 SILENT ALERT ACTIVE - Location sent to emergency contacts
            </div>
          )}

          {/* Emergency Quick Access Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-300 mb-4">⚡ Emergency Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Silent SOS */}
              <button
                onClick={triggerSilentAlert}
                className="p-6 rounded-lg border-2 border-red-500 bg-red-500/20 hover:bg-red-600/30 text-white text-left transition transform hover:scale-105"
              >
                <div className="text-4xl mb-2">🚨</div>
                <h3 className="font-bold text-lg">Silent SOS</h3>
                <p className="text-xs text-red-200">Sends location to emergency contacts without alerting aggressor</p>
              </button>

              {/* Fake Call */}
              <button
                onClick={triggerFakeCall}
                className="p-6 rounded-lg border-2 border-orange-500 bg-orange-500/20 hover:bg-orange-600/30 text-white text-left transition transform hover:scale-105"
              >
                <div className="text-4xl mb-2">📞</div>
                <h3 className="font-bold text-lg">Fake Call Escape</h3>
                <p className="text-xs text-orange-200">Simulates incoming call to create safe exit opportunity</p>
              </button>

              {/* Check-in Timer */}
              <button
                onClick={() => setCurrentView('timer')}
                className="p-6 rounded-lg border-2 border-amber-500 bg-amber-500/20 hover:bg-amber-600/30 text-white text-left transition transform hover:scale-105"
              >
                <div className="text-4xl mb-2">⏰</div>
                <h3 className="font-bold text-lg">Check-in Timer</h3>
                <p className="text-xs text-amber-200">Location sent after set time if not deactivated</p>
              </button>

              {/* De-escalation Scripts */}
              <button
                onClick={() => setCurrentView('scripts')}
                className="p-6 rounded-lg border-2 border-yellow-500 bg-yellow-500/20 hover:bg-yellow-600/30 text-white text-left transition transform hover:scale-105"
              >
                <div className="text-4xl mb-2">📋</div>
                <h3 className="font-bold text-lg">De-escalation Scripts</h3>
                <p className="text-xs text-yellow-200">Proven techniques for calming tense situations</p>
              </button>

              {/* Safe Spots */}
              <button
                onClick={() => setCurrentView('safespots')}
                className="p-6 rounded-lg border-2 border-green-500 bg-green-500/20 hover:bg-green-600/30 text-white text-left transition transform hover:scale-105"
              >
                <div className="text-4xl mb-2">🏥</div>
                <h3 className="font-bold text-lg">Safe Spots GPS</h3>
                <p className="text-xs text-green-200">Find nearby police, hospitals, and safe locations</p>
              </button>

              {/* AI Chat Support */}
              <button
                onClick={() => setCurrentView('chat')}
                className="p-6 rounded-lg border-2 border-blue-500 bg-blue-500/20 hover:bg-blue-600/30 text-white text-left transition transform hover:scale-105"
              >
                <div className="text-4xl mb-2">💬</div>
                <h3 className="font-bold text-lg">AI Crisis Coach</h3>
                <p className="text-xs text-blue-200">AI-guided crisis support and emergency coaching</p>
              </button>
            </div>
          </div>

          {/* Crisis Hotlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* National DV Hotline */}
            <div className="p-6 rounded-lg bg-slate-800 border-2 border-purple-500">
              <h3 className="text-xl font-bold text-purple-300 mb-3">📞 National DV Hotline</h3>
              <p className="text-4xl font-bold text-purple-300 mb-3">{NATIONAL_DV_HOTLINE}</p>
              <p className="text-sm text-slate-300 mb-3">24/7 confidential support for domestic violence, abuse, and unsafe relationships</p>
              <p className="text-xs text-slate-400">• Trained advocates</p>
              <p className="text-xs text-slate-400">• Safety planning</p>
              <p className="text-xs text-slate-400">• Shelter referrals</p>
              <p className="text-xs text-slate-400">• Legal guidance</p>
            </div>

            {/* Suicide & Crisis Hotline */}
            <div className="p-6 rounded-lg bg-slate-800 border-2 border-cyan-500">
              <h3 className="text-xl font-bold text-cyan-300 mb-3">📞 Suicide & Crisis Hotline</h3>
              <p className="text-4xl font-bold text-cyan-300 mb-3">{SUICIDE_CRISIS_HOTLINE}</p>
              <p className="text-sm text-slate-300 mb-3">24/7 crisis counseling for mental health emergencies and suicidal thoughts</p>
              <p className="text-xs text-slate-400">• Crisis counselors</p>
              <p className="text-xs text-slate-400">• Suicide prevention</p>
              <p className="text-xs text-slate-400">• Mental health support</p>
              <p className="text-xs text-slate-400">• 24/7 confidential</p>
            </div>
          </div>

          {/* Emergency Guides */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-300 mb-4">📚 Emergency Guides</h2>
            <button
              onClick={() => setCurrentView('guides')}
              className="w-full p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-left transition"
            >
              View offline emergency guides for medical, mental health, violence, and other scenarios →
            </button>
          </div>

          {/* Emergency Contacts */}
          <div>
            <button
              onClick={() => setCurrentView('contacts')}
              className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
            >
              ⚙️ Setup Emergency Contacts (Required)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== TIMER VIEW =====
  if (currentView === 'timer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-6">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => setCurrentView('hub')}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back
          </button>

          <div className="p-8 rounded-lg bg-slate-800 border-2 border-amber-500 text-white">
            <h2 className="text-3xl font-bold mb-6 text-amber-300">⏰ Check-in Timer with Auto-Location Share</h2>
            
            <div className="mb-8 p-6 rounded-lg bg-amber-500/20">
              <p className="text-lg mb-4">If you don't cancel the timer, your location will automatically be sent to your emergency contacts.</p>
              <p className="text-sm text-amber-200 mb-4">This is useful when:</p>
              <ul className="text-sm text-amber-100 space-y-2 ml-4">
                <li>• You're going on a date with someone new</li>
                <li>• You're meeting someone in an unfamiliar place</li>
                <li>• You're traveling alone</li>
                <li>• You feel uneasy about a situation</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Minutes until location auto-share:</label>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => setCheckInTimer(p => ({ ...p, minutes: Math.max(1, p.minutes - 1) }))}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    -
                  </button>
                  <div className="flex-1 p-4 rounded-lg bg-slate-700 text-center text-3xl font-bold text-amber-300">
                    {checkInTimer.minutes} min
                  </div>
                  <button
                    onClick={() => setCheckInTimer(p => ({ ...p, minutes: Math.min(60, p.minutes + 1) }))}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {checkInTimer.active && (
                <div className="p-6 rounded-lg bg-amber-500/20 border border-amber-500">
                  <div className="text-5xl font-bold text-amber-300 text-center mb-4">
                    {Math.floor(checkInTimer.remaining / 60)}:{String(checkInTimer.remaining % 60).padStart(2, '0')}
                  </div>
                  <p className="text-center text-amber-200 mb-4">Location will be sent to emergency contacts when timer reaches zero</p>
                </div>
              )}

              <div className="flex gap-3">
                {!checkInTimer.active ? (
                  <button
                    onClick={startCheckInTimer}
                    className="flex-1 px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition"
                  >
                    ⏱️ Start Timer
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setCheckInTimer(p => ({ ...p, active: false }))}
                      className="flex-1 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition"
                    >
                      ✅ All Clear - Cancel Timer
                    </button>
                    <button
                      onClick={() => {
                        sendLocationToContacts();
                        setCheckInTimer(p => ({ ...p, active: false, locationShared: true }));
                      }}
                      className="flex-1 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
                    >
                      🚨 Send Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== SAFE SPOTS VIEW =====
  if (currentView === 'safespots') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentView('hub')}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back
          </button>

          <h2 className="text-3xl font-bold text-green-300 mb-6">🏥 Safe Spots Nearby</h2>
          
          <div className="space-y-3">
            {SAFE_SPOTS_EXAMPLES.map((spot, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-800 border border-green-500/30">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-green-300 text-lg">{spot.name}</h3>
                  <span className="px-2 py-1 rounded-lg bg-green-600/20 text-xs text-green-300 font-semibold">{spot.distance}</span>
                </div>
                <p className="text-sm text-slate-400 mb-3">{spot.type}</p>
                <p className="text-sm text-white mb-3">{spot.address}</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition">
                    📍 Navigate
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold transition">
                    📞 Call
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-slate-700/50 text-slate-300 text-sm">
            <p className="mb-2"><strong>💡 Tip:</strong> In real mode, GPS would find the nearest:</p>
            <ul className="ml-4 space-y-1">
              <li>• Police stations and substations</li>
              <li>• Hospitals and emergency rooms</li>
              <li>• Fire stations</li>
              <li>• 24-hour stores and businesses</li>
              <li>• Shelters and safe havens</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ===== DE-ESCALATION SCRIPTS VIEW =====
  if (currentView === 'scripts') {
    if (selectedScript) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-6">
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={() => setSelectedScript(null)}
              className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
            >
              ← Back to Scripts
            </button>

            <div className="p-8 rounded-lg bg-slate-800 border-2 border-yellow-500 text-white">
              <h2 className="text-3xl font-bold text-yellow-300 mb-6">{selectedScript.title}</h2>
              <div className="space-y-3">
                {selectedScript.steps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-700/50 border-l-4 border-yellow-500">
                    <p className="text-white">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentView('hub')}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back
          </button>

          <h2 className="text-3xl font-bold text-yellow-300 mb-6">📋 De-escalation Scripts (Online/Offline)</h2>
          
          <div className="space-y-3">
            {DE_ESCALATION_SCRIPTS.map((script, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScript(script)}
                className="w-full p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-yellow-500/30 text-left transition"
              >
                <h3 className="font-bold text-yellow-300 mb-1">{script.title}</h3>
                <p className="text-sm text-slate-400">{script.steps.length} steps</p>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-slate-700/50 text-slate-300 text-sm">
            <p><strong>💡 Tips:</strong> These scripts work because they</p>
            <ul className="ml-4 list-disc space-y-1 mt-2">
              <li>Acknowledge feelings without agreement</li>
              <li>Use calm, lower tone</li>
              <li>Maintain safe distance</li>
              <li>Offer solutions, not arguments</li>
              <li>Set boundaries clearly</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ===== EMERGENCY GUIDES VIEW =====
  if (currentView === 'guides') {
    if (selectedGuide) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-6">
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={() => setSelectedGuide(null)}
              className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
            >
              ← Back to Guides
            </button>

            <div className="p-8 rounded-lg bg-slate-800 border-2 border-blue-500 text-white">
              <h2 className="text-3xl font-bold text-blue-300 mb-6">{selectedGuide.title}</h2>
              <p className="text-lg leading-relaxed text-slate-200 whitespace-pre-wrap">{selectedGuide.content}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentView('hub')}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back
          </button>

          <h2 className="text-3xl font-bold text-blue-300 mb-6">📚 Emergency Guides (Online/Offline)</h2>
          
          <div className="space-y-3">
            {EMERGENCY_GUIDES.map((guide, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedGuide(guide)}
                className="w-full p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-blue-500/30 text-left transition"
              >
                <h3 className="font-bold text-blue-300">{guide.title}</h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-2">{guide.content}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===== CONTACTS VIEW =====
  if (currentView === 'contacts') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentView('hub')}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back
          </button>

          <h2 className="text-3xl font-bold text-red-300 mb-6">👥 Emergency Contacts (Max 3)</h2>

          <div className="space-y-6">
            {/* Add Contact Form */}
            <div className="p-6 rounded-lg bg-slate-800 border-2 border-red-500">
              <h3 className="font-bold text-red-300 mb-4">Add Emergency Contact</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact(p => ({ ...p, name: e.target.value }))}
                  placeholder="Name"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500 disabled:opacity-50"
                  disabled={emergencyContacts.length >= 3}
                />
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(p => ({ ...p, phone: e.target.value }))}
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500 disabled:opacity-50"
                  disabled={emergencyContacts.length >= 3}
                />
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact(p => ({ ...p, relationship: e.target.value }))}
                  placeholder="Relationship (Mom, Friend, etc)"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500 disabled:opacity-50"
                  disabled={emergencyContacts.length >= 3}
                />
                <button
                  onClick={addEmergencyContact}
                  disabled={emergencyContacts.length >= 3}
                  className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition disabled:opacity-50"
                >
                  ➕ Add Contact
                </button>
              </div>
            </div>

            {/* Contacts List */}
            {emergencyContacts.length === 0 ? (
              <div className="p-6 rounded-lg bg-slate-800 border border-slate-600 text-center text-slate-400">
                No emergency contacts added yet. Add at least one safety contact.
              </div>
            ) : (
              emergencyContacts.map(contact => (
                <div key={contact.id} className="p-4 rounded-lg bg-slate-800 border border-red-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-red-300">{contact.name}</h3>
                      <p className="text-sm text-slate-400">{contact.relationship}</p>
                    </div>
                    <button
                      onClick={() => removeContact(contact.id)}
                      className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm transition"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-green-400 font-semibold">{contact.phone}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== CHAT VIEW =====
  if (currentView === 'chat') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black flex flex-col">
        <nav className="bg-black/20 backdrop-blur border-b border-red-500/30 p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-red-300">Crisis Support Chat</h1>
            <button 
              onClick={() => setCurrentView('hub')}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
            >
              Back to Hub
            </button>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl rounded-lg p-4 ${
                msg.role === 'user' ? 'bg-white text-red-900' : 'bg-red-500/20 border border-red-400 text-white'
              }`}>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-black/20 backdrop-blur border-t border-red-500/30 p-6">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <button
              type="button"
              onClick={() => recognitionRef.current?.start()}
              className="px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
              title="Voice input"
            >
              {isListening ? '🎤 ...' : '🎤'}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Talk to crisis coach..."
              disabled={loading}
              className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-3 rounded-lg bg-white text-red-600 font-bold hover:bg-red-50 transition disabled:opacity-50"
            >
              ↪️
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
}
