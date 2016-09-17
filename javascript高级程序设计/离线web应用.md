# 离线应用与客户端存储

##内容
- 进行离线检测
- 使用离线缓存
- 在浏览器中保留数据

### 离线检测
```javascript
if(navigator.onLine){
    //在线
}else{
    //离线
}
```

```javascript
EventUtil.addHandler(window,"online",function(){
    //在线
});
EventUtil.addHandler(window,"offline",function(){
    //离线
});
```

### 应用缓存
- HTML的应用缓存(appcache)

```html
<!--这个文件的MIME类型必须是text/cache-manifest-->
<html manifest="/offline.manifest">
```

- applicationCache 对象

```javascript
applicationCache.status //表示应用缓存的当前状态
applicationCache.update();//检查描述文件是否更新 触发checking事件
//如果触发了updateready事件，说明新版本的应用缓存已经可用
EventUtil.addHandler(applicationCache,"updateready",function(){
    applicationCache.swapCache();//启用新应用缓存
});
```


### 数据存储
 
#### Cookie
- HTTP Cookie, 以name为名称，以value为值；
- cookie 在性质上是绑定在特定域名下的。
- cookie构成
    + 名称: 不区分大小写
    + 值: 存储的值
    + 域: cookie对于哪个域是有效的
    + 路径: 对于制定域中的那个路径，应该向服务器发送cookie
    + 失效时间： 表示cookie何时应该被删除的时间戳
    + 安全标志：
- javascript中的cookie
```javascript
document.cookie = "name=Nicholas";

document.cookie = encodeURIComponent("name") + "=" +
                    encodeURIComponent("Nicholas");
```


```javascript
var CookieUtil = {
    get:function(name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if(cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";",cookieStart);
            if(cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
        }
        return cookieValue;
    }

    set:fucntion(name,value,expires,path,domain,secure){
        var cookieText = encodeURIComponent(name) + "=" +
                            encodeURIComponent(value);
        if(expires instanceof Date){
            cookieText += ";expires="+expires.toGMTString();
        }
        if(path){
            cookieText += ";path="+path;
        }
        if(domain){
            cookieText += ";domain="+domain;
        }
        if(secure){
            cookieText += ";secure";
        }
        document.cookie = cookieText;
    }

    unset:function(name,path,domain,secure){
        this.set(name,"",new Date(0),path,domain,secure);
    }
}
```


#### 子cookie
```javascript

```

#### cookie的思考
- 一定不要在cookie中存储重要和敏感的数据。cookie数据并非存储在一个安全环境中。其中包含的任何数据都可以被他人访问。所以不要在cookie中存储诸如信用卡号或者个人地址之类的数据。

```javascript
function getName(n){
    var arr = ['秦明','刘唐','杰宝','青烟','周通']

    var len = arr.length;
    if(n<len){
        return arr[n];
    }else{
        return false;
    }
}
```

### IE用户数据


### Web存储机制
- 提供一种在cookie之外存储会话数据的途径
- 提供一种存储大量可以跨会话存在的数据的机制

#### Storage类型
- Storage 类型提供最大的存储空间来存储名值对儿。
    + clear() //删除所有值；
    + getItem(name) //根据制定的名字name获取对应的值
    + key(index) //获得index位置处的值得名字
    + removeItem(name) //删除由name制定的名值儿
    + setItem(name,value);//制定的name设置一个对应的值。
- Storage 类型只能存储字符串。非字符串的数据在存储之前会被转换成字符串。

#### sessionStorage 对象
- sessionStorage 对象存储特定于某个会话的数据，也就是该数据只保存到浏览器关闭；
- 跨页面刷新而存在
- 崩溃重启后依然可用
- 绑定于某个服务器会话。不能本地运行。
- 数据只能由最初给对象存储数据的页面访问到。所以对多页面应用有限制。

```javascript
//使用方法存储数据
sessionStorage.setItem('name','');
//使用苏醒存储数据
sessionStorage.book = '';
```

- Firefox和WebKit实现了同步写入，IE异步写入!
```javascript
//IE 8
sessionStorage.begin();
sessionStorage.name = '';
sessionStorage.book = '';
sessionStorage.commit();
```


```javascript
//使用方法读取数据
var name = sessionStorage.getItem('name');
//使用属性读取数据
var book = sessionStorage.book;
```


```javascript
for(var i = 0,len = sessionStorage.length;i<len;i++){
    var key = sessionStorage.key(i);//根据位置，获取名称
    var value = sessionStorage.getItem(key);//获取值

    console.log(key +"="+ value);
}
```


```javascript
for(var key in sessionStorage){
    var value = sessionStorage.getItem(key);
    console.log(key + '='+ value);
}
```


```javascript
//使用delete删除一个值
delete sessionStorage.name;
//使用方法 删除一个值
sessionStorage.removeItem('book');
```

```javascript
sessionStorage 对象应该主要用于针对会话的小段数据的存储。
```


#### globalStorage对象
- 跨越会话存储数据
- 要使用globalStorage，首先要指定那些域可以访问该数据。可以通过方括号标记使用属性来实现。

```javascript
//保存数据
globalStorage['wrox.com'].name = '';
//获取数据
var name = globalStorage['wrox.com'].name;
```

```javascript
//存储数据，任何人都可以访问--不推荐
globalStorage[''].name = '';
//存储数据，可以让任何以.net结尾的域名访问--不推荐
globalStorage['net'].name = '';
```

- 避免使用宽泛访问的数据存储，以防止出现潜在的安全问题。
- 使用globalStorage时一定要指定一个域名。
- 对globalStorage空间的访问，是依据发起请求的页面的域名、协议和端口号来限制的。

```javascript
globalStorage['www.wrox.com'].name = '';
globalStorage['www.wrox.com'].book = '';
globalStorage['www.wrox.com'].removeItem('name');
var book = globalStorage['www.wrox.com'].getItem('book');
```


```javascript
//推荐
globalStorage[location.host].name = '';
var book = globalStorage[location.host].getItem('name');
```

- globalStorage非常适合在客户端存储文件或长期保存用户偏好设置。

#### localStorage对象
```javascript
//使用方法存储数据
localStorage.setItem('name','');
//使用属性存储数据
localStorage.book = '';
//使用属性获取数据
var name = localStorage.name;
//使用方法获取数据
var book = localStorage.getItem('book');
```

- 数据保存到javascri删除或者用户清理浏览器缓存。

```javascript
function getLocalStorage(){
    if(typeof localStorage == "object"){
        return localStorage;
    }else if(typeof globalStorage == "object"){
        return globalStorage[location.host];
    }else{
        throw new Error("Local storage not available.");
    }
}
//兼容模式写法
var storage = getLocalStorage();
```

- storage事件
```javascript
EventUtil.addHandler(document,"storage",function(event){
    //event
    //event.domain 域名
    //event.key 键名
    //event.newValue 新值
    //event.oldValue 老值
});
```

- 大小限制 2.5M - 5M 

### IndexedDB
- 在浏览器中保存结构化数据的一种数据库。
- 异步执行

```javascript
//兼容性写法
var indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB;
```

#### 数据库
- IndexedDb 最大的特色是使用对象保存数据,而不是使用表来保存数据。一个IndexedDB数据库，就是一组位于相同命名空间下的对象的集合。

```javascript
var request, database;
//返回一个IDBRequest对象
request = indexedDb.open('admin');
request.onerror = function(event){
    //打开错误
}
request.onsuccess = function(event){
    //打开成功
    database = event.target.result;
}
```

```javascript
if(database.version != '1.0'){
    request = database.setVersion('1.0');
    request.onerror = function(){
        console.log('setVersion error');
    }
    request.onsuccess = function(){
        console.log('setValue success:' + database.version);
    }
}else{
    cosnole.log('database version is ' + database.version);
}
```

#### 对象和存储空间
- 在创建对象存储空间时，必须制定一个唯一的键。
- keyPath 就是空间中将要保存的对象的一个属性。而这个属性将作为存储空间的键来使用。
```javascript
var store = db.createObjectStore("users",{keyPath:"username"});
```
- add()、put()方法向其中添加数据。add()添加新值，put()更新原有的值。
```javascript
//users中保存着一批用户对象
var i = 0,len = users.length;
while(i<len){
    store.add(users[i++]);
}
```

```javascript
var i = 0,
    request,
    requests = [],
    len = users.length;
while(i < len){
    request = store.add(users[i++]);
    request.onerror = function(){
        //处理错误
    }
    request.onsuccess = function(){
        //处理成功
    }
    requests.push(request);
}
```

#### 事物
- 在数据库对象上调用transaction()方法可以创建事务。任何时候，只要想读取或修改数据，都要通过事务来组织所有操作。
```javascript
//如果没有参数，就只能通过事务来读取数据库中保存的对象。
var transaction = db.transaction();
```

```javascript
var transaction = db.transaction("users");
var transaction = db.transaction(["users","anotherStore"]);
```

```javascript
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
var transaction = db.transaction("users",IDBTransaction.READ_WRITE);

var request = transaction.objectStore("users").get("007");
request.onerror = function(event){
    console.log('error to get !');
}
request.onsuccess = function(event){
    var result = event.target.result;
    console.log('success to get ');
}

transaction.onerror = function(event){
    //事务取消
}

transaction.oncomplete = function(event){
    //成功
}
```

#### 使用游标查询
- 所有事务可以直接通过已知的键检索单个对象。而需要检索多个对象的情况下，则需要在事务内部创建游标。游标就是一指向结果集的指针。与传统数据库查询不同，游标并不提前收集结果。游标指针会指向结果中的第一项，在接到查找下一项的指令时，才会指向下一项。

```javascript
var store = db.transaction('users').objectStore('users'),
    request = store.openCursor();
request.onsuccess = function(event){
    //处理成功
}
request.onerror = function(event){
    //处理失败
    var cursor = event.target.result;
    if(cursor){//必要的检查
        //cursor.value 是对象，需要JSON.stringify
        console.log(cursor.key + ":" + JSON.stringify(cursor.value));
    }
}
```

```javascript
//update
request.onsuccess = function(event){
    var cursor = event.target.result,
        value,
        updateRequest;
    if(cursor){ //必要检查
        if(cursor.key == 'foo'){
            value = cursor.value;//获取当前值
            value.password = 'magic!';//更新

            updateRequest = cursor.update(value);//保存到数据库
            updateRequest.onsuccess = function(){
                //成功
            }
            updateRequest.onerror = function(){
                //失败
            }
        }
    }
}
```

```javascript
//delete
request.onsuccess = fucntion(event){
    var cursor = event.target.result,
        value,
        deleteRequest;
    if(cursor){
        if(cursor.key == 'foo'){
            deleteRequest = cursor.delete();//删除当前选项
            deleteRequest.onsuccess = function(){
                //处理成功
            }
            deleteRequest.onerror = function(){
                //处理失败
            }
        }
    }
}
```

- 当前事务没有修改对象存储空间的权限，update()和delete()会抛出错误！
- 默认情况下，每个游标只发起一次请求。要想发起另一次请求，必须调用下面的一个方法
    + continue(key) //移动到结果集的下一项 
    + advance(count) //向前移动count指定的项数

```javascript
request.onsuccess = function(event){
    var cursor = event.target.result;
    if(cursor){
        console.log(cursor.key + '=' + JSON.stringify(cursor.value));
        cursor.continue(); //移动到下一项
    }else{
        console.log('done!');
    }
}
```

#### 值范围

```javascript
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
//只取键007
var onlyRange = IDBKeyRange.only("007");
//从键为007的对象开始，然后可以移动到最后
var lowerRange = IDBKeyRange.lowerBound('007');
//从键为007的对象的下一个对象开始，然后可以移动到最后
var lowerRange = IDBKeyRange.lowerBound('007',true);
//到ace对象为止
var upperRange = IDBKeyRange.upperBound('ace');
//从头开始，到键为ace的对象的上一个对象为止
var upperRange = IDBKeyRange.upperBound('ace',true);

var boundRange = IDBKeyRange.bound('007','ace');
var boundRange = IDBKeyRange.bound('007','ace',true);
var boundRange = IDBKeyRange.bound('007','ace',true,true);
var boundRange = IDBKeyRange.bound('007','ace',false,true);
```


```javascript
var store = db.transaction("users").objectStore("users"),
    range = IDBKeyRange.bound('007','ace'),
    request = store.openCursor(range);

request.onsuccess = function(envent){
    var cursor = event.target.result;
    if(cursor){
        console.log(cursor.key +'='+ JSON.stringify(cursor.value));
        cursor.continue();//移动到下一项
    }else{
        console.log('done');
    }
}
```

#### 设定游标方向

```javascript
var IDBCursor = window.IDBCursor || window.webkitIDBCursor;

var store = db.transaction("users").objectStore("users"),
    request = store.openCursor(null,IDBCursor.NEXT_NO_DUPLICATE);//从第一个开始到结束，跳过重复
    request = store.openCursor(null,IDBCursor.PREV);
```

#### 索引

```javascript
var store = db.transaction("users").objectStore("users"),
    index = store.createIndex("username","username",{unique:false});//username 不唯一 unique为false
```


```javascript
var store = db.transaction("users").objectStore("users"),
    index = store.index('username');
    request = index.openCursor();

    request.onsuccess(event){
        //处理成功
    }
```


```javascript
var store = db.transaction("users").objectStore("users"),
    index = store.index("username"),
    request = index.openKeyCursor();

    request.onsuccess = function(event){
        //处理成功
        //event.result.key 索引键 event.result.value 主键
    }
```

```javascript
var store = db.transaction("users").objectStore("user"),
    index = store.index("usernaem"),
    request = index.get("007");

    request.onsuccess = function(event){
        //成功
    }
    request.onerror = function(event){
        //失败
    }
```

```javascript
var store = db.transaction("users").objectStore("suers"),
    index = store.index("username"),
    request = index.getKey("007");

    request.onsuccess = function(event){
        //处理成功 event.result.key 保存索引 event.result.value 保存主键
    }
    request.onerror = function(event){
        //处理失败
    }
```


```javascript
var store = db.transaction("users").objectStore("users"),
    indexNames = store.indexNames,
    index,
    i = 0,
    len = indexNames.length;

while(i < len){
    index = store.index(indexNames[i++]);
    console.log(index.name +'='+index.keyPath+'='+index.unique);
}
```


```javascript
//删除索引
var store = db.transaction("users").objectStore("user");
    sotre.deleteIndex("useranme");
```


#### 并发问题

```javascript
var request , database;

request = indexedDB.open('admin');
request.onsuccess = function(event){
    database = event.target.result;
    //当版本变化时关闭数据库
    database.onversionchange = function(){
        database.close();
    }
}
```

#### 限制
- 只能同源页面操作
- 不能跨域共享信息
- 大小：5-50M
- 如果超过这个用额，请求用户允许。
- firefox 不允许本地文件访问IndexedDB,chrome没有限制。

## 步骤
- 第一步：openDatabase方法：创建一个访问数据库的对象。
- 第二步：使用第一步创建的数据库访问对象来执行transaction方法，通过此方法可以设置一个开启事务成功的事件响应方法，在事件响应方法中可以执行SQL.
- 第三步：通过executeSql方法执行查询，当然查询可以是：CRUD。

```javascript
//Demo：获取或者创建一个数据库，如果数据库不存在那么创建之
var dataBase = openDatabase("student", "1.0", "学生表", 1024 * 1024, function () { });
```


```javascript
ts.executeSql(sqlQuery,[value1,value2..],dataHandler,errorHandler)
```

```html
function initDatabase() {
    var db = getCurrentDb();//初始化数据库
    if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
    db.transaction(function (trans) {//启动一个事务，并设置回调函数
        //执行创建表的Sql脚本
        trans.executeSql("create table if not exists Demo(uName text null,title text null,words text null)", [], function (trans, result) {
        }, function (trans, message) {//消息的回调函数alert(message);});
    }, function (trans, result) {
    }, function (trans, message) {
    });
}
$(function () {//页面加载完成后绑定页面按钮的点击事件
    initDatabase();
    $("#btnSave").click(function () {
        var txtName = $("#txtName").val();
        var txtTitle = $("#txtTitle").val();
        var txtWords = $("#txtWords").val();
        var db = getCurrentDb();
        //执行sql脚本，插入数据
        db.transaction(function (trans) {
            trans.executeSql("insert into Demo(uName,title,words) values(?,?,?) ", [txtName, txtTitle, txtWords], function (ts, data) {
            }, function (ts, message) {
                alert(message);
            });
        });
        showAllTheData();
    });
});
function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    //如果数据库不存在那么创建之
    var db = openDatabase("myDb", "1.0", "it's to save demo data!", 1024 * 1024); ;
    return db;
}
//显示所有数据库中的数据到页面上去
function showAllTheData() {
    $("#tblData").empty();
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("select * from Demo ", [], function (ts, data) {
            if (data) {
                for (var i = 0; i < data.rows.length; i++) {
                    appendDataToTable(data.rows.item(i));//获取某行数据的json对象
                }
            }
        }, function (ts, message) {alert(message);var tst = message;});
    });
}
function appendDataToTable(data) {//将数据展示到表格里面
    //uName,title,words
    var txtName = data.uName;
    var txtTitle = data.title;
    var words = data.words;
    var strHtml = "";
    strHtml += "<tr>";
    strHtml += "<td>"+txtName+"</td>";
    strHtml += "<td>" + txtTitle + "</td>";
    strHtml += "<td>" + words + "</td>";
    strHtml += "</tr>";
    $("#tblData").append(strHtml);
}
```


```javascript
openDatabase(DbName,DBVersion,DBDescribe,DBSize,Callback());
```


```javascript
var db;//全局变量
//创建数据库
function createDB(){
    //参数：数据库名称，版本号，数据库描述，大小（单位字节），回调函数
    db=openDatabase('Student','1.0','StuManage',2*1024*1024,function(){
    $$("result").innerHTML="成功创建数据库";
});
var sql="create table if not exists student"+"(sno unique,name text,sex text,score int)";
db.transaction(
        function(tx){
           //执行创建表语句
            tx.executeSql(sql);
        },
        function(){ 
           //调用函数
            Status_Handle("事务执行出错");
        },
        function(){
            Status_Handle("事务执行成功");
        })
}
```

```html
var sql="select * from student where sno<>?";
var sno="这里是输入的学号";
if(sno!=null){
    sql="select * from student where sno=?"
}
db.transaction(
    function(tx){
        tx.executeSql(sql,[sno],function(tx,rs){
            for（var i=0;i
                var name=rs.rows.item(i).name;
            }
        }
    }
);

```


```javascript
var dataBase = openDatabase("student", "1.0", "学生表", 1024 * 1024, function (){ });
if (!dataBase) {
    alert("数据库创建失败！");
} else {
    alert("数据库创建成功！");
}
``
