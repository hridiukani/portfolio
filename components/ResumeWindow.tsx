import RetroWindow from './RetroWindow';

interface Props { open: boolean; onClose: () => void; zIndex: number; onFocus: () => void; }

const jobs = [
  { role: 'SOFTWARE ENGINEERING INTERN', company: 'Extra Sauce Agency · Tempe, AZ', date: 'SEP 2025 – PRESENT' },
  { role: 'RESEARCH ASSISTANT', company: 'Data Mining & ML Lab, ASU · Tempe, AZ', date: 'JUN 2025 – PRESENT' },
  { role: 'SOFTWARE ENGINEERING INTERN', company: 'Hacker in Heels · Tempe, AZ', date: 'SEP – NOV 2025' },
  { role: 'TEACHING ASSISTANT', company: 'Fulton School of Engineering, ASU', date: 'AUG – DEC 2024' },
];

export default function ResumeWindow({ open, onClose, zIndex, onFocus }: Props) {
  return (
    <RetroWindow
      id="resume" open={open} onClose={onClose} zIndex={zIndex} onFocus={onFocus}
      accent="#d43a6e" title="EXPERIENCE" searchText="LOOKING FOR ATTENTION !!!"
      url="https://hridiukani.vercel.app/resume" bodyClass="r-body r-body--exp"
      initialPos={{ x: 240, y: 140 }}
    >
      {jobs.map(j => (
        <div className="r-exp-item" key={j.role + j.company}>
          <div className="r-exp-info">
            <span className="r-exp-role">{j.role}</span>
            <span className="r-exp-company">{j.company}</span>
          </div>
          <span className="r-exp-date" style={{ background: '#d43a6e' }}>{j.date}</span>
        </div>
      ))}
      <div style={{ textAlign: 'center', padding: '4px 0' }}>
        <a href="/resume.pdf" download className="r-dl-btn" style={{ background: '#d43a6e' }}>↓ Download Full Resume</a>
      </div>
    </RetroWindow>
  );
}
