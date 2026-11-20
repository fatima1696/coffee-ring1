import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, easeOut, rng} from './palette';
import {Camera, Key} from './Camera';
import {SceneShell, World, Backdrop} from './Shell';

// Beat 1: the finished ring on a table. Fast pull-out from the empty middle to the whole table.
const keys: Key[] = [
  {f: 0, s: 3.6, fx: 470, fy: 900, r: 10},
  {f: 100, s: 1.0, fx: 540, fy: 960, r: 0, ease: easeOut},
  {f: 120, s: 1.05, fx: 540, fy: 960, r: 0},
];

export const Scene1Ring: React.FC = () => {
  const frame = useCurrentFrame();
  const r = rng(11);
  const crumbs = Array.from({length: 9}, () => ({
    x: 80 + r() * 900,
    y: 150 + r() * 1600,
    rx: 6 + r() * 8,
    ry: 4 + r() * 5,
    rot: r() * 180,
    c: r() > 0.5 ? C.coffeeLight : C.woodLine,
  }));
  return (
    <SceneShell bg={C.wood}>
      <Camera frame={frame} keys={keys}>
        <World>
          <Backdrop fill={C.wood} />
          {Array.from({length: 16}, (_, i) => (
            <rect key={i} x={-400 + i * 216} y={-9000} width={5} height={18000} fill={C.woodLine} />
          ))}
          <filter id="s1wob" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="16" />
          </filter>
          {crumbs.map((c, i) => (
            <ellipse key={i} cx={c.x} cy={c.y} rx={c.rx} ry={c.ry} fill={c.c} transform={`rotate(${c.rot} ${c.x} ${c.y})`} />
          ))}
          <g filter="url(#s1wob)">
            <circle cx={470} cy={900} r={330} fill={C.coffee} />
            <circle cx={470} cy={900} r={248} fill={C.wood} />
            <circle cx={470} cy={900} r={248} fill={C.coffeeLight} opacity={0.16} />
          </g>
          <circle cx={470} cy={900} r={322} fill="none" stroke={C.ink} strokeWidth={10} opacity={0.5} />
          {/* mug, half out of frame */}
          <circle cx={1012} cy={348} r={215} fill={C.ink} opacity={0.12} />
          <path d="M 800 280 C 690 255 690 420 800 398" fill="none" stroke={C.ink} strokeWidth={46} strokeLinecap="round" />
          <path d="M 800 280 C 690 255 690 420 800 398" fill="none" stroke={C.paper} strokeWidth={28} strokeLinecap="round" />
          <circle cx={1000} cy={330} r={215} fill={C.paper} stroke={C.ink} strokeWidth={10} />
          <circle cx={1000} cy={330} r={168} fill={C.coffeeMid} stroke={C.ink} strokeWidth={8} />
          <ellipse cx={930} cy={265} rx={52} ry={22} fill={C.paper} opacity={0.5} transform="rotate(-35 930 265)" />
        </World>
      </Camera>
    </SceneShell>
  );
};
