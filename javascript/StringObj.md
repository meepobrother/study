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
var str = 'hello world';
console.log(str.slice(3)); //lo world
console.log(str.substring(3)); //lo world
console.log(str.substr(3)); //lo world
console.log(str.slice(3,7)); // lo w
console.log(str.substring(3,7)); //lo w
console.log(str.substr(3,7)); //lo worl

console.log(str.slice(-3));
```

### substr()

### substring()

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
