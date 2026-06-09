import { createNewsletterSubscription } from "../services/newsletter.service.js";

export const subscribeToNewsletter = async (req, res) => {
  try {
    const subscriber = await createNewsletterSubscription({
      email: req.body?.email,
      source: req.body?.source,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") || null,
    });

    return res.status(201).json({
      success: true,
      message: "Newsletter subscription created successfully",
      subscriber: {
        id: subscriber._id,
        email: subscriber.email,
        status: subscriber.status,
        source: subscriber.source,
        createdAt: subscriber.createdAt,
      },
    });
  } catch (error) {
    console.error("Newsletter Subscribe Error:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal server error",
    });
  }
};
