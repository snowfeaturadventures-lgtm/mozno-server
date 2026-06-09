import assert from "node:assert/strict";
import {
  isDuplicateNewsletterEmailError,
  isValidNewsletterEmail,
  normalizeNewsletterEmail,
} from "../src/utils/newsletterValidation.js";

const validEmails = [
  "reader@example.com",
  "FIRST.LAST+news@sub.example.co",
  "  MixedCase@Example.COM  ",
];

const invalidEmails = [
  "",
  "plain-address",
  "missing-domain@",
  "@missing-local.com",
  "spaces are@invalid.com",
  `${"a".repeat(245)}@example.com`,
];

for (const email of validEmails) {
  assert.equal(isValidNewsletterEmail(email), true, `${email} should be valid`);
}

for (const email of invalidEmails) {
  assert.equal(isValidNewsletterEmail(email), false, `${email} should be invalid`);
}

assert.equal(
  normalizeNewsletterEmail("  Reader@Example.COM  "),
  "reader@example.com",
);

assert.equal(
  isDuplicateNewsletterEmailError({
    code: 11000,
    keyPattern: { email: 1 },
  }),
  true,
);

assert.equal(
  isDuplicateNewsletterEmailError({
    code: 11000,
    keyPattern: { slug: 1 },
  }),
  false,
);

console.log("Newsletter validation examples passed");
