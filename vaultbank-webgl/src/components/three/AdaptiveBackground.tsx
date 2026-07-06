/**
 * AdaptiveBackground.tsx – Wrapper pintar (Redesigned v5)
 *
 * Otomatis pilih WebGL / Sketch / Hybrid sesuai pilihan user.
 * Tidak ada tabrakan z-index antar layer.
 *
 * Z-index mapping:
 *  - WebGL canvas: z-0 (fixed, paling belakang)
 *  - Sketch SVG: z-1 (fixed, di atas WebGL)
 *  - Content: z-10+ (relative, di atas semua background)
 */

import React from "react";
import { useBackgroundMode } from "@/theme/BackgroundModeContext";
import { WebGLBackground } from "./WebGLBackground";
import { SketchScrollBackground } from "@/components/illustrations/SketchScrollBackground";

export const AdaptiveBackground: React.FC<{
  intensity?: "full" | "subtle" | "minimal" | "hero";
}> = ({ intensity = "subtle" }) => {
  const { bgMode } = useBackgroundMode();

  if (bgMode === "webgl") {
    return (
      <WebGLBackground
        intensity={
          intensity === "full" || intensity === "hero" ? "hero" : "subtle"
        }
      />
    );
  }

  if (bgMode === "sketch") {
    return (
      <SketchScrollBackground
        intensity={
          intensity === "hero" || intensity === "full"
            ? "full"
            : intensity === "minimal"
              ? "minimal"
              : "subtle"
        }
      />
    );
  }

  // ─── HYBRID MODE ───
  // WebGL dimmed di belakang, Sketch tipis di depannya
  // Total visual tetap balanced, tidak overwhelm konten
  return (
    <>
      <div style={{ opacity: 0.3 }}>
        <WebGLBackground intensity="subtle" />
      </div>
      <SketchScrollBackground intensity="subtle" />
    </>
  );
};

export default AdaptiveBackground;
