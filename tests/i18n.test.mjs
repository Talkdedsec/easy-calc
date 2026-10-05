import test from "node:test";
import assert from "node:assert/strict";
import { localeFormat, translateError, translations } from "../src/lib/i18n.ts";
import { evaluate, calculate, CalcError } from "../src/lib/math.ts";

test("the same result follows English or Turkish number conventions", () => {
  const value = evaluate("1234,5 + 0,06");
  assert.equal(localeFormat(value, "en"), "1,234.56");
  assert.equal(localeFormat(value, "tr"), "1.234,56");
});
test("calculator failures carry a code with text in both languages", () => {
  for (const [operation, code, english, turkish] of [
    [() => evaluate("1/0"), "divideByZero", "Cannot divide by zero.", "Sıfıra bölme yapılamaz."],
    [() => calculate("discount", 100, 101), "discountOver100", "The discount cannot exceed 100%.", "İndirim oranı %100'ü geçemez."],
    [() => evaluate("(1+2"), "parentheses", "Check your parentheses.", "Parantezleri kontrol et."],
  ]) {
    let caught;
    try { operation(); } catch (error) { caught = error; }
    assert.ok(caught instanceof CalcError, "expected a CalcError");
    assert.equal(caught.code, code);
    assert.equal(translateError(caught.message, "en"), english);
    assert.equal(translateError(caught.message, "tr"), turkish);
  }
  assert.equal(translateError("unknown", "en"), "Unable to calculate. Check your expression.");
});
test("English and Turkish define the same interface text", () => {
  const keys = (value) => Object.entries(value).flatMap(([key, child]) =>
    child && typeof child === "object" && !Array.isArray(child) ? keys(child).map((k) => `${key}.${k}`) : [key]);
  assert.deepEqual(keys(translations.tr).sort(), keys(translations.en).sort());
});
