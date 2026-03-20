'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface HealthRecord {
  id: string;
  type: 'meal' | 'medicine' | 'barcode' | 'vital' | 'note';
  title: string;
  description: string;
  timestamp: Date;
  value?: string;
  photo?: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

interface HealthData {
  weight: number;
  bloodPressure: string;
  heartRate: number;
  bloodSugar: number;
  temperature: number;
  allergies: string[];
  intolerances: string[];
  spiritualBelief: string;
  emergencyContacts: EmergencyContact[];
  records: HealthRecord[];
  language: string;
  fitbitConnected: boolean;
  appleHealthConnected: boolean;
}

const LANGUAGES = [
  'English', 'Español', 'Français', 'Deutsch', 'Italiano',
  '中文', '日本語', '한국어', 'العربية', 'Português'
];

const SPIRITUAL_BELIEFS = [
  'Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist',
  'Secular', 'Agnostic', 'Atheist', 'Spiritual (Unaffiliated)', 'Prefer not to say'
];

export default function TokHealthVCC() {
  const [currentView, setCurrentView] = useState<'hub' | 'scanner' | 'health' | 'export' | 'contacts' | 'settings' | 'wisdom'>('hub');
  const [scannerType, setScannerType] = useState<'meal' | 'medicine' | 'barcode' | null>(null);

  // Voice functionality
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Camera functionality
  const [showCamera, setShowCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setScanInput(prev => (prev ? prev + ' ' + transcript : transcript));
          speakMessage(`Recorded: ${transcript}`);
        };
        
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, [voiceEnabled]);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakMessage = (text: string) => {
    if (voiceEnabled && typeof window !== 'undefined') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Use rear camera
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      speakMessage('Camera activated. Frame your item and tap Capture Photo.');
    } catch (error) {
      console.error('Camera error:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const photoData = canvasRef.current.toDataURL('image/jpeg', 0.8);
        setCapturedPhoto(photoData);
        stopCamera();
        speakMessage('Photo captured. Add description and log entry.');
      }
    }
  };

  const clearPhoto = () => {
    setCapturedPhoto(null);
    setScanInput('');
  };

  const [healthData, setHealthData] = useState<HealthData>({
    weight: 0,
    bloodPressure: '120/80',
    heartRate: 0,
    bloodSugar: 0,
    temperature: 98.6,
    allergies: [],
    intolerances: [],
    spiritualBelief: '',
    emergencyContacts: [],
    records: [],
    language: 'English',
    fitbitConnected: false,
    appleHealthConnected: false,
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newContact, setNewContact] = useState({ name: '', relationship: '', phone: '' });
  const [scanInput, setScanInput] = useState('');
  const [healthStatus, setHealthStatus] = useState<'green' | 'yellow' | 'red'>('green');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tokhealth_data');
      if (saved) setHealthData(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tokhealth_data', JSON.stringify(healthData));
    } catch (e) {}
    calculateHealthStatus();
  }, [healthData]);

  const calculateHealthStatus = () => {
    let concerns = 0;

    if (healthData.bloodPressure && healthData.bloodPressure !== '120/80') concerns++;
    if (healthData.heartRate > 100 || (healthData.heartRate > 0 && healthData.heartRate < 60)) concerns++;
    if (healthData.bloodSugar > 180 || (healthData.bloodSugar > 0 && healthData.bloodSugar < 70)) concerns++;
    if (healthData.temperature < 97 || healthData.temperature > 99.5) concerns++;
    if (healthData.allergies.length + healthData.intolerances.length > 3) concerns++;

    if (concerns === 0) setHealthStatus('green');
    else if (concerns <= 2) setHealthStatus('yellow');
    else setHealthStatus('red');
  };

  const getHealthStatusColor = (): string => {
    switch (healthStatus) {
      case 'green': return 'bg-emerald-500/20 border-emerald-400 text-emerald-100';
      case 'yellow': return 'bg-amber-500/20 border-amber-400 text-amber-100';
      case 'red': return 'bg-red-500/20 border-red-400 text-red-100';
    }
  };

  const getHealthStatusEmoji = (): string => {
    switch (healthStatus) {
      case 'green': return '✅ Excellent';
      case 'yellow': return '⚠️ Caution';
      case 'red': return '🚨 Alert';
    }
  };

  const handleScanMeal = () => {
    if (scanInput.trim() || capturedPhoto) {
      const newRecord: HealthRecord = {
        id: Date.now().toString(),
        type: 'meal',
        title: '🍽️ Meal Logged',
        description: scanInput,
        timestamp: new Date(),
        photo: capturedPhoto || undefined,
      };
      setHealthData(prev => ({
        ...prev,
        records: [newRecord, ...prev.records].slice(0, 90),
      }));
      speakMessage(`Meal logged: ${scanInput}`);
      setScanInput('');
      setCapturedPhoto(null);
    }
  };

  const handleScanMedicine = () => {
    if (scanInput.trim() || capturedPhoto) {
      const newRecord: HealthRecord = {
        id: Date.now().toString(),
        type: 'medicine',
        title: '💊 Prescription Logged',
        description: scanInput,
        timestamp: new Date(),
        photo: capturedPhoto || undefined,
      };
      setHealthData(prev => ({
        ...prev,
        records: [newRecord, ...prev.records].slice(0, 90),
      }));
      speakMessage(`Medication logged: ${scanInput}`);
      setScanInput('');
      setCapturedPhoto(null);
    }
  };

  const handleScanBarcode = () => {
    if (scanInput.trim() || capturedPhoto) {
      const newRecord: HealthRecord = {
        id: Date.now().toString(),
        type: 'barcode',
        title: '📱 Product Scanned',
        description: scanInput,
        timestamp: new Date(),
        photo: capturedPhoto || undefined,
      };
      setHealthData(prev => ({
        ...prev,
        records: [newRecord, ...prev.records].slice(0, 90),
      }));
      speakMessage(`Product scanned: ${scanInput}`);
      setScanInput('');
      setCapturedPhoto(null);
    }
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim() && !healthData.allergies.includes(newAllergy)) {
      setHealthData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy],
      }));
      setNewAllergy('');
    }
  };

  const handleAddIntolerance = (intolerance: string) => {
    if (intolerance && !healthData.intolerances.includes(intolerance)) {
      setHealthData(prev => ({
        ...prev,
        intolerances: [...prev.intolerances, intolerance],
      }));
    }
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setHealthData(prev => ({
        ...prev,
        emergencyContacts: [
          ...prev.emergencyContacts,
          { id: Date.now().toString(), ...newContact },
        ],
      }));
      setNewContact({ name: '', relationship: '', phone: '' });
    }
  };

  const generateMedicalExport = () => {
    const recentRecords = healthData.records.slice(0, 90);
    const exportText = `
╔═══════════════════════════════════════════════════════════╗
║           COMPREHENSIVE MEDICAL REPORT                   ║
║              TokHealth - KPA Keep People Alive           ║
╚═══════════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════════════
PATIENT INFORMATION
═══════════════════════════════════════════════════════════
Generated: ${new Date().toLocaleString()}
Report Period: Last 90 Days
Health Status: ${getHealthStatusEmoji()}
Language: ${healthData.language}

═══════════════════════════════════════════════════════════
VITAL SIGNS SNAPSHOT
═══════════════════════════════════════════════════════════
🫀 Heart Rate: ${healthData.heartRate || 'Not recorded'} bpm
📊 Blood Pressure: ${healthData.bloodPressure} mmHg
🩸 Blood Sugar: ${healthData.bloodSugar || 'Not recorded'} mg/dL
🌡️  Temperature: ${healthData.temperature || 'Not recorded'}°F
⚖️  Weight: ${healthData.weight || 'Not recorded'} lbs

═══════════════════════════════════════════════════════════
ALLERGIES & FOOD INTOLERANCES
═══════════════════════════════════════════════════════════
Known Allergies:
${healthData.allergies.length > 0 ? healthData.allergies.map(a => `  • ${a}`).join('\n') : '  • None recorded'}

Food Intolerances:
${healthData.intolerances.length > 0 ? healthData.intolerances.map(i => `  • ${i}`).join('\n') : '  • None recorded'}

CRITICAL: Report all allergies to healthcare providers!

═══════════════════════════════════════════════════════════
EMERGENCY CONTACTS (Keep on file)
═══════════════════════════════════════════════════════════
${healthData.emergencyContacts.length > 0 
  ? healthData.emergencyContacts.map(c => `${c.name} (${c.relationship})\nPhone: ${c.phone}`).join('\n\n')
  : 'No emergency contacts on file - PLEASE ADD'}

═══════════════════════════════════════════════════════════
PERSONAL HEALTH INFORMATION
═══════════════════════════════════════════════════════════
Spiritual/Personal Belief: ${healthData.spiritualBelief || 'Not specified'}
Fitbit+ Connected: ${healthData.fitbitConnected ? 'Yes' : 'No'}
Apple Health Connected: ${healthData.appleHealthConnected ? 'Yes' : 'No'}

═══════════════════════════════════════════════════════════
90-DAY HEALTH ACTIVITY LOG (${recentRecords.length} entries)
═══════════════════════════════════════════════════════════
${recentRecords.length > 0
  ? recentRecords.map(r => `[${new Date(r.timestamp).toLocaleDateString()}] ${r.title}\n   ${r.description}`).join('\n\n')
  : 'No health records available'
}

═══════════════════════════════════════════════════════════
IMPORTANT DISCLAIMERS
═══════════════════════════════════════════════════════════
⚠️  This report contains self-recorded health data
⚠️  Data should be reviewed by a licensed physician
⚠️  Emergency: Call 911 for life-threatening situations
⚠️  Do not delay medical attention for urgent conditions

═══════════════════════════════════════════════════════════
Prepared by: TokHealth by Sanders Viopro Labs
Mission: KPA - Keep People Alive
Report: CONFIDENTIAL MEDICAL INFORMATION
═══════════════════════════════════════════════════════════
    `;

    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TokHealth-Medical-Report-${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeAllergy = (allergy: string) => {
    setHealthData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy),
    }));
  };

  const removeIntolerance = (intolerance: string) => {
    setHealthData(prev => ({
      ...prev,
      intolerances: prev.intolerances.filter(i => i !== intolerance),
    }));
  };

  const removeContact = (id: string) => {
    setHealthData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter(c => c.id !== id),
    }));
  };

  // ===== HUB VIEW =====
  if (currentView === 'hub') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
        {/* Header */}
        <nav className="bg-slate-800/50 backdrop-blur border-b border-emerald-500/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl">💚</div>
              <h1 className="text-3xl font-bold text-emerald-400">TokHealth v2</h1>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${getHealthStatusColor()}`}>
                {getHealthStatusEmoji()}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`px-3 py-2 rounded-lg text-sm font-bold transition ${
                  voiceEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
                title="Toggle text-to-speech"
              >
                {voiceEnabled ? '🔊' : '🔇'}
              </button>
              {isSpeaking && (
                <span className="text-xs text-emerald-300 font-semibold animate-pulse">
                  🔊 Speaking...
                </span>
              )}
              <select 
                value={healthData.language}
                onChange={(e) => setHealthData(prev => ({ ...prev, language: e.target.value }))}
                className="px-3 py-2 rounded-lg text-sm bg-slate-700 text-white border border-emerald-500/30"
              >
                {LANGUAGES.map(lang => <option key={lang}>{lang}</option>)}
              </select>
              <Link href="/vcc-hub" className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition">
                ← Hub
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Status Card */}
          <div className={`mb-8 p-6 rounded-lg border-2 ${getHealthStatusColor()}`}>
            <h2 className="text-2xl font-bold mb-2">Your Health Status: {getHealthStatusEmoji()}</h2>
            <p className="text-sm opacity-80">Comprehensive health tracking with medical export ready for doctors</p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Meal Scanner */}
            <button
              onClick={() => { setCurrentView('scanner'); setScannerType('meal'); }}
              className="p-6 rounded-lg border-2 border-blue-500 bg-slate-800 hover:bg-slate-700 hover:border-blue-400 transition text-left"
            >
              <div className="text-4xl mb-3">🍽️</div>
              <h3 className="font-bold text-blue-300 text-lg">Meal Scanner</h3>
              <p className="text-sm text-slate-400">Log meals & nutrition</p>
            </button>

            {/* Prescription */}
            <button
              onClick={() => { setCurrentView('scanner'); setScannerType('medicine'); }}
              className="p-6 rounded-lg border-2 border-purple-500 bg-slate-800 hover:bg-slate-700 hover:border-purple-400 transition text-left"
            >
              <div className="text-4xl mb-3">💊</div>
              <h3 className="font-bold text-purple-300 text-lg">Prescription</h3>
              <p className="text-sm text-slate-400">Track medications</p>
            </button>

            {/* Barcode */}
            <button
              onClick={() => { setCurrentView('scanner'); setScannerType('barcode'); }}
              className="p-6 rounded-lg border-2 border-orange-500 bg-slate-800 hover:bg-slate-700 hover:border-orange-400 transition text-left"
            >
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-orange-300 text-lg">Barcode Scan</h3>
              <p className="text-sm text-slate-400">Scan products</p>
            </button>

            {/* Health Vitals */}
            <button
              onClick={() => setCurrentView('health')}
              className="p-6 rounded-lg border-2 border-emerald-500 bg-slate-800 hover:bg-slate-700 hover:border-emerald-400 transition text-left"
            >
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-emerald-300 text-lg">Vitals & Health</h3>
              <p className="text-sm text-slate-400">Track health metrics</p>
            </button>

            {/* Emergency */}
            <button
              onClick={() => setCurrentView('contacts')}
              className="p-6 rounded-lg border-2 border-red-500 bg-slate-800 hover:bg-slate-700 hover:border-red-400 transition text-left"
            >
              <div className="text-4xl mb-3">🆘</div>
              <h3 className="font-bold text-red-300 text-lg">Emergency</h3>
              <p className="text-sm text-slate-400">Emergency contacts</p>
            </button>

            {/* Medical Export */}
            <button
              onClick={() => setCurrentView('export')}
              className="p-6 rounded-lg border-2 border-yellow-500 bg-slate-800 hover:bg-slate-700 hover:border-yellow-400 transition text-left"
            >
              <div className="text-4xl mb-3">📄</div>
              <h3 className="font-bold text-yellow-300 text-lg">Medical Export</h3>
              <p className="text-sm text-slate-400">90-day report for doctors</p>
            </button>

            {/* AI Coach - Wisdom */}
            <button
              onClick={() => setCurrentView('wisdom')}
              className="p-6 rounded-lg border-2 border-teal-500 bg-slate-800 hover:bg-slate-700 hover:border-teal-400 transition text-left"
            >
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold text-teal-300 text-lg">Wisdom AI Coach</h3>
              <p className="text-sm text-slate-400">Health guidance & support</p>
            </button>
          </div>

          {/* Settings Button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentView('settings')}
              className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              ⚙️ Settings & Preferences
            </button>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 p-6 rounded-lg bg-slate-800/50 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-white">📋 Recent Health Activity</h3>
            {healthData.records.length === 0 ? (
              <p className="text-slate-400">No health records yet. Start scanning and logging!</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {healthData.records.slice(0, 15).map(record => (
                  <div key={record.id} className="p-3 rounded bg-slate-700 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-emerald-300">{record.title}</span>
                      <span className="text-slate-400">{new Date(record.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-300">{record.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== SCANNER VIEW =====
  if (currentView === 'scanner') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => {
              setCurrentView('hub');
              stopCamera();
            }}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back
          </button>

          <div className="p-8 rounded-lg bg-slate-800 border border-slate-700">
            <h2 className="text-3xl font-bold mb-2 text-white">
              {scannerType === 'meal' && '🍽️ Meal Scanner'}
              {scannerType === 'medicine' && '💊 Prescription Scanner'}
              {scannerType === 'barcode' && '📱 Barcode Scanner'}
            </h2>

            <p className="mb-6 text-slate-400 text-sm">
              {scannerType === 'meal' && 'Take a photo of your meal or type description'}
              {scannerType === 'medicine' && 'Take a photo of your prescription label or type details'}
              {scannerType === 'barcode' && 'Take a photo of the barcode or type product info'}
            </p>

            {/* Camera Active View */}
            {cameraActive && showCamera ? (
              <div className="mb-6 space-y-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg border-2 border-emerald-500"
                />
                <div className="flex gap-3">
                  <button
                    onClick={capturePhoto}
                    className="flex-1 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition"
                  >
                    📸 Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
                  >
                    ✕ Cancel
                  </button>
                </div>
              </div>
            ) : null}

            {/* Photo Preview */}
            {capturedPhoto && (
              <div className="mb-6">
                <div className="relative rounded-lg overflow-hidden border-2 border-emerald-500">
                  <img src={capturedPhoto} alt="Captured" className="w-full h-64 object-cover" />
                  <button
                    onClick={clearPhoto}
                    className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold"
                  >
                    ✕ Clear
                  </button>
                </div>
                <p className="text-sm text-emerald-300 mt-2">Photo captured - add description below</p>
              </div>
            )}

            {/* Text Input */}
            <textarea
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder={
                scannerType === 'meal' ? 'e.g., Grilled chicken with broccoli and brown rice' :
                scannerType === 'medicine' ? 'e.g., Metformin 500mg, 2x daily' :
                'e.g., Product name, barcode, or details'
              }
              className="w-full h-32 p-4 rounded-lg bg-slate-700 border border-slate-600 text-white mb-4 focus:border-emerald-500"
            />

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
              <button
                onClick={() => {
                  setShowCamera(true);
                  if (!cameraActive) {
                    startCamera();
                  }
                }}
                disabled={cameraActive}
                className="px-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-50 text-xs sm:text-sm whitespace-nowrap"
              >
                📷 Photo
              </button>
              <button
                onClick={
                  scannerType === 'meal' ? handleScanMeal :
                  scannerType === 'medicine' ? handleScanMedicine :
                  handleScanBarcode
                }
                disabled={!scanInput.trim() && !capturedPhoto}
                className="px-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition disabled:opacity-50 text-xs sm:text-sm whitespace-nowrap"
              >
                ✅ Log
              </button>
              <button
                onClick={startListening}
                disabled={isListening || cameraActive}
                className={`px-2 py-3 rounded-lg font-bold transition text-xs sm:text-sm whitespace-nowrap ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : cameraActive
                    ? 'bg-slate-600 text-slate-400'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {isListening ? '🎤...' : '🎤 Voice'}
              </button>
            </div>

            {isListening && (
              <div className="text-center text-emerald-300 text-sm font-semibold">
                Listening for your input...
              </div>
            )}
          </div>
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    );
  }

  // ===== HEALTH VIEW =====
  if (currentView === 'health') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentView('hub')}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back
          </button>

          <div className="space-y-6">
            {/* Vitals */}
            <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-white">📊 Vital Signs</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">⚖️ Weight (lbs)</label>
                  <input
                    type="number"
                    value={healthData.weight || ''}
                    onChange={(e) => setHealthData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">🫀 Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={healthData.heartRate || ''}
                    onChange={(e) => setHealthData(prev => ({ ...prev, heartRate: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">📊 Blood Pressure</label>
                  <input
                    type="text"
                    value={healthData.bloodPressure}
                    onChange={(e) => setHealthData(prev => ({ ...prev, bloodPressure: e.target.value }))}
                    placeholder="120/80"
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">🩸 Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    value={healthData.bloodSugar || ''}
                    onChange={(e) => setHealthData(prev => ({ ...prev, bloodSugar: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">🌡️ Temperature (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={healthData.temperature || ''}
                    onChange={(e) => setHealthData(prev => ({ ...prev, temperature: parseFloat(e.target.value) || 98.6 }))}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Allergies & Intolerances */}
            <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 text-red-400">🚨 Allergies & Food Intolerances</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Add Allergy</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="e.g., Peanuts, Shellfish, Penicillin"
                    className="flex-1 p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAllergy()}
                  />
                  <button
                    onClick={handleAddAllergy}
                    className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
                  >
                    Add
                  </button>
                </div>
              </div>

              {healthData.allergies.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-2">Recorded Allergies:</p>
                  <div className="flex flex-wrap gap-2">
                    {healthData.allergies.map(allergy => (
                      <button
                        key={allergy}
                        onClick={() => removeAllergy(allergy)}
                        className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm transition"
                      >
                        {allergy} ×
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Food Intolerances</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Dairy', 'Gluten', 'Nuts', 'Soy', 'Eggs', 'Shellfish', 'Sesame', 'Corn', 'Caffeine', 'Spicy'].map(item => (
                    <button
                      key={item}
                      onClick={() => {
                        if (healthData.intolerances.includes(item)) {
                          removeIntolerance(item);
                        } else {
                          handleAddIntolerance(item);
                        }
                      }}
                      className={`p-2 rounded-lg text-sm font-semibold transition ${
                        healthData.intolerances.includes(item)
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spiritual Belief */}
            <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 text-white">🙏 Spiritual/Personal Belief</h3>
              <select
                value={healthData.spiritualBelief}
                onChange={(e) => setHealthData(prev => ({ ...prev, spiritualBelief: e.target.value }))}
                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
              >
                <option value="">Select a belief...</option>
                {SPIRITUAL_BELIEFS.map(belief => <option key={belief}>{belief}</option>)}
              </select>
            </div>

            {/* Health Integrations */}
            <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 text-white">🔗 Health Integrations</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setHealthData(prev => ({ ...prev, fitbitConnected: !prev.fitbitConnected }))}
                  className={`w-full p-4 rounded-lg text-left font-semibold transition ${
                    healthData.fitbitConnected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {healthData.fitbitConnected ? '✓' : '◯'} Fitbit+ Connected
                </button>
                <button
                  onClick={() => setHealthData(prev => ({ ...prev, appleHealthConnected: !prev.appleHealthConnected }))}
                  className={`w-full p-4 rounded-lg text-left font-semibold transition ${
                    healthData.appleHealthConnected
                      ? 'bg-gray-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {healthData.appleHealthConnected ? '✓' : '◯'} Apple Health Connected
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== CONTACTS VIEW =====
  if (currentView === 'contacts') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentView('hub')}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back
          </button>

          <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
            <h2 className="text-3xl font-bold mb-6 text-red-400">🆘 Emergency Contacts</h2>

            <div className="space-y-4 mb-8 p-6 rounded-lg bg-slate-700/50">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Mom, Emergency Doctor"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Relationship</label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                  placeholder="e.g., Mother, Spouse, Doctor"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500"
                />
              </div>
              <button
                onClick={handleAddContact}
                className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
              >
                ➕ Add Contact
              </button>
            </div>

            <div className="space-y-4">
              {healthData.emergencyContacts.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No emergency contacts added yet. Add one now!</p>
              ) : (
                healthData.emergencyContacts.map(contact => (
                  <div key={contact.id} className="p-4 rounded-lg bg-slate-700 border border-red-500/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-red-300 text-lg">{contact.name}</h3>
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
      </div>
    );
  }

  // ===== EXPORT VIEW =====
  if (currentView === 'export') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button 
            onClick={() => setCurrentView('hub')}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back
          </button>

          <div className="p-8 rounded-lg bg-slate-800 border border-slate-700 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">📄 Medical Export for Doctor</h2>
            <p className="mb-6 text-slate-400 text-lg">
              Generate a comprehensive 90-day health report with all your medical data to share with your healthcare provider
            </p>
            
            <div className="mb-8 space-y-2 text-left p-6 rounded-lg bg-slate-700/50">
              <p className="text-sm font-semibold text-emerald-300">✅ Report Includes:</p>
              <ul className="text-sm text-slate-300 space-y-1 ml-4">
                <li>• All vital signs recorded</li>
                <li>• Complete allergy and intolerance information</li>
                <li>• All medications and prescriptions</li>
                <li>• 90 days of health activity log</li>
                <li>• Meal and nutrition records</li>
                <li>• Emergency contact information</li>
                <li>• Fitbit/Apple Health status</li>
                <li>• Overall health status summary</li>
              </ul>
            </div>

            <button
              onClick={generateMedicalExport}
              className="w-full px-12 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition"
            >
              📥 Download Medical Report
            </button>

            <p className="mt-6 text-xs text-slate-500">
              This report is confidential medical information. Share only with licensed healthcare providers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== WISDOM AI COACH VIEW =====
  if (currentView === 'wisdom') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => setCurrentView('hub')}
            className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Back to Hub
          </button>

          <div className="p-8 rounded-lg bg-slate-800 border border-teal-700">
            <h1 className="text-4xl font-bold mb-2 text-white flex items-center gap-3">
              ✨ Wisdom - Your AI Health Coach
            </h1>
            <p className="text-slate-400 mb-6">Created by Jerome Sanders - Co-host on Facebook Live</p>
            
            <div className="bg-teal-900 bg-opacity-30 border border-teal-700 rounded-lg p-6 mb-6 text-center">
              <p className="text-teal-200 text-lg font-semibold">
                Ready to chat with Wisdom? Click below to start a conversation about your health journey.
              </p>
            </div>

            <Link 
              href="/agent/wisdom"
              className="w-full block px-6 py-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-center transition text-lg"
            >
              💬 Open Wisdom Chat
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default: return to hub
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
      <button
        onClick={() => setCurrentView('hub')}
        className="px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg"
      >
        Return to Hub
      </button>
    </div>
  );
}
