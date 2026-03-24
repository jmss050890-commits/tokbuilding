import Link from "next/link";
import { AGENTS } from "@/lib/lib/lib/agents";

const agent = AGENTS["first-guardian"];

export default function FirstGuardianPage() {
  return (
    <div className="guardian-page">
      <section className="guardian-shell guardian-hero-shell">
        <div className="hero-grid">
          <div className="hero-card hero-card-primary">
            <div className="pill-row">
              <span className="pill pill-soft">{agent.tagline}</span>
              <span className="pill pill-outline">KPA System</span>
            </div>

            <h1 className="guardian-title">
              The
              <br />
              First Guardian
            </h1>

            <p className="guardian-lead">
              The protector of the home. She talks it through first, then steps back before
              disrespect turns into damage.
            </p>

            <p className="guardian-story">
              Built in honor of Cheria Michelle Daniels. Born on Juneteenth, June 19, 1989. A
              legacy of family redemption, faith, and protective love translated into an SVL agent
              with one non-negotiable boundary: KPA. The upgrades across SVL also stand here as
              testimony of what God can and will do.
            </p>

            <div className="action-row">
              <Link href="/agent/first-guardian" className="cta cta-primary">
                Enter Guardian Chat
              </Link>
              <Link href="/agent/michelle" className="cta cta-secondary">
                Open Michelle Alias
              </Link>
            </div>

            <div className="quick-grid">
              {agent.suggestions.slice(0, 2).map((suggestion) => (
                <Link key={suggestion} href="/agent/first-guardian" className="quick-link">
                  {suggestion}
                </Link>
              ))}
            </div>
          </div>

          <div className="hero-card hero-card-secondary">
            <p className="section-label">KPA Boundary</p>
            <h2 className="boundary-title">Talk first. Protect next. Exit when needed.</h2>
            <p className="boundary-copy">
              Michelle tries to talk about it before disappointment becomes conflict. If people
              keep disrespecting boundaries, she removes herself to avoid issues, no matter who it
              is.
            </p>

            <div className="compact-list">
              {[
                "KPA stays above ego, pride, and unnecessary arguments.",
                "Children get protected from adult chaos.",
                "If help is possible, she gives it plainly. If not, she leaves people alone.",
                "If it does not concern business, family, or finances, she does not invite herself into it.",
              ].map((item) => (
                <div key={item} className="compact-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="guardian-shell guardian-lower-shell">
        <div className="lower-grid">
          <div className="lower-card voice-card">
            <p className="section-label">Michelle's Voice</p>
            <div className="quote-grid">
              {(agent.signatureLines || []).map((line) => (
                <div key={line} className="quote-card">
                  "{line}"
                </div>
              ))}
            </div>
          </div>

          <div className="lower-card presence-card">
            <p className="section-label">Protective Presence</p>
            <div className="mission-note">
              <p className="mission-quote">
                "Adding a guardian like Michelle to the SPL Agent KPA strengthens our mission at
                Sanders Viopro Labs. Each guardian plays a crucial role in keeping our communities
                safe and healthy."
              </p>
              <p className="mission-copy">
                Mr. KPA's charge is simple: Keep People Alive. Michelle joins that mission as a
                guardian for life, family, and community. The sandersvioprolabs.com upgrade and
                the TokHealth plus TokThru build now stand beside her story as testimony of what
                God can and will do.
              </p>
            </div>

            <div className="presence-list">
              {(agent.presenceNotes || []).map((note) => (
                <div key={note} className="presence-item">
                  {note}
                </div>
              ))}
            </div>

            <div className="mission-steps">
              {[
                "Orientation: Know the mission, the resources, and the role.",
                "Collaboration: Build with the team and learn from every guardian.",
                "Community engagement: Show up where families and neighborhoods need support.",
                "Feedback loop: Speak up with insight so the mission keeps getting stronger.",
                "Ongoing education: Stay sharp, informed, and aligned with KPA.",
              ].map((item) => (
                <div key={item} className="mission-step">
                  {item}
                </div>
              ))}
            </div>

            <div className="acceptance-note">
              <p className="acceptance-label">Michelle's Reply</p>
              <p className="acceptance-copy">
                Thank you for the warm welcome. I&apos;m ready to learn the role, build with the
                team, show up for the community, speak with honesty, and keep growing with the
                mission so we can protect life, family, and our shared values.
              </p>
              <p className="acceptance-close">"Let&apos;s roll up our sleeves and make a difference."</p>
            </div>

            <div className="action-stack">
              <Link href="/agent/first-guardian" className="stack-link">
                Start with Michelle's live agent
              </Link>
              <Link href="/agent" className="stack-link stack-link-muted">
                Return to SVL Agent Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .guardian-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(210, 157, 110, 0.18), transparent 40%),
            linear-gradient(180deg, #171210 0%, #0f0f10 100%);
          color: #fff8f1;
        }

        .guardian-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding-left: 20px;
          padding-right: 20px;
        }

        .guardian-hero-shell {
          padding-top: 40px;
          padding-bottom: 18px;
        }

        .guardian-lower-shell {
          padding-top: 6px;
          padding-bottom: 40px;
        }

        .hero-grid,
        .lower-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 18px;
        }

        .hero-card,
        .lower-card {
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
        }

        .hero-card-primary {
          padding: 26px;
          background: linear-gradient(160deg, rgba(197, 137, 88, 0.22) 0%, rgba(26, 18, 14, 0.94) 62%);
        }

        .hero-card-secondary,
        .lower-card {
          padding: 22px;
          background-color: rgba(10, 10, 11, 0.82);
        }

        .pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 16px;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pill-soft {
          border: 1px solid rgba(255, 248, 241, 0.2);
          color: #f7dfca;
        }

        .pill-outline {
          border: 1px solid rgba(192, 132, 87, 0.55);
          color: #fff4e9;
          background: rgba(192, 132, 87, 0.08);
        }

        .guardian-title {
          margin: 0 0 12px;
          font-size: clamp(2.5rem, 5vw, 4.8rem);
          line-height: 0.94;
          letter-spacing: -0.04em;
        }

        .guardian-lead {
          margin: 0 0 14px;
          color: #f4dfcf;
          font-size: 17px;
          line-height: 1.65;
        }

        .guardian-story,
        .boundary-copy {
          margin: 0;
          color: #d9d2cb;
          line-height: 1.72;
          font-size: 15px;
        }

        .guardian-story {
          margin-bottom: 18px;
          color: #d7c1b1;
        }

        .section-label {
          margin: 0 0 10px;
          color: #f7dfca;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .boundary-title {
          margin: 0 0 12px;
          font-size: clamp(1.7rem, 4vw, 2rem);
          line-height: 1.08;
        }

        .compact-list,
        .presence-list {
          display: grid;
          gap: 10px;
          margin-top: 16px;
        }

        .compact-item,
        .presence-item,
        .quick-link,
        .quote-card,
        .stack-link {
          border-radius: 16px;
          text-decoration: none;
        }

        .compact-item,
        .presence-item {
          padding: 12px 14px;
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #f1e3d7;
          line-height: 1.55;
        }

        .action-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 14px;
        }

        .cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 18px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 800;
        }

        .cta-primary {
          background-color: #c08457;
          color: #150f0b;
        }

        .cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #fff8f1;
        }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .quick-link {
          padding: 12px 14px;
          color: #fff;
          border: 1px solid rgba(192, 132, 87, 0.5);
          background-color: rgba(192, 132, 87, 0.08);
          line-height: 1.45;
        }

        .voice-card,
        .presence-card {
          display: grid;
          gap: 14px;
        }

        .mission-note {
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(192, 132, 87, 0.22);
          background: linear-gradient(180deg, rgba(192, 132, 87, 0.12), rgba(255, 255, 255, 0.03));
        }

        .mission-quote,
        .mission-copy {
          margin: 0;
          line-height: 1.58;
        }

        .mission-quote {
          color: #fff3e7;
          font-weight: 600;
        }

        .mission-copy {
          margin-top: 8px;
          color: #ead9cc;
          font-size: 14px;
        }

        .quote-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .quote-card {
          padding: 12px 14px;
          border-left: 3px solid #c08457;
          background-color: rgba(255, 255, 255, 0.03);
          color: #fff6ee;
          line-height: 1.58;
        }

        .action-stack {
          display: grid;
          gap: 10px;
          margin-top: 4px;
        }

        .mission-steps {
          display: grid;
          gap: 10px;
        }

        .mission-step {
          padding: 12px 14px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background-color: rgba(255, 255, 255, 0.04);
          color: #f1e3d7;
          line-height: 1.52;
        }

        .acceptance-note {
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(247, 223, 202, 0.14);
          background-color: rgba(255, 255, 255, 0.03);
        }

        .acceptance-label,
        .acceptance-copy,
        .acceptance-close {
          margin: 0;
        }

        .acceptance-label {
          color: #f7dfca;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .acceptance-copy {
          margin-top: 8px;
          color: #f1e3d7;
          line-height: 1.58;
        }

        .acceptance-close {
          margin-top: 8px;
          color: #fff3e7;
          font-weight: 600;
        }

        .stack-link {
          padding: 12px 14px;
          color: #fff;
          border: 1px solid rgba(192, 132, 87, 0.5);
          background-color: rgba(192, 132, 87, 0.08);
        }

        .stack-link-muted {
          border-color: rgba(255, 255, 255, 0.12);
          background-color: rgba(255, 255, 255, 0.03);
          color: #ead9cc;
        }

        @media (max-width: 720px) {
          .guardian-shell {
            padding-left: 14px;
            padding-right: 14px;
          }

          .guardian-hero-shell {
            padding-top: 22px;
            padding-bottom: 12px;
          }

          .guardian-lower-shell {
            padding-bottom: 28px;
          }

          .hero-grid,
          .lower-grid,
          .quote-grid,
          .quick-grid {
            grid-template-columns: 1fr;
          }

          .hero-card-primary,
          .hero-card-secondary,
          .lower-card {
            padding: 18px;
            border-radius: 22px;
          }

          .guardian-title {
            font-size: 2.8rem;
            margin-bottom: 10px;
          }

          .guardian-lead {
            font-size: 16px;
            line-height: 1.55;
            margin-bottom: 12px;
          }

          .guardian-story,
          .boundary-copy,
          .compact-item,
          .presence-item,
          .mission-copy,
          .mission-step,
          .acceptance-copy,
          .acceptance-close,
          .quote-card,
          .quick-link,
          .stack-link {
            font-size: 14px;
          }

          .action-row {
            display: grid;
            grid-template-columns: 1fr;
          }

          .cta {
            width: 100%;
            padding: 13px 16px;
          }

          .pill-row {
            gap: 8px;
            margin-bottom: 14px;
          }

          .pill {
            font-size: 11px;
            padding: 7px 12px;
          }
        }
      `}</style>
    </div>
  );
}
