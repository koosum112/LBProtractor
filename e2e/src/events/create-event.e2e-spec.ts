// 教材第75頁
import { browser, by, element, $, $$, Key, logging, ExpectedConditions as EC, ElementFinder, ElementArrayFinder } from 'protractor';
import * as path from 'path';

describe('P75 練習表單操作', () => {
  it('打開建立活動頁面', async () => {
    await browser.get('/events/new');
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/events/new');
  });

  it('輸入活動名稱 Protractor 實戰', async () => {
    /* 寫法一
      const name = $('input[name=name]');
      await name.sendKeys('Protractor 實戰');
      const value = await name.getAttribute('value');
      expect(value).toBe('Protractor 實戰');
    */

    // 寫法二
    await element(by.id('name')).sendKeys('Protractor 實戰');
    const value = await element(by.id('name')).getAttribute('value');
    expect(value).toBe('Protractor 實戰');
  });

  // 寫死的方法
  xit('使用 Datepicker 選擇活動日期 2019/11/16', async () => {
    await element(by.tagName('mat-datepicker-toggle')).element(by.tagName('button')).click(); // 點擊月曆btn
    expect (await element(by.tagName('mat-calendar')).isPresent()).toBeTruthy(); // 檢驗月曆元件有打開

    const year = await element(by.tagName('mat-calendar-header')).$('.mat-calendar-period-button'); // 取得元件目前的年月
    const yearValue = await year.getText();
    if (yearValue !== 'NOV 2019') { // 判斷是不是我要的年月(也不一定要判斷，拿來簡單測試js語法)
      await year.click();
      await element(by.cssContainingText('.mat-calendar-body-cell-content', '2019')).click();
      await element(by.cssContainingText('.mat-calendar-body-cell-content', 'NOV')).click();
    }
    await element(by.cssContainingText('.mat-calendar-body-cell-content', '16')).click();
    const value = await element(by.id('eventDate')).getAttribute('value');
    expect(value).toBe('11/16/2019');

  });

  // 寫活的方法
  it('使用 Datepicker 選擇活動日期 2019/11/16', async () => {
    const _year = '2019';
    const _month = 'NOV';
    const _date = '16';

    await element(by.tagName('mat-datepicker-toggle')).element(by.tagName('button')).click(); // 月曆按鈕
    expect (await element(by.tagName('mat-calendar')).isPresent()).toBeTruthy(); // 檢查月曆元件是否顯示

    const yearMonthCtrl = await element(by.tagName('mat-calendar-header')).$('.mat-calendar-period-button'); // 取得元件目前的年月
    const yearMonthValue = await yearMonthCtrl.getText();
    if (yearMonthValue !== (_month + ' ' + _year)) {
      await yearMonthCtrl.click(); // 第一次點擊後，這個ctrl的值會變成"年區間"

      let yearRange = '';
      let sYear = '';
      let eYear = '';

      do {
        yearRange = await yearMonthCtrl.getText(); // 取得年區間
        sYear = yearRange.split(' – ')[0];
        eYear = yearRange.split(' – ')[1];

        if (+_year < +sYear) {
          await element(by.css('.mat-calendar-previous-button')).click(); // 年份往左
        } else if (+_year > +eYear) {
          await element(by.css('.mat-calendar-next-button')).click(); // 年份往右
        }

      } while (+_year < +sYear || +_year > +eYear);

      await element(by.cssContainingText('.mat-calendar-body-cell-content', _year)).click();
      await element(by.cssContainingText('.mat-calendar-body-cell-content', _month)).click();
    }
    await element(by.cssContainingText('.mat-calendar-body-cell-content', _date)).click();

    // 驗證日期
    const value = await element(by.id('eventDate')).getAttribute('value');
    expect(value).toBe('11/16/2019');
  });

  // 日期進階練習，把xit改成it即可使用
 xit('使用 Datepicker 選擇活動日期 1997/12/31', async () => {
    const _year = '1997';
    const _month = 'DEC';
    const _date = '31';
    await element(by.tagName('mat-datepicker-toggle')).element(by.tagName('button')).click(); // 月曆按鈕
    expect (await element(by.tagName('mat-calendar')).isPresent()).toBeTruthy(); // 檢查月曆元件是否顯示

    const yearMonthCtrl = await element(by.tagName('mat-calendar-header')).$('.mat-calendar-period-button'); // 取得元件目前的年月
    const yearMonthValue = await yearMonthCtrl.getText();
    if (yearMonthValue !== (_month + ' ' + _year)) {
      await yearMonthCtrl.click(); // 第一次點擊後，這個ctrl的值會變成"年區間"

      let yearRange = '';
      let sYear = '';
      let eYear = '';

      do {
        yearRange = await yearMonthCtrl.getText(); // 取得年區間
        sYear = yearRange.split(' – ')[0];
        eYear = yearRange.split(' – ')[1];

        if (+_year < +sYear) {
          await element(by.css('.mat-calendar-previous-button')).click(); // 年份往左
        } else if (+_year > +eYear) {
          await element(by.css('.mat-calendar-next-button')).click(); // 年份往右
        }

      } while (+_year < +sYear || +_year > +eYear);

      await element(by.cssContainingText('.mat-calendar-body-cell-content', _year)).click();
      await element(by.cssContainingText('.mat-calendar-body-cell-content', _month)).click();
    }
    await element(by.cssContainingText('.mat-calendar-body-cell-content', _date)).click();

    // 驗證日期
    const value = await element(by.id('eventDate')).getAttribute('value');
    expect(value).toBe('12/31/1997');
  });

  it('輸入活動時間:早上', async () => {
    await element(by.id('eventTime')).sendKeys('早上');
    const value = await element(by.id('eventTime')).getAttribute('value');
    expect(value).toBe('早上');
  });

  it('輸入活動票價:500', async () => {
    await element(by.id('eventPrice')).sendKeys('500');
    const value = await element(by.id('eventPrice')).getAttribute('value');
    expect(value).toBe('500');
  });

  it('輸入活動地址:中正路100號', async () => {
    await element(by.id('address')).sendKeys('中正路100號');
    const value = await element(by.id('address')).getAttribute('value');
    expect(value).toBe('中正路100號');
  });

  it('輸入城市:台北市', async () => {
    await element(by.id('city')).sendKeys('台北市');
    const value = await element(by.id('city')).getAttribute('value');
    expect(value).toBe('台北市');
  });

  it('輸入活動地址:台灣', async () => {
    await element(by.id('country')).sendKeys('台灣');
    const value = await element(by.id('country')).getAttribute('value');
    expect(value).toBe('台灣');
  });

  it('輸入活動網址:http://example.com', async () => {
    await element(by.id('onlineUrl')).sendKeys('http://example.com');
    const value = await element(by.id('onlineUrl')).getAttribute('value');
    expect(value).toBe('http://example.com');
  });

  it('上傳活動圖片', async () => {
    const imgPath = path.resolve('./e2e/src/assets/Protractor.png');
    await element(by.name('imageFile')).sendKeys(imgPath);
    const value = await element(by.name('imageFile')).getAttribute('value');
    expect(value).toBeTruthy();
  });

  it('點擊儲存按鈕，驗證活動列表顯示 Protractor 實戰 活動', async () => {
    await element(by.cssContainingText('.btn.btn-success', '儲存')).click(); // 點擊搜尋
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/events');

    const newActivity: ElementFinder = await element.all(by.tagName('event-thumbnail')).last();
    const title = newActivity.element(by.tagName('h2'));
    const value = await title.getText();
    expect(value).toBe('PROTRACTOR 實戰');
    // expect().nothing(); // 不期待任何東西，直接認定為成功
  });
});

// – 輸入活動名稱 Protractor 實戰
// – 使用 Datepicker 選擇活動日期 2019/11/16
// • 請勿使用 sendKeys 測試
// • 進階練習：請嘗試設定 1997/12/31 這個日期！
// – 輸入活動時間 早上；輸入活動票價 500
// – 輸入活動地址 中正路100號；城市 台北市；國家 台灣
// – 輸入活動網址 http://example.com
// – 上傳活動圖片 e2e\src\assets\Protractor.png
// – 點擊儲存按鈕，驗證活動列表顯示 Protractor 實戰 活動
