import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "Initializing Portfolio...",
  "Loading AI Systems...",
  "Loading Projects...",
  "Welcome, Shivanand",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < lines.length - 1) {
      const t = setTimeout(() => setStep(step + 1), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 900);
    const t2 = setTimeout(onDone, 1600);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [step, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background mesh-bg"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.7, ease: [0.6, 0.05, 0.1, 1] }}
        >
          <motion.div
            className="mb-10 text-6xl font-display font-bold tracking-tight text-gradient-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SR
          </motion.div>

          <div className="h-7 mb-8 w-[320px] text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="font-mono text-sm text-muted-foreground"
              >
                {lines[step]}
                <span className="animate-blink ml-1">_</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="h-[2px] w-72 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-brand to-brand-2"
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / lines.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
