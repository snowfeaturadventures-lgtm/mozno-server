import NewsletterSubscriber from "../models/newsletterSubscriber.model.js";
import {
  isDuplicateNewsletterEmailError,
  isValidNewsletterEmail,
  normalizeNewsletterEmail,
} from "../utils/newsletterValidation.js";

export const createNewsletterSubscription = async ({
  email,
  source,
  ipAddress,
  userAgent,
}) => {
  const normalizedEmail = normalizeNewsletterEmail(email);

  if (!isValidNewsletterEmail(normalizedEmail)) {
    const error = new Error("A valid email address is required");
    error.statusCode = 400;
    throw error;
  }

  try {
    const subscriber = await NewsletterSubscriber.create({
      email: normalizedEmail,
      source: typeof source === "string" && source.trim() ? source.trim() : "website",
      ipAddress,
      userAgent,
    });

    return subscriber;
  } catch (error) {
    if (isDuplicateNewsletterEmailError(error)) {
      const duplicateError = new Error("Email is already subscribed");
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    if (error?.name === "ValidationError") {
      const validationError = new Error("A valid email address is required");
      validationError.statusCode = 400;
      throw validationError;
    }

    throw error;
  }
};
