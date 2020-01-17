// 教材第?頁
import { browser, by, element, $, $$, Key, logging, ExpectedConditions as EC, ElementFinder, ElementArrayFinder } from 'protractor';
fdescribe('the user does search on angular.io', () => {

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false); // 如果不是angular的網站，必須要寫這行，反之，寫不寫都沒差
  });

  it('打開angular頁面', async () => {
    await browser.get('https://angular.io/');
    const url = await browser.getCurrentUrl();
    expect(url).toContain('angular.io');
  });

  it('搜尋條件輸入 ngzone，等待搜尋畫面', async () => {
    await $('.search-container').$('input').sendKeys('ngzone'); // 輸入查詢條件
    await browser.wait(EC.presenceOf(element(by.cssContainingText('.search-result-item', 'NgZone'))), 5000);
  });

  it('點擊 NgZone 連結，檢查頁面標題出現 NgZone 字樣', async () => {
    await element(by.cssContainingText('.search-result-item', 'NgZone')).click();
    const url = await browser.getCurrentUrl();
    expect(url).toContain('angular.io/api/core/NgZone');
    expect(await $('h1').getText()).toEqual('NgZone');

  });

  // 保哥寫法
  it('Should search', async () => {
    await browser.get('https://angular.io/');
    await $('aio-search-box input').sendKeys('ngzone');
    await browser.wait(EC.presenceOf($('aio-search-results')), 5000); // 這行其實不一定要寫，但可以提供一種"這裡會等"的語意。

    const targetLink = $('aio-search-results').element(by.linkText('NgZone'));
    await browser.wait(EC.elementToBeClickable(targetLink), 5000); // 這行必寫
    await targetLink.click();

    const url = await browser.getCurrentUrl();
    expect(url).toContain('https://angular.io/api/core/NgZone');
  });

});
