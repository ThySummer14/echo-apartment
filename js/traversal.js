// 只记录有实际地板支撑、身体没有嵌墙的落脚点。建筑封边是主要防线；
// 此处处理异常掉落，恢复位置而不回退剧情或物品。
export class TraversalGuard {
  constructor() { this.safe = null; this.airTime = 0; }
  reset(point) { this.safe = { x: point.x, y: point.y, z: point.z }; this.airTime = 0; }
  update(char, grounded, colliders, dt) {
    const p = { x: (char.x0 + char.x1) / 2, y: char.y0, z: (char.z0 + char.z1) / 2 };
    if (![p.x, p.y, p.z].every(Number.isFinite)) return this.safe;
    const supported = grounded && colliders.some(c => p.x >= c.x0 && p.x <= c.x1 &&
      p.z >= c.z0 && p.z <= c.z1 && Math.abs(c.y1 - p.y) < .04);
    const blocked = colliders.some(c => c.x0 < char.x1 && c.x1 > char.x0 &&
      c.z0 < char.z1 && c.z1 > char.z0 && c.y1 > p.y + .35 && c.y0 < char.y1 - .08);
    if (supported && !blocked) { this.safe = p; this.airTime = 0; }
    else this.airTime += dt;
    if (this.safe && (p.y < -6 || (this.airTime > .8 && p.y < this.safe.y - 1.4))) {
      this.airTime = 0; return { ...this.safe };
    }
    return null;
  }
}
