## 缓冲（buffer）模块

- js起初就是为浏览器而设计的，所以能很好的处理unicode编码的字符串，但不能很好的处理二进制数据。这是Node.js的一个问题，因为Node.js旨在网络上发送和接收经常是以二进制格式传输的数据。比如：

```
 - 通过TCP连接发送和接收数据；
 - 从图像或者压缩文件读取二进制数据；
 - 从文件系统读写数据；
 - 处理来自网络的二进制数据流
```

- 而Buffer模块为Node.js带来了一种存储原始数据的方法，于是可以再js的上下文中使用二进制数据。每当需要在Node.js中处理I/O操作中移动的数据时，就有可能使用Buffer模块。

## 类：Buffer
- Buffer 类是一个全局变量类型，用来直接处理2进制数据的。 它能够使用多种方式构建。
- 原始数据保存在 Buffer 类的实例中。一个 Buffer 实例类似于一个整数数组
- 1.new Buffer(size):分配一个新的 buffer 大小是 size 的8位字节. 
- 2.new Buffer(array):分配一个新的 buffer 使用一个8位字节 array 数组. 
- 3.new Buffer(str, [encoding]):encoding String类型 - 使用什么编码方式，参数可选.
- 4.类方法: Buffer.isEncoding(encoding):如果给定的编码 encoding 是有效的，返回 true，否则返回 false。 
- 5.类方法: Buffer.isBuffer(obj):测试这个 obj 是否是一个 Buffer. 返回Boolean
- 6.类方法: Buffer.concat(list, [totalLength])：list {Array}数组类型，Buffer数组，用于被连接。totalLength {Number}类型 上述Buffer数组的所有Buffer的总大小。

```javascript
var bin = new Buffer([ 0x48, 0x65, 0x6c, 0x6c, 0x6c ]);
bin[0]; // => 0x48;
var str = bin.toString('utf-8'); // => "hello"
var buffer = new Buffer(8);//创建一个分配了8个字节内存的缓冲区
console.log(buffer.write('a','utf8'));//输出1
```

- 复制缓冲区
```javascript
buffer.copy(bufferToCopyTo)
```

```javascript
var buffer1 = new Buffer(8);
buffer1.write('nice to meet u','utf8');
var buffer2 = new Buffer(8);
buffer1.copy(buffer2);
console.log(buffer2.toString());//nice to meet u
```

```javascript
var fs = require('fs');
var stream = fs.ReadStream('classmates.txt');
stream.setEncoding('utf8');
stream.on('data', function (chunk) {
    console.log('read some data')
});
stream.on('close', function () {
    console.log('all the data is read')
});
```

```javascript
var fs = require('fs');
var readableStream = fs.ReadStream('classmates.txt');
var writableStream = fs.writeStream('names.txt');
readableStream.setEncoding('utf8');
readableStream.on('data', function (chunk) {
    writableStream.write(chunk);
});
readableStream.on('close', function () {
    writableStream.end();
});
```

```javascript
readable.setEncoding(encoding)：返回: this

readable.resume()：同上。该方法让可读流继续触发 data 事件。 

readable.pause()：同上。该方法会使一个处于流动模式的流停止触发 data 事件，切换到非流动模式，并让后续可用数据留在内部缓冲区中。 
```


```javascript
//1.writable.write(chunk, [encoding], [callback]):

chunk {String | Buffer} 要写入的数据
encoding {String} 编码，假如 chunk 是一个字符串
callback {Function} 数据块写入后的回调
返回: {Boolean} 如果数据已被全部处理则 true。
```

```javascript
//2.writable.cork():强行滞留所有写入。 
```

```javascript
//3.writable.end([chunk], [encoding], [callback])

chunk {String | Buffer} 可选，要写入的数据
encoding {String} 编码，假如 chunk 是一个字符串
callback {Function} 可选，流结束后的回调
```

```javascript
http.createServer(function (req, res) {
  res.write('hello, ');
  res.end('world!');
  // 现在不允许继续写入了
});
```


```html
<video id="really-cool-video" class="video-js vjs-default-skin" controls
 preload="auto" width="640" height="264" poster="really-cool-video-poster.jpg"
 data-setup='{}'>
  <source src="really-cool-video.mp4" type="video/mp4">
  <source src="really-cool-video.webm" type="video/webm">
  <p class="vjs-no-js">
    To view this video please enable JavaScript, and consider upgrading to a web browser
    that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
  </p>
</video>
<script>
var player = videojs('really-cool-video', { /* Options */ }, function() {
  console.log('Good to go!');

  this.play(); // if you don't trust autoplay for some reason

  // How about an event listener?
  this.on('ended', function() {
    console.log('awww...over so soon?');
  });
});
</script>
```

