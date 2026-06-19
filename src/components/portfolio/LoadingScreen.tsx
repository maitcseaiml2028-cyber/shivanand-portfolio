import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { text: "Initializing systems...", pct: 20 },
  { text: "Loading AI modules...", pct: 45 },
  { text: "Compiling projects...", pct: 70 },
  { text: "Rendering portfolio...", pct: 90 },
  { text: "Ready.", pct: 100 },
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < STEPS.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), 520);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setDone(true), 600);
    const t2 = setTimeout(onDone, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [step, onDone]);

  const pct = STEPS[step].pct;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#06080F" }}
          exit={{ opacity: 0, filter: "blur(24px)", scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.1, 1] }}
        >
          {/* Ambient glows */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
              style={{ background: "radial-gradient(circle, #FF6B35 0%, #A855F7 60%, transparent 80%)" }}
            />
            <div
              className="absolute right-0 top-0 h-80 w-80 rounded-full opacity-15 blur-[100px]"
              style={{ background: "#A855F7" }}
            />
            <div
              className="absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-12 blur-[100px]"
              style={{ background: "#FF6B35" }}
            />
          </div>

          {/* Rotating ring decoration */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="h-full w-full rounded-full"
              style={{
                border: "1px solid",
                borderImage: "linear-gradient(135deg, rgba(255,107,53,0.3), rgba(168,85,247,0.3), transparent) 1",
                borderRadius: "50%",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="h-full w-full rounded-full"
              style={{
                border: "1px solid rgba(255,107,53,0.15)",
                borderRadius: "50%",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Logo */}
          <motion.div
            className="relative z-10 mb-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo mark */}
            <div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl font-display text-3xl font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #FF6B35, #A855F7)",
                boxShadow: "0 0 60px rgba(255,107,53,0.4), 0 0 30px rgba(168,85,247,0.3)",
              }}
            >
              SR
            </div>
            <h1
              className="font-display text-4xl font-bold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #FF6B35 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Shivanand Ray
            </h1>
            <p className="mt-1 font-mono text-xs tracking-[0.25em] uppercase" style={{ color: "#8892A4" }}>
              AI/ML Engineer · Full Stack Developer
            </p>
          </motion.div>

          {/* Status text */}
          <div className="relative z-10 mb-6 h-6 w-80 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm"
                style={{ color: "#8892A4" }}
              >
                <span style={{ color: "#FF6B35" }}>›</span> {STEPS[step].text}
                <span className="animate-blink ml-1" style={{ color: "#FF6B35" }}>▊</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="relative z-10 h-[2px] w-72 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #FF6B35, #A855F7)",
                boxShadow: "0 0 12px rgba(255,107,53,0.8)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Progress percentage */}
          <motion.div
            className="relative z-10 mt-3 font-mono text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {pct}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
