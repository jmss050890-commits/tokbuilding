import Link from "next/link";

export default function AmenPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.22),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(34,211,238,0.16),_transparent_26%),linear-gradient(180deg,_#0b1020_0%,_#111827_40%,_#1f1147_100%)] text-white">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="rounded-full border border-amber-300/35 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
          Sanders Viopro Labs LLC
        </p>

        <h1 className="mt-8 text-6xl font-black tracking-[0.18em] text-amber-100 sm:text-8xl">
          Amen.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          A heartbeat page for faith, mission, and gratitude.
          Keep People Alive through love, wisdom, and action.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/sanders-viopro-labs"
            className="rounded-full bg-amber-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Back To SVL Home
          </Link>
          <Link
            href="/tokfam"
            className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
          >
            Open TokFam
          </Link>
        </div>
      </main>
    </div>
  );
}
