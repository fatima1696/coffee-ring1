import React from 'react';
import {C, clamp01, easeOut} from './palette';
import {FONT} from './Shell';

// Side-on cross-section of a coffee drop sitting on a table (scenes 4 and 5).
export const CX = 540;
export const BASE = 1180;
export const HW = 400;

export const prof = (x: number, h: number) => {
  const q = (x - CX) / HW;
  return h * Math.pow(Math.max(0, 1 - q * q), 1.2);
};

export const domePath = (h: number) => {
  let d = `M ${CX - HW} ${BASE}`;
  const n = 64;
  for (let i = 0; i <= n; i++) {
    const x = CX - HW + (2 * HW * i) / n;
    d += ` L ${x.toFixed(1)} ${(BASE - prof(x, h)).toFixed(1)}`;
  }
  return d + ' Z';
};

export const Table: React.FC = () => (
  <>
    <rect x={-9000} y={-9000} width={18000} height={9000 + BASE} fill={C.cream} />
    <rect x={-9000} y={BASE} width={18000} height={9000} fill={C.woodLine} />
    <rect x={-9000} y={BASE - 5} width={18000} height={10} fill={C.ink} />
  </>
);

export const Dome: React.FC<{h: number}> = ({h}) => (
  <>
    <path d={domePath(h)} fill={C.coffeeLight} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
    <path
      d={`M ${CX - HW + 90} ${BASE - prof(CX - HW + 90, h) - 14} Q ${CX - 120} ${BASE - h - 8} ${CX + 60} ${BASE - h - 6}`}
      fill="none"
      stroke={C.paper}
      strokeWidth={10}
      strokeLinecap="round"
      opacity={0.45}
    />
  </>
);

export const Pin: React.FC<{x: number; frame: number}> = ({x, frame}) => {
  const pulse = 1 + 0.12 * Math.sin(frame * 0.2);
  return (
    <g>
      <rect x={x - 7} y={BASE} width={14} height={80} rx={5} fill={C.teal} />
      <circle cx={x} cy={BASE} r={24 * pulse} fill={C.teal} />
      <circle cx={x} cy={BASE} r={10} fill={C.paper} />
    </g>
  );
};

export const Pill: React.FC<{x: number; y: number; text: string; appear: number}> = ({x, y, text, appear}) => {
  const w = text.length * 27 + 70;
  const a = easeOut(clamp01(appear));
  return (
    <g transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * a})`} opacity={a}>
      <rect x={-w / 2} y={-38} width={w} height={76} rx={38} fill={C.paper} stroke={C.teal} strokeWidth={5} />
      <text
        textAnchor="middle"
        y={12}
        fontSize={34}
        fontWeight={800}
        fontFamily={FONT}
        fill={C.teal}
        letterSpacing={3}
      >
        {text}
      </text>
    </g>
  );
};

const wispPath = (x0: number, y0: number, len: number, amp: number, phase: number, frame: number) => {
  let d = '';
  const n = 18;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const y = y0 - t * len;
    const x = x0 + amp * Math.sin(t * 7 + phase - frame * 0.14) * (0.35 + t);
    d += `${i ? ' L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
};

// Vapour leaves the thin edges faster than the thick middle.
export const Wisps: React.FC<{frame: number; h: number}> = ({frame, h}) => {
  const edges = [CX - HW + 28, CX - HW + 66, CX - HW + 104, CX + HW - 28, CX + HW - 66, CX + HW - 104];
  const tops = [CX - 110, CX, CX + 110];
  return (
    <g fill="none" strokeLinecap="round">
      {edges.map((x, i) => (
        <path
          key={`e${i}`}
          d={wispPath(x, BASE - prof(x, h) - 10, 190, 16, i * 1.7, frame)}
          stroke={C.teal}
          strokeWidth={10}
          opacity={0.7 * (0.6 + 0.4 * Math.sin(frame * 0.09 + i))}
          strokeDasharray="110 60"
          strokeDashoffset={-(frame * 2.4 + i * 25)}
        />
      ))}
      {tops.map((x, i) => (
        <path
          key={`t${i}`}
          d={wispPath(x, BASE - prof(x, h) - 10, 90, 10, i * 2.3, frame)}
          stroke={C.teal}
          strokeWidth={4}
          opacity={0.28 * (0.6 + 0.4 * Math.sin(frame * 0.07 + i))}
          strokeDasharray="50 30"
          strokeDashoffset={-(frame * 1.6 + i * 20)}
        />
      ))}
    </g>
  );
};
