# node.js 文件系统
> node.js 提供一组标准的文件操作API。

```javascript
var fs = require('fs');
```

# 异步和同步

```javascript
fs.readFile(); //异步 性能更高速度更快，而且没有堵塞
fs.readFileSync(); //同步
```

```javascript
var fs = require('fs');

//异步读取
fs.readFile('input.txt',function(err,data){
    if(err) console.log(err);
    console.log("异步读取:"+data.toString());
});

//同步读取 
var data = fs.readFileSync('input.txt');
console.log('同步读取:'+ data.toString());

console.log('程序执行完毕');
```

# 打开文件

```javascript
fs.open(path,flags[,model],callback)
path - 文件路径
flags - 文件打开的行为
mode - 设置文件模式（权限），文件创建默认权限为066(可读可写)
callback - 回调函数，带两个参数 callback(err,fd)
```

```javascript
var fs = require('fs');
//异步打开文件
console.log('准备打开文件');
fs.open('input.txt','r+',function(err,fd){
    if(err) console.error(err);
    console.log('文件打开成功');
});
```

# 获取文件信息

```javascript
fs.stat(path,callback)
```


```javascript
var fs = require('fs');

fs.stat('./',function(err,stats){
    console.log(stats.isFile()); //是否文件
    console.log(stats.isDirectory()); //是否目录
});
```

# 写入文件

```javascript
//如果文件存在，该方法写入的内容会覆盖旧文件内容
fs.writeFile(filename,data[,options],callback);
```

```javascript
var fs = require('fs');
console.log('准备写入文件');

fs.writeFile('input.txt','我是通过写入的文件内容',function(err){
    if(err) console.error(err);
    console.log('写入成功');
});

fs.readFile('input.txt',function(err,data){
    if(err){console.error(err)}
    console.log('文件内容：'+data.toString());
});
```

#　读取文件

``` javascript
fs.read(fd,buffer,offset,length,pasition,callback)
fd //通过fs.open方法返回的文件描述符
buffer //数据写入的缓冲区
offset //缓冲区希尔的写入偏移量
length //要从文件中读取的字节数
position //文件读取的起始位置
callback //回调函数，三个参数err,bytesRead,buffer,err为错误信息,bytesRead表示读取的自己数,buffer缓冲区对象
```

```javascript
var fs = require('fs');
var buf = new buffer(1024);
console.log('准备打开已存在的文件');
fs.open('input.txt','r+',function(err,rd){
    if(err) console.log(err);
    fs.read(fd,buf,0,buf.length,0,function(err,bytes){
        console.log(bytes + '字节被读取');
        if(types > 0){
            console.log(buf.slice(0,bytes).toString());
        }
    })
});
```

# 关闭文件

```javascript
fs.close(fd,callback);
```

```javascript
var fs = require('fs');
var buf = new Buffer();

fs.open('index.txt','r+',function(err,fd){
    fs.read(fd,0,buf.length,0,function(err,bytes){
        if(err){
            throw err;
        }
        if(bytes>0){
            console.log(buf.slice(0,bytes).toString());
        }
        fs.close(fd,function(err){
            if(err){
                throw err;
            }
            console.log('文件关闭成功');
        });
    });
});
```

# 截取文件

```javascript
fs.ftruncate(fd,len,callback)
```

# 删除文件

```javascript
fs.unlink(path,callback)
```

# 创建目录

```javascript
fs.mkdir(path[,mode],callback);
```

# 读取目录

```javascript
fs.readdir(path,callback);
```

```javascript
fs.readdir('/tmp/',function(err,files){
    files.forEach(function(file){
        console.log(file);
    });
});
```

# 删除目录
```javascript
fs.rmdir(path,callback);
```


# 总结
```
fs.rename(oldPath,newPath,callback)
fs.ftruncate(fd,len,callback)
fs.ftruncateSync(fd,len)
fs.truncate(path,len,callback)
fs.truncatesSync(path,len)
fs.truncate(path,len,callback)
fs.truncateSync(path,len)
fs.chown(path,uid,gid,callback)
fs.chownSync(path,uid,gid)
fs.fchown(fd,uid,gid,callback)
fs.fchownSync(fd,uid,gid)
...
```