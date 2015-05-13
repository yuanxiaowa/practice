var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder()
				.withCapabilities(webdriver.Capabilities.chrome())
				.build();

driver.get('http://www.baidu.com');

driver.findElement(webdriver.By.id('kw')).sendKeys('webdriver');

driver.wait(function() {
	return driver.getTitle().then(function(title) {
		return title === 'webdriver_百度搜索';
	});
}, 1000);

driver.quit();