import RetroWindow from './RetroWindow';

interface Props { open: boolean; onClose: () => void; zIndex: number; onFocus: () => void; }

const skills = {
  Languages: {
    color: '#e8407e', bg: 'rgba(232,64,126,0.12)', border: 'rgba(232,64,126,0.3)',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C/C++', 'SQL', 'HTML', 'CSS', 'Rust', 'Go', 'GraphQL', 'MySQL'],
  },
  Frameworks: {
    color: '#9b6fd4', bg: 'rgba(155,111,212,0.12)', border: 'rgba(155,111,212,0.3)',
    items: ['React', 'Next.js', 'Node.js', 'Spring Boot', 'Flask', 'Angular', 'TensorFlow', 'PyTorch', 'PostgreSQL', 'JUnit'],
  },
  Tools: {
    color: '#6b7ee8', bg: 'rgba(107,126,232,0.12)', border: 'rgba(107,126,232,0.3)',
    items: ['AWS', 'Docker', 'Git', 'MongoDB', 'DynamoDB', 'Azure', 'Jira', 'Postman', 'PyCharm', 'WordPress'],
  },
};

export default function SkillsWindow({ open, onClose, zIndex, onFocus }: Props) {
  return (
    <RetroWindow
      id="skills" open={open} onClose={onClose} zIndex={zIndex} onFocus={onFocus}
      accent="#c026d3" title="SKILLS" searchText="ALWAYS LEARNING !!!"
      url="https://hridiukani.vercel.app" bodyClass="r-body--skills"
      initialPos={{ x: 160, y: 160 }}
    >
      {Object.entries(skills).map(([cat, { color, bg, border, items }], ci) => (
        <div key={cat} style={{ marginBottom: ci < 2 ? 16 : 0 }}>
          <div style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: '0.6rem', fontWeight: 400,
            letterSpacing: '0.2em', color,
            marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {cat.toUpperCase()}
            <div style={{ flex: 1, height: 1, background: border }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {items.map((skill, i) => (
              <span key={skill} className="skill-pill" style={{
                background: bg, border: `1px solid ${border}`, color,
                animationDelay: `${ci * 0.15 + i * 0.04}s`,
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </RetroWindow>
  );
}
