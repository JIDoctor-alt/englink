# EngLink · 英语学习社区

<div align="center">

**Connect · Learn · Grow — 让英语学习不再孤单**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Zero Dependencies](https://img.shields.io/badge/依赖-零依赖-10B981?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-4F46E5?style=flat-square)

</div>

---

## 📖 项目简介

EngLink 是一个功能完整的**英语学习社区 Web 应用**，将词汇学习、语法课堂、社区论坛、学习打卡、积分排行榜融为一体。

- 🚫 **零依赖**：无需 Node.js、无需构建工具，下载即用
- 💾 **本地持久化**：基于 `localStorage`，刷新页面数据不丢失
- 📱 **响应式设计**：完美适配手机、平板、电脑
- ⚡ **SPA 架构**：Hash 路由单页应用，流畅无刷新体验

---

## ✨ 功能特性

### 🏠 首页
- Hero 横幅 + 社区数据统计（活跃学习者 / 优质帖子 / 学习词汇 / 今日打卡）
- **今日词汇**：每日自动轮换一个高级词汇卡片
- **学习榜单**预览 + 社区精选帖子

### 📖 学习中心
| 模块 | 说明 |
|------|------|
| 词汇卡片 | 15+ 高级词汇，点击触发 3D 翻转动画，支持标记"已掌握" |
| 语法课堂 | 6 节课程，涵盖初级 / 中级 / 高级语法要点，含例句解析 |
| 每日挑战 | 选择题形式，答对 +8 积分，附详细解析 |

### 💬 社区论坛
- **6 大板块**：📚 学习方法 / 📝 考试备考 / 💼 职场英语 / 🌍 文化交流 / 📂 资源分享 / 🗣️ 自由讨论
- 发帖、评论、点赞、浏览量统计
- 帖子详情页 + 评论区

### ✅ 学习打卡
- 每日打卡 +15 积分
- 连续打卡天数统计（🔥 streak）
- 当月打卡日历可视化

### 🏆 排行榜
- Top 3 领奖台展示（🥇🥈🥉）
- 完整积分排名列表

### 👤 个人中心
- 用户资料 + 学习数据总览
- **成就墙**：10 个成就徽章，自动解锁
- 我的帖子列表

---

## 🎮 积分系统

| 行为 | 积分 |
|------|:----:|
| ✏️ 发帖 | +10 |
| 💬 评论 | +5 |
| ❤️ 点赞 | +2 |
| ✅ 每日打卡 | +15 |
| 📚 学习单词 | +3 |
| 🎯 答对挑战 | +8 |
| 🏅 解锁成就 | +20 |

---

## 🛠 技术栈

```
HTML5          语义化结构，SPA 单页入口
CSS3           CSS 变量设计系统 · 响应式布局 · 3D 翻转动画 · 毛玻璃效果
JavaScript     ES6+ · Hash 路由 · 组件化渲染 · localStorage 持久化
零依赖          无 npm · 无 webpack · 无框架，开箱即用
```

---

## 🚀 快速开始

### 方式一：直接打开（最简单）

```bash
git clone https://github.com/JIDoctor-alt/englink.git
cd englink
# 双击 index.html 用浏览器打开即可
```

### 方式二：本地服务器（推荐，避免部分浏览器限制）

```bash
# Python 3
python -m http.server 8080

# Node.js（需全局安装 serve）
npx serve .
```

然后访问 [http://localhost:8080](http://localhost:8080)

---

## 📁 项目结构

```
englink/
├── index.html          # SPA 入口 + 导航栏 + 模态框
├── css/
│   └── style.css       # 完整样式系统（~1900 行）
├── js/
│   ├── data.js         # 数据层：种子数据 + localStorage 管理
│   └── app.js          # 应用逻辑：路由 + 页面渲染 + 交互
├── images/
│   ├── wechat-qr.png   # 微信收款码
│   ├── alipay-qr.jpg   # 支付宝收款码
│   ├── qq-group.jpg    # QQ 群二维码
│   └── zhishixingqiu.jpg # 知识星球邀请码
└── README.md
```

---

## 📬 联系作者

| 方式 | 信息 |
|------|------|
| 📧 邮箱 | [2775493312@qq.com](mailto:2775493312@qq.com) |
| 💬 微信 | DonovanQiu |
| 🐧 QQ 群 | 768306247（雅思英语伴侣） |
| 🐙 GitHub | [@JIDoctor-alt](https://github.com/JIDoctor-alt) |

如果这个项目对你有帮助，欢迎 ⭐ Star 支持，也可以请作者喝杯咖啡 ☕（打开网站点击"打赏作者"）

---

## 📄 License

[MIT License](LICENSE) © 2026 DonovanQiu

---

<div align="center">Made with ❤️ for English learners</div>
