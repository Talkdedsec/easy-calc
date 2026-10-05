import test from "node:test";
import assert from "node:assert/strict";
import { calculate, evaluate, parseNumber } from "../src/lib/math.ts";
import { localeFormat } from "../src/lib/i18n.ts";
test("seven everyday calculations", () => {
  for (const [mode,a,b,expected] of [["percent",1000,20,200],["discount",1000,20,800],["increase",1000,20,1200],["ratio",250,1000,25],["change",1000,1250,25],["change",1000,750,-25],["vatAdd",1000,20,1200],["vatRemove",1200,20,1000]]) assert.equal(calculate(mode,a,b).value, expected);
});
test("VAT round trip for decimal rates", () => { for (const rate of [0,1,10,18,20,7.5]) assert.ok(Math.abs(calculate("vatRemove", calculate("vatAdd",123.45,rate).value,rate).value - 123.45) < 1e-10); });
test("boundaries and invalid amounts", () => {
  assert.equal(calculate("discount",50,100).value,0);
  assert.equal(calculate("percent",-50,20).value,-10);
  for (const [m,a,b] of [["ratio",1,0],["change",0,1],["change",-1,1],["discount",1,101],["vatAdd",1,-20],["increase",-1,20],["percent",Infinity,2]]) assert.throws(() => calculate(m,a,b));
});
test("precedence, parentheses, percent, negatives, decimals", () => {
  for (const [input,expected] of [["2+3*4",14],["(2+3)×4",20],["1000×20%",200],["1200÷1,2",1000],["-3*-2",6],["0,1+0,2",0.3],["2--3",5],["(50+50)%",1],["1e-7*10",0.000001]]) assert.equal(evaluate(input),expected);
});
test("reject incomplete, malformed or executable expressions", () => {
  for (const input of ["1/0","0/0","2+","(2+3","2**3","2(3)","1..2","alert(1)","1 2","", "9".repeat(201)]) assert.throws(() => evaluate(input));
});
test("Turkish number input and output", () => {
  assert.equal(parseNumber("12,5"),12.5); assert.equal(parseNumber("12.5"),12.5); assert.equal(localeFormat(1234.5,"tr"),"1.234,5");
  for (const value of ["1.234,56","1,2,3"," ","abc"]) assert.throws(() => parseNumber(value));
});
