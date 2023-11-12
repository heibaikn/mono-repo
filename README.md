# mono

## start

1. 安装 pnpm `npm i -g pnpm`
2. 在 根目录下 `pnpm i ` 安装依赖
3. `pnpm run dev` 启动服务

## 目录

```bash
.
├── CHANGELOG.md
├── Makefile
├── README.md
├── action  
├── config      // 项目运行配置目录
├── dist        // 构建输出目录
├── docker      // 本地docker部署配置
├── package.json
├── packages    // 业务相关公共包
│   ├── editor
│   ├── file-icon
│   ├── helper
│   ├── virtual-list
│   └── widget
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── scripts     // ci 相关脚本
├── tooling     // 项目dev,ci插件配置，如eslint
├── tsconfig.json
└── www        // 具体业务代码
    ├── design
    ├── main
    └── react
```


## 代码规范

1. 文件夹名使用 小写中划线区分 `eg:gaming-service`
2. 文件名使用 小写下划线区分 `eg:flow_item_timegate.vue`
3. 普通变量名使用小驼峰，组件名、类型定义使用大驼峰
4. vue 文件推荐使用`<script setup lang='ts'>`规范