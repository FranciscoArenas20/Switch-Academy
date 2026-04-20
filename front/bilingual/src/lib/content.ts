import type { LanguageContent } from "@/types/language";

export const content: Record<"en" | "fr" | "es", LanguageContent> = {
  en: {
    nav: {
      pages: "Pages",
      courses: "Courses",
      about: "About us",
      reviews: "Reviews",
      blog: "Blog",
      contact: "Contact",
      cta: "Start",
    },
    hero: {
      line1: "LEARN.",
      line2: "GROW.",
      line3: "SUCCEED.",
      subtitle:
        "Learn English from an industry expert and gain the skills to advance your career.",
      cta: "Explore courses",
    },
    stats: {
      students: { value: "8,000+", label: "Happy students" },
      access: { value: "24/7", label: "Learning access" },
      satisfaction: { value: "98%", label: "Satisfaction rate" },
      courses: { value: "56", label: "Online courses" },
    },
    platform: {
      title: "A PLATFORM DESIGNED FOR SUCCESS",
      subtitle: "English · Expert-led",
      description:
        "Our platform is designed to support your English learning journey and help you excel in your career with confidence.",
      cta: "See all courses",
      progress: "2/8 modules",
    },
    features: {
      expert: {
        title: "Expert-led learning",
        description:
          "Learn from experienced industry professionals who share practical, real-world insights.",
      },
      flexible: {
        title: "Flexible study options",
        description:
          "Access courses anytime and anywhere, giving you the freedom to learn at your own pace.",
      },
      global: {
        title: "Global networking",
        description:
          "Connect with global professionals, expanding your network and gaining diverse perspectives.",
      },
    },
  },

  fr: {
    nav: {
      pages: "Pages",
      courses: "Cours",
      about: "À propos",
      reviews: "Avis",
      blog: "Blog",
      contact: "Contact",
      cta: "Commencer",
    },
    hero: {
      line1: "APPRENDS.",
      line2: "ÉVOLUE.",
      line3: "RÉUSSIS.",
      subtitle:
        "Apprends le français avec un expert et acquiers les compétences pour faire avancer ta carrière.",
      cta: "Explorer les cours",
    },
    stats: {
      students: { value: "8 000+", label: "Étudiants satisfaits" },
      access: { value: "24/7", label: "Accès à l'apprentissage" },
      satisfaction: { value: "98%", label: "Taux de satisfaction" },
      courses: { value: "56", label: "Cours en ligne" },
    },
    platform: {
      title: "UNE PLATEFORME CONÇUE POUR RÉUSSIR",
      subtitle: "Français · Expert",
      description:
        "Notre plateforme est conçue pour soutenir ton apprentissage du français et t'aider à exceller dans ta carrière avec confiance.",
      cta: "Voir tous les cours",
      progress: "2/8 modules",
    },
    features: {
      expert: {
        title: "Apprentissage guidé",
        description:
          "Apprends avec des professionnels expérimentés qui partagent des insights concrets et pratiques.",
      },
      flexible: {
        title: "Études flexibles",
        description:
          "Accède aux cours à tout moment et de n'importe où, avec la liberté d'apprendre à ton rythme.",
      },
      global: {
        title: "Réseau mondial",
        description:
          "Connecte-toi avec des professionnels du monde entier, élargis ton réseau et gagne en perspectives.",
      },
    },
  },

  es: {
    nav: {
      pages: "Páginas",
      courses: "Cursos",
      about: "Sobre mí",
      reviews: "Reseñas",
      blog: "Blog",
      contact: "Contacto",
      cta: "Empezar",
    },
    hero: {
      line1: "APRENDE.",
      line2: "CRECE.",
      line3: "TRIUNFA.",
      subtitle:
        "Aprende inglés o francés con un experto y adquiere las habilidades para impulsar tu carrera.",
      cta: "Explorar cursos",
    },
    stats: {
      students: { value: "8.000+", label: "Estudiantes felices" },
      access: { value: "24/7", label: "Acceso al aprendizaje" },
      satisfaction: { value: "98%", label: "Tasa de satisfacción" },
      courses: { value: "56", label: "Cursos en línea" },
    },
    platform: {
      title: "UNA PLATAFORMA DISEÑADA PARA EL ÉXITO",
      subtitle: "Inglés & Francés · Experto",
      description:
        "Nuestra plataforma está diseñada para acompañarte en tu aprendizaje y ayudarte a destacar en tu carrera con confianza.",
      cta: "Ver todos los cursos",
      progress: "2/8 módulos",
    },
    features: {
      expert: {
        title: "Aprendizaje con expertos",
        description:
          "Aprende con profesionales experimentados que comparten conocimientos prácticos y del mundo real.",
      },
      flexible: {
        title: "Estudio flexible",
        description:
          "Accede a los cursos en cualquier momento y desde cualquier lugar, con la libertad de aprender a tu ritmo.",
      },
      global: {
        title: "Red global",
        description:
          "Conéctate con profesionales de todo el mundo, amplía tu red y gana nuevas perspectivas.",
      },
    },
  },
};
