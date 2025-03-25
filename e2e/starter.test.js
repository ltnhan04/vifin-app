describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true, launchArgs: { detoxTimeout: 120000 } }); // 2 phút
  });a  

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });
});
