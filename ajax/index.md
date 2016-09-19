# ajax通信

```javascript
window.onload = function(){
    //初始化xhr对象
    var xhr = null;
    //兼容性
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //初始化
    xhr.open('get','./index.php',true);
    //回调函数
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                //成功
                var data = xhr.responseText;
            }
        }
    }
    xhr.send(null);
}
```

```javascript
window.onload = function(){
    //第一步创建xhr对象
    var xhr = null;
    //标准浏览器
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        //IE早期浏览器
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //准备发送请求
    //第三个参数为同步还是异步{false}
    //encodeURIComponet(username)编码
    xhr.open('get','/index.php?',true);
    //执行发送动作
    xhr.send(null); //兼容性问题 添加null
    //第四步：指定一些回调函数
    xhr.onreadystatechange = function(){
        //0:表示XMLHttpRequest对象创建完成
        //1:初始化完成,发送请求已准备好，还没有开始发送
        //2:已经发送完成
        //3:服务器已经返回了数据,等待解析
        //4:已经解析完成
        var readyState = xhr.readyState;
        console.log(readyState);

        if(readyState == 4){
            //200 完成
            //404 未找到
            //503 服务器错误
            var status = xhr.status;
            if(status == 200){
                //json字符串
                var text = xhr.responseText;
                //xml格式
                var xml = xhr.responseXML;
            }
        }
    }
}
```


```javascript
//用DOM解析XML
xml.getElementByTagName('book');

//获取节点的文本内容
function getNodeText(node){
    if(window.ActiveXObject){//IE
        return node.text;
    }else{//标准浏览器
        if(node.nodeType == 1){
            return node.textContent;
        }
    }
}
```

```javascript
//json 字符串转json
var jsonStr = '{"name":"三国","category":"文学"}';
var jsonObj = JSON.parse(jsonStr);
console.log(jsonObj);

//json转字符串 
var jsonstr2 = JSON.stringify(jsonOBJ);
console.log(jsonstr2);

//字符串 主要是安全性不好 不推荐使用
eval("("+jsonStr2+")");
```


```javascript
var xhr = null;
//推荐这样写 不会停止运行
try{
    xhr = new XMLHttpRequest();
    //如果出错 则执行catch的代码

    //下面代码不执行
    // throw new Error('error');
}catch(e){
    console.log(e);
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

xhr.open('get','');

xhr.send(null);

xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var data = JSON.parse(this.responseText);
    }
}

```

```javascript
function ajax(config){
    //config{data:{},dataType:'xml/json',type:'get/post',url:'',asyn:ture/false,success:function(){}}
    //第一步 创建xhr对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //第二步 准备发送前的一些配置参数
    var type = data.type == 'get' ? 'get' : 'post';
    var url = '';
    if(data.url){
        url = data.url;
        if(type == 'get'){
            url += data + "&_t" + new Date().getTime();
        }
    }
    var flag = data.asyn == 'true'?'true':'false';
    xhr.open(tyep,url,flag);
    //第三步 执行发送的动作
    if(type == 'get'){
        //get有缓存问题 不会重新发送请求
        xhr.send(null);
    }else{
        xhr.setRequestHeader("Content-type","application-x-www-form-urlencoded");
        xhr.send(data);
    }
    
    //第四步 指定回调函数
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(typeof data.success == 'function'){
                    var d = data.dataType == 'xml'?xhr.responseXML:xhr.responseText;
                    data.success(d);
                }
            }else{
                if(typeof data.failure == 'function'){
                    data.failure();
                }
            }
        }
    }
}

```


# jquery ajax语法

```javascript
$.ajax({
    url:'./index.php',
    type:'post',
    dataType:'html',
    data:{username:'username'},
    success:function(data){
        console.log(data);
    },
    error:function(){
        console.log('请求失败');
    }
});
```

```javascript
type = 'html'; //html文本
type = 'script'; //javascript
type = 'text'; //文本
type = 'json'; //json
type = 'xml'; //xml
```


```
1: 预解析 -- 把所有的函数定义提前，所有的变量声明提前，变量的赋值不提前
2：执行-- 从上到下执行
    ajax 中的回调函数，事件中的函数需要处罚执行

```

# 跨域

```javascript
//浏览器不允许ajax跨域获取数据
//可以通过script标签src属性进行跨域实现
//php 返回：$callback."(".json_encode($arr).")";

```


# jquery jsonp
```javascript
var dataType:'jsonp',
//处理方法
var jsonpCallback:'callback'
```



# artTemplate-3.0 性能卓越的js模板引擎

```html
<!--模板ID-->
<script id="weatherId" type="text/html">
{{if weather}}
    {{each weather as value}}
        <div>
            <span>日期：{{value.date}}</span>
            <ul>
                <li>白天天气：{{value.info.day[1]}}</li>
                <li>白天天气：{{value.info.day[2]}}</li>
                <li>白天天气：{{value.info.day[3]}}</li>
                <li>白天天气：{{value.info.day[4]}}</li>
            </ul>
            <ul>
                <li>夜间天气：{{value.info.night[1]}}</li>
                <li>夜间天气：{{value.info.night[2]}}</li>
                <li>夜间天气：{{value.info.night[3]}}</li>
                <li>夜间天气：{{value.info.night[4]}}</li>
            </ul>
        </div>
    {{/each}}
{{/if}}
</script>
```

