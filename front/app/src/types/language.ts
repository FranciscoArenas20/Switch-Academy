export type Language = "en" | "fr" | "es" ;

export interface LanguageContent {
  // Navbar
  nav: {
  siteName: string,
  home: string,
  blog: string,
  about: string,
  courses: string,
  reviews: string,
  contact: string,
  info: string,
  cta: string,
};
  // Hero
  hero: {
    line1: string;
    line2: string;
    line3: string;
    subtitle: string;
    cta: string;
  };
  // Stats
  stats: {
    students: { value: string; label: string };
    access: { value: string; label: string };
    satisfaction: { value: string; label: string };
    courses: { value: string; label: string };
  };
  // Platform section
  platform: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    // progress: string;
  };
  // Features
  features: {
    title: string;
    expert: { title: string; description: string };
    flexible: { title: string; description: string };
    global: { title: string; description: string };
  };
  // Blog section
  blog: {
    title: string;
    subtitle: string;
  };
  // Reviews section
  reviewsSection: {
    title: string;
    subtitle: string;
  };
}
