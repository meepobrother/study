## 
```shell
sass mixins，require Sass ~> 3.3.0
```

## install 
```javascript
npm i mixins-sass --save
```

## clearfix

```javascript
@include clearfix;
```

## float

```javascript
@include float(left);
```

## text-overflow

```
@mixin text-overflow($line: 1, $substract: 0);
```

## animation

```
@include animation(slideUp 900ms ease both) {
    0% {
        transform: translate3d(0, -200px, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}
```

## placeholder
```
// scss
@include placeholder() {
    ...
}
// css
::-webkit-input-placeholder {
    ...
}
::-moz-placeholder {
    ...
}
:-ms-input-placeholder {
   ...
}
```

## rem

```
@include rem('padding', '10px 5px 5px 10px', true, '16px');
```

## opacity

```

```

## arrow

```
// @mixin arrow($width, $border-width, $direction, $color, $background-color, $position: relative)
// 箭头宽度  线宽 方向 颜色 背景颜色（一般和父级背景同色）

@include arrow(10px, 1px, 'bottom', '#00f', '#fff');
```


## triangle
```
// @mixin triangle($width, $height, $color: #000, $direction: down)

@include triangle(10px, 5px);
```

## center

```
// horizontal,vertical,both

@include center(both);
```

## media
```
// min-width max-width

@mixin screen($min, $max)
@mixin max-screen($width)
@mixin min-screen($width)
@mixin hidpi($ratio: 1.3)
@mixin retina-image($filename, $retina-filename, $ratio: 1.3, $background-size: 100%)
@mixin iphone6($orientation: all)
@mixin iphone6plus($orientation: all)
@mixin iphone5($orientation: all)
@mixin iphone4($orientation: all)
@mixin ipad($orientation: all)
@mixin ipad-mini($orientation: all)
@mixin ipad-retina($orientation: all)

@include retina-image(test.png, test@2.png test@3.png, 2 3);
```

## box-sizing
```
html {
    @include box-sizing(border-box);
}
```


## touch-scroll

```
body {
    @include touch-scroll;
}
// css
body {
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}
```

## font

```
body {
    @include font-hei;
}
```

## str-split
```
@function str-split($string, $delimiter: " ")
```

## str-repeat

```
@function str-repeat($string, $times)
```

## str-replace
```
@function str-replace($string, $search, $replace: "")
```

# list

## first

```
@function first($list)
```

## last

```
返回列表最后一项

@function last($list)
```

## prepend

```
@function prepend($list, $value)
```

## insert-nth

```
@function insert-nth($list, $index, $value)
```

## replace
```
@function replace($list, $old-value, $new-value, $recursive: false)
```

## replace-nth

```
@function replace-nth($list, $index, $value)
```

## remove

```
删除列表某个元素 $recursive 是否删除所有

@function remove($list, $value, $recursive: false)
```

# remove-nth
```
删除列表指定位置元素

@function remove-nth($list, $index)
```

# slice

```
截取列表中的一部分

@function slice($list, $start: 1, $end: length($list))
```

# to-string

```
列表变成字符串，$glue为连接符，$is-nested是否是嵌套的列表

@function to-string($list, $glue: '', $is-nested: false)
```