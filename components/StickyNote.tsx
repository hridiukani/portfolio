'use client';
import { useEffect, useRef, useState } from 'react';

export default function StickyNote() {
  const [pos, setPos]   = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  const dragging = useRef(false);
  const didMove  = useRef(false);
  const origin   = useRef({ mx: 0, my: 0, ix: 0, iy: 0 });

  useEffect(() => {
    setPos({ x: window.innerWidth / 2 + 60, y: window.innerHeight * 0.58 });
    setReady(true);
  }, []);

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

  if (!ready) return null;

  return (
    <div
      style={{
        position: 'fixed', left: pos.x, top: pos.y, zIndex: 250,
        width: 168,
        background: 'linear-gradient(160deg, #ffd6e7 0%, #ffbcd9 100%)',
        borderRadius: '2px 2px 2px 2px',
        transform: 'rotate(-2.8deg)',
        boxShadow: '4px 4px 0 rgba(200,64,120,0.18), 0 8px 24px rgba(200,64,120,0.18)',
        cursor: 'grab', userSelect: 'none',
        overflow: 'hidden',
      }}
      onMouseDown={e => {
        dragging.current = true; didMove.current = false;
        origin.current = { mx: e.clientX, my: e.clientY, ix: pos.x, iy: pos.y };
        e.preventDefault();
      }}
    >
      {/* Top tape strip */}
      <div style={{
        height: 26, background: 'rgba(232,64,126,0.25)',
        borderBottom: '1px solid rgba(232,64,126,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 40, height: 10, background: 'rgba(255,255,255,0.45)', borderRadius: 2 }} />
      </div>

      {/* Note body */}
      <div style={{ padding: '12px 14px 16px' }}>
        <p style={{
          fontFamily: "'Caveat', cursive",
          fontSize: '1.05rem', lineHeight: 1.55,
          color: '#8b1a4a', margin: 0,
        }}>
          hire me!! ♥<br />
          i promise i&apos;m<br />
          really fun too<br />
          <span style={{ fontSize: '0.9rem' }}>✦ ✦ ✦</span>
        </p>

        {/* Ruled lines */}
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ height: 1, background: 'rgba(200,64,120,0.18)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
