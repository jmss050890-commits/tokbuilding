'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import HeroVideo from './HeroVideo';

const guardianStyles = {
  '--bg-1': '#020812',
  '--bg-2': '#071624',
  '--glass': 'rgba(255,255,255,0.08)',
  '--glass-2': 'rgba(255,255,255,0.12)',
  '--border': 'rgba(255,255,255,0.14)',
  '--text': '#f4f8fc',
  '--muted': '#b8c6d2',
  '--blue': '#49bfff',
  '--tok-blue': '#39b8ff',
  '--cyan': '#7cf5ff',
  '--green': '#73ffb0',
  '--gold': '#ffd76d',
  '--gold-2': '#ffbf3f',
  '--red': '#ff5362',
  '--purple': '#b891ff',
  '--shadow': '0 24px 60px rgba(0,0,0,0.42)',
  '--glow-blue': '0 0 28px rgba(57,184,255,0.22)',
  '--glow-gold': '0 0 28px rgba(255,215,109,0.20)',
  background: 'radial-gradient(circle at 10% 15%, rgba(57,184,255,0.14), transparent 24%), radial-gradient(circle at 90% 20%, rgba(124,245,255,0.10), transparent 22%), radial-gradient(circle at 50% 100%, rgba(255,215,109,0.08), transparent 26%), linear-gradient(135deg, #020812, #071624)',
  color: '#f4f8fc',
  maxWidth: '1480px',
  margin: '0 auto',
  padding: '34px 18px',
  borderRadius: '30px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Arial, Helvetica, sans-serif',
  boxShadow: '0 24px 60px rgba(0,0,0,0.42)',
  isolation: 'isolate',
} satisfies CSSProperties & Record<string, string>;

export default function SVLGuardian() {
  return (
    <div id="svl-kpa-guardian" style={guardianStyles}>
      <style>{`
        #svl-kpa-guardian * { box-sizing: border-box; }
        
        #svl-kpa-guardian .svl-safety-net {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.65;
        }
        
        #svl-kpa-guardian .svl-safety-net:before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124,245,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,245,255,0.08) 1px, transparent 1px);
          background-size: 44px 44px;
          animation: svlGridDrift 14s linear infinite;
          mask-image: radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0.2) 65%, transparent 100%);
        }
        
        #svl-kpa-guardian .svl-safety-net:after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 20%, rgba(124,245,255,0.18), transparent 12%),
            radial-gradient(circle at 80% 25%, rgba(57,184,255,0.12), transparent 10%),
            radial-gradient(circle at 25% 75%, rgba(255,215,109,0.10), transparent 12%),
            radial-gradient(circle at 75% 80%, rgba(124,245,255,0.12), transparent 12%);
          animation: svlSafetyPulse 7s ease-in-out infinite;
        }
        
        #svl-kpa-guardian .svl-shell {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 4;
        }
        
        #svl-kpa-guardian .svl-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }
        
        #svl-kpa-guardian .svl-chip,
        #svl-kpa-guardian .svl-stamp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 15px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }
        
        #svl-kpa-guardian .svl-chip {
          color: #7cf5ff;
          background: rgba(124,245,255,0.10);
          border: 1px solid rgba(124,245,255,0.24);
        }
        
        #svl-kpa-guardian .svl-stamp {
          color: #ffe2e4;
          background: rgba(255,83,98,0.14);
          border: 1px solid rgba(255,83,98,0.32);
          box-shadow: 0 0 24px rgba(255,83,98,0.16);
        }
        
        #svl-kpa-guardian .svl-hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 20px;
          align-items: stretch;
          margin-bottom: 22px;
        }
        
        #svl-kpa-guardian .svl-panel {
          background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05));
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 28px;
          padding: 28px;
          backdrop-filter: blur(14px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.42);
          position: relative;
          overflow: hidden;
        }
        
        #svl-kpa-guardian .svl-panel:before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(124,245,255,0.05), transparent 42%, rgba(255,215,109,0.04));
          pointer-events: none;
        }
        
        #svl-kpa-guardian .svl-overline {
          display: inline-block;
          margin-bottom: 14px;
          color: #7cf5ff;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
        }
        
        #svl-kpa-guardian .svl-title {
          margin: 0 0 14px;
          font-size: clamp(34px, 5vw, 64px);
          line-height: 0.98;
          letter-spacing: -0.04em;
          font-weight: 900;
          position: relative;
          z-index: 2;
        }
        
        #svl-kpa-guardian .svl-title .accent {
          color: #7cf5ff;
          text-shadow: 0 0 20px rgba(124,245,255,0.20);
        }
        
        #svl-kpa-guardian .svl-copy {
          margin: 0 0 20px;
          color: #b8c6d2;
          line-height: 1.7;
          font-size: clamp(16px, 2vw, 20px);
          max-width: 760px;
          position: relative;
          z-index: 2;
        }
        
        #svl-kpa-guardian .svl-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }
        
        #svl-kpa-guardian .svl-btn,
        #svl-kpa-guardian .svl-btn-alt {
          display: inline-block;
          text-decoration: none;
          padding: 14px 22px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.03em;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: none;
          cursor: pointer;
        }
        
        #svl-kpa-guardian .svl-btn {
          color: #06131a;
          background: linear-gradient(90deg, #7cf5ff, #39b8ff);
          box-shadow: 0 12px 28px rgba(57,184,255,0.24);
        }
        
        #svl-kpa-guardian .svl-btn-alt {
          color: #f4f8fc;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.18);
        }
        
        #svl-kpa-guardian .svl-btn:hover,
        #svl-kpa-guardian .svl-btn-alt:hover {
          transform: translateY(-2px);
        }
        
        #svl-kpa-guardian .svl-mini-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 18px;
          position: relative;
          z-index: 2;
        }
        
        #svl-kpa-guardian .svl-stat {
          border-radius: 18px;
          padding: 16px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.05);
        }
        
        #svl-kpa-guardian .svl-stat strong {
          display: block;
          font-size: 24px;
          color: #7cf5ff;
          margin-bottom: 4px;
        }
        
        #svl-kpa-guardian .svl-stat span {
          display: block;
          color: #b8c6d2;
          font-size: 13px;
          line-height: 1.4;
        }
        
        #svl-kpa-guardian .svl-creator-box {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 18px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        #svl-kpa-guardian .svl-photo-frame {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.16);
          background: radial-gradient(circle at 30% 30%, rgba(124,245,255,0.20), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          box-shadow: 0 24px 60px rgba(0,0,0,0.42), 0 0 22px rgba(57,184,255,0.18);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        #svl-kpa-guardian .svl-photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
        }
        
        #svl-kpa-guardian .svl-side-title {
          margin: 0 0 10px;
          font-size: 24px;
          font-weight: 900;
          color: #ffd76d;
        }
        
        #svl-kpa-guardian .svl-side-copy {
          margin: 0;
          color: #b8c6d2;
          line-height: 1.7;
          font-size: 15px;
        }
        
        @keyframes svlGridDrift {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(10px, 12px, 0); }
          100% { transform: translate3d(0,0,0); }
        }
        
        @keyframes svlSafetyPulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.02); }
        }
        
        @media (max-width: 1100px) {
          #svl-kpa-guardian .svl-hero,
          #svl-kpa-guardian .svl-grid-3 {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 760px) {
          #svl-kpa-guardian {
            padding: 24px 14px;
            border-radius: 22px;
          }
          
          #svl-kpa-guardian .svl-panel {
            padding: 18px;
          }
          
          #svl-kpa-guardian .svl-mini-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          
          #svl-kpa-guardian .svl-creator-box {
            grid-template-columns: 1fr;
          }
          
          #svl-kpa-guardian .svl-photo-frame {
            width: 140px;
            height: 140px;
          }
        }
      `}</style>

      <div className="svl-safety-net"></div>

      <HeroVideo />

      <div className="svl-shell">
        <div className="svl-topbar">
<<<<<<< HEAD
          <div className="svl-chip">Sanders Viopro Labs LLC • KPA • Keep People Alive</div>
=======
          <div className="svl-chip">Sanders Viopro Labs • KPA • Keep People Alive</div>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
          <div className="svl-stamp">SVL Guardian Active</div>
        </div>

        <div className="svl-hero">
          <div className="svl-panel">
            <div className="svl-overline">AI Agents • Voice Command Centers • Guardian System</div>
            <h2 className="svl-title">
              The <span className="accent">SVL KPA Ecosystem</span><br />
              built to guide, protect, and activate
            </h2>
            <p className="svl-copy">
<<<<<<< HEAD
              Sanders Viopro Labs LLC KPA (Keep People Alive) brings together A1, HATÄTA, Wisdom, plus voice-command centers: TokHealth, TokThru, and TokBuilding—all integrated inside an intelligent support system designed for guidance, oversight, and action.
=======
              Sanders Viopro Labs KPA (Keep People Alive) brings together A1, HATÄTA, Wisdom, plus voice-command centers: TokHealth, TokThru, and TokBuilding—all integrated inside an intelligent support system designed for guidance, oversight, and action.
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
            </p>

            <div className="svl-actions">
              <button className="svl-btn">Enter the Ecosystem</button>
              <button className="svl-btn-alt">See All Products</button>
            </div>

            <div className="svl-mini-stats">
              <div className="svl-stat">
                <strong>3</strong>
                <span>Core Agents</span>
              </div>
              <div className="svl-stat">
                <strong>3</strong>
                <span>Voice Centers</span>
              </div>
              <div className="svl-stat">
                <strong>7+</strong>
                <span>Total Products</span>
              </div>
              <div className="svl-stat">
                <strong>KPA</strong>
                <span>Mission: Keep Alive</span>
              </div>
            </div>
          </div>

          <div className="svl-panel">
            <div className="svl-creator-box">
              <div className="svl-photo-frame">
                <Image 
                  src="/jerome-founder.png" 
<<<<<<< HEAD
                  alt="Jerome Sanders, founder of Sanders Viopro Labs LLC"
=======
                  alt="Jerome Sanders, founder of Sanders Viopro Labs"
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
                  width={320}
                  height={400}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div style="padding: 14px; color: #b8c6d2; font-size: 13px; text-align: center; z-index: 2; position: relative;"><strong style="display: block; color: #f4f8fc; margin-bottom: 4px; font-size: 15px;">Jerome Photo</strong>Add founder image</div>';
                  }}
                />
              </div>

              <div>
                <h3 className="svl-side-title">Creator & Founder</h3>
                <p className="svl-side-copy">
<<<<<<< HEAD
                  Jerome Sanders founded Sanders Viopro Labs LLC with a singular mission: Keep People Alive. This ecosystem embodies his vision of intelligent systems that protect, guide, and activate real solutions for real people.
=======
                  Jerome Sanders founded Sanders Viopro Labs with a singular mission: Keep People Alive. This ecosystem embodies his vision of intelligent systems that protect, guide, and activate real solutions for real people.
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
