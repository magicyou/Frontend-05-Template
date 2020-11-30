学习笔记

javascript 数据类型

* Number
    IEEE 754 Double Float
    * Sign(1) Exponent(11) Fraction(52)
* String
    1. ASCII, Unicode 字符集
    2. UTF编码方式
* Boolean
* Object
* Null
    已定义，单值为空
* Undefined
    为被定义 
* Symbol 

## Javascript 原型链

javascript 支持原型机制，当我们去找一个对象的属性的时候，如果它自身不包含属性，他就会往原型上找，入轨它的原型的原型不是空的话，那么她还会继续往它的原型的原型上找，这个就形成一个链式的行为，成为原型链。

## Javascript 中特殊行为的对象
1. Array：Array 的 length 属性根据最大的下标自动发生变化。
2. Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
3. String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
4. Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
5. 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
6. 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
7. bind 后的 function：跟原来的函数相关联。
