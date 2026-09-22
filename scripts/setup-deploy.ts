import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const target = process.argv[2];

if (target !== 'github-pages' && target !== 'cloudflare-pages') {
  console.error('用法：npm run setup-deploy -- github-pages | cloudflare-pages');
  process.exit(1);
}

const files = {
  'github-pages': path.join(root, '.github', 'workflows', 'deploy-pages.yml'),
  'cloudflare-pages': path.join(root, 'wrangler.toml'),
} as const;

await fs.access(files[target]);
console.log(`${target} 配置已就绪：${path.relative(root, files[target])}`);
console.log('部署目标互斥：只执行你选定的平台命令，不会自动触发另一个平台。');
