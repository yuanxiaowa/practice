describe('myapp', function() {
	browser.get('index.html')
	describe('equal', function() {
		element(by.model('sex')).sendKeys('woman');
		it('t1', function() {
			var s = element(by.binding('sex'));
			expect(s.getText()).toEqual('you woman');
		});
		it('t1', function() {
			element(by.tagName('button')).click();
			var v = element(by.binding('v')).getText();
			expect(v).toEqual('Hello woman');
		});
		it('repeat', function() {
			element(by.model('n')).sendKeys(10);
			var eles = element.all(by.repeater('item in items'));
			expect(eles.count()).toBe(10);
		});
	});

});