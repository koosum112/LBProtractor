// 教材第66頁
import { browser, by, element, $, $$, Key, logging, ExpectedConditions as EC, ElementFinder, ElementArrayFinder } from 'protractor';
describe('P66 練習複雜 DOM 定位運用', () => {
  it('打開全部活動頁面', async () => {
    await browser.get('/events');
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/events');
  });

  it('搜尋 Angular，顯示搜尋結果', async () => {
    await element(by.name('searchTerm')).sendKeys('Angular'); // 輸入查詢條件
    await element(by.buttonText('搜尋')).click(); // 點擊搜尋

    const title = $('.modal-dialog'); // 定位到modal
    expect(await title.isPresent()).toBe(true);
  });

  it('搜尋結果顯示三筆資料', async () => {
    const list: ElementFinder = $('.modal-dialog>.modal-content>.modal-body>.list-group'); // 定位到modal底下的body
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
    expect(await $('h2').getText()).toContain('ANGULAR 7 開發實戰：新手入門篇');
  });
});

// – 於搜尋文字方塊輸入 Angular 並點擊搜尋
// – 驗證畫面上是否出現搜尋結果
// – 驗證畫面上是否出現 3 個搜尋結果
// – 點擊 Angular 實戰開發 並進入下一頁
// – 驗證活動標題是否為「ANGULAR 7 開發實戰：新手入門篇」

