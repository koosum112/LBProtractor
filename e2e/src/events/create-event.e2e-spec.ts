// 教材第75頁
import { browser, by, element, $, $$, Key, logging, ExpectedConditions as EC, ElementFinder, ElementArrayFinder } from 'protractor';
import * as path from 'path';

fdescribe('練習表單操作', () => {
  it('打開建立活動頁面', async () => {
    await browser.get('http://localhost:4200/events/new');
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/events/new');
  });

  it('輸入活動名稱 Protractor 實戰', async () => {
    /*
      const name = $('input[name=name]');
      await name.sendKeys('Protractor 實戰');
      const value = await name.getAttribute('value');
      expect(value).toBe('Protractor 實戰');
    */
    await element(by.id('name')).sendKeys('Protractor 實戰');
    const value = await element(by.id('name')).getAttribute('value');
    expect(value).toBe('Protractor 實戰');
  });

  xit('使用 Datepicker 選擇活動日期 2019/11/16', async () => {
    await element(by.tagName('mat-datepicker-toggle')).element(by.tagName('button')).click();
    expect (await element(by.tagName('mat-calendar')).isPresent()).toBeTruthy();

    const year = await element(by.tagName('mat-calendar-header')).$('.mat-calendar-period-button');
    const yearValue = await year.getText();
    if (yearValue !== 'NOV 2019') {
      await year.click();
      await element(by.cssContainingText('.mat-calendar-body-cell-content', '2019')).click();
      await element(by.cssContainingText('.mat-calendar-body-cell-content', 'NOV')).click();
    }
    await element(by.cssContainingText('.mat-calendar-body-cell-content', '16')).click();
    const value = await element(by.id('eventDate')).getAttribute('value');
    expect(value).toBe('11/16/2019');

  });

  it('使用 Datepicker 選擇活動日期 2019/11/16', async () => {
    const _year = '2019';
    const _month = 'NOV';
    const _date = '16';
    await element(by.tagName('mat-datepicker-toggle')).element(by.tagName('button')).click(); // 月曆按鈕
    expect (await element(by.tagName('mat-calendar')).isPresent()).toBeTruthy(); // 檢查月曆元件是否顯示

    const yearCtrl = await element(by.tagName('mat-calendar-header')).$('.mat-calendar-period-button');
    const yearValue = await yearCtrl.getText();
    if (yearValue.indexOf(_year) === -1) {
      await yearCtrl.click();

      let yearRange = '';
      let sYear = '';
      let eYear = '';

      do {
        yearRange = await yearCtrl.getText();
        sYear = yearRange.split(' – ')[0];
        eYear = yearRange.split(' – ')[1];

        if (+_year < +sYear) {
          await element(by.css('.mat-calendar-previous-button')).click();
        } else if (+_year > +eYear) {
          await element(by.css('.mat-calendar-next-button')).click();
        }

      } while (+_year < +sYear || +_year > +eYear);

      await element(by.cssContainingText('.mat-calendar-body-cell-content', _year)).click();
      await element(by.cssContainingText('.mat-calendar-body-cell-content', _month)).click();
    }
    await element(by.cssContainingText('.mat-calendar-body-cell-content', _date)).click();
    const value = await element(by.id('eventDate')).getAttribute('value');
    expect(value).toBe('11/16/2019');
  });

 xit('使用 Datepicker 選擇活動日期 1997/12/31', async () => {
    const _year = '1997';
    const _month = 'DEC';
    const _date = '31';
    await element(by.tagName('mat-datepicker-toggle')).element(by.tagName('button')).click(); // 月曆按鈕
    expect (await element(by.tagName('mat-calendar')).isPresent()).toBeTruthy(); // 檢查月曆元件是否顯示

    const yearCtrl = await element(by.tagName('mat-calendar-header')).$('.mat-calendar-period-button');
    const yearValue = await yearCtrl.getText();
    if (yearValue.indexOf(_year) === -1) {
      await yearCtrl.click();

      let yearRange = '';
      let sYear = '';
      let eYear = '';

      do {
        yearRange = await yearCtrl.getText();

        // expect(yearRange).toBe('2016 – 2039');
        sYear = yearRange.split(' – ')[0];
        eYear = yearRange.split(' – ')[1];
        // expect(sYear).toBe('2016');
        // expect(sYear).toBe('2039');
        if (+_year < +sYear) {
          await element(by.css('.mat-calendar-previous-button')).click();
        } else if (+_year > +eYear) {
          await element(by.css('.mat-calendar-next-button')).click();
        }

      } while (+_year < +sYear || +_year > +eYear);

      await element(by.cssContainingText('.mat-calendar-body-cell-content', _year)).click();
      await element(by.cssContainingText('.mat-calendar-body-cell-content', _month)).click();
    }
    await element(by.cssContainingText('.mat-calendar-body-cell-content', _date)).click();
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
