import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    subTitle: {
      type: String,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v),
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

blogSchema.index({ category: 1, isPublished: 1, createdAt: -1 });
blogSchema.index({ author: 1, createdAt: -1 });
blogSchema.index({ isPublished: 1, isDeleted: 1, createdAt: -1 });

blogSchema.pre("save", async function () {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
