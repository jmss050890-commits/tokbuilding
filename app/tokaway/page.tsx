'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FakeContact {
  name: string;
  addedDate: number;
}

interface CallState {
  selectedContact: string | null;
  isCallActive: boolean;
  callDuration: number;
  fakeContacts: FakeContact[];
}

export default function TokAway() {
  const [callState, setCallState] = useState<CallState>({
    selectedContact: null,
    isCallActive: false,
    callDuration: 0,
    fakeContacts: []
  });
  const [newContactName, setNewContactName] = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const [timer, setTimer] = useState(0);

  // Load contacts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tokaway_contacts');
    if (saved) {
      try {
        setCallState(prev => ({ ...prev, fakeContacts: JSON.parse(saved) }));
      } catch (e) {
        console.error('Failed to load contacts');
      }
    }
  }, []);

  // Check-in timer for call screen
  useEffect(() => {
    if (!callState.isCallActive) return;

    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [callState.isCallActive]);

  const addContact = () => {
    if (!newContactName.trim()) {
      alert('Please enter a contact name');
      return;
    }

    if (callState.fakeContacts.some(c => c.name === newContactName.trim())) {
      alert('This contact already exists');
      return;
    }

    const updated = [...callState.fakeContacts, { name: newContactName.trim(), addedDate: Date.now() }];
    setCallState(prev => ({ ...prev, fakeContacts: updated }));
    localStorage.setItem('tokaway_contacts', JSON.stringify(updated));
    setNewContactName('');
  };

  const removeContact = (name: string) => {
    const updated = callState.fakeContacts.filter(c => c.name !== name);
    setCallState(prev => ({ ...prev, fakeContacts: updated, selectedContact: prev.selectedContact === name ? null : prev.selectedContact }));
    localStorage.setItem('tokaway_contacts', JSON.stringify(updated));
  };

  const selectContact = (name: string) => {
    setCallState(prev => ({ ...prev, selectedContact: name }));
  };

  const triggerFakeCall = () => {
    if (!callState.selectedContact) return;
    setTimer(0);
    setCallState(prev => ({ ...prev, isCallActive: true }));
  };

  const answerCall = () => {
    setCallState(prev => ({ ...prev, isCallActive: false }));
    setShowSetup(false);
  };

  const declineCall = () => {
    setCallState(prev => ({ ...prev, isCallActive: false }));
    setShowSetup(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (callState.isCallActive && callState.selectedContact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-blue-500 mx-auto mb-8 flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-6xl">{callState.selectedContact.charAt(0).toUpperCase()}</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-2 tracking-wider">{callState.selectedContact}</h2>
          <p className="text-2xl text-gray-300 mb-8 tracking-wide">INCOMING CALL</p>
          
          <div className="text-4xl font-mono mb-12 text-gray-200">{formatTime(timer)}</div>

          <div className="flex gap-8 justify-center mb-12">
            <button
              onClick={answerCall}
              className="w-24 h-24 rounded-full bg-green-500 hover:bg-green-600 transition flex items-center justify-center shadow-xl transform hover:scale-110"
              title="Answer Call"
            >
              <span className="text-4xl">✓</span>
            </button>
            <button
              onClick={declineCall}
              className="w-24 h-24 rounded-full bg-red-600 hover:bg-red-700 transition flex items-center justify-center shadow-xl transform hover:scale-110"
              title="Decline Call"
            >
              <span className="text-4xl">✕</span>
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-8">Take your time. Stay safe. You can do this.</p>
        </div>
      </div>
    );
  }

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-wider">TokAway</h1>
            <Link href="/vcc-hub" className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition">
              ← Back
            </Link>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-orange-400 tracking-wider">Setup Fake Contacts</h2>

            {/* Contact List */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-orange-300 tracking-wide uppercase">Your Contacts</h3>
              {callState.fakeContacts.length === 0 ? (
                <p className="text-gray-400 text-center py-6">No contacts yet. Add your first one below.</p>
              ) : (
                <div className="grid gap-3 mb-6">
                  {callState.fakeContacts.map(contact => (
                    <div
                      key={contact.name}
                      onClick={() => selectContact(contact.name)}
                      className={`p-4 rounded-lg cursor-pointer transition border ${
                        callState.selectedContact === contact.name
                          ? 'bg-orange-500 bg-opacity-20 border-orange-500'
                          : 'bg-slate-700 border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg">👤 {contact.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeContact(contact.name);
                          }}
                          className="text-red-400 hover:text-red-300 text-xl"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Contact */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-orange-300 tracking-wide uppercase">Add New Contact</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addContact()}
                  placeholder="e.g., Mom, Boss, Friend..."
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-orange-500 focus:outline-none text-white placeholder-gray-400"
                />
                <button
                  onClick={addContact}
                  className="px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 transition font-semibold tracking-wide"
                >
                  + ADD
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-orange-900 bg-opacity-30 border border-orange-700 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-orange-300 mb-3 text-lg tracking-wide">HOW IT WORKS</h3>
              <ul className="space-y-2 text-sm text-gray-200 list-disc list-inside">
                <li>Create fake contacts (names that will "call" you)</li>
                <li>When in an uncomfortable situation, trigger a fake call</li>
                <li>A realistic incoming call screen appears on your phone</li>
                <li>Use it as an excuse to leave or change the situation</li>
                <li>Answer or decline to simulate a real call</li>
                <li>Built on the KPA mission: Keep People Alive</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowSetup(false)}
                className="flex-1 px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition font-semibold"
              >
                Close Setup
              </button>
              <button
                onClick={triggerFakeCall}
                disabled={!callState.selectedContact}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold tracking-wide transition ${
                  callState.selectedContact
                    ? 'bg-orange-600 hover:bg-orange-700 cursor-pointer'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                }`}
              >
                TRIGGER CALL
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <nav className="flex justify-between items-center p-6 bg-black bg-opacity-40 border-b border-slate-700">
        <h1 className="text-3xl font-bold tracking-wider">TokAway</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:text-orange-400 transition">Home</Link>
          <Link href="/vcc-hub" className="hover:text-orange-400 transition">VCC Hub</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Your Escape Plan Tool</h2>
          <p className="text-xl text-gray-300 mb-8">
            Uncomfortable situation? Use TokAway to trigger a fake incoming call — a discreet way to create an exit.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 hover:border-orange-500 transition">
            <h3 className="text-2xl font-bold mb-4 text-orange-400 tracking-wider">📱 Customizable Contacts</h3>
            <p className="text-gray-300">
              Add any name you want—Mom, Boss, Friend. When you need an out, pick a contact and trigger a realistic incoming call screen.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 hover:border-orange-500 transition">
            <h3 className="text-2xl font-bold mb-4 text-orange-400 tracking-wider">☎️ Realistic Call Screen</h3>
            <p className="text-gray-300">
              Full-screen incoming call with contact name, timer, and Answer/Decline buttons. Looks exactly like a real phone call.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 hover:border-orange-500 transition">
            <h3 className="text-2xl font-bold mb-4 text-orange-400 tracking-wider">🎯 Discreet & Private</h3>
            <p className="text-gray-300">
              Contacts are saved locally on your device. No data shared. Your escape tool stays between you and your phone.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 hover:border-orange-500 transition">
            <h3 className="text-2xl font-bold mb-4 text-orange-400 tracking-wider">🚨 KPA-Powered</h3>
            <p className="text-gray-300">
              Built with the Keep People Alive mission. Your safety and autonomy matter. TokAway gives you control.
            </p>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-red-400 tracking-wider">When to Use TokAway</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-lg">✓</span>
              <span>You feel unsafe or uncomfortable</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-lg">✓</span>
              <span>You need a polite way to leave</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-lg">✓</span>
              <span>Someone is pressuring you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-lg">✓</span>
              <span>You need time to think clearly</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-lg">✓</span>
              <span>Testing an uncomfortable relationship</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-lg">✓</span>
              <span>You trust your instincts</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => setShowSetup(true)}
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-12 rounded-lg transition text-lg tracking-wider"
          >
            SET UP MY ESCAPE PLAN →
          </button>
          <p className="text-gray-400 mt-6 text-sm">
            Your safety is your priority. TokAway is here when you need it. Keep People Alive. 🚨
          </p>
        </div>
      </div>
    </div>
  );
}
