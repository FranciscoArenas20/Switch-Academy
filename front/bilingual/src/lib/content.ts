import type { LanguageContent } from "@/types/language";

export const content: Record<"en" | "fr" | "es", LanguageContent> = {
  en: {
    nav: {
  home: "Home",
  updates: "Updates",
  about: "About",
  courses: "Courses",
  reviews: "Reviews",
  contact: "Contact",
  info: "Info",
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
      title: "About me",
      subtitle: "English · Expert",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      cta: "Contact me",
      // progress: "2/8 modules",
    },
    features: {
      expert: {
        title: "Regular Courses",
        description:
          "Progress through levels, from basic to expert in the language of your choice.",
      },
      flexible: {
        title: "Certifications",
        description:
          "Get advice and prepare for the language certificate you want to obtain.",
      },
      global: {
        title: "Others",
        description:
          "Contact me and let's develop a specialized learning process for you.",
      },
    },
  },

  fr: {
    nav: {
  home: "Accueil",
  updates: "Actualités",
  about: "À propos",
  courses: "Cours",
  reviews: "Avis",
  contact: "Contact",
  info: "Info",
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
      title: "Sur moi",
      subtitle: "Français · Expert",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      cta: "contactez-moi",
      // progress: "2/8 modules",
    },
    features: {
      expert: {
        title: "Cours réguliers",
        description:
          "Progressez à travers les niveaux, du débutant à l'expert, dans la langue de votre choix.",
      },
      flexible: {
        title: "Certifications",
        description:
          "Obtenez des conseils et préparez-vous à la certification linguistique que vous souhaitez obtenir.",
      },
      global: {
        title: "Autres",
        description:
          "Contactez-moi et élaborons ensemble un programme d'apprentissage personnalisé.",
      },
    },
  },

  es: {
    nav: {
  home: "Inicio",
  updates: "Novedades",
  about: "Sobre mí",
  courses: "Cursos",
  reviews: "Reseñas",
  contact: "Contacto",
  info: "Info",
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
      title: "Sobre mí",
      subtitle: "Español · Nativo",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      cta: "Contactame",
      // progress: "2/8 módulos",
    },
    features: {
      expert: {
        title: "Cursos Regulares",
        description:
          "Avanza mediante niveles, desde basico hasta experto en el idioma de tu preferencia.",
      },
      flexible: {
        title: "Certificaciones",
        description:
          "Recibe asesoria y preparate para el certificado de idiomas que deseas obtener",
      },
      global: {
        title: "Otros",
        description:
          "Contactame y desarrollemos un proceso de aprendizaje especializado para tí.",
      },
    },
  },
};
