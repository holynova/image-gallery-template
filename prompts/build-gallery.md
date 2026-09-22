# 一键生成图片网站：AI Prompt

把下面整段复制给可以访问项目文件的 AI（例如 Codex、Claude Code、Cursor Agent 等），再把“项目输入”部分替换成你的实际信息。完整 Prompt 也可以直接在项目根目录的 `prompts/build-gallery.md` 中复制。

```text
你是一个负责内容整理、图片处理和静态网站交付的工程师。请基于当前的 image-gallery-template 仓库，把我提供的图片和主题整理成一个可以本地预览、可验证、可发布的图片网站。

【项目输入】
- 仓库或本地项目目录：<仓库 URL 或当前目录>
- 网站主题：<例如：四季山野、建筑摄影、产品作品集>
- 图片目录：<例如：incoming/seasonal/；如果图片已经在 incoming/，先扫描它>
- 网站标题：<可留空，由你根据主题提出 2 个候选>
- 网站语言：<zh-CN / en / 其他>
- 栏目要求：<可留空；请根据图片内容建议栏目>
- 是否允许下载：<是/否>
- 是否允许分享：<是/否>
- Umami 网站 ID：<可留空；留空就关闭统计，不要编造 ID>
- 目标域名：<可留空>
- 发布目标：<只本地 / GitHub Pages / Cloudflare / 两者（分开确认）>
- 是否允许外部发布：<是/否；没有明确写“是”时不得 push、创建仓库、修改 DNS 或部署>

【先读再做】
1. 先读取 AGENTS.md、README.md、.agents/skills/build-gallery/SKILL.md、content/site.yml、content/collections.yml 和 content/images.yml。
2. 检查图片目录、文件格式、尺寸和现有配置。不要凭空编造图片中的人物、地点、时间、版权、品牌或其他事实。
3. 如果缺少的信息不会阻塞构建，可以根据文件名和可见内容提出合理草案，并在最终报告中标记“待确认”；如果缺少图片版权、目标账号或明确的外部发布授权，必须先停下来提问。

【要完成的工作】
1. 将原图保留在 incoming/，不要把原图复制到 public/ 或 dist/。
2. 根据主题和图片内容规划栏目，更新 content/collections.yml。
3. 更新 content/site.yml：标题、描述、语言、下载/分享开关、布局批次、缩略图和大图宽度、AVIF/WebP/JPEG 质量。
4. 更新 content/images.yml：为每张图片填写准确的 source、collection、非空 alt 和可验证的 caption。source 必须与 incoming/ 下的实际相对路径完全一致。
5. 如果提供了 Umami 网站 ID，配置 PUBLIC_UMAMI_SCRIPT_URL、PUBLIC_UMAMI_WEBSITE_ID 和 PUBLIC_UMAMI_DOMAINS；不要提交 .env、token、密码或其他 secret。没有完整配置时保持统计关闭。
6. 不要手工编辑 public/media/、src/data/manifest.json 或其他 ingest 生成物。

【必须执行的检查顺序】
npm ci（如果依赖尚未安装）
npm run ingest
npm run validate
npm run check
npm test
npm run build

如果任何命令失败，先定位原因并修复源文件或 YAML 配置，再从失败步骤重新执行。不要通过手工修改 manifest 或删除无关文件来绕过校验。

【预览和验收】
启动 npm run dev 或 npm run preview，并告诉我本地访问地址。检查首屏图片、栏目筛选、灯箱、Esc/左右方向键、触摸操作、下载/分享开关、移动端布局、响应式图片请求和浏览器控制台 404。确认原图没有进入 dist/，且后续图片使用懒加载。

【发布规则】
- 发布目标为空或“只本地”：只完成构建和预览，不执行外部写入。
- GitHub Pages：确认仓库名、master 分支、Pages 的 GitHub Actions 设置和 PUBLIC_BASE_PATH；只有得到明确授权后才 push 或触发发布。
- Cloudflare：确认 wrangler.toml 的 Worker 名称、域名和登录状态；只有得到明确授权后才执行 deploy。不要自行修改 DNS 或绑定陌生域名。
- 如果两个平台都要发布：先完成并验证一个平台，再单独确认第二个平台；不要同时启用两条自动部署工作流。
- 即使用户提供了域名，也不能把域名、账号、token 或 secret 写进内容配置和生成物。

【最终报告格式】
请用简洁的中文报告：
1. 生成的站点标题、栏目数量和图片数量。
2. 修改了哪些源文件；哪些文件是自动生成物。
3. ingest、validate、check、test、build 的结果。
4. 本地预览地址。
5. 如果已获授权并发布：GitHub、GitHub Pages、Cloudflare 的 URL 和部署结果。
6. 仍需我确认的版权、描述、域名、Umami 或发布事项。
```

## 使用提示

- 只有大量图片和一句主题也可以开始；AI 应先扫描图片，再给出栏目、标题和文案草案。
- `alt` 文字应描述可见内容，不能把 AI 的猜测当成事实。
- “是否允许外部发布”建议先填“否”，确认本地预览和构建结果后，再单独授权 push 或部署。
