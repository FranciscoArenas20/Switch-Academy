import { defineQuery } from "next-sanity";

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)]
  | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    imageUrl,
    excerpt,
    body
  }
`);

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    imageUrl,
    excerpt,
    body
  }
`);

export const OTHER_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current != $slug && defined(slug.current)]
  | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    imageUrl
  }
`);

export const REVIEWS_QUERY = defineQuery(`
  *[_type == "review"]
  | order(_createdAt desc) {
    _id,
    studentName,
    photo,
    photoUrl,
    text,
    language
  }
`);
