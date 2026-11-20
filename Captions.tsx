import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BEATS, FPS} from './timeline';
import {C, clamp01, easeOut} from './palette';
import {FONT} from './Shell';

// 2-3 words at a time, one bold word, top of the frame, lower third left empty.
const chunkWords = (text: string): string[] => {
  const words = text.split(' ');
  const out: string[] = [];
  let i = 0;
  while (i < words.length) {
    const left = words.length - i;
    const n = left <= 3 ? left : left === 4 ? 2 : 3;
    out.push(words.slice(i, i + n).join(' '));
    i += n;
  }
  return out;
};

const boldIndex = (words: string[]) => {
  let best = 0;
  words.forEach((w, i) => {
    if (w.replace(/[^a-zA-Z0-9-]/g, '').length > words[best].replace(/[^a-zA-Z0-9-]/g, '').length) best = i;
  });
  return best;
};

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  let start = 0;
  for (const beat of BEATS) {
    const dur = beat.sec * FPS;
    if (frame < start + dur) {
      const local = frame - start;
      const chunks = chunkWords(beat.text);
      const per = dur / chunks.length;
      const idx = Math.min(chunks.length - 1, Math.floor(local / per));
      const t = local - idx * per;
      const pop = easeOut(clamp01(t / 6));
      const words = chunks[idx].split(' ');
      const bi = boldIndex(words);
      return (
        <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 170}}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 92,
              lineHeight: 1.1,
              textAlign: 'center',
              color: C.ink,
              opacity: pop,
              scale: String(0.86 + 0.14 * pop),
              maxWidth: 920,
              WebkitTextStroke: `16px ${C.cream}`,
              paintOrder: 'stroke fill',
            }}
          >
            {words.map((w, i) => (
              <span key={i} style={{fontWeight: i === bi ? 900 : 500}}>
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        </AbsoluteFill>
      );
    }
    start += dur;
  }
  return null;
};
