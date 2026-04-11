import React from "react";

export default function InfoPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-emerald-700">Welcome to the SVL-KPA-SPL Info Hub</h1>
      <p className="mb-8 text-center text-lg text-slate-700">
        This is your central resource for all things Sanders Viopro Labs, Keep People Alive (KPA), and Sustainable Power/Life (SPL). Explore our mission, milestones, resources, and founder’s vision—all in one place.
      </p>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Quick Links</h2>
        <ul className="list-disc list-inside space-y-2 text-base text-slate-800">
          <li><a href="/milestones-mentors" className="text-emerald-600 underline">Milestones & Mentors</a> – Our journey, breakthroughs, and wisdom from world-class leaders.</li>
          <li><a href="/resource-hub" className="text-emerald-600 underline">Breakthrough Resource Hub</a> – Curated tools, events, and community breakthroughs.</li>
          <li><a href="/founders-note" className="text-emerald-600 underline">Founder's Note</a> – Real talk and vision from the SVL-KPA-SPL founder.</li>
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Our Mission</h2>
        <p className="text-base text-slate-800 mb-2">To Keep People Alive, empower families and communities, and set new standards for resilience, leadership, and innovation.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Contact & Updates</h2>
        <p className="text-base text-slate-800 mb-2">For the latest news, resources, and support, bookmark <strong>theinfo.sandersvioprolabs.com</strong> and check back often.</p>
        <p className="text-base text-slate-800">Questions? Reach out via our <a href="/contact" className="text-emerald-600 underline">Contact Page</a>.</p>
      </section>
      <footer className="mt-12 text-center text-gray-500 text-sm">
        Sanders Viopro Labs LLC &mdash; SVL-KPA-SPL &mdash; 2026
      </footer>
    </main>
  );
}
