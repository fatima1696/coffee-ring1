import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, easeInOutQuint, lerp, prog} from './palette';
import {Camera, Key} from './Camera';
import {SceneShell, World, Backdrop} from './Shell';

// Beat 8: ring on the left, flat disc on the right. Whip pan across, then crane up.
const keys: Key[] = [
  {f: 0, s: 2.4, fx: 285, fy: 960, r: 0},
  {f: 18, s: 2.4, fx: 285, fy: 960, r: 0},
  {f: 48, s: 2.4, fx: 795, fy: 960, r: 0, ease: easeInOutQuint},
  {f: 72, s: 2.4, fx: 795, fy: 960, r: 0},
  {f: 165, s: 0.95, fx: 540, fy: 960, r: 0},
  {f: 180, s: 0.95, fx: 540, fy: 960, r: 0},
];

export const Scene8TwoStains: React.FC = () => {
  const frame = useCurrentFrame();
  const R = 235;
  const glint = lerp(-1400, 1900, prog(frame, 0, 180));
  return (
    <SceneShell bg={C.glass}>
      <Camera frame={frame} keys={keys}>
        <World>
          <Backdrop fill={C.glass} />
          <filter id="s8wob" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="12" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="10" />
          </filter>
          {/* ring */}
          <g filter="url(#s8wob)">
            <circle cx={285} cy={960} r={R} fill={C.coffee} />
            <circle cx={285} cy={960} r={R - 54} fill={C.glass} />
            <circle cx={285} cy={960} r={R - 54} fill={C.coffeeLight} opacity={0.15} />
          </g>
          <circle cx={285} cy={960} r={R - 3} fill="none" stroke={C.ink} strokeWidth={7} opacity={0.6} />
          {/* flat, even disc */}
          <g filter="url(#s8wob)">
            <circle cx={795} cy={960} r={R} fill={C.coffeeMid} />
          </g>
          <circle cx={795} cy={960} r={R - 3} fill="none" stroke={C.ink} strokeWidth={5} opacity={0.4} />
          {/* a slow glint across the glass */}
          <g transform={`rotate(24 ${glint} 960)`}>
            <rect x={glint - 90} y={-3000} width={180} height={8000} fill={C.paper} opacity={0.3} />
            <rect x={glint + 150} y={-3000} width={40} height={8000} fill={C.paper} opacity={0.22} />
          </g>
        </World>
      </Camera>
    </SceneShell>
  );
};
