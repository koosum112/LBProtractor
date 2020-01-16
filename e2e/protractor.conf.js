// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// 很重要的檔案，很常進來
const { SpecReporter } = require('jasmine-spec-reporter');
/**
 * @type { import("protractor").Config }
 * Angular8 預設有加上面這個type
 */
exports.config = {
  allScriptsTimeout: 110000, // 毫秒
  specs: [ // 不同的spec檔不應該有相依性，執行順序會根據這個陣列的順序!!!!!
    './src/**/*.e2e-spec.ts' // 要執行的測試檔案，
  ],
  capabilities: {
    browserName: 'chrome', // 要控制的瀏覽器
  },
  SELENIUM_PROMISE_MANAGER: false, // 停用 Control Flow 的方法
  directConnect: true, // true= 直接連線瀏覽器，如果是false，代表需要另外架一台selenium server連線
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 10000, // 預設timeout 微秒
    print: function() {}
  },
  async onPrepare() { // 測試前要做的事情，ex: 資料庫重設、還原
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
