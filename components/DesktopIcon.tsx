'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  x: number;
  y: number;
  label: string;
  onOpen: () => void;
  children: React.ReactNode;
}

export default function DesktopIcon({ x, y, label, onOpen, children }: Props) {
  const [pos, setPos]       = useState({ x, y });
  const [selected, setSelected] = useState(false);
  const dragging  = useRef(false);
  const didMove   = useRef(false);
  const origin    = useRef({ mx: 0, my: 0, ix: 0, iy: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - origin.current.mx;
      const dy = e.clientY - origin.current.my;
      if (!didMove.current && Math.hypot(dx, dy) < 5) return;
      didMove.current = true;
      setPos({ x: origin.current.ix + dx, y: origin.current.iy + dy });
    };

    const onUp = () => {
      if (dragging.current && !didMove.current) {
        onOpen();
      }
      dragging.current = false;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [onOpen]);

  // Deselect when clicking elsewhere
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el?.closest(`[data-icon="${label}"]`)) setSelected(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [label]);

  return (
    <div
      data-icon={label}
      onMouseDown={e => {
        e.preventDefault();
        dragging.current = true;
        didMove.current  = false;
        origin.current   = { mx: e.clientX, my: e.clientY, ix: pos.x, iy: pos.y };
        setSelected(true);
      }}
      style={{
        position: 'absolute',
        left: pos.x, top: pos.y,
        width: 90, textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        userSelect: 'none',
        cursor: 'default',
        zIndex: selected ? 10 : 1,
      }}
    >
      {/* Icon with selection ring */}
      <div style={{
        borderRadius: 12,
        outline: selected ? '2px solid rgba(232,64,126,0.6)' : '2px solid transparent',
        outlineOffset: 4,
        transition: 'outline-color 0.15s',
      }}>
        {children}
      </div>

      {/* Label with selection highlight */}
      <span style={{
        fontFamily: "'Josefin Sans', sans-serif",
        fontWeight: 300, fontSize: '0.85rem',
        letterSpacing: '0.06em',
        color: selected ? '#fff' : 'var(--text-muted)',
        background: selected ? 'rgba(232,64,126,0.55)' : 'transparent',
        padding: selected ? '1px 8px' : '1px 8px',
        borderRadius: 4,
        transition: 'background 0.15s, color 0.15s',
      }}>
        {label}
      </span>
    </div>
  );
}
