import { test } from "../";

describe("test", () => {
  it("multiplies a number input by 2", () => {
    const result = test(5);
    expect(result === 10);
  });
});
