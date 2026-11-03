# 自留诗集 - 部署指南

一个基于 GitHub Pages + Supabase 的诗歌分享网站，支持用户注册登录、发布诗歌、评论互动、感言墙、诗集合集。

## 功能清单

- ✅ 用户注册 / 登录（邮箱密码）
- ✅ 诗歌发布 / 浏览 / 评论
- ✅ 感言墙（带心情标签）
- ✅ 诗集合集
- ✅ 个人中心（管理自己的内容）
- ✅ 响应式设计，手机电脑都能用

---

## 第一步：注册 Supabase（免费）

Supabase 提供免费的后端数据库和用户认证服务，完全够用。

1. 打开 [supabase.com](https://supabase.com)，用 GitHub 账号登录
2. 点击 **New Project** 创建新项目
3. 填写项目信息：
   - Name：`poetry`（随便起）
   - Database Password：设一个强密码，记下来
   - Region：选离你近的（如 Northeast Asia (Tokyo)）
4. 等待项目创建完成（大概1-2分钟）

### 配置数据库表

1. 左侧菜单点 **SQL Editor**
2. 把项目里 `schema.sql` 文件的内容全部复制粘贴进去
3. 点 **Run** 执行，数据库表就建好了

### 获取 API 密钥

1. 左侧菜单点 **Settings**（齿轮图标）→ **API**
2. 复制两个值：
   - **Project URL** → 类似 `https://xxxxx.supabase.co`
   - **anon public** key → 一长串字符

---

## 第二步：修改网站配置

打开项目里的 `js/supabase.js` 文件，把开头两行改成你自己的：

```javascript
const SUPABASE_URL = '你的 Project URL';
const SUPABASE_ANON_KEY = '你的 anon public key';
```

比如：
```javascript
const SUPABASE_URL = 'https://abcdefgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## 第三步：部署到 GitHub Pages

### 1. 创建 GitHub 仓库

1. 打开 [github.com](https://github.com)，登录
2. 点右上角 **+** → **New repository**
3. 仓库名填：`poetry-website`（随便起）
4. 选 **Public**（必须公开，GitHub Pages 免费版需要）
5. 点 **Create repository**

### 2. 上传代码

把整个 `poetry-website` 文件夹里的所有文件上传到这个仓库：

- 方式一：网页上传
  - 在仓库页面点 **uploading an existing file**
  - 把所有文件拖进去
  - 点 **Commit changes**

- 方式二：Git 命令行（如果你会用的话）
  ```bash
  git init
  git add .
  git commit -m "init"
  git branch -M main
  git remote add origin https://github.com/你的用户名/poetry-website.git
  git push -u origin main
  ```

### 3. 开启 GitHub Pages

1. 仓库页面点 **Settings** → 左侧 **Pages**
2. **Source** 选：`Deploy from a branch`
3. **Branch** 选：`main`，文件夹选 `/ (root)`
4. 点 **Save**
5. 等1-2分钟，上面会出现你的网站地址：
   `https://你的用户名.github.io/poetry-website/`

---

## 完成！

现在你可以：
- 打开网站地址，注册一个账号
- 发布你的第一首诗
- 把网址分享给朋友，让他们也来留言

---

## 免费额度说明

Supabase 免费版包含：
- 500MB 数据库存储
- 50000 月活跃用户
- 2GB 带宽

个人用完全够，不用担心费用。

GitHub Pages 也是完全免费的。

---

## 文件结构

```
poetry-website/
├── index.html          # 首页（诗歌列表）
├── poem.html           # 诗歌详情页（带评论）
├── publish.html        # 发布诗歌页
├── auth.html           # 登录/注册页
├── notes.html          # 感言墙
├── collections.html    # 诗集合集
├── admin.html          # 个人中心
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── supabase.js     # Supabase 配置
├── schema.sql          # 数据库建表语句
└── README.md           # 本说明文件
```
