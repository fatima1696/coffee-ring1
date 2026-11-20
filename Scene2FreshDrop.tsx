import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, easeOut} from './palette';
import {Camera, Key} from './Camera';
import {SceneShell, World, Backdrop} from './Shell';

// Beat 2: a perfect fresh drop. Rush in from wide to macro, finish with a quick tilt.
const keys: Key[] = [
  {f: 0, s: 0.55, fx: 540, fy: 960, r: -6},
  {f: 100, s: 1.35, fx: 540, fy: 960, r: 0},
  {f: 120, s: 1.42, fx: 540, fy: 960, r: 6, ease: easeOut},
];

export const Scene2FreshDrop: React.FC = () => {
  const frame = useCurrentFrame();
  const R = 300 + Math.sin(frame * 0.9) * 3;
  return (
    <SceneShell bg={C.glass}>
      <Camera frame={frame} keys={keys}>
        <World>
          <Backdrop fill={C.glass} />
          <ellipse cx={560} cy={990} rx={R + 20} ry={R + 12} fill={C.ink} opacity={0.08} />
          <filter id="s2wob" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="10" />
          </filter>
          <g filter="url(#s2wob)">
            <circle cx={540} cy={960} r={R} fill={C.coffee} />
          </g>
          <circle cx={540} cy={960} r={R} fill="none" stroke={C.ink} strokeWidth={6} />
          <ellipse cx={440} cy={850} rx={86} ry={38} fill={C.paper} opacity={0.7} transform="rotate(-35 440 850)" />
          <ellipse cx={640} cy={1100} rx={46} ry={14} fill={C.paper} opacity={0.32} transform="rotate(-35 640 1100)" />
        </World>
      </Camera>
    </SceneShell>
  );
};
