// 模擬使用者的腳本，優先跑這裡再跑其他目錄
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('App', () => { // 測試情境
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', async () => { // 測試案例，it沒什麼意思，方便組成句子
    await page.navigateTo();
    const title = await page.getTitleText();
    expect(title).toEqual('Protractor 訓練營');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
