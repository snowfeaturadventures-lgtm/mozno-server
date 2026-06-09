import assert from "node:assert/strict";

const publicBlogQuery = { isPublished: true, isDeleted: { $ne: true } };

const matchesPublicBlogQuery = (blog) => {
  if (blog.isPublished !== publicBlogQuery.isPublished) return false;
  return blog.isDeleted !== true;
};

assert.equal(
  matchesPublicBlogQuery({ isPublished: true }),
  true,
  "published legacy blogs without isDeleted should be visible",
);

assert.equal(
  matchesPublicBlogQuery({ isPublished: true, isDeleted: false }),
  true,
  "published blogs with isDeleted false should be visible",
);

assert.equal(
  matchesPublicBlogQuery({ isPublished: true, isDeleted: true }),
  false,
  "explicitly deleted published blogs should remain hidden",
);

assert.equal(
  matchesPublicBlogQuery({ isPublished: false }),
  false,
  "draft legacy blogs should remain hidden from public reads",
);

console.log("Blog visibility filter examples passed");
