import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { getResponse } from "./main.ts";

Deno.test("getResponse - works for lowercase", () => {
  const message = getResponse("what do you want");
  assert(message !== null);
  assert(typeof message === "string");
});

Deno.test("getResponse - works for mixed case", () => {
  const message = getResponse("Anybody With Us");
  assert(message !== null);
  assert(typeof message === "string");
});

Deno.test("getResponse - works for uppercase", () => {
  const message = getResponse("HOW OLD ARE YOU");
  assert(message !== null);
  assert(typeof message === "string");
});

Deno.test("getResponse - works with question mark", () => {
  const message = getResponse("are you bored?");
  assertEquals(message, "Death");
});

Deno.test("getResponse - returns null for no matches", () => {
  const message = getResponse("reeeeee");
  assert(message === null);
});
