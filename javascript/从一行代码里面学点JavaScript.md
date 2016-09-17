# 从一行代码里面学点JavaScript

## JavaScript的特点在于，要学习它的语法入门简简单，但是要精通使用它的方式却是一件不容易的事。
```javascript
//在你的Chrome浏览器的控制台中输入这段代码，你会发现不同HTML层都被使用不同的颜色添加了一个高亮的边框
[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})
```

## 选择页面中所有的元素
- $$函数是许多现代浏览器命令行API中的一个部分，它等价于 document.querySelectorAll，你可以将一个CSS选择器作为这个函数的参数，然后你就能够获得当前页面中所有匹配这个CSS选择器的元素列表。如果你在浏览器控制台以外的地方，你可以使用 document.querySelectorAll('*') 来代替 $$('*')

## 迭代所有的元素
- 在JavaScript中，有好几个类似于数组但是并不是数组的对象，除了前面的NodeLists，还有函数的参数集合arguments，在这里我们可以使用call或apply函数将函数的方法运用到这些对象上。
- 使用了[].forEach.call而不是Array.prototype.forEach.call

```javascript
function say(name) {
 console.log( this + ' ' + name );
}
say.call( 'hola', 'Mike' ); // 打印 'hola Mike'
// 你也可以将这种方法有用在arguments对象上 function example( arg1, arg2, arg3 ) { return Array.prototype.slice.call(arguments, 1); // Returns [arg2, arg3] }
```

## 为元素添加颜色
- 为了让元素都有一个漂亮的边框，我们在上面的代码中使用了CSS属性outline。outline属性位于CSS盒模型之外，因此它并不影响元素的属性或者元素在布局中的位置，这对于我们来说非常有用。这个属性和修改border属性非常类似，因此下面的代码应该不会很难理解：

```javascript
a.style.outline="1px solid #" + color;
~~(Math.random()*(1<<24))).toString(16)
```

- 我们首先要学会如何使用toString函数将一个十进制的数组转换为一个十六进制整数。这个函数可以接受一个参数，如果参数缺省，默认为十进制，但是你完全可以使用别的数组：
```javascript
(30).toString(); // "30"

(30).toString(10); // "30"

(30).toString(16); // "1e" 十六进制

(30).toString(2); // "11110" 二进制

(30).toString(36); // "u" 36是允许的最大参数值
```

- 除此之外，你可以使用parseInt函数将十六进制数字转换为十进制。

```javascript
parseInt("30"); // "30"

parseInt("30", 10); // "30"

parseInt("1e", 16); // "30"

parseInt("11110", 2); // "30"

parseInt("u", 36); // "30"

parseInt("ffffff", 16) == 16777215
```

```javascript
//0和16777216之间的数
Math.random()*(1<<24)
```

- 波浪操作符在JavaScript中被用来对一个变量进行取反
```javascript
var a = 12.34,b = -1231.8754,c = 3213.000001;
~~a == parseInt(a, 10); // true
~~b == parseInt(b, 10); // true
~~c == parseInt(c, 10); // true
```

```javascript
~~a == 0|a == parseInt(a, 10)
~~b == 0|b == parseInt(b, 10)
~~c == 0|c == parseInt(c, 10)
```

## 总结

- 作为一个程序员，我们应该在完成工作之后多问自己几遍为什么，还有没有更好更简洁的方法。