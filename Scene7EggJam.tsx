import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, easeOut, lerp, prog, rng} from './palette';
import {Camera, Key} from './Camera';
import {SceneShell, World, Backdrop} from './Shell';

// Beat 7: egg-shaped grains jostle, tangle and lock into an even web. Snap zoom-out to the whole drop.
const R = 560;
const keys: Key[] = [
  {f: 0, s: 2.0, fx: 540, fy: 960, r: 0},
  {f: 92, s: 1.8, fx: 600, fy: 1010, r: 4},
  {f: 138, s: 0.85, fx: 540, fy: 960, r: 0, ease: easeOut},
  {f: 150, s: 0.85, fx: 540, fy: 960, r: 0},
];

type Egg = {x: number; y: number; rot: number; ph: number; fill: string};

export const Scene7EggJam: React.FC = () => {
  const frame = useCurrentFrame();
  const eggs = React.useMemo<Egg[]>(() => {
    const r = rng(45);
    const out: Egg[] = [];
    const fills = [C.coffee, C.coffeeMid, C.ink];
    for (let j = 0; j < 30; j++) {
      for (let i = 0; i < 20; i++) {
        const x = 540 + (i - 9.5 + (j % 2) * 0.5) * 62 + (r() - 0.5) * 16;
        const y = 960 + (j - 14.5) * 36 + (r() - 0.5) * 12;
        if (Math.hypot(x - 540, y - 960) < R - 34) {
          out.push({x, y, rot: r() * 180, ph: r() * 6.28, fill: fills[Math.floor(r() * fills.length)]});
        }
      }
    }
    return out;
  }, []);
  const calm = 1 - easeOut(prog(frame, 0, 90)); // jostling dies down as they lock
  const solid = prog(frame, 95, 140);
  const a = 34;
  const b = 12;
  const lens = `M ${-a} 0 Q 0 ${-b * 2} ${a} 0 Q 0 ${b * 2} ${-a} 0 Z`;
  return (
    <SceneShell bg={C.glass}>
      <Camera frame={frame} keys={keys}>
        <World>
          <Backdrop fill={C.glass} />
          <circle cx={540} cy={960} r={R} fill={C.coffeeTan} />
          <circle cx={540} cy={960} r={R} fill={C.coffeeMid} opacity={solid} />
          <g opacity={lerp(1, 0.4, solid)}>
            {eggs.map((e, i) => {
              const dx = Math.sin(frame * 0.35 + e.ph) * 10 * calm;
              const dy = Math.cos(frame * 0.31 + e.ph * 1.3) * 7 * calm;
              const wob = Math.sin(frame * 0.4 + e.ph) * 14 * calm;
              return (
                <path
                  key={i}
                  d={lens}
                  fill={e.fill}
                  transform={`translate(${(e.x + dx).toFixed(1)} ${(e.y + dy).toFixed(1)}) rotate(${(e.rot + wob).toFixed(1)})`}
                />
              );
            })}
          </g>
          <circle cx={540} cy={960} r={R} fill="none" stroke={C.ink} strokeWidth={8} />
        </World>
      </Camera>
    </SceneShell>
  );
};
