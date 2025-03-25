import { signUpSchema, signInSchema } from "@/schema/auth.schema";
import { ZodError } from "zod";

const testUsers = {
  user1: {
    // User hợp lệ
    email: "test@gmail.com",
    password: "Test@1234",
    name: "John Doe",
    confirmPassword: "Test@1234",
  },
  user2: {
    // User có email rỗng (không hợp lệ)
    email: "",
    password: "Test@1234",
    name: "Jane Doe",
    confirmPassword: "Test@1234",
  },
  user3: {
    // User có email thiếu ký tự @
    email: "testAtgmail.com",
    password: "Test@1234",
    name: "User Three",
    confirmPassword: "Test@1234",
  },
  user4: {
    // User có email thiếu dấu chấm
    email: "test@gmailcom",
    password: "Test@1234",
    name: "User Four",
    confirmPassword: "Test@1234",
  },
  user5: {
    // User có email thiếu đuôi .com
    email: "test@gmail",
    password: "Test@1234",
    name: "User Five",
    confirmPassword: "Test@1234",
  },
  user6: {
    // User có email chưa đủ định dạng
    email: "@gmail",
    password: "Test@1234",
    name: "User Six",
    confirmPassword: "Test@1234",
  },
};
describe("Auth Schema Validation", () => {

  // **Test signInSchema**
  describe("signInSchema", () => {
    test("✅ Đăng nhập hợp lệ", () => {
      const data = { email: testUsers.user1.email, password: testUsers.user1.password };
      expect(() => signInSchema.parse(data)).not.toThrow();
    });

    test("❌ Email không được để trống", () => {
      const data = { email: testUsers.user2.email, password: testUsers.user2.password };
      expect(() => signInSchema.parse(data)).toThrow(/Email is not valid!/);
    });

    test("❌ Email thiếu @", () => {
      const data = { email: testUsers.user3.email, password: testUsers.user3.password };
      expect(() => signInSchema.parse(data)).toThrow(/Email is not valid!/);
    });

    test("❌ Email thiếu .", () => {
      const data = { email: testUsers.user4.email, password: testUsers.user4.password };
      expect(() => signInSchema.parse(data)).toThrow(/Email is not valid!/);
    });

    test("❌ Email thiếu đuôi .com", () => {
      const data = { email: testUsers.user5.email, password: testUsers.user5.password };
      expect(() => signInSchema.parse(data)).toThrow(/Email is not valid!/);
    });

    test("❌ Email chưa đủ định dạng", () => {
      const data = { email: testUsers.user5.email, password: testUsers.user5.password };
      expect(() => signInSchema.parse(data)).toThrow(/Email is not valid!/);
    });

    test("❌ Mật khẩu rỗng", () => {
      const data = { email: "test@gmail.com", password: "" };
      try {
        signInSchema.parse(data);
        throw new Error("Expected error not thrown");
      } catch (error) {
        if (error instanceof ZodError) {
          const messages = error.errors.map(err => err.message);
          expect(messages).toEqual(expect.arrayContaining([
            "Password must be at least 8 characters",
          ]));
        }
      }
    });
  
    test("❌ Mật khẩu phải ít nhất 8 kí tự", () => {
      const data = { email: "test@gmail.com", password: "Abc@1" };
      try {
        signInSchema.parse(data);
        throw new Error("Expected error not thrown");
      } catch (error) {
        if (error instanceof ZodError) {
          const messages = error.errors.map(err => err.message);
          expect(messages).toEqual(expect.arrayContaining([
            "Password must be at least 8 characters",
          ]));
        }
      }
    });
  
    test("❌ Mật khẩu phải chứa ít nhất 1 kí tự in hoa", () => {
      const data = { email: "test@gmail.com", password: "abcdefg!" };
      try {
        signInSchema.parse(data);
        throw new Error("Expected error not thrown");
      } catch (error) {
        if (error instanceof ZodError) {
          const messages = error.errors.map(err => err.message);
          expect(messages).toEqual(expect.arrayContaining([
            "Password must be at least one uppercase character",
          ]));
        }
      }
    });
  
    test("❌ Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt", () => {
      const data = { email: "test@gmail.com", password: "Abcdefgh" };
      try {
        signInSchema.parse(data);
        throw new Error("Expected error not thrown");
      } catch (error) {
        if (error instanceof ZodError) {
          const messages = error.errors.map(err => err.message);
          expect(messages).toEqual(expect.arrayContaining([
            "Password must include at least one special character",
          ]));
        }
      }
    });
  
    test("❌ Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt và 1 chữ in hoa", () => {
      const data = { email: "test@gmail.com", password: "12345678" };
      try {
        signInSchema.parse(data);
        throw new Error("Expected error not thrown");
      } catch (error) {
        if (error instanceof ZodError) {
          const messages = error.errors.map(err => err.message);
          expect(messages).toEqual(expect.arrayContaining([
            "Password must be at least one uppercase character",
          ]));
        }
      }
    });
  
    test("❌ Mật khẩu phải chứa ít nhất 1 chữ in hoa", () => {
      const data = { email: "test@gmail.com", password: "Test1234" };
      try {
        signInSchema.parse(data);
        throw new Error("Expected error not thrown");
      } catch (error) {
        if (error instanceof ZodError) {
          const messages = error.errors.map(err => err.message);
          expect(messages).toEqual(expect.arrayContaining([
            "Password must include at least one special character",
          ]));
        }
      }
    });

  });

  // **Test signUpSchema**
  describe("signUpSchema", () => {
    test("✅ Đăng ký hợp lệ", () => {
      const data = {
        name: "John Doe",
        email: "test@gmail.com",
        password: "Test@1234",
        confirmPassword: "Test@1234",
        gender: "male",
      };
      expect(() => signUpSchema.parse(data)).not.toThrow();
    });

    test("❌ Tên không hợp lệ", () => {
      // Chỉ các tên không đạt: chuỗi rỗng hoặc chỉ 1 ký tự (với rule tối thiểu 2 ký tự)
      const invalidNames = ["", "a"];
      invalidNames.forEach(name => {
        const data = {
          name,
          email: "test@gmail.com",
          password: "Test@1234",
          confirmPassword: "Test@1234",
        };
        expect(() => signUpSchema.parse(data)).toThrow(/Name must be at least 2 characters/);
      });
    });

    test("❌ Email không hợp lệ", () => {
      const invalidEmails = ["", "testAtgmail.com", "test@gmailcom", "test@gmail", "@gmail"];
      invalidEmails.forEach(email => {
        const data = {
          name: "John Doe",
          email,
          password: "Test@1234",
          confirmPassword: "Test@1234",
        };
        expect(() => signUpSchema.parse(data)).toThrow(/Email is not valid!/);
      });
    });

    test("❌ Mật khẩu không hợp lệ", () => {
      // Mapping các trường hợp password không hợp lệ cho signUpSchema:
      const invalidPasswords = [
        { input: "", expected: "Password must be at least 8 characters" },
        { input: "Abc@1", expected: "Password must be at least 8 characters" },
        { input: "abcdefg!", expected: "Password must include at least one special character and one uppercase character" },
        { input: "Abcdefgh", expected: "Password must include at least one special character and one uppercase character" },
        { input: "12345678", expected: "Password must include at least one special character and one uppercase character" },
        { input: "Test1234", expected: "Password must include at least one special character and one uppercase character" },
      ];
      invalidPasswords.forEach(({ input, expected }) => {
        try {
          const data = {
            name: "John Doe",
            email: "test@gmail.com",
            password: input,
            confirmPassword: input,
          };
          signUpSchema.parse(data);
          throw new Error("Expected error not thrown");
        } catch (error) {
          if (error instanceof ZodError) {
            const messages = error.errors.map(err => err.message);
            expect(messages).toEqual(expect.arrayContaining([expected]));
          }
        }
      });
    });

    test("❌ Xác nhận mật khẩu không khớp", () => {
      const data = {
        name: "John Doe",
        email: "test@gmail.com",
        password: "Test@123",
        confirmPassword: "Test@113",
        gender: "male",
      };
      try {
        signUpSchema.parse(data);
        throw new Error("Expected error not thrown");
      } catch (error) {
        if (error instanceof ZodError) {
          const messages = error.errors.map(err => err.message);
          expect(messages).toEqual(expect.arrayContaining([
            "Password is not matching!",
          ]));
        }
      }
    });
  });
});
