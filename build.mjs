// 沿用锁文件中的 esbuild 版本；生产页面只使用本地 vendor 和经典脚本。
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const build = spawnSync('npm', [
  'exec', '--yes', '--package=esbuild@0.25.12', '--', 'esbuild',
  'js/game.js', '--bundle', '--format=iife', '--target=es2018',
  '--outfile=js/bundle.js', '--alias:three=./vendor/three.module.js', '--minify',
], { cwd: root, stdio: 'inherit' });
if (build.status !== 0) process.exit(build.status || 1);
const sources = ['js/rotate.js', 'js/bundle.js', 'js/ui-inline.js'];
const bundle = sources.map((source) => readFileSync(path.join(root, source), 'utf8')).join('\n');
writeFileSync(path.join(root, 'js/bundle.js'), bundle);
// 桌面构建与移动构建使用相同主线；场景不再依赖摄像头权限。
if (process.argv[2] === 'desktop') writeFileSync(path.join(root, 'js/bundle-desktop.js'), bundle);
// 内容版本避免浏览器继续使用上一次的脚本/样式；静态部署无需服务器配置。
const css = readFileSync(path.join(root, 'css/game.css'));
const hash = value => createHash('sha256').update(value).digest('hex').slice(0,10);
const indexPath=path.join(root,'index.html');
const html=readFileSync(indexPath,'utf8')
  .replace(/\.\/css\/game\.css(?:\?v=[a-f0-9]+)?/g,'./css/game.css?v='+hash(css))
  .replace(/\.\/js\/bundle\.js(?:\?v=[a-f0-9]+)?/g,'./js/bundle.js?v='+hash(bundle));
writeFileSync(indexPath,html);
console.log('ECHO APARTMENT build complete');
