import React, { useState } from "react";
import Link from "next/link";
import { ArchitectSeal } from "./components/ArchitectSeal";

const guardians = [
  {
    name: "Grace",
    role: "Guardian of Compassion",
    color: "pink",
    link: "/agent/grace"
  },
  {
    name: "Mr. KPA",
    role: "The Analytical Engine",
    color: "blue",
    link: "/agent/mr-kpa"
  },
  {
    name: "The First Guardian",
    role: "Protector of Boundaries",
    color: "purple",
    link: "/agent/first-guardian"
  },
  {
    name: "Tokfaith",
    role: "Spiritual & Voice Pillar",
    color: "amber",
    link: "/tokfaith"
  }
];

const platformRoutes = [
  { label: 'SVL Home', value: 'sandersvioprolabsllc.com', href: '/sanders-viopro-labs' },
  { label: 'SVL Guardians', value: 'sandersvioprolabsllc.com/agent', href: '/agent' },
  { label: 'First Guardian', value: 'sandersvioprolabsllc.com/agent/first-guardian', href: '/agent/first-guardian' },
  { label: 'TokHealth Experience', value: 'tokhealth.sandersvioprolabsllc.com', href: '/tokhealth' },
  { label: 'SVL Story', value: 'sandersvioprolabsllc.com/our-story', href: '/our-story' },
  { label: 'Succession & Legacy', value: 'sandersvioprolabsllc.com/succession', href: '/succession/legacy-heir-cards' },
];

const sessionWins = [
  'First Guardian fully realized with voice, story, and safety boundaries.',
  'Mr. KPA daily team meeting structure established.',
  'Supportive handoff language integrated into SVL safety system.',
  'Wisdom and HATATA updated for TokHealth and TokThru integration.',
  'All guardians aligned to the same living story and upgrade map.',
  'TokHealth subdomain fixed for direct landing.',
];

export default function BuildersDashboard() {

  // Simulate live status (random for demo)
  const [guardianStatus] = useState(() =>
    guardians.reduce((acc, g) => {
      acc[g.name] = Math.random() > 0.1 ? "Online" : "Offline";
      return acc;
    }, {} as Record<string, string>)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-black to-slate-900 text-white flex flex-col items-center p-8 relative animate-fade-in">
      <ArchitectSeal />
      {/* Quick Command Bar */}
      <div className="fixed top-4 right-4 z-50">
        <Link href="/builder-dashboard" className="rounded-full bg-amber-700/90 px-5 py-2 text-sm font-bold text-white shadow-lg border-2 border-amber-400/60 hover:bg-amber-800/90 transition-all animate-pulse">
          🛠 Builder Dashboard
        </Link>
      </div>
      <div className="w-full max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl font-bold text-amber-300 mb-2 text-center tracking-wide drop-shadow animate-slide-down">Builder's Command Dashboard</h1>
        <div className="text-center text-amber-200 mb-8 text-lg font-semibold">Highest Seal of Authority: <span className="font-bold">Jerome Mack Sanders Sr.</span></div>
        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Link href="/svl-progress" className="rounded-xl bg-slate-900/80 border border-amber-400/30 px-4 py-2 text-amber-200 font-semibold hover:bg-amber-900/30 transition">SVL Progress</Link>
          <Link href="/our-story" className="rounded-xl bg-slate-900/80 border border-amber-400/30 px-4 py-2 text-amber-200 font-semibold hover:bg-amber-900/30 transition">Our Story</Link>
          <Link href="/succession/legacy-heir-cards" className="rounded-xl bg-slate-900/80 border border-amber-400/30 px-4 py-2 text-amber-200 font-semibold hover:bg-amber-900/30 transition">Succession & Legacy</Link>
        </div>
        {/* Guardians Status */}
        <div className="mb-10 flex flex-col md:flex-row gap-6 justify-center">
          {guardians.map((g) => (
            <Link key={g.name} href={g.link} className={`flex-1 rounded-2xl border-2 border-${g.color}-400/40 bg-${g.color}-900/30 p-6 shadow-lg hover:scale-105 transition-transform group`}> 
              <div className={`text-2xl font-bold text-${g.color}-200 mb-1 flex items-center gap-2`}>
                {g.name}
                <span className={`inline-block w-3 h-3 rounded-full ${guardianStatus[g.name] === "Online" ? `bg-green-400 animate-pulse` : `bg-red-400 animate-pulse-slow`}`} title={guardianStatus[g.name]}></span>
              </div>
              <div className={`text-base text-${g.color}-100 mb-2`}>{g.role}</div>
              <div className={`text-xs font-semibold ${guardianStatus[g.name] === "Online" ? `text-green-300` : `text-red-300`}`}>Status: {guardianStatus[g.name]}</div>
            </Link>
          ))}
        </div>
        {/* Ecosystem Metrics */}
        <section className="bg-black/60 border border-amber-700 rounded-2xl p-6 mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-amber-200 mb-2">Ecosystem Metrics</h2>
          <p className="mb-4 text-amber-100">Track the physical and technical growth of the SVL Ecosystem. For hydroponics and real-world metrics, see the <Link href="/PORTABLE_HYDROPONICS_USER_GUIDE.md" className="underline text-amber-300">Portable Hydroponics User Guide</Link>.</p>
          <ul className="list-disc pl-6 text-amber-200">
            <li>Guardian Uptime: 100%</li>
            <li>Active Voice Sessions: 4</li>
            <li>Hydroponics Systems Online: 1</li>
            <li>Last System Audit: March 28, 2026</li>
          </ul>
        </section>
        {/* Recent Wins */}
        <section className="bg-gradient-to-r from-emerald-900/20 via-black/60 to-amber-900/20 border border-emerald-700/30 rounded-2xl p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-bold text-emerald-300 mb-2">Recent Wins</h2>
          <ul className="list-disc pl-6 text-emerald-200">
            {sessionWins.map((win) => (
              <li key={win}>{win}</li>
            ))}
          </ul>
        </section>
        {/* System Map */}
        <section className="bg-gradient-to-r from-purple-900/20 via-black/60 to-amber-900/20 border border-purple-700/30 rounded-2xl p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-bold text-purple-200 mb-2">System Map</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {platformRoutes.map((route) => (
              <Link key={route.value} href={route.href} className="block rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-purple-400/30 hover:bg-white/10">
                <p className="text-base font-semibold text-white">{route.label}</p>
                <p className="mt-1 text-xs text-slate-300">{route.value}</p>
              </Link>
            ))}
          </div>
        </section>
        <div className="text-xs text-amber-400 text-center mt-8 animate-fade-in">
          System Lock: This dashboard and all system logic are protected by the Highest Seal of Authority. No changes permitted without explicit authorization from Jerome Mack Sanders Sr.
        </div>
      </div>
    </div>
  );
}
