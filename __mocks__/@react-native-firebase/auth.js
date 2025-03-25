export default jest.fn(() => ({
  createUserWithEmailAndPassword: jest.fn((email, password) =>
    Promise.resolve({
      user: {
        uid: "mocked_uid",
        email,
        displayName: "Mocked User", // ➜ Thêm displayName
        providerData: [{ providerId: "password", email }],
        getIdTokenResult: jest.fn(() =>
          Promise.resolve({ token: "mocked_token" })
        ),
      },
    })
  ),
  currentUser: { // ➜ Thêm mock `currentUser`
    uid: "mocked_uid",
    email: "test@example.com",
    displayName: "Mocked User",
  },
}));
