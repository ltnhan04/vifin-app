const GoogleSignin = {
    configure: jest.fn(),
    signIn: jest.fn().mockResolvedValue({
      idToken: "mock-id-token",
    }),
    signOut: jest.fn(),
    isSignedIn: jest.fn().mockResolvedValue(false),
    getCurrentUser: jest.fn().mockResolvedValue(null),
  };
  
  export { GoogleSignin };
  