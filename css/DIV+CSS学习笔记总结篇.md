# 梳理知识架构
- 负责内容的HTML
- 负责外观的css（层叠样式表）
- 负责行为的js
- ps切图

# 滚动效果
```html
<marquee direction="down" loop="4" onmouseover=this.stop() onmouseout=this.start()></marquee>
```

# 透明属性
```css
{    
    opacity:0.5;
    filter:alpha(opacity：50);/*0-100*/
    -moz-opacity:0.5;    /*取值0-1*/-->针对早起版本的火狐兼容问题的解决
}
```

# DIV命名规范

## 网页内容类
```html

标题: title
摘要: summary
箭头： arrow
商标： label
网站标志： logo
转角/圆角：corner
横幅广告： banner
子菜单： subMenu
搜索： search
搜索框： searchBox
登录： login
登录条：loginbar
工具条： toolbar
下拉： drop
标签页： tab
当前的： current
列表： list
滚动： scroll
服务： service
提示信息： msg
热点：hot
新闻： news
小技巧： tips
下载： download
栏目标题： title
热点： hot
加入：joinus
注册： regsiter
指南： guide
友情链接： friendlink
状态： status
版权： copyright
按钮： btn
合作伙伴： partner
投票： vote
左右中：left  right  center
/* Footer */
/* End Footer */

```

## 页面结构

```html
容器: container
页头：header
内容：content/container
页面主体：main
页尾：footer
导航：nav
侧栏：sidebar
栏目：column
页面外围控制整体布局宽度：wrapper
左右中：left right center
```

## 导航

```html
导航：nav
主导航：mainbav
子导航：subnav
顶导航：topnav
边导航：sidebar
左导航：leftsidebar
右导航：rightsidebar
菜单：menu
子菜单：submenu
标题: title
摘要: summary
```

## 功能

```html
标志：logo
广告：banner
登陆：login
登录条：loginbar
注册：regsiter
搜索：search
功能区：shop
标题：title
加入：joinus
状态：status
按钮：btn
滚动：scroll
标签页：tab
文章列表：list
提示信息：msg
当前的:current
小技巧：tips
图标: icon
注释：note
指南：guild
服务：service
热点：hot
新闻：news
下载：download
投票：vote
合作伙伴：partner
友情链接：link
版权：copyright
```


```html
display
list-style
position
float
clear

width
height
margin
padding
border
background

color
font
text-decoration
text-align
vertical-align
white-space
other text
content
```