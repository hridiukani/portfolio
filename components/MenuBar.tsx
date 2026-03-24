'use client';
import { useEffect, useState } from 'react';

export default function MenuBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 38, zIndex: 500,
      background: 'rgba(8, 2, 6, 0.96)',
      backdropFilter: 'blur(40px) saturate(200%)',
      WebkitBackdropFilter: 'blur(40px) saturate(200%)',
      borderBottom: '1px solid rgba(232, 64, 126, 0.4)',
      boxShadow: '0 1px 30px rgba(232, 64, 126, 0.12), 0 0 0 0.5px rgba(255,110,176,0.1)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      userSelect: 'none',
    }}>

      {/* Left — logo + nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, height: '100%' }}>

        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          marginRight: 24, paddingRight: 24,
          borderRight: '1px solid rgba(255,110,176,0.15)',
          height: '100%',
        }}>
          <span style={{ color: '#ff4da6', fontSize: '0.9rem' }}>✦</span>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 400, fontSize: '0.8rem',
            letterSpacing: '0.22em',
            color: 'white',
            textTransform: 'lowercase',
          }}>hridi.os</span>
        </div>

        {/* Nav items */}
        {['portfolio', 'works', 'contact', 'resume'].map(label => (
          <MenuBarItem key={label} label={label} />
        ))}
      </div>

      {/* Right — date + time pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.62rem', fontWeight: 300,
          letterSpacing: '0.08em',
          color: 'rgba(255,180,210,0.5)',
        }} suppressHydrationWarning>{date}</span>

        <div style={{
          background: 'rgba(232, 64, 126, 0.15)',
          border: '1px solid rgba(232, 64, 126, 0.3)',
          borderRadius: 6,
          padding: '3px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ color: '#ff6eb0', fontSize: '0.55rem' }}>●</span>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '0.7rem', fontWeight: 400,
            letterSpacing: '0.1em',
            color: '#ffb3d9',
          }} suppressHydrationWarning>{time}</span>
        </div>
      </div>
    </div>
  );
}

function MenuBarItem({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '0.68rem', fontWeight: 300,
        letterSpacing: '0.12em',
        color: hovered ? 'white' : 'rgba(255,180,210,0.6)',
        background: hovered ? 'rgba(255,255,255,0.08)' : 'transparent',
        padding: '4px 12px',
        borderRadius: 4,
        cursor: 'default',
        transition: 'color 0.15s, background 0.15s',
        height: '100%',
        display: 'flex', alignItems: 'center',
      }}
    >{label}</span>
  );
}
