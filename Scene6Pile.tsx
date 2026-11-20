import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, easeInOut, easeOut, lerp, prog, rng} from './palette';
import {Camera, Key} from './Camera';
import {SceneShell, World, Backdrop} from './Shell';

// Beat 6: grains rush in and jam against the pinned edge. Track along the pile, then zoom out to the whole ring.
const RO = 1900; // outer radius of the ring (the ring is huge, we only see a slice at first)
const CXR = -1300;
const CYR = 960;

const keys: Key[] = [
  {f: 0, s: 1.15, fx: 420, fy: 260, r: -3},
  {f: 56, s: 1.15, fx: 520, fy: 960, r: -6},
  {f: 112, s: 1.15, fx: 420, fy: 1620, r: -8},
  {f: 178, s: 0.19, fx: CXR, fy: CYR, r: 0, ease: easeInOut},
];

type Grain = {th: number; rf: number; r0: number; tOff: number; a: number; pts: string; rot: number; spin: number; fill: string};

const build = (): Grain[] => {
  const r = rng(33);
  const out: Grain[] = [];
  const layers = 4;
  const n = 80;
  const fills = [C.coffee, C.coffeeMid, C.ink];
  for (let l = 0; l < layers; l++) {
    for (let i = 0; i < n; i++) {
      const th = -0.72 + ((i + r() * 0.8) * 1.44) / n;
      const rf = RO - 22 - l * 34 - r() * 8;
      const size = 20 + r() * 20;
      const sides = 3 + Math.floor(r() * 3);
      const pts = Array.from({length: sides}, (_, k) => {
        const ang = (k / sides) * Math.PI * 2 + r() * 0.5;
        const rad = size * (0.55 + 0.45 * r());
        return `${(Math.cos(ang) * rad).toFixed(1)},${(Math.sin(ang) * rad).toFixed(1)}`;
      }).join(' ');
      out.push({
        th,
        rf,
        r0: rf - (260 + r() * 520),
        tOff: (r() - 0.5) * 240,
        a: 30 + l * 14 + r() * 70,
        pts,
        rot: r() * 360,
        spin: (r() - 0.5) * 360,
        fill: fills[Math.floor(r() * fills.length)],
      });
    }
  }
  return out;
};

export const Scene6Pile: React.FC = () => {
  const frame = useCurrentFrame();
  const grains = React.useMemo(build, []);
  const bandOp = prog(frame, 40, 140);
  const water = lerp(RO - 110, RO - 520, easeInOut(prog(frame, 0, 140)));
  const waterOp = 0.28 * (1 - prog(frame, 105, 150));
  return (
    <SceneShell bg={C.glass}>
      <Camera frame={frame} keys={keys}>
        <World>
          <Backdrop fill={C.glass} />
          {/* the film of water pulling back */}
          <circle cx={CXR} cy={CYR} r={water} fill={C.tealSoft} opacity={waterOp} stroke={C.teal} strokeWidth={5} />
          {/* solid ring that the grains are building */}
          <circle cx={CXR} cy={CYR} r={RO - 75} fill="none" stroke={C.coffee} strokeWidth={150} opacity={bandOp} />
          {grains.map((g, i) => {
            const m = easeOut(prog(frame, g.a - 30, g.a));
            const op = prog(frame, g.a - 30, g.a - 22);
            if (op <= 0) return null;
            const rr = lerp(g.r0, g.rf, m);
            const th = g.th + lerp(g.tOff / g.rf, 0, m);
            const x = CXR + rr * Math.cos(th);
            const y = CYR + rr * Math.sin(th);
            return (
              <polygon
                key={i}
                points={g.pts}
                fill={g.fill}
                opacity={op}
                transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(g.rot + (1 - m) * g.spin).toFixed(1)})`}
              />
            );
          })}
        </World>
      </Camera>
    </SceneShell>
  );
};
