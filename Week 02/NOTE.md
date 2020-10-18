## 学习笔记

### Array 对象
Array 对象用于在单个的变量中存储多个值。
创建 Array 对象的语法：
```
new Array();
new Array(size);
new Array(element0, element1, ..., elementn);
```

* 参数 size 是期望的数组元素个数。返回的数组，length 字段将被设为 size 的值。
* 参数 element ..., elementn 是参数列表。当使用这些参数来调用构造函数 Array() 时，新创建的数组的元素就会被初始化为这些值。它的 length 字段也会被设置为参数的个数。

### Array.fill() 函数的用法
ES6为Array增加了fill()函数，使用制定的元素填充数组，其实就是用默认内容初始化数组。
该函数有三个参数。

```
arr.fill(value, start, end)
```
* value：填充值。
* start：填充起始位置，可以省略。
* end：填充结束位置，可以省略，实际结束位置是end-1。


### classList

classList 属性返回元素的类名，作为 DOMTokenList 对象。
该属性用于在元素中添加，移除及切换 CSS 类。
classList 属性是只读的，但你可以使用 add() 和 remove() 方法修改它。


### 深度优先和广度优先

#### 深度优先(DFS （Depth First Search）)
    
    深度优先遍历则是先搜索一个结点的所有子孙结点，再去搜索这个结点的兄弟结点。
    stack -> push pop  
#### 广度优先(BFS （Breadth First Search）)

    广度优先遍历是先搜索所有兄弟和堂兄弟结点再搜索子孙结点。
    queue -> push unshift