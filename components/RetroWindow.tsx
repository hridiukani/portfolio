'use client';
import { useEffect, useRef, useState } from 'react';

interface RetroWindowProps {
  id: string;
  open: boolean;
  onClose: () => void;
  accent: string;
  title: string;
  searchText: string;
  url: string;
  heartsChar?: string;
  bodyClass?: string;
  children: React.ReactNode;
  zIndex: number;
  onFocus: () => void;
  initialPos: { x: number; y: number };
}

type ResizeDir = 'e' | 's' | 'w' | 'n' | 'se' | 'sw' | 'ne' | 'nw';

const MIN_W = 420;
const MIN_H = 260;

export default function RetroWindow({
  open, onClose, accent, title, searchText, url,
  heartsChar = '♥ ✦', bodyClass = 'r-body', children,
  zIndex, onFocus, initialPos,
}: RetroWindowProps) {
  const [pos,  setPos]  = useState(initialPos);
  const [size, setSize] = useState({ w: 700, h: 340 });

  const dragging  = useRef(false);
  const resizing  = useRef<ResizeDir | null>(null);
  const dragOff   = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ mx: 0, my: 0, x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) {
        setPos({ x: e.clientX - dragOff.current.x, y: e.clientY - dragOff.current.y });
        return;
      }
      if (!resizing.current) return;
      const dir = resizing.current;
      const { mx, my, x, y, w, h } = resizeStart.current;
      const dx = e.clientX - mx;
      const dy = e.clientY - my;

      let newW = w, newH = h, newX = x, newY = y;

      if (dir.includes('e')) newW = Math.max(MIN_W, w + dx);
      if (dir.includes('s')) newH = Math.max(MIN_H, h + dy);
      if (dir.includes('w')) { newW = Math.max(MIN_W, w - dx); newX = x + (w - newW); }
      if (dir.includes('n')) { newH = Math.max(MIN_H, h - dy); newY = y + (h - newH); }

      setSize({ w: newW, h: newH });
      setPos({ x: newX, y: newY });
    };

    const onUp = () => {
      dragging.current = false;
      resizing.current = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const startResize = (e: React.MouseEvent, dir: ResizeDir) => {
    e.preventDefault();
    e.stopPropagation();
    resizing.current = dir;
    resizeStart.current = { mx: e.clientX, my: e.clientY, x: pos.x, y: pos.y, w: size.w, h: size.h };
    onFocus();
  };

  const hearts = Array(40).fill(heartsChar).join(' ');

  // Resize handle style helper
  const handle = (dir: ResizeDir, style: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute', zIndex: 10,
    ...style,
    cursor: `${dir}-resize`,
  });

  if (!open) return null;

  return (
    <div
      className="animate-pop"
      style={{
        position: 'fixed',
        left: pos.x, top: pos.y,
        width: size.w, height: size.h,
        display: 'flex', flexDirection: 'column',
        border: '2.5px solid #1a0810',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '5px 5px 0 #c44d82, 10px 10px 0 #e890b8, 0 28px 60px rgba(100,20,60,0.28)',
        userSelect: 'none',
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      {/* ── Resize handles ── */}
      {/* Edges */}
      <div onMouseDown={e => startResize(e, 'e')}  style={handle('e',  { right: 0,  top: 8,    width: 6,  bottom: 8 })} />
      <div onMouseDown={e => startResize(e, 's')}  style={handle('s',  { bottom: 0, left: 8,   height: 6, right: 8 })} />
      <div onMouseDown={e => startResize(e, 'w')}  style={handle('w',  { left: 0,   top: 8,    width: 6,  bottom: 8 })} />
      <div onMouseDown={e => startResize(e, 'n')}  style={handle('n',  { top: 0,    left: 8,   height: 6, right: 8 })} />
      {/* Corners */}
      <div onMouseDown={e => startResize(e, 'se')} style={handle('se', { right: 0,  bottom: 0, width: 12, height: 12 })} />
      <div onMouseDown={e => startResize(e, 'sw')} style={handle('sw', { left: 0,   bottom: 0, width: 12, height: 12 })} />
      <div onMouseDown={e => startResize(e, 'ne')} style={handle('ne', { right: 0,  top: 0,    width: 12, height: 12 })} />
      <div onMouseDown={e => startResize(e, 'nw')} style={handle('nw', { left: 0,   top: 0,    width: 12, height: 12 })} />

      {/* ── Title bar ── */}
      <div
        style={{ background: accent, display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', cursor: 'grab', flexShrink: 0 }}
        onMouseDown={e => {
          if ((e.target as HTMLElement).closest('button')) return;
          dragging.current = true;
          dragOff.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
          onFocus();
          e.preventDefault();
        }}
      >
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f56', '#ffbd2e', '#27c93f'].map((c, i) => (
            <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,0.18)', display: 'inline-block' }} />
          ))}
        </div>
        <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 400, fontSize: '0.7rem', color: 'white', letterSpacing: '0.22em', flexShrink: 0 }}>
          {title}
        </span>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 4, padding: '2px 8px', fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.1em', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          🔍 {searchText}
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontSize: '0.62rem', cursor: 'pointer', padding: '2px 7px', borderRadius: 3, flexShrink: 0 }}>✕</button>
      </div>

      {/* ── URL bar ── */}
      <div className="r-urlbar" style={{ flexShrink: 0 }}>
        <span className="r-refresh">↺</span>
        <div className="r-url">{url}</div>
        <span className="r-urlicon">✉</span>
      </div>

      {/* ── Hearts strip ── */}
      <div className="r-hearts" style={{ background: accent, flexShrink: 0 }}>{hearts}</div>

      {/* ── Content (fills remaining height) ── */}
      <div className={bodyClass} style={{ flex: 1, minHeight: 0 }}>{children}</div>

      {/* ── Loading bar ── */}
      <div className="r-loading" style={{ flexShrink: 0 }}>
        Loading... <span className="r-bar" style={{ color: accent }}>{'█'.repeat(36)}</span>
      </div>
    </div>
  );
}
