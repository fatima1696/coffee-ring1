import React from 'react';
import {AbsoluteFill} from 'remotion';
import {easeInOut, lerp, W, H} from './palette';

export type Key = {
  f: number; // frame
  s: number; // zoom (1 = full frame)
  fx?: number; // world point the camera looks at
  fy?: number;
  r?: number; // roll in degrees
  ease?: (t: number) => number; // easing of the segment that ENDS at this key
};

export const camAt = (frame: number, keys: Key[]) => {
  let a = keys[0];
  let b = keys[0];
  let p = 0;
  const last = keys[keys.length - 1];
  if (frame >= last.f) {
    a = b = last;
  } else if (frame > keys[0].f) {
    for (let i = 0; i < keys.length - 1; i++) {
      if (frame <= keys[i + 1].f) {
        a = keys[i];
        b = keys[i + 1];
        p = (frame - a.f) / (b.f - a.f);
        break;
      }
    }
  }
  const e = (b.ease ?? easeInOut)(p);
  return {
    s: Math.exp(lerp(Math.log(a.s), Math.log(b.s), e)), // zoom in log space = even-feeling zooms
    fx: lerp(a.fx ?? W / 2, b.fx ?? W / 2, e),
    fy: lerp(a.fy ?? H / 2, b.fy ?? H / 2, e),
    r: lerp(a.r ?? 0, b.r ?? 0, e),
  };
};

export const Camera: React.FC<{frame: number; keys: Key[]; children: React.ReactNode}> = ({
  frame,
  keys,
  children,
}) => {
  const {s, fx, fy, r} = camAt(frame, keys);
  const rad = (r * Math.PI) / 180;
  const dx = fx - W / 2;
  const dy = fy - H / 2;
  // keep the focus point in the centre of the frame
  const tx = -s * (Math.cos(rad) * dx - Math.sin(rad) * dy);
  const ty = -s * (Math.sin(rad) * dx + Math.cos(rad) * dy);
  return (
    <AbsoluteFill
      style={{
        transformOrigin: '50% 50%',
        transform: `translate(${tx}px, ${ty}px) rotate(${r}deg) scale(${s})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
