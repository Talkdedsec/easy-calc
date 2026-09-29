import test from "node:test";
import assert from "node:assert/strict";
import { localeFormat, translateError } from "../lib/i18n.ts";
import { evaluate, calculate } from "../lib/math.ts";

test("the same result follows English or Turkish number conventions", () => {
  const value = evaluate("1234,5 + 0,06");
  assert.equal(localeFormat(value, "en"), "1,234.56");
  assert.equal(localeFormat(value, "tr"), "1.234,56");
});
test("actual calculator failures have useful messages in both languages", () => {
  for (const [operation, english] of [
    [() => evaluate("1/0"), "Cannot divide by zero."],
    [() => calculate("discount", 100, 101), "The discount cannot exceed 100%."],
    [() => evaluate("(1+2"), "Check your parentheses."],
  ]) {
    try { operation(); assert.fail("Expected a calculation error"); }
    catch (error) { assert.equal(translateError(error.message, "en"), english); assert.equal(translateError(error.message, "tr"), error.message); }
  }
});
