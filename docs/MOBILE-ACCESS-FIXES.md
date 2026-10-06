# Mobile puzzle access and telephone correction

This patch starts from the published 500% brightness release, without the held kitchen model batch.

## Mobile controls

The existing puzzles use ordered buttons or a four-digit keypad. On touch devices, opening a keypad puzzle no longer focuses its text field and unexpectedly opens the OS keyboard. Desktop keyboard entry remains available.

Touch panels explicitly transform swipe deltas for the 90-degree stage. Nested panels/maps can scroll on both axes, bounded at their edges. Sliders use their actual visible axis. A dragged or cancelled gesture cannot become a puzzle click; a fresh deliberate tap remains valid. Multitouch and orientation changes cancel the active gesture. Gameplay buttons likewise reject dragged/outside releases and cancellation.

The puzzle content scrolls separately from its action row. Touch users also have explicit up/down page buttons, so reaching a keypad or hint does not depend solely on dragging. Brightness remains 70–500%, with its 100% reset intact.

## Telephone and room audit

The live telephone's old west-wall location at z=3.2 was behind the fridge, whose footprint runs z=2.425–3.275 and reaches 1.75 m high. The same interactive mesh moves to z=4.0, retaining its registered callback. A continuous collision-aware approach test checks reach, visibility and callback activation.

The room opposite the public laundry maps to 104. A 405-point raycast audit finds floor meshes throughout 104 and the entrance hall. This establishes floor geometry coverage only: it does not resolve the user's visual report or prove that materials, walls and device rendering are correct. Screenshot-based investigation of the reported blank areas remains open.

## Verification limits

Event-sequence tests exercise rotated/unrotated swipes, nested scrolling, cancellation, multitouch, sliders, paging and accidental-click rejection. All seven puzzles complete through the actual UI handlers and campaign rules; wrong input still fails, and successful progress survives save restoration. These are DOM-event fixtures and source/geometry checks, not a native mobile browser or WebGL playthrough. The shared cloud browser's WebGL limitation remains.

## 104 bed collision follow-up

A continuous walking reproduction reached the bed with feet at 0.30 m while its mattress surface is 0.43 m. The frame-only collision box therefore allowed 13 cm of visible penetration. The collision envelope now includes the mattress height. A regression checks that a grounded player cannot step into it and can still walk continuously around the bed.

Additional entry-camera ray checks found opaque, visible, inward-facing side walls and ceilings in 104 and the entrance hall. The offline views use flat texture proxies, so they cannot settle the user's blank-material/appearance report. The initial forward camera sees the vestibule door; the reception desk, mailboxes and bench are mostly behind or beside that view. The blank-area report remains open pending matching visual evidence.

Revalidated on the published static-fixture batching release (`e135d58d`): the bed-only source change retains batching, touch puzzle controls and 70–500% brightness. The full suite passes 93 unit cases and 57 smoke assertions, including the continuous approach and bed-side route. This fixes the measured collision defect only; the reported blank appearance remains open.
