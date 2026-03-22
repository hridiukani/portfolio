'use client';
import { useEffect, useRef, useState } from 'react';

export default function NowPlaying() {
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [ready, setReady]     = useState(false);
  const [progress, setProgress] = useState(38);
  const [playing, setPlaying] = useState(true);

  const dragging = useRef(false);
  const didMove  = useRef(false);
  const origin   = useRef({ mx: 0, my: 0, ix: 0, iy: 0 });

  useEffect(() => {
    setPos({ x: window.innerWidth - 290 - 24, y: window.innerHeight - 220 });
    setReady(true);
  }, []);

  // Creep progress bar forward
  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setProgress(p => p >= 100 ? 0 : +(p + 0.08).toFixed(2)), 150);
    return () => clearInterval(iv);
  }, [playing]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - origin.current.mx;
      const dy = e.clientY - origin.current.my;
      if (!didMove.current && Math.hypot(dx, dy) < 5) return;
      didMove.current = true;
      setPos({ x: origin.current.ix + dx, y: origin.current.iy + dy });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const fmt = (pct: number) => {
    const total = 175;
    const s = Math.floor((pct / 100) * total);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  if (!ready) return null;

  return (
    <div
      style={{
        position: 'fixed', left: pos.x, top: pos.y,
        width: 270, zIndex: 300,
        background: 'rgba(8, 2, 6, 0.93)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: '1px solid rgba(232,64,126,0.22)',
        borderRadius: 18,
        padding: '14px 16px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(232,64,126,0.08)',
        cursor: 'grab', userSelect: 'none',
      }}
      onMouseDown={e => {
        dragging.current = true; didMove.current = false;
        origin.current = { mx: e.clientX, my: e.clientY, ix: pos.x, iy: pos.y };
        e.preventDefault();
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>

        {/* Album art */}
        <div style={{
          width: 50, height: 50, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, #e8407e 0%, #c8a0e0 50%, #ff9ec8 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', boxShadow: '0 4px 16px rgba(232,64,126,0.45)',
        }}>♪</div>

        {/* Song info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.78rem', fontWeight: 400, color: 'white', letterSpacing: '0.06em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Espresso
          </div>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.62rem', fontWeight: 300, color: 'rgba(255,160,200,0.55)', letterSpacing: '0.05em', marginTop: 2 }}>
            Sabrina Carpenter
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
            <span style={{ color: 'rgba(255,160,200,0.4)', fontSize: '0.75rem', cursor: 'pointer' }}>⏮</span>
            <span
              onClick={e => { e.stopPropagation(); setPlaying(p => !p); }}
              style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'linear-gradient(135deg, #e8407e, #c8a0e0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', color: 'white', cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(232,64,126,0.5)',
              }}
            >{playing ? '⏸' : '▶'}</span>
            <span style={{ color: 'rgba(255,160,200,0.4)', fontSize: '0.75rem', cursor: 'pointer' }}>⏭</span>
          </div>
        </div>

        {/* Equalizer bars */}
        {playing && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 22, flexShrink: 0 }}>
            {[0.5, 0.9, 0.65, 1, 0.75, 0.55].map((h, i) => (
              <div key={i} style={{
                width: 3, background: `linear-gradient(to top, #e8407e, #c8a0e0)`,
                borderRadius: 2, height: `${h * 100}%`,
                animation: `eq${i} ${0.35 + i * 0.08}s ease-in-out infinite alternate`,
                transformOrigin: 'bottom',
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 14 }}>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 3, cursor: 'pointer' }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: 'linear-gradient(90deg, #e8407e, #c8a0e0)',
            width: `${progress}%`,
            boxShadow: '0 0 8px rgba(232,64,126,0.6)',
            transition: 'width 0.15s linear',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.55rem', color: 'rgba(255,160,200,0.35)' }}>{fmt(progress)}</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.55rem', color: 'rgba(255,160,200,0.35)' }}>2:55</span>
        </div>
      </div>

      {/* Spotify-style source label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ color: '#1db954', fontSize: '0.55rem' }}>●</span>
        <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.55rem', color: 'rgba(255,160,200,0.3)', letterSpacing: '0.1em' }}>PLAYING ON SPOTIFY</span>
      </div>

      <style>{`
        @keyframes eq0 { from { transform: scaleY(0.25); } to { transform: scaleY(1); } }
        @keyframes eq1 { from { transform: scaleY(0.4);  } to { transform: scaleY(1); } }
        @keyframes eq2 { from { transform: scaleY(0.3);  } to { transform: scaleY(1); } }
        @keyframes eq3 { from { transform: scaleY(0.2);  } to { transform: scaleY(1); } }
        @keyframes eq4 { from { transform: scaleY(0.5);  } to { transform: scaleY(1); } }
        @keyframes eq5 { from { transform: scaleY(0.35); } to { transform: scaleY(1); } }
      `}</style>
    </div>
  );
}
