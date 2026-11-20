import React from 'react';
import {Composition, Folder} from 'remotion';
import {BEATS, FPS, TOTAL_FRAMES} from './timeline';
import {CoffeeRing, SCENES} from './Video';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="CoffeeRing" component={CoffeeRing} width={1080} height={1920} fps={FPS} durationInFrames={TOTAL_FRAMES} />
    <Folder name="Scenes">
      {BEATS.map((b, i) => (
        <Composition
          key={b.id}
          id={`Scene${i + 1}-${b.id}`}
          component={SCENES[i]}
          width={1080}
          height={1920}
          fps={FPS}
          durationInFrames={b.sec * FPS}
        />
      ))}
    </Folder>
  </>
);
