import React from "react";

const guardians = [
  {
    name: "Coach Daniels",
    title: "First Guardian & Coach",
    story: `Coach Daniels is the original Guardian, a living example of KPA principles in action. His journey is one of resilience, mentorship, and unwavering commitment to helping others break through barriers. From humble beginnings to becoming a beacon of hope, Coach Daniels has guided countless individuals to discover their purpose and unlock their potential. His story is the foundation of the Guardian legacy.`,
  },
  {
    name: "1st Guardian",
    title: "The Pioneer",
    story: `The 1st Guardian was created in the image of a real KPA hero—someone who faced adversity, overcame the odds, and inspired a movement. Their life story is woven into the fabric of the game, reminding every player that greatness is born from struggle, faith, and community. The 1st Guardian’s legacy lives on in every challenge and triumph within the SVL universe.`,
  },
  // Add more Guardians and their stories here as needed
];

export default function KpaStoriesPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-8 text-emerald-700">KPA Stories: Meet the Guardians</h1>
      <p className="mb-10 text-lg text-slate-700">
        Every Guardian in SVL is inspired by a real KPA life story. Their journeys of faith, resilience, and leadership shape the world you play in.
      </p>
      <div className="space-y-10">
        {guardians.map((g) => (
          <div key={g.name} className="bg-slate-100 rounded-lg p-6 shadow text-slate-900 text-left">
            <h2 className="text-2xl font-bold mb-2">{g.name} <span className="text-base font-normal text-slate-500">({g.title})</span></h2>
            <p className="text-base">{g.story}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
