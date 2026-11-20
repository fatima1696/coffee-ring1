export const FPS = 30;

// One entry per scene. `sec` is the on-screen time; `text` is the narration line (also the captions).
export const BEATS = [
  {id: 'Ring', sec: 4, text: 'Spilled coffee should dry into an even stain. It never does.'},
  {id: 'FreshDrop', sec: 4, text: 'A fresh drop is a smooth, even disc.'},
  {id: 'Drying', sec: 5, text: 'But as it dries, the middle fades and the edge turns dark. Where did the middle go?'},
  {id: 'PinnedEdge', sec: 6, text: "The edge is stuck to the table, and it's thin, so water leaves there first."},
  {id: 'Flow', sec: 8, text: "The stuck edge can't shrink, so water rushes outward from the middle, dragging coffee like a river dragging leaves."},
  {id: 'Pile', sec: 6, text: "When the water's gone, every particle is parked at the edge. That's the ring."},
  {id: 'EggJam', sec: 5, text: 'In 2011, scientists made it vanish. Swap round particles for egg-shaped ones.'},
  {id: 'TwoStains', sec: 6, text: 'Eggs jam together at the surface and never reach the edge. The stain dries flat.'},
  {id: 'Cafe', sec: 6, text: "Next time you spill coffee, you're watching a river that flows for minutes. Send this to a coffee drinker."},
];

export const TOTAL_FRAMES = BEATS.reduce((n, b) => n + b.sec * FPS, 0);
