import { supabaseAdmin } from "./supabaseAdmin";
import type { BlogPost, Review } from "@/types";

export async function createPost(post: {
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  image_url?: string;
}): Promise<BlogPost | null> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .insert(post)
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    return null;
  }

  return data;
}

export async function updatePost(
  id: string,
  updates: Partial<{
    slug: string;
    title: string;
    excerpt: string;
    description: string;
    image_url: string;
  }>
): Promise<BlogPost | null> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating post:", error);
    return null;
  }

  return data;
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting post:", error);
    return false;
  }

  return true;
}

export async function createReview(review: {
  student_name: string;
  photo_url?: string;
  text: string;
  language: string;
}): Promise<Review | null> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .insert(review)
    .select()
    .single();

  if (error) {
    console.error("Error creating review:", error);
    return null;
  }

  return data;
}

export async function updateReview(
  id: string,
  updates: Partial<{
    student_name: string;
    photo_url: string;
    text: string;
    language: string;
  }>
): Promise<Review | null> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating review:", error);
    return null;
  }

  return data;
}

export async function deleteReview(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting review:", error);
    return false;
  }

  return true;
}
