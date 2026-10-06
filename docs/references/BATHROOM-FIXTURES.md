# Bathroom fixture modeling reference audit

Checked 2026-10-06. These are dimensional and construction references for original procedural models, not copied manufacturer meshes, textures, branding or exact product reproductions.

## Primary references

- [Roca Contesa A236160000](https://www.cac.roca.com/en-GB/products/rectangular-steel-bath-236160..0): compact steel bath, 1400 × 700 × 400 mm; listed inner width 575 mm and inner height 300 mm. Used for the tub's body envelope, open rim and basin depth. The game's 150 mm concrete support plinth is an authored installation choice, not a quoted product dimension.
- [TOTO CS326DT3 technical sheet](https://vn.toto.com/wp-content/uploads/2024/02/TSKT_Ban_cau_mot_khoi_CS326DT3_Rv02.pdf): elongated close-coupled ceramic toilet, 710 × 380 × 718 mm. Used for overall scale and the separation of pan, tank, seat, fixings and water connection. Internal curves, seat opening, hardware and wear are authored. Text was retrievable; the screenshot endpoint returned 403, so no visual inspection of that sheet is claimed.
- [Roca Ona technical specifications, page 2](https://www.us.roca.com/documents/20126/44093530/Technical_Specifications_Ona_collection_Roca.pdf/430514c7-8810-7005-7ece-c38ff2f41454?download=true&t=1637866356491): 550 × 460 mm basin option and 46 mm drain. Used for the basin footprint and opening. Pedestal/mounting height and tap geometry are authored to fit the existing room.

## Changes from the previous geometry

The former bath was a solid 1400 × 550 mm block with a dark water slab buried inside. The toilet had a solid rectangular pan/seat, and the sink was a capped box. Their openings now exist in the actual mesh. The basin pedestal no longer intrudes into the drain; the cistern has a supporting rear body and gasket. Shower pipes join the mixer and wall brackets. The bathroom mirror now faces into the room above the basin and has wall-reaching standoffs.

The player still cannot enter these small fixture footprints. Conservative body colliders are separate from decorative fittings, while the service aisle, existing washer interaction and medicine cabinet remain accessible.

## Evidence and limits

Eight fixture tests verify dimensions, wall clearance, hollow openings through downward raycasts, support contacts, drain/pedestal separation, normal orientation, finite geometry, connected plumbing/mounts and walkable clearance. The cluster contains 52 meshes and 6,180 triangles. This is geometry/physics evidence; final lighting, apparent material quality and audio remain subject to WebGL playtesting.

## Offline mesh inspection follow-up

An exact-mesh CPU inspection render revealed that the original oval water patch did not meet the tub walls at its waterline. The water surface is now derived from the intersection of the actual inner-wall triangles with a horizontal plane. A new regression checks its full rounded-rectangular footprint. Inspection uses neutral studio lighting and flat proxies for texture maps; it is not a screenshot or acceptance test of the game renderer.
