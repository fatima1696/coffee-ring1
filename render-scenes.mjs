// Renders every scene as its own MP4 (no captions) into out/scenes/.
// Usage: npm run render:scenes
import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const scenes = [
  'Scene1-Ring',
  'Scene2-FreshDrop',
  'Scene3-Drying',
  'Scene4-PinnedEdge',
  'Scene5-Flow',
  'Scene6-Pile',
  'Scene7-EggJam',
  'Scene8-TwoStains',
  'Scene9-Cafe',
];

mkdirSync('out/scenes', {recursive: true});

for (const id of scenes) {
  console.log(`\nRendering ${id} ...`);
  const res = spawnSync('npx', ['remotion', 'render', 'index.ts', id, `out/scenes/${id}.mp4`], {
    stdio: 'inherit',
    shell: true,
  });
  if (res.status !== 0) {
    console.error(`Failed on ${id}`);
    process.exit(res.status ?? 1);
  }
}
console.log('\nDone. Clips are in out/scenes/');
