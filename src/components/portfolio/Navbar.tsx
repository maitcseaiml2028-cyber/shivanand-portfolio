import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastY);
      setLastY(y);

      // active section
      let current = "home";
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 140) current = it.id;
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.6, 0.05, 0.1, 1] }}
          className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
        >
          <div className="glass-strong flex items-center gap-1 rounded-full px-2 py-2 shadow-2xl">
            <a href="#home" className="px-3 font-display text-sm font-bold text-gradient-brand">SR.</a>
            <div className="hidden md:flex items-center gap-0.5">
              {items.map((it) => (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    active === it.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === it.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{it.label}</span>
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="ml-1 hidden rounded-full bg-gradient-to-r from-brand to-brand-2 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-brand/30 transition-transform hover:scale-105 md:inline-flex"
            >
              Let's talk
            </a>

            {/* mobile menu — simple anchor list */}
            <div className="md:hidden flex items-center gap-1 overflow-x-auto max-w-[60vw]">
              {items.slice(0, 5).map((it) => (
                <a key={it.id} href={`#${it.id}`} className="px-2 py-1 text-[11px] text-muted-foreground whitespace-nowrap">
                  {it.label}
                </a>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
