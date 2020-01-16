// 這是Protractor Recorder工具自動錄影的
import { browser, by, element, $, $$, Key, logging, ExpectedConditions as EC } from 'protractor';

xdescribe('這是Protractor Recorder工具自動錄影的', () => {

  const defaultTimeout = 5000; // ExpectedConditions's default timeout

  beforeAll(async () => {
    // await browser.waitForAngularEnabled(false); // 如果不是angular的專案要把這個打開
    // await browser.manage().window().setSize(1024, 768);
  });

  beforeEach(async () => {
  });

  it('自動測試', async () => {
    await browser.get('http://localhost:4200/user/login');

    const elem2 = element(by.id('userName'));
    await elem2.click();
    await element(by.id('userName')).sendKeys('John');

    const elem4 = element(by.id('password'));
    await elem4.click();
    await element(by.id('password')).sendKeys('123456');

    const elem6 = element(by.xpath('//button[@type="submit"]'));
    await elem6.click();

    const elem7 = element(by.xpath('//h1'));
    const text7 = '活動列表';
    expect(await elem7.getText()).toContain(text7);

    const elem8 = element(by.xpath('//h2'));
    await elem8.click();

    const elem9 = element(by.linkText('歡迎 John J.'));
    const text9 = '歡迎 John J.';
    expect(await elem9.getText()).toContain(text9);

    const elem10 = element(by.xpath('//h2'));
    const text10 = 'ANGULAR 7 開發實戰：新手入門篇';
    expect(await elem10.getText()).toContain(text10);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
