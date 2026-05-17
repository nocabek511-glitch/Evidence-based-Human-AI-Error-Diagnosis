# 项目访问方式

## 1. 本机固定打开地址

只要开发服务正在运行，本机永远打开：

```text
http://localhost:5173/
```

以后不用每次问新的网址。你可以直接双击项目根目录里的：

```text
start-local.bat
```

它会自动启动项目，并打开 `http://localhost:5173/`。

## 2. 同一 Wi-Fi / 同一局域网访问

同一网络里的其他电脑可以访问：

```text
http://你的电脑IPv4:5173/
```

这个 IPv4 可能会随着换网络、重启路由器、切换热点而变化，所以它不适合作为长期固定网址。

## 3. 不同网络的用户访问

不同网络的用户不能稳定访问 `localhost` 或局域网 IP。要让任何地方的人都能打开，需要公网部署。

推荐方案：

```text
前端 React/Vite：部署到 Vercel、Netlify 或 Cloudflare Pages
后端 Node API：部署到 Render、Railway、Fly.io 或云服务器
```

注意：

```text
.env 和 .env.local 不能上传给别人，也不能提交 GitHub。
OpenAI / 有道的密钥要在后端托管平台的 Environment Variables 里配置。
```

## 4. 临时公网演示

如果只是临时给别人看，可以用 Cloudflare Tunnel / ngrok 这类公网隧道。

但临时隧道的网址通常会变；要固定网址，需要注册账号、绑定域名或创建固定 tunnel。
