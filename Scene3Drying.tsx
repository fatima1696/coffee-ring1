import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, easeInOut, easeOut, lerp, prog} from './palette';
import {Camera, Key} from './Camera';
import {SceneShell, World, Backdrop} from './Shell';

// Beat 3: the middle drains, the edge darkens, the circle never shrinks.
const keys: Key[] = [
  {f: 0, s: 1.0, fx: 540, fy: 960, r: 0},
  {f: 100, s: 1.4, fx: 540, fy: 960, r: -22},
  {f: 118, s: 1.5, fx: 540, fy: 960, r: -26},
  {f: 150, s: 0.85, fx: 540, fy: 960, r: 0, ease: easeOut},
];

export const Scene3Drying: React.FC = () => {
  const frame = useCurrentFrame();
  const R = 300;
  const p = prog(frame, 10, 125);
  const band = lerp(10, 80, easeInOut(p));
  const pale = easeInOut(prog(frame, 10, 120));
  return (
    <SceneShell bg={C.glass}>
      <Camera frame={frame} keys={keys}>
        <World>
          <Backdrop fill={C.glass} />
          <filter id="s3wob" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="10" />
          </filter>
          <g filter="url(#s3wob)">
            <circle cx={540} cy={960} r={R} fill={C.coffee} />
            <circle cx={540} cy={960} r={R - band} fill={C.wood} opacity={pale} />
          </g>
          {/* swirls: the liquid being pulled outward */}
          {Array.from({length: 6}, (_, i) => {
            const ph = (frame * 0.012 + i / 6) % 1;
            const rr = lerp(40, R - band - 8, ph);
            return (
              <circle
                key={i}
                cx={540}
                cy={960}
                r={rr}
                fill="none"
                stroke={C.coffeeLight}
                strokeWidth={9}
                strokeLinecap="round"
                strokeDasharray={`${rr * 0.9} ${rr * 0.8}`}
                opacity={Math.sin(ph * Math.PI) * 0.7 * (1 - 0.25 * p)}
                transform={`rotate(${frame * 2 + i * 50} 540 960)`}
              />
            );
          })}
          <circle cx={540} cy={960} r={R - 2} fill="none" stroke={C.ink} strokeWidth={8} />
          <ellipse cx={440} cy={850} rx={86} ry={38} fill={C.paper} opacity={0.6 * (1 - p)} transform="rotate(-35 440 850)" />
        </World>
      </Camera>
    </SceneShell>
  );
};
