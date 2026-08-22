// build.mjs —— 把 ESM 项目打包成容器合规的单文件经典脚本（IIFE）
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));

/* 'three' 与 'three/addons/*' 映射到本地 vendor（原 importmap 的等价物） */
const vendorPlugin = {
  name: 'vendor-map',
  setup(b) {
    b.onResolve({ filter: /^three$/ }, () => ({
      path: path.join(root, 'vendor/three.module.js'),
    }));
    b.onResolve({ filter: /^three\/addons\// }, (args) => ({
      path: path.join(root, 'vendor/addons', args.path.slice('three/addons/'.length)),
    }));
  },
};

await build({
  entryPoints: [path.join(root, 'js/game.js')],
  bundle: true,
  format: 'iife',
  target: ['es2018'],
  outfile: path.join(root, 'js/bundle.js'),
  minify: true,
  alias: { three: './vendor/three.module.js' },
  plugins: [vendorPlugin],
  logLevel: 'info',
});

/* 内联 UI 脚本（滑杆灵敏度）追加到包尾，容器禁内联 <script>；
   游戏主体初始化后重新评估伪横屏 */
const rotateJs = readFileSync(path.join(root, 'js/rotate.js'), 'utf8');
const inline = readFileSync(path.join(root, 'js/ui-inline.js'), 'utf8');
const bundled = readFileSync(path.join(root, 'js/bundle.js'), 'utf8');
writeFileSync(path.join(root, 'js/bundle.js'), rotateJs + '\n' + bundled + '\n' + inline);

/* 桌面版目标：追加 meta 摄像头模块（小红书版绝不包含）
   用法： node build.mjs desktop → js/bundle-desktop.js */
if (process.argv[2] === 'desktop') {
  const metaJs = readFileSync(path.join(root, 'js/meta-camera.js'), 'utf8');
  const xhs = readFileSync(path.join(root, 'js/bundle.js'), 'utf8');
  writeFileSync(path.join(root, 'js/bundle-desktop.js'), xhs + '\n' + metaJs);
  console.log('bundle-desktop.js 完成（含 meta 摄像头）');
}
console.log('bundle.js 完成');
