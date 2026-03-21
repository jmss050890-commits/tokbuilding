'use client';

import { useState, useRef, useEffect } from 'react';

export default function HeroVideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #020812 0%, #071624 100%)',
      color: '#f4f8fc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, Helvetica, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        maxWidth: '800px',
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 56px)',
          fontWeight: 900,
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}>
          SVL KPA Hero Video
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#b8c6d2',
          lineHeight: 1.6,
          marginBottom: '8px',
        }}>
          Sanders Viopro Labs Ecosystem Showcase
        </p>
        <p style={{
          fontSize: '14px',
          color: '#7cf5ff',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 800,
        }}>
          Ambient Background Experience
        </p>
      </div>

      {/* Video Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        aspectRatio: '16 / 9',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#000',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.42)',
        marginBottom: '30px',
      }}>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          autoPlay
          muted={isMuted}
          loop
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '80px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '16px',
          gap: '12px',
          zIndex: 10,
        }}>
          <button
            onClick={togglePlayPause}
            style={{
              background: 'rgba(57,184,255,0.2)',
              border: '1px solid rgba(57,184,255,0.4)',
              color: '#39b8ff',
              padding: '10px 16px',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 800,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(57,184,255,0.3)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(57,184,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(57,184,255,0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          <button
            onClick={toggleMute}
            style={{
              background: 'rgba(124,245,255,0.2)',
              border: '1px solid rgba(124,245,255,0.4)',
              color: '#7cf5ff',
              padding: '10px 16px',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 800,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(124,245,255,0.3)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(124,245,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(124,245,255,0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isMuted ? '🔇 Muted' : '🔊 Sound'}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        maxWidth: '800px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '20px',
        padding: '24px',
        backdropFilter: 'blur(10px)',
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 800,
          marginBottom: '12px',
          color: '#7cf5ff',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          Video Details
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '16px',
        }}>
          <div>
            <p style={{ color: '#b8c6d2', fontSize: '13px', marginBottom: '4px' }}>File Location</p>
            <p style={{ color: '#f4f8fc', fontSize: '14px', fontWeight: 600 }}>/public/hero-video.mp4</p>
          </div>
          
          <div>
            <p style={{ color: '#b8c6d2', fontSize: '13px', marginBottom: '4px' }}>Video Type</p>
            <p style={{ color: '#f4f8fc', fontSize: '14px', fontWeight: 600 }}>MP4 • 16:9 Aspect</p>
          </div>

          <div>
            <p style={{ color: '#b8c6d2', fontSize: '13px', marginBottom: '4px' }}>Playback</p>
            <p style={{ color: '#f4f8fc', fontSize: '14px', fontWeight: 600 }}>Auto-loop • Muted Default</p>
          </div>
        </div>

        <p style={{
          color: '#b8c6d2',
          fontSize: '14px',
          lineHeight: 1.6,
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          This video is used as an ambient background element in the SVL Guardian hero section on the TokStore page. It loops continuously at 40% opacity to create an atmospheric backdrop while users explore the SVL KPA ecosystem products.
        </p>
      </div>

      {/* Navigation */}
      <div style={{
        marginTop: '40px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        <a href="/tokstore" style={{
          padding: '12px 24px',
          background: 'linear-gradient(90deg, #7cf5ff, #39b8ff)',
          color: '#06131a',
          textDecoration: 'none',
          borderRadius: '999px',
          fontWeight: 800,
          fontSize: '14px',
          transition: 'transform 0.25s ease',
          cursor: 'pointer',
          border: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          View TokStore Hero
        </a>
        
        <a href="/sanders-viopro-labs" style={{
          padding: '12px 24px',
          background: 'rgba(255,255,255,0.08)',
          color: '#f4f8fc',
          textDecoration: 'none',
          borderRadius: '999px',
          fontWeight: 800,
          fontSize: '14px',
          border: '1px solid rgba(255,255,255,0.16)',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        }}>
          SVL Hub
        </a>
      </div>
    </div>
  );
}
