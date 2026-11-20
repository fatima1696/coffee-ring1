# Coffee ring video (Remotion)

50 seconds, 1080x1920 (9:16), 30 fps, nine scenes with captions. All visuals are drawn in code.

## Run it

```bash
npm install
npm run dev        # opens Remotion Studio (preview, scrub, edit)
npm run render         # one joined video with captions -> out/coffee-ring.mp4
npm run render:scenes  # nine separate clips, no captions -> out/scenes/Scene1-Ring.mp4 ... Scene9-Cafe.mp4
```

## Render on GitHub (no local setup)

1. Create a new GitHub repo and upload everything in this folder, including the hidden `.github` folder.
2. Open the repo's **Actions** tab, pick **Render coffee ring video**, and press **Run workflow** (it also runs on every push).
3. When both jobs finish, open the run and download the artifacts at the bottom: `coffee-ring-video` (joined, with captions) and `coffee-ring-scenes` (nine separate clips).

## Where things are

- `src/timeline.ts`: the nine beats (seconds + narration line). Change a duration here and the captions follow.
- `src/scenes/Scene1Ring.tsx` ... `Scene9Cafe.tsx`: one file per scene. The camera moves are the `keys` array at the top of each file (`s` = zoom, `fx`/`fy` = where the camera looks, `r` = roll).
- `src/Captions.tsx`: 2-3 words at a time at the top, one bold word, lower third left empty.
- `src/palette.ts`: the colors (cream, coffee brown, one teal accent).

Labels appear only in scene 4 (PINNED EDGE) and scene 5 (CAPILLARY FLOW).
Each scene is also registered on its own under the "Scenes" folder in Studio.

## Voiceover

Put the narration file in `public/` and add `<Audio src={staticFile('voiceover.mp3')} />` (from `@remotion/media`) inside `src/Video.tsx`.
