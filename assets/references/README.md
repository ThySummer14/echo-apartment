# 楼梯间建模参考

首张候选 `stairwell-switchback.png` 的楼层连接关系不可靠，用户指出后不采用其建筑结构。楼梯先按真实尺寸搭建并验证灰模，后续参考图仅用于表面和分件设计，不能替代建筑尺寸与通路验证。

## 初稿提示词（未采用结构）

```text
Use case: stylized-concept
Asset type: architectural and prop modeling reference sheet for the playable horror game Echo Apartment.
Primary request: a highly detailed, believable ordinary 1980s Japanese apartment interior stairwell with a rectangular switchback (dog-leg) staircase: two straight parallel flights, a 180-degree turn on a solid intermediate landing, and full floor landings connected directly to the apartment corridor. NOT a spiral staircase. Show the physical connection to the corridor clearly.
Composition: one large three-quarter cutaway architectural view of two storeys on the left, with three close-up reference details on the right: worn concrete tread and anti-slip nosing, tubular handrail and bolted baluster foot, aged fluorescent wall fixture and peeling paint. Clean legible geometry, straight lines, realistic construction, sufficient light to see every component.
Architecture: 2.8-metre storey height; 16 risers per storey, divided into two flights of 8 risers; 0.175-metre risers, 0.30-metre goings, 1.65-metre-wide flights, 1.65-metre-deep landings; narrow gap between flights; reinforced-concrete sloping slabs beneath both flights. Floor landing, last tread, and corridor meet flush with absolutely no floating gaps.
Materials: stained pale concrete, rounded worn tread edges, green-gray painted metal railings with vertical balusters and mounting plates, dark worn rubber handrail grips, dull brass anti-slip strips, yellowed ivory plaster above a faded desaturated green lower wall band, peeling paint patches, subtle damp runs, ceramic skirting, conduit bends, screw heads, dusty ribbed fluorescent diffusers.
Lighting: cold rainy nighttime light from a wired-glass window with a little warm incandescent spill from the corridor; restrained psychological-horror atmosphere, but reference-sheet clarity rather than obscured black shadows.
Style: realistic game environment asset art, detailed surfaces and sensible architecture; subdued muted colors; no people, gore, monsters, spiral stairs, impossible architecture, disconnected floors, text, logos or watermark.
```

## 采用的流程

`stairwell-validated-graybox.png` 来自游戏实际几何，尺寸、两跑升高、平台支撑和地板接合通过连续碰撞测试。`stairwell-material-reference.png` 是把这个灰模交给 imagegen 后生成的材质参考；代码模型始终保留已验证的结构，不按生成图重新猜测几何。

## 灰模约束的提示词

```text
Use case: precise-object-edit
Asset type: material-reference rendering of a validated 3D switchback stair model for Echo Apartment.
The input is the actual tested game stair model, not an architectural suggestion. Keep its geometry, camera, framing, four support columns, all five floor/half-floor landings, both pairs of straight flights, stair counts, exact floor connections, and railing positions IDENTICAL. Do not add, delete, relocate or redesign any staircase, landing, slab, beam, column or corridor connection. Do not convert it to a spiral staircase.
Change ONLY surface appearance and background lighting: aged pale pitted concrete with subtly worn nosings, dull brass anti-slip strips, desaturated green-gray painted steel balusters with tiny chipped paint, worn dark brown rubber handrails, dusty mounting plates and screw heads. Preserve clear visible structural connections. Add a restrained old apartment atmosphere in the background: cold rain-lit tones and a little warm hallway spill, leaving the model unobscured. The existing blue-gray connected corridor slabs must remain exactly where they are. Remove only the textual graybox caption at the upper-left.
Style: carefully lit realistic PBR material reference, geometry remains exact to the source model. No people, gore, ghosts, logos, new text, floating connections, missing stair flights or altered proportions.
```
