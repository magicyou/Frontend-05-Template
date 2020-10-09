学习笔记
TicTacToe
1. 使用'{}'创建作用域；
2. Object.create();
    Object.create()方法接受两个参数:Object.create(obj,propertiesObject) ;
    ```
    obj: 一个对象，应该是新创建的对象的原型。
    propertiesObject：可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。
    ```
