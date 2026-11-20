import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, prog} from './palette';
import {Camera, Key} from './Camera';
import {SceneShell, World} from './Shell';

// Beat 9: huge continuous zoom-out from the drop to the table to the whole cafe floor, with a slow spin.
const keys: Key[] = [
  {f: 0, s: 4.5, fx: 390, fy: 1010, r: 0},
  {f: 180, s: 0.3, fx: 540, fy: 960, r: 40},
];

const Mug: React.FC<{x: number; y: number; k?: number}> = ({x, y, k = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <path d="M -80 -10 C -150 -26 -150 66 -80 52" fill="none" stroke={C.ink} strokeWidth={26} strokeLinecap="round" />
    <path d="M -80 -10 C -150 -26 -150 66 -80 52" fill="none" stroke={C.paper} strokeWidth={14} strokeLinecap="round" />
    <circle r={92} fill={C.paper} stroke={C.ink} strokeWidth={7} />
    <circle r={66} fill={C.coffeeMid} stroke={C.ink} strokeWidth={5} />
    <ellipse cx={-22} cy={-22} rx={22} ry={9} fill={C.paper} opacity={0.5} transform="rotate(-35 -22 -22)" />
  </g>
);

const Table: React.FC<{x: number; y: number; mugAngle: number}> = ({x, y, mugAngle}) => (
  <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2].map((i) => {
      const a = mugAngle + 1.4 + i * 2.1;
      return <circle key={i} cx={Math.cos(a) * 450} cy={Math.sin(a) * 450} r={82} fill={C.creamDark} stroke={C.ink} strokeWidth={6} />;
    })}
    <circle r={332} fill={C.ink} opacity={0.1} cx={10} cy={14} />
    <circle r={330} fill={C.wood} stroke={C.ink} strokeWidth={8} />
    <Mug x={Math.cos(mugAngle) * 150} y={Math.sin(mugAngle) * 150} />
  </g>
);

export const Scene9Cafe: React.FC = () => {
  const frame = useCurrentFrame();
  const others: {x: number; y: number; a: number}[] = [];
  for (let j = -4; j <= 4; j++) {
    for (let i = -3; i <= 3; i++) {
      if (i === 0 && j === 0) continue;
      others.push({x: 540 + i * 1100 + (((j % 2) + 2) % 2) * 550, y: 960 + j * 1050, a: (i * 7 + j * 3) % 6});
    }
  }
  const ring = prog(frame, 0, 120);
  return (
    <SceneShell bg={C.cream}>
      <Camera frame={frame} keys={keys}>
        <World>
          <defs>
            <pattern id="tiles" width={320} height={320} patternUnits="userSpaceOnUse">
              <rect width={320} height={320} fill={C.cream} />
              <rect width={160} height={160} fill="#DCC9A8" />
              <rect x={160} y={160} width={160} height={160} fill="#DCC9A8" />
            </pattern>
          </defs>
          <rect x={-5000} y={-5000} width={10640} height={11920} fill="url(#tiles)" />
          {others.map((t, i) => (
            <Table key={i} x={t.x} y={t.y} mugAngle={t.a} />
          ))}
          {/* our table, our spilled drop */}
          <circle cx={540} cy={960} r={332} fill={C.ink} opacity={0.1} transform="translate(10 14)" />
          <circle cx={540} cy={960} r={330} fill={C.wood} stroke={C.ink} strokeWidth={8} />
          {[0, 1, 2].map((i) => {
            const a = 1.4 + i * 2.1;
            return <circle key={i} cx={540 + Math.cos(a) * 450} cy={960 + Math.sin(a) * 450} r={82} fill={C.creamDark} stroke={C.ink} strokeWidth={6} />;
          })}
          <circle cx={540} cy={960} r={330} fill={C.wood} stroke={C.ink} strokeWidth={8} />
          <Mug x={700} y={880} k={0.92} />
          <circle cx={390} cy={1010} r={58} fill={C.coffee} />
          <circle cx={390} cy={1010} r={58 - 14 * ring} fill={C.coffeeMid} opacity={1 - ring * 0.2} />
          <circle cx={390} cy={1010} r={57} fill="none" stroke={C.ink} strokeWidth={5} opacity={0.5} />
          <ellipse cx={372} cy={990} rx={16} ry={7} fill={C.paper} opacity={0.6} transform="rotate(-35 372 990)" />
        </World>
      </Camera>
    </SceneShell>
  );
};
