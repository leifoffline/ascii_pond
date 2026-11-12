# Koi Pond — interactive ASCII art

Leif's photography-themed UX/UI portfolio piece: a glowing, zoomable ASCII koi pond.
Every file is self-contained HTML/CSS/JS, so there is no build step. Open a file in a browser to run it.

## Files
- `index.html`: the main pond. It is published as the private claude.ai artifact "Koi Pond"
  (slug `0096f870-cb29-4280-9550-8df3ef4a5474`, https://claude.ai/artifact/15DyUswYRbT8gYQVE8cE1R).
- `scripts/screenshot.js`: Playwright render check. Run `node scripts/screenshot.js index.html shot.png`.
  It loads the file with `#fixed`, which turns off adaptive coarsening and exposes `window.__pond`.

## Design rules (from Leif and not negotiable)
- Motion stays calm and never overstimulating: smooth fades and slow ripples, with good contrast.
- Pastel inks on a blue water background.
- "Heron" always means the **great blue heron, in side profile**. Never a night heron.
- **No water lilies.** The lily pads are fine.
- Cattails and reeds stay short. Grass grows on the corner banks.
- No cursor HUD or readout.
- Follow Leif's design system where it applies.
- Leif works iteratively, so make one focused change at a time and verify it with a screenshot.

## Architecture (index.html)
- **Rendering:** a world-space canvas 2D scene is sampled by a screen-space character grid through a camera
  (zoom 1–6×, pan, pinch, wheel, keys and buttons). Zooming adds characters instead of enlarging glyphs.
- **Grid size:** `setGrid(Math.max(5, Math.min(7, W/235)))` gives about 6px cells at 1440px wide.
- **Adaptive fallback:** if frames run slow, it calls `setGrid(CELL+1.5)` up to a limit of 11.5.
- **Brightness to glyph:**
  - FILL ramp `. · : - + o 0 #`, plus HOT variants for the brightest areas.
  - EDGE strokes `- \ | /`, chosen from the brightness gradient.
  - The buffer is smoothed with RISE 0.22 and FALL 0.1.
- **Layers:**
  - deep (blurred floor), under and surf;
  - glow from an h2/h4/h8 downsample chain, composited with `lighter`;
  - a ripple height-field with refraction and parallax, plus breeze.
- **Time of day:** `PHASES` blends 4 times of day (HOLD 60s, BLEND 25s), with a rain toggle.
- **Contents:** 22 pads, 5 koi, ducks and ducklings, reeds, banks, a blossom branch, dragonflies, fireflies,
  heron and swan flyovers, and click-to-feed.

## Publishing
To update the artifact, read it with `mcp__claude-artifacts__get_artifact` to get the live version,
then publish `index.html` with `publish_files` (slug above, `base_version` = live version).
