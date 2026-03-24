import RetroWindow from './RetroWindow';

interface Props { open: boolean; onClose: () => void; zIndex: number; onFocus: () => void; }

export default function ProfileWindow({ open, onClose, zIndex, onFocus }: Props) {
  return (
    <RetroWindow
      id="profile" open={open} onClose={onClose} zIndex={zIndex} onFocus={onFocus}
      accent="#e8407e" title="HRIDI UKANI" searchText="hridiukani.vercel.app"
      url="https://hridiukani.vercel.app" initialPos={{ x: 60, y: 80 }}
    >
      <div className="r-photo-col">
        <div className="r-photo">H U</div>
        <div className="r-photo-name" style={{ background: '#e8407e' }}>hridi ukani</div>
      </div>
      <div className="r-info-col">
        {[['NAME','HRIDI UKANI'],['SCHOOL','ARIZONA STATE UNIV.'],['MAJOR','CS + BUSINESS'],['GPA','3.97 ✦'],['GRAD','MAY 2026'],['LOCATION','TEMPE, AZ']].map(([l,v]) => (
          <div className="r-row" key={l}><span className="r-lbl">{l}</span><span className="r-val">{v}</span></div>
        ))}
      </div>
      <div className="r-side-col">
        <div className="r-side-label">ACHIEVEMENTS</div>
        {[['#e8407e','white','GHC SCHOLAR'],['#e8407e','white','DEAN\'S LIST'],['#e8407e','white','WiCS WINNER'],['#ffc8e0','#c44d82','NEW AMERICAN'],['#ffc8e0','#c44d82','CODEPATH']].map(([bg,color,text]) => (
          <span key={text} className="r-tag" style={{ background: bg, color, border: bg === '#ffc8e0' ? '1px solid #e890b8' : undefined }}>{text}</span>
        ))}
      </div>
    </RetroWindow>
  );
}
