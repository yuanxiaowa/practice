/*********************************\
 *
 *		Ody的库
 * 
 *********************************/

(function(window, document) {
    var Ody = function() {

    };

    /**
     * window.onerror绑定处理函数来捕获那些没有被任何try/catch块捕获到而扩散到全局的异常！
     * @param  {string} message 错误信息
     * @param  {string} url     文件地址
     * @param  {Integer} line    行数
     * @return {void}         [description]
     */
    window.onerror = function (message, url, line) {
        console.log(message);
    }

    /**
     * 各浏览器兼容方法
     * @return {void}
     */
    function init() {
        window.requestAnimationFrame = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }

    /**
     * 将字符串转化为base64格式
     * @param  {string} str 字符串
     * @return {string}     转化后的结果
     */
    function base64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    Ody.base64 = base64;

    /**
     * 加载脚本
     * @param  {string}   url      资源地址
     * @param  {Function} callback 回调函数
     * @return {void}            
     */
    function loadScript(url, callback) {
        var script = document.createElement('script');
        // script.type = 'text/javascript';
        // IE 验证脚本是否下载完成
        if (script.readyState) {
            script.onreadystatechange = function () {
                // readyState 属性有5种取值
                // - uninitialized：初始状态
                // - loading：开始下载
                // - interactive：数据完成下载但尚不可用
                // - complete：数据已经准备就绪
                // - loaded
                // 最靠谱的方式是检查以下两个状态，只要其中一个出发，就默认下载完成
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    // 移除事件处理器，确保事件不会处理2次
                    script.onreadystatechange = null;
                    callback && callback();
                }
            };
        } else {
            script.onload = function () {
                callback && callback();
            };
        }
        script.src = url;
        // 把新建的script添加到head里面比添加到body里面更保险
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    Ody.loadScript = loadScript;

    function loadScriptXHR(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    var script = document.createElement('script');
                    // script.type = 'text/javascript';
                    script.text = xhr.responseText;
                    document.getElementsByTagName("head")[0].appendChild(script);
                }
            }
        };
        xhr.send(null);
    }

    /**
     * 获取对象类型
     * @param  {object} o 对象
     * @return {string}   
     */
    function type(o) {
        var s = Object.prototype.toString.call(o);
        return s.match(/\[object (.*?)\]/)[1].toLowerCase();
    }

    Ody.type = type;

    /**
     * 判断对象是否为某个指定类型
     */
    ['Null',
        'Undefined',
        'Object',
        'Array',
        'String',
        'Number',
        'Boolean',
        'Function',
        'RegExp',
        'Element',
        'NaN',
        'Infinite'
    ].forEach(function(t) {
        type['is' + t] = function(o) {
            return type(o) == t.toLowerCase();
        };
    });

    /**
     * 转化字符串
     * @param  {object} v
     * @return {string}
     */
    function parseString(v) {
        if (!v) {
            return '';
        }
        return String(v);
    }

    Ody.parseString = parseString;

    /**
     * 字符串格式化
     * @param  {string} s 
     * @return {string}
     */
    function strFormat(s) {
        var reg = /(\{\d+\})/,
            i = 0;
        if (!type.isString(s)) {
            return s;
        }
        if (arguments.length > 1) {
            while (reg.test(s)) {
                s = s.replace(RegExp.$1, parseString(arguments[i++]));
            }
        }
        return s;
    }

    Ody.strFormat = strFormat;

    /**
     * 格式化数字
     * @param  {object} s 要格式化的对象
     * @param  {number} i 小数点后的位数
     * @return {number}
     */
    function numberFormat(s, i) {
        var _s = Number(s);
        if (!_s) {
            return s;
        }
        if (!i) {
            i = 0;
        }
        return _s.toFixed(i);
    }

    Ody.numberFormat = numberFormat;

    /**
     * cookie 操作
     * @return {void}
     */
    function cookie() {}

    Ody.cookie = cookie;

    cookie.add = function() {
        if (arguments.length > 1) {
            document.cookie = strFormat('{0}={1}', arguments[0], escape(arguments[1]));
        } else {
            for (var o in arguments[0]) {
                document.cookie = strFormat('{0}={1}', o, escape(arguments[0][o]));
            }
        }
    };

    cookie.get = function(k) {
        var _cookie = document.cookie,
            reg = new RegExp(strFormat('\\b{0}=([^;]+)', k));
        if (reg.test(document.cookie)) {
            return RegExp.$1;
        } else {
            var obj = {};
            reg = /([\w_]+)=([^;]+)/g;
            while (reg.test(_cookie)) {
                obj[RegExp.$1] = RegExp.$2;
            }
            return obj;
        }
    };
    cookie.remove = function(k) {
        document.cookie = strFormat('{0}=; expires={1}', k, new Date(Date.now() - 1).toGMTString());
    };

    /**
     * 首字母大写
     * @param  {string} v
     * @return {string}
     */
    function fupper(v) {
        if (!type.isString(v)) {
            return v;
        }
        var reg = /^(\w)/;
        return v.replace(reg, function(o) {
            return o.toUpperCase();
        });
    }

    Ody.fupper = fupper;

    /**
     * 交换数组中的两个数
     * @param  {array} arr
     * @param  {number} i1
     * @param  {number} i2  
     * @return {void}     
     */
    function swap(arr, i1, i2) {
        var temp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = temp;
    }

    Ody.swap = swap;

    /**
     * 冒泡排序
     * @param  {array}  arr    待排序的数组
     * @param  {Boolean} isDesc 是否降序
     * @return {array}         排序后的数组
     */
    function selectionSort(arr, isDesc) {
        var len = arr.length,
            temp;
        for (var i = 0; i < len - 1; i++) {
            temp = i;
            for (var j = i + 1; j < len; j++) {
                if (isDesc) {
                    if (arr[temp] < arr[j]) {
                        temp = j;
                    }
                } else {
                    if (arr[temp] > arr[j]) {
                        temp = j;
                    }
                }
            }
            if (temp != i) {
                swap(arr, i, temp);
            }
        }
        return arr;
    }

    Ody.selectionSort = selectionSort;

    /**
     * 插入排序
     * @param  {array}  arr    待排序的数组
     * @param  {Boolean} isDesc 是否为降序
     * @return {array}         排序后的数组
     */
    function insertionSort(arr, isDesc) {
        var len = arr.length,
            value, // 当前比较的值
            i,
            j;
        for (i = 1; i < len; i++) {
            if (isDesc) {
                value = arr[len - i - 1];
                for (j = len - i; j < len && arr[j] > value; j++) {
                    arr[j - 1] = arr[j];
                }
                arr[j - 1] = value;
            } else {
                value = arr[i];
                for (j = i - 1; j > -1 && arr[j] > value; j--) {
                    arr[j + 1] = arr[j];
                }
                arr[j + 1] = value;
            }
        }
        return arr;
    }

    Ody.insertionSort = insertionSort;

    /**
     * 合并两个数组
     * @param  {array}  left   
     * @param  {array}  right  
     * @param  {Boolean} isDesc 是否降序
     * @return {array}         合并后的数组
     */
    function merge(left, right, isDesc) {
        var result = [],
            il = 0,
            ir = 0;
        while (il < left.length && ir < right.length) {
            if (isDesc) {
                if (left[il] > right[ir]) {
                    result.push(left[il++]);
                } else {
                    result.push(right[ir++]);
                }
            } else {
                if (left[il] < right[ir]) {
                    result.push(left[il++]);
                } else {
                    result.push(right[ir++]);
                }
            }
        }
        return result.concat(left.slice(il)).concat(right.slice(ir));
    }

    Ody.merge = merge;

    /**
     * 合并排序
     * @param  {array}  arr    排序前的数组
     * @param  {Boolean} isDesc 是否降序
     * @return {array}         排序后的数组
     */
    function mergeSort(arr, isDesc) {
        if (arr.length < 2) {
            return arr;
        }
        var middle = Math.floor(arr.length / 2),
            left = arr.slice(0, middle),
            right = arr.slice(middle),
            nArr = merge(mergeSort(left, isDesc), mergeSort(right, isDesc), isDesc);
        nArr.unshift(0, arr.length);
        arr.splice.call(arr, nArr);

        return arr;
    }

    Ody.mergeSort = mergeSort;

    /**
     * 确定支点
     * @param  {array}  arr    
     * @param  {number}  left   
     * @param  {number}  right  
     * @param  {Boolean} isDesc 是否降序
     * @return {[type]}         [description]
     */
    function partition(arr, left, right, isDesc) {
        var pivot = arr[Math.floor((left + right) / 2)],
            i = left,
            j = right;
        while (i <= j) {
            if (isDesc) {
                while (arr[i] > pivot) {
                    i++;
                }
                while (arr[j] < pivot) {
                    j--;
                }
            } else {
                while (arr[i] < pivot) {
                    i++;
                }
                while (arr[j] > pivot) {
                    j--;
                }
            }
            if (i <= j) {
                swap(arr, i++, j--);
            }
        }
        return i;
    }

    Ody.partition = partition;

    /**
     * 快速排序
     * @param  {array} arr   排序前的数组
     * @param  {number} left  起始位置
     * @param  {number} right 结束位置
     * @param  {Boolean} isDesc 是否降序
     * @return {array}       排序后的数组
     */
    function quickSort(arr, left, right, isDesc) {
        var index;
        if (arr.length < 2) {
            return arr;
        }
        left = (typeof left !== 'number' ? 0 : left);
        right = (typeof right !== 'number' ? arr.length - 1 : right);
        index = partition(arr, left, right, isDesc);
        if (left < index - 1) {
            quickSort(arr, left, index - 1, isDesc);
        }
        if (index < right) {
            quickSort(arr, index, right, isDesc);
        }
        return arr;
    }

    Ody.quickSort = quickSort;

    window.Ody = Ody;
})(window, document);


/**
 * 日期格式化
 * @param  {string} format 
 * @return {string}
 */
Date.prototype.format = function(format) {
    var o = {
            'y+': this.getFullYear(),
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S': this.getMilliseconds()
        },
        reg;
    for (var k in o) {
        reg = new RegExp(Ody.strFormat('({0})', k));
        if (reg.test(format)) {
            format = format.replace(RegExp.$1, o[k] > 10 ? o[k] : '0' + o[k]);
        }
    }
    return format;
};
