# Agora 客户支持助手演示

[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)

本文仅翻译文档；应用界面和语音对话仍使用英语。请使用下方英文示例试说，中文仅供理解。

基于 Agora 和 Next.js 的语音 AI 客户支持演示。咨询产品或服务问题、逐步排查常见故障，并在联系商家或服务提供方前整理问题摘要。

**[在 Agora Recipes 探索更多语音 AI 演示 →](https://recipes.agora.io/)**

[![Agora](https://img.shields.io/badge/Voice_AI-Agora-099DFD)](https://www.agora.io/en/products/conversational-ai-engine/)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/docs)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[功能](#features) · [技术栈](#tech-stack) · [本地运行](#run-locally) · [部署到 Vercel](#deploy-to-vercel) · [使用流程](#how-it-works) · [定制](#customize) · [常见问题](#faq) · [更多](#more)

<a id="what-you-can-do"></a>

<a id="features"></a>

## 功能

- **常见咨询：** 讨论产品使用、缺件、退货、配送、账单和账户问题。
- **逐步排查：** 描述故障及已完成的检查，再讨论安全的下一步。
- **追问与澄清：** 在对话中补充问题并修正细节。
- **问题摘要：** 总结问题、已尝试的检查及需要向商家确认的事项。
- **语音与转写：** 自然交谈并查看文字记录。

<a id="tech-stack"></a>

## 技术栈

- **前端：**  Next.js、React、TypeScript。
- **语音 AI：**  Agora Conversational AI、Agents SDK、RTC、RTM。
- **模型：**  Deepgram STT、OpenAI LLM、MiniMax TTS。

<a id="quick-start"></a>

<a id="run-it"></a>

<a id="try-it"></a>

<a id="conversation"></a>

## 快速开始

<a id="run-locally"></a>

### 本地运行

需要 Node.js 24、pnpm 9.15.9，以及已启用 Conversational AI 的 [Agora 项目](https://console.agora.io/)。

**1. 安装与配置**

克隆或下载本仓库，然后在仓库目录中打开终端。

```bash
pnpm install --frozen-lockfile

if [ ! -f .env.local ]; then
  cp env.local.example .env.local
fi
```

在 [Agora Console](https://console.agora.io/) 创建或选择项目。打开 **Manage credentials**，将 **App ID** 和 **Primary certificate** 复制到 `.env.local`（[操作说明](https://docs.agora.io/en/introduction/console-setup)）：

```dotenv
NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
NEXT_AGORA_APP_CERTIFICATE=your_agora_app_certificate
```

默认语音和语言模型无需单独配置 API Key。App Certificate 仅限服务端使用，请保存在 `.env.local`，不要暴露在浏览器代码中。配置模板见 [env.local.example](env.local.example)。

**2. 启动应用**

```bash
pnpm run doctor
pnpm run dev
```

打开 [http://localhost:3000](http://localhost:3000)，选择 **Start customer support** 并允许使用麦克风。需要时可请助手总结对话，点击挂断按钮（**End session**）结束。

<a id="deployment"></a>

<a id="deploy-to-vercel"></a>

### 部署到 Vercel

[![部署到 Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAgoraIO-Community%2Fagora-customer-support-assistant-demo&env=NEXT_PUBLIC_AGORA_APP_ID%2CNEXT_AGORA_APP_CERTIFICATE&envDescription=Agora%20App%20ID%20and%20App%20Certificate%20from%20Agora%20Console.%20Enable%20Conversational%20AI%20for%20the%20project.&envLink=https%3A%2F%2Fdocs.agora.io%2Fen%2Fintroduction%2Fconsole-setup&project-name=agora-customer-support-assistant-demo&repository-name=agora-customer-support-assistant-demo)

1. 点击按钮，将本仓库克隆到你的 Git 账户并导入 Vercel。
2. 选择 **Next.js** 和 Node.js 24。
3. 在 **Environment Variables** 中填写 `NEXT_PUBLIC_AGORA_APP_ID` 和 `NEXT_AGORA_APP_CERTIFICATE`，然后部署。

<a id="how-it-works"></a>

## 使用流程

1. **开始对话：** 选择 **Start customer support** 并允许使用麦克风。
2. **描述问题：** 说明产品或服务的问题及已尝试的方法。
3. **逐项排查：** 每次讨论一个有效的检查或后续步骤。
4. **获取摘要：** 请助手整理联系商家或支持团队时可用的摘要。

### 架构

```mermaid
flowchart TB
  Browser[浏览器语音工作区] <-->|RTC 音频| Agent[Agora 语音 AI Agent]
  Agent -->|RTM 转写和事件| Browser
  Browser -->|启动和停止请求| Server[Next.js 服务端]
  Server -->|RTC 和 RTM token| Browser
  Server -->|启动和停止| Agent
  Reference[内置场景参考资料] -->|提示词上下文| Server
```

Next.js 签发浏览器 token，并在启动 Agora Agent 时提供场景指令。对话行为由提示词驱动，未连接实时业务系统。详见 [ARCHITECTURE.md](ARCHITECTURE.md)。

<a id="faq-and-limitations"></a>

<a id="faq"></a>

## 常见问题

### 需要接入客服系统才能体验吗？

不需要。使用 Agora 项目和仓库自带的支持指引即可体验。

### 应该向助手说明什么？

说明产品或服务、问题及已尝试的方法。退货或配送问题可提供相关消息或政策，无需账户标识。可以尝试说：“My headphones will not connect. I already tried restarting them.”（意为“我的耳机连接不上，已经重启过了。”）

### 为什么仍然需要向商家确认？

助手无法访问你的订单或商家的手册与政策。它能解释你提供的信息并整理问题，但不能核实资格或办理退款。

### 为什么无法启动语音会话？

检查浏览器麦克风权限、输入设备、Agora App ID、App Certificate 和 Conversational AI 权限。请使用 localhost 或 HTTPS。运行 `pnpm run doctor` 检查本地配置，再按页面错误提示重试。

### 可以保存对话副本吗？

可以。在 Inspector 中选择 **Export session evidence**，将当前或最近一次通话下载为 JSON。请在开始新通话或刷新页面前导出。

<a id="customize"></a>

### 如何让演示更贴近真实业务？

通过 [RAG](https://docs.agora.io/en/ai/build/custom-model-integration/custom-llm)、[工具调用](https://docs.agora.io/en/ai/build/tools/custom-tools)或 [MCP](https://docs.agora.io/en/ai/build/tools/mcp-tools) 连接自己的知识库和业务服务。 添加工具时，在 [Agent 配置](app/api/invite-agent/route.ts)中将 `advancedFeatures.enable_tools` 设为 `true`。

### 如何适配自己的场景？

按你的场景定制 Agent 提示词、业务工具和界面。

## 许可与来源

采用 [MIT License](LICENSE)。请保留[第三方声明](THIRD_PARTY_NOTICES.md)。

<a id="more"></a>

## 更多

- **[Recipes](https://recipes.agora.io/)：** 探索更多 Agora 演示与集成。
- **[Docs](https://docs.agora.io/en/ai)：** 学习构建和扩展语音 Agent。
- **[Console](https://console.agora.io/)：** 创建项目，管理凭据和用量。
