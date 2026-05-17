# 公网部署

目标：发一个链接，别人点开就能看到网站。

当前项目可以部署到 Vercel。页面是 Vite 静态站，GPT 测试接口保留为 `/api/openai-test`。

## 需要配置的环境变量

如果你要保留 GPT 接口，请在 Vercel 的 Environment Variables 里配置：

```text
OPENAI_API_KEY=你的中转站 API Key
OPENAI_BASE_URL=https://www.zeoapi.com/v1
```

不要把 `.env` 或 `.env.local` 提交到 GitHub。

## 方式 A：Vercel 网页部署

1. 把项目上传到 GitHub。
2. 打开 Vercel。
3. 选择 Add New Project。
4. 导入这个 GitHub 仓库。
5. Framework Preset 选择 Vite。
6. Build Command 使用：

```text
npm run build
```

7. Output Directory 使用：

```text
dist
```

8. 点击 Deploy。

部署完成后，Vercel 会给你一个公网链接，例如：

```text
https://your-project.vercel.app
```

把这个链接发给别人，对方不同网络也能打开。

## 本地检查

```cmd
npm.cmd run build
```

如果构建通过，就可以部署。
