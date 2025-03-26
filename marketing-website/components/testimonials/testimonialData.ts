export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  isVideo: boolean;
  videoLength?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Собственик на онлайн магазин",
    image: "/placeholder.svg",
    content: "Работата с този екип преобрази моя бранд. Само за 3 месеца видях 200% увеличение на ангажираността и спечелих над 15 хиляди последователи по органичен път.",
    isVideo: false,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Финансов консултант",
    image: "/placeholder.svg",
    content: "Създаденото съдържание изглежда изключително професионално. Моята аудитория го харесва, а аз спестих безброй часове за планиране и създаване на публикации.",
    isVideo: true,
    videoLength: "2:15"
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Травел блогър",
    image: "/placeholder.svg",
    content: "Бях скептично настроена за използването на социални медии за моя бизнес, но резултатите говорят сами за себе си. Степента ми на конверсия се увеличи с 35% след прилагането на тяхната стратегия.",
    isVideo: false,
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Бизнес коуч",
    image: "/placeholder.svg",
    content: "Календарът за съдържание, който създадоха за мен, оптимизира целия ми работен процес. Сега имам последователен график за публикуване, който моята аудитория обожава.",
    isVideo: false,
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "Маркетинг консултант",
    image: "/placeholder.svg",
    content: "От затруднен профил до над 50 хиляди последователи за 90 дни. Техните стратегии са иновативни и реално работят в днешния конкурентен пейзаж.",
    isVideo: true,
    videoLength: "3:40"
  },
  {
    id: 6,
    name: "Robert Kim",
    role: "Технологичен предприемач",
    image: "/placeholder.svg",
    content: "Възвръщаемостта на инвестицията беше феноменална. За всеки похарчен лев за техните услуги, генерирах поне 5 лева директни приходи от социалните ми платформи.",
    isVideo: false,
  },
];
