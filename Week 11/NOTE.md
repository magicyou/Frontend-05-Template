学习笔记
## CSS 规则

* at-rules
    * @charset
    * @import
    * @media
    * @page (用于在打印文档时修改某些CSS属性)
    * @counter-style (它让开发者可以自定义counter的样式)
    ```
        @counter-style thumbs {
            system: cyclic;
            symbols: "\1F44D";
            suffix: " ";
        }

        ul {
            list-style: thumbs;
        }
    ```
    * @keyframes (指定动画名称和动画效果)
    * @fontface
    * @support (用于检测浏览器是否支持CSS的某个属性)
    * @namespace (用来定义使用在CSS样式表中的XML命名空间的@规则)

* rule
    * selector 
        * selector_group
        * selector 
            * \> 
            * \<sp>
            * \+
            * \-
        * simple_selector 
            * type
            * \*
            * \.
            * \#
            * []
            * :
            * ::
            * :not()
        
    * Delaration
        * Key 
            * variables
            * properties
        * value
            * calc
            * number
            * length
            * ...


## 选择器语法

* 复合选择器
    * <简单选择器> <简单选择器> <简单选择器>
    * * 或者 div 必须写在前面 

* 复杂选择器
    * <复合选择器> <sp> <复合选择器>
    * <复合选择器> ">" <复合选择器>
    * <复合选择器> "~" <复合选择器>
    * <复合选择器> "+" <复合选择器>
    * <复合选择器> "||" <复合选择器>

## css 伪元素
* first-line
    * font 元素
    * color 系列
    * background 系列
    * word-spacing
    * letter-spacing
    * text-transform
    * line-height

* first-letter
    * font 系列
    * color 系列
    * background 系列 
    * text-decoration
    * text-transform
    * letter-spacing
    * word-spacing
    * line-height
    * float
    * vertical-align
    * 盒模型系列： margin,padding,border
