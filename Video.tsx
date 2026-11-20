import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {BEATS, FPS} from './timeline';
import {Captions} from './Captions';
import {Scene1Ring} from './Scene1Ring';
import {Scene2FreshDrop} from './Scene2FreshDrop';
import {Scene3Drying} from './Scene3Drying';
import {Scene4Pinned} from './Scene4Pinned';
import {Scene5Flow} from './Scene5Flow';
import {Scene6Pile} from './Scene6Pile';
import {Scene7EggJam} from './Scene7EggJam';
import {Scene8TwoStains} from './Scene8TwoStains';
import {Scene9Cafe} from './Scene9Cafe';

export const SCENES = [
  Scene1Ring,
  Scene2FreshDrop,
  Scene3Drying,
  Scene4Pinned,
  Scene5Flow,
  Scene6Pile,
  Scene7EggJam,
  Scene8TwoStains,
  Scene9Cafe,
];

export const CoffeeRing: React.FC = () => (
  <AbsoluteFill>
    <Series>
      {BEATS.map((b, i) => {
        const Scene = SCENES[i];
        return (
          <Series.Sequence key={b.id} name={b.id} durationInFrames={b.sec * FPS}>
            <Scene />
          </Series.Sequence>
        );
      })}
    </Series>
    <Captions />
  </AbsoluteFill>
);
