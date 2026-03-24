import RetroWindow from './RetroWindow';

interface Props { open: boolean; onClose: () => void; zIndex: number; onFocus: () => void; }

const categories = [
  {
    label: 'Languages',
    icon: '{ }',
    gradient: 'linear-gradient(135deg, #e8407e, #f472b6)',
    glow: 'rgba(232,64,126,0.25)',
    chipBg: 'rgba(232,64,126,0.08)',
    chipBorder: 'rgba(232,64,126,0.25)',
    chipColor: '#c0185e',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C / C++', 'SQL', 'HTML', 'CSS', 'GraphQL'],
  },
  {
    label: 'Frameworks',
    icon: '◈',
    gradient: 'linear-gradient(135deg, #9b6fd4, #c084fc)',
    glow: 'rgba(155,111,212,0.25)',
    chipBg: 'rgba(155,111,212,0.08)',
    chipBorder: 'rgba(155,111,212,0.25)',
    chipColor: '#7c3aed',
    items: ['React', 'Next.js', 'Node.js', 'Spring Boot', 'Flask', 'Angular', 'TensorFlow', 'PyTorch', 'JUnit'],
  },
  {
    label: 'Tools',
    icon: '⌘',
    gradient: 'linear-gradient(135deg, #6b7ee8, #93c5fd)',
    glow: 'rgba(107,126,232,0.25)',
    chipBg: 'rgba(107,126,232,0.08)',
    chipBorder: 'rgba(107,126,232,0.25)',
    chipColor: '#3b4fd4',
    items: ['AWS', 'Docker', 'Git', 'MongoDB', 'DynamoDB', 'Azure', 'Jira', 'Postman', 'PostgreSQL'],
  },
];

export default function SkillsWindow({ open, onClose, zIndex, onFocus }: Props) {
  return (
    <RetroWindow
      id="skills" open={open} onClose={onClose} zIndex={zIndex} onFocus={onFocus}
      accent="#c026d3" title="SKILLS" searchText="hridiukani.vercel.app/skills"
      url="https://hridiukani.vercel.app" bodyClass="r-body--skills"
      initialPos={{ x: 120, y: 100 }} initialSize={{ w: 860, h: 400 }}
    >
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12,
        padding: 4, height: '100%',
      }}>
        {categories.map(({ label, icon, gradient, glow, chipBg, chipBorder, chipColor, items }, ci) => (
          <div key={label} style={{
            background: 'white',
            border: '1.5px solid rgba(220,200,230,0.6)',
            borderRadius: 14,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: `0 4px 20px ${glow}`,
          }}>
            {/* Card header */}
            <div style={{
              background: gradient,
              padding: '14px 16px 12px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)',
                fontFamily: 'monospace', lineHeight: 1,
              }}>{icon}</span>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600, fontSize: '0.75rem',
                letterSpacing: '0.18em', color: 'white',
                textTransform: 'uppercase',
              }}>{label}</span>
            </div>

            {/* Chips */}
            <div style={{
              padding: '12px 12px', display: 'flex',
              flexWrap: 'wrap', gap: 6, alignContent: 'flex-start',
              flex: 1,
            }}>
              {items.map((skill, i) => (
                <span key={skill} className="skill-pill" style={{
                  background: chipBg,
                  border: `1px solid ${chipBorder}`,
                  color: chipColor,
                  animationDelay: `${ci * 0.1 + i * 0.05}s`,
                  fontSize: '0.68rem',
                  fontWeight: 500,
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RetroWindow>
  );
}
