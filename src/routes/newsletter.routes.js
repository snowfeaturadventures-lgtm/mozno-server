import { Router } from "express";
import { subscribeToNewsletter } from "../controllers/newsletter.controller.js";

const newsletterRouter = Router();

newsletterRouter.post("/subscribe", subscribeToNewsletter);

export default newsletterRouter;
