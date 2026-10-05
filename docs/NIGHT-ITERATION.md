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
