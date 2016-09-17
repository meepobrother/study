以打字形式展示placeholder的插件
========================================================

# install

```javascript
npm install superplaceholder
bower install superplaceholder
```

# 使用

```javascript
superplaceholder({
    el: <input 标签元素>,
    sentences: < 需要展示的placeholder 内容 >,
    options: {} // 配置项
});
```

# 基础版
```javascript
superplaceholder({
    el: document.querySelector('input'),
    sentences: [ '内容1', '内容2']
});
```

# 配置项

```javascript
superplaceholder({
    el: document.querySelector('input'),
    sentences: [ '内容1', '内容2'],
    options: {
        // 每个字出现的时间间隔
        letterDelay: 100, // milliseconds
        // 两个句子之间的时间间隔
        sentenceDelay: 1000,
        // true 为获得焦点开始，false 为自动开始
        startOnFocus: true,
        // 循环句子
        loop: false,
        // 随机出现第一个出现的句子
        shuffle: false,
        // 是否显示光标，默认显示
        showCursor: true,
        // 光标样式
        cursor: '|'
    }
});
```

