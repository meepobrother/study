# tmt-workflow 
> 一个基于 Gulp(v4.0)、高效、跨平台(macOS & Win)、可定制的前端工作流程。
> 现已推出 GUI 桌面工具：WeFlow，无需安装任何环境依赖即可使用，官网下载：http://weflow.io/

# 功能特性
- 自动化流程
    + Less/Sass -> CSS
    + CSS Autoprefixer 前缀自动补全
    + 自动生成图片 CSS 属性，width & height 等
    + CSS 压缩 cssnano
    + CSS Sprite 雪碧图合成
    + Retina @2x & @3x 自动生成适配
    + imagemin 图片压缩
    + JS 合并压缩
    + EJS 模版语言
- 调试 & 部署
    + 监听文件变动，自动刷新浏览器 (LiveReload)
    + FTP 发布部署
    + ZIP 项目打包
- 解决方案集成
    + px -> rem 兼容适配方案
    + 智能 WebP 解决方案
    + 去缓存文件 Reversion (MD5) 解决方案

# 快速开始
> 以下 2 种方式任选，请确保已安装 Node.js (已经支持到 Node 6) 环境

- 使用 Yoeman 脚手架 generator-workflow 自动安装（推荐）
    + npm install -g generator-workflow
    + yo workflow
- 直接下载安装：
    + 全局安装 Gulp 4，执行：npm install gulpjs/gulp#4.0 -g
    + 点击下载 tmt-workflow，进入根目录执行： npm install

> 注1：Gulp 4 目前 尚未正式发布，Windows 用户请先安装 git，
> 然后在 Git Bash 下执行 npm install 即可（非 CMD）
> 注2：如遇 npm install 网络问题，推荐尝试 cnpm 安装环境依赖

# 目录结构
## 工作流目录结构

```
tmt-workflow/
│
├── _tasks                // Gulp 任务目录
│   ├── TaskBuildDev.js     // gulp build_dev
│   ├── TaskBuildDist.js    // gulp build_dist
│   ├── TaskFTP.js          // gulp ftp
│   ├── TaskZip.js          // gulp zip
│   │
│   ├── common
│   │   └── webp.js
│   │
│   ├── index.js
│   │
│   ├── lib
│   │   └── util.js
│   │
│   └── plugins             // 插件目录
│       ├── TmTIndex.js
│       └── ftp.js
│
├── package.json
│
└── project                 // 项目目录，详见下述项目结构 ↓↓↓
    ├── src
    ├── dev
    ├── dist
    └── gulpfile.js
```

## 项目目录结构

```
project/                          // 项目目录
├── gulpfile.js                   // Gulp 工作流配置文件
│
├── src                           // 源文件目录，`gulp build_dev`阶段会监听此目录下的文件变动
│   ├── css                       // 存放 Less 文件的目录，只有 style-*.less 的文件名会被编译
│   │   └── lib/
│   │   │   ├── lib-reset.less
│   │   │   ├── lib-mixins.less
│   │   │   └── lib-rem.less
│   │   └── style-index.less        // CSS 编译出口文件
│   │ 
│   ├── html
│   ├── media                     // 存放如 bgm.mp3 媒体文件
│   ├── img                       // 存放背景图等无需合并雪碧图处理的图片
│   └── slice                     // 切片图片素材，将会进行雪碧图合并，同名 @2x 图片也会合并
│       ├── icon-shake.png
│       └── icon-shake@2x.png
│
├── dev                           // 开发目录，由 `gulp build_dev` 任务生成
│   ├── css
│   ├── html
│   ├── media
│   ├── img
│   └── slice                     // 开发阶段，仅从 src/slice 拷贝至此，不做合并雪碧图处理
│
└── dist                          // 生产目录，由 `gulp build_dist` 任务生成
    ├── css
    ├── html
    ├── media
    ├── img
    └── sprite                    // 将 /src/slice 合并雪碧图，根据 /css 文件名，命名为 style-*.png 
        ├── style-index.png
        └── style-index@2x.png
```

## 配置文件 .tmtworkflowrc
> .tmtworkflowrc
> 配置文件为隐藏文件，位于工作流根目录，可存放配置信息或开启相关功能，
> 详见WiKi。如：FTP 配置信息、开启 WebP功能，开启 REM 支持等。

```
{
  // FTP 发布配置
  "ftp": {
    "host": "xx.xx.xx.xx",
    "port": "8021",
    "user": "tmt",
    "pass": "password",
    "remotePath": "remotePath",         // 默认上传至根目录，此属性可指定子目录路径
    "includeHtml": true                 // FTP 上传时是否包含 .html 文件
  },

  // 浏览器自动刷新
  "livereload": {
     "available": true,                 // 开启
     "port": 8080,
     "startPath": "html/TmTIndex.html"  // 启动时自动打开的路径
  },

  // 插件功能

  // 路径相对于 tasks/plugins 目录
  "plugins": {
    "build_devAfter": ["TmTIndex"],     // build_dev 任务执行完成后，自动执行
    "build_distAfter": [],              // build_dist 任务执行完成后，自动执行
    "ftpAfter": ["ftp"]                 // ftp 任务执行完成后，自动执行
  },

  "lazyDir": ["../slice"],              // gulp-lazyImageCSS 启用目录

  "supportWebp": false,                 // 开启 WebP 解决方案

  "supportREM": false,                  // 开启 REM 适配方案，自动转换 px -> rem

  "supportChanged": false,              // 开启 只编译有变动的文件

  "reversion": false                    // 开启 新文件名 md5 功能
}
```
## 任务说明
> 注1：./src 为源文件(开发目录)，/dev 和 /dist 目录为流程自动生成的临时目录。
> 注2：FTP 和 zip 任务执行后会自动删除 /dist 目录。

### 1. 开发任务 gulp build_dev
按照目录结构创建好项目后，执行 gulp build_dev 生成开发文件位于 /dev，包含以下过程
- 完成 ejs -> html 和 less -> css 编译
- 自动监听文件改动，触发浏览器刷新
注：浏览器刷新功能可在 .tmtworkflowrc 中进行配置
### 2. 生产任务 gulp build_dist
开发完成后，执行 gulp build_dist 生成最终文件到 /dist 目录，包含以下过程：
- LESS/EJS 编译
- CSS/JS/IMG 压缩合并
- slice 图片合并成雪碧图
- 文件添加版本号
- WebP 图片支持
执行后 Demo 预览：project/dist/html/index.html
### 3. FTP 部署 gulp ftp
依赖于 生产任务，执行后，会先执行 gulp build_dist ，然后将其生成的 /dist 目录上传至 .tmtworkflowrc 指定的 FTP 服务器。
### 4. 打包任务 gulp zip
将 gulp build_dist 生成 dist 目录压缩成 zip 格式。

## 使用预览
> 推荐配合 WebStorm 等编辑器的 Gulp 任务管理器 使用，体验更佳。
> 也可配合桌面工具：WeFlow，无需安装环境依赖，获得可视化的操作体验。

## 其它说明
> tmt-workflow具有良好的定制性和扩展性，用户可针对自身团队的具体需求，
> 参看以下文档进行定制：

- 任务的动态加载机制（高级）
- 自定义任务（高级）
- 自定义插件（高级)