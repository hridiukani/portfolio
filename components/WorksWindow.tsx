import RetroWindow from './RetroWindow';

interface Props { open: boolean; onClose: () => void; zIndex: number; onFocus: () => void; }

export default function WorksWindow({ open, onClose, zIndex, onFocus }: Props) {
  return (
    <RetroWindow
      id="works" open={open} onClose={onClose} zIndex={zIndex} onFocus={onFocus}
      accent="#9b6fd4" title="PROJECTS" searchText="LOOKING FOR ATTENTION !!!"
      url="https://github.com/hridiukani" bodyClass="r-body r-body--projects"
      initialPos={{ x: 120, y: 120 }}
    >
      <div className="r-proj-card">
        <div className="r-proj-header">
          <span className="r-proj-name">FLOWDESK</span>
          <span className="r-proj-date" style={{ background: '#9b6fd4' }}>DEC 2025 – FEB 2026</span>
        </div>
        <div className="r-proj-stack">Spring Boot · React · PostgreSQL · Docker · TypeScript</div>
        <div className="r-proj-desc">Fullstack IT helpdesk platform — 50+ daily tickets, 1000+ concurrent retrievals at 70% faster response with JWT-secured endpoints and real-time tracking.</div>
      </div>
      <div className="r-proj-card">
        <div className="r-proj-header">
          <span className="r-proj-name">SERA</span>
          <span className="r-proj-date" style={{ background: '#f5c442', color: '#4a3800' }}>🏆 WiCS 1ST PLACE</span>
        </div>
        <div className="r-proj-stack">React · Node.js · MongoDB · Tailwind CSS · OpenAI GPT</div>
        <div className="r-proj-desc">AI sexual health chatbot with JWT auth, voice interaction via Web Speech API, and real-time GPT responses. Built for high availability and scalability.</div>
      </div>
    </RetroWindow>
  );
}
