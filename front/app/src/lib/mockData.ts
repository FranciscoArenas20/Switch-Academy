export interface BlogPost {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  photo: string;
  text: string;
  language: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&fit=crop",
    title: "5 Tips to Master English Quickly",
    excerpt:
      "Practical strategies to accelerate your English learning journey and start speaking with confidence.",
    description:
      "Learning English can feel overwhelming, but with the right approach you can make rapid progress. Start by setting clear, measurable goals — whether that is holding a five-minute conversation or passing a specific exam. Consistency matters more than intensity: studying for twenty minutes daily beats cramming for hours once a week.\n\nImmerse yourself in the language outside of class. Change your phone settings to English, listen to podcasts during your commute, and watch series with English subtitles. The key is to make English a natural part of your daily routine rather than a chore.\n\nPractice speaking from day one. Many learners wait until they feel ready, but the truth is you will never feel ready. Record yourself, talk to yourself in the mirror, or join conversation groups. Mistakes are not failures — they are evidence that you are pushing your boundaries.\n\nFinally, find a study partner or mentor who can give you honest feedback. A good teacher will correct your errors and, more importantly, explain why they are errors so you internalise the rule instead of just memorising it.",
  },
  {
    id: "b2",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80&fit=crop",
    title: "French for Beginners: Where to Start",
    excerpt:
      "A complete roadmap for absolute beginners who want to learn French from scratch.",
    description:
      "Starting French from zero can be intimidating, but the language is more approachable than you think. Begin with pronunciation — French sounds are consistent once you learn the rules. Master the vowels and the infamous 'r' sound first; everything else builds on that foundation.\n\nBuild a core vocabulary of the most frequent words. Focus on high-frequency verbs like être, avoir, aller, and faire, plus everyday nouns and phrases. You do not need to know every word to communicate — you need the right words.\n\nGrammar is where most beginners get stuck, but it does not have to be that way. Learn one tense at a time. Start with the present tense and get comfortable forming simple sentences before moving to the past or future. Drill conjugation patterns until they become automatic.\n\nFind content that matches your level. Children's books, news in slow French, and beginner podcasts are excellent resources. Read along while you listen to connect the written and spoken forms. Above all, be patient with yourself — every fluent speaker was once a beginner.",
  },
  {
    id: "b3",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80&fit=crop",
    title: "Why Being Bilingual Changes Your Brain",
    excerpt:
      "Discover the cognitive benefits of bilingualism and how learning a new language reshapes your mind.",
    description:
      "Speaking more than one language does more than help you order coffee in another country — it physically reshapes your brain. Studies show that bilinguals have denser grey matter in regions responsible for executive control, attention, and task-switching.\n\nOne of the most significant benefits is enhanced cognitive reserve. As you age, a bilingual brain can better withstand neurological damage because it has built alternative neural pathways. Bilingualism has been linked to later onset of dementia and Alzheimer's disease.\n\nBilinguals also develop superior metalinguistic awareness — the ability to think about language as a system. This makes learning additional languages easier over time. Each new language you learn builds on the cognitive infrastructure created by the previous one.\n\nBeyond the science, bilingualism shapes how you see the world. Each language carries its own cultural logic and way of expressing ideas. Switching between languages gives you multiple perspectives, making you more flexible in your thinking and more empathetic in your interactions.",
  },
  {
    id: "b4",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80&fit=crop",
    title: "Common English Mistakes and How to Fix Them",
    excerpt:
      "Avoid the most frequent pitfalls English learners face and improve your accuracy overnight.",
    description:
      "Even advanced English learners make the same handful of mistakes. Recognising them is the first step to eliminating them. Here are the most common ones and how to fix them for good.\n\nPrepositions are notoriously tricky. We say 'interested in', not 'interested on'; 'depend on', not 'depend of'; 'good at', not 'good in'. The only reliable way to master them is to learn each verb together with its preposition as a single unit rather than memorising lists.\n\nConditional sentences trip up many learners. The first conditional uses 'if + present, will + base verb' for real possibilities. The second uses 'if + past, would + base verb' for unreal situations. Mixing them up changes the meaning entirely.\n\nFalse friends are another trap. 'Actually' does not mean 'currently' — it means 'in fact'. 'Sensible' does not mean 'sensitive' — it means 'reasonable'. Keep a personal list of false friends and review it regularly.\n\nThe best way to eliminate errors is to keep a mistake journal. Write down every correction your teacher gives you, review it weekly, and actively use the correct form in your next conversation. Awareness alone is not enough — you need deliberate practice.",
  },
  {
    id: "b5",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&fit=crop",
    title: "French Culture: More Than Just the Language",
    excerpt:
      "Immerse yourself in French culture to truly understand the language and speak it naturally.",
    description:
      "Learning French is not just about memorising vocabulary and conjugating verbs — it is about understanding the culture that shapes the language. French is deeply tied to its cultural context, and grasping that context will make you a more natural speaker.\n\nPoliteness in French goes beyond saying 'merci'. The language has a formal 'vous' and an informal 'tu', and choosing the wrong one can feel like a social misstep. When in doubt, use 'vous' until the other person invites you to switch. This cultural rule is as important as any grammar rule.\n\nFrench people value articulation and debate. Conversations are not just exchanges of information — they are intellectual exercises. Do not be surprised if a simple discussion turns into a passionate argument. This is not aggression; it is engagement. Learn to hold your ground and express your opinions clearly.\n\nFood and meals are central to French identity. Knowing how to talk about food, how to order properly, and the etiquette of a French meal will open doors socially. The French appreciate when foreigners make an effort to understand their customs, and they reward that effort with warmth and generosity.",
  },
  {
    id: "b6",
    image:
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=600&q=80&fit=crop",
    title: "From Beginner to Fluent: A Realistic Timeline",
    excerpt:
      "What to expect at each stage of language learning and how to stay motivated along the way.",
    description:
      "One of the most common questions language learners ask is: how long will it take to become fluent? The honest answer is that it depends on your starting language, the language you are learning, and how much time you can dedicate. But a realistic roadmap can help set expectations.\n\nMonths one to three — the foundation phase. You learn basic greetings, the present tense of common verbs, and enough vocabulary to introduce yourself and ask simple questions. At this stage, focus on pronunciation and listening. You will understand very little, and that is normal.\n\nMonths four to nine — the expansion phase. Your vocabulary grows to around a thousand words. You start understanding short conversations and can form more complex sentences. This is often the most discouraging period because you know enough to realise how much you do not know. Push through it.\n\nMonths ten to eighteen — the conversation phase. You can hold extended conversations on familiar topics. You make mistakes, but people understand you. Start consuming native content — news, films, podcasts — without subtitles. This is where fluency begins to feel attainable.\n\nMonth eighteen onwards — the refinement phase. You can express nuanced ideas, understand humour, and follow fast speech. From here, fluency becomes a matter of vocabulary breadth and cultural depth rather than grammar and basic communication. Congratulations — you are now bilingual.",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Maria García",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80&fit=crop&crop=face",
    text: "Thanks to Alex, I finally gained the confidence to speak English at work. The personalized approach made all the difference.",
    language: "English",
  },
  {
    id: "r2",
    name: "Pierre Dubois",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&fit=crop&crop=face",
    text: "I never thought I could learn English, but Alex's patient teaching style and structured lessons made it possible.",
    language: "English",
  },
  {
    id: "r3",
    name: "Ana Sánchez",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&fit=crop&crop=face",
    text: "Learning French with Switch Academy was an incredible experience. I can now hold conversations with native speakers!",
    language: "French",
  },
  {
    id: "r4",
    name: "James Wilson",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80&fit=crop&crop=face",
    text: "The structured approach and constant feedback helped me improve my English faster than I ever imagined possible.",
    language: "English",
  },
  {
    id: "r5",
    name: "Lucía Romero",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&fit=crop&crop=face",
    text: "I always dreamed of speaking French, and now I can! The immersive techniques Alex uses are truly effective.",
    language: "French",
  },
  {
    id: "r6",
    name: "Ahmed Karim",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&fit=crop&crop=face",
    text: "Professional, patient, and effective. Every lesson was tailored to my needs. Best decision I ever made.",
    language: "English",
  },
];
