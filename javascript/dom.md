# DOM

# 节点层次
- DOM 可以将任何HTML或XML文档描绘成一个由多层节点构成的结构。节点之间的关系构成了层次。
- 文档元素是文档的最外层元素，文档中的其他元素都包含在文档元素中。
- HTML元素通过元素节点表示，特性(attribute)通过特性节点表示，文档类型通过文档类型节点表示，而注释则通过注释节点表示。


## Node类型

### nodeName和nodeValue属性

1. nodeType 节点的类型
2. nodeName 元素的标签名

### 节点关系

1. nodeValue 始终为Null
2. childNodes 保存NodeList对象，用于保存一组有序的节点，可以通过位置来访问这些节点。DOM结构的变化会自动反映到NodeList对象中。有生命的，有呼吸的对象。可以通过[]或者()访问保存在NodeList中的节点。
3. 通过Array.prototype.slice()方法可以将NodeList转换为数组。
4. parentNode 文档树中的父节点。
5. 通过使用列表中每个节点的previousSibling和nextSibling属性，可以访问同一列表中的其他节点。
6. 父节点的firstChild和lastChild属性分别指向其childNodes列表中的第一个和最后一个节点。
7. hasChildNodes() 在节点包含一或多个子节点的情况下返回true.
8. ownerDocument 该属性指向表示整个文档的文档节点。

### 节点操作

1. appendChild() 用于向childNodes列表的末尾添加一个节点。完成后，返回新增的节点。
2. insertBefore() 这个方法接收两个参数：要插入的节点和作为参照的节点。
3. replaceChild() 这个方法接收两个参数：要插入的节点和要替换的节点。
4. removeChild() 这个方法接收一个参数，即要移除的节点。被移除的节点将成为方法的返回值。
5. 注意：并不是所有的节点都有子节点，如果在不支持子节点的节点上调用了这些方法，将会导致错误发生。

### 其他操作

1. cloneNode() 参数是否执行深复制，如果为true则为深复制，如果为false则执行浅复制，浅复制只复制节点本身。
2. cloneNode 不会复制javascript属性。
3. normalize() 处理文档树中的文本节点。如果找到了空文本节点，则删除它；如果找到相邻的文本节点，则将他们合并为一个文本节点。

## Document类型

- 表示文档类型。是HTMLDocument继承自Document类型的一个实例，表示整个HTML页面。

1. nodeType = 9;
2. nodeName = '#document';
3. nodeValue 的值为null;
4. parentNode 的值为null;
5. ownerDocument的值为null;
6. 其子节点可能是一个DocumentType最多一个，Element最多一个、ProcessingInstruction或Comment.
7. Document 类型可以表示HTML页面或者其他基于XML的文档。

### 文档的子节点

1. documentElement属性，该属性始终指向HTML页面中的<html>元素。
2. childNodes列表访问文档元素。
3. body 指向<body>元素
4. DocumentType 取得对<!DOCTYPE>的引用。

### 文档信息

1. title 包含着<title>元素中的文本，显示在浏览器窗口的标题栏或标签页上。通过这个属性可以获取和修改当前页面的标题。
2. URL 包含页面完整地URL
3. domain 只包含页面的域名，可以将每个页面的document.domain设置为相同的值，这些页面就可以相互访问对方包含的javascript对象。
4. referrer 保存着链接到当前页面的那个URL

### 查找元素

1. getElementById() 根据ID获取元素，如不存在返回null,id值严格匹配，区分大小写。
2. getElementByTagName()  根据标签名获取元素，返回包含0或多个元素的NodeList。返回一个HTMLCollection对象，作为一个动态集合。
3. HTMLCollection对象有一个方法，namedItem()，使用这个方法可以通过元素的name特性取得集合中的项。
4. HTMLCollection还支持[name]访问。数值索引会自动调用item()、对字符串索引就会调用nodeItem();
5. HTML getElementByTagName()不区分大小写，XML区分大小写。
6. getElementByName() 只有HTMLDocument对象才有的方法，根据name获取带有给定name的所有元素

### 特殊集合

1. document.anchors 包含文档中所有带name特性的<a>元素。
2. document.forms 包含文档中的所有<form>元素
3. document.images 包含文档中的所有<img>元素
4. document.links 包含文档中的所有带href特性的<a>元素

### 文档写入

1. write() 原样写入
2. writeln() 在末尾加换行
3. open()
4. close()

## Element类型
- Element类型用于表现XML或HMLT元素，提供了对元素标签名、子节点及特性的访问。

1. nodeType = 1;
2. nodeName 的值为元素的标签名
3. nodeValue 为null
4. parentNode 可能为Document或Element
5. 其子节点可能是Element、Text、Comment、ProcessingInstruction、CDATASection或EntityReference。
6. 在HTML中，标签名始终都以全部大写表示；XML中标签名始终与源代码中的保持一致。

### html元素

- 所有的HTML元素都由HTMLElement类型表示。

1. id 元素在文档中的唯一标识符。
2. title 有关元素的附加说明信息，一般通过工具提示条显示出来。
3. lang 元素内容的语言代码，很少使用。
4. dir 语言的方向，值为ltr从左到右，rtl从右到左
5. className 与元素的class特性对应，即为元素制定的css类。

### 取得特性
- 每个元素都有一个或多个特性，这些特性的用途是给出相应元素或其内容的附加信息。

1. getAttribute() 方法可以取得自定义特性的值。特性名称不区分大小写，自定义特性应该加上data-前缀以便验证。style和onclick例外，
2. setAttribute() 两个参数：要设置的特姓名和值。
3. removeAttribute() 移除特性

### attributes 属性

1. attributes 属性中包含一系列节点，每个节点的ndoeName就是特性的名称，而节点的nodeValue就是特性的值。
2. getNamedItem(name) 返回nodeName属性等于name的节点。
3. removeNamedItem(name) 在列表中移除nodeName属性等于name的节点。
4. setNamedItem(name) 向列表中添加节点，以节点的nodeName属性为索引。
5. item(pos) 返回位于数字pos位置处的节点

### 创建元素

1. document.createElement() 方法可以创建新元素。

### 元素的子节点

## Text类型
- 文本节点由Text类型表示，包含的是可以照字面解释的纯文本内容。

1. nodeType = 3
2. ndoeName = '#text';
3. ndoeValue 的值为节点所包含的文本。
4. parentNode 是一个Element
5. 不支持子节点。
6. appendData(text)
7. deleteData(offset,count)
8. insertData(offset,text)
9. replaceData(offset,count,text);
10. splitText(offset);
11. substringData(offset,count);

### 创建文本节点


## Comment类型

## CDATASection类型

## DocumentFragment类型

## Attr类型

# DOM操作技术

## 动态脚本

## 动态样式

## 操作表格

## 使用NodeList

## 

