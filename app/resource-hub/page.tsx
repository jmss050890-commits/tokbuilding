import React from "react";

export default function ResourceHub() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Breakthrough Resource Hub</h1>
      <p className="mb-8 text-center text-lg text-slate-700">
        Curated tools, events, and coaching opportunities for the SVL-KPA-SPL community. Take action, grow, and share your breakthroughs.
      </p>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Featured Programs</h2>
        <ul className="list-disc list-inside space-y-2 text-base text-slate-800">
          <li><strong>Life & Wealth Mastery:</strong> Reset your approach to money, lifestyle, and abundance. <a href="#" className="text-blue-500 underline">Learn More</a></li>
          <li><strong>Results Coaching:</strong> One-on-one accountability for financial and personal growth. <a href="#" className="text-blue-500 underline">Schedule a Free Session</a></li>
          <li><strong>Unleash the Power Within:</strong> Live event to rewire limiting beliefs and unlock your inner power. <a href="#" className="text-blue-500 underline">Book Now</a></li>
          <li><strong>Business Mastery:</strong> Proven systems for scaling and optimizing your business. <a href="#" className="text-blue-500 underline">Get Started</a></li>
          <li><strong>Leadership Academy:</strong> Master influence, communication, and emotional control. <a href="#" className="text-blue-500 underline">Join Academy</a></li>
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Community Breakthroughs</h2>
        <p className="mb-2 text-base text-slate-800">Share your own breakthrough or favorite resource below. Inspire others and celebrate progress together!</p>
        <form className="flex flex-col gap-4 max-w-lg mx-auto">
          <textarea className="border rounded p-2" rows={3} placeholder="Share your breakthrough or resource..." />
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800">Submit</button>
        </form>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Quick Links</h2>
        <ul className="list-disc list-inside space-y-2 text-base text-slate-800">
          <li><a href="#" className="text-blue-500 underline">View Your Quiz Results</a></li>
          <li><a href="#" className="text-blue-500 underline">Book a Free Strategy Session</a></li>
          <li><a href="#" className="text-blue-500 underline">Join the SVL-KPA Community</a></li>
        </ul>
      </section>
    </main>
  );
}
