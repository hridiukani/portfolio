'use client';
import { useState, useCallback, useEffect } from 'react';
import ProfileWindow from '@/components/ProfileWindow';
import WorksWindow from '@/components/WorksWindow';
import ContactWindow from '@/components/ContactWindow';
import ResumeWindow from '@/components/ResumeWindow';
import BootScreen from '@/components/BootScreen';
import MenuBar from '@/components/MenuBar';
import DesktopIcon from '@/components/DesktopIcon';
import SkillsWindow from '@/components/SkillsWindow';

type WindowName = 'profile' | 'works' | 'contact' | 'resume' | 'skills';

const FolderIcon = () => (
  <svg width="80" height="68" viewBox="0 0 100 82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 6 14 Q 2 14 2 18 L 2 74 Q 2 80 7 80 L 93 80 Q 98 80 98 75 L 98 26 L 44 26 L 40 14 Z"
      fill="#f0a0c4" stroke="#c44d82" strokeWidth="2.5" strokeLinejoin="round"/>
    <rect x="2" y="32" width="96" height="48" rx="5" fill="#fcd8eb" stroke="#c44d82" strokeWidth="2.5"/>
    <rect x="27" y="42" width="46" height="28" rx="2" fill="#89b4fa" stroke="#5a8be8" strokeWidth="1.5"/>
  </svg>
);

const dockLinks = [
  { href: 'https://linkedin.com/in/hridiukani1807', title: 'LinkedIn', bg: 'linear-gradient(135deg,#38bdf8,#0077b5)',
    svg: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { href: 'https://github.com/hridiukani', title: 'GitHub', bg: 'linear-gradient(135deg,#c084fc,#7c3aed)',
    svg: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
];


function DockIcon({ href, title, bg, children }: { href: string; title: string; bg: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {hovered && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 12px)',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          color: '#1a0a14', fontSize: '0.72rem',
          fontFamily: "'Syne', sans-serif", fontWeight: 500,
          letterSpacing: '0.04em',
          padding: '5px 12px', borderRadius: 8, whiteSpace: 'nowrap',
          pointerEvents: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08), inset 0 0.5px 0 rgba(255,255,255,0.9)',
          border: '0.5px solid rgba(0,0,0,0.08)',
        }}>{title}</div>
      )}
      <a href={href} target="_blank" style={{
        width: 50, height: 50, borderRadius: 14, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-8px) scale(1.12)' : '',
        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
        {children}
      </a>
    </div>
  );
}

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [iconPos, setIconPos] = useState<Record<WindowName, { x: number; y: number }> | null>(null);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const mb = 46;
    setIconPos({
      profile: { x: Math.round(w * 0.08),        y: mb + Math.round(h * 0.07) },
      works:   { x: Math.round(w * 0.08),        y: Math.round(h * 0.38) },
      skills:  { x: Math.round(w * 0.08),        y: Math.round(h * 0.65) },
      contact: { x: Math.round(w * 0.92 - 90),   y: mb + Math.round(h * 0.07) },
      resume:  { x: Math.round(w * 0.92 - 90),   y: Math.round(h * 0.42) },
    });
  }, []);

  const [open, setOpen] = useState<Record<WindowName, boolean>>({
    profile: false, works: false, contact: false, resume: false, skills: false,
  });
  const [zOrder, setZOrder] = useState<Record<WindowName, number>>({
    profile: 100, works: 101, contact: 102, resume: 103, skills: 104,
  });
  const [topZ, setTopZ] = useState(105);

  const openWindow = (name: WindowName) => {
    setOpen(o => ({ ...o, [name]: true }));
    focus(name);
  };

  const focus = useCallback((name: WindowName) => {
    setTopZ(z => {
      const next = z + 1;
      setZOrder(o => ({ ...o, [name]: next }));
      return next;
    });
  }, []);

  const close = (name: WindowName) => setOpen(o => ({ ...o, [name]: false }));

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', overflow: 'hidden' }}>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      <MenuBar />

      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      {/* Big title */}
      <h1 style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Syne', sans-serif", fontStyle: 'normal', fontWeight: 300,
        fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '0.12em',
        color: 'var(--text-title)', opacity: 0.15, whiteSpace: 'nowrap',
        pointerEvents: 'none', userSelect: 'none',
      }}>
        Hridi Ukani
      </h1>


      {/* Desktop icons — rendered only after positions are computed client-side */}
      {iconPos && (
        <>
          <DesktopIcon x={iconPos.profile.x} y={iconPos.profile.y} label="profile" onOpen={() => openWindow('profile')}>
            <div style={{
              width: 72, height: 72,
              background: 'linear-gradient(135deg, #e8407e 0%, #c8a0e0 100%)',
              borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Syne', sans-serif", fontWeight: 200, fontSize: '1.7rem', color: 'white',
              boxShadow: '0 4px 18px rgba(232,64,126,0.32)',
            }}>HU</div>
          </DesktopIcon>

          <DesktopIcon x={iconPos.works.x}   y={iconPos.works.y}   label="works"   onOpen={() => openWindow('works')}>
            <FolderIcon />
          </DesktopIcon>

          <DesktopIcon x={iconPos.skills.x}   y={iconPos.skills.y}   label="skills"   onOpen={() => openWindow('skills')}>
            <FolderIcon />
          </DesktopIcon>

          <DesktopIcon x={iconPos.contact.x} y={iconPos.contact.y} label="contact" onOpen={() => openWindow('contact')}>
            <FolderIcon />
          </DesktopIcon>

          <DesktopIcon x={iconPos.resume.x}  y={iconPos.resume.y}  label="resume"  onOpen={() => openWindow('resume')}>
            <FolderIcon />
          </DesktopIcon>
        </>
      )}

      {/* Floating dock */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,228,242,0.38)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255,190,220,0.55)',
        borderRadius: 28, padding: '14px 24px',
        display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: '0 16px 48px rgba(232,64,126,0.2), 0 4px 16px rgba(200,40,100,0.1), inset 0 1px 0 rgba(255,255,255,0.65)',
      }}>
        {dockLinks.map(({ href, title, bg, svg }) => (
          <DockIcon key={title} href={href} title={title} bg={bg}>{svg}</DockIcon>
        ))}
      </div>

      {/* Windows */}
      <ProfileWindow open={open.profile} onClose={() => close('profile')} zIndex={zOrder.profile} onFocus={() => focus('profile')} />
      <WorksWindow   open={open.works}   onClose={() => close('works')}   zIndex={zOrder.works}   onFocus={() => focus('works')} />
      <ContactWindow open={open.contact} onClose={() => close('contact')} zIndex={zOrder.contact} onFocus={() => focus('contact')} />
      <ResumeWindow  open={open.resume}  onClose={() => close('resume')}  zIndex={zOrder.resume}  onFocus={() => focus('resume')} />
      <SkillsWindow  open={open.skills}  onClose={() => close('skills')}  zIndex={zOrder.skills}  onFocus={() => focus('skills')} />

    </div>
  );
}
