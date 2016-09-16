# hotkeys
-捕获键盘输入和输入组合键，是一个强大的JavaScript库。它没有依赖。尝试按下你的键盘，下面的按钮将高亮显示
## 用法
```html
<script type="text/javascript" src="hotkeys.js"></script>
```

## install
```javascript
$ bower install hotkeysjs
$ npm install hotkeys-js

$ gulp build && gulp min && gulp map
```


## 定义快捷键

```javascript
    hotkeys('a', function(event,handler){
      //event.srcElement: input 
      //event.target: input
      if(event.target === "input"){
          alert('you pressed a!')
      }
      alert('you pressed a!') 
    });

  hotkeys('ctrl+a,ctrl+b,r,f', function(event,handler){
      switch(handler.key){
          case "ctrl+a":alert('you pressed ctrl+a!');break;
          case "ctrl+b":alert('you pressed ctrl+b!');break;
          case "r":alert('you pressed r!');break;
          case "f":alert('you pressed f!');break;
      }
  });

  hotkeys('*','wcj', function(e){
      console.log('do something',e);
  });
```

# api参考
- 修改关键判断
```javascript
  hotkeys('*','wcj', function(e){
      if(hotkeys.shift) console.log('shift is pressed！');
      if(hotkeys.ctrl) console.log('shift is pressed! ');
      if(hotkeys.alt) console.log('shift is pressed! ');
  });
```

- 使用hotkeys.setScope设定范围。
```javascript
  // define shortcuts with a scope
  hotkeys('ctrl+o, ctrl+alt+enter', 'issues', function(){
      console.log('do something');
  });
  hotkeys('o, enter', 'files', function(){ 
      console.log('do something else');
  });
  
  // set the scope (only 'all' and 'issues' shortcuts will be honored)
  hotkeys.setScope('issues'); // default scope is 'all'

```

- 使用hotkeys.deleteScope删除设定范围。
```javascript
hotkeys.deleteScope('issues');
```

- 定义的快捷键，解除绑定可以使用它hotkeys.unbind.
```javascript
  // unbind 'a' handler
  hotkeys.unbind('a');

  // unbind a hotkeys only for a single scope
  // when no scope is specified it defaults to the current scope (hotkeys.getScope())
  hotkeys.unbind('o, enter', 'issues');
  hotkeys.unbind('o, enter', 'files');
```
- isPressed 查询其它键。例如，hotkeys.isPressed(77)如果是真M当前按下的键。
```javascript
  hotkeys('a', function(){
      console.log(hotkeys.isPressed("A")); //=> true
      console.log(hotkeys.isPressed(65)); //=> true
  });
```
- getPressedKeyCodes 返回当前按下的键盘码。
```javascript
  hotkeys('command+ctrl+shift+a', function(){
      console.log(hotkeys.getPressedKeyCodes()); //=> [67, 16, 17, 91, 65] 
  })
```
- INPUT SELECT TEXTAREA默认不处理他们。
- Hotkeys.filter它返回true设置热键发挥起作用,flase设置热键不起作用

```javascript
  hotkeys.filter = function(event){
    return true;
  }
  //How to add the filter to edit labels. <div contentEditable="true"></div>
  //"contentEditable" Older browsers that do not support drops
  hotkeys.filter = function(event) {
      var tagName = (event.target || event.srcElement).tagName;
      return !(tagName.isContentEditable || tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }
  
  hotkeys.filter = function(event){
      var tagName = (event.target || event.srcElement).tagName;
      hotkeys.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
      return true;
  }
```

- 放弃在hotkeys的全局变量
```javascript
  var k = hotkeys.noConflict();
  k('a', function() {
      console.log("do something")
  });
  
  hotkeys()
  // -->Uncaught TypeError: hotkeys is not a function(anonymous function) 
  // @ VM2170:2InjectedScript._evaluateOn 
  // @ VM2165:883InjectedScript._evaluateAndWrap 
  // @ VM2165:816InjectedScript.evaluate @ VM2165:682
```
- 支持的热键
```javascript
热键支持的修饰键： ⇧,shift,option,⌥,alt,ctrl,control,command, and⌘.
下面的特殊键，可用于快捷键： backspace,tab,clear,enter,return,esc,escape,space,up,down,left,right,home,end,pageup,pagedown,del,delete和f1~f19。
⌘Command()
⌃Control
⌥Option(alt)
⇧Shift
⇪Caps Lock(Capital)
fnDoes not support fn
↩︎return/Enter space
```
