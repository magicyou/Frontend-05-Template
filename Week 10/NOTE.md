# 学习笔记

## 排版

* 抽离排版样式flex等
    * 处理flexDirection和wrap相关的属性。
    把weight, height, left, right, top, bottom的属性抽象成main cross相关的属性。

* 计算主轴的方向
    * 找出所有flex元素
    * 把主轴方向的剩余尺寸按比例分配给这些元素
    * 若剩余的空间为负数，所有flex 元素为0，等比例压缩剩余元素

* 计算交叉轴方向
    * 根据每一行中最大元素尺寸计算行高
    * 根据行高flex-align和item-align,确定元素具体位置

## 绘制
* 绘制1
    * 绘制需要依赖一个图形环境
    * 采用npm 包 images
    * 绘制在一个viewport 上进行
    * 与绘制相关的属性： background-color,border, background-image等
* 绘制2
    * 递归调用子元素的绘制方法完成dom树的绘制
    * 忽略一些不需要绘制的节点
    * 实际浏览器中，文字的绘制是难点，需要依赖字体库，这里忽略
    * 实际浏览器中，会对一些图层做compositing，这里忽略