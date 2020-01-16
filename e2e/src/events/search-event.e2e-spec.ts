// 教材第65頁
import { browser, by, element, $, $$, Key, logging, ExpectedConditions as EC, ElementFinder, ElementArrayFinder } from 'protractor';
fdescribe('進入活動頁面測試', () => {
  it('搜尋 Angular，顯示搜尋結果', async () => {
    await element(by.name('searchTerm')).sendKeys('Angular'); // 輸入查詢條件
    await element(by.buttonText('搜尋')).click(); // 點擊搜尋

    const title: ElementFinder = await element(by.css('.modal-dialog>.modal-content>.modal-header modal-title'));
    expect(title.isPresent()).toBe(true);
  });

  it('搜尋結果顯示三筆資料', async () => {
    const list: ElementFinder = await element(by.css('.modal-dialog>.modal-content>.modal-body>.list-group'));
    const results = await list.all(by.css('.list-group-item')).count();
    expect(results).toBe(3);

  });

  it('點擊 Angular 實戰開發 並進入下一頁', async () => {
    const item: ElementFinder = await element(by.cssContainingText('.list-group-item', 'Angular 實戰開發'));
    await item.click();

    const url = await browser.getCurrentUrl();
    expect(url).toContain('/events/1');
  });

  it('活動標題為「ANGULAR 7 開發實戰：新手入門篇」', async () => {
    const h2Element = element(by.xpath('//h2'));
    expect(await h2Element.getText()).toContain('ANGULAR 7 開發實戰：新手入門篇');
  });
});

// – 於搜尋文字方塊輸入 Angular 並點擊搜尋
// – 驗證畫面上是否出現搜尋結果
// – 驗證畫面上是否出現 3 個搜尋結果
// – 點擊 Angular 實戰開發 並進入下一頁
// – 驗證活動標題是否為「ANGULAR 7 開發實戰：新手入門篇」

