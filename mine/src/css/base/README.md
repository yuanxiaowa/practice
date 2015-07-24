# CSS

1. 为父元素设置 overflow:hidden | float:left|right 等可以清除浮动
1. 多个 inline-block 并排出现的空格为浏览器解析换行引起，使用浮动可以清除
1. inline 元素不能设置高度和宽度以及margin-top和margin-bottom，设置padding-top和padding-bottom会改变元素范围，但不会影响下面的元素位置
1. absolute 跟随性
1. attr可以取属性，如 `content:attr(data-index)`
1. absolute 拉伸(如：left+right)+尺寸(width:50%)+margin:auto 同时存在，具有居中效果
1. IE7下按钮文字越多，两侧留白越多，加上 `overflow:visible` 即可以解决
1. html/body默认滚动条均来自html
1. 滚动条占据容器的可用宽度或高度
1. overflow导致padding-bottom缺失(除了Chrome)
1. overflow设置x和y任何一个，另外一个则为auto
1. 	水平居中跳动问题修复
	- `html{overflow-y:scroll}` IE7,8
	- `padding-left: calc(100vw-100%)` IE9+
1. IOS原生滚动回调效果 `-webkit-overflow-scrolling: touch`
1. 多列布局：`.cell{display: table-cell;width: 2000px;*display:inline-block;*width: auto;}`
1. resize拉伸需要overflow不为visible
1. 	`overflow:auto|scroll|hidden` 可以让内部浮动无影响，解决margin-top穿透问题
	- 父元素设置可以清除子元素的浮动，解决子元素的margin-top穿透问题（虽然设置边框或padding也可以）
	- 实现多列布局(左边浮动，右边加上overflow)
1. text-overflow:ellipsis 需要overflow:hidden
1. 	overflow失效问题
	- 该元素介于定位上下文和定位元素(position)之间时候出现
	- 在定位元素和该元素(含自身)之间定义上下文，或是加上合法的tranform(最好在子元素上加，不然Chrome等不生效)
1. overflow+锚点定位可以实现选项卡效果，适合单页应用