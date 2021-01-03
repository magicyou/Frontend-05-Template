# 学习笔记

## HTML 定义
* HTML继承与XML与SGML的基础

## HTML 语法
#### 合法元素

* ELement: <tagname>...</tagname>
* Text: text
* Comment: <!-- comments -->
* DocumentType: <!Doctype html>
* ProcessingInstruction: <?a 1?>
* CDATA: <![CDATA[ ]]>


## 语义化标签
* 代码结构清晰，方便阅读，有利于团队合作开发。
* 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以语义的方式来渲染网页。
* 有利于搜索引擎优化（SEO）。

nav,article, dfn, samp, main, header, section, strong, em, figure, figcaption ...

#### strong, em  区别

* em：为斜体， 表示强调， 和语气相关，重音啥的；
* strong： 为黑体， 粗体强调标签，强调，表示内容的重要性；

## 浏览器API

#### 导航类操作
* 对于节点的操作
  * parentNode： 返回某节点的父节点
  * childNodes： 返回节点的子节点集合，以 NodeList 对象
  * firstChild： 返回被选节点的第一个子节点
  * lastChild：返回被选节点的最后一个子节点
  * nextSibling： 返回某个元素之后紧跟的节点（处于同一树层级中）
  * previousSibling： 返回同一树层级中指定节点的前一个节点，被返回的节点以 Node 对象的形式返回

* 对于元素的操作
  * parentElement： 返回指定元素的父元素
  * children： 返回元素的子元素的集合，是一个 HTMLCollection 对象
  * firstElementChild： 返回指定的父元素的第一个子元素
  * lastElementChild：返回指定的父元素的最后一个子元素
  * nextElementSibling： 返回指定元素之后的下一个兄弟元素（相同节点树层中的下一个元素节点）
  * previousElementSibling：返回指定元素的前一个兄弟元素（相同节点树层中的前一个元素节点）

#### 修改操作
* appendChild： 插入到最后节点
* insetBefore：插入到具体节点前
* removeChild：无法移除自身，只能在父级上去操作
* replaceChild：将某个子节点替换为另一个

### 高级操作
* compareDocumentPosition 是一个用于比较两个节点中关系的函数。
* contains 检查一个节点是否包含另一个节点的函数
* isEqualNode 检查两个节点是否完全相同。
* isSameNode 检查两个节点是否是同一个节点，实际上在JavaScript 中可以用“===”。
* cloneNode 复制一个节点，如果传入参数 true，则会连同子元素 做深拷贝。


### Range API

* 创建Range
```
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
var range = document.getSelection().getRangeAt(0)
```
* 其他的一些便捷方式
  * range.setStartBefore
  * range.setEndBefore
  * range.setStartAfter
  * range.setEndAfter
  * range.selectNode
  * range.selectNodeContents

* 能做什么
  * var fragment = range.extractContents()
  * range.insertNode(document.createTextNode("aaa"))

#### 例子：把一个元素所有的子元素逆序：12345 变成 54321

```
 let element = document.getElementById("a");
  function reverseChildren(element) {
    let range = new Range();
    range.selectNodeContents(element);

    let fragment = range.extractContents();
    var l = fragment.childNodes.length;
    while(l-- > 0) {
      fragment.appendChild(fragment.childNodes[l])
    }
    element.appendChild(fragment);
  }
  reverseChildren(element)
```

