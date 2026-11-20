import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, easeOut, prog} from './palette';
import {Camera, Key} from './Camera';
import {SceneShell, World} from './Shell';
import {BASE, CX, HW, Dome, Pin, Pill, Table, Wisps} from './Section';

// Beat 4: the edge is pinned and thin, so vapour leaves there first.
const keys: Key[] = [
  {f: 0, s: 2.6, fx: 150, fy: 1090, r: 0},
  {f: 70, s: 2.2, fx: 930, fy: 1090, r: 0},
  {f: 130, s: 1.0, fx: 540, fy: 1000, r: 0, ease: easeOut},
  {f: 180, s: 1.06, fx: 540, fy: 1000, r: 0},
];

export const Scene4Pinned: React.FC = () => {
  const frame = useCurrentFrame();
  const h = 300;
  return (
    <SceneShell>
      <Camera frame={frame} keys={keys}>
        <World>
          <Table />
          <Wisps frame={frame} h={h} />
          <Dome h={h} />
          <Pin x={CX - HW} frame={frame} />
          <Pin x={CX + HW} frame={frame} />
          <Pill x={CX - HW + 40} y={BASE + 190} text="PINNED EDGE" appear={prog(frame, 20, 38)} />
        </World>
      </Camera>
    </SceneShell>
  );
};
