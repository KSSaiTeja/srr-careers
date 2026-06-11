"use client";

import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";

const vertex = /* glsl */ `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTime;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 center = vec2(0.72, 0.18) + uMouse * 0.08;
    vec2 center2 = vec2(0.15, 0.55) - uMouse * 0.05;

    float d1 = length(uv - center);
    float d2 = length(uv - center2);

    vec3 lavender = vec3(0.957, 0.953, 1.0);
    vec3 cream = vec3(0.996, 0.961, 0.886);
    vec3 softPurple = vec3(0.933, 0.929, 0.992);

    float blob1 = smoothstep(0.65, 0.0, d1 + sin(uTime * 0.35) * 0.02);
    float blob2 = smoothstep(0.55, 0.0, d2 + cos(uTime * 0.28) * 0.015);

    vec3 color = mix(vec3(1.0), lavender, blob1 * 0.55);
    color = mix(color, cream, blob2 * 0.45);
    color = mix(color, softPurple, blob1 * blob2 * 0.35);

    gl_FragColor = vec4(color, 0.42);
  }
`;

export function WebGLAmbient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const renderer = new Renderer({
      canvas,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
    });

    const { gl } = renderer;
    const geometry = new Triangle(gl);
    const mouse = new Vec2(0.5, 0.5);
    const targetMouse = new Vec2(0.5, 0.5);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: new Vec2(1, 1) },
        uMouse: { value: mouse },
        uTime: { value: 0 },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value.set(width, height);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      );
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let frame = 0;
    const update = (time: number) => {
      frame = requestAnimationFrame(update);
      mouse.lerp(targetMouse, 0.06);
      program.uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
