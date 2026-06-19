import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Wins" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastY);
      setScrolled(y > 40);
      setLastY(y);

      let current = "home";
      for (const it of NAV_ITEMS) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 160) current = it.id;
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.6, 0.05, 0.1, 1] }}
            className="fixed left-1/2 top-4 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl"
          >
            <div
              className="relative flex items-center justify-between rounded-2xl px-4 py-2.5"
              style={{
                background: scrolled
                  ? "rgba(6, 8, 15, 0.85)"
                  : "rgba(6, 8, 15, 0.65)",
                backdropFilter: "blur(32px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: scrolled
                  ? "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
                  : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Gradient top border shimmer */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.5), rgba(168,85,247,0.5), transparent)" }}
              />

              {/* Logo */}
              <a
                href="#home"
                className="flex items-center gap-2.5 shrink-0"
                onClick={() => setMobileOpen(false)}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35, #A855F7)",
                    boxShadow: "0 0 16px rgba(255,107,53,0.4)",
                  }}
                >
                  SR
                </div>
                <span
                  className="font-display text-base font-bold hidden sm:block"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35, #A855F7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Shivanand Ray
                </span>
              </a>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-0.5">
                {NAV_ITEMS.map((it) => (
                  <a
                    key={it.id}
                    href={`#${it.id}`}
                    className="relative rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200"
                    style={{
                      color: active === it.id ? "#F0F4FF" : "#8892A4",
                    }}
                    onMouseEnter={(e) => {
                      if (active !== it.id)
                        (e.currentTarget as HTMLElement).style.color = "#F0F4FF";
                    }}
                    onMouseLeave={(e) => {
                      if (active !== it.id)
                        (e.currentTarget as HTMLElement).style.color = "#8892A4";
                    }}
                  >
                    {active === it.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "rgba(255,107,53,0.12)",
                          border: "1px solid rgba(255,107,53,0.25)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{it.label}</span>
                  </a>
                ))}
              </div>

              {/* CTA + Mobile toggle */}
              <div className="flex items-center gap-2">
                <a
                  href="#contact"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35, #A855F7)",
                    boxShadow: "0 4px 14px rgba(255,107,53,0.35)",
                  }}
                >
                  Let's Talk
                </a>
                <button
                  onClick={() => setMobileOpen((o) => !o)}
                  className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#F0F4FF",
                  }}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 overflow-hidden rounded-2xl"
                  style={{
                    background: "rgba(6, 8, 15, 0.95)",
                    backdropFilter: "blur(32px)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                  }}
                >
                  <div className="p-3 grid grid-cols-2 gap-1">
                    {NAV_ITEMS.map((it) => (
                      <a
                        key={it.id}
                        href={`#${it.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all"
                        style={{
                          background: active === it.id ? "rgba(255,107,53,0.12)" : "transparent",
                          border: active === it.id ? "1px solid rgba(255,107,53,0.25)" : "1px solid transparent",
                          color: active === it.id ? "#F0F4FF" : "#8892A4",
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ background: active === it.id ? "#FF6B35" : "rgba(255,255,255,0.2)" }}
                        />
                        {it.label}
                      </a>
                    ))}
                  </div>
                  <div className="border-t p-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <a
                      href="#contact"
                      onClick={() => setMobileOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
                      style={{ background: "linear-gradient(135deg, #FF6B35, #A855F7)" }}
                    >
                      Let's Talk
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
