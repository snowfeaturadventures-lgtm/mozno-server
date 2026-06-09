export const newsletterEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const normalizeNewsletterEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : "";

export const isValidNewsletterEmail = (email) => {
  const normalizedEmail = normalizeNewsletterEmail(email);

  return (
    normalizedEmail.length > 0 &&
    normalizedEmail.length <= 254 &&
    newsletterEmailPattern.test(normalizedEmail)
  );
};

export const isDuplicateNewsletterEmailError = (error) =>
  error?.code === 11000 &&
  (!error?.keyPattern || error.keyPattern.email === 1);
