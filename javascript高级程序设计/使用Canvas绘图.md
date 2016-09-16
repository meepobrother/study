# 使用Canvas绘图

## 本章内容
- 理解<canvas>元素
- 绘制简单的2D图形
- 使用WebGL绘制3D图形

## 基本用法
```javascript
var drawing = document.getElementById('drawing');
//console.log(drawing.getContext);
if(drawing.getContext){
    var context = drawing.getContext("2d");
    var imgURI = drawing.toDataURL('image/png');
    var img = document.createElement('img');
    img.src = imgURI;
    document.body.appendChild(img);
}
```


## 2D上下文

### 填充和描边
```javascript
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext("2d");
    context.strokeStyle = 'red';
    context.fillStyle = '#0000ff';
}
```


### 绘制矩形
```javascript
context.fillRect(10,10,50,50);
context.strokeRect(30,30,50,50);
context.clearRect(40,40,10,10);
```


### 绘制路径
```javascript
//开始路径
context.beginPath();
//绘制外圆
context.arc(100,100,99,0,2 * Math.PI,false);
//绘制内圆
context.moveTo(194,100);
context.arc(100,100,94,0,2 * Math.PI,false);

//绘制分针
context.moveTo(100,100);
context.lineTo(100,15);

//绘制分针
context.moveTo(100,100);
context.lineTo(35,100);

//描边路径
context.stroke();
```

### 绘制文本
```javascript
context.font = "bold 14px Arial";
context.textAlign = "center";
context.textBaseline = "middle";
context.fillText("12",100,20);

//起点对齐
context.textAlign = "start";
context.fillText("12",100,40);

//终点对齐
context.textAlign = "end";
context.fillText("12",100,60);
```


