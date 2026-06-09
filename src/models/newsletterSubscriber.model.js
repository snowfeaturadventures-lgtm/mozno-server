import mongoose from "mongoose";
import {
  isValidNewsletterEmail,
  normalizeNewsletterEmail,
} from "../utils/newsletterValidation.js";

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      set: normalizeNewsletterEmail,
      maxlength: 254,
      validate: {
        validator: isValidNewsletterEmail,
        message: "A valid email address is required",
      },
    },
    status: {
      type: String,
      enum: ["subscribed", "unsubscribed"],
      default: "subscribed",
      index: true,
    },
    source: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "website",
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

newsletterSubscriberSchema.index(
  { email: 1 },
  { unique: true, name: "newsletter_email_unique" },
);

const NewsletterSubscriber = mongoose.model(
  "NewsletterSubscriber",
  newsletterSubscriberSchema,
);

export default NewsletterSubscriber;
