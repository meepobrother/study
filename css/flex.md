# 横向布局
```css
.container {
    display: flex;
}
```

# 垂直布局

```css
.container {
    display: flex;
    flex-direction: column;
}
```

# 沿主轴居中
```css
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
```

# 交叉轴
```css
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
```



# flex.css

## install 

```javascript
git clone https://github.com/lzxb/flex.css.git
npm install flex.css --save
```


# use

```
<!--
  将dist目录下的css文件引入到你的页面中，根据你的需要引入
  flex.css 使用flex属性匹配
  data-flex.css 使用data-flex属性匹配（React使用）
  如果使用了webpack打包，npm安装后，并且配置了ES6编译器的话，
  flex 属性匹配可以直接使用：
    import 'flex.css';
  data-flex 属性匹配可以直接使用(react使用)
    import 'flex.css/dist/data-flex.css';
 -->
<!-- flex属性匹配，简单的子元素居中例子： -->
<div flex="main:center cross:center" style="width:500px; height: 500px; background: #108423">
    <div style="background: #fff">看看我是不是居中的</div>
</div>

<!-- data-flex属性匹配，简单的子元素居中例子： -->
<div data-flex="main:center cross:center" style="width:500px; height: 500px; background: #f1d722">
    <div style="background: #fff">看看我是不是居中的</div>
</div>
```

## flex属性大全

```javascript
dir：主轴方向
    top：从上到下
    right：从右到左
    bottom：从上到下
    left：从左到右（默认）
main：主轴对齐方式
    right：从右到左
    left：从左到右（默认）
    justify：两端对齐
    center：居中对齐
cross：交叉轴对齐方式
    top：从上到下
    bottom：从上到下
    baseline：跟随内容高度对齐
    center：居中对齐
    stretch：高度并排铺满（默认）
box：子元素设置
    mean：子元素平分空间
    first：第一个子元素不要多余空间，其他子元素平分多余空间
    last：最后一个子元素不要多余空间，其他子元素平分多余空间
    justify：两端第一个元素不要多余空间，其他子元素平分多余空间
```


## flex-box属性说明
```
取值范围(0-10)，单独设置子元素多余空间的如何分配，设置为0，则子元素不占用多余的多余空间
多余空间分配 = 当前flex-box值/子元素的flex-box值相加之和
```