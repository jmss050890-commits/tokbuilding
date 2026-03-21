&apos;use client&apos;;

import { useState } from &apos;react&apos;;
import Link from &apos;next/link&apos;;

export default function TokAwayLanding() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDemoCallScreen, setShowDemoCallScreen] = useState(false);
  const [demoMode, setDemoMode] = useState(&apos;test&apos;); // &apos;test&apos; | &apos;boring&apos; | &apos;uncomfortable&apos; | &apos;high-alert&apos;
  const [showSuccessState, setShowSuccessState] = useState(false);

  const plans = [
    {
      name: &apos;TokAway Basic&apos;,
      price: 4.99,
      type: &apos;one-time&apos;,
      features: [
        &apos;Fake call generator&apos;,
        &apos;Custom decoy contacts&apos;,
        &apos;10-minute safety timer&apos;,
        &apos;GPS location capture&apos;,
        &apos;Emergency SMS to 1 contact&apos;,
        &apos;Call history&apos;,
      ],
    },
    {
      name: &apos;TokAway Pro&apos;,
      price: 9.99,
      type: &apos;lifetime&apos;,
      features: [
        &apos;Everything in Basic&apos;,
        &apos;Up to 3 emergency contacts&apos;,
        &apos;Scheduled auto-check-in calls&apos;,
        &apos;Safe word detection (voice)&apos;,
        &apos;Call scripts & responses&apos;,
        &apos;Location history & maps&apos;,
        &apos;Advanced SMS customization&apos;,
        &apos;Lifetime free updates&apos;,
      ],
    },
  ];

  const presetModes = [
    {
      id: &apos;boring&apos;,
      name: &apos;Boring&apos;,
      icon: &apos;😴&apos;,
      description: &apos;Just a fake call. No SOS. Perfect for quick exits.&apos;,
      sms: null,
      timer: false,
      gps: false,
    },
    {
      id: &apos;uncomfortable&apos;,
      name: &apos;Uncomfortable&apos;,
      icon: &apos;😟&apos;,
      description: &apos;Fake call + 10-minute safety timer. Auto-alert if you don\&apos;t check in.&apos;,
      sms: &apos;📍 Location shared with emergency contact if timer expires&apos;,
      timer: true,
      gps: true,
    },
    {
      id: &apos;high-alert&apos;,
      name: &apos;High Alert&apos;,
      icon: &apos;🆘&apos;,
      description: &apos;Immediate GPS share with emergency contact. No timer—instant alert.&apos;,
      sms: &apos;🚨 TokAway High Alert - Location immediately shared&apos;,
      timer: false,
      gps: true,
    },
  ];

  return (
    <div className=&quot;min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white&quot;>
      {/* Navigation */}
      <nav className=&quot;sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-blue-800/30&quot;>
        <div className=&quot;max-w-6xl mx-auto px-6 py-4 flex items-center justify-between&quot;>
          <div className=&quot;flex items-center gap-2&quot;>
            <span className=&quot;text-2xl&quot;>🚨</span>
            <h1 className=&quot;text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent&quot;>
              TokAway
            </h1>
          </div>
          <div className=&quot;flex gap-6&quot;>
            <a href=&quot;#features&quot; className=&quot;hover:text-blue-400 transition&quot;>
              Features
            </a>
            <a href=&quot;#pricing&quot; className=&quot;hover:text-blue-400 transition&quot;>
              Pricing
            </a>
            <a href=&quot;#contact&quot; className=&quot;hover:text-blue-400 transition&quot;>
              Support
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className=&quot;max-w-6xl mx-auto px-6 py-20&quot;>
        <div className=&quot;grid md:grid-cols-2 gap-12 items-center&quot;>
          <div>
            <div className=&quot;inline-block mb-4 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-700/60&quot;>
              <span className=&quot;text-sm text-blue-300&quot;>Safety First</span>
            </div>
            <h2 className=&quot;text-5xl md:text-6xl font-bold mb-6 leading-tight&quot;>
              Your Discreet <span className=&quot;bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent&quot;>Escape Plan</span>
            </h2>
            <p className=&quot;text-lg text-slate-300 mb-8 leading-relaxed&quot;>
              Sometimes you need a polite way out. TokAway creates realistic fake calls, letting you safely exit uncomfortable or unsafe situations without awkwardness or confrontation.
            </p>
            <div className=&quot;flex gap-4 mb-8&quot;>
              <button
                onClick={() => setShowModal(true)}
                className=&quot;px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold transition transform hover:scale-105&quot;
              >
                Download Now
              </button>
              <a
                href=&quot;#features&quot;
                className=&quot;px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-900/30 font-bold transition&quot;
              >
                Learn More
              </a>
            </div>
            <div className=&quot;flex gap-6 text-sm text-slate-400&quot;>
              <div>⭐ 4.8 Rating</div>
              <div>📥 12K+ Downloads</div>
              <div>🔒 100% Private</div>
            </div>
          </div>

          <div className=&quot;hidden md:flex items-center justify-center&quot;>
            <div className=&quot;relative w-full h-96 bg-gradient-to-b from-blue-900/30 to-transparent rounded-3xl border border-blue-700/40 flex items-center justify-center&quot;>
              <div className=&quot;text-center&quot;>
                <div className=&quot;text-6xl mb-4&quot;>☎️</div>
                <p className=&quot;text-slate-300&quot;>Fake Call Active</p>
                <p className=&quot;text-2xl font-bold text-blue-400 mt-4&quot;>Mom Calling</p>
                <div className=&quot;mt-6 flex gap-3 justify-center&quot;>
                  <button className=&quot;w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center&quot;>
                    ✕
                  </button>
                  <button className=&quot;w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 transition flex items-center justify-center&quot;>
                    ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Flow Section */}
      <section id=&quot;features&quot; className=&quot;bg-blue-900/20 border-y border-blue-800/30 py-20&quot;>
        <div className=&quot;max-w-6xl mx-auto px-6&quot;>
          <h2 className=&quot;text-4xl font-bold mb-4 text-center&quot;>Your Safety Network</h2>
          <p className=&quot;text-center text-slate-300 mb-16 max-w-2xl mx-auto&quot;>
            TokAway escalates intelligently. Start with a discreet fake call. If you&apos;re not safe, it automatically alerts your emergency contacts.
          </p>

          {/* Main Safety Flow */}
          <div className=&quot;bg-slate-900/80 border-2 border-blue-700/40 rounded-3xl p-8 mb-12&quot;>
            <div className=&quot;space-y-4&quot;>
              {/* Step 1 */}
              <div className=&quot;flex gap-4 items-start&quot;>
                <div className=&quot;flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg&quot;>
                  1
                </div>
                <div className=&quot;flex-1&quot;>
                  <h3 className=&quot;text-xl font-bold mb-2&quot;>Trigger Fake Call</h3>
                  <p className=&quot;text-slate-300&quot;>
                    Tap the home screen widget or app to activate a realistic incoming call from a contact you&apos;ve set up. Created a discreet exit without suspicion.
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className=&quot;flex justify-center py-2&quot;>
                <div className=&quot;text-3xl text-blue-400&quot;>↓</div>
              </div>

              {/* Step 2 */}
              <div className=&quot;flex gap-4 items-start&quot;>
                <div className=&quot;flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg&quot;>
                  2
                </div>
                <div className=&quot;flex-1&quot;>
                  <h3 className=&quot;text-xl font-bold mb-2&quot;>Check-In Timer Starts</h3>
                  <p className=&quot;text-slate-300&quot;>
                    After exiting the situation, a 10-minute check-in timer begins. This gives you time to get to safety. Label shows: &quot;Check in when safe&quot; with countdown.
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className=&quot;flex justify-center py-2&quot;>
                <div className=&quot;text-3xl text-blue-400&quot;>↓</div>
              </div>

              {/* Step 3 - Branching */}
              <div className=&quot;grid md:grid-cols-2 gap-4&quot;>
                {/* Safe Path */}
                <div className=&quot;bg-green-900/30 border border-green-700/40 rounded-2xl p-6&quot;>
                  <h3 className=&quot;text-lg font-bold text-green-400 mb-3&quot;>✓ You&apos;re Safe</h3>
                  <p className=&quot;text-slate-300 mb-4&quot;>
                    Tap &quot;I&apos;m Safe&quot; to disable the timer. That&apos;s it—you&apos;re good. App forgets about it.
                  </p>
                  <div className=&quot;text-2xl&quot;>😌</div>
                </div>

                {/* Unsafe Path */}
                <div className=&quot;bg-red-900/30 border border-red-700/40 rounded-2xl p-6&quot;>
                  <h3 className=&quot;text-lg font-bold text-red-400 mb-3&quot;>⚠️ Timer Expires (Unsafe)</h3>
                  <p className=&quot;text-slate-300 mb-4&quot;>
                    If you don&apos;t disable the timer before it runs out, TokAway assumes you&apos;re not safe and auto-activates.
                  </p>
                  <div className=&quot;text-2xl&quot;>😟</div>
                </div>
              </div>

              {/* Arrow */}
              <div className=&quot;flex justify-center py-2&quot;>
                <div className=&quot;text-3xl text-red-400&quot;>↓</div>
              </div>

              {/* Step 4 */}
              <div className=&quot;flex gap-4 items-start&quot;>
                <div className=&quot;flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold text-lg&quot;>
                  4
                </div>
                <div className=&quot;flex-1&quot;>
                  <h3 className=&quot;text-xl font-bold text-red-300 mb-2&quot;>Find Safe Location</h3>
                  <p className=&quot;text-slate-300&quot;>
                    App requests your location and begins acquiring GPS coordinates. You see: &quot;Finding safe location...&quot; with live map.
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className=&quot;flex justify-center py-2&quot;>
                <div className=&quot;text-3xl text-red-400&quot;>↓</div>
              </div>

              {/* Step 5 */}
              <div className=&quot;flex gap-4 items-start&quot;>
                <div className=&quot;flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold text-lg&quot;>
                  5
                </div>
                <div className=&quot;flex-1&quot;>
                  <h3 className=&quot;text-xl font-bold text-red-300 mb-2&quot;>Send Location to Emergency Contact</h3>
                  <p className=&quot;text-slate-300 mb-4&quot;>
                    TokAway displays: &quot;Send your location to emergency contact?&quot; with your current location shown. You confirm or deny.
                  </p>
                  <div className=&quot;bg-slate-800 border border-slate-700 rounded-lg p-4 mt-4 font-mono text-sm text-emerald-400&quot;>
                    📱 <strong>Emergency Contact SMS:</strong><br/>
                    &quot;🚨 TokAway Safety Alert<br/>
                    I need help. Current location: [map link]<br/>
                    Latitude: 40.7128°N<br/>
                    Longitude: 74.0060°W&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className=&quot;grid md:grid-cols-3 gap-8&quot;>
            <div className=&quot;bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition&quot;>
              <div className=&quot;text-4xl mb-4&quot;>🎭</div>
              <h3 className=&quot;text-xl font-bold mb-3&quot;>Discreet Entry</h3>
              <p className=&quot;text-slate-300&quot;>
                Fake call looks 100% real. Caller ID spoofing with custom contact names keeps your exit looking natural.
              </p>
            </div>

            <div className=&quot;bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition&quot;>
              <div className=&quot;text-4xl mb-4&quot;>⏱️</div>
              <h3 className=&quot;text-xl font-bold mb-3&quot;>Smart Timer</h3>
              <p className=&quot;text-slate-300&quot;>
                10-minute window to reach safety. If you don&apos;t check in, the system assumes worst-case and escalates automatically.
              </p>
            </div>

            <div className=&quot;bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition&quot;>
              <div className=&quot;text-4xl mb-4&quot;>🆘</div>
              <h3 className=&quot;text-xl font-bold mb-3&quot;>Automatic Alert</h3>
              <p className=&quot;text-slate-300&quot;>
                Location is captured and sent to your emergency contact with a clear &quot;TokAway Safety&quot; SMS. They know to help immediately.
              </p>
            </div>
          </div>

          <div className=&quot;mt-16 grid md:grid-cols-2 gap-8&quot;>
            <div className=&quot;bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8&quot;>
              <h3 className=&quot;text-2xl font-bold mb-4&quot;>🔒 Privacy First</h3>
              <ul className=&quot;space-y-3 text-slate-300&quot;>
                <li>✓ All data saved locally on your device</li>
                <li>✓ No cloud sync or tracking</li>
                <li>✓ SMS sent directly to your emergency contact</li>
                <li>✓ Works offline (GPS requires signal)</li>
              </ul>
            </div>

            <div className=&quot;bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8&quot;>
              <h3 className=&quot;text-2xl font-bold mb-4&quot;>⚡ Smart Escalation</h3>
              <ul className=&quot;space-y-3 text-slate-300&quot;>
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
      <section className=&quot;max-w-6xl mx-auto px-6 py-20&quot;>
        <h2 className=&quot;text-4xl font-bold mb-12 text-center&quot;>Getting Started</h2>
        
        <div className=&quot;bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 mb-8&quot;>
          <h3 className=&quot;text-2xl font-bold mb-6 flex items-center gap-3&quot;>
            <span className=&quot;text-3xl&quot;>📋</span> Set Up Your Emergency Contacts
          </h3>
          <p className=&quot;text-slate-300 mb-6&quot;>
            Before you need TokAway, configure who gets alerted if you don&apos;t check in:
          </p>
          <div className=&quot;space-y-4&quot;>
            <div className=&quot;bg-slate-800 rounded-lg p-4 border-l-4 border-green-600&quot;>
              <p className=&quot;font-bold mb-2&quot;>Step 1: Open Settings</p>
              <p className=&quot;text-slate-400&quot;>Navigate to Settings → Emergency Contacts</p>
            </div>
            <div className=&quot;bg-slate-800 rounded-lg p-4 border-l-4 border-green-600&quot;>
              <p className=&quot;font-bold mb-2&quot;>Step 2: Add Contact</p>
              <p className=&quot;text-slate-400&quot;>Enter phone number and choose someone you trust. They&apos;ll get the alert if the timer expires.</p>
            </div>
            <div className=&quot;bg-slate-800 rounded-lg p-4 border-l-4 border-green-600&quot;>
              <p className=&quot;font-bold mb-2&quot;>Step 3: Add Decoy Contacts</p>
              <p className=&quot;text-slate-400&quot;>Create fake caller names (Mom, Boss, etc.) for the discreet fake calls</p>
            </div>
            <div className=&quot;bg-slate-800 rounded-lg p-4 border-l-4 border-green-600&quot;>
              <p className=&quot;font-bold mb-2&quot;>Step 4: Ready to Go</p>
              <p className=&quot;text-slate-400&quot;>You&apos;re set up. TokAway is now your invisible safety net.</p>
            </div>
          </div>
        </div>

        <div className=&quot;grid md:grid-cols-2 gap-8&quot;>
          <div className=&quot;bg-blue-900/30 border border-blue-700/40 rounded-2xl p-8&quot;>
            <h3 className=&quot;text-xl font-bold mb-4&quot;>When to Use TokAway</h3>
            <ul className=&quot;space-y-3 text-slate-300&quot;>
              <li>✓ Uncomfortable date or blind date situation</li>
              <li>✓ Dealing with aggressive person</li>
              <li>✓ Lost or in unfamiliar area feeling unsafe</li>
              <li>✓ Workplace or social situation turning hostile</li>
              <li>✓ Any moment you need a quick, discreet exit</li>
            </ul>
          </div>

          <div className=&quot;bg-green-900/30 border border-green-700/40 rounded-2xl p-8&quot;>
            <h3 className=&quot;text-xl font-bold mb-4&quot;>Why It Works</h3>
            <ul className=&quot;space-y-3 text-slate-300&quot;>
              <li>✓ Looks 100% real—no one suspects the call is fake</li>
              <li>✓ Automatic escalation if you don&apos;t check in</li>
              <li>✓ Emergency contact knows exactly where you are</li>
              <li>✓ Zero interaction required if you&apos;re in actual danger</li>
              <li>✓ Designed for real safety, not just convenience</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pre-Check Simulation Section */}
      <section className=&quot;max-w-6xl mx-auto px-6 py-20&quot;>
        <h2 className=&quot;text-4xl font-bold mb-6 text-center&quot;>Pre-Check Simulation</h2>
        <p className=&quot;text-center text-slate-300 mb-12 max-w-2xl mx-auto&quot;>
          See exactly what you&apos;ll experience before you need it. Test the fake call screen, SMS format, and timer—all without any real alerts.
        </p>

        <div className=&quot;grid md:grid-cols-3 gap-6 mb-12&quot;>
          {presetModes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => {
                setDemoMode(mode.id);
                setShowDemoCallScreen(true);
              }}
              className=&quot;bg-slate-900/60 border border-blue-700/40 hover:border-blue-600/80 rounded-2xl p-6 cursor-pointer transition transform hover:scale-105&quot;
            >
              <div className=&quot;text-4xl mb-3&quot;>{mode.icon}</div>
              <h3 className=&quot;text-xl font-bold mb-2&quot;>{mode.name}</h3>
              <p className=&quot;text-slate-300 text-sm mb-4&quot;>{mode.description}</p>
              <div className=&quot;w-full py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-bold transition text-sm text-center&quot;>
                Try Demo
              </div>
            </div>
          ))}
        </div>

        <div className=&quot;bg-slate-900/80 border-2 border-blue-700/40 rounded-3xl p-8&quot;>
          <h3 className=&quot;text-2xl font-bold mb-6&quot;>What They&apos;ll See</h3>
          <p className=&quot;text-slate-300 mb-8&quot;>
            When you trigger TokAway, the fake call screen appears instantly on their phone. It looks completely real.
          </p>

          <div className=&quot;grid md:grid-cols-2 gap-8&quot;>
            {/* Call Screen Demo */}
            <div className=&quot;bg-gradient-to-b from-blue-900/30 to-transparent rounded-3xl border border-blue-700/40 flex items-center justify-center p-8&quot;>
              <div className=&quot;text-center w-full bg-slate-900 rounded-2xl p-8 border border-blue-700/40&quot;>
                <div className=&quot;text-6xl mb-6&quot;>☎️</div>
                <p className=&quot;text-slate-400 text-sm mb-2&quot;>Incoming Call</p>
                <p className=&quot;text-3xl font-bold text-blue-400 mb-8&quot;>Mom</p>
                <div className=&quot;flex gap-4 justify-center&quot;>
                  <button 
                    onClick={() => {}}
                    className=&quot;w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center text-2xl font-bold&quot;
                  >
                    ✕
                  </button>
                  <button 
                    onClick={() => setShowSuccessState(true)}
                    className=&quot;w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 transition flex items-center justify-center text-2xl font-bold&quot;
                  >
                    ✓
                  </button>
                </div>
                <p className=&quot;text-xs text-slate-500 mt-6&quot;>Completely realistic incoming call interface</p>
              </div>
            </div>

            {/* SMS Preview */}
            <div className=&quot;space-y-4&quot;>
              <h4 className=&quot;text-lg font-bold mb-4&quot;>Emergency SMS</h4>
              {presetModes.find(m => m.id === demoMode)?.sms ? (
                <div className=&quot;bg-green-900/30 border border-green-700/40 rounded-2xl p-6&quot;>
                  <p className=&quot;text-slate-300 font-mono text-sm leading-relaxed&quot;>
                    {presetModes.find(m => m.id === demoMode)?.sms}
                  </p>
                </div>
              ) : (
                <div className=&quot;bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6&quot;>
                  <p className=&quot;text-slate-500 italic&quot;>No SOS message in this mode—just the discreet fake call.</p>
                </div>
              )}

              <h4 className=&quot;text-lg font-bold mt-6 mb-4&quot;>Activation Settings</h4>
              <div className=&quot;space-y-3 bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6&quot;>
                <div className=&quot;flex justify-between items-center&quot;>
                  <span className=&quot;text-slate-300&quot;>Safety Timer</span>
                  <span className={presetModes.find(m => m.id === demoMode)?.timer ? &apos;text-green-400 font-bold&apos; : &apos;text-slate-500&apos;}>
                    {presetModes.find(m => m.id === demoMode)?.timer ? &apos;✓ Active (10 min)&apos; : &apos;✗ Off&apos;}
                  </span>
                </div>
                <div className=&quot;flex justify-between items-center&quot;>
                  <span className=&quot;text-slate-300&quot;>GPS Activation</span>
                  <span className={presetModes.find(m => m.id === demoMode)?.gps ? &apos;text-green-400 font-bold&apos; : &apos;text-slate-500&apos;}>
                    {presetModes.find(m => m.id === demoMode)?.gps ? &apos;✓ Active&apos; : &apos;✗ Off&apos;}
                  </span>
                </div>
                <div className=&quot;flex justify-between items-center&quot;>
                  <span className=&quot;text-slate-300&quot;>Emergency Contact</span>
                  <span className=&quot;text-blue-400 font-bold&quot;>Mom (555-0123)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success State Section */}
      <section className=&quot;max-w-6xl mx-auto px-6 py-20&quot;>
        <h2 className=&quot;text-4xl font-bold mb-6 text-center&quot;>The &quot;I&apos;m Safe&quot; Confirmation</h2>
        <p className=&quot;text-center text-slate-300 mb-12 max-w-2xl mx-auto&quot;>
          As soon as they reach safety, one tap stops the timer and confirms everything is okay.
        </p>

        <div className=&quot;grid md:grid-cols-2 gap-8&quot;>
          <div className=&quot;bg-gradient-to-b from-green-900/30 to-transparent rounded-3xl border border-green-700/40 flex items-center justify-center p-8&quot;>
            <div className=&quot;text-center w-full bg-slate-900 rounded-2xl p-12 border border-green-700/40&quot;>
              <div className=&quot;text-6xl mb-6&quot;>✓</div>
              <h3 className=&quot;text-3xl font-bold text-green-400 mb-4&quot;>You&apos;re Safe</h3>
              <p className=&quot;text-slate-300 mb-8&quot;>Timer has been disabled. Your emergency contact wasn&apos;t alerted.</p>
              <button 
                onClick={() => setShowSuccessState(false)}
                className=&quot;px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 font-bold transition&quot;
              >
                Close
              </button>
              <p className=&quot;text-xs text-slate-500 mt-8&quot;>Quick confirmation that the system is standing down</p>
            </div>
          </div>

          <div className=&quot;space-y-6&quot;>
            <h4 className=&quot;text-2xl font-bold&quot;>What Happens</h4>
            <div className=&quot;space-y-4&quot;>
              <div className=&quot;bg-green-900/30 border border-green-700/40 rounded-xl p-4&quot;>
                <p className=&quot;font-bold text-green-400 mb-2&quot;>✓ Timer Stops</p>
                <p className=&quot;text-slate-300 text-sm&quot;>The 10-minute countdown is cancelled immediately.</p>
              </div>
              <div className=&quot;bg-green-900/30 border border-green-700/40 rounded-xl p-4&quot;>
                <p className=&quot;font-bold text-green-400 mb-2&quot;>✓ No Alert Sent</p>
                <p className=&quot;text-slate-300 text-sm&quot;>Emergency contact receives nothing. They won&apos;t know you needed help.</p>
              </div>
              <div className=&quot;bg-green-900/30 border border-green-700/40 rounded-xl p-4&quot;>
                <p className=&quot;font-bold text-green-400 mb-2&quot;>✓ Peace of Mind</p>
                <p className=&quot;text-slate-300 text-sm&quot;>Clear confirmation that you reached safety and the system is standing down.</p>
              </div>
              <div className=&quot;bg-blue-900/30 border border-blue-700/40 rounded-xl p-4&quot;>
                <p className=&quot;font-bold text-blue-400 mb-2&quot;>📊 History Logged</p>
                <p className=&quot;text-slate-300 text-sm&quot;>You can review all activations in your call history. Pro feature: Location history & analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Triggers Section */}
      <section className=&quot;bg-blue-900/20 border-y border-blue-800/30 py-20&quot;>
        <div className=&quot;max-w-6xl mx-auto px-6&quot;>
          <h2 className=&quot;text-4xl font-bold mb-4 text-center&quot;>The &quot;No-Look&quot; Exit</h2>
          <p className=&quot;text-center text-slate-300 mb-12 max-w-2xl mx-auto&quot;>
            In a tense moment, fumbling with your phone is a giveaway. That&apos;s why TokAway supports physical triggers.
          </p>

          <div className=&quot;grid md:grid-cols-2 gap-8&quot;>
            <div className=&quot;bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition&quot;>
              <div className=&quot;text-4xl mb-4&quot;>🔊</div>
              <h3 className=&quot;text-xl font-bold mb-3&quot;>Volume Button Trigger</h3>
              <p className=&quot;text-slate-300 mb-4&quot;>
                Press the volume up or down button 3 times rapidly while the phone is locked or in your pocket.
              </p>
              <div className=&quot;bg-slate-800/60 rounded-lg p-4 border border-slate-700/40&quot;>
                <p className=&quot;text-sm text-slate-400&quot;>
                  <strong>User Value:</strong> The system activates without unlocking your phone. No one can tell you did anything.
                </p>
              </div>
            </div>

            <div className=&quot;bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition&quot;>
              <div className=&quot;text-4xl mb-4&quot;>🔙</div>
              <h3 className=&quot;text-xl font-bold mb-3&quot;>Triple-Tap Back of Phone</h3>
              <p className=&quot;text-slate-300 mb-4&quot;>
                Tap the back of your phone 3 times in quick succession to trigger the fake call or safety timer.
              </p>
              <div className=&quot;bg-slate-800/60 rounded-lg p-4 border border-slate-700/40&quot;>
                <p className=&quot;text-sm text-slate-400&quot;>
                  <strong>User Value:</strong> Arm the system while keeping your phone in your pocket. Completely discreet.
                </p>
              </div>
            </div>
          </div>

          <div className=&quot;mt-8 bg-slate-900/80 border-2 border-blue-700/40 rounded-3xl p-8&quot;>
            <h3 className=&quot;text-2xl font-bold mb-4&quot;>How It Works</h3>
            <div className=&quot;grid md:grid-cols-3 gap-6&quot;>
              <div className=&quot;text-center&quot;>
                <div className=&quot;text-5xl mb-4&quot;>1️⃣</div>
                <p className=&quot;font-bold mb-2&quot;>Set Trigger</p>
                <p className=&quot;text-slate-300 text-sm&quot;>In Settings, choose which physical trigger you want active.</p>
              </div>
              <div className=&quot;text-center&quot;>
                <div className=&quot;text-5xl mb-4&quot;>2️⃣</div>
                <p className=&quot;font-bold mb-2&quot;>Activate Discreetly</p>
                <p className=&quot;text-slate-300 text-sm&quot;>When needed, tap the volume button or back of phone 3x rapidly.</p>
              </div>
              <div className=&quot;text-center&quot;>
                <div className=&quot;text-5xl mb-4&quot;>3️⃣</div>
                <p className=&quot;font-bold mb-2&quot;>Fake Call Appears</p>
                <p className=&quot;text-slate-300 text-sm&quot;>The call screen pops up. They see an incoming call from your preset contact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Silent Countdown Overlay Section */}
      <section className=&quot;max-w-6xl mx-auto px-6 py-20&quot;>
        <h2 className=&quot;text-4xl font-bold mb-6 text-center&quot;>Silent Countdown Overlay</h2>
        <p className=&quot;text-center text-slate-300 mb-12 max-w-2xl mx-auto&quot;>
          While the 10-minute timer is active, a discreet countdown appears on the lock screen. They can check remaining time without unlocking.
        </p>

        <div className=&quot;grid md:grid-cols-2 gap-8&quot;>
          <div className=&quot;bg-gradient-to-b from-slate-900 to-blue-900/30 rounded-3xl border border-blue-700/40 flex items-center justify-center p-8 min-h-96&quot;>
            <div className=&quot;text-center&quot;>
              <div className=&quot;text-lg text-slate-400 mb-4&quot;>Lock Screen View</div>
              <div className=&quot;text-8xl font-bold text-blue-400 mb-6 font-mono&quot;>9:47</div>
              <div className=&quot;text-slate-300 mb-8&quot;>Time Remaining</div>
              <div className=&quot;text-xs text-slate-500 bg-slate-800/60 rounded px-4 py-2 inline-block&quot;>
                TokAway Safety Timer • Check in when safe
              </div>
              <p className=&quot;text-xs text-slate-500 mt-8&quot;>Dim overlay won&apos;t drain battery or distract others</p>
            </div>
          </div>

          <div className=&quot;space-y-6&quot;>
            <h4 className=&quot;text-2xl font-bold&quot;>Key Features</h4>
            <div className=&quot;space-y-4&quot;>
              <div className=&quot;bg-blue-900/30 border border-blue-700/40 rounded-xl p-4&quot;>
                <p className=&quot;font-bold text-blue-400 mb-2&quot;>👁️ Discreet Display</p>
                <p className=&quot;text-slate-300 text-sm&quot;>Very dim countdown that doesn&apos;t attract attention. Minimal battery impact.</p>
              </div>
              <div className=&quot;bg-blue-900/30 border border-blue-700/40 rounded-xl p-4&quot;>
                <p className=&quot;font-bold text-blue-400 mb-2&quot;>⏰ Persistent Notification</p>
                <p className=&quot;text-slate-300 text-sm&quot;>They can glance at the lock screen to see how much time they have left.</p>
              </div>
              <div className=&quot;bg-blue-900/30 border border-blue-700/40 rounded-xl p-4&quot;>
                <p className=&quot;font-bold text-blue-400 mb-2&quot;>🔔 Auto-Escalation Alert</p>
                <p className=&quot;text-slate-300 text-sm&quot;>When timer hits zero, a subtle vibration prompts them before auto-alert goes out.</p>
              </div>
              <div className=&quot;bg-green-900/30 border border-green-700/40 rounded-xl p-4&quot;>
                <p className=&quot;font-bold text-green-400 mb-2&quot;>✓ One-Tap Safety</p>
                <p className=&quot;text-slate-300 text-sm&quot;>Tap the countdown to open TokAway and hit \&quot;I&apos;m Safe\&quot; to stop the timer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Use Section */}
      <section className=&quot;max-w-6xl mx-auto px-6 py-20&quot;>
        <div className=&quot;grid md:grid-cols-2 gap-8&quot;>
          <div className=&quot;bg-blue-900/30 border border-blue-700/40 rounded-2xl p-8&quot;>
            <h3 className=&quot;text-xl font-bold mb-4&quot;>When to Use TokAway</h3>
            <ul className=&quot;space-y-3 text-slate-300&quot;>
              <li>✓ Uncomfortable date or blind date situation</li>
              <li>✓ Dealing with aggressive person</li>
              <li>✓ Lost or in unfamiliar area feeling unsafe</li>
              <li>✓ Workplace or social situation turning hostile</li>
              <li>✓ Any moment you need a quick, discreet exit</li>
            </ul>
          </div>

          <div className=&quot;bg-green-900/30 border border-green-700/40 rounded-2xl p-8&quot;>
            <h3 className=&quot;text-xl font-bold mb-4&quot;>Why It Works</h3>
            <ul className=&quot;space-y-3 text-slate-300&quot;>
              <li>✓ Looks 100% real—no one suspects the call is fake</li>
              <li>✓ Automatic escalation if you don&apos;t check in</li>
              <li>✓ Emergency contact knows exactly where you are</li>
              <li>✓ Zero interaction required if you&apos;re in actual danger</li>
              <li>✓ Designed for real safety, not just convenience</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className=&quot;max-w-6xl mx-auto px-6 py-20&quot;>
        <div className=&quot;bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-700/40 rounded-3xl p-12 text-center&quot;>
          <h2 className=&quot;text-3xl font-bold mb-4&quot;>Part of the KPA Mission</h2>
          <p className=&quot;text-lg text-slate-300 max-w-3xl mx-auto mb-6&quot;>
            <span className=&quot;text-blue-400 font-bold&quot;>K</span>eep
            <span className=&quot;text-blue-400 font-bold&quot;>P</span>eople
            <span className=&quot;text-blue-400 font-bold&quot;>A</span>live
          </p>
          <p className=&quot;text-slate-400 mt-4 max-w-2xl mx-auto&quot;>
            TokAway is more than a convenience tool—it&apos;s a real safety feature designed to help people escape genuinely uncomfortable or unsafe situations. The automatic escalation ensures that even if you&apos;re too scared to act, your emergency contact knows exactly where you are within 10 minutes. Your wellbeing is our priority.
          </p>

          <div className=&quot;mt-8 bg-slate-900/60 border border-green-700/40 rounded-xl p-6 inline-block&quot;>
            <p className=&quot;text-sm text-slate-300&quot;>
              <span className=&quot;text-2xl mr-2&quot;>🆘</span>
              <strong>When it matters most:</strong> Professional help (police, friend, family) gets your exact location automatically if you can&apos;t respond.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id=&quot;pricing&quot; className=&quot;bg-blue-900/20 border-y border-blue-800/30 py-20&quot;>
        <div className=&quot;max-w-6xl mx-auto px-6&quot;>
          <h2 className=&quot;text-4xl font-bold mb-4 text-center&quot;>Simple Pricing</h2>
          <p className=&quot;text-center text-slate-300 mb-16&quot;>
            Choose the plan that fits your needs
          </p>

          <div className=&quot;grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12&quot;>
            {plans.map((plan, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPlan(idx)}
                className={`rounded-2xl p-8 border-2 transition cursor-pointer ${
                  selectedPlan === idx
                    ? &apos;border-blue-500 bg-blue-900/30&apos;
                    : &apos;border-slate-700 bg-slate-900/60 hover:border-blue-700&apos;
                }`}
              >
                <h3 className=&quot;text-2xl font-bold mb-2&quot;>{plan.name}</h3>
                <div className=&quot;mb-6&quot;>
                  <span className=&quot;text-4xl font-bold&quot;>${plan.price.toFixed(2)}</span>
                  <span className=&quot;text-slate-400 ml-2&quot;>{plan.type}</span>
                </div>
                <p className=&quot;text-sm text-slate-400 mb-4&quot;>
                  {plan.name.includes(&apos;Pro&apos;) 
                    ? &apos;Best for comprehensive safety&apos; 
                    : &apos;Perfect for essential protection&apos;}
                </p>
                <ul className=&quot;space-y-3 mb-8&quot;>
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className=&quot;flex items-center gap-3 text-slate-300&quot;>
                      <span className=&quot;text-blue-400&quot;>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowModal(true)}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    selectedPlan === idx
                      ? &apos;bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700&apos;
                      : &apos;bg-slate-700 hover:bg-slate-600&apos;
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          <p className=&quot;text-center text-slate-400 text-sm&quot;>
            All plans include lifetime access to your data. No subscriptions.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className=&quot;max-w-6xl mx-auto px-6 py-20&quot;>
        <h2 className=&quot;text-3xl font-bold mb-12 text-center&quot;>Trusted by Thousands</h2>
        <div className=&quot;grid md:grid-cols-3 gap-8&quot;>
          <div className=&quot;text-center&quot;>
            <div className=&quot;text-3xl font-bold text-blue-400 mb-2&quot;>4.8★</div>
            <p className=&quot;text-slate-300&quot;>Average Rating (298 reviews)</p>
          </div>
          <div className=&quot;text-center&quot;>
            <div className=&quot;text-3xl font-bold text-cyan-400 mb-2&quot;>12K+</div>
            <p className=&quot;text-slate-300&quot;>Downloads & Growing</p>
          </div>
          <div className=&quot;text-center&quot;>
            <div className=&quot;text-3xl font-bold text-blue-400 mb-2&quot;>100%</div>
            <p className=&quot;text-slate-300&quot;>Private & Offline</p>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className=&quot;bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-t border-blue-800/30 py-16&quot;>
        <div className=&quot;max-w-4xl mx-auto px-6 text-center&quot;>
          <h2 className=&quot;text-3xl font-bold mb-4&quot;>Ready to Get TokAway?</h2>
          <p className=&quot;text-slate-300 mb-8 max-w-2xl mx-auto&quot;>
            Download for free today. Choose your plan and start creating your escape routes.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className=&quot;px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold text-lg transition transform hover:scale-105&quot;
          >
            Download TokAway Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id=&quot;contact&quot; className=&quot;bg-slate-900 border-t border-slate-800 py-12&quot;>
        <div className=&quot;max-w-6xl mx-auto px-6&quot;>
          <div className=&quot;grid md:grid-cols-4 gap-8 mb-8&quot;>
            <div>
              <h3 className=&quot;font-bold mb-4 text-blue-400&quot;>TokAway</h3>
              <p className=&quot;text-slate-400 text-sm&quot;>Your discreet escape plan.</p>
            </div>
            <div>
              <h4 className=&quot;font-bold mb-3 text-slate-300&quot;>Product</h4>
              <ul className=&quot;space-y-2 text-slate-400 text-sm&quot;>
                <li><a href=&quot;#features&quot; className=&quot;hover:text-blue-400&quot;>Features</a></li>
                <li><a href=&quot;#pricing&quot; className=&quot;hover:text-blue-400&quot;>Pricing</a></li>
                <li><a href=&quot;/tokstore&quot; className=&quot;hover:text-blue-400&quot;>Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className=&quot;font-bold mb-3 text-slate-300&quot;>Support</h4>
              <ul className=&quot;space-y-2 text-slate-400 text-sm&quot;>
                <li><a href=&quot;mailto:support@tokaway.app&quot; className=&quot;hover:text-blue-400&quot;>Email Support</a></li>
                <li><a href=&quot;/tokaway-landing&quot; className=&quot;hover:text-blue-400&quot;>FAQ</a></li>
                <li><a href=&quot;https://tokaway.app/privacy&quot; className=&quot;hover:text-blue-400&quot;>Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className=&quot;font-bold mb-3 text-slate-300&quot;>Legal</h4>
              <ul className=&quot;space-y-2 text-slate-400 text-sm&quot;>
                <li><a href=&quot;https://tokaway.app/privacy&quot; className=&quot;hover:text-blue-400&quot;>Privacy Policy</a></li>
                <li><a href=&quot;#&quot; className=&quot;hover:text-blue-400&quot;>Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className=&quot;border-t border-slate-800 pt-8&quot;>
            <p className=&quot;text-center text-slate-400 text-sm&quot;>
              © 2026 TokAway. Part of the KPA Mission - Keep People Alive.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Call Screen Modal */}
      {showDemoCallScreen && (
        <div className=&quot;fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4&quot;>
          <div className=&quot;w-full max-w-sm&quot;>
            <div className=&quot;bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 border border-blue-700/40 shadow-2xl&quot;>
              <div className=&quot;text-center&quot;>
                <div className=&quot;text-7xl mb-8 animate-bounce&quot;>☎️</div>
                <p className=&quot;text-slate-400 text-sm uppercase tracking-wide mb-4&quot;>Incoming Call</p>
                <h2 className=&quot;text-5xl font-bold text-blue-400 mb-12&quot;>Mom</h2>
                
                <div className=&quot;space-y-6&quot;>
                  {/* Call Controls */}
                  <div className=&quot;flex gap-6 justify-center&quot;>
                    <button 
                      onClick={() => setShowDemoCallScreen(false)}
                      className=&quot;w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition flex items-center justify-center text-white text-3xl font-bold shadow-lg&quot;
                    >
                      ✕
                    </button>
                    <button 
                      onClick={() => {
                        setShowDemoCallScreen(false);
                        setShowSuccessState(false);
                      }}
                      className=&quot;w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition flex items-center justify-center text-white text-3xl font-bold shadow-lg&quot;
                    >
                      ✓
                    </button>
                  </div>

                  {/* SMS Preview */}
                  {presetModes.find(m => m.id === demoMode)?.sms && (
                    <div className=&quot;mt-8 pt-8 border-t border-slate-700&quot;>
                      <p className=&quot;text-xs text-slate-500 mb-3 uppercase&quot;>Emergency SMS Preview</p>
                      <div className=&quot;bg-green-900/40 border border-green-700/60 rounded-xl p-4&quot;>
                        <p className=&quot;text-green-300 text-sm font-mono leading-relaxed&quot;>
                          {presetModes.find(m => m.id === demoMode)?.sms}
                        </p>
                      </div>
                      <p className=&quot;text-xs text-slate-500 mt-3&quot;>
                        ⏱️ Sent after 10-minute timer expires
                      </p>
                    </div>
                  )}

                  {/* Demo Legend */}
                  <div className=&quot;mt-8 pt-8 border-t border-slate-700 text-left space-y-2 text-xs text-slate-400&quot;>
                    <p>✕ = Decline (fake call ends)</p>
                    <p>✓ = Accept & start checking in</p>
                    <p>Mode: <strong className=&quot;text-blue-400&quot;>{presetModes.find(m => m.id === demoMode)?.name}</strong></p>
                  </div>
                </div>

                <button
                  onClick={() => setShowDemoCallScreen(false)}
                  className=&quot;w-full mt-8 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold transition&quot;
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
        <div className=&quot;fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4&quot;>
          <div className=&quot;w-full max-w-sm&quot;>
            <div className=&quot;bg-gradient-to-b from-green-900/40 to-slate-900 rounded-3xl p-8 border border-green-700/60 shadow-2xl text-center&quot;>
              <div className=&quot;text-7xl mb-6 animate-pulse&quot;>✓</div>
              <h2 className=&quot;text-4xl font-bold text-green-400 mb-4&quot;>You&apos;re Safe</h2>
              <p className=&quot;text-slate-300 mb-8&quot;>
                Timer has been disabled. Your emergency contact wasn&apos;t alerted. Everything is okay.
              </p>

              <div className=&quot;space-y-4 bg-slate-800/60 rounded-xl p-6 mb-8 text-left&quot;>
                <div className=&quot;flex items-center gap-3&quot;>
                  <span className=&quot;text-green-400&quot;>✓</span>
                  <span className=&quot;text-slate-300&quot;>Timer Stopped</span>
                </div>
                <div className=&quot;flex items-center gap-3&quot;>
                  <span className=&quot;text-green-400&quot;>✓</span>
                  <span className=&quot;text-slate-300&quot;>No Alert Sent</span>
                </div>
                <div className=&quot;flex items-center gap-3&quot;>
                  <span className=&quot;text-green-400&quot;>✓</span>
                  <span className=&quot;text-slate-300&quot;>System Standing Down</span>
                </div>
              </div>

              <p className=&quot;text-slate-400 text-sm mb-6&quot;>
                The system is ready whenever you need it next. You closed the loop successfully.
              </p>

              <button
                onClick={() => setShowSuccessState(false)}
                className=&quot;w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold transition&quot;
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showModal && (
        <div className=&quot;fixed inset-0 bg-black/80 flex items-center justify-center z-50&quot;>
          <div className=&quot;bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-blue-700/40&quot;>
            <div className=&quot;flex items-center justify-between mb-6&quot;>
              <h3 className=&quot;text-2xl font-bold&quot;>Get TokAway</h3>
              <button
                onClick={() => setShowModal(false)}
                className=&quot;text-slate-400 hover:text-white text-2xl&quot;
              >
                ✕
              </button>
            </div>

            <div className=&quot;space-y-3 mb-6&quot;>
              <p className=&quot;text-slate-300&quot;>Plan: <span className=&quot;font-bold text-blue-400&quot;>{plans[selectedPlan].name}</span></p>
              <p className=&quot;text-slate-300&quot;>Price: <span className=&quot;font-bold text-2xl&quot;>${plans[selectedPlan].price.toFixed(2)}</span></p>
            </div>

            <Link
              href=&quot;/tokstore&quot;
              onClick={() => setShowModal(false)}
              className=&quot;w-full block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold transition mb-3&quot;
            >
              Go to TokStore
            </Link>

            <button
              onClick={() => setShowModal(false)}
              className=&quot;w-full px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-900/30 font-bold transition&quot;
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

