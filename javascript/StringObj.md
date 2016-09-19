# String 类型

```javascript
//new一个字符串对象
var stringObject = new String('Hello Wold');
```

## 属性

### length

```javascript
var str = "admin12345";
var len = str.length;
console.log(len); //10
```

## 方法

### chartAt(index)
- 返回字符串中给定位置的字符

```javascript
console.log(str.charAt(1)); //a
```

### chartCodeAt()
- 返回字符串中制定位置的字符码

```javascript
str.chartCodeAt(1);
```

### concat()
- 字符串拼接

```javascript
str.concat('!');
```


### slice()

```javascript
    
```

### substr()
> 长度

```javascript
String.substr(start,length);
```

### substring()
> 开始结尾

```javascript
// String.substring(start,end);

var str = "beijing@126.com";
var index = str.indexOf("@");
var username = str.substring(0,index);
var hostname = str.substring(index+1);

console.log(username+":"+hostname);
```

```javascript
var str = '立地太岁阮小二';
var res = str.substring(0,4);
console.log(res);
var res = str.substring(6,4);
console.log(res);
var res = str.substring(4,4);
console.log(res);
var res = str.substring(4);
console.log(res);
```

### indexOf()

### trim()

### toLowerCase()
- 全转为小写
```javascript
str.toLowerCase();
```
### toLocaleLowerCase()
- 针对地区

### toUpperCase() 
- 全转为大写
```javascript
str.toUpperCase();
console.log(str);
```

### toLocaleUpperCase()
- 针对地区

### match()

### search()

### replace()

### localeCompare()

# 判断合法

```javascript

var str = 'beijing.shagnhai.10,24,jpg';

function checkExtImage(str){
    var arr = ['jpg','gif','png'];
    var index = str.lastIndexOf('.');
    var ext = str.substr(index+1);
    var result = false;

    for(var i = 0,len = arr.length;i<len;i++){
        if(arr[i] == ext){
            result = true;//合法
        }else{
            result = false;
        }
    }
    return result;
}


var isimage = checkExtImage(str);
document.write(isimage ? '合法' : '非法');
```

# 字符串操作

```javascript
var str = "http://www.itcast.cn/index.php?i=1&c=2&d=3";

var index = str.indexOf('?');
str = str.substr(index + 1);
var arr = str.split('&');
for(var i=0,len = arr.length;i<len;i++){
    var par = arr[i].split('=');
}
```


# reverse() //数组元素倒序排列
# sort() // 按字符串排序

```javascript
var arr = [1,3,2,0];

function compare(value1,value2){
    if(value1 < value2){
        return -1;
    } else if(value1 > value2){
        return 1;
    } else {
        return 0;
    }
}

arr.sort(compare);
```

# 单词反转，首尾字母大写

```javascript
var str = 'BeijINg';
//转小写
str = str.toLowerCase();
//分割数组
var arr = str.split('');
//反转
arr.reverse();
//首字大写
arr[0] = arr[0].toUpperCase();
//尾字大写
arr[arr.length-1] = arr[arr.length-1].toUpperCase();
//数组转字符串
var str2 = arr.join('');

//输出结果
console.log(str2);
```
