# 104 layout diagnosis and bounded next proposal

Status: isolated greybox candidate implemented locally, 2026-10-06; not published. The reference proposal is retained below as rationale, followed by actual geometry and validation details. The user's blank-rendering report remains open.

## Narrative function

Campaign document 12 describes a tenant preparing to move out, observing a pursuer, warning against hiding in its sight and pointing toward the roof/mother's laundry. Document 15 records 104's key returned. The room is therefore a vacated private dwelling and optional investigation/hiding stop, not a communal hall. Its essential gameplay is door → readable diary → reachable hiding place/battery → return to corridor. There is no existing narrative requirement for a 115 m² uninterrupted chamber.

## Measured mismatch

The current room is x=7..18.5, z=46..56: 11.5 × 10 m =115 m² by wall centerlines. The bed frame is1.85 ×2.7 m. The area is one uninterrupted room with a bed, desk/chair, wardrobe and rug. This is a scale/layout mismatch relative to its current private-tenant function, although it does not prove the user's visible blank patches come from scale.

## Primary references actually checked

- UR, Yokodai Kita1-1, B1DK: https://www.ur-net.go.jp/chintai/sp/youkita1/floorplan/1dk/ — official page gives34.46m². Its actual plan image was downloaded and visually inspected: https://www.ur-net.go.jp/chintai/sp/youkita1/img/floorplan/1dk/1dk01/1dk01_fp01.png . It separates entry/wet services, dining/kitchen and bedroom; bedroom depth3300mm and overall width3900mm are printed on the plan. This is a modern reference for functional scale, not a historical replica or standard imposed on the game.
- UR Sukematsu: https://www.ur-net.go.jp/chintai/sp/kansai/osaka/80_0690.html — official stock description lists1DK–3K/25–41m². This supports compact dwelling scale; no room photo or specific plan from this listing was visually verified.

Only dimensions and planning principles should inform original game geometry. Do not redistribute the reference PNG in the asset library or copy the plan as a game asset.

## Recommended next prototype, pending scope review

Correct spatial scale before adding decorative objects. Test a roughly36–42m² whole-unit greybox in the existing104 location with the same corridor door. Treat that as a whole dwelling, not a36m² bedroom: reserve a compact entry/service strip and separate a12–16m² sleeping/investigation area. Reposition existing bed, desk, wardrobe, diary and battery at original physical scale. Use a short fixed partition/return to establish the transition and conceal the hiding corner from the open entry; keep the route legible. Exact wall coordinates need a collision-aware layout prototype and neighboring-envelope audit before selection. No bulk clutter, new lights, extra puzzle, reused held kitchen batch or broad map expansion is required.

The old footprint cannot simply become a traversable void. Audit adjacent exterior/service geometry first and choose a closed coherent boundary. Retain door identity and document/item IDs. This is an explicit proposal to correct dimensions, not authorization to move walls now.

## Acceptance before rebuilding or publishing

- Measure useful clear widths, with a proposed1.2m gameplay route and existing1.5m entry kept where possible. These are game targets, not claims of building-code compliance.
- Walk actual capsule continuously from corridor to diary, battery, hiding front and exit; repeat after door swings and furniture approaches. Check head clearance, bed43cm collision height and wardrobe interaction point.
- Verify the diary is reachable/readable by mouse and touch, without interacting through the partition. Test hide/exit placement and both known/unknown hiding perception paths; moving furniture must not reveal a hidden player to the hunter or strand its navigation.
- Check wall/ceiling face orientation and joint coverage from entry and inside at standing/crouch heights. A source raycast cannot replace a native visual check of the blank report.
- Keep saved progress and IDs. Audit actual saved checkpoint/position semantics before changing geometry; relocate only if an existing saved position becomes physically invalid, with a regression. Do not assume arbitrary player coordinates are currently saved.
- Compare mesh/triangle/light counts to the current batch-optimized baseline. Reuse existing materials; no new point lights or unbounded props.
- Review a bounded exact-geometry view only if needed and separately approved. WebGL appearance and phone FPS remain unverified until a capable native route exists.

## Implemented isolated greybox candidate

Based on published `3f03d2ad` (local `ac4be290`), pending review and not published. The selected whole-unit boundary is x7..14,z46..52:7×6m=42m² measured at wall centerlines. Bedroom partition runs along z48.8 and x10.1 with a1.3m opening at z49..50.3. Bedroom centerline area is3.9×3.2=12.48m². The entry/service division is x11.8; its service opening is1.2m. These are original simplified game dimensions informed by the references, not a reproduction of their plan.

The shared north corridor wall and original door remain unchanged. The opened door's1.5m sweep ends at z47.5; the partition's near face is z48.7, retaining a1.2m turning strip. This clearance was corrected after the first prototype's0.7m strip failed actual walking and hunter tests. The front service area is deliberately an unfurnished greybox at this stage, not a claim of a completed kitchen/bathroom model.

Existing bed, desk/chair, wardrobe, diary, battery and window are moved at original scale. Bed collider remains43cm high. One existing light is repositioned; no new lights. The separate unpublished kitchen stack is not included.

The first full smoke run correctly failed because its104 desk waypoint still pointed outside the new shell and its return crossed the new partition. The104 route now visits the actual new desk and wardrobe through the door openings; all subsequent external/upper-floor routes remain unchanged. Do not interpret these initial failures as passed checks.

Checkpoint migration only handles invalid positions in the former104 footprint. Normal chapter checkpoints are elsewhere; no arbitrary live-position save system is introduced. The actual wake handler uses collision checks, persists the safe entry checkpoint and leaves flags/items/documents/time intact. A repeated wake does not write or move a valid migrated point again.

Baseline proof hashes all primitive collision metadata outside the old104 envelope, every door's label/hinge/width and all outside navigation nodes against the published starting scene. The shared corridor, laundry, workshop and other floors are included. New104 nodes are inside supported walkable space. Total scene meshes6406→6411 and triangles287136→287196; fixture batching still saves1216 mesh objects. No FPS measurement or native rendering acceptance is implied.

Inspection artifact: `output/room104-plan.svg`, generated from actual collision boxes and the tested path, shows the door open. This is a top-down engineering plan only. The user-reported blank appearance remains open.

Review follow-up: migration now tests actual walkable floor support and body collision, including the retained door threshold. Legal entrance checkpoints such as(10.75,0,46.2) retain object identity; points on removed floor or inside new walls/furniture still move safely.
