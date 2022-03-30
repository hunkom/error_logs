module.exports = async function(context, commands) {  
const webdriver = context.selenium.webdriver;
  const driver = context.selenium.driver;      
const main_page = 'https://ebusiness-qa.it.abb.com/';
const availability_page = 'https://ebusiness-qa.it.abb.com/ebusiness/price-and-availability';

const availability_check_page='https://bolservices-qa.it.abb.com/cBOL_Application/AvailabilityCheck';
const random_number=Math.round(Math.random()*1000);



 
//*************************login********************************
await commands.measure.start(`main page`);
await commands.navigate(main_page);
await commands.wait.byTime(10000);
//await commands.click.byXpathAndWait("//div[@class='row tile']");
await commands.click.byClassNameAndWait('btn btn-secondary w-100');


await commands.addText.byId('IT-eBusiness@abb.com', 'i0116');
await commands.click.byXpathAndWait("//input[@id='idSIButton9']");
await commands.wait.byTime(10000);


await commands.addText.byId('IT-eBusiness@abb.com', 'txtUsername');
await commands.addText.byId('7nKy+ZbGnZR7Q4EJ', 'txtPassword');
await commands.click.byClassNameAndWait('brand-button brand-button--center');

await commands.measure.stop();

//*************************select BU and Customer************************

//await commands.measure.start('choose customer');
await commands.scroll.toBottom(2000);
await commands.wait.byTime(5000);
const actions = driver.actions();
const nav = await driver.findElement(webdriver.By.xpath('//input[@id="BUCode"]/following-sibling::span'));
await actions.click(nav).perform();
await commands.wait.byTime(5000);
const input = await driver.findElement(webdriver.By.xpath('//ul[@aria-hidden="false"]/../preceding-sibling::span/input'));
await input.sendKeys('DESTO Teile - Components (ErpSap DE2 Test System)');

await commands.wait.byTime(5000);
await input.sendKeys(webdriver.Key.ENTER);
await commands.wait.byTime(3000);
//await commands.scroll.toBottom(2000);
const customer_code=await driver.findElement(webdriver.By.xpath('//input[@id="CustomerCode"]'));
await customer_code.sendKeys("902114200");
await commands.wait.byTime(5000);
//await commands.measure.stop();

await commands.click.byXpath('//input[@class="btn btn-secondary pull-right"]');
await commands.wait.byTime(5000);
await commands.click.byXpathAndWait('//div[@class="pointer row"]');

await commands.wait.byTime(20000);

await commands.click.byXpath('//a[@href="https://ebusiness-qa.it.abb.com/ebusiness/price-and-availability"]');
//await commands.click.byXpath('//a[@href="https://ebusiness-dev.it.abb.com/cBOL_Application/AvailabilityCheck"]');

await commands.wait.byTime(5000);

await commands.measure.start(`Load availability_page`);
await commands.navigate(availability_page);
await commands.wait.byPageToComplete();
await commands.measure.stop();

//*************************availability check************************


await commands.addText.byId('GHS7304553P0003', 'downshift-0-input');
//await commands.addText.byId('GHS7304553P0003', 'downshift-0-input');
await commands.wait.byTime(15000);
//await commands.click.byXpathAndWait('//li[@id="downshift-0-item-0"]');
//await commands.click.byXpath('//div[@data-testid="search-item-2"]');

//await commands.scroll.toBottom(2000);

await commands.measure.start('Availability check results');
commands.js.run('history.pushState({}, "", `${document.URL}?SamePageMeasurementTimestamp=${Date.now()}`)');
await commands.mouse.doubleClick.byXpath('//button[@data-testid="get-results-btn"]');
//await commands.click.byXpath('//button[@data-testid="get-results-btn"]');
await commands.wait.byXpath('//div[@data-testid="search-results"]', 100000); 
await  commands.scroll.toBottom(50);
await commands.measure.stop();



//*************************add to cart************************

await commands.wait.byTime(10000);
await commands.click.byXpath('//button[@data-testid="item-add-to-cart-btn"]');
await commands.wait.byTime(40000);


//*************************open cart preview by clicking cart icon************************
//await commands.measure.start('Shopping cart preview');
await commands.click.byXpath('//span[@class="ui-lib__sc-1xki818-0 eiaBki styled__Cart-sc-1303lf9-2 btoGVn"]');
await commands.wait.byXpath('//button[@class="ui-lib__sc-90dv7o-0 eafCUS styled__WidePrimaryButton-sc-13qe4ih-6 hcuhLz"]', 100000); 
//await commands.measure.stop();

await commands.wait.byTime(5000);



//*************************open cart by clicking "Go to cart" button on cart preview************************

await commands.measure.start('Shopping cart page');
//await commands.click.byXpathAndWait('//a[@data-testid="go-to-cart-btn"]');
await commands.click.byXpath('//button[@class="ui-lib__sc-90dv7o-0 eafCUS styled__WidePrimaryButton-sc-13qe4ih-6 hcuhLz"]');
await commands.wait.byXpath('//button[@data-testid="Next:-add-order-details-btn"]', 50000); 
await commands.measure.stop();



//*************************click "add order details" button************************

await commands.wait.byTime(5000);
await commands.click.byXpath('//button[@data-testid="Next:-add-order-details-btn"]');
await commands.wait.byTime(5000);


//************************ fill in order details************************

await commands.click.byXpath('//div[@class="ui-lib__sc-ji6l5q-0 bTNToq"]');
await commands.wait.byTime(5000);

//await commands.click.byXpath('//li[@id="downshift-0-item-0"]');
//await commands.wait.byTime(5000);

const input_address = await driver.findElement(webdriver.By.xpath('//input[@placeholder="Select delivery address"]'));
await input_address.sendKeys('ABB Bulgaria EOOD Rakovski Branch 1-Ind.Zone Rak., Ind. Rd.1,No.14-4142 Stryama -  --W802114200');

await commands.click.byXpath('//li[@role="option"]');
//await commands.wait.byTime(5000);


//await commands.click.byXpath('//div[@class="ui-lib__sc-ji6l5q-0 bTNToq"][1]');
//await commands.wait.byTime(5000);

//await commands.click.byXpath('//li[@id="downshift-1-item-0"]');
//await commands.wait.byTime(5000);


const input_date = await driver.findElement(webdriver.By.xpath('//input[@placeholder="Select date"]'));
await input_date.sendKeys('30/03/2022');

/*
await commands.click.byXpath('//div[@data-testid="order-type-dropdown"]');
await commands.wait.byTime(5000);

await commands.click.byXpath('//p[contains(text(),"Standard Order")]');
await commands.wait.byTime(5000);
*/
const input_order_number = await driver.findElement(webdriver.By.xpath('//input[@placeholder="Number"]'));
//await input_order_number.sendKeys('2020-02-26');
await input_order_number.sendKeys(random_number);

await commands.wait.byTime(5000);

//************************ click "review order" button************************

await commands.click.byXpath('//button[@data-testid="Next:-review-order-btn"]');
await commands.wait.byTime(90000);

//************************ click "book order" button/go to "Thank you!" page************************
await commands.measure.start('Thank you');
await commands.js.run('history.pushState({}, "", `${document.URL}?SamePageMeasurementTimestamp=${Date.now()}`)');
await commands.click.byXpath('//button[@data-testid="Next:-book-order-btn"]');
//await commands.wait.byPageToComplete();
//await commands.wait.byTime(15000);
await commands.wait.byXpath('//p[@data-testid="sap-order-numbers"]', 500000);
return commands.measure.stop();

};




