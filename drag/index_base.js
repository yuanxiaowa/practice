;(function(window) {
	var Layout = function() {};

	Layout.prototype = {
		constructor: Layout,
		getItem: function(is_pc) {
			var _item = '<li class="layout_right_item"'+ (is_pc ? ' style="width: 96%"' : '') +'>\
			<div class="layout_right_item_remove">×</div>\
			<a href="#" class="layout_right_item_show" title="查看源码">查</a>\
			<div class="layout_right_item_wrap"></div></li>';
			return _item;
		}
	};
	window.Layout = Layout;
})(window);