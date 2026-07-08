export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  student_name: string;
  photo_url: string | null;
  text: string;
  language: string;
  created_at: string;
}
