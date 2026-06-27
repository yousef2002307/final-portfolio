/**
 * Decorative animated aurora/glow background. Purely presentational — sits
 * behind all content at z-0 and ignores pointer events.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(124,58,237,0.18),transparent_60%)]" />

      {/* Floating glow orbs */}
      <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-violet-glow/20 blur-[120px] animate-float" />
      <div className="absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-blue-glow/20 blur-[120px] animate-float [animation-delay:1.5s]" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan-glow/15 blur-[120px] animate-float [animation-delay:3s]" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    </div>
  );
}
