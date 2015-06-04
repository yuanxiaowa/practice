$(function() {
    var layout = new Layout,
    	// template,
    	reg;
    $.get('template.html', function(data) {
    	template = data;
    });
    $('#add_new_mobile')
        .click(function() {
            $(layout.getItem()).appendTo('#layout_right_list')[0].scrollIntoView();
        }).click();
    $('#add_new_pc')
        .click(function() {
            $(layout.getItem(true)).appendTo('#layout_right_list')[0].scrollIntoView();
        });
    $('#layout_right_list')
        .on('click', '.layout_right_item_remove', function() {
            $(this).parent().remove();
        })
        .on('click', '.layout_right_item_show', function(e) {
        	e.preventDefault();
            var _html = $(this).next().html();
            // _html = _html.replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\"/g, '&quot;').replace(/&/g, '&amp;');
            htmlFomat(_html);
            $('#ss').show().text(_html);
        });
    function htmlFomat(_html) {
    	var reg = /(>|<)/g,
    		space = 0,
    		result = '';
    	while (inp = reg.exec(_html)) {
    		console.log(inp);
    	}
    	/*while (reg.test(_html)) {
    		console.log(RegExp.$1);
    	}*/
    }
    $('#full_screen')
        .click(function() {
            $('.layout_container').toggleClass('layout_center');
        });
    $('#layout_left_list')
        .on('dragstart', 'div', function(e) {
            e = e.originalEvent;
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
        });
    $('#layout_right_list')
        .on('dragenter', '.layout_right_item', function(e) {
            // console.log('dragenter');
        })
        .on('dragleave', '.layout_right_item', function(e) {
            // console.log('dragleave');
        })
        .on('dragover', '.layout_right_item', function(e) {
            e.stopPropagation();
            e.preventDefault();
        })
        .on('drop', '.layout_right_item', function(e) {
            e = e.originalEvent;
            var data = e.dataTransfer.getData('text/plain'),
            	$target = $(e.target);
            if (!$target.hasClass('layout_can_wrap')) {
            	$target = $target.closest('.layout_can_wrap');
            	if (!$target.length) {
            		$target = $(e.target).closest('.layout_right_item_wrap');
            	}
            }
        	reg = new RegExp('<!--\\s*'+ data +'\\s*-->([\\s\\S]*)<!--\\s*'+ data +'\\s+end\\s*-->');
        	if (reg.test(template)) {
        		$target.append(RegExp.$1.replace(/[\r\n]/g, ''));
        	}
        });
});
