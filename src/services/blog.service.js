import mongoose from "mongoose";
import Blog from "../models/blog.model.js";

const publicBlogQuery = { isPublished: true, isDeleted: { $ne: true } };
const countProjection = "_id likes views";

export const blogAuthorSelect = "firstName lastName email avatar role";

export const validateBlogId = (blogId) =>
  Boolean(blogId && mongoose.Types.ObjectId.isValid(blogId));

export const incrementBlogLikeCount = async (blogId) => {
  if (!validateBlogId(blogId)) {
    const error = new Error("Invalid Blog ID format");
    error.statusCode = 400;
    throw error;
  }

  const blog = await Blog.findOneAndUpdate(
    { _id: blogId, ...publicBlogQuery },
    { $inc: { likes: 1 } },
    { new: true, projection: countProjection },
  );

  if (!blog) {
    const error = new Error("Blog not found or not published");
    error.statusCode = 404;
    throw error;
  }

  return {
    blogId: blog._id,
    likes: blog.likes,
    views: blog.views,
  };
};

export const incrementBlogViewCount = async (blogId) => {
  if (!validateBlogId(blogId)) {
    const error = new Error("Invalid Blog ID format");
    error.statusCode = 400;
    throw error;
  }

  const blog = await Blog.findOneAndUpdate(
    { _id: blogId, ...publicBlogQuery },
    { $inc: { views: 1 } },
    { new: true, projection: countProjection },
  );

  if (!blog) {
    const error = new Error("Blog not found or not published");
    error.statusCode = 404;
    throw error;
  }

  return {
    blogId: blog._id,
    likes: blog.likes,
    views: blog.views,
  };
};
