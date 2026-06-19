import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Github, Linkedin, Mail, Download, ArrowRight, ArrowUpRight, ExternalLink,
  Brain, Code2, Database, Wrench, Trophy, Briefcase, Layers,
  FileText, Send, MapPin, GraduationCap, Award, Rocket, Cpu, Shield,
  Activity, Zap, Stethoscope,
} from "lucide-react";

/* ============================================================
   Shared atoms
   ============================================================ */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]" />
      {children}
    </div>
  );
}

function SectionHeader({
  kicker, title, sub, align = "left",
}: { kicker: string; title: React.ReactNode; sub?: string; align?: "left" | "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}
    >
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-[3.5rem] md:leading-[1.05]">
        {title}
      </h2>
      {sub && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

/* ============================================================
   HERO
   ============================================================ */

const ROLES = ["AI Systems Architect", "Full Stack Developer", "Startup Builder"];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = ROLES[idx];
    const speed = del ? 35 : 65;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1600);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setIdx((idx + 1) % ROLES.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx]);

  return (
    <span className="font-mono text-brand-2">
      {text}<span className="animate-blink ml-0.5">|</span>
    </span>
  );
}

const HERO_STATS = [
  { value: "5+", label: "Projects" },
  { value: "5+", label: "Hackathons" },
  { value: "8.1", label: "CGPA" },
  { value: "3rd Yr", label: "B.Tech AIML" },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative flex min-h-screen items-center px-6 pt-28 pb-20">
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl">
        {/* status pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5 text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-emerald-200/90">Available for internships, research & startup roles</span>
        </motion.div>

        {/* Hero title */}
        <h1 className="font-display font-semibold tracking-[-0.03em] text-foreground text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.95]">
          <span className="block overflow-hidden">
            {"Shivanand".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.2 + i * 0.03, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {"Ray.".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.5 + i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block ${c === "." ? "text-brand" : ""}`}
              >
                {c}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subline grid */}
        <div className="mt-10 grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
          >
            <div className="font-display text-2xl font-medium text-foreground sm:text-3xl">
              <Typewriter />
            </div>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground sm:text-lg">
              Building intelligent systems, healthcare platforms, fintech solutions,
              and scalable software products — engineered with the rigor of a startup
              and the polish of a product team.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
              >
                <span className="relative z-10">Explore Projects</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#resume"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/[0.07]"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-2 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/shivanandray215", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/shivanandray215", label: "LinkedIn" },
                { icon: Mail, href: "mailto:shivanandray215@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="group grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:border-brand/40 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Stats column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="bg-[#0F172A]/80 px-5 py-6">
                <div className="font-display text-3xl font-semibold text-foreground sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-80 w-80 rounded-full bg-brand-2/10 blur-[120px]" />
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1200;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  const display = Number.isInteger(to) ? Math.round(val).toString() : val.toFixed(1);
  return <span ref={ref}>{display}{suffix}</span>;
}

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="About"
          title={<>Engineer first. <span className="text-muted-foreground">Builder always.</span></>}
          sub="I'm a third-year B.Tech CSE (AI & ML) student at MAIT, GGSIPU. I build at the intersection of artificial intelligence, healthcare and fintech — turning research-grade ideas into shipped, production-quality software."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Identity card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl surface-card p-8 lg:col-span-7"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 font-display text-2xl font-semibold text-white">
                  SR
                </div>
                <div>
                  <div className="font-display text-xl font-semibold">Shivanand Ray</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> New Delhi, India
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">
                Strong foundations in Data Structures, Algorithms, Full Stack Development
                and Intelligent Systems. I think in systems, ship like a startup, and
                obsess over the details that turn good products into memorable ones.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                  <GraduationCap className="mt-0.5 h-4 w-4 text-brand-2 shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground">B.Tech CSE (AI & ML)</div>
                    <div className="text-xs text-muted-foreground">MAIT • GGSIPU • 2024–2028</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                  <Award className="mt-0.5 h-4 w-4 text-brand shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground">CGPA 8.1</div>
                    <div className="text-xs text-muted-foreground">3rd year, ongoing</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Focus areas</div>
                <div className="flex flex-wrap gap-2">
                  {["Artificial Intelligence","Software Engineering","Healthcare Tech","FinTech","Research","Startups"].map(t => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stat column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-1"
          >
            {[
              { value: 8.1, suffix: "", label: "Current CGPA", icon: GraduationCap },
              { value: 5, suffix: "+", label: "Shipped projects", icon: Layers },
              { value: 5, suffix: "+", label: "Hackathons & ideathons", icon: Trophy },
            ].map((s) => (
              <div key={s.label} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <s.icon className="absolute right-5 top-5 h-5 w-5 text-muted-foreground/60" />
                <div className="font-display text-4xl font-semibold text-gradient-brand sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS
   ============================================================ */

const SKILL_GROUPS = [
  { icon: Code2, title: "Languages", items: ["C++","Java","Python","JavaScript","TypeScript","SQL"] },
  { icon: Brain, title: "AI & Machine Learning", items: ["NumPy","Pandas","Scikit-Learn","Data Analysis","EDA","Model Evaluation"] },
  { icon: Rocket, title: "Web Development", items: ["React","Node.js","Express","Flask","FastAPI","Django","REST APIs"] },
  { icon: Database, title: "Databases", items: ["PostgreSQL","MongoDB","MySQL","SQLite"] },
  { icon: Wrench, title: "Tools & Workflow", items: ["Git","GitHub","VS Code","Postman","Linux"] },
  { icon: Cpu, title: "Core Foundations", items: ["DSA","OOP","Operating Systems","DBMS","Networks"] },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Toolkit"
          title={<>The stack behind <span className="text-gradient-brand">the shipping</span>.</>}
          sub="An evolving toolkit — chosen by what builds the best product, not by what's trending this week."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all hover:border-brand/30 hover:bg-white/[0.04]"
            >
              <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-2 transition-colors group-hover:text-brand">
                  <g.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <span key={it} className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-brand/30 hover:text-foreground">
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECTS — flagship + grid
   ============================================================ */

const SECONDARY_PROJECTS = [
  {
    title: "StockClear",
    tag: "Dead Stock Marketplace",
    description: "Full-stack marketplace connecting buyers and sellers of unsold inventory with dynamic pricing and analytics dashboards.",
    features: ["Dynamic pricing", "Buyer & seller dashboards", "Admin analytics"],
    tech: ["React","TypeScript","Node.js","Express","PostgreSQL"],
    icon: Layers,
  },
  {
    title: "CrediFlow",
    tag: "AI Credit · Web3 Identity",
    description: "AI-powered credit scoring and blockchain-based digital identity platform with consent-based data sharing.",
    features: ["AI credit analysis", "On-chain identity", "Consent-based sharing"],
    tech: ["Python","ML","Blockchain","Web3"],
    icon: Shield,
  },
  {
    title: "TravelSafeAI",
    tag: "Tourist Safety System",
    description: "Smart tourist safety monitoring with anomaly detection, geo-fencing and instant emergency alert routing.",
    features: ["Anomaly detection", "Geo-fencing", "Emergency alerts"],
    tech: ["AI/ML","Blockchain","Python"],
    icon: Activity,
  },
  {
    title: "MediVenture",
    tag: "Healthcare Supply Chain",
    description: "Healthcare inventory and supply-chain platform with demand forecasting and multi-branch operations.",
    features: ["Inventory monitoring", "Demand forecasting", "Multi-branch"],
    tech: ["Python","FastAPI","Flask","SQL"],
    icon: Database,
  },
];

function FlagshipProject() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 3, ry: px * 4 });
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#0B1220] p-1"
    >
      {/* glow border */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "linear-gradient(120deg, transparent, rgba(59,130,246,0.18), transparent 60%)" }} />

      <div className="relative grid gap-0 rounded-[24px] lg:grid-cols-[1.1fr_1fr]">
        {/* LEFT — Content */}
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand">Flagship</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">AI Healthcare Ecosystem</span>
          </div>
          <h3 className="mt-5 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            MEDLINK<span className="text-brand">-</span>AI
          </h3>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
            An AI-powered healthcare ecosystem unifying digital health IDs, QR-based
            record access, AI-generated medical summaries and hospital workflow
            management — designed from the ground up for Indian clinics and patients.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Stethoscope, title: "Digital Health ID", note: "Portable patient identity" },
              { icon: Zap, title: "AI Medical Summaries", note: "LLM-assisted insights" },
              { icon: Shield, title: "QR Record Access", note: "Secure & instant" },
              { icon: Activity, title: "Hospital Workflow", note: "End-to-end operations" },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                  <f.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {["React","TypeScript","Node.js","Express","AI/ML","REST APIs"].map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{t}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="https://github.com/shivanandray215" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02]">
              View case study <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/shivanandray215" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/[0.07]">
              <Github className="h-4 w-4" /> Source
            </a>
          </div>
        </div>

        {/* RIGHT — Visual */}
        <div className="relative min-h-[360px] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#0B1426] via-[#0A1733] to-[#070E1F] lg:rounded-l-none">
          {/* grid */}
          <div className="absolute inset-0 opacity-[0.18]" style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }} />
          {/* glow */}
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-3xl" />

          {/* device mock */}
          <div className="relative z-10 flex h-full items-center justify-center p-8">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0F172A]/90 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">medlink.ai/patient</span>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2">
                    <Stethoscope className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Patient · ID #MA-9421</div>
                    <div className="text-sm font-semibold">Aarav Mehta</div>
                  </div>
                  <div className="ml-auto rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">Stable</div>
                </div>
                <div className="space-y-2">
                  {[
                    { l: "Heart rate", v: "72 bpm", w: "60%" },
                    { l: "BP", v: "118/76", w: "75%" },
                    { l: "SpO₂", v: "98%", w: "90%" },
                  ].map((m, i) => (
                    <div key={i} className="rounded-lg border border-white/8 bg-white/[0.02] p-2.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">{m.l}</span>
                        <span className="font-mono text-foreground">{m.v}</span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full bg-gradient-to-r from-brand to-brand-2" style={{ width: m.w }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-brand/20 bg-brand/[0.06] p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand">
                    <Zap className="h-3 w-3" /> AI Summary
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    Vitals trending normal. Recommend follow-up consultation in 14 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SecondaryCard({ p, i }: { p: typeof SECONDARY_PROJECTS[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-7 transition-all hover:border-brand/30 hover:bg-white/[0.04]"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-2">
          <p.icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {p.tag}
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

      <ul className="mt-5 space-y-1.5">
        {p.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-brand" /> {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <span key={t} className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{t}</span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-5">
        <a href="https://github.com/shivanandray215" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          <Github className="h-3.5 w-3.5" /> Source
        </a>
        <a href="#" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand transition-transform group-hover:translate-x-0.5">
          Read more <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Selected Work"
          title={<>Products that <span className="text-gradient-brand">ship</span>.</>}
          sub="A focused selection across AI, healthcare, fintech and full-stack systems — built end-to-end, from problem to product."
        />

        <FlagshipProject />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {SECONDARY_PROJECTS.map((p, i) => <SecondaryCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ACHIEVEMENTS
   ============================================================ */

const ACHIEVEMENTS = [
  { title: "Winner — Pitch Your Idea 3.0", note: "Top startup pitch among national entries.", year: "2024", icon: Trophy, level: "Winner" },
  { title: "Finalist — XCELERATE 3.0 Ideathon", note: "National-level finalist for an AI product idea.", year: "2024", icon: Award, level: "Finalist" },
  { title: "Finalist — CodeVeda 2.0 Hackathon", note: "Selected among the top teams nationally.", year: "2024", icon: Award, level: "Finalist" },
  { title: "5+ National Hackathons", note: "Consistent participation, shipping demos under 48 hours.", year: "2023–2025", icon: Rocket, level: "Participant" },
  { title: "Cybersecurity CTF Competitions", note: "Capture-the-flag participant across multiple events.", year: "2024", icon: Shield, level: "Participant" },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          kicker="Recognition"
          title={<>Validated by <span className="text-gradient-brand">competition</span>.</>}
          sub="Selected results from hackathons, ideathons and national competitions."
        />

        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          <div className="space-y-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-[#0F172A]">
                  <a.icon className="h-3.5 w-3.5 text-brand-2" />
                </div>
                <div className="group rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-all hover:border-brand/30 hover:bg-white/[0.04]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <div className="font-display text-lg font-semibold">{a.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{a.note}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest ${
                        a.level === "Winner" ? "bg-amber-400/15 text-amber-300" :
                        a.level === "Finalist" ? "bg-brand/15 text-brand" :
                        "bg-white/5 text-muted-foreground"
                      }`}>{a.level}</span>
                      <span className="font-mono text-xs text-muted-foreground">{a.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE
   ============================================================ */

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          kicker="Experience"
          title={<>Where I've <span className="text-gradient-brand">contributed</span>.</>}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#0B1220] p-8 sm:p-10"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/12 blur-3xl" />
          <div className="relative grid gap-6 sm:grid-cols-[auto_1fr]">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-semibold">Startup Sphere Society</h3>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-muted-foreground">Member · Present</span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">ITE • MAIT, GGSIPU</div>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Collaborating with a cohort of builders on AI and SaaS startup ideas —
                contributing to innovation activities, technical sessions and pitch days
                that bridge college-level execution and real-world product thinking.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Innovation Activities","Technical Discussions","Startup Pitch Sessions","Team Collaboration"].map(t => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   RESUME
   ============================================================ */

export function ResumeSection() {
  return (
    <section id="resume" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          kicker="Resume"
          title={<>Get the <span className="text-gradient-brand">full story</span>.</>}
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-2xl"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-brand/40 via-transparent to-brand-2/40 opacity-50 blur-xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-[#0F172A] to-[#0B1220] p-8 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="grid h-20 w-16 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-brand">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">CV.pdf · Updated 2025</div>
                <h3 className="mt-1 font-display text-2xl font-semibold">Shivanand Ray — Resume</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  B.Tech CSE (AI & ML) • Projects, achievements and a deeper technical breakdown.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02]">
                <Download className="h-4 w-4" /> Download PDF
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/[0.07]">
                <ExternalLink className="h-4 w-4" /> View online
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */

export function ContactSection() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Contact"
          title={<>Let's build <span className="text-gradient-brand">something real</span>.</>}
          sub="Internships, research, startup roles or collaborations — my inbox is open."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 lg:col-span-3 lg:p-10"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Name</span>
                <input required className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60 focus:bg-white/[0.04]" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Email</span>
                <input type="email" required className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60 focus:bg-white/[0.04]" placeholder="you@company.com" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Message</span>
              <textarea required rows={6} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60 focus:bg-white/[0.04]" placeholder="Tell me about your project, role or idea…" />
            </label>
            <button type="submit" className="mt-6 group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02]">
              {sent ? "Message queued ✓" : (<>Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>)}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3 lg:col-span-2"
          >
            {[
              { icon: Mail, label: "Email", value: "shivanandray215@gmail.com", href: "mailto:shivanandray215@gmail.com" },
              { icon: Github, label: "GitHub", value: "shivanandray215", href: "https://github.com/shivanandray215" },
              { icon: Linkedin, label: "LinkedIn", value: "shivanandray215", href: "https://linkedin.com/in/shivanandray215" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-brand/30 hover:bg-white/[0.04]">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-2 transition-colors group-hover:text-brand">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
                  <div className="truncate text-sm font-medium">{value}</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono uppercase tracking-widest text-emerald-300/90">Available</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Open to internships, research collaborations and startup roles in
                AI, ML and full-stack engineering — globally, remote or on-site.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <div className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Shivanand Ray
          </div>
          <div className="text-xs text-muted-foreground">
            Designed & engineered with React, TypeScript & Framer Motion.
          </div>
        </div>
      </div>
    </section>
  );
}
