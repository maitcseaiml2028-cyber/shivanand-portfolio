import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Full-page ambient background with aurora, grid, and particles */
export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; hue: number };
    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx?.scale(dpr, dpr);
    }

    function init() {
      particles.length = 0;
      const count = Math.min(90, Math.floor((w * h) / 16000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          size: Math.random() * 1.2 + 0.5,
          // Alternate between orange (15-25) and violet (270-290) hues
          hue: Math.random() > 0.5 ? 15 + Math.random() * 10 : 270 + Math.random() * 20,
        });
      }
    }

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update + bounce
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const maxD = 120;
          if (d2 < maxD * maxD) {
            const alpha = (1 - Math.sqrt(d2) / maxD) * 0.14;
            ctx.strokeStyle = `hsla(${a.hue}, 85%, 62%, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Mouse connection
        const dxm = a.x - mx, dym = a.y - my;
        const dm2 = dxm * dxm + dym * dym;
        const mouseD = 200;
        if (dm2 < mouseD * mouseD) {
          const alpha = (1 - Math.sqrt(dm2) / mouseD) * 0.55;
          ctx.strokeStyle = `rgba(255, 107, 53, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.7)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function onResize() { resize(); init(); }

    resize(); init(); frame();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep dark base */}
      <div className="absolute inset-0" style={{ background: "#06080F" }} />

      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 mesh-bg opacity-90" />

      {/* Aurora blob — orange */}
      <motion.div
        className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full opacity-[0.12]"
        style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)", filter: "blur(80px)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.07, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora blob — violet */}
      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-[0.10]"
        style={{ background: "radial-gradient(circle, #A855F7 0%, transparent 70%)", filter: "blur(80px)" }}
        animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Aurora blob — bottom amber */}
      <motion.div
        className="absolute bottom-0 left-1/3 h-[400px] w-[500px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)", filter: "blur(80px)" }}
        animate={{ x: [0, 60, 0], y: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,#06080F_100%)]" />
    </div>
  );
}

/** Cursor glow that follows the mouse */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let tx = -440, ty = -440;
    let cx = -440, cy = -440;

    function onMove(e: MouseEvent) {
      tx = e.clientX - 220;
      ty = e.clientY - 220;
    }

    function loop() {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[440px] w-[440px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(255,107,53,0.18) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)",
        filter: "blur(4px)",
        opacity: 0.6,
      }}
    />
  );
}

/** Scroll progress bar at the top */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      ref.current.style.width = `${pct}%`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-[2px] w-full" style={{ background: "rgba(255,255,255,0.04)" }}>
      <div
        ref={ref}
        className="h-full transition-[width] duration-75"
        style={{
          background: "linear-gradient(90deg, #FF6B35, #A855F7, #F59E0B)",
          boxShadow: "0 0 8px rgba(255,107,53,0.8)",
        }}
      />
    </div>
  );
}
