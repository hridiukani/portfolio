'use client';
import {
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import BootScreen from "@/components/BootScreen";

const resumeUrl = "/resume.pdf";

type WindowId = "about" | "projects" | "experience" | "skills" | "resume";
type WindowState = {
  id: WindowId;
  position: { left: number; top: number } | null;
  zIndex: number;
};

const desktopItems: Array<{
  id: WindowId;
  label: string;
  file: string;
  tone: "sun" | "rose" | "olive" | "paper";
  icon: typeof UserRound;
}> = [
  { id: "about", label: "About me", file: "hello.txt", tone: "sun", icon: UserRound },
  { id: "projects", label: "Projects", file: "3 items", tone: "rose", icon: Code2 },
  { id: "experience", label: "Experience", file: "timeline.log", tone: "olive", icon: BriefcaseBusiness },
  { id: "skills", label: "Skills", file: "stack.json", tone: "paper", icon: Sparkles },
  { id: "resume", label: "Résumé", file: "hridi.pdf", tone: "sun", icon: FileText },
];

const desktopPositions = [
  "desktop-position-left-one",
  "desktop-position-left-two",
  "desktop-position-left-three",
  "desktop-position-right-one",
  "desktop-position-right-two",
] as const;

// Mobile only: these folders render above the open window; the rest render below it.
// Desktop positioning is unaffected since icons are placed via desktopPositions above, not DOM order.
const mobileTopIds = new Set<WindowId>(["about", "experience", "resume"]);

const skills = [
  ["Languages", "JavaScript, TypeScript, Java, Python, C/C++, SQL, Go"],
  ["Frontend", "React, Next.js, Angular, HTML, CSS"],
  ["Backend", "Spring Boot, Node.js, Flask, PostgreSQL, MySQL"],
  ["AI & data", "RAG, TensorFlow, PyTorch, spaCy, Hugging Face"],
  ["Tools", "AWS, Azure, Docker, Git, MongoDB, Jira, Postman"],
];


const projects: Array<{ name: string; meta: string; accent: "sun" | "olive" | "rose"; description: string; link: string }> = [
  { name: "Cincin", meta: "Next.js · FastAPI · PostGIS", accent: "sun", description: "An autonomous AI pipeline indexing 600+ Phoenix venues for Happy Hour deals.", link: "https://cincin.hridi.space" },
  { name: "FlowDesk", meta: "Spring Boot · React · PostgreSQL", accent: "olive", description: "A role-aware IT helpdesk supporting 100+ users, with real-time tickets and 70% faster retrievals.", link: "https://github.com/hridiukani/SDA-IT-Ticket-Management-System" },
  { name: "SERA", meta: "Hackathon winner · AI/RAG", accent: "rose", description: "A voice-driven sexual health chatbot built in 24 hours with streaming, retrieval, and session persistence.", link: "https://ai-sex-doc-front-end.vercel.app/"},
];

export default function Portfolio() {
  const [booted, setBooted] = useState(true);
  const [openWindows, setOpenWindows] = useState<WindowState[]>([
    { id: "about", position: null, zIndex: 40 },
  ]);
  const [time, setTime] = useState("");
  const canvasRef = useRef<HTMLElement>(null);
  const dragOffset = useRef({ id: "about" as WindowId, x: 0, y: 0 });
  const topZIndex = useRef(40);

  useEffect(() => {
    const updateTime = () =>
      setTime(new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const openWindow = (id: WindowId) => {
    topZIndex.current += 1;
    setOpenWindows((current) => {
      if (current.some((item) => item.id === id)) {
        return current.map((item) => item.id === id ? { ...item, zIndex: topZIndex.current } : item);
      }

      const canvas = canvasRef.current;
      const offsetIndex = current.length % 4;
      const position = canvas && window.innerWidth >= 768
        ? {
            left: Math.max(115, (canvas.clientWidth - Math.min(canvas.clientWidth * 0.92, 650)) / 2 + offsetIndex * 26),
            top: Math.max(24, canvas.clientHeight * 0.12 + offsetIndex * 24),
          }
        : null;
      return [...current, { id, position, zIndex: topZIndex.current }];
    });
  };

  const bringToFront = (id: WindowId) => {
    topZIndex.current += 1;
    setOpenWindows((current) => current.map((item) => item.id === id ? { ...item, zIndex: topZIndex.current } : item));
  };

  const closeWindow = (id: WindowId) => {
    setOpenWindows((current) => current.filter((item) => item.id !== id));
  };

  const beginDrag = (id: WindowId, event: ReactPointerEvent<HTMLElement>) => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const panel = event.currentTarget.closest<HTMLElement>(".active-window");
    const canvas = canvasRef.current;
    if (!panel || !canvas) return;
    const panelRect = panel.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    dragOffset.current = { id, x: event.clientX - panelRect.left, y: event.clientY - panelRect.top };
    bringToFront(id);
    setOpenWindows((current) => current.map((item) => item.id === id
      ? { ...item, position: { left: panelRect.left - canvasRect.left, top: panelRect.top - canvasRect.top } }
      : item));
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const dragWindow = (event: ReactPointerEvent<HTMLElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const panel = event.currentTarget.closest<HTMLElement>(".active-window");
    const canvas = canvasRef.current;
    if (!panel || !canvas) return;
    const canvasRect = canvas.getBoundingClientRect();
    const left = Math.max(0, Math.min(event.clientX - canvasRect.left - dragOffset.current.x, canvasRect.width - panel.offsetWidth - 10));
    const top = Math.max(8, Math.min(event.clientY - canvasRect.top - dragOffset.current.y, canvasRect.height - panel.offsetHeight - 10));
    setOpenWindows((current) => current.map((item) => item.id === dragOffset.current.id
      ? { ...item, position: { left, top } }
      : item));
  };

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}

      <main className="desktop-shell">
      <header className="system-bar">
        <div className="flex min-w-0 items-center gap-2">
          <span className="status-dot bg-ink" />
          <span className="status-dot bg-rose" />
          <span className="status-dot bg-olive" />
          <span className="ml-2 truncate font-display text-sm font-bold sm:ml-4">
            HRIDI UKANI
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-xs font-semibold sm:gap-4">
          <span className="hidden text-olive sm:inline">portfolio · workspace</span>
          <span>{time || "9:41 AM"}</span>
        </div>
      </header>

      <section ref={canvasRef} className="desktop-canvas" aria-label="Hridi's portfolio desktop">
        <div className="desktop-shortcuts desktop-shortcuts-top" aria-label="Portfolio folders">
          {desktopItems.map((item, index) => (
            mobileTopIds.has(item.id) ? (
              <DesktopIcon key={item.id} {...item} index={index} onOpen={() => openWindow(item.id)} />
            ) : null
          ))}
        </div>

        {openWindows.map((openWindowItem) => (
          <div
            key={openWindowItem.id}
            className={`active-window ${openWindowItem.position ? "active-window-moved" : ""}`}
            style={{ ...openWindowItem.position, zIndex: openWindowItem.zIndex }}
            role="dialog"
            aria-label={`${openWindowItem.id} window`}
            onPointerDown={() => bringToFront(openWindowItem.id)}
          >
            <WindowChrome
              title={desktopItems.find((item) => item.id === openWindowItem.id)?.label ?? "Portfolio"}
              tone={openWindowItem.id === "experience" ? "olive" : openWindowItem.id === "projects" ? "rose" : "sun"}
              onClose={() => closeWindow(openWindowItem.id)}
              onDragStart={(event) => beginDrag(openWindowItem.id, event)}
              onDrag={dragWindow}
            >
              <WindowContent id={openWindowItem.id} onOpen={openWindow} />
            </WindowChrome>
          </div>
        ))}

        {openWindows.length === 0 ? (
          <button className="welcome-note" onClick={() => openWindow("about")} type="button">
            <span className="font-display text-lg font-bold">Hi, I’m Hridi.</span>
            <span className="text-sm">Open a folder to explore my work.</span>
          </button>
        ) : null}

        <div className="desktop-shortcuts desktop-shortcuts-bottom" aria-label="Portfolio folders">
          {desktopItems.map((item, index) => (
            mobileTopIds.has(item.id) ? null : (
              <DesktopIcon key={item.id} {...item} index={index} onOpen={() => openWindow(item.id)} />
            )
          ))}
        </div>

      </section>

      <nav className="contact-dock" aria-label="Contact Hridi">
        <div className="contact-dock-inner">
          <SocialLink href="https://github.com/hridiukani" label="GitHub" icon={<Github />} />
          <SocialLink href="https://linkedin.com/in/hridiukani1807" label="LinkedIn" icon={<Linkedin />} />
          <SocialLink href="mailto:hridi.ukani@gmail.com" label="Email" icon={<Mail />} />
        </div>
      </nav>
      </main>
    </>
  );
}

function DesktopIcon({
  label,
  file,
  tone,
  index,
  onOpen,
}: {
  label: string;
  file: string;
  tone: "sun" | "rose" | "olive" | "paper";
  icon: typeof UserRound;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`desktop-icon ${desktopPositions[index] ?? "desktop-position-top-left"}`}
      onClick={onOpen}
      aria-label={`Open ${label}`}
    >
      <span className={`folder-tile folder-${tone}`}>
        <span className="folder-back" />
        <span className="folder-front" />
      </span>
      <span className="mt-2 font-display text-xs font-bold">{label}</span>
      <span className="text-[10px] text-muted-foreground">{file}</span>
    </button>
  );
}

function WindowChrome({
  title,
  tone,
  compact = false,
  onClose,
  onDragStart,
  onDrag,
  children,
}: {
  title: string;
  tone: "sun" | "rose" | "olive";
  compact?: boolean;
  onClose?: () => void;
  onDragStart?: (event: ReactPointerEvent<HTMLElement>) => void;
  onDrag?: (event: ReactPointerEvent<HTMLElement>) => void;
  children: ReactNode;
}) {
  return (
    <article className={`window-panel ${compact ? "window-panel-compact" : ""}`}>
      <header
        className={`window-titlebar titlebar-${tone} ${onDragStart ? "window-titlebar-draggable" : ""}`}
        onPointerDown={onDragStart}
        onPointerMove={onDrag}
      >
        <span className="truncate font-display text-sm font-bold">{title}</span>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="window-control bg-paper" />
          <span className="window-control bg-sun" />
          {onClose ? (
            <button className="window-close" type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onClose} aria-label={`Close ${title}`}>
              <X className="size-3" strokeWidth={3} />
            </button>
          ) : (
            <span className="window-control bg-rose" />
          )}
        </div>
      </header>
      <div className="window-body">{children}</div>
    </article>
  );
}

function WindowContent({ id, onOpen }: { id: WindowId; onOpen: (id: WindowId) => void }) {
  if (id === "about") {
    return (
      <div className="p-4 sm:p-5">
        <div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-olive">Hi, I’m</p>
            <h1 className="font-display text-3xl font-extrabold leading-none sm:text-4xl">Hridi Ukani</h1>
            <p className="mt-1 font-semibold text-rose">Software Engineer · ASU ’26</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed">
          I build dependable, human-centered software — from full-stack products to AI and RAG pipelines. I’m happiest turning a hard problem into something clear, fast, and useful.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <MiniTag>Full-stack</MiniTag><MiniTag>AI / RAG</MiniTag><MiniTag>Research</MiniTag><MiniTag>Team lead</MiniTag>
        </div>
        <button className="window-action mt-5" type="button" onClick={() => onOpen("projects")}>
          Explore my projects <ExternalLink className="size-4" />
        </button>
      </div>
    );
  }

  if (id === "projects") {
    return (
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    );
  }

  if (id === "experience") {
    return (
      <div className="space-y-4 p-4 sm:p-5">
        <ExperienceItem period="Sep 2025 — May 2026" role="Software Engineering Intern" company="Extra Sauce Agency">        </ExperienceItem>
        <ExperienceItem period="Jun 2025 — May 2026" role="Research Assistant" company="ASU Data Mining & Machine Learning Lab">
        </ExperienceItem>
        <ExperienceItem period="Sep 2025 — Nov 2025" role="Software Engineering Intern" company="Hacker in Heels">
        </ExperienceItem>
        <ExperienceItem period="Sep 2023 — May 2026" role="Technology Assistant" company="Sun Devil Athletics">
        </ExperienceItem>
        <ExperienceItem period="Aug 2024 — Dec 2024" role="Teaching Assistant" company="Fulton School of Engineering">
        </ExperienceItem>
      </div>
    );
  }

  if (id === "skills") {
    return (
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {skills.map(([group, items]) => (
          <div key={group} className="skill-block">
            <p className="font-display text-sm font-bold text-olive">{group}</p>
            <p className="mt-1 text-xs leading-relaxed sm:text-sm">{items}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-5 text-center sm:p-7">
      <div className="mx-auto grid size-20 place-items-center border-2 border-ink bg-sun shadow-button">
        <FileText className="size-9" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-extrabold">HridiUkani_Resume</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Education, engineering experience, technical skills, and selected projects — ready to view or download.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <a className="window-action" href={resumeUrl} target="_blank" rel="noreferrer">
          Open résumé <ExternalLink className="size-4" />
        </a>
        <a className="window-action-secondary" href={resumeUrl} download="HridiUkani_SWEResume.pdf">
          Download <Download className="size-4" />
        </a>
      </div>
    </div>
  );
}

function MiniTag({ children }: { children: ReactNode }) {
  return <span className="mini-tag">{children}</span>;
}

function ProjectCard({ name, meta, accent, description, link }: { name: string; meta: string; accent: string; description: string; link: string }) {
  return (
    <article className={`project-card project-card-${accent}`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-lg font-extrabold">{name}</h2>
        <Code2 className="size-5 shrink-0" />
      </div>
      <p className="mt-1 text-[10px] font-bold uppercase text-muted-foreground">{meta}</p>
      <p className="mt-3 text-xs leading-relaxed sm:text-sm">{description}</p>
      <a className="window-action-rose mt-3" href={link} target="_blank" rel="noreferrer">
        Explore project <ExternalLink className="size-4" />
      </a>
    </article>
  );
}

function ExperienceItem({ period, role, company, children }: { period: string; role: string; company: string; children?: ReactNode }) {
  return (
    <article className="grid gap-2 border-b border-ink/15 pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[128px_minmax(0,1fr)]">
      <p className="text-[11px] font-bold uppercase text-olive">{period}</p>
      <div>
        <h2 className="font-display text-base font-extrabold">{role}</h2>
        <p className="text-xs font-bold text-rose">{company}</p>
        {children ? <p className="mt-1 text-xs leading-relaxed sm:text-sm">{children}</p> : null}
      </div>
    </article>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="social-link" aria-label={label} title={label}>
      <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}