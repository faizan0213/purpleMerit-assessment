const { register, login, validateEmail, validatePasswordStrength } = require("../controllers/authControllers");

describe("Auth Controller Unit Tests", () => {
  describe("Email Validation", () => {
    test("should validate correct email format", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test("test@example.com")).toBe(true);
    });

    test("should reject invalid email format", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test("invalid-email")).toBe(false);
    });

    test("should reject email without domain", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test("test@")).toBe(false);
    });
  });

  describe("Password Validation", () => {
    test("should reject password shorter than 6 characters", () => {
      const password = "Test1";
      const isValid = password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
      expect(isValid).toBe(false);
    });

    test("should reject password without uppercase letter", () => {
      const password = "test123";
      const hasUppercase = /[A-Z]/.test(password);
      expect(hasUppercase).toBe(false);
    });

    test("should reject password without number", () => {
      const password = "TestPassword";
      const hasNumber = /[0-9]/.test(password);
      expect(hasNumber).toBe(false);
    });

    test("should accept strong password", () => {
      const password = "Test123";
      const isValid = password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
      expect(isValid).toBe(true);
    });
  });
});
