import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, easeInOut, easeOut, lerp, prog, rng} from './palette';
import {Camera, Key} from './Camera';
import {SceneShell, World} from './Shell';
import {BASE, CX, HW, Dome, Pin, Pill, Table, prof} from './Section';

// Beat 5: the pinned edge can't shrink, so liquid rushes outward and carries the coffee with it.
const keys: Key[] = [
  {f: 0, s: 1.0, fx: 540, fy: 1000, r: 0},
  {f: 80, s: 1.9, fx: 560, fy: 1050, r: 0},
  {f: 165, s: 1.9, fx: 250, fy: 1110, r: 0},
  {f: 212, s: 0.85, fx: 540, fy: 1000, r: 0, ease: easeOut},
  {f: 240, s: 0.88, fx: 540, fy: 1000, r: 0},
];

type Speck = {dir: number; lane: number; ph: number; size: number; start: number};

export const Scene5Flow: React.FC = () => {
  const frame = useCurrentFrame();
  const specks = React.useMemo<Speck[]>(() => {
    const r = rng(21);
    return Array.from({length: 54}, (_, i) => ({
      dir: i % 2 ? 1 : -1,
      lane: 0.12 + 0.76 * r(),
      ph: r(),
      size: 7 + r() * 7,
      start: r() * 40,
    }));
  }, []);
  const h = lerp(300, 205, easeInOut(prog(frame, 0, 230)));
  const pile = lerp(0, 46, prog(frame, 10, 235));

  const pos = (s: Speck, u: number) => {
    const x = CX + s.dir * (s.start + (HW * 0.95 - s.start) * Math.pow(u, 1.2));
    return {x, y: BASE - prof(x, h) * s.lane};
  };

  return (
    <SceneShell>
      <Camera frame={frame} keys={keys}>
        <World>
          <Table />
          <Dome h={h} />
          {[-1, 1].map((d) => (
            <g key={d}>
              <ellipse cx={CX + d * (HW - 10)} cy={BASE - 10} rx={pile * 0.9} ry={pile * 0.6} fill={C.ink} />
              <circle cx={CX + d * (HW - 30)} cy={BASE - 14 - pile * 0.4} r={pile * 0.28} fill={C.ink} />
              <circle cx={CX + d * (HW - 6)} cy={BASE - 14 - pile * 0.5} r={pile * 0.22} fill={C.coffee} />
            </g>
          ))}
          {specks.map((s, i) => {
            const u = (frame * 0.0075 + s.ph) % 1;
            const fade = Math.min(1, u / 0.06) * Math.min(1, (1 - u) / 0.03);
            return (
              <g key={i} opacity={fade}>
                {[0, 1, 2].map((k) => {
                  const uu = u - k * 0.014;
                  if (uu < 0) return null;
                  const p = pos(s, uu);
                  return <circle key={k} cx={p.x} cy={p.y} r={s.size * (1 - k * 0.22)} fill={C.ink} opacity={0.95 - k * 0.3} />;
                })}
              </g>
            );
          })}
          <Pin x={CX - HW} frame={frame} />
          <Pin x={CX + HW} frame={frame} />
          <Pill x={CX} y={BASE - 420} text="CAPILLARY FLOW" appear={prog(frame, 14, 32)} />
        </World>
      </Camera>
    </SceneShell>
  );
};
