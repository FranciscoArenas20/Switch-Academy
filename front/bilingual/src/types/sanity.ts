export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  mainImage: unknown | null;
  imageUrl: string | null;
  excerpt: string;
  body: string;
}

export interface SanityReview {
  _id: string;
  studentName: string;
  photo: unknown | null;
  photoUrl: string | null;
  text: string;
  language: string;
}
