import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, Download, ArrowRight, ArrowUpRight, ExternalLink,
  Brain, Code2, Database, Wrench, Trophy, Briefcase, Layers,
  FileText, Send, MapPin, GraduationCap, Award, Rocket, Cpu, Shield,
  Activity, Zap, Stethoscope, Sparkles, Terminal, Globe, ChevronRight,
  Star, TrendingUp, Users, BookOpen, Coffee,
} from "lucide-react";

/* ─── Palette tokens ────────────────────────────────────────── */
const BRAND = "#FF6B35";
const VIOLET = "#A855F7";
const GOLD = "#F59E0B";
const DIM = "#8892A4";

/* ─── Shared helpers ─────────────────────────────────────────── */

function Tag({ children, variant = "default" }: { children: React.ReactNode; variant?: "brand" | "violet" | "gold" | "default" }) {
  const styles = {
    brand: { background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.3)", color: BRAND },
    violet: { background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", color: VIOLET },
    gold: { background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", color: GOLD },
    default: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: DIM },
  }[variant];

  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em]"
      style={styles}
    >
      {children}
    </span>
  );
}

function GradientDot() {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`, boxShadow: `0 0 6px ${BRAND}` }}
    />
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]"
      style={{
        background: "rgba(255,107,53,0.08)",
        border: "1px solid rgba(255,107,53,0.22)",
        color: BRAND,
      }}
    >
      <GradientDot />
      {children}
    </div>
  );
}

function SectionHeader({
  kicker, title, sub, align = "left",
}: { kicker: string; title: React.ReactNode; sub?: string; align?: "left" | "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}
    >
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-[3.5rem] md:leading-[1.05]"
        style={{ color: "#F0F4FF" }}>
        {title}
      </h2>
      {sub && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: DIM }}>{sub}</p>
      )}
    </motion.div>
  );
}

/* Premium card wrapper */
function PremiumCard({ children, className = "", delay = 0, hover = true }:
  { children: React.ReactNode; className?: string; delay?: number; hover?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background: "linear-gradient(145deg, rgba(15,21,40,0.9) 0%, rgba(10,14,28,0.9) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      whileHover={hover ? {
        borderColor: "rgba(255,107,53,0.3)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,53,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
        y: -2,
      } : {}}
    >
      {/* Top shimmer line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${BRAND}, ${VIOLET}, transparent)` }}
      />
      {children}
    </motion.div>
  );
}

/* ─── HERO ────────────────────────────────────────────────────── */

const ROLES = ["AI Systems Architect", "Full Stack Developer", "Startup Builder", "Healthcare Tech Innovator"];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = ROLES[idx];
    const speed = del ? 30 : 60;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1800);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setIdx((idx + 1) % ROLES.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx]);

  return (
    <span className="font-mono" style={{ color: BRAND }}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
        style={{ color: VIOLET }}
      >|</motion.span>
    </span>
  );
}

const HERO_STATS = [
  { value: "5+", label: "Projects Shipped", icon: Rocket },
  { value: "5+", label: "Hackathons", icon: Trophy },
  { value: "8.1", label: "CGPA", icon: Star },
  { value: "3rd", label: "Year B.Tech", icon: GraduationCap },
];

/* Ticker banner */
const TICKER_ITEMS = [
  "AI/ML Engineer", "React Developer", "Node.js Backend", "Healthcare Tech",
  "FinTech Builder", "Open Source", "Startup Mindset", "MAIT · GGSIPU",
  "New Delhi, India", "Available for Internships",
];

function TickerBanner() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden py-3" style={{
      background: "rgba(255,107,53,0.06)",
      borderTop: "1px solid rgba(255,107,53,0.15)",
      borderBottom: "1px solid rgba(255,107,53,0.15)",
    }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 font-mono text-xs uppercase tracking-widest flex items-center gap-2"
            style={{ color: i % 2 === 0 ? BRAND : DIM }}>
            <span style={{ color: VIOLET }}>✦</span> {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex flex-col">
      {/* Hero content */}
      <div className="relative flex flex-1 items-center px-6 pt-32 pb-8">
        <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.22)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium" style={{ color: "rgba(110,231,183,0.95)" }}>
              Available for internships, research & startup roles
            </span>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            {/* Left: text */}
            <div>
              {/* Name */}
              <h1
                className="font-display font-bold tracking-[-0.03em] leading-[0.92]"
                style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", color: "#F0F4FF" }}
              >
                <span className="block overflow-hidden">
                  {"Shivanand".split("").map((c, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.028, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ delay: 0.55 + i * 0.04, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block"
                      style={c === "." ? {
                        background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      } : {}}
                    >
                      {c}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {/* Role typewriter */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.6 }}
                className="mt-6 font-display text-2xl font-medium sm:text-3xl"
                style={{ color: "#F0F4FF" }}
              >
                <Typewriter />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-5 max-w-xl text-[17px] leading-relaxed"
                style={{ color: DIM }}
              >
                Building intelligent systems, healthcare platforms, fintech solutions,
                and scalable software products — engineered with the rigor of a startup
                and the polish of a product team.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35, duration: 0.6 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
                    boxShadow: `0 8px 24px rgba(255,107,53,0.4)`,
                  }}
                >
                  <span className="relative z-10">Explore Projects</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#resume"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:scale-[1.03]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#F0F4FF",
                  }}
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-2 py-3.5 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: BRAND }}
                >
                  Contact <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-7 flex items-center gap-3"
              >
                {[
                  { icon: Github, href: "https://github.com/shivanandray215", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/shivanandray215", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:shivanandray215@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="group flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: DIM,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,107,53,0.12)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,53,0.3)";
                      (e.currentTarget as HTMLElement).style.color = BRAND;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                      (e.currentTarget as HTMLElement).style.color = DIM;
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
                <span className="ml-2 font-mono text-[11px] uppercase tracking-widest" style={{ color: "rgba(136,146,164,0.5)" }}>
                  Find me on
                </span>
              </motion.div>
            </div>

            {/* Right: Stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-3"
            >
              {HERO_STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.08, duration: 0.6 }}
                  className="group relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(145deg, rgba(15,21,40,0.95) 0%, rgba(10,14,28,0.95) 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ background: `linear-gradient(135deg, rgba(255,107,53,0.05), rgba(168,85,247,0.05))` }}
                  />
                  <s.icon className="mb-3 h-5 w-5" style={{ color: i % 2 === 0 ? BRAND : VIOLET }} />
                  <div className="font-display text-3xl font-bold sm:text-4xl"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest" style={{ color: DIM }}>{s.label}</div>
                </motion.div>
              ))}

              {/* Profile card at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.65, duration: 0.6 }}
                className="col-span-2 overflow-hidden rounded-2xl p-4"
                style={{
                  background: `linear-gradient(135deg, rgba(255,107,53,0.08), rgba(168,85,247,0.08))`,
                  border: `1px solid rgba(255,107,53,0.2)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`, boxShadow: `0 4px 12px rgba(255,107,53,0.4)` }}
                  >
                    SR
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold" style={{ color: "#F0F4FF" }}>Shivanand Ray</div>
                    <div className="text-xs" style={{ color: DIM }}>B.Tech CSE (AI & ML) · MAIT</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-[10px]"
                    style={{ color: "#6ee7b7" }}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Open to work
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <TickerBanner />
    </section>
  );
}

/* ─── ABOUT ───────────────────────────────────────────────────── */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
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

const ABOUT_TRAITS = [
  { icon: Brain, label: "AI First Thinking" },
  { icon: Rocket, label: "Startup Mindset" },
  { icon: Globe, label: "Global Impact" },
  { icon: Coffee, label: "Detail Obsessed" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32">
      {/* Subtle divider */}
      <div className="mx-auto mb-24 max-w-6xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.3), rgba(168,85,247,0.3), transparent)" }} />

      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="About Me"
          title={<>Engineer first. <span style={{
            background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Builder always.</span></>}
          sub="Third-year B.Tech CSE (AI & ML) student at MAIT, GGSIPU. I build at the intersection of AI, healthcare and fintech — turning research-grade ideas into shipped, production-quality software."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main identity card */}
          <PremiumCard className="lg:col-span-7 p-8 sm:p-10" delay={0}>
            {/* Decorative gradient blob */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, ${BRAND}, transparent 70%)`, filter: "blur(48px)" }} />

            <div className="relative">
              {/* Profile header */}
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-bold text-white shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
                    boxShadow: `0 0 30px rgba(255,107,53,0.35)`,
                  }}
                >
                  SR
                </div>
                <div>
                  <div className="font-display text-xl font-semibold" style={{ color: "#F0F4FF" }}>Shivanand Ray</div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm" style={{ color: DIM }}>
                    <MapPin className="h-3.5 w-3.5" style={{ color: BRAND }} /> New Delhi, India
                  </div>
                </div>
                <div className="ml-auto">
                  <Tag variant="brand">Available</Tag>
                </div>
              </div>

              <p className="mt-6 text-[16px] leading-relaxed" style={{ color: DIM }}>
                Strong foundations in Data Structures, Algorithms, Full Stack Development
                and Intelligent Systems. I think in systems, ship like a startup, and
                obsess over the details that turn good products into memorable ones.
              </p>

              {/* Education + CGPA cards */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: GraduationCap,
                    title: "B.Tech CSE (AI & ML)",
                    sub: "MAIT • GGSIPU • 2024–2028",
                    color: VIOLET,
                  },
                  {
                    icon: Award,
                    title: "CGPA 8.1",
                    sub: "3rd year, ongoing",
                    color: BRAND,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl p-4 transition-all"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                    >
                      <item.icon className="h-4 w-4" style={{ color: item.color }} />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium" style={{ color: "#F0F4FF" }}>{item.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: DIM }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Traits */}
              <div className="mt-6 grid grid-cols-4 gap-3">
                {ABOUT_TRAITS.map((t) => (
                  <div key={t.label} className="flex flex-col items-center gap-2 rounded-xl py-4"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}>
                    <t.icon className="h-4 w-4" style={{ color: BRAND }} />
                    <span className="text-center font-mono text-[9px] uppercase tracking-wider" style={{ color: DIM }}>{t.label}</span>
                  </div>
                ))}
              </div>

              {/* Focus tags */}
              <div className="mt-6">
                <div className="mb-3 font-mono text-[11px] uppercase tracking-widest" style={{ color: "rgba(136,146,164,0.6)" }}>
                  Focus Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Artificial Intelligence", "Software Engineering", "Healthcare Tech", "FinTech", "Research", "Startups"].map(t => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* Stats column */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {[
              { value: 8.1, suffix: "", label: "Current CGPA", icon: Star, color: GOLD },
              { value: 5, suffix: "+", label: "Shipped Projects", icon: Layers, color: BRAND },
              { value: 5, suffix: "+", label: "Hackathons & Ideathons", icon: Trophy, color: VIOLET },
            ].map((s, i) => (
              <PremiumCard key={s.label} className="p-6" delay={i * 0.08}>
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="font-display text-5xl font-bold sm:text-6xl"
                      style={{
                        background: `linear-gradient(135deg, ${s.color}, ${i % 2 === 0 ? VIOLET : BRAND})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-2 text-sm" style={{ color: DIM }}>{s.label}</div>
                  </div>
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
                  >
                    <s.icon className="h-6 w-6" style={{ color: s.color }} />
                  </div>
                </div>
                {/* Mini bar */}
                <div className="mt-4 h-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.color}, ${i % 2 === 0 ? VIOLET : BRAND})` }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ──────────────────────────────────────────────────── */

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: "Languages",
    color: BRAND,
    items: ["C++", "Java", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    color: VIOLET,
    items: ["NumPy", "Pandas", "Scikit-Learn", "Data Analysis", "EDA", "Model Evaluation"],
  },
  {
    icon: Globe,
    title: "Web Development",
    color: GOLD,
    items: ["React", "Node.js", "Express", "Flask", "FastAPI", "Django", "REST APIs"],
  },
  {
    icon: Database,
    title: "Databases",
    color: BRAND,
    items: ["PostgreSQL", "MongoDB", "MySQL", "SQLite"],
  },
  {
    icon: Wrench,
    title: "Tools & Workflow",
    color: VIOLET,
    items: ["Git", "GitHub", "VS Code", "Postman", "Linux"],
  },
  {
    icon: Cpu,
    title: "Core Foundations",
    color: GOLD,
    items: ["DSA", "OOP", "Operating Systems", "DBMS", "Networks"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Toolkit"
          title={<>The stack behind <span style={{
            background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>the shipping</span>.</>}
          sub="An evolving toolkit — chosen by what builds the best product, not by what's trending."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <PremiumCard key={g.title} className="p-6" delay={i * 0.06}>
              {/* Icon + title */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-all"
                  style={{
                    background: `${g.color}14`,
                    border: `1px solid ${g.color}28`,
                  }}
                >
                  <g.icon className="h-5 w-5" style={{ color: g.color }} />
                </div>
                <h3 className="font-display text-base font-semibold" style={{ color: "#F0F4FF" }}>{g.title}</h3>
              </div>

              {/* Divider */}
              <div className="my-4 h-px" style={{ background: `linear-gradient(90deg, ${g.color}40, transparent)` }} />

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <motion.span
                    key={it}
                    className="cursor-default rounded-lg px-2.5 py-1 font-mono text-[11px] transition-all"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: DIM,
                    }}
                    whileHover={{
                      background: `${g.color}12`,
                      borderColor: `${g.color}35`,
                      color: g.color,
                      scale: 1.05,
                    }}
                  >
                    {it}
                  </motion.span>
                ))}
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ────────────────────────────────────────────────── */

const SECONDARY_PROJECTS = [
  {
    title: "StockClear",
    tag: "Dead Stock Marketplace",
    description: "Full-stack marketplace connecting buyers and sellers of unsold inventory with dynamic pricing and analytics dashboards.",
    features: ["Dynamic pricing", "Buyer & seller dashboards", "Admin analytics"],
    tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    icon: Layers,
    color: BRAND,
  },
  {
    title: "CrediFlow",
    tag: "AI Credit · Web3 Identity",
    description: "AI-powered credit scoring and blockchain-based digital identity platform with consent-based data sharing.",
    features: ["AI credit analysis", "On-chain identity", "Consent-based sharing"],
    tech: ["Python", "ML", "Blockchain", "Web3"],
    icon: Shield,
    color: VIOLET,
  },
  {
    title: "TravelSafeAI",
    tag: "Tourist Safety System",
    description: "Smart tourist safety monitoring with anomaly detection, geo-fencing and instant emergency alert routing.",
    features: ["Anomaly detection", "Geo-fencing", "Emergency alerts"],
    tech: ["AI/ML", "Blockchain", "Python"],
    icon: Activity,
    color: GOLD,
  },
  {
    title: "MediVenture",
    tag: "Healthcare Supply Chain",
    description: "Healthcare inventory and supply-chain platform with demand forecasting and multi-branch operations.",
    features: ["Inventory monitoring", "Demand forecasting", "Multi-branch"],
    tech: ["Python", "FastAPI", "Flask", "SQL"],
    icon: Database,
    color: BRAND,
  },
];

function FlagshipProject() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 4, ry: px * 5 });
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.1s ease",
      }}
      className="group relative overflow-hidden rounded-3xl"
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          padding: "1px",
          background: `linear-gradient(135deg, rgba(255,107,53,0.4), rgba(168,85,247,0.4), transparent 60%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(12,16,32,0.98) 0%, rgba(8,11,22,0.98) 100%)" }}
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: "linear-gradient(120deg, transparent, rgba(255,107,53,0.08), transparent 60%)" }}
        />

        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          {/* LEFT — Content */}
          <div className="relative p-8 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-2">
              <Tag variant="brand">Flagship Project</Tag>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: DIM }}>AI Healthcare Ecosystem</span>
            </div>

            <h3 className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-6xl" style={{ color: "#F0F4FF" }}>
              MEDLINK
              <span style={{
                background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>-AI</span>
            </h3>

            <p className="mt-5 max-w-lg text-[16px] leading-relaxed" style={{ color: DIM }}>
              An AI-powered healthcare ecosystem unifying digital health IDs, QR-based
              record access, AI-generated medical summaries and hospital workflow
              management — designed from the ground up for Indian clinics and patients.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Stethoscope, title: "Digital Health ID", note: "Portable patient identity", color: BRAND },
                { icon: Zap, title: "AI Medical Summaries", note: "LLM-assisted insights", color: VIOLET },
                { icon: Shield, title: "QR Record Access", note: "Secure & instant", color: GOLD },
                { icon: Activity, title: "Hospital Workflow", note: "End-to-end operations", color: BRAND },
              ].map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-3 rounded-xl p-3.5 transition-all hover:scale-[1.02]"
                  style={{
                    background: `${f.color}08`,
                    border: `1px solid ${f.color}20`,
                  }}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${f.color}15` }}
                  >
                    <f.icon className="h-4 w-4" style={{ color: f.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "#F0F4FF" }}>{f.title}</div>
                    <div className="text-xs" style={{ color: DIM }}>{f.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-1.5">
              {["React", "TypeScript", "Node.js", "Express", "AI/ML", "REST APIs"].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/shivanandray215"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
                  boxShadow: `0 6px 20px rgba(255,107,53,0.35)`,
                }}
              >
                View Case Study <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/shivanandray215"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#F0F4FF",
                }}
              >
                <Github className="h-4 w-4" /> Source
              </a>
            </div>
          </div>

          {/* RIGHT — Visual mock */}
          <div
            className="relative min-h-[360px] overflow-hidden lg:rounded-l-none"
            style={{ background: "linear-gradient(135deg, rgba(10,16,38,0.95), rgba(7,11,24,0.95))" }}
          >
            {/* Grid bg */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,107,53,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.5) 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
                maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
              }}
            />
            {/* Central glow */}
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
              style={{ background: `radial-gradient(circle, ${BRAND} 0%, ${VIOLET} 50%, transparent 70%)`, filter: "blur(50px)" }} />

            {/* Mock device */}
            <div className="relative z-10 flex h-full items-center justify-center p-8">
              <div
                className="w-full max-w-[280px] overflow-hidden rounded-2xl p-5 shadow-2xl"
                style={{
                  background: "rgba(10,14,28,0.95)",
                  border: "1px solid rgba(255,107,53,0.2)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,107,53,0.1)",
                }}
              >
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
                  <span className="ml-auto font-mono text-[10px]" style={{ color: DIM }}>medlink.ai/patient</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})` }}
                    >
                      <Stethoscope className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: DIM }}>Patient · ID #MA-9421</div>
                      <div className="text-sm font-semibold" style={{ color: "#F0F4FF" }}>Aarav Mehta</div>
                    </div>
                    <div
                      className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: "rgba(34,197,94,0.15)", color: "#86efac" }}
                    >
                      Stable
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { l: "Heart Rate", v: "72 bpm", w: "60%", c: BRAND },
                      { l: "BP", v: "118/76", w: "75%", c: VIOLET },
                      { l: "SpO₂", v: "98%", w: "90%", c: GOLD },
                    ].map((m) => (
                      <div
                        key={m.l}
                        className="rounded-lg p-2.5"
                        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span style={{ color: DIM }}>{m.l}</span>
                          <span className="font-mono" style={{ color: "#F0F4FF" }}>{m.v}</span>
                        </div>
                        <div className="mt-1.5 h-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                          <div className="h-full rounded-full" style={{ width: m.w, background: `linear-gradient(90deg, ${m.c}, ${VIOLET})` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="rounded-lg p-3"
                    style={{ background: `${BRAND}10`, border: `1px solid ${BRAND}25` }}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: BRAND }}>
                      <Zap className="h-3 w-3" /> AI Summary
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed" style={{ color: DIM }}>
                      Vitals trending normal. Recommend follow-up in 14 days.
                    </p>
                  </div>
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
    <PremiumCard className="flex flex-col p-7" delay={i * 0.07}>
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: `${p.color}14`, border: `1px solid ${p.color}28` }}
        >
          <p.icon className="h-5 w-5" style={{ color: p.color }} />
        </div>
        <Tag>{p.tag}</Tag>
      </div>

      <h3 className="mt-5 font-display text-2xl font-bold" style={{ color: "#F0F4FF" }}>{p.title}</h3>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: DIM }}>{p.description}</p>

      <ul className="mt-5 space-y-1.5">
        {p.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs" style={{ color: DIM }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} /> {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <a
          href="https://github.com/shivanandray215"
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
          style={{ color: DIM }}
        >
          <Github className="h-3.5 w-3.5" /> Source
        </a>
        <a href="#" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold transition-all group-hover:translate-x-0.5"
          style={{ color: p.color }}>
          Read more <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </PremiumCard>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Selected Work"
          title={<>Products that <span style={{
            background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>ship</span>.</>}
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

/* ─── ACHIEVEMENTS ────────────────────────────────────────────── */

const ACHIEVEMENTS = [
  {
    title: "Winner — Pitch Your Idea 3.0",
    note: "Top startup pitch among national entries.",
    year: "2024",
    icon: Trophy,
    level: "Winner",
    color: GOLD,
  },
  {
    title: "Finalist — XCELERATE 3.0 Ideathon",
    note: "National-level finalist for an AI product idea.",
    year: "2024",
    icon: Award,
    level: "Finalist",
    color: BRAND,
  },
  {
    title: "Finalist — CodeVeda 2.0 Hackathon",
    note: "Selected among top teams nationally.",
    year: "2024",
    icon: Award,
    level: "Finalist",
    color: BRAND,
  },
  {
    title: "5+ National Hackathons",
    note: "Consistent participation, shipping demos under 48 hours.",
    year: "2023–2025",
    icon: Rocket,
    level: "Participant",
    color: VIOLET,
  },
  {
    title: "Cybersecurity CTF Competitions",
    note: "Capture-the-flag participant across multiple events.",
    year: "2024",
    icon: Shield,
    level: "Participant",
    color: VIOLET,
  },
];

const LEVEL_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  Winner: {
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.3)",
    color: GOLD,
  },
  Finalist: {
    bg: "rgba(255,107,53,0.12)",
    border: "rgba(255,107,53,0.3)",
    color: BRAND,
  },
  Participant: {
    bg: "rgba(168,85,247,0.10)",
    border: "rgba(168,85,247,0.25)",
    color: VIOLET,
  },
};

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          kicker="Recognition"
          title={<>Validated by <span style={{
            background: `linear-gradient(135deg, ${GOLD}, ${BRAND})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>competition</span>.</>}
          sub="Selected results from hackathons, ideathons and national competitions."
        />

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[18px] top-4 bottom-4 w-[2px] rounded-full"
            style={{ background: `linear-gradient(180deg, transparent, rgba(255,107,53,0.3), rgba(168,85,247,0.3), transparent)` }}
          />

          <div className="space-y-5">
            {ACHIEVEMENTS.map((a, i) => {
              const ls = LEVEL_STYLES[a.level];
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                  className="relative pl-14"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full"
                    style={{
                      background: `${a.color}14`,
                      border: `2px solid ${a.color}35`,
                      boxShadow: `0 0 12px ${a.color}25`,
                    }}
                  >
                    <a.icon className="h-3.5 w-3.5" style={{ color: a.color }} />
                  </div>

                  <PremiumCard className="p-5" hover={false}>
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"
                      style={{ background: `linear-gradient(135deg, ${a.color}06, transparent)` }}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <div className="font-display text-lg font-semibold" style={{ color: "#F0F4FF" }}>{a.title}</div>
                        <p className="mt-1 text-sm" style={{ color: DIM }}>{a.note}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                          style={{ background: ls.bg, border: `1px solid ${ls.border}`, color: ls.color }}
                        >
                          {a.level}
                        </span>
                        <span className="font-mono text-xs" style={{ color: DIM }}>{a.year}</span>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ──────────────────────────────────────────────── */

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          kicker="Experience"
          title={<>Where I've <span style={{
            background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>contributed</span>.</>}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="group relative overflow-hidden rounded-3xl p-8 sm:p-10"
          style={{
            background: "linear-gradient(145deg, rgba(15,21,40,0.97) 0%, rgba(10,14,28,0.97) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Gradient border top */}
          <div
            className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, ${BRAND}, ${VIOLET})` }}
          />

          {/* Background glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.08]"
            style={{ background: `radial-gradient(circle, ${BRAND}, transparent 70%)`, filter: "blur(40px)" }}
          />

          <div className="relative grid gap-6 sm:grid-cols-[auto_1fr]">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-white"
              style={{
                background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
                boxShadow: `0 8px 24px rgba(255,107,53,0.35)`,
              }}
            >
              <Briefcase className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-semibold" style={{ color: "#F0F4FF" }}>
                  Startup Sphere Society
                </h3>
                <Tag variant="brand">Member · Present</Tag>
              </div>
              <div className="mt-1 text-sm" style={{ color: DIM }}>ITE • MAIT, GGSIPU</div>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: DIM }}>
                Collaborating with a cohort of builders on AI and SaaS startup ideas —
                contributing to innovation activities, technical sessions and pitch days
                that bridge college-level execution and real-world product thinking.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Innovation Activities", "Technical Discussions", "Startup Pitch Sessions", "Team Collaboration"].map(t => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── RESUME ──────────────────────────────────────────────────── */

export function ResumeSection() {
  return (
    <section id="resume" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          kicker="Resume"
          title={<>Get the <span style={{
            background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>full story</span>.</>}
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-2xl"
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl"
            style={{ background: `linear-gradient(135deg, ${BRAND}40, ${VIOLET}40)` }}
          />

          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
            style={{
              background: "linear-gradient(145deg, rgba(15,21,40,0.98) 0%, rgba(10,14,28,0.98) 100%)",
              border: "1px solid rgba(255,107,53,0.25)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl"
              style={{ background: `linear-gradient(90deg, ${BRAND}, ${VIOLET})` }}
            />

            <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
              <div
                className="flex h-20 w-16 items-center justify-center rounded-xl"
                style={{
                  background: `${BRAND}14`,
                  border: `1px solid ${BRAND}30`,
                }}
              >
                <FileText className="h-8 w-8" style={{ color: BRAND }} />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest" style={{ color: DIM }}>
                  CV.pdf · Updated 2025
                </div>
                <h3 className="mt-1 font-display text-2xl font-semibold" style={{ color: "#F0F4FF" }}>
                  Shivanand Ray — Resume
                </h3>
                <p className="mt-1.5 text-sm" style={{ color: DIM }}>
                  B.Tech CSE (AI & ML) • Projects, achievements and a deeper technical breakdown.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href="/resume.pdf"
                download="Shivanand_Ray_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
                  boxShadow: `0 8px 24px rgba(255,107,53,0.35)`,
                }}
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
              <a
                href="/resume.pdf"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.03]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#F0F4FF",
                }}
              >
                <ExternalLink className="h-4 w-4" /> View Online
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─────────────────────────────────────────────────── */

export function ContactSection() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <section id="contact" className="relative px-6 py-32">
      {/* Top divider */}
      <div className="mx-auto mb-24 max-w-6xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.3), rgba(168,85,247,0.3), transparent)" }} />

      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Contact"
          title={<>Let's build <span style={{
            background: `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>something real</span>.</>}
          sub="Internships, research, startup roles or collaborations — my inbox is open."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl p-8 lg:col-span-3 lg:p-10"
            style={{
              background: "linear-gradient(145deg, rgba(15,21,40,0.97) 0%, rgba(10,14,28,0.97) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl"
              style={{ background: `linear-gradient(90deg, ${BRAND}, ${VIOLET})` }}
            />

            <h3 className="mb-6 font-display text-xl font-semibold" style={{ color: "#F0F4FF" }}>Send a message</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {["Name", "Email"].map((label) => (
                <label key={label} className="block">
                  <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest" style={{ color: DIM }}>
                    {label}
                  </span>
                  <input
                    required
                    type={label === "Email" ? "email" : "text"}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: "#F0F4FF",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${BRAND}60`;
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,107,53,0.04)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                    placeholder={label === "Email" ? "you@company.com" : "Your name"}
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest" style={{ color: DIM }}>
                Message
              </span>
              <textarea
                required
                rows={6}
                className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "#F0F4FF",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${BRAND}60`;
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,107,53,0.04)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
                placeholder="Tell me about your project, role or idea…"
              />
            </label>
            <AnimatePresence mode="wait">
              <motion.button
                key={sent ? "sent" : "idle"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                type="submit"
                className="mt-6 group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
                style={{
                  background: sent
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : `linear-gradient(135deg, ${BRAND}, ${VIOLET})`,
                  boxShadow: sent
                    ? "0 8px 24px rgba(34,197,94,0.35)"
                    : `0 8px 24px rgba(255,107,53,0.35)`,
                }}
              >
                {sent ? (
                  "Message queued ✓"
                ) : (
                  <>Send Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
                )}
              </motion.button>
            </AnimatePresence>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="space-y-3 lg:col-span-2"
          >
            {[
              { icon: Mail, label: "Email", value: "shivanandray215@gmail.com", href: "mailto:shivanandray215@gmail.com", color: BRAND },
              { icon: Github, label: "GitHub", value: "shivanandray215", href: "https://github.com/shivanandray215", color: VIOLET },
              { icon: Linkedin, label: "LinkedIn", value: "shivanandray215", href: "https://linkedin.com/in/shivanandray215", color: BRAND },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label} href={href} target="_blank" rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl p-5 transition-all hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(145deg, rgba(15,21,40,0.9) 0%, rgba(10,14,28,0.9) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}35`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-110"
                  style={{ background: `${color}14`, border: `1px solid ${color}28` }}
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: DIM }}>{label}</div>
                  <div className="truncate text-sm font-medium" style={{ color: "#F0F4FF" }}>{value}</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: DIM }} />
              </a>
            ))}

            {/* Availability card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono font-medium uppercase tracking-widest" style={{ color: "#6ee7b7" }}>
                  Available Now
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: DIM }}>
                Open to internships, research collaborations and startup roles in
                AI, ML and full-stack engineering — globally, remote or on-site.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div
          className="mt-20 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="font-mono text-xs" style={{ color: DIM }}>
            © {new Date().getFullYear()} Shivanand Ray · All rights reserved
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: DIM }}>
            <span>Built with</span>
            <span style={{ color: BRAND }}>React</span>
            <span>+</span>
            <span style={{ color: VIOLET }}>TypeScript</span>
            <span>+</span>
            <span style={{ color: GOLD }}>Framer Motion</span>
          </div>
        </div>
      </div>
    </section>
  );
}
