import Link from "next/link";

export default function TokStrategyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black sm:text-3xl">TokStrategy Market Value Calculator</h1>
          <Link
            href="/sanders-viopro-labs"
            className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
          >
            Back To SVL Home
          </Link>
        </div>

        <p className="mb-4 text-sm text-slate-300">
          Live upgraded build with SVL-KPA smart upgrade forecast, board summary export, and screen reader mode.
        </p>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <iframe
            src="/tokstrategy/index.html"
            title="TokStrategy Calculator"
            className="h-[88vh] w-full"
          />
        </div>
      </div>
    </main>
  );
}
