# JavaScript
-	获取样式(内联样式，若无则为空)
	- `ele.style.display`
	- `ele.style.cssDisplay` | `ele.style.styleDisplay`

-	获取样式(最终样式)
	- ele.currentStyle.display | window.getComputedStyle(ele, null).display

-	body/html与滚动条-js与滚动条
	- Chrome: `document.body.scrollTop`
	- 其他: `document.documentElement.scrollTop`
