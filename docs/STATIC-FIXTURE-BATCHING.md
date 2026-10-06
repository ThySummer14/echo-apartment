# Bounded static fixture batching candidate

Baseline: published mobile/phone commit 27744bf, equivalent local 0aa71c3. The held kitchen and 104 bed batches are not part of this candidate.

## Scope

Only the opaque hardware created by `fixtureDetails` is merged, separately within each fixture and only when material identity, shadow flags, render order, layer mask and frustum settings match. The mutable diffuser retains its exact object/material reference. Transparent, alpha-tested, hidden, custom-rendered or incompatible geometry stays separate. No room, floor, doorway, collision or interaction object is hidden.

Default batching can be disabled at construction using `new Level(scene, handlers, {batchStaticFixtures:false})`, or by loading the game with `?fixtureBatching=0`. This rebuilds the original fixture arrangement; it does not change saved progress.

## Evidence

The actual level contains 64 such fixtures. Their mesh count changes from 1,472 to 256; whole-level mesh count changes from 7,622 to 6,406. Total triangle count remains 287,136. These are measured scene-object counts, not measured WebGL draw calls or FPS. The user's lag report has not been attributed to this game or device.

Equivalence tests compare triangle positions, transformed normals, UVs and material identity under ceiling/wall rotations and nonuniform parent scaling. They also check precise geometry bounds, conservative culling bounds at doorway-like view edges, diffuser identity, transparency/custom-callback exclusions, shadows, collisions, interaction positions, door states, powered/relay lamps, blackout behavior and reduced-effects updates.

## Limits and rollback

Merged bounds may be more conservative at oblique angles, retaining a few extra triangles near a view edge. The merged meshes never span different fixtures. Native GPU timings and pixel-level WebGL comparison are still unverified, so no frame-rate gain is claimed. The construction switch provides a direct fallback for future native-browser comparison. No additional render or external telemetry is introduced.
