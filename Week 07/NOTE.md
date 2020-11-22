学习笔记

## js 运算符

* 算数运算符优先级：
    括号 > 乘除 > 加减

### Expressions
* Member
    * a.b  成员选择，取出的并不是一个值，是一个引用
    * a[b]
    * foo`string`
    * super.b  super 是 Class 构造函数内关键字
    * super['b']
    * new.target
    * new Foo()
* New
    * new Foo
    Example: 
        new a() 
        new new a()
    结论： 点括号的 new 要比不带括号的运算优先级高

### reference

* Object
* Key

### Expression
* Call
    * foo()
    * super()
    * foo()['b']
    * foo().b
    * foo()`abc`

* Left Handside & Right Handside

    Example：
    * a.b = c; √
    * a + b = c; ×
        'a + b' 是 right handside，没有资格放在等号左边

    * update 自增自减
        * a++
        * a--
        * --a
        * ++a

    * Unary 单目运算
        * delete a.b
        * void foo()
        * typeof a
        * +a
        * -a
        * ~ a (整数按位取反)
        * !a 
        * await a 

    * Exponental
        * ** (右结合)

    * Multiplicative
        * \* / %
    * Additive
        * \+, -
    * Shift
        * <<, >>, >>>

    * Relationship
        * <, >, <=, >=, instanceof, in

* Equality
    * ==
    * !=
    * ===
    * !==
* Bitwise
    * &, ^, |
* Logic

    * && (短路原则)
    * || (短路原则)
* Conditional（三目运算符）
    * ? : (短路原则)


## 隐式转换

* undefined与null相等，但不恒等（===）
* 一个是number一个是string时，会尝试将string转换为number
* 隐式转换将boolean转换为number，0或1
* 隐式转换将Object转换成number或string，取决于另外一个对比量的类型
* 对于0、空字符串的判断，建议使用 “===” 。
* “==”会对不同类型值进行类型转换再判断，“===”则不会。它会先判断两边的值类型，类型不匹配时直接为false。

## UnBoxing 拆箱转换
__解释：将引用类型对象转换为对应的值类型对象__

* ToPremitive
* toString vs valueOf
* Symbol.toPremitive

Example: var o = { toString() { return '2'}, valueOf() { return 1 }, Symbol.toPrimitive { return 3 } }

console.log('x' + o) +一般先调valueOf，然后是toString。只要有[Symbol.toPrimitive]，就一定会是[Symbol.toPrimitive]

var x = {};x[o] = 1; console.log(x + o) o作为属性名的时候，优先调用toString方法。只要有[Symbol.toPrimitive]，就一定会是[Symbol.toPrimitive]

## Boxing 装箱转换
__解释： 把基本数据类型转化为对应的引用数据类型的操作__

每个基础类型都有一个对应的包装类，比如Number就是一个构造器，这个Number即可以使用new去调用，又可以当做一个方法直接调用，直接调用会返回一个值，如果使用new 去调用他就会返回一个 Object，我们就成这个Number对象和这个值存在一个装箱关系


## js 执行粒度

宏任务   就是传给 Javascript 引擎的任务
微任务   就是 JavaScript 引擎内部的任务，只有 Promise 会产生微任务
