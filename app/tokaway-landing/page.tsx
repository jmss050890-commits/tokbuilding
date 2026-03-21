'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TokAwayLanding() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDemoCallScreen, setShowDemoCallScreen] = useState(false);
  const [demoMode, setDemoMode] = useState('test'); // 'test' | 'boring' | 'uncomfortable' | 'high-alert'
  const [showSuccessState, setShowSuccessState] = useState(false);

  const plans = [
    {
      name: 'TokAway Basic',
      price: 4.99,
      type: 'one-time',
      features: [
        'Fake call generator',
        'Custom decoy contacts',
        '10-minute safety timer',
        'GPS location capture',
        'Emergency SMS to 1 contact',
        'Call history',
      ],
    },
    {
      name: 'TokAway Pro',
      price: 9.99,
      type: 'lifetime',
      features: [
        'Everything in Basic',
        'Up to 3 emergency contacts',
        'Scheduled auto-check-in calls',
        'Safe word detection (voice)',
        'Call scripts & responses',
        'Location history & maps',
        'Advanced SMS customization',
        'Lifetime free updates',
      ],
    },
  ];

  const presetModes = [
    {
      id: 'boring',
      name: 'Boring',
      icon: '😴',
      description: 'Just a fake call. No SOS. Perfect for quick exits.',
      sms: null,
      timer: false,
      gps: false,
    },
    {
      id: 'uncomfortable',
      name: 'Uncomfortable',
      icon: '😟',
      description: 'Fake call + 10-minute safety timer. Auto-alert if you don\'t check in.',
      sms: '📍 Location shared with emergency contact if timer expires',
      timer: true,
      gps: true,
    },
    {
      id: 'high-alert',
      name: 'High Alert',
      icon: '🆘',
      description: 'Immediate GPS share with emergency contact. No timer—instant alert.',
      sms: '🚨 TokAway High Alert - Location immediately shared',
      timer: false,
      gps: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-blue-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚨</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              TokAway
            </h1>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-blue-400 transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-blue-400 transition">
              Pricing
            </a>
            <a href="#contact" className="hover:text-blue-400 transition">
              Support
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-700/60">
              <span className="text-sm text-blue-300">Safety First</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Discreet <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Escape Plan</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Sometimes you need a polite way out. TokAway creates realistic fake calls, letting you safely exit uncomfortable or unsafe situations without awkwardness or confrontation.
            </p>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold transition transform hover:scale-105"
              >
                Download Now
              </button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-900/30 font-bold transition"
              >
                Learn More
              </a>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <div>⭐ 4.8 Rating</div>
              <div>📥 12K+ Downloads</div>
              <div>🔒 100% Private</div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-b from-blue-900/30 to-transparent rounded-3xl border border-blue-700/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">☎️</div>
                <p className="text-slate-300">Fake Call Active</p>
                <p className="text-2xl font-bold text-blue-400 mt-4">Mom Calling</p>
                <div className="mt-6 flex gap-3 justify-center">
                  <button className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center">
                    ✕
                  </button>
                  <button className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 transition flex items-center justify-center">
                    ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Flow Section */}
      <section id="features" className="bg-blue-900/20 border-y border-blue-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Your Safety Network</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            TokAway escalates intelligently. Start with a discreet fake call. If you're not safe, it automatically alerts your emergency contacts.
          </p>

          {/* Main Safety Flow */}
          <div className="bg-slate-900/80 border-2 border-blue-700/40 rounded-3xl p-8 mb-12">
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Trigger Fake Call</h3>
                  <p className="text-slate-300">
                    Tap the home screen widget or app to activate a realistic incoming call from a contact you've set up. Created a discreet exit without suspicion.
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-2">
                <div className="text-3xl text-blue-400">↓</div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Check-In Timer Starts</h3>
                  <p className="text-slate-300">
                    After exiting the situation, a 10-minute check-in timer begins. This gives you time to get to safety. Label shows: "Check in when safe" with countdown.
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-2">
                <div className="text-3xl text-blue-400">↓</div>
              </div>

              {/* Step 3 - Branching */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Safe Path */}
                <div className="bg-green-900/30 border border-green-700/40 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-green-400 mb-3">✓ You're Safe</h3>
                  <p className="text-slate-300 mb-4">
                    Tap "I'm Safe" to disable the timer. That's it—you're good. App forgets about it.
                  </p>
                  <div className="text-2xl">😌</div>
                </div>

                {/* Unsafe Path */}
                <div className="bg-red-900/30 border border-red-700/40 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">⚠️ Timer Expires (Unsafe)</h3>
                  <p className="text-slate-300 mb-4">
                    If you don't disable the timer before it runs out, TokAway assumes you're not safe and auto-activates.
                  </p>
                  <div className="text-2xl">😟</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-2">
                <div className="text-3xl text-red-400">↓</div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-300 mb-2">Find Safe Location</h3>
                  <p className="text-slate-300">
                    App requests your location and begins acquiring GPS coordinates. You see: "Finding safe location..." with live map.
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-2">
                <div className="text-3xl text-red-400">↓</div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-300 mb-2">Send Location to Emergency Contact</h3>
                  <p className="text-slate-300 mb-4">
                    TokAway displays: "Send your location to emergency contact?" with your current location shown. You confirm or deny.
                  </p>
                  <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mt-4 font-mono text-sm text-emerald-400">
                    📱 <strong>Emergency Contact SMS:</strong><br/>
                    "🚨 TokAway Safety Alert<br/>
                    I need help. Current location: [map link]<br/>
                    Latitude: 40.7128°N<br/>
                    Longitude: 74.0060°W"
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold mb-3">Discreet Entry</h3>
              <p className="text-slate-300">
                Fake call looks 100% real. Caller ID spoofing with custom contact names keeps your exit looking natural.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-3">Smart Timer</h3>
              <p className="text-slate-300">
                10-minute window to reach safety. If you don't check in, the system assumes worst-case and escalates automatically.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition">
              <div className="text-4xl mb-4">🆘</div>
              <h3 className="text-xl font-bold mb-3">Automatic Alert</h3>
              <p className="text-slate-300">
                Location is captured and sent to your emergency contact with a clear "TokAway Safety" SMS. They know to help immediately.
              </p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🔒 Privacy First</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ All data saved locally on your device</li>
                <li>✓ No cloud sync or tracking</li>
                <li>✓ SMS sent directly to your emergency contact</li>
                <li>✓ Works offline (GPS requires signal)</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">⚡ Smart Escalation</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ 10-minute safety check-in timer</li>
                <li>✓ Automatic GPS location capture</li>
                <li>✓ Emergency contact SMS with location</li>
                <li>✓ One-tap disable if you reach safety</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Getting Started</h2>
        
        <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">📋</span> Set Up Your Emergency Contacts
          </h3>
          <p className="text-slate-300 mb-6">
            Before you need TokAway, configure who gets alerted if you don't check in:
          </p>
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-green-600">
              <p className="font-bold mb-2">Step 1: Open Settings</p>
              <p className="text-slate-400">Navigate to Settings → Emergency Contacts</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-green-600">
              <p className="font-bold mb-2">Step 2: Add Contact</p>
              <p className="text-slate-400">Enter phone number and choose someone you trust. They'll get the alert if the timer expires.</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-green-600">
              <p className="font-bold mb-2">Step 3: Add Decoy Contacts</p>
              <p className="text-slate-400">Create fake caller names (Mom, Boss, etc.) for the discreet fake calls</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-green-600">
              <p className="font-bold mb-2">Step 4: Ready to Go</p>
              <p className="text-slate-400">You're set up. TokAway is now your invisible safety net.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-900/30 border border-blue-700/40 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">When to Use TokAway</h3>
            <ul className="space-y-3 text-slate-300">
              <li>✓ Uncomfortable date or blind date situation</li>
              <li>✓ Dealing with aggressive person</li>
              <li>✓ Lost or in unfamiliar area feeling unsafe</li>
              <li>✓ Workplace or social situation turning hostile</li>
              <li>✓ Any moment you need a quick, discreet exit</li>
            </ul>
          </div>

          <div className="bg-green-900/30 border border-green-700/40 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">Why It Works</h3>
            <ul className="space-y-3 text-slate-300">
              <li>✓ Looks 100% real—no one suspects the call is fake</li>
              <li>✓ Automatic escalation if you don't check in</li>
              <li>✓ Emergency contact knows exactly where you are</li>
              <li>✓ Zero interaction required if you're in actual danger</li>
              <li>✓ Designed for real safety, not just convenience</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pre-Check Simulation Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-6 text-center">Pre-Check Simulation</h2>
        <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
          See exactly what you'll experience before you need it. Test the fake call screen, SMS format, and timer—all without any real alerts.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {presetModes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => {
                setDemoMode(mode.id);
                setShowDemoCallScreen(true);
              }}
              className="bg-slate-900/60 border border-blue-700/40 hover:border-blue-600/80 rounded-2xl p-6 cursor-pointer transition transform hover:scale-105"
            >
              <div className="text-4xl mb-3">{mode.icon}</div>
              <h3 className="text-xl font-bold mb-2">{mode.name}</h3>
              <p className="text-slate-300 text-sm mb-4">{mode.description}</p>
              <div className="w-full py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-bold transition text-sm text-center">
                Try Demo
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/80 border-2 border-blue-700/40 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">What They'll See</h3>
          <p className="text-slate-300 mb-8">
            When you trigger TokAway, the fake call screen appears instantly on their phone. It looks completely real.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Call Screen Demo */}
            <div className="bg-gradient-to-b from-blue-900/30 to-transparent rounded-3xl border border-blue-700/40 flex items-center justify-center p-8">
              <div className="text-center w-full bg-slate-900 rounded-2xl p-8 border border-blue-700/40">
                <div className="text-6xl mb-6">☎️</div>
                <p className="text-slate-400 text-sm mb-2">Incoming Call</p>
                <p className="text-3xl font-bold text-blue-400 mb-8">Mom</p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {}}
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center text-2xl font-bold"
                  >
                    ✕
                  </button>
                  <button 
                    onClick={() => setShowSuccessState(true)}
                    className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 transition flex items-center justify-center text-2xl font-bold"
                  >
                    ✓
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-6">Completely realistic incoming call interface</p>
              </div>
            </div>

            {/* SMS Preview */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold mb-4">Emergency SMS</h4>
              {presetModes.find(m => m.id === demoMode)?.sms ? (
                <div className="bg-green-900/30 border border-green-700/40 rounded-2xl p-6">
                  <p className="text-slate-300 font-mono text-sm leading-relaxed">
                    {presetModes.find(m => m.id === demoMode)?.sms}
                  </p>
                </div>
              ) : (
                <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6">
                  <p className="text-slate-500 italic">No SOS message in this mode—just the discreet fake call.</p>
                </div>
              )}

              <h4 className="text-lg font-bold mt-6 mb-4">Activation Settings</h4>
              <div className="space-y-3 bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Safety Timer</span>
                  <span className={presetModes.find(m => m.id === demoMode)?.timer ? 'text-green-400 font-bold' : 'text-slate-500'}>
                    {presetModes.find(m => m.id === demoMode)?.timer ? '✓ Active (10 min)' : '✗ Off'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">GPS Activation</span>
                  <span className={presetModes.find(m => m.id === demoMode)?.gps ? 'text-green-400 font-bold' : 'text-slate-500'}>
                    {presetModes.find(m => m.id === demoMode)?.gps ? '✓ Active' : '✗ Off'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Emergency Contact</span>
                  <span className="text-blue-400 font-bold">Mom (555-0123)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success State Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-6 text-center">The "I'm Safe" Confirmation</h2>
        <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
          As soon as they reach safety, one tap stops the timer and confirms everything is okay.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-b from-green-900/30 to-transparent rounded-3xl border border-green-700/40 flex items-center justify-center p-8">
            <div className="text-center w-full bg-slate-900 rounded-2xl p-12 border border-green-700/40">
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-3xl font-bold text-green-400 mb-4">You're Safe</h3>
              <p className="text-slate-300 mb-8">Timer has been disabled. Your emergency contact wasn't alerted.</p>
              <button 
                onClick={() => setShowSuccessState(false)}
                className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 font-bold transition"
              >
                Close
              </button>
              <p className="text-xs text-slate-500 mt-8">Quick confirmation that the system is standing down</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-2xl font-bold">What Happens</h4>
            <div className="space-y-4">
              <div className="bg-green-900/30 border border-green-700/40 rounded-xl p-4">
                <p className="font-bold text-green-400 mb-2">✓ Timer Stops</p>
                <p className="text-slate-300 text-sm">The 10-minute countdown is cancelled immediately.</p>
              </div>
              <div className="bg-green-900/30 border border-green-700/40 rounded-xl p-4">
                <p className="font-bold text-green-400 mb-2">✓ No Alert Sent</p>
                <p className="text-slate-300 text-sm">Emergency contact receives nothing. They won't know you needed help.</p>
              </div>
              <div className="bg-green-900/30 border border-green-700/40 rounded-xl p-4">
                <p className="font-bold text-green-400 mb-2">✓ Peace of Mind</p>
                <p className="text-slate-300 text-sm">Clear confirmation that you reached safety and the system is standing down.</p>
              </div>
              <div className="bg-blue-900/30 border border-blue-700/40 rounded-xl p-4">
                <p className="font-bold text-blue-400 mb-2">📊 History Logged</p>
                <p className="text-slate-300 text-sm">You can review all activations in your call history. Pro feature: Location history & analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Triggers Section */}
      <section className="bg-blue-900/20 border-y border-blue-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">The "No-Look" Exit</h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            In a tense moment, fumbling with your phone is a giveaway. That's why TokAway supports physical triggers.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="text-xl font-bold mb-3">Volume Button Trigger</h3>
              <p className="text-slate-300 mb-4">
                Press the volume up or down button 3 times rapidly while the phone is locked or in your pocket.
              </p>
              <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/40">
                <p className="text-sm text-slate-400">
                  <strong>User Value:</strong> The system activates without unlocking your phone. No one can tell you did anything.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition">
              <div className="text-4xl mb-4">🔙</div>
              <h3 className="text-xl font-bold mb-3">Triple-Tap Back of Phone</h3>
              <p className="text-slate-300 mb-4">
                Tap the back of your phone 3 times in quick succession to trigger the fake call or safety timer.
              </p>
              <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/40">
                <p className="text-sm text-slate-400">
                  <strong>User Value:</strong> Arm the system while keeping your phone in your pocket. Completely discreet.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-slate-900/80 border-2 border-blue-700/40 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl mb-4">1️⃣</div>
                <p className="font-bold mb-2">Set Trigger</p>
                <p className="text-slate-300 text-sm">In Settings, choose which physical trigger you want active.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">2️⃣</div>
                <p className="font-bold mb-2">Activate Discreetly</p>
                <p className="text-slate-300 text-sm">When needed, tap the volume button or back of phone 3x rapidly.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">3️⃣</div>
                <p className="font-bold mb-2">Fake Call Appears</p>
                <p className="text-slate-300 text-sm">The call screen pops up. They see an incoming call from your preset contact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Silent Countdown Overlay Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-6 text-center">Silent Countdown Overlay</h2>
        <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
          While the 10-minute timer is active, a discreet countdown appears on the lock screen. They can check remaining time without unlocking.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-b from-slate-900 to-blue-900/30 rounded-3xl border border-blue-700/40 flex items-center justify-center p-8 min-h-96">
            <div className="text-center">
              <div className="text-lg text-slate-400 mb-4">Lock Screen View</div>
              <div className="text-8xl font-bold text-blue-400 mb-6 font-mono">9:47</div>
              <div className="text-slate-300 mb-8">Time Remaining</div>
              <div className="text-xs text-slate-500 bg-slate-800/60 rounded px-4 py-2 inline-block">
                TokAway Safety Timer • Check in when safe
              </div>
              <p className="text-xs text-slate-500 mt-8">Dim overlay won't drain battery or distract others</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-2xl font-bold">Key Features</h4>
            <div className="space-y-4">
              <div className="bg-blue-900/30 border border-blue-700/40 rounded-xl p-4">
                <p className="font-bold text-blue-400 mb-2">👁️ Discreet Display</p>
                <p className="text-slate-300 text-sm">Very dim countdown that doesn't attract attention. Minimal battery impact.</p>
              </div>
              <div className="bg-blue-900/30 border border-blue-700/40 rounded-xl p-4">
                <p className="font-bold text-blue-400 mb-2">⏰ Persistent Notification</p>
                <p className="text-slate-300 text-sm">They can glance at the lock screen to see how much time they have left.</p>
              </div>
              <div className="bg-blue-900/30 border border-blue-700/40 rounded-xl p-4">
                <p className="font-bold text-blue-400 mb-2">🔔 Auto-Escalation Alert</p>
                <p className="text-slate-300 text-sm">When timer hits zero, a subtle vibration prompts them before auto-alert goes out.</p>
              </div>
              <div className="bg-green-900/30 border border-green-700/40 rounded-xl p-4">
                <p className="font-bold text-green-400 mb-2">✓ One-Tap Safety</p>
                <p className="text-slate-300 text-sm">Tap the countdown to open TokAway and hit \"I'm Safe\" to stop the timer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Use Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-900/30 border border-blue-700/40 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">When to Use TokAway</h3>
            <ul className="space-y-3 text-slate-300">
              <li>✓ Uncomfortable date or blind date situation</li>
              <li>✓ Dealing with aggressive person</li>
              <li>✓ Lost or in unfamiliar area feeling unsafe</li>
              <li>✓ Workplace or social situation turning hostile</li>
              <li>✓ Any moment you need a quick, discreet exit</li>
            </ul>
          </div>

          <div className="bg-green-900/30 border border-green-700/40 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">Why It Works</h3>
            <ul className="space-y-3 text-slate-300">
              <li>✓ Looks 100% real—no one suspects the call is fake</li>
              <li>✓ Automatic escalation if you don't check in</li>
              <li>✓ Emergency contact knows exactly where you are</li>
              <li>✓ Zero interaction required if you're in actual danger</li>
              <li>✓ Designed for real safety, not just convenience</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-700/40 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Part of the KPA Mission</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-6">
            <span className="text-blue-400 font-bold">K</span>eep
            <span className="text-blue-400 font-bold">P</span>eople
            <span className="text-blue-400 font-bold">A</span>live
          </p>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            TokAway is more than a convenience tool—it's a real safety feature designed to help people escape genuinely uncomfortable or unsafe situations. The automatic escalation ensures that even if you're too scared to act, your emergency contact knows exactly where you are within 10 minutes. Your wellbeing is our priority.
          </p>

          <div className="mt-8 bg-slate-900/60 border border-green-700/40 rounded-xl p-6 inline-block">
            <p className="text-sm text-slate-300">
              <span className="text-2xl mr-2">🆘</span>
              <strong>When it matters most:</strong> Professional help (police, friend, family) gets your exact location automatically if you can't respond.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-blue-900/20 border-y border-blue-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Simple Pricing</h2>
          <p className="text-center text-slate-300 mb-16">
            Choose the plan that fits your needs
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPlan(idx)}
                className={`rounded-2xl p-8 border-2 transition cursor-pointer ${
                  selectedPlan === idx
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-slate-700 bg-slate-900/60 hover:border-blue-700'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price.toFixed(2)}</span>
                  <span className="text-slate-400 ml-2">{plan.type}</span>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  {plan.name.includes('Pro') 
                    ? 'Best for comprehensive safety' 
                    : 'Perfect for essential protection'}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-slate-300">
                      <span className="text-blue-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowModal(true)}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    selectedPlan === idx
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm">
            All plans include lifetime access to your data. No subscriptions.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Trusted by Thousands</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">4.8★</div>
            <p className="text-slate-300">Average Rating (298 reviews)</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">12K+</div>
            <p className="text-slate-300">Downloads & Growing</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
            <p className="text-slate-300">Private & Offline</p>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-t border-blue-800/30 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get TokAway?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Download for free today. Choose your plan and start creating your escape routes.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold text-lg transition transform hover:scale-105"
          >
            Download TokAway Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-blue-400">TokAway</h3>
              <p className="text-slate-400 text-sm">Your discreet escape plan.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#features" className="hover:text-blue-400">Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-400">Pricing</a></li>
                <li><a href="/tokstore" className="hover:text-blue-400">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:support@tokaway.app" className="hover:text-blue-400">Email Support</a></li>
                <li><a href="/tokaway-landing" className="hover:text-blue-400">FAQ</a></li>
                <li><a href="https://tokaway.app/privacy" className="hover:text-blue-400">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://tokaway.app/privacy" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2026 TokAway. Part of the KPA Mission - Keep People Alive.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Call Screen Modal */}
      {showDemoCallScreen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 border border-blue-700/40 shadow-2xl">
              <div className="text-center">
                <div className="text-7xl mb-8 animate-bounce">☎️</div>
                <p className="text-slate-400 text-sm uppercase tracking-wide mb-4">Incoming Call</p>
                <h2 className="text-5xl font-bold text-blue-400 mb-12">Mom</h2>
                
                <div className="space-y-6">
                  {/* Call Controls */}
                  <div className="flex gap-6 justify-center">
                    <button 
                      onClick={() => setShowDemoCallScreen(false)}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                    >
                      ✕
                    </button>
                    <button 
                      onClick={() => {
                        setShowDemoCallScreen(false);
                        setShowSuccessState(false);
                      }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                    >
                      ✓
                    </button>
                  </div>

                  {/* SMS Preview */}
                  {presetModes.find(m => m.id === demoMode)?.sms && (
                    <div className="mt-8 pt-8 border-t border-slate-700">
                      <p className="text-xs text-slate-500 mb-3 uppercase">Emergency SMS Preview</p>
                      <div className="bg-green-900/40 border border-green-700/60 rounded-xl p-4">
                        <p className="text-green-300 text-sm font-mono leading-relaxed">
                          {presetModes.find(m => m.id === demoMode)?.sms}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 mt-3">
                        ⏱️ Sent after 10-minute timer expires
                      </p>
                    </div>
                  )}

                  {/* Demo Legend */}
                  <div className="mt-8 pt-8 border-t border-slate-700 text-left space-y-2 text-xs text-slate-400">
                    <p>✕ = Decline (fake call ends)</p>
                    <p>✓ = Accept & start checking in</p>
                    <p>Mode: <strong className="text-blue-400">{presetModes.find(m => m.id === demoMode)?.name}</strong></p>
                  </div>
                </div>

                <button
                  onClick={() => setShowDemoCallScreen(false)}
                  className="w-full mt-8 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold transition"
                >
                  Close Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success State Modal */}
      {showSuccessState && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm">
            <div className="bg-gradient-to-b from-green-900/40 to-slate-900 rounded-3xl p-8 border border-green-700/60 shadow-2xl text-center">
              <div className="text-7xl mb-6 animate-pulse">✓</div>
              <h2 className="text-4xl font-bold text-green-400 mb-4">You're Safe</h2>
              <p className="text-slate-300 mb-8">
                Timer has been disabled. Your emergency contact wasn't alerted. Everything is okay.
              </p>

              <div className="space-y-4 bg-slate-800/60 rounded-xl p-6 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-300">Timer Stopped</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-300">No Alert Sent</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-300">System Standing Down</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-6">
                The system is ready whenever you need it next. You closed the loop successfully.
              </p>

              <button
                onClick={() => setShowSuccessState(false)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-blue-700/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Get TokAway</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-slate-300">Plan: <span className="font-bold text-blue-400">{plans[selectedPlan].name}</span></p>
              <p className="text-slate-300">Price: <span className="font-bold text-2xl">${plans[selectedPlan].price.toFixed(2)}</span></p>
            </div>

            <Link
              href="/tokstore"
              onClick={() => setShowModal(false)}
              className="w-full block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold transition mb-3"
            >
              Go to TokStore
            </Link>

            <button
              onClick={() => setShowModal(false)}
              className="w-full px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-900/30 font-bold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
