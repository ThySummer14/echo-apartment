# Community investigation iteration

## Scope and route

The existing six-chapter game remains intact. A continuous 48 × 36 m community district now connects through the lobby door after restoring power. It contains a central memorial court, stocked corner shop with public telephone, furnished neighborhood clinic, and a covered southern promenade. Shop and clinic each have front, side, and rear doors. The perimeter remains closed and the established ending remains at the upper courtyard.

Three short records change the meaning of the existing rescue call: the family ordered four portions; an eleven-second call really reached the clinic; the response was cancelled after the building manager described it as a false alarm. New investigations must inspect the clinic record before completing the radio call. Revision-4 and older saves with generator progress receive this prerequisite during migration. Earlier saves can explore the new district normally. Existing radio/ending progress is retained.

The return visit after the radio call changes the covered passage's rescue beacon and triggers a single quiet acknowledgement. This is an authored return-state change, not random jump-scare escalation.

## Models and collision

- Wardrobes in expanded areas are rebuilt as carcass, recessed panels, plinth, ventilation, hardware and feet rather than a solid box with a flat front. Their single conservative hiding collider is geometry-tested.
- The district includes shop display tables and tins, detailed public telephone, bed frames and mattresses, clinic screen, drainage grates, supported canopy, lamp posts, and a shared three-storey apartment elevation.
- Low props cannot lift the player's head through a ceiling. Upward movement stops at a ceiling slab. Existing decorative room ceilings now participate in collision.
- Required routes preserve broad walking aisles. The memorial island is an actual obstacle with two clear paths around it. No external assets or microphone access were added.

## Reference research and decisions

These are transferable rules, not copied assets or recreated levels:

- [Outlast, official listing](https://store.steampowered.com/app/238320/Outlast/): running/hiding/stealth support escape decisions. Applied as multiple usable doors and sightline breaks.
- [Granny, developer listing](https://play.google.com/store/apps/details?id=com.dvloper.granny): noise attracts danger; hiding is a readable action. Existing hiding stays available in each destination. A fuller noise investigation system remains a later iteration.
- [Ice Scream, developer](https://keplerians.com/ice-scream/): destinations contribute distinct puzzle/rescue roles. Shop and clinic each contribute evidence to the apartment's rescue mainline.
- [P.T., Konami guide](https://blog.playstation.com/archive/2014/10/31/p-t-ps4-survival-tips-konamis-horror-hit): return to recognizable space with one meaningful change. Applied to the rescue beacon and once-only return event.
- [Silent Breath, developer listing](https://store.steampowered.com/app/2796180/SILENT_BREATH/): uncertainty benefits from variable threats. Navigable space and mandatory evidence remain authored here. No microphone mechanic was implemented.
- [Five Nights at Freddy's](https://store.steampowered.com/app/319510/Five_Nights_at_Freddys/) and [FNAF 4](https://store.steampowered.com/app/388090/Five_Nights_at_Freddys_4/): information windows and consistent audio threat rules are useful future directions. No security-camera or FNAF encounter system is claimed in this iteration.

Bilibili search for 恐怖游戏 identified [a Welcome to Kowloon playthrough](https://www.bilibili.com/video/BV1SX4y177ZK/), but page inspection timed out and direct retrieval returned HTTP 412. Actual footage viewed: **0 seconds**. No gameplay or audio conclusions are attributed to watched footage.

## Verification and limitations

Run `npm test`, `npm run audit`, and `npm run build:desktop`. Added tests cover ceiling clipping, continuous community traversal with both return paths, wardrobe envelope geometry, story prerequisites/migration, and real-time adaptive resolution.

The prior README's v4 browser numbers describe an earlier version and are not verification of this iteration. Current visual/playback QA is **not completed**: the available cloud browser blocked localhost, and local Chromium could not launch under the execution sandbox. Programmatic geometry and simulation tests do not prove visual quality, audio balance, mobile performance, first-time navigation clarity, or play duration. Those remain explicit review gates before considering this branch ready to merge.

## Follow-up: original kitchen reconstruction

A second model inspection found three unrelated baseline defects: the dining tabletop was at floor height with legs above it, the fridge front was vertically offset beyond the body, and a swinging cabinet door exposed a filled box. Rebuilt the cabinet as sides/back/top/bottom/shelf with a real cavity and retained its animated hinge. Rebuilt the table/chairs at supported heights, corrected the fridge panel, and pulled the counter/stove clear of the wall. New geometry tests verify support, fridge bounds, cabinet cavity, rear clearance, and opening direction. Existing movement and story suites are rerun after these changes.

## Follow-up: learnable pursuit and stair navigation

The hunter now follows the last position it saw or heard, rather than continuously tracking a quiet player through walls. Walking can be heard within 4 m and running within 12 m; walls reduce that range to 35%, and different floors block hearing. After ten seconds without new evidence it searches for three seconds and withdraws. Searching/hiding no longer admits unrelated random scare events. A chase subtitle teaches the sound rule; input-derived movement noise requires no microphone.

Removing blind emergency teleports exposed an older stair-descent navigation stall: the character's footprint still overlapped the higher tread when its center reached the lower waypoint. Added a footprint-sized route lookahead. The monster now passes ascent/descent regression tests with emergency teleport explicitly disabled, alongside a wall-occlusion test proving it does not track the hidden player's updated coordinates or cross the wall.

## Follow-up: physical props and interaction reach

A separate interaction audit found that rebuilt wardrobe groups were targeted at their floor-level origins. Added explicit handle-height interaction anchors and tests for the normal gaze cone. Shelves and chairs in expanded areas now have collision, instead of allowing the player to walk through their visible models. Two existing chairs occupied required investigation/return aisles; moved them toward their desks rather than weakening traversal assertions. All three community records now have tested in-range, unobstructed investigation rays from reachable floor positions.

## Follow-up: interrupted and repeated UI flows

Centralized clearing of keyboard, drag, sprint, joystick, and touch-look state whenever an investigation/settings panel or checkpoint takes control. This prevents held touch movement from resuming after its control has disappeared. Nested document/settings close order now preserves pause, audio and pointer lock correctly. Completed generator/radio interactions no longer reopen solved puzzles. Continue-game availability is based on a validated Campaign snapshot, rather than trusting a raw invitation flag. Four DOM-stub unit tests cover the modal/reset/repeat logic; these are not browser or touch-device acceptance tests.

## Follow-up: overlap audit and remaining cabinets

The geometry audit exposed a new district issue that headless walking alone would miss: the shop/clinic floors were coplanar with a full-width outdoor slab. Replaced that slab with three adjoining outdoor sections around the exact room footprints. A regression test proves the five district floor slabs have no shared horizontal area. Rebuilt the living-room bookshelf and bathroom medicine cabinet as hollow carcasses; books now have depth, and the medicine door stays within the correct height and on the bathroom side of its wall.

### Browser verification record, 2026-10-05 UTC

- Local candidate preview: cloud Chromium refused the localhost URL with `net::ERR_BLOCKED_BY_CLIENT`.
- Independent public baseline check: https://thysummer14.github.io/echo-apartment/ loaded in the cloud browser at 16:32 UTC, but displayed the game's initialization error.
- Browser console: `THREE.WebGLRenderer: A WebGL context could not be created`, `GL_VENDOR = Disabled`, `GL_RENDERER = Disabled`, and `Error creating WebGL context`.
- The baseline script URL was `js/bundle.js?v=8454ff4e4a`. It was the already-published game, not this working branch. This establishes an environment limitation and is not evidence of a candidate-rendering regression.
- A standalone Chromium attempt also failed during sandbox setup before the browser could run. No browser security settings were changed.

Latest complete non-rendering run: 44 unit cases and 55 scene-smoke assertions passed; collision stress exercised 75,438 steps with zero wall penetrations, zero unexpected edge falls, and zero unsupported monster nodes. The general mesh-overlap audit still reports structural/decorative intersections; it is not a declaration that every mesh overlap is a visual defect or that all art has passed visual review.

## Follow-up: fair relocation and authored audio space

Stalking relocation now rejects unobstructed nodes in the player's forward view; if no unseen node is available, the hunter stays put. A regression test covers both cases. Random door/ghost events are constrained to the player's floor and nearby rooms. Authored atmosphere cues reserve their cooldown instead of competing with unrelated random events. Searching enemies still prevent hiding directly in their sight, while successfully hiding grants the same brief recovery window as losing pursuit.

## Navigation iteration: remembered targets, room loops, and door safety

Straight-line steering could not pass the community memorial. Added bounded same-floor A* navigation over an inflated collision grid, while preserving the existing stair router. Navigation receives only the pursuit system's remembered target. It cannot inspect or refresh the hidden player's live position. Stair transitions invalidate cached ground routes.

- Stable routes are cached. Target movement and door lock/open changes invalidate the relevant plan. Failed routes are cached too, so an unreachable target does not launch another search every frame.
- Default search budget is 2,000 expanded cells, with a hard maximum of 6,000 even for explicit test overrides. Replanning has a 0.75-second cooldown. No-route results stop movement; there is no pursuit relocation fallback.
- The hunter opens an upcoming unlocked door from outside its swing and waits for it to settle. Door animation now protects both the player's feet/body and the hunter, rather than using the camera height as the player's collision position.
- Four real-scene routes pass: around the memorial (308 simulation frames), into the shop through an initially closed door (480), across the shop–clinic loop (847), and around the clinic partition (334). These checks assert continuous movement and supported floor, with no relocation.
- Fourteen new navigation tests include all shop entrances locked, door-cache invalidation, moving targets, hidden-player memory, expansion-budget exhaustion, unsupported gaps, twenty deterministic thin-obstacle layouts, and a closing door obstructed by the hunter.

The first planner prototype caused a ~498 ms CPU pause in the scene test and was rejected. Spatial filtering, cached occupancy and bounded searches substantially reduced subsequent planning cost; timings vary with this shared test machine (cold observations reached ~80 ms, later full-suite route peaks were lower). This is CPU-only evidence, not browser frame-rate or visual acceptance. Profiling on a WebGL-capable preview remains required.

## Legacy-route and spawn-safety follow-up

The original kitchen, living-room entry and narrow bedroom sliding-door routes now have real-controller tests (152, 191 and 285 simulation frames respectively). That pass exposed another inverted model: the living-room coffee tabletop was at floor height with its support above it. Rebuilt it with four legs and a supported top. Ground planning now avoids low furniture rather than treating its top as the same walking plane.

Two old encounter markers occupied the kitchen table and bedroom futon after model corrections. Moved them to clear floor and added a shared supporting-surface/body-clearance check to scripted hunts, stalking relocations and attack landing candidates. Markers in furniture, unsupported space or non-finite coordinates are rejected. Full verification at this checkpoint: 61 unit cases and 57 smoke assertions pass; visual/audio acceptance remains blocked as documented above.

## Raised-target regression

A visible player standing on the 24 cm bedroom futon previously sent the hunter toward a distant staircase: the old elevation test interpreted any height difference above 15 cm as another floor. Reproduced this in a real-scene encounter test. Stair routing now requires a genuine landing height or a target physically within a stairwell. Ground navigation can choose a clear adjacent-floor approach to a low raised target instead of routing through furniture. The futon encounter and the existing no-relocation stair ascent/descent checks both pass.

## Referenced bathroom fixture reconstruction

Rebuilt the original bathroom cluster using primary manufacturer dimensional references, documented in `docs/references/BATHROOM-FIXTURES.md`. The bath, toilet and basin now have true open shells, connected/supporting parts, and separate conservative collision envelopes. Seven new tests verify footprint, cavity depth, openings, normal orientation, contact/support, plumbing connections and the front service aisle. The complete suite at this checkpoint passes 69 unit cases and 57 smoke assertions. No claim of WebGL visual acceptance is made.
