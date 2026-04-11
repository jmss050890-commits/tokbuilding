"use client";

import VoiceStyleSpeaker from "@/app/components/VoiceStyleSpeaker";

const legalNoticeSpeechText = [
  "Legal and Disclaimers.",
  "SVL Universe: Master Disclaimer and Notice.",
  "Effective Date: March 30, 2026.",
  "One. AI Disclosure and Nature of Service.",
  "Sanders Viopro Labs LLC, SVL, utilizes advanced Artificial Intelligence, including the Wisdom AI Health Coach.",
  "Not a Human: You are interacting with a generative AI system, not a licensed healthcare professional, doctor, or counselor.",
  "Information Only: All insights provided by Wisdom or any SVL platform are for informational and educational purposes only and do not constitute medical advice, diagnosis, or treatment.",
  "Human-in-the-Loop: AI can produce hallucinations or errors. Always verify critical health information with a qualified medical provider.",
  "Two. Intellectual Property and Patent Pending Notice.",
  "NOTICE: The core logic, Guardian protocols, and the Voice Command Center, VCC, architecture are the proprietary intellectual property of Sanders Viopro Labs LLC.",
  "PATENTS PENDING: Unauthorized reproduction, reverse engineering, or manipulation of SVL's Keep Alive, KPA, systems is strictly prohibited under U.S. and International Patent Law.",
  "Trademark Notice: TokHealth, TokThru, SVL, and KPA are trademarks of Sanders Viopro Labs LLC.",
  "Three. Emergency and Safety Warning, KPA Protocol.",
  "SVL is not an emergency response service.",
  "If you are experiencing a medical emergency, suicidal ideation, or are in immediate physical danger, stop using this app and call 911 or your local emergency services immediately.",
  "The KPA features are supplementary tools and are not a guaranteed substitute for professional emergency intervention or law enforcement.",
  "Four. Data Privacy and 2026 Compliance.",
  "Your health data is encrypted and is not used to train public, third-party AI models.",
  "SVL maintains strict siloed security to ensure your spoken thoughts and health metrics remain private to your account.",
  "Five. Limitation of Liability.",
  "By using the SVL Universe, you agree that Sanders Viopro Labs LLC, its founders, and its Guardians are not liable for decisions made based on AI-generated content. You assume full responsibility for your health and safety decisions.",
  "The Mission - Why KPA.",
  "Keep People Alive is not a slogan. It is the standard every SVL product is held to.",
  "Safety through TokThru. Health through TokHealth. Prosperity through TokBuilding. The only override any KPA product can perform on its user is to Keep People Alive.",
  "KPA Protocol Enabled.",
  "Every SVL product is engineered with non-negotiable KPA safety guardrails.",
  "The result of Next.JS meeting God's Vision Through SVL to KPA.",
  "Sanders Viopro Labs LLC.",
  "SVL - Mr. KPA. Approved est. 1-31-2026 from Spoken Thought to Reality. SVL products provide medical guidance to facilitate coordination with qualified healthcare professionals and are not medical advisors or substitutes for professional medical services.",
  "Legal and Disclaimers.",
  "Seal of the Architect.",
  "Sanders Viopro Labs LLC Growth 2026: Expanding the SVL-KPA Universe, empowering more communities, and advancing AI-driven safety and wellness.",
  "Sanders Viopro Labs LLC.",
  "Kaptain Planet Arrives with a Key Performance Alert to Keep People Alive.",
  "Legal and Disclaimers.",
  "Chef's kiss SVL Lab, that's doing it global and exceeding SVL standards.",
].join(" ");

export default function LegalDisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-400/20 bg-slate-900/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">Legal & Disclaimers</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
          SVL Universe: Master Disclaimer & Notice
        </h1>
        <p className="mt-3 text-sm text-slate-300">Effective Date: March 30, 2026</p>

        <div className="mt-5 flex justify-center">
          <VoiceStyleSpeaker
            text={legalNoticeSpeechText}
            speakLabel="Speak Legal Notice"
            stopLabel="Stop Legal Notice"
            speakTitle="Listen to legal notice"
            stopTitle="Stop legal notice"
          />
        </div>

        <div className="mt-8 space-y-8 text-slate-200 leading-8">
          <section>
            <h2 className="text-xl font-bold text-white">1. AI Disclosure & Nature of Service</h2>
            <p className="mt-2">
              Sanders Viopro Labs LLC (SVL) utilizes advanced Artificial Intelligence, including the Wisdom AI Health Coach.
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Not a Human: You are interacting with a generative AI system, not a licensed healthcare professional, doctor, or counselor.</li>
              <li>Information Only: All insights provided by Wisdom or any SVL platform are for informational and educational purposes only and do not constitute medical advice, diagnosis, or treatment.</li>
              <li>Human-in-the-Loop: AI can produce hallucinations or errors. Always verify critical health information with a qualified medical provider.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. Intellectual Property & Patent Pending Notice</h2>
            <p className="mt-2">
              NOTICE: The core logic, Guardian protocols, and the Voice Command Center (VCC) architecture are the proprietary intellectual property of Sanders Viopro Labs LLC.
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>PATENTS PENDING:</strong> Unauthorized reproduction, reverse engineering, or manipulation of SVL&apos;s Keep Alive (KPA) systems is strictly prohibited under U.S. and International Patent Law.</li>
              <li>Trademark Notice: TokHealth, TokThru, SVL, and KPA are trademarks of Sanders Viopro Labs LLC.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. Emergency & Safety Warning (KPA Protocol)</h2>
            <p className="mt-2 font-semibold text-amber-200">SVL IS NOT AN EMERGENCY RESPONSE SERVICE.</p>
            <p className="mt-2">
              If you are experiencing a medical emergency, suicidal ideation, or are in immediate physical danger, stop using this app and call 911 or your local emergency services immediately.
            </p>
            <p className="mt-2">
              The KPA features are supplementary tools and are not a guaranteed substitute for professional emergency intervention or law enforcement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. Data Privacy & 2026 Compliance</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Your health data is encrypted and is not used to train public, third-party AI models.</li>
              <li>SVL maintains strict siloed security to ensure your spoken thoughts and health metrics remain private to your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. Limitation of Liability</h2>
            <p className="mt-2">
              By using the SVL Universe, you agree that Sanders Viopro Labs LLC, its founders, and its Guardians are not liable for decisions made based on AI-generated content.
              You assume full responsibility for your health and safety decisions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
