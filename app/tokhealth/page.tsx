'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  DEFAULT_SITE_LANGUAGE,
  getSiteLanguageLabel,
  resolveSiteLanguage,
  SITE_LANGUAGES,
  SITE_LANGUAGE_STORAGE_KEY,
} from '@/lib/site-language';
import { useSiteCopy, useSiteLanguage } from '@/app/components/SiteLanguageControl';
import { getSiteCopy } from '@/lib/site-copy';

// Type definition for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

// Extend Window interface for non-standard browser APIs
declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
    SpeechRecognition?: new () => SpeechRecognition;
  }
}

interface HealthRecord {
  id: string;
  type: 'meal' | 'medicine' | 'barcode' | 'vital' | 'note';
  title: string;
  description: string;
  timestamp: Date;
  value?: string;
  photo?: string;
}

interface MealAnalysis {
  mealName: string;
  estimatedCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  sodiumMg: number;
  hydrationNote: string;
  wellnessTakeaway: string;
  caution: string;
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

export default function TokHealthVCC() {
  const copy = useSiteCopy();
  const { setLanguage } = useSiteLanguage();
  const englishCopy = getSiteCopy('en');
  const spiritualBeliefOptions = englishCopy.tokhealth.belief.options.map((value, index) => ({
    value,
    label: copy.tokhealth.belief.options[index] ?? value,
  }));
  const intoleranceOptions = englishCopy.tokhealth.allergies.intoleranceOptions.map((value, index) => ({
    value,
    label: copy.tokhealth.allergies.intoleranceOptions[index] ?? value,
  }));
  // State declarations (all at top)
  const [currentView, setCurrentView] = useState<'hub' | 'scanner' | 'health' | 'export' | 'contacts' | 'settings' | 'wisdom'>('hub');
  const [scannerType, setScannerType] = useState<'meal' | 'medicine' | 'barcode' | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [scanInput, setScanInput] = useState('');
  const [mealScanLoading, setMealScanLoading] = useState(false);
  const [mealScanError, setMealScanError] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newContact, setNewContact] = useState({ name: '', relationship: '', phone: '' });
  const [healthData, setHealthData] = useState<HealthData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tokhealth_data');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return {
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
      language: getSiteLanguageLabel(
        typeof window !== 'undefined'
          ? resolveSiteLanguage(window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY))
          : DEFAULT_SITE_LANGUAGE,
      ),
      fitbitConnected: false,
      appleHealthConnected: false,
    };
  });

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Function declarations (before useEffect)
  const speakMessage = useCallback((text: string) => {
    if (voiceEnabled && typeof window !== 'undefined') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = document.documentElement.lang || 'en';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [voiceEnabled]);

  // Derive health status from health data (no setState needed)
  const healthStatus = useMemo(() => {
    let concerns = 0;
    if (healthData.bloodPressure && healthData.bloodPressure !== '120/80') concerns++;
    if (healthData.heartRate > 100 || (healthData.heartRate > 0 && healthData.heartRate < 60)) concerns++;
    if (healthData.bloodSugar > 180 || (healthData.bloodSugar > 0 && healthData.bloodSugar < 70)) concerns++;
    if (healthData.temperature < 97 || healthData.temperature > 99.5) concerns++;
    if (healthData.allergies.length + healthData.intolerances.length > 3) concerns++;

    if (concerns === 0) return 'green';
    else if (concerns <= 2) return 'yellow';
    else return 'red';
  }, [healthData]);

  // Effects
  useEffect(() => {
    try {
      localStorage.setItem('tokhealth_data', JSON.stringify(healthData));
    } catch {
      // ignore
    }
  }, [healthData]);

  useEffect(() => {
    const currentSiteLanguage = resolveSiteLanguage(localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY));
    const currentSiteLanguageLabel = getSiteLanguageLabel(currentSiteLanguage);

    setHealthData((prev) => (
      prev.language === currentSiteLanguageLabel
        ? prev
        : { ...prev, language: currentSiteLanguageLabel }
    ));

    const syncLanguage = (event: StorageEvent) => {
      if (event.key !== SITE_LANGUAGE_STORAGE_KEY) {
        return;
      }

      const nextLanguage = resolveSiteLanguage(event.newValue);
      setHealthData((prev) => ({ ...prev, language: getSiteLanguageLabel(nextLanguage) }));
    };

    window.addEventListener('storage', syncLanguage);

    return () => window.removeEventListener('storage', syncLanguage);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionConstructor = (
        window.webkitSpeechRecognition || 
        window.SpeechRecognition
      ) as (new () => SpeechRecognition) | undefined;
      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = `${document.documentElement.lang || 'en'}-${(document.documentElement.lang || 'en').toUpperCase()}`;
        
        recognitionRef.current.onresult = (event: Event) => {
          const speechEvent = event as unknown as { results: Array<{ [key: number]: { transcript: string } }> };
          const transcript = speechEvent.results[0][0].transcript;
          setScanInput(prev => (prev ? prev + ' ' + transcript : transcript));
          speakMessage(`Recorded: ${transcript}`);
        };
        
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, [voiceEnabled, speakMessage]);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
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

  const getHealthStatusColor = (): string => {
    switch (healthStatus as 'green' | 'yellow' | 'red') {
      case 'green': return 'bg-emerald-500/20 border-emerald-400 text-emerald-100';
      case 'yellow': return 'bg-amber-500/20 border-amber-400 text-amber-100';
      case 'red': return 'bg-red-500/20 border-red-400 text-red-100';
    }
  };

  const getHealthStatusEmoji = (): string => {
    switch (healthStatus as 'green' | 'yellow' | 'red') {
      case 'green': return `✅ ${copy.tokhealth.statuses.green}`;
      case 'yellow': return `⚠️ ${copy.tokhealth.statuses.yellow}`;
      case 'red': return `🚨 ${copy.tokhealth.statuses.red}`;
    }
  };

  const formatMealAnalysis = (analysis: MealAnalysis, originalInput: string) => {
    const detailLines = [
      `${analysis.estimatedCalories} cal`,
      `${analysis.proteinGrams}g protein`,
      `${analysis.carbsGrams}g carbs`,
      `${analysis.fatGrams}g fat`,
      `${analysis.fiberGrams}g fiber`,
      `${analysis.sodiumMg}mg sodium`,
    ];

    return [
      `Estimate: ${detailLines.join(' | ')}`,
      `Hydration: ${analysis.hydrationNote}`,
      `Takeaway: ${analysis.wellnessTakeaway}`,
      `Caution: ${analysis.caution}`,
      originalInput ? `Original note: ${originalInput}` : '',
    ].filter(Boolean).join('\n');
  };

  const handleScanMeal = async () => {
    if (!scanInput.trim() && !capturedPhoto) {
      return;
    }

    setMealScanLoading(true);
    setMealScanError('');

    try {
      const response = await fetch('/api/tokhealth/meal-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: scanInput,
          photoData: capturedPhoto,
          allergies: healthData.allergies,
          intolerances: healthData.intolerances,
        }),
      });

      if (!response.ok) {
        throw new Error(`Meal scan failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!data?.analysis) {
        throw new Error('No meal analysis returned.');
      }

      const analysis = data.analysis as MealAnalysis;
      const newRecord: HealthRecord = {
        id: Date.now().toString(),
        type: 'meal',
        title: `🍽️ ${analysis.mealName || 'Meal Analysis'}`,
        description: formatMealAnalysis(analysis, scanInput),
        timestamp: new Date(),
        value: `${analysis.estimatedCalories || 0} cal`,
        photo: capturedPhoto || undefined,
      };

      setHealthData(prev => ({
        ...prev,
        records: [newRecord, ...prev.records].slice(0, 90),
      }));
      speakMessage(`Meal analyzed. Estimated ${analysis.estimatedCalories || 0} calories.`);
      setScanInput('');
      setCapturedPhoto(null);
    } catch (error) {
      console.error('Meal scan error:', error);
      setMealScanError(error instanceof Error ? error.message : 'Meal analysis failed.');
    } finally {
      setMealScanLoading(false);
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
║           ${copy.tokhealth.export.report.comprehensiveTitle.padEnd(33, ' ')}║
║              ${copy.tokhealth.export.report.subtitle.padEnd(35, ' ')}║
╚═══════════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.patientInformation}
═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.generated}: ${new Date().toLocaleString()}
${copy.tokhealth.export.report.period}: ${copy.tokhealth.export.report.periodValue}
${copy.tokhealth.export.report.healthStatus}: ${getHealthStatusEmoji()}
${copy.tokhealth.export.report.language}: ${healthData.language}

═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.vitalSnapshot}
═══════════════════════════════════════════════════════════
🫀 ${copy.tokhealth.vitals.heartRate}: ${healthData.heartRate || copy.tokhealth.export.report.noneRecorded}
📊 ${copy.tokhealth.vitals.bloodPressure}: ${healthData.bloodPressure} mmHg
🩸 ${copy.tokhealth.vitals.bloodSugar}: ${healthData.bloodSugar || copy.tokhealth.export.report.noneRecorded}
🌡️  ${copy.tokhealth.vitals.temperature}: ${healthData.temperature || copy.tokhealth.export.report.noneRecorded}
⚖️  ${copy.tokhealth.vitals.weight}: ${healthData.weight || copy.tokhealth.export.report.noneRecorded}

═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.allergiesTitle}
═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.knownAllergies}:
${healthData.allergies.length > 0 ? healthData.allergies.map(a => `  • ${a}`).join('\n') : `  • ${copy.tokhealth.export.report.noneRecorded}`}

${copy.tokhealth.export.report.foodIntolerances}:
${healthData.intolerances.length > 0 ? healthData.intolerances.map(i => `  • ${i}`).join('\n') : `  • ${copy.tokhealth.export.report.noneRecorded}`}

${copy.tokhealth.export.report.criticalNotice}

═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.emergencyContacts}
═══════════════════════════════════════════════════════════
${healthData.emergencyContacts.length > 0 
  ? healthData.emergencyContacts.map(c => `${c.name} (${c.relationship})\nPhone: ${c.phone}`).join('\n\n')
  : copy.tokhealth.export.report.noContacts}

═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.personalHealthInformation}
═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.spiritualBelief}: ${healthData.spiritualBelief || copy.common.notSpecified}
${copy.tokhealth.export.report.fitbit}: ${healthData.fitbitConnected ? copy.common.yes : copy.common.no}
${copy.tokhealth.export.report.apple}: ${healthData.appleHealthConnected ? copy.common.yes : copy.common.no}

═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.activityLog} (${recentRecords.length} entries)
═══════════════════════════════════════════════════════════
${recentRecords.length > 0
  ? recentRecords.map(r => `[${new Date(r.timestamp).toLocaleDateString()}] ${r.title}\n   ${r.description}`).join('\n\n')
  : copy.tokhealth.export.report.noRecords
}

═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.disclaimersTitle}
═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.disclaimers.map((item) => `⚠️  ${item}`).join('\n')}

═══════════════════════════════════════════════════════════
${copy.tokhealth.export.report.preparedBy}: ${copy.tokhealth.export.report.preparedByValue}
${copy.tokhealth.export.report.mission}: ${copy.tokhealth.export.report.missionValue}
${copy.tokhealth.export.report.confidentialLabel}: ${copy.tokhealth.export.report.confidentialValue}
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
              <h1 className="text-3xl font-bold text-emerald-400">{copy.tokhealth.title}</h1>
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
                title={copy.tokhealth.toggleTts}
              >
                {voiceEnabled ? '🔊' : '🔇'}
              </button>
              {isSpeaking && (
                <span className="text-xs text-emerald-300 font-semibold animate-pulse">
                  🔊 {copy.common.speaking}
                </span>
              )}
              <select 
                aria-label="Select language"
                value={healthData.language}
                onChange={(e) => {
                  const nextLanguage = SITE_LANGUAGES.find((language) => language.label === e.target.value)?.code;
                  if (!nextLanguage) {
                    return;
                  }

                  setLanguage(nextLanguage);
                  setHealthData(prev => ({ ...prev, language: e.target.value }));
                }}
                className="px-3 py-2 rounded-lg text-sm bg-slate-700 text-white border border-emerald-500/30"
              >
                {SITE_LANGUAGES.map((language) => (
                  <option key={language.code}>{language.label}</option>
                ))}
              </select>
              <Link href="/vcc-hub" className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition">
                ← {copy.common.hub}
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Status Card */}
          <div className={`mb-8 p-6 rounded-lg border-2 ${getHealthStatusColor()}`}>
            <h2 className="text-2xl font-bold mb-2">{copy.tokhealth.statusLabel}: {getHealthStatusEmoji()}</h2>
            <p className="text-sm opacity-80">{copy.tokhealth.statusDescription}</p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Meal Scanner */}
            <button
              onClick={() => { setCurrentView('scanner'); setScannerType('meal'); }}
              className="p-6 rounded-lg border-2 border-blue-500 bg-slate-800 hover:bg-slate-700 hover:border-blue-400 transition text-left"
            >
              <div className="text-4xl mb-3">🍽️</div>
              <h3 className="font-bold text-blue-300 text-lg">{copy.tokhealth.cards.meal[0]}</h3>
              <p className="text-sm text-slate-400">{copy.tokhealth.cards.meal[1]}</p>
            </button>

            {/* Prescription */}
            <button
              onClick={() => { setCurrentView('scanner'); setScannerType('medicine'); }}
              className="p-6 rounded-lg border-2 border-purple-500 bg-slate-800 hover:bg-slate-700 hover:border-purple-400 transition text-left"
            >
              <div className="text-4xl mb-3">💊</div>
              <h3 className="font-bold text-purple-300 text-lg">{copy.tokhealth.cards.medicine[0]}</h3>
              <p className="text-sm text-slate-400">{copy.tokhealth.cards.medicine[1]}</p>
            </button>

            {/* Barcode */}
            <button
              onClick={() => { setCurrentView('scanner'); setScannerType('barcode'); }}
              className="p-6 rounded-lg border-2 border-orange-500 bg-slate-800 hover:bg-slate-700 hover:border-orange-400 transition text-left"
            >
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-orange-300 text-lg">{copy.tokhealth.cards.barcode[0]}</h3>
              <p className="text-sm text-slate-400">{copy.tokhealth.cards.barcode[1]}</p>
            </button>

            {/* Health Vitals */}
            <button
              onClick={() => setCurrentView('health')}
              className="p-6 rounded-lg border-2 border-emerald-500 bg-slate-800 hover:bg-slate-700 hover:border-emerald-400 transition text-left"
            >
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-emerald-300 text-lg">{copy.tokhealth.cards.health[0]}</h3>
              <p className="text-sm text-slate-400">{copy.tokhealth.cards.health[1]}</p>
            </button>

            {/* Emergency */}
            <button
              onClick={() => setCurrentView('contacts')}
              className="p-6 rounded-lg border-2 border-red-500 bg-slate-800 hover:bg-slate-700 hover:border-red-400 transition text-left"
            >
              <div className="text-4xl mb-3">🆘</div>
              <h3 className="font-bold text-red-300 text-lg">{copy.tokhealth.cards.contacts[0]}</h3>
              <p className="text-sm text-slate-400">{copy.tokhealth.cards.contacts[1]}</p>
            </button>

            {/* Medical Export */}
            <button
              onClick={() => setCurrentView('export')}
              className="p-6 rounded-lg border-2 border-yellow-500 bg-slate-800 hover:bg-slate-700 hover:border-yellow-400 transition text-left"
            >
              <div className="text-4xl mb-3">📄</div>
              <h3 className="font-bold text-yellow-300 text-lg">{copy.tokhealth.cards.export[0]}</h3>
              <p className="text-sm text-slate-400">{copy.tokhealth.cards.export[1]}</p>
            </button>

            {/* AI Coach - Wisdom */}
            <button
              onClick={() => setCurrentView('wisdom')}
              className="p-6 rounded-lg border-2 border-teal-500 bg-slate-800 hover:bg-slate-700 hover:border-teal-400 transition text-left"
            >
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold text-teal-300 text-lg">{copy.tokhealth.cards.wisdom[0]}</h3>
              <p className="text-sm text-slate-400">{copy.tokhealth.cards.wisdom[1]}</p>
            </button>
          </div>

          {/* Settings Button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentView('settings')}
              className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              ⚙️ {copy.tokhealth.settings}
            </button>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 p-6 rounded-lg bg-slate-800/50 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-white">📋 {copy.tokhealth.recentActivity}</h3>
            {healthData.records.length === 0 ? (
              <p className="text-slate-400">{copy.tokhealth.noRecords}</p>
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
            ← {copy.common.back}
          </button>

          <div className="p-8 rounded-lg bg-slate-800 border border-slate-700">
            <h2 className="text-3xl font-bold mb-2 text-white">
              {scannerType === 'meal' && `🍽️ ${copy.tokhealth.scanner.mealTitle}`}
              {scannerType === 'medicine' && `💊 ${copy.tokhealth.scanner.medicineTitle}`}
              {scannerType === 'barcode' && `📱 ${copy.tokhealth.scanner.barcodeTitle}`}
            </h2>

            <p className="mb-6 text-slate-400 text-sm">
              {scannerType === 'meal' && copy.tokhealth.scanner.mealIntro}
              {scannerType === 'medicine' && copy.tokhealth.scanner.medicineIntro}
              {scannerType === 'barcode' && copy.tokhealth.scanner.barcodeIntro}
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
                    📸 {copy.tokhealth.scanner.capture}
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
                  >
                    ✕ {copy.tokhealth.scanner.cancel}
                  </button>
                </div>
              </div>
            ) : null}

            {/* Photo Preview */}
            {capturedPhoto && (
              <div className="mb-6">
                <div className="relative rounded-lg overflow-hidden border-2 border-emerald-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={capturedPhoto} alt="Captured" className="w-full h-64 object-cover" />
                  <button
                    onClick={clearPhoto}
                    className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold"
                  >
                    ✕ {copy.tokhealth.scanner.clear}
                  </button>
                </div>
                <p className="text-sm text-emerald-300 mt-2">{copy.tokhealth.scanner.photoCaptured}</p>
              </div>
            )}

            {/* Text Input */}
            <textarea
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder={
                scannerType === 'meal' ? copy.tokhealth.scanner.mealPlaceholder :
                scannerType === 'medicine' ? copy.tokhealth.scanner.medicinePlaceholder :
                copy.tokhealth.scanner.barcodePlaceholder
              }
              className="w-full h-32 p-4 rounded-lg bg-slate-700 border border-slate-600 text-white mb-4 focus:border-emerald-500"
            />

            {scannerType === 'meal' && mealScanError ? (
              <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {mealScanError}
              </div>
            ) : null}

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
                📷 {copy.tokhealth.scanner.photo}
              </button>
              <button
                onClick={
                  scannerType === 'meal' ? handleScanMeal :
                  scannerType === 'medicine' ? handleScanMedicine :
                  handleScanBarcode
                }
                disabled={(!scanInput.trim() && !capturedPhoto) || (scannerType === 'meal' && mealScanLoading)}
                className="px-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition disabled:opacity-50 text-xs sm:text-sm whitespace-nowrap"
              >
                {scannerType === 'meal'
                  ? (mealScanLoading ? `🔍 ${copy.tokhealth.scanner.analyzing}` : `🔍 ${copy.tokhealth.scanner.analyze}`)
                  : `✅ ${copy.tokhealth.scanner.log}`}
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
                {isListening ? '🎤...' : `🎤 ${copy.tokhealth.scanner.voice}`}
              </button>
            </div>

            {isListening && (
              <div className="text-center text-emerald-300 text-sm font-semibold">
                {copy.common.listening}
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
            ← {copy.common.back}
          </button>

          <div className="space-y-6">
            {/* Vitals */}
            <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-white">📊 {copy.tokhealth.vitals.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight-input" className="block text-sm font-semibold text-slate-300 mb-2">⚖️ {copy.tokhealth.vitals.weight}</label>
                  <input
                    id="weight-input"
                    type="number"
                    value={healthData.weight || ''}
                    onChange={(e) => setHealthData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="heart-rate-input" className="block text-sm font-semibold text-slate-300 mb-2">🫀 {copy.tokhealth.vitals.heartRate}</label>
                  <input
                    id="heart-rate-input"
                    type="number"
                    value={healthData.heartRate || ''}
                    onChange={(e) => setHealthData(prev => ({ ...prev, heartRate: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="blood-pressure-input" className="block text-sm font-semibold text-slate-300 mb-2">📊 {copy.tokhealth.vitals.bloodPressure}</label>
                  <input
                    id="blood-pressure-input"
                    type="text"
                    value={healthData.bloodPressure}
                    onChange={(e) => setHealthData(prev => ({ ...prev, bloodPressure: e.target.value }))}
                    placeholder="120/80"
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="blood-sugar-input" className="block text-sm font-semibold text-slate-300 mb-2">🩸 {copy.tokhealth.vitals.bloodSugar}</label>
                  <input
                    id="blood-sugar-input"
                    type="number"
                    value={healthData.bloodSugar || ''}
                    onChange={(e) => setHealthData(prev => ({ ...prev, bloodSugar: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="temperature-input" className="block text-sm font-semibold text-slate-300 mb-2">🌡️ {copy.tokhealth.vitals.temperature}</label>
                  <input
                    id="temperature-input"
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
              <h3 className="text-2xl font-bold mb-4 text-red-400">🚨 {copy.tokhealth.allergies.title}</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-300 mb-2">{copy.tokhealth.allergies.add}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder={copy.tokhealth.allergies.placeholder}
                    className="flex-1 p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAllergy()}
                  />
                  <button
                    onClick={handleAddAllergy}
                    className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
                  >
                    {copy.common.add}
                  </button>
                </div>
              </div>

              {healthData.allergies.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-2">{copy.tokhealth.allergies.recorded}</p>
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
                <label className="block text-sm font-semibold text-slate-300 mb-3">{copy.tokhealth.allergies.foodIntolerances}</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {intoleranceOptions.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        if (healthData.intolerances.includes(item.value)) {
                          removeIntolerance(item.value);
                        } else {
                          handleAddIntolerance(item.value);
                        }
                      }}
                      className={`p-2 rounded-lg text-sm font-semibold transition ${
                        healthData.intolerances.includes(item.value)
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spiritual Belief */}
            <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 text-white">🙏 {copy.tokhealth.belief.title}</h3>
              <select
                aria-label="Select spiritual or personal belief"
                value={healthData.spiritualBelief}
                onChange={(e) => setHealthData(prev => ({ ...prev, spiritualBelief: e.target.value }))}
                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
              >
                <option value="">{copy.tokhealth.belief.select}</option>
                {spiritualBeliefOptions.map((belief) => <option key={belief.value} value={belief.value}>{belief.label}</option>)}
              </select>
            </div>

            {/* Health Integrations */}
            <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 text-white">🔗 {copy.tokhealth.integrations.title}</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setHealthData(prev => ({ ...prev, fitbitConnected: !prev.fitbitConnected }))}
                  className={`w-full p-4 rounded-lg text-left font-semibold transition ${
                    healthData.fitbitConnected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {healthData.fitbitConnected ? '✓' : '◯'} {copy.tokhealth.integrations.fitbit}
                </button>
                <button
                  onClick={() => setHealthData(prev => ({ ...prev, appleHealthConnected: !prev.appleHealthConnected }))}
                  className={`w-full p-4 rounded-lg text-left font-semibold transition ${
                    healthData.appleHealthConnected
                      ? 'bg-gray-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {healthData.appleHealthConnected ? '✓' : '◯'} {copy.tokhealth.integrations.apple}
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
            ← {copy.common.back}
          </button>

          <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
            <h2 className="text-3xl font-bold mb-6 text-red-400">🆘 {copy.tokhealth.contacts.title}</h2>

            <div className="space-y-4 mb-8 p-6 rounded-lg bg-slate-700/50">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">{copy.tokhealth.contacts.name}</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={copy.tokhealth.contacts.namePlaceholder}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">{copy.tokhealth.contacts.relationship}</label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                  placeholder={copy.tokhealth.contacts.relationshipPlaceholder}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">{copy.tokhealth.contacts.phone}</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder={copy.tokhealth.contacts.phonePlaceholder}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-red-500"
                />
              </div>
              <button
                onClick={handleAddContact}
                className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition"
              >
                ➕ {copy.tokhealth.contacts.add}
              </button>
            </div>

            <div className="space-y-4">
              {healthData.emergencyContacts.length === 0 ? (
                <p className="text-slate-400 text-center py-8">{copy.tokhealth.contacts.empty}</p>
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
                        {copy.tokhealth.contacts.remove}
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
            ← {copy.common.back}
          </button>

          <div className="p-8 rounded-lg bg-slate-800 border border-slate-700 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">📄 {copy.tokhealth.export.title}</h2>
            <p className="mb-6 text-slate-400 text-lg">
              {copy.tokhealth.export.body}
            </p>
            
            <div className="mb-8 space-y-2 text-left p-6 rounded-lg bg-slate-700/50">
              <p className="text-sm font-semibold text-emerald-300">✅ {copy.tokhealth.export.includes}</p>
              <ul className="text-sm text-slate-300 space-y-1 ml-4">
                {copy.tokhealth.export.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={generateMedicalExport}
              className="w-full px-12 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition"
            >
              📥 {copy.tokhealth.export.download}
            </button>

            <p className="mt-6 text-xs text-slate-500">
              {copy.tokhealth.export.confidential}
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
            ← {copy.tokhealth.backToHub}
          </button>

          <div className="p-8 rounded-lg bg-slate-800 border border-teal-700">
            <h1 className="text-4xl font-bold mb-2 text-white flex items-center gap-3">
              ✨ {copy.tokhealth.wisdom.title}
            </h1>
            <p className="text-slate-400 mb-6">{copy.tokhealth.wisdom.subtitle}</p>
            
            <div className="bg-teal-900 bg-opacity-30 border border-teal-700 rounded-lg p-6 mb-6 text-center">
              <p className="text-teal-200 text-lg font-semibold">
                {copy.tokhealth.wisdom.prompt}
              </p>
            </div>

            <Link 
              href="/agent/wisdom"
              className="w-full block px-6 py-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-center transition text-lg"
            >
              💬 {copy.tokhealth.wisdom.open}
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
        {copy.tokhealth.returnToHub}
      </button>
    </div>
  );
}
