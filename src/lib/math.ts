export type Mode = "percent" | "discount" | "increase" | "ratio" | "change" | "vatAdd" | "vatRemove";
export type CalcErrorCode = "notFinite" | "invalidNumber" | "zeroWhole" | "oldNotPositive" | "negativeInput" | "discountOver100" | "tooLong" | "invalidCharacters" | "parentheses" | "incomplete" | "divideByZero" | "malformed";
/** A calculation failure. The code is language-neutral; i18n turns it into text. */
export class CalcError extends Error {
  readonly code: CalcErrorCode;
  constructor(code: CalcErrorCode) { super(code); this.name = "CalcError"; this.code = code; }
}
function finite(value: number): number {
  if (!Number.isFinite(value)) throw new CalcError("notFinite");
  return Object.is(value, -0) ? 0 : value;
}
export function parseNumber(text: string): number {
  const normalized = text.trim().replace(",", ".");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) throw new CalcError("invalidNumber");
  return finite(Number(normalized));
}
export function calculate(mode: Mode, a: number, b: number) {
  finite(a); finite(b);
  let value = 0, percent = false;
  if (mode === "ratio") {
    if (b === 0) throw new CalcError("zeroWhole");
    value = a / b * 100; percent = true;
  } else if (mode === "change") {
    if (a <= 0) throw new CalcError("oldNotPositive");
    value = (b - a) / a * 100; percent = true;
  } else {
    if (mode !== "percent" && (a < 0 || b < 0)) throw new CalcError("negativeInput");
    if (mode === "discount" && b > 100) throw new CalcError("discountOver100");
    const portion = finite(a * (b / 100));
    if (mode === "percent") value = portion;
    if (mode === "discount") value = a - portion;
    if (mode === "increase" || mode === "vatAdd") value = a + portion;
    if (mode === "vatRemove") value = a / (1 + b / 100);
  }
  return { value: finite(value), percent };
}
/** Arithmetic parser: no eval. Percent always divides by 100. */
export function evaluate(input: string): number {
  if (input.length > 200) throw new CalcError("tooLong");
  const source = input.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/,/g, ".");
  const tokens = source.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|[()+*/%-]/gi) ?? [];
  if (!tokens.length || tokens.join("") !== source.replace(/\s/g, "")) throw new CalcError("invalidCharacters");
  let index = 0;
  function atom(): number {
    const token = tokens[index++];
    if (token === "+") return atom();
    if (token === "-") return -atom();
    let value: number;
    if (token === "(") { value = sum(); if (tokens[index++] !== ")") throw new CalcError("parentheses"); }
    else { if (!token || !/^(?:\d|\.)/.test(token)) throw new CalcError("incomplete"); value = Number(token); }
    while (tokens[index] === "%") { index++; value /= 100; }
    return finite(value);
  }
  function product(): number {
    let value = atom();
    while (tokens[index] === "*" || tokens[index] === "/") {
      const operator = tokens[index++]; const right = atom();
      if (operator === "/" && right === 0) throw new CalcError("divideByZero");
      value = finite(operator === "*" ? value * right : value / right);
    }
    return value;
  }
  function sum(): number {
    let value = product();
    while (tokens[index] === "+" || tokens[index] === "-") { const operator = tokens[index++]; const right = product(); value = finite(operator === "+" ? value + right : value - right); }
    return value;
  }
  const value = sum();
  if (index !== tokens.length) throw new CalcError("malformed");
  return finite(Number(value.toPrecision(15)));
}
