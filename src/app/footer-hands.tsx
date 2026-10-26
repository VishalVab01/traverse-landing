"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const hands = [
  { side: "left", src: "/images/footer/hands-left.webp" },
  { side: "right", src: "/images/footer/hands-right.webp" },
] as const;

type HandFrame = {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  wrapper: HTMLElement;
  art: HTMLElement;
  width: number;
  height: number;
  pixels: Uint8ClampedArray | null;
  pointerX: number;
  pointerY: number;
  loaded: boolean;
};

export default function FooterHands() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glyphs = " .,:;!+*#%@";
    const frames: HandFrame[] = [];
    const observers: ResizeObserver[] = [];
    const cleanups: Array<() => void> = [];

    const draw = (frame: HandFrame, time: number) => {
      if (!frame.pixels) return;
      const context = frame.canvas.getContext("2d");
      if (!context) return;
      const { width, height, pixels } = frame;
      context.clearRect(0, 0, width, height);
      context.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const cellWidth = width < 400 ? 6 : 8;
      const cellHeight = width < 400 ? 8 : 10;
      const phase = time * 0.0015;
      for (let y = cellHeight / 2; y < height; y += cellHeight) {
        for (let x = cellWidth / 2; x < width; x += cellWidth) {
          const offset = (Math.floor(y) * width + Math.floor(x)) * 4;
          const alpha = pixels[offset + 3] / 255;
          if (alpha < 0.12) continue;

          const luminance = pixels[offset] * 0.299 + pixels[offset + 1] * 0.587 + pixels[offset + 2] * 0.114;
          const dx = Math.abs(frame.pointerX - x);
          const dy = Math.abs(frame.pointerY - y);
          const influence = Math.max(0, 1 - dx / 320) * Math.max(0, 1 - dy / 230);
          const shimmer = (Math.sin(x * 0.034 + y * 0.023 + phase) + 1) * 0.5;
          const tone = Math.min(1, luminance / 220 + influence * 0.68 + shimmer * 0.08);
          const index = Math.min(glyphs.length - 1, Math.max(1, Math.round(tone * (glyphs.length - 1))));
          const jitter = influence > 0.04 ? Math.round(influence * 4 + shimmer * 2) : 0;
          const glyph = glyphs[Math.min(glyphs.length - 1, index + jitter)];
          const opacity = Math.min(0.98, 0.38 + tone * 0.43 + influence * 0.28) * alpha;
          context.fillStyle = `rgba(232, 236, 244, ${opacity})`;
          context.fillText(glyph, x, y);
        }
      }
    };

    const prepare = (frame: HandFrame) => {
      const width = Math.max(1, Math.round(frame.wrapper.clientWidth));
      const height = Math.max(1, Math.round(frame.wrapper.clientHeight));
      if (!frame.image.naturalWidth || !frame.image.naturalHeight) return;
      const scale = Math.min(width / frame.image.naturalWidth, height / frame.image.naturalHeight);
      const imageWidth = frame.image.naturalWidth * scale;
      const imageHeight = frame.image.naturalHeight * scale;
      const sample = document.createElement("canvas");
      sample.width = width;
      sample.height = height;
      const sampleContext = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) return;
      sampleContext.drawImage(frame.image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight);

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      frame.canvas.width = Math.round(width * dpr);
      frame.canvas.height = Math.round(height * dpr);
      frame.canvas.style.width = "100%";
      frame.canvas.style.height = "100%";
      frame.canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      frame.width = width;
      frame.height = height;
      frame.pixels = sampleContext.getImageData(0, 0, width, height).data;
      frame.loaded = true;
      draw(frame, 0);
    };

    for (const hand of hands) {
      const wrapper = stage.querySelector<HTMLElement>(`.footer-hand-${hand.side}`);
      const art = wrapper?.querySelector<HTMLElement>(".footer-hand-art");
      const canvas = wrapper?.querySelector("canvas");
      if (!wrapper || !art || !canvas) continue;
      const image = new Image();
      image.decoding = "async";
      const frame: HandFrame = { canvas, image, wrapper, art, width: 0, height: 0, pixels: null, pointerX: -1000, pointerY: -1000, loaded: false };
      frames.push(frame);
      image.onload = () => prepare(frame);
      image.onerror = () => { frame.loaded = false; };
      image.src = hand.src;
      if (image.complete && image.naturalWidth) prepare(frame);
      const observer = new ResizeObserver(() => prepare(frame));
      observer.observe(wrapper);
      observers.push(observer);
    }

    const updatePointer = (event: PointerEvent) => {
      frames.forEach((frame) => {
        const bounds = frame.wrapper.getBoundingClientRect();
        frame.pointerX = event.clientX - bounds.left;
        frame.pointerY = event.clientY - bounds.top;
        const outside = event.clientX < bounds.left - 320 || event.clientX > bounds.right + 320 || event.clientY < bounds.top - 230 || event.clientY > bounds.bottom + 230;
        if (outside) {
          frame.pointerX = -1000;
          frame.pointerY = -1000;
          frame.art.style.transform = "translate3d(0,0,0) rotate(0deg)";
        } else {
          const horizontal = Math.max(-1, Math.min(1, (frame.pointerX / frame.width - 0.5) * 2));
          const vertical = Math.max(-1, Math.min(1, (frame.pointerY / frame.height - 0.5) * 2));
          frame.art.style.transform = `translate3d(${horizontal * 6}px,${vertical * 4}px,0) rotate(${horizontal * 1.6}deg)`;
        }
        if (reducedMotion && frame.loaded) draw(frame, 0);
      });
    };
    const resetPointer = () => frames.forEach((frame) => {
      frame.pointerX = -1000;
      frame.pointerY = -1000;
      frame.art.style.transform = "translate3d(0,0,0) rotate(0deg)";
    });
    stage.addEventListener("pointermove", updatePointer, { passive: true });
    stage.addEventListener("pointerleave", resetPointer, { passive: true });

    let animationFrame = 0;
    let previousTime = 0;
    let visible = false;
    const left = stage.querySelector<HTMLElement>(".footer-hand-left");
    const right = stage.querySelector<HTMLElement>(".footer-hand-right");
    if (!reducedMotion) {
      gsap.set(left, { x: -74, opacity: 0.35 });
      gsap.set(right, { x: 74, opacity: 0.35 });
    }
    const animate = (time: number) => {
      animationFrame = 0;
      if (!visible || document.hidden) return;
      if (time - previousTime >= 42) {
        previousTime = time;
        frames.forEach((frame) => { if (frame.loaded) draw(frame, time); });
      }
      animationFrame = window.requestAnimationFrame(animate);
    };
    const start = () => {
      visible = true;
      if (!reducedMotion && !animationFrame) animationFrame = window.requestAnimationFrame(animate);
      else if (reducedMotion) frames.forEach((frame) => { if (frame.loaded) draw(frame, 0); });
    };
    const stop = () => {
      visible = false;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!reducedMotion) {
          gsap.to(left, { x: 0, opacity: 1, duration: 1.45, ease: "power3.out", overwrite: true });
          gsap.to(right, { x: 0, opacity: 1, duration: 1.45, ease: "power3.out", overwrite: true });
        }
        start();
      } else {
        stop();
        if (!reducedMotion) {
          gsap.to(left, { x: -74, opacity: 0.35, duration: 1.45, ease: "power3.inOut", overwrite: true });
          gsap.to(right, { x: 74, opacity: 0.35, duration: 1.45, ease: "power3.inOut", overwrite: true });
        }
      }
    }, { threshold: 0.22 });
    visibilityObserver.observe(stage);

    if (!reducedMotion) {
      const onVisibilityChange = () => {
        if (document.hidden) stop();
        else if (stage.getBoundingClientRect().bottom > 0 && stage.getBoundingClientRect().top < window.innerHeight) start();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      cleanups.push(() => document.removeEventListener("visibilitychange", onVisibilityChange));
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      gsap.killTweensOf([left, right]);
      visibilityObserver.disconnect();
      observers.forEach((observer) => observer.disconnect());
      stage.removeEventListener("pointermove", updatePointer);
      stage.removeEventListener("pointerleave", resetPointer);
      frames.forEach((frame) => { frame.image.onload = null; frame.image.onerror = null; });
      stop();
    };
  }, []);

  return (
    <div className="footer-hands-stage" ref={stageRef} aria-hidden="true">
      {hands.map(({ side, src }) => (
        <div className={`footer-hand footer-hand-${side}`} key={side}>
          <div className="footer-hand-art"><canvas data-image={src} /></div>
        </div>
      ))}
      <span className="footer-hands-glow" />
    </div>
  );
}
