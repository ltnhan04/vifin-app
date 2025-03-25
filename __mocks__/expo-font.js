module.exports = {
    loadAsync: jest.fn(() => Promise.resolve()),
    isLoaded: jest.fn(() => true),
    loadedNativeFonts: [], // đảm bảo đây là mảng
  };
  