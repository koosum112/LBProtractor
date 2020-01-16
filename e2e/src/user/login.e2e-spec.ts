import { browser, by, element, $, $$, ExpectedConditions as EC } from 'protractor';

xdescribe('登入', () => {

  it('打開登入頁面', async () => {
    await browser.get('http://localhost:4200/user/login');
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/user/login');
  });

  it('登入 will 帳號', async () => {
    await element(by.name('userName')).sendKeys('will'); // 輸入帳號
    await element(by.name('password')).sendKeys('123456');  // 輸入密碼
    await element(by.buttonText('登入')).click(); // 點擊登入
    const value = await element(by.className('alert-danger')).getText(); // 用class取得錯誤訊息的值
    // const value = await element(by.css('.alert-danger')).getText(); // 用css取得錯誤訊息的值

    expect(value).toContain('錯誤的帳號密碼');
  });

  it('清空帳號', async () => {
    await element(by.name('userName')).clear(); // 輸入帳號
    await element(by.name('password')).clear();  // 輸入密碼
    const userName = await element(by.name('userName')).getText();
    const password = await element(by.name('password')).getText();
    expect(userName).toBe('');
    expect(password).toBe('');
  });

  it('登入 Jonh 帳號', async () => {
    await element(by.name('userName')).sendKeys('John'); // 輸入帳號
    await element(by.name('password')).sendKeys('123456');  // 輸入密碼
    await element(by.buttonText('登入')).click(); // 點擊登入
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/events');
  });

  // it('返回上一頁', async () => {
  //   browser.navigate().back();
  //   const url = await browser.getCurrentUrl();
  //   expect(url).toContain('/user/login');
  // });
});
