import { Router } from "express";
import {
  addComments,
  getAllBlog,
  getCommentsByBlogId,
  getBlogBySlug,
  likeBlog,
  viewBlog,
} from "../controllers/blog.controller.js";


const blogRouter = Router();

blogRouter.get("/", getAllBlog);
blogRouter.get("/comments/:id", getCommentsByBlogId);
blogRouter.post("/add-comment", addComments);
blogRouter.post("/:blogId/like", likeBlog);
blogRouter.post("/:blogId/view", viewBlog);
blogRouter.get("/:slug", getBlogBySlug);

export default blogRouter;
