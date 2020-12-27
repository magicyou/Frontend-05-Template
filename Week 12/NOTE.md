# 学习笔记

## FC
FC的含义就是Fomatting Context。它是CSS2.1规范中的一个概念

### BFC
BFC（Block Formatting Context）叫做“块级格式化上下文”。BFC的布局规则例如以下：
1. 内部的盒子会在垂直方向，一个个地放置；
2. 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的上下margin会发生重叠；
3. 每一个元素的左边，与包括的盒子的左边相接触，即使存在浮动也是如此；
4. BFC的区域不会与float重叠；
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此；
6. 计算BFC的高度时，浮动元素也參与计算。

### IFC
Inline Formatting Context 内敛格式化上下文。

IFC的line box（线框高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响）

IFC的inline box一般左右都贴紧整个IFC，但是因为float元素二扰乱。float元素会位于IFC与line box之间，使得line box宽度缩短。同个IFC下的多个line box高度会不同。IFC中不可能有块级元素，当插入块级元素时（如p中插入div）会产生两个匿名快与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。


## CSS 排版

### 术语 Block
* Block Container： 里面有BFC的
   * 能容纳正常流的盒子里面就有BFC
* Block-level Box: 外面有BFC对的
* Block Box = Block Container + Block-levelBox： 里外都有BFC的

### Block Container
可以看出主要是一些display 的属性值
* block
* inline-block
* table-cell
* flex item
* grid cell
* table-caption

### Block-level Box 和 Inline-level Box
  ##### block-level
  * display: block
  * display: flex
  * display: table
  * display: grid
  * ....
  
### inline-level
  * display: inline-block
  * display: inline-flex
  * display: inline-table
  * display: inline-grid
  * ....

### 设立 BFC
* 具有除了float:none的其他浮动属性
* 定位为absolute或者fixed
* dispaly为block、inline-block、table-cell、table-caption、flex、inline-flex
* overflow不为visible（除非该值已经传播到视口，入html body会将overflow的值传播到视口，故此情况下，该属性不能建立BFC）

### BFC 合并
* block box && overflow: visible
   * BFC 合并与float
   * BFC 合并与边距折叠

## Flex 排版

* 收集盒进行
* 计算盒在株洲方向的排布
* 计算在交叉轴方向的排布

## CSS 动画与绘制

### 动画 animation
* animation-name 时间曲线
* animation-duration 动画的时长
* animation-timing-function 动画的时间曲线
* animation-delay 动画开始前的延迟
* animation-iteration-count 动画的播放次数
* animation-direction 动画的方向


### 绘制
 * 几何图形
   * border
   * box-shadow
   * border-radius
 * 文字
   * font 
   * text-decoration
 * 位图
   * background-image
  