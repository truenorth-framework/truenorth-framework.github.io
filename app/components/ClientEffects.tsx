"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    // Cursor glow
    const glow = document.getElementById("cursor-glow");
    const handleMouseMove = (e: MouseEvent) => {
      if (!glow) return;
      requestAnimationFrame(() => {
        if (glow) {
          glow.style.left = e.clientX + "px";
          glow.style.top = e.clientY + "px";
        }
      });
    };

    // Scroll progress
    const progress = document.getElementById("scroll-progress");
    const handleScroll = () => {
      if (!progress) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = percent + "%";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
