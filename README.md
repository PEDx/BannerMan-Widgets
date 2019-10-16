# BannerMan-Widgets

### lernajs 命令

- lerna init: 初始化项目
- lerna bootstrap: 自动构建项目
- lerna ls: 列出当前项目所有包
- lerna clean: 清理 node_modules 文件夹
- lerna add: 添加依赖（类似 npm install)
- lerna publish: 发版

### 组件开发流程

1. 在 packages 新建组件文件夹
2. 使用 `npm init` 初始化 package.json( 初始化 package.json 时， name 字段必须唯一，不然 lerna 会报错 ), 使之成为可单独发布的 npm 包
3. 新建 stories 文件夹, 添加 index.js 文件, 可使用 storybook 开发和调试
4. 在项目根目录运行 `npm run build` 会构建所有组件
5. `lerna publish` 会自动交互式添加版本号, 并运行 git 提交和 npm 发包操作,
