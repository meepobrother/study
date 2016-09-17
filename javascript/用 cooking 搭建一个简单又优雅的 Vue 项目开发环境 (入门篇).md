# 用 cooking 搭建一个简单又优雅的 Vue 项目开发环境 (入门篇)
=========================================================
- 纯 webpack 搭建 Vue 项目确实需要许多配置去处理 vue 文件、CSS 预处理、静态资源、以及压缩、热替换等等内容。
- 其实很多时候这些 webpack 配置都可以标准化甚至封装起来，简化其配置。cooking 就是为我们做了这件事，有了它我们就可以很轻易搭建一个 Vue 项目的开发环境

## 创建一个空项目

```javascript
mkdir my-vue && cd my-vue && git init && npm init
```

## 安装 cooking
```javascript
npm i cooking -D # i 是 install 的简写，－D 是 --dev-save 的简写
```

## 如果访问 NPM 较慢的话
```javascript
npm i npminstall -g --registry=https://registry.npm.taobao.org
npminstall cooking -D
```

## 安装依赖
```javascript
├── UNMET PEER DEPENDENCY babel-core@^6.0.0
├── UNMET PEER DEPENDENCY babel-loader@^6.0.0
├── UNMET PEER DEPENDENCY css-loader@^0.24.0
├── UNMET PEER DEPENDENCY extract-text-webpack-plugin@^1.0.0 || ^2.0.0-beta
├── UNMET PEER DEPENDENCY file-loader@^0.9.0
├── UNMET PEER DEPENDENCY html-loader@^0.4.3
├── UNMET PEER DEPENDENCY html-webpack-plugin@^2.9.0
├── UNMET PEER DEPENDENCY json-loader@^0.5.4
├── UNMET PEER DEPENDENCY postcss@^5.1.0
├── UNMET PEER DEPENDENCY postcss-loader@^0.11.1
├── UNMET PEER DEPENDENCY style-loader@^0.13.1
├── UNMET PEER DEPENDENCY url-loader@^0.5.7
├── UNMET PEER DEPENDENCY webpack@^1.12.0 || ^2.1.0-beta
└── UNMET PEER DEPENDENCY webpack-dev-server@^1.14.0 || ^2.1.0-beta
```

## webpack 1 
```javascript
 npminstall babel-core babel-loader css-loader file-loader\
 postcss postcss-loader html-loader html-webpack-plugin json-loader\
 style-loader url-loader webpack@1 webpack-dev-server@1\
 extract-text-webpack-plugin@1 -D
```

## webpack 2
```javascript
 npminstall babel-core babel-loader css-loader file-loader\
 postcss postcss-loader html-loader html-webpack-plugin json-loader\
 style-loader url-loader webpack@beta webpack-dev-server@beta\
 extract-text-webpack-plugin@beta -D
```

## 开始写最简单的配置 cooking.conf.js

```javascript
// 引入 cooking 依赖
var cooking = require('cooking');

// 调用 set 方法传入自定义配置
cooking.set({
  entry: './src/index.js', // 指定入口文件
  dist: './dist', // 设置打包后的文件目录
  hash: true, // 打包的文件是否带 hash
  sourceMap: true // 是否带 sourceMap
});

// 生成 webpack 配置并导出
module.exports = cooking.resolve();
```

## babel 的配置文件 —— .babelrc

```javascript
npminstall babel-preset-es2015 -D

{
  "presets": ["es2015"],
  "comments": false
}
```

## src/index.js

```javascript
my-vue\
  src\
    index.js
  cooking.conf.js
  .babelrc
  package.json
```

## package.json

```javascript
{
  "scripts": {
    "cooking": "cooking"
  }
}
```

## 运行一下 cooking build。其中 -p 表示启动进度条。

```javascript
npm run cooking build -- -p
```

- cooking 能帮我们省去许多我们可以不用关心的可标准化的配置项，最终只需要简单的几行配置就完成同样的事情。

## 最基础的 Vue 项目的配置

```javascript
npm i vue@next -S
```

## 接下来我们在 src/index.js 文件里写下创建一个 Vue 实例的代码

```javascript
import Vue from 'vue'
import App from './app'

new Vue({
  el: '#app',
  render: h => h(App)
})
```

## 然后创建 src/App.vue 文件。

```html
<template>
  <div>
    <h1>Hello, {{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'cooking'
    }
  }
}
</script>
<style lang="css" scoped>
  h1 {
    color: red;
  }
</style>
```

## 接着在根目录下创建一个 HTML 模板文件，命名为 index.html。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

- 现在，我们需要搭建一个支持热替换、能处理 CSS 和 Vue 文件，并且能自动将打包的文件应用在 HTML 模板上的开发环境，来看看需要哪些配置。回到 cooking.conf.js 文件。

```javascript
var cooking = require('cooking');

cooking.set({
  entry: './src/index.js',
  dist: './dist',
  hash: true,
  sourceMap: true,
  template: './index.html', // 加载 index.html 模板
  devServer: { // 开启 webpack-dev-server
    port: 8888, // 端口为 8888
    publicPath: '/' // 开启 dev-server 时默认打包的资源文件路径是和 index.html 同级的
  },
  extends: ['vue2'] // 加载 cooking-vue2，自动配置 Vue 2.0 相关内容
});

module.exports = cooking.resolve();
```

## 只多了三行配置，当然内部做了很多事情。其中 cooking-vue2 是需要你单独安装的，执行下 npminstall cooking-vue2 -D 即可。如果你不安装会有错误提示。这时候我们开启动开发模式。

```javascript
npm run cooking watch
# 打开 http://localhost:8888 访问
```

## 增加 CSS 预处理

```javascript
{
  extends: ['vue2', 'sass']
}
```

```javascript
{
  postcss: [
    require('postcss-salad')
  ]
}
```

##  最后按照个人喜好更改配置

- 如果想提取 CSS 成单独的文件，或者要将公用文件提取出来（CommonChunk），亦或者想加入 eslint，在 cooking 里也是很简单就可做到，我们来大致补充一下，完成最终配置文件。

```javascript
var cooking = require('cooking');

cooking.set({
  entry: {
    app: './src/index.js',
    vendor: ['vue']
  },
  dist: './dist',
  clear: true, // 每次打包都清理掉 dist 目录
  hash: true,
  sourceMap: true,
  template: './index.html',
  devServer: { port: 8888, publicPath: '/' },
  postcss: [
    require('postcss-salad')
  ],
  extractCSS: true, // 提取 CSS 文件
  chunk: [
    'vendor', // entry 里定义的入口文件，也就是会将 vue 单独打包
    'manifest' // 这个并没有在 entry 里声明的会将所有公用部分打包，也就是 webpack runtime
  ],
  publicPath: '/dist/', // 打包后的资源文件相对于 url 的路径
  extends: ['vue2', 'lint'] // 安装 cooking-lint 并配置 '.eslintrc' 文件
});

module.exports = cooking.resolve();

```

## 最后改一下 package.json 里的 scripts，方便调用。
```javascript
"scripts": {
  "dev": "cooking watch",
  "dist": "cooking build -p"
}
```

## 结尾
- 至此，一个简单优雅的 Vue 项目开发环境就搭建完成了。不过，其实还不够好，为什么我们要手动创建项目？为什么要去手动安装这么多依赖？为什么每个项目都要安装一对同样的依赖？那么我们将会在下一篇文章教你用 cooking-cli 来进一步提升开发体验，今天就这。

