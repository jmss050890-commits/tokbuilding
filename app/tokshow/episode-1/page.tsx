"use client";

import Link from "next/link";
import { useState } from "react";

const beats = [
  {
    title: "Act 1 - The Disruption",
    points: [
      "Easter service ends with joy and families heading home.",
      "A sudden storm hits and two blocks lose streetlights.",
      "Kids and elders are exposed to an unsafe walk-home path.",
    ],
  },
  {
    title: "Act 2 - The Plan",
    points: [
      "Kysen maps a temporary safe route using lit porches and trusted homes.",
      "Bam Bam organizes corner-watch volunteers and umbrella escorts.",
      "The team sets one rule: elders first, children in pairs, no one left behind.",
    ],
  },
  {
    title: "Act 3 - The Protection Win",
    points: [
      "The route opens and every group reaches home or pickup safely.",
      "A tense crossing is resolved with calm communication and teamwork.",
      "Kysen and Bam Bam leave a permanent route sign for future drills.",
    ],
  },
];

const dialogue = [
  { speaker: "Kysen", line: "No panic. We protect first, then we move." },
  { speaker: "Bam Bam", line: "Copy. I am on corner teams now." },
  { speaker: "Kysen", line: "We need light, clear lanes, and check-ins. That is it." },
  { speaker: "Bam Bam", line: "Kids in pairs. Elders first. We walk together." },
  { speaker: "Kysen", line: "KPA means nobody gets left behind." },
];

const shotList = [
  "Wide: church exit and weather shift",
  "Close-up: streetlight flicker to black",
  "Medium: Kysen sketching route",
  "Tracking: Bam Bam assigning volunteers",
  "Wide: families moving through marked path",
  "Close-up: elder safely crossing curb",
  "Hero two-shot: Kysen and Bam Bam at route sign",
];

const globalImpactMoves = [
  "Partner with aligned organizations to expand emergency food and clean-water outcomes.",
  "Use TokShow episodes as proof-of-work content that documents progress and trust.",
  "Position SVL Lab as the execution hub that turns mission ideas into deployable systems.",
];

const miiaOutreachSteps = [
  "Start with one warm intro contact and one direct organizational email.",
  "Attach one proof screenshot and one short model summary from TokStrategy.",
  "Request a 15-minute alignment call with a defined pilot outcome.",
];

const miiaTemplates = [
  {
    title: "Template A - Greenpeace Africa Intro",
    defaultTo: "partnerships@greenpeaceafrica.org",
    body:
      "Subject: Partnership inquiry for emergency food and clean-water pilot\n\nHello [Name],\n\nI am reaching out from MIIA and Sanders Viopro Labs (SVL). We are building practical hydroponic and community-response systems under the Keep People Alive mission. We would value a short conversation on possible collaboration around emergency food and clean-water access in high-need regions.\n\nIf helpful, I can share a one-page model summary and a proposed pilot scope.\n\nThank you for your time,\n[Name]\n[Title]\n[Phone]",
  },
  {
    title: "Template B - Donor Alignment Request",
    defaultTo: "donors@example.org",
    body:
      "Subject: Donor alignment request for KPA pilot deployment\n\nHello [Name],\n\nMIIA and SVL are organizing a focused deployment track to support food and clean-water resilience. We are currently seeking aligned donors for an accountable pilot with clear milestones, reporting cadence, and measurable outcomes.\n\nWould you be open to a 15-minute review call this week?\n\nRespectfully,\n[Name]\n[Title]\n[Phone]",
  },
  {
    title: "Template C - International Grant Application Cover Note",
    defaultTo: "grants@example.org",
    body:
      "Subject: Letter of intent - scalable hydroponic and community resilience pilot\n\nTo the Grants Team,\n\nPlease accept this letter of intent from MIIA and Sanders Viopro Labs (SVL) for a pilot focused on emergency food and clean-water resilience. Our model combines practical deployment, local partnership, and transparent progress reporting.\n\nWe welcome the opportunity to submit a full proposal aligned to your criteria.\n\nSincerely,\n[Name]\n[Title]\n[Organization]",
  },
];

const facebookPostTemplates = [
  {
    title: "Template F1 - Partnership Signal",
    body:
      "MIIA x SVL Outreach Update:\n\nWe are opening partnership conversations around emergency food and clean-water resilience. If your organization supports humanitarian deployment, grants, or community logistics, we welcome collaboration.\n\nMission: Keep People Alive.\n\n#SVL #MIIA #Hydroponics #CleanWater #GlobalImpact",
  },
  {
    title: "Template F2 - Grant + Donor Call",
    body:
      "Funding and Partnership Call:\n\nMIIA and Sanders Viopro Labs are preparing pilot deployments focused on food and clean-water access. We are now speaking with aligned donors, foundations, and grant teams.\n\nMessage us to review pilot scope and measurable outcomes.\n\n#KeepPeopleAlive #FoodSecurity #WaterAccess #PilotProgram",
  },
];

export default function TokShowEpisodeOnePage() {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [approvalKey, setApprovalKey] = useState("");
  const [selectedEmailTemplateTitle, setSelectedEmailTemplateTitle] = useState(miiaTemplates[0].title);
  const [recipientByTemplate, setRecipientByTemplate] = useState<Record<string, string>>(() =>
    Object.fromEntries(miiaTemplates.map((template) => [template.title, template.defaultTo]))
  );
  const [sendStatus, setSendStatus] = useState<Record<string, string>>({});
  const [facebookPageId, setFacebookPageId] = useState("");
  const [facebookDraft, setFacebookDraft] = useState(facebookPostTemplates[0].body);
  const [facebookStatus, setFacebookStatus] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("");
  const [campaignDryRun, setCampaignDryRun] = useState(true);

  async function copyTemplate(body: string, title: string) {
    try {
      await navigator.clipboard.writeText(body);
      setCopiedTemplate(title);
      setTimeout(() => setCopiedTemplate(null), 1800);
    } catch {
      setCopiedTemplate(null);
    }
  }

  function splitTemplate(rawBody: string) {
    const subjectPrefix = "Subject:";
    if (!rawBody.startsWith(subjectPrefix)) {
      return { subject: "SVL Collaboration Outreach", body: rawBody };
    }

    const firstBreak = rawBody.indexOf("\n");
    const subjectLine = firstBreak === -1 ? rawBody : rawBody.slice(0, firstBreak);
    const subject = subjectLine.replace(subjectPrefix, "").trim() || "SVL Collaboration Outreach";
    const body = firstBreak === -1 ? "" : rawBody.slice(firstBreak).trim();
    return { subject, body };
  }

  function openDraftEmail(rawBody: string, title: string) {
    const to = recipientByTemplate[title] || "";
    const { subject, body } = splitTemplate(rawBody);
    const mailtoHref = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoHref;
  }

  async function sendViaMiiaApi(rawBody: string, title: string) {
    const to = recipientByTemplate[title] || "";

    if (!to) {
      setSendStatus((prev) => ({ ...prev, [title]: "Add recipient email first." }));
      return;
    }

    setSendStatus((prev) => ({ ...prev, [title]: "Sending..." }));

    try {
      const response = await fetch("/api/miia/outreach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-miia-approval-key": approvalKey,
        },
        body: JSON.stringify({
          to,
          rawBody,
          source: "tokshow-episode-1",
        }),
      });

      const data = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !data.success) {
        setSendStatus((prev) => ({ ...prev, [title]: data.error || "Send failed." }));
        return;
      }

      setSendStatus((prev) => ({ ...prev, [title]: "Sent successfully." }));
    } catch {
      setSendStatus((prev) => ({ ...prev, [title]: "Network error while sending." }));
    }
  }

  async function copyFacebookDraft() {
    try {
      await navigator.clipboard.writeText(facebookDraft);
      setFacebookStatus("Facebook draft copied.");
    } catch {
      setFacebookStatus("Copy failed. Please copy manually.");
    }
  }

  function openFacebookBusiness() {
    window.open("https://business.facebook.com/latest/home", "_blank", "noopener,noreferrer");
  }

  async function sendFacebookViaApi() {
    if (!facebookPageId.trim()) {
      setFacebookStatus("Add your Facebook Page ID first.");
      return;
    }

    setFacebookStatus("Sending Facebook post...");

    try {
      const response = await fetch("/api/miia/facebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-miia-approval-key": approvalKey,
        },
        body: JSON.stringify({
          pageId: facebookPageId,
          message: facebookDraft,
          source: "tokshow-episode-1-facebook",
        }),
      });

      const data = (await response.json()) as { success?: boolean; error?: string; postId?: string };
      if (!response.ok || !data.success) {
        setFacebookStatus(data.error || "Facebook post failed.");
        return;
      }

      setFacebookStatus(data.postId ? `Facebook post sent: ${data.postId}` : "Facebook post sent.");
    } catch {
      setFacebookStatus("Network error while posting to Facebook.");
    }
  }

  async function sendCampaignAllChannels() {
    const selectedTemplate = miiaTemplates.find((template) => template.title === selectedEmailTemplateTitle);

    if (!selectedTemplate) {
      setCampaignStatus("Select an email template before sending.");
      return;
    }

    const recipient = (recipientByTemplate[selectedTemplate.title] || "").trim();
    if (!recipient) {
      setCampaignStatus("Add a recipient email for the selected template.");
      return;
    }

    if (!facebookPageId.trim()) {
      setCampaignStatus("Add your Facebook Page ID before sending all channels.");
      return;
    }

    setCampaignStatus(campaignDryRun ? "Running dry-run for Email + Facebook..." : "Sending Email + Facebook now...");

    try {
      const [emailResponse, facebookResponse] = await Promise.all([
        fetch("/api/miia/outreach", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-miia-approval-key": approvalKey,
          },
          body: JSON.stringify({
            to: recipient,
            rawBody: selectedTemplate.body,
            source: "tokshow-episode-1-router-email",
            dryRun: campaignDryRun,
          }),
        }),
        fetch("/api/miia/facebook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-miia-approval-key": approvalKey,
          },
          body: JSON.stringify({
            pageId: facebookPageId,
            message: facebookDraft,
            source: "tokshow-episode-1-router-facebook",
            dryRun: campaignDryRun,
          }),
        }),
      ]);

      const emailData = (await emailResponse.json()) as { success?: boolean; error?: string };
      const facebookData = (await facebookResponse.json()) as { success?: boolean; error?: string };

      const emailResult = emailResponse.ok && emailData.success ? (campaignDryRun ? "Email: dry-run ok" : "Email: sent") : `Email: ${emailData.error || "failed"}`;
      const facebookResult = facebookResponse.ok && facebookData.success ? (campaignDryRun ? "Facebook: dry-run ok" : "Facebook: sent") : `Facebook: ${facebookData.error || "failed"}`;

      setCampaignStatus(`${emailResult} | ${facebookResult}`);
    } catch {
      setCampaignStatus("Network error while sending multi-channel campaign.");
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_10%,_rgba(34,211,238,0.18),_transparent_32%),radial-gradient(circle_at_85%_18%,_rgba(251,191,36,0.14),_transparent_28%),linear-gradient(180deg,_#0a0f1e_0%,_#121d35_45%,_#16112b_100%)] text-white">
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="rounded-3xl border border-cyan-300/25 bg-black/30 p-8 shadow-[0_26px_90px_rgba(0,0,0,0.45)]">
          <p className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            TokShow Episode 01
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Easter Sunday: The Promise Route</h1>
          <p className="mt-3 text-lg leading-8 text-cyan-100">
            Kysen and Bam Bam launch the series by protecting their neighborhood during a sudden storm blackout.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tokshow" className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">
              Back To TokShow
            </Link>
            <Link href="/sanders-viopro-labs" className="rounded-full border border-amber-300/35 bg-amber-400/10 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-400/20">
              SVL Home
            </Link>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {beats.map((beat) => (
            <article key={beat.title} className="rounded-2xl border border-white/10 bg-slate-950/55 p-6">
              <h2 className="text-2xl font-black text-white">{beat.title}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-slate-200">
                {beat.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}

          <article className="rounded-2xl border border-white/10 bg-slate-950/55 p-6">
            <h2 className="text-2xl font-black text-white">Dialogue Highlights</h2>
            <div className="mt-4 space-y-3">
              {dialogue.map((line) => (
                <p key={`${line.speaker}-${line.line}`} className="rounded-xl border border-cyan-300/15 bg-cyan-400/5 px-4 py-3 text-base leading-8 text-slate-100">
                  <span className="font-bold text-cyan-200">{line.speaker}:</span> {line.line}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-950/55 p-6">
            <h2 className="text-2xl font-black text-white">Shot List</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-8 text-slate-200">
              {shotList.map((shot) => (
                <li key={shot}>{shot}</li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/12 to-transparent p-6">
            <h2 className="text-2xl font-black text-white">Global Impact Signal</h2>
            <p className="mt-3 text-lg leading-8 text-violet-100">
              This episode now doubles as an SVL collaboration signal: we scale the Keep People Alive mission by combining local action,
              strategic partners, and transparent storytelling.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-slate-100">
              {globalImpactMoves.map((move) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-sky-300/25 bg-gradient-to-br from-sky-500/12 to-transparent p-6">
            <h2 className="text-2xl font-black text-white">MIIA Outreach Command</h2>
            <p className="mt-3 text-lg leading-8 text-sky-100">
              Use these steps and templates to contact Greenpeace Africa, donor networks, and grant teams with a clear pilot ask.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-8 text-slate-100">
              {miiaOutreachSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <label className="mt-5 block text-sm font-semibold uppercase tracking-[0.16em] text-sky-100/90">
              MIIA Approval Key (Pilot Security)
            </label>
            <input
              type="password"
              value={approvalKey}
              onChange={(event) => setApprovalKey(event.target.value)}
              aria-label="MIIA approval key"
              placeholder="Enter approval key for direct outbound"
              className="mt-2 w-full rounded-xl border border-sky-300/35 bg-slate-950/55 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-300/70 focus:outline-none"
            />

            <div className="mt-5 space-y-4">
              {miiaTemplates.map((template) => (
                <section key={template.title} className="rounded-xl border border-sky-300/20 bg-slate-950/45 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-sky-100">{template.title}</h3>
                    <button
                      type="button"
                      onClick={() => copyTemplate(template.body, template.title)}
                      className="rounded-full border border-sky-300/40 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sky-100 transition hover:bg-sky-400/20"
                    >
                      {copiedTemplate === template.title ? "Copied" : "Copy Template"}
                    </button>
                  </div>
                  <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    value={recipientByTemplate[template.title] || ""}
                    onChange={(event) =>
                      setRecipientByTemplate((prev) => ({
                        ...prev,
                        [template.title]: event.target.value,
                      }))
                    }
                    aria-label={`Recipient email for ${template.title}`}
                    placeholder="name@organization.org"
                    className="mt-2 w-full rounded-lg border border-sky-300/25 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-300/70 focus:outline-none"
                  />
                  <pre className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-200">{template.body}</pre>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openDraftEmail(template.body, template.title)}
                      className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100 transition hover:bg-emerald-400/20"
                    >
                      Open Draft Email
                    </button>
                    <button
                      type="button"
                      onClick={() => sendViaMiiaApi(template.body, template.title)}
                      className="rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-amber-400/20"
                    >
                      Send via MIIA API
                    </button>
                  </div>
                  {sendStatus[template.title] ? <p className="mt-2 text-sm text-slate-300">{sendStatus[template.title]}</p> : null}
                </section>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
            <h2 className="text-2xl font-black text-white">Facebook Business Page Bridge</h2>
            <p className="mt-3 text-lg leading-8 text-emerald-100">
              Run manual-first posting with copy and composer, or use direct API posting when your Meta token is configured.
            </p>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100/90">
              Facebook Page ID
            </label>
            <input
              type="text"
              value={facebookPageId}
              onChange={(event) => setFacebookPageId(event.target.value)}
              aria-label="Facebook Page ID"
              placeholder="Enter your Facebook Business Page ID"
              className="mt-2 w-full rounded-lg border border-emerald-300/30 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300/70 focus:outline-none"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {facebookPostTemplates.map((template) => (
                <button
                  key={template.title}
                  type="button"
                  onClick={() => {
                    setFacebookDraft(template.body);
                    setFacebookStatus(`Loaded ${template.title}`);
                  }}
                  className="rounded-full border border-emerald-300/35 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-100 transition hover:bg-emerald-400/20"
                >
                  {template.title}
                </button>
              ))}
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
              Facebook Post Draft
            </label>
            <textarea
              value={facebookDraft}
              onChange={(event) => setFacebookDraft(event.target.value)}
              aria-label="Facebook post draft"
              rows={8}
              className="mt-2 w-full rounded-lg border border-emerald-300/30 bg-slate-950/60 px-3 py-3 text-sm leading-6 text-white placeholder:text-slate-400 focus:border-emerald-300/70 focus:outline-none"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyFacebookDraft}
                className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100 transition hover:bg-emerald-400/20"
              >
                Copy Facebook Draft
              </button>
              <button
                type="button"
                onClick={openFacebookBusiness}
                className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-400/20"
              >
                Open Facebook Business
              </button>
              <button
                type="button"
                onClick={sendFacebookViaApi}
                className="rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-amber-400/20"
              >
                Post via MIIA API
              </button>
            </div>
            {facebookStatus ? <p className="mt-2 text-sm text-slate-300">{facebookStatus}</p> : null}
          </article>

          <article className="rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-500/10 to-transparent p-6">
            <h2 className="text-2xl font-black text-white">MIIA Channel Router</h2>
            <p className="mt-3 text-lg leading-8 text-amber-100">
              Send one coordinated campaign to both channels: outreach email plus Facebook Business Page post.
            </p>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-amber-100/90">
              Email Template For Router
            </label>
            <select
              value={selectedEmailTemplateTitle}
              onChange={(event) => setSelectedEmailTemplateTitle(event.target.value)}
              aria-label="Email template for channel router"
              className="mt-2 w-full rounded-lg border border-amber-300/35 bg-slate-950/60 px-3 py-2 text-sm text-white focus:border-amber-300/70 focus:outline-none"
            >
              {miiaTemplates.map((template) => (
                <option key={template.title} value={template.title}>
                  {template.title}
                </option>
              ))}
            </select>

            <label className="mt-3 inline-flex items-center gap-2 text-sm text-amber-100">
              <input
                type="checkbox"
                checked={campaignDryRun}
                onChange={(event) => setCampaignDryRun(event.target.checked)}
                aria-label="Enable dry run for channel router"
                className="h-4 w-4 rounded border-amber-300/60 bg-slate-950/60"
              />
              Dry Run Mode (validate both channels without sending live)
            </label>

            <button
              type="button"
              onClick={sendCampaignAllChannels}
              className="mt-4 rounded-full border border-amber-300/40 bg-amber-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-amber-400/20"
            >
              {campaignDryRun ? "Run Dry-Run For Email + Facebook" : "Send Email + Facebook Now"}
            </button>
            {campaignStatus ? <p className="mt-2 text-sm text-slate-300">{campaignStatus}</p> : null}
          </article>

          <article className="rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
            <h2 className="text-2xl font-black text-white">KPA Action Step</h2>
            <p className="mt-3 text-lg leading-8 text-emerald-100">
              Build your Family Safe Route Card today: list 2 lit paths, 2 emergency contacts, and 1 trusted neighbor.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
