'use client';
import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const MESSAGES = [
  { text: 'HRIDI.OS  v2026.1',          style: 'header'  },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', style: 'divider' },
  { text: '[ OK ]  loading system fonts...'               },
  { text: '[ OK ]  mounting aesthetic modules...'         },
  { text: '[ OK ]  initializing pink protocol...'         },
  { text: '[ OK ]  compiling sparkle engine  v3.97...'   },
  { text: '[ OK ]  verifying gpa: 3.97  ✓'               },
  { text: '[ OK ]  connecting to arizona state univ...'  },
  { text: '[ OK ]  loading portfolio database...'         },
  { text: '[ OK ]  connecting to hridiukani.vercel.app...' },
  { text: ''                                              },
  { text: '  all systems go.  welcome back, hridi  ♥',   style: 'success'  },
];

export default function BootScreen({ onComplete }: Props) {
  const [visible, setVisible]   = useState(0);
  const [showBar, setShowBar]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [fading, setFading]     = useState(false);

  // Reveal lines one by one
  useEffect(() => {
    MESSAGES.forEach((_, i) => {
      setTimeout(() => {
        setVisible(i + 1);
        if (i === MESSAGES.length - 1) {
          setTimeout(() => setShowBar(true), 400);
        }
      }, 400 + i * 200);
    });
  }, []);

  // Animate loading bar once it appears
  useEffect(() => {
    if (!showBar) return;
    let p = 0;
    const iv = setInterval(() => {
      p += 1.5;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          setFading(true);
          setTimeout(onComplete, 900);
        }, 500);
      }
    }, 18);
    return () => clearInterval(iv);
  }, [showBar, onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#080006',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Courier New', Courier, monospace",
      opacity: fading ? 0 : 1,
      transition: fading ? 'opacity 0.9s ease' : 'none',
      pointerEvents: fading ? 'none' : 'all',
    }}>

      {/* CRT scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
      }} />

      {/* Subtle pink vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(180,0,80,0.18) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, width: 560 }}>

        {MESSAGES.slice(0, visible).map((msg, i) => (
          <div key={i} style={{
            fontSize:      msg.style === 'header' ? '1.35rem' : '0.83rem',
            fontWeight:    msg.style === 'header' ? 700 : 400,
            color:         msg.style === 'header'  ? '#ff6eb0'
                         : msg.style === 'divider' ? '#4a1535'
                         : msg.style === 'success' ? '#b8ffb0'
                         : '#ff9ec8',
            letterSpacing: msg.style === 'header' ? '0.28em' : '0.04em',
            lineHeight: 1.7,
            marginBottom: msg.style === 'header' ? 6 : 2,
            textShadow: msg.style === 'header' ? '0 0 20px rgba(255,110,176,0.7)' : msg.style === 'success' ? '0 0 12px rgba(184,255,176,0.5)' : 'none',
          }}>
            {msg.text || '\u00A0'}
            {/* Blinking cursor on last visible line */}
            {i === visible - 1 && !showBar && (
              <span style={{ animation: 'bootblink 0.9s step-end infinite', marginLeft: 2 }}>▋</span>
            )}
          </div>
        ))}

        {/* Loading bar */}
        {showBar && (
          <div style={{ marginTop: 20 }}>
            <div style={{ color: '#ff9ec8', fontSize: '0.78rem', letterSpacing: '0.1em', marginBottom: 8 }}>
              booting desktop environment...
            </div>
            <div style={{ background: '#200818', borderRadius: 3, height: 8, width: '100%', border: '1px solid #4a1535' }}>
              <div style={{
                height: '100%', borderRadius: 3,
                background: 'linear-gradient(90deg, #e8407e, #c8a0e0, #ff9ec8)',
                width: `${progress}%`,
                boxShadow: '0 0 12px rgba(232,64,126,0.7)',
                transition: 'width 0.018s linear',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ color: '#4a1535', fontSize: '0.65rem', letterSpacing: '0.08em' }}>hridi.os</span>
              <span style={{ color: '#ff6eb0', fontSize: '0.65rem', letterSpacing: '0.08em' }}>{Math.floor(progress)}%</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bootblink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
