'use strict';


// 变量的解构赋值
// 解析不成功，则等于undefined
var [a, b, c] = [1, 2, 3];
console.log(a, b, c);

let [d, [[e], f]] = [1, [[2], 3]]
console.log(d,e,f);

let [,,third] = ['foo', 'bar', 'baz'];
console.log(third);

let [x, , y] = [1, 2, 3]
console.log(x, y);

let [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);

let [g, h] = [1, 2, 3];
console.log(g, h);

var {foo, bar} = {foo: 'aaa', bar: 'bbb'};
console.log(foo, bar);


// 字符串
/*var t = 'hello'
console.log(`${t}`);*/

// 块级作用域
/*{
	let a = 1;
	var b = 2;
	const c = 'const';
}
console.log(b);
console.log(c);
console.log(a);
*/

// 类与对象
/*class Calc {
	constructor() {
		console.log('Calc constructor');
	}

	add(a, b) {
		return a + b;
	}
}

var c = new Calc();
console.log(c.add(4, 5));*/