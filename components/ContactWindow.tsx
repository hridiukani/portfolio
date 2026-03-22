import RetroWindow from './RetroWindow';

interface Props { open: boolean; onClose: () => void; zIndex: number; onFocus: () => void; }

export default function ContactWindow({ open, onClose, zIndex, onFocus }: Props) {
  return (
    <RetroWindow
      id="contact" open={open} onClose={onClose} zIndex={zIndex} onFocus={onFocus}
      accent="#6b7ee8" title="CONTACT" searchText="OPEN TO OPPORTUNITIES !!!"
      url="mailto:hridi.ukani@gmail.com" initialPos={{ x: 180, y: 100 }}
    >
      <div className="r-photo-col">
        <div className="r-photo">H U</div>
        <div className="r-photo-name" style={{ background: '#6b7ee8' }}>get in touch</div>
      </div>
      <div className="r-info-col">
        <div className="r-row"><span className="r-lbl">EMAIL</span><a href="mailto:hridi.ukani@gmail.com" className="r-link">hridi.ukani@gmail.com</a></div>
        <div className="r-row"><span className="r-lbl">LINKEDIN</span><a href="https://linkedin.com/in/hridiukani1807" target="_blank" className="r-link">hridiukani1807</a></div>
        <div className="r-row"><span className="r-lbl">GITHUB</span><a href="https://github.com/hridiukani" target="_blank" className="r-link">hridiukani</a></div>
        <div className="r-row"><span className="r-lbl">WEB</span><a href="https://hridiukani.vercel.app" target="_blank" className="r-link">hridiukani.vercel.app</a></div>
        <div className="r-row"><span className="r-lbl">PHONE</span><span className="r-val">602-517-4221</span></div>
      </div>
      <div className="r-side-col">
        <div className="r-side-label">STATUS</div>
        <span className="r-tag" style={{ background: '#6b7ee8', color: 'white' }}>OPEN TO WORK</span>
        <div className="r-side-label">AVAILABLE FOR</div>
        <span className="r-tag" style={{ background: '#e8eeff', color: '#4a5ac8', border: '1px solid #b0bcf0' }}>FULL-TIME</span>
        <span className="r-tag" style={{ background: '#e8eeff', color: '#4a5ac8', border: '1px solid #b0bcf0' }}>INTERNSHIP</span>
      </div>
    </RetroWindow>
  );
}
