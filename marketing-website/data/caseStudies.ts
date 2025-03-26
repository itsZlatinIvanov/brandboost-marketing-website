import React from 'react';
import { Users, Clock, TrendingUp, Award, BarChart } from 'lucide-react';
import { additionalCaseStudies } from './additionalCaseStudies';

export type Industry = 'all' | 'life' | 'business' | 'health' | 'career' | 'relationship' | 'fitness';
export type ResultType = 'all' | 'audience' | 'time' | 'engagement' | 'revenue';
export type IconType = 'users' | 'clock' | 'trending-up' | 'award' | 'bar-chart';

export type SocialPost = {
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';
  content: string;
  image?: string;
  engagement: {
    likes: number;
    comments: number;
    shares?: number;
  };
  date: string;
};

export type BeforeAfter = {
  before: {
    date: string;
    value: string;
    image?: string;
  };
  after: {
    date: string;
    value: string;
    image?: string;
  };
  metric: string; // e.g., "Followers", "Engagement Rate", etc.
};

export type Video = {
  title: string;
  thumbnail: string;
  embedUrl: string;
  duration?: string;
  views?: number;
};

export type MetricsData = {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
};

export interface CaseStudy {
  id: string;
  name: string;
  title: string;
  industry: Industry;
  resultType: ResultType;
  image: string;
  logo?: string;
  stats: {
    value: string;
    label: string;
    icon: IconType;
  }[];
  challenge: string;
  solution: string;
  results: string;
  quote: string;
  tags: string[];
  featured?: boolean;
  
  // Visual proof elements
  socialPosts?: SocialPost[];
  beforeAfter?: BeforeAfter[];
  videos?: Video[];
  websiteMetrics?: MetricsData[];
  socialMetrics?: MetricsData[];
  
  // Additional properties for testimonial view
  category?: 'coach' | 'consultant' | 'expert';
  avatarUrl?: string;
  beforeMetrics?: {
    followers: string;
    engagement: string;
    leads: string;
    timeSpent: string;
  };
  afterMetrics?: {
    followers: string;
    engagement: string;
    leads: string;
    timeSpent: string;
  };
  transformationTime?: string;
  afterBio?: string;
  featuredContent?: {
    type: 'image' | 'video';
    thumbnail: string;
    url: string;
    platform: 'instagram' | 'youtube' | 'tiktok';
  }[];
}

// Simplified testimonial structure for UI components that need less data
export interface Testimonial {
  id: number | string;
  name: string;
  role: string;
  image: string;
  content: string;
  isVideo?: boolean;
  videoLength?: string;
}

// Main case studies database - combined with additional case studies
export const caseStudies: CaseStudy[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    title: 'Life Coach & Bestselling Author',
    industry: 'life',
    resultType: 'audience',
    image: '/case-studies/sarah.jpg',
    logo: '/case-studies/sarah-logo.svg',
    avatarUrl: '/testimonials/sarah.jpg',
    category: 'coach',
    stats: [
      { value: '350%', label: 'Audience Growth', icon: 'users' },
      { value: '8hrs', label: 'Weekly Time Saved', icon: 'clock' },
      { value: '2.4x', label: 'Social Media Engagement', icon: 'trending-up' }
    ],
    challenge: 'Sarah had built a successful career as a life coach and published a bestselling book, but struggled to maintain a consistent content creation schedule while managing her growing client base. She needed to scale her online presence without sacrificing the quality of her coaching.',
    solution: 'We implemented a custom AI content strategy that captured Sarah\'s unique voice and coaching methodology. The system was trained on her book, past content, and coaching sessions to create authentic posts, newsletters, and video scripts that truly represented her philosophy.',
    results: 'Within 6 months, Sarah\'s audience grew by 350%. She reclaimed 8 hours per week previously spent on content creation, allowing her to take on 5 additional high-value clients. Her social media engagement more than doubled, and her newsletter open rate increased from 22% to 38%.',
    quote: "I went from struggling to post once a week to having a consistent content strategy that brings in 3-5 qualified leads every single day.",
    tags: ['life coaching', 'author', 'social media', 'newsletter'],
    featured: true,
    beforeMetrics: {
      followers: "850",
      engagement: "1.2%",
      leads: "2-3/month",
      timeSpent: "8 hrs/week"
    },
    afterMetrics: {
      followers: "18.5K",
      engagement: "4.7%",
      leads: "15-20/week",
      timeSpent: "1 hr/week"
    },
    transformationTime: "4 months",
    afterBio: "Life Coach | NYT Bestselling Author | Helping you unlock your true potential | Book a call 👇",
    
    // Visual proof elements
    socialPosts: [
      {
        platform: 'instagram',
        content: "The key to sustainable self-improvement isn't willpower—it's designing systems that make good habits inevitable. Here are 3 ways to design your environment for success...",
        image: '/case-studies/sarah-post1.jpg',
        engagement: {
          likes: 1243,
          comments: 87,
          shares: 56
        },
        date: '2023-06-15'
      },
      {
        platform: 'linkedin',
        content: "I'm excited to share my new framework for overcoming procrastination through mindfulness. This approach has helped my clients achieve 3x more in the same amount of time while experiencing less stress...",
        image: '/case-studies/sarah-post2.jpg',
        engagement: {
          likes: 872,
          comments: 43,
          shares: 28
        },
        date: '2023-07-22'
      }
    ],
    beforeAfter: [
      {
        metric: 'Instagram Followers',
        before: {
          date: 'January 2023',
          value: '5,600',
          image: '/case-studies/sarah-insta-before.jpg'
        },
        after: {
          date: 'July 2023',
          value: '19,600',
          image: '/case-studies/sarah-insta-after.jpg'
        }
      },
      {
        metric: 'Weekly Content Output',
        before: {
          date: 'January 2023',
          value: '2 posts',
          image: '/case-studies/sarah-content-before.jpg'
        },
        after: {
          date: 'July 2023',
          value: '10 posts',
          image: '/case-studies/sarah-content-after.jpg'
        }
      }
    ],
    featuredContent: [
      {
        type: 'image',
        thumbnail: "/testimonials/sarah-content-1.jpg",
        url: "https://instagram.com/example",
        platform: 'instagram'
      },
      {
        type: 'video',
        thumbnail: "/testimonials/sarah-content-2.jpg",
        url: "https://youtube.com/example",
        platform: 'youtube'
      }
    ]
  },
  {
    id: 'marcus-fernandez',
    name: 'Marcus Fernandez',
    title: 'Business Coach',
    industry: 'business',
    resultType: 'time',
    image: '/case-studies/marcus.jpg',
    logo: '/case-studies/marcus-logo.svg',
    avatarUrl: '/testimonials/mark.jpg',
    category: 'consultant',
    stats: [
      { value: '12hrs', label: 'Weekly Time Saved', icon: 'clock' },
      { value: '100%', label: 'Client Roster Increase', icon: 'users' },
      { value: '45%', label: 'Revenue Growth', icon: 'trending-up' }
    ],
    challenge: 'Marcus had hit a growth ceiling with his business coaching practice. He was spending up to 15 hours weekly creating content for social media, his blog, and his newsletter, which limited his ability to take on more clients.',
    solution: 'We developed an AI content ecosystem that integrated with Marcus\'s existing tools. The system was designed to produce strategic business insights in his voice across multiple platforms, while also creating personalized follow-up content for his clients.',
    results: 'Marcus reclaimed 12 hours per week, allowing him to double his client roster. His revenue increased by 45% within 4 months, and his content actually became more consistent and strategic as the AI system learned his coaching patterns.',
    quote: "My AI twin creates content while I sleep. I've doubled my client roster and now have a waiting list for the first time in my consulting career.",
    tags: ['business coaching', 'time management', 'scaling', 'revenue growth'],
    beforeMetrics: {
      followers: "2.1K",
      engagement: "0.8%",
      leads: "1-2/week",
      timeSpent: "10 hrs/week"
    },
    afterMetrics: {
      followers: "27K",
      engagement: "3.5%",
      leads: "8-10/week",
      timeSpent: "0 hrs/week"
    },
    transformationTime: "6 months",
    afterBio: "Business Growth Specialist | Helping 7-8 figure businesses scale | Weekly insights | Free strategy call 👇",
    featuredContent: [
      {
        type: 'video',
        thumbnail: "/testimonials/mark-content-1.jpg",
        url: "https://youtube.com/example",
        platform: 'youtube'
      }
    ]
  },
  {
    id: 'elena-petrova',
    name: 'Elena Petrova',
    title: 'Fitness Entrepreneur',
    industry: 'fitness',
    resultType: 'engagement',
    image: '/case-studies/elena.jpg',
    logo: '/case-studies/elena-logo.svg',
    avatarUrl: '/testimonials/elena.jpg',
    category: 'expert',
    stats: [
      { value: '215%', label: 'Engagement Increase', icon: 'trending-up' },
      { value: '320%', label: 'Lead Generation Growth', icon: 'users' },
      { value: '175%', label: 'Revenue Growth', icon: 'bar-chart' }
    ],
    challenge: 'Elena had built a successful local fitness studio but struggled to translate her in-person expertise to digital channels. Her content was inconsistent and failed to generate meaningful engagement or leads for her online programs.',
    solution: 'We developed a comprehensive AI avatar and content ecosystem that showcased her workout techniques, nutrition advice, and motivational content. The strategy included short-form videos, detailed guides, and personalized workout plans.',
    results: 'Within 5 months, Elena\'s social media engagement increased by 215%, while lead generation for her online programs grew by 320%. Her digital product revenue increased by 175%, allowing her to expand her team and launch a subscription-based fitness app.',
    quote: "My online presence now truly reflects my in-person energy and expertise. I'm reaching people across the globe while actually spending less time creating content.",
    tags: ['fitness', 'online coaching', 'digital products', 'social media growth'],
    featured: true,
    beforeMetrics: {
      followers: "3.2K",
      engagement: "1.5%",
      leads: "3-5/week",
      timeSpent: "12 hrs/week"
    },
    afterMetrics: {
      followers: "42K",
      engagement: "5.8%",
      leads: "25-30/week",
      timeSpent: "2 hrs/week"
    },
    transformationTime: "5 months",
    featuredContent: [
      {
        type: 'video',
        thumbnail: "/testimonials/elena-content-1.jpg",
        url: "https://instagram.com/elenafitness",
        platform: 'instagram'
      },
      {
        type: 'image',
        thumbnail: "/testimonials/elena-content-2.jpg",
        url: "https://instagram.com/elenafitness",
        platform: 'instagram'
      }
    ],
    socialPosts: [
      {
        platform: 'instagram',
        content: "The 5-minute core activation routine that changed everything for my clients. Try this before your next workout and feel the difference immediately...",
        image: '/case-studies/elena-post1.jpg',
        engagement: {
          likes: 3240,
          comments: 156,
          shares: 89
        },
        date: '2023-08-10'
      },
      {
        platform: 'tiktok',
        content: "3 protein myths that are sabotaging your fitness goals. The third one shocked even my most experienced clients!",
        image: '/case-studies/elena-post2.jpg',
        engagement: {
          likes: 15800,
          comments: 342,
          shares: 2100
        },
        date: '2023-09-05'
      }
    ],
    beforeAfter: [
      {
        metric: 'Weekly Sign-ups',
        before: {
          date: 'March 2023',
          value: '8-12',
          image: '/case-studies/elena-signups-before.jpg'
        },
        after: {
          date: 'August 2023',
          value: '40-55',
          image: '/case-studies/elena-signups-after.jpg'
        }
      },
      {
        metric: 'Content Engagement',
        before: {
          date: 'March 2023',
          value: '1.5%',
          image: '/case-studies/elena-engagement-before.jpg'
        },
        after: {
          date: 'August 2023',
          value: '5.8%',
          image: '/case-studies/elena-engagement-after.jpg'
        }
      }
    ],
    afterBio: "Fitness Expert | Online Coach | Helping women transform their bodies and minds | 5-Week Program 👇"
  },
  {
    id: 'james-peterson',
    name: 'James Peterson',
    title: 'Career Transition Coach',
    industry: 'career',
    resultType: 'revenue',
    image: '/case-studies/james.jpg',
    logo: '/case-studies/james-logo.svg',
    stats: [
      { value: '86%', label: 'Revenue Increase', icon: 'trending-up' },
      { value: '3x', label: 'Lead Generation', icon: 'users' },
      { value: '62%', label: 'Content Production Increase', icon: 'clock' }
    ],
    challenge: 'James specialized in helping professionals transition to new career paths, but his own content strategy was inconsistent. He knew his expertise could help more people, but he couldn\'t produce enough quality content to reach them effectively.',
    solution: 'We created a comprehensive AI content strategy focusing on LinkedIn and email marketing. The system generated in-depth career transition advice, success stories, and industry insights that positioned James as a thought leader in his field.',
    results: 'James saw an 86% increase in revenue within 5 months as his inbound leads tripled. His content production increased by 62% while requiring less of his direct input, and his LinkedIn following grew from 3,500 to over 15,000.',
    quote: "The ROI on this investment has been extraordinary. I'm reaching more people with more valuable content, and my business has completely transformed. The AI captures nuances in career advice that I didn't think was possible.",
    tags: ['career coaching', 'LinkedIn', 'thought leadership', 'revenue growth']
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    title: 'Financial Advisor',
    industry: 'business',
    resultType: 'revenue',
    image: '/case-studies/michael.jpg',
    logo: '/case-studies/michael-logo.svg',
    avatarUrl: '/testimonials/michael.jpg',
    category: 'expert',
    stats: [
      { value: '$200K+', label: 'New Business Generated', icon: 'trending-up' },
      { value: '1,150%', label: 'Follower Growth', icon: 'users' },
      { value: '0hrs', label: 'Time Spent Creating Content', icon: 'clock' }
    ],
    challenge: 'Michael was an experienced financial advisor with deep expertise but a minimal online presence. He needed a way to attract high-net-worth clients without taking time away from his existing client service.',
    solution: 'We developed an AI advisor that could articulate complex financial concepts in Michael\'s voice. The system was programmed to create educational content that demonstrated his expertise while addressing common financial planning challenges faced by his target audience.',
    results: 'Michael\'s following grew from 1.2K to 15K, and his content strategy directly generated over $200,000 in new business within 5 months. Most impressively, he achieved these results with zero hours spent personally creating content.',
    quote: "The ROI has been incredible. My content strategy has generated over $200K in new business while I spent exactly zero hours creating content myself.",
    tags: ['financial advisor', 'B2B', 'wealth management', 'passive revenue'],
    beforeMetrics: {
      followers: "1.2K",
      engagement: "0.5%",
      leads: "1-2/month",
      timeSpent: "5 hrs/week"
    },
    afterMetrics: {
      followers: "15K",
      engagement: "3.2%",
      leads: "10-12/month",
      timeSpent: "0 hrs/week"
    },
    transformationTime: "5 months",
    featuredContent: [
      {
        type: 'image',
        thumbnail: "/testimonials/michael-content-1.jpg",
        url: "https://instagram.com/example",
        platform: 'instagram'
      }
    ]
  },
  {
    id: 'jason-miller',
    name: 'Jason Miller',
    title: 'Fitness Expert & Coach',
    industry: 'health',
    resultType: 'engagement',
    image: '/case-studies/jason-miller.jpg',
    logo: '/case-studies/jason-miller-logo.svg',
    stats: [
      { value: '+115%', label: 'Follower Growth', icon: 'users' },
      { value: '8.7%', label: 'Engagement Rate', icon: 'trending-up' },
      { value: '+320%', label: 'Revenue Increase', icon: 'award' },
    ],
    challenge: "As a fitness coach with 10+ years of in-person training experience, I struggled to translate my expertise to social media. Despite creating regular content, my growth was stagnant at around 5K followers for over a year. My engagement was low, and I wasn't converting followers into clients for my online programs.",
    solution: "Clyc developed a comprehensive strategy focused on showcasing my unique training methodology through short-form educational content. They created a content calendar mixing workout demonstrations, nutrition tips, and client transformation stories. Their team handled everything from content planning to shooting guidance, editing, and optimized posting schedules.",
    results: "Within 90 days, my following more than doubled to 12K highly engaged followers. My engagement rate jumped from 2.3% to 8.7%, significantly above industry standards. Most importantly, I launched a premium 12-week transformation program priced at $997 that sold out all 20 spots within 48 hours of announcement, generating nearly $20,000 in revenue from a single post.",
    quote: "Your team's strategy completely transformed my social media presence. My following has doubled in 3 months, and I've been able to launch a high-ticket coaching program that sold out immediately.",
    tags: ['fitness', 'health', 'growth'],
    featured: true,
    socialPosts: [
      {
        platform: 'instagram',
        content: "The biggest mistake I see in weight loss journeys isn't diet or exercise choice - it's inconsistency. Here's my proven 3-step framework for turning fitness into a lifestyle rather than a temporary challenge...",
        image: '/case-studies/jason-fitness-post.jpg',
        date: 'June 12, 2023',
        engagement: {
          likes: 3245,
          comments: 212,
          shares: 89
        }
      },
      {
        platform: 'tiktok',
        content: "Stop wasting time with these 5 gym myths that are killing your gains! #fitnesscoach #gymtips",
        image: '/case-studies/jason-tiktok.jpg',
        date: 'May 28, 2023',
        engagement: {
          likes: 15678,
          comments: 432,
          shares: 2367
        }
      }
    ],
    beforeAfter: [
      {
        metric: 'Instagram Followers',
        before: {
          value: '5,234',
          date: 'March 2023',
          image: '/case-studies/jason-followers-before.jpg'
        },
        after: {
          value: '12,563',
          date: 'June 2023',
          image: '/case-studies/jason-followers-after.jpg'
        }
      },
      {
        metric: 'Weekly Content Views',
        before: {
          value: '10,450',
          date: 'March 2023'
        },
        after: {
          value: '147,890',
          date: 'June 2023'
        }
      }
    ],
    videos: [
      {
        title: 'How I Scaled My Fitness Business Using Social Media',
        thumbnail: '/case-studies/jason-video-thumbnail.jpg',
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '5:42',
        views: 28453
      }
    ],
    websiteMetrics: [
      {
        name: 'Website Visitors',
        value: '14,320',
        change: '+245% increase',
        isPositive: true
      },
      {
        name: 'Email Signups',
        value: '1,875',
        change: '+320% increase',
        isPositive: true
      },
      {
        name: 'Avg. Time on Site',
        value: '4:32',
        change: '+87% increase',
        isPositive: true
      }
    ],
    socialMetrics: [
      {
        name: 'Instagram Followers',
        value: '12.5K',
        change: '+140% growth',
        isPositive: true
      },
      {
        name: 'TikTok Followers',
        value: '34.8K',
        change: 'New platform',
        isPositive: true
      },
      {
        name: 'Engagement Rate',
        value: '8.7%',
        change: '+278% increase',
        isPositive: true
      },
      {
        name: 'Weekly Reach',
        value: '245K',
        change: '+430% increase',
        isPositive: true
      }
    ]
  },
  ...additionalCaseStudies
];

// Simplified testimonials for UI components that need less data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Coach",
    image: "/testimonials/sarah.jpg",
    content: "Working with this team has been transformative for my brand. In just 3 months, I've seen a 200% increase in engagement and gained over 15K followers organically.",
    isVideo: false,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Financial Advisor",
    image: "/testimonials/michael.jpg",
    content: "The AI-generated content looks incredibly natural. My audience can't tell the difference, and I've saved countless hours on filming and editing.",
    isVideo: true,
    videoLength: "2:15"
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Travel Blogger",
    image: "/testimonials/jessica.jpg",
    content: "I was skeptical about using AI for my content, but the results speak for themselves. My conversion rate has increased by 35% since implementing their strategy.",
    isVideo: false,
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Executive Coach",
    image: "/testimonials/david.jpg",
    content: "The content calendar they created for me has streamlined my entire workflow. I now have a consistent posting schedule that my audience loves.",
    isVideo: false,
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "Marketing Consultant",
    image: "/testimonials/emma.jpg",
    content: "From a struggling account to over 50K followers in 90 days. Their strategies are innovative and actually work in today's competitive landscape.",
    isVideo: true,
    videoLength: "3:40"
  },
  {
    id: 6,
    name: "Robert Kim",
    role: "Tech Entrepreneur",
    image: "/testimonials/robert.jpg",
    content: "The ROI has been phenomenal. For every dollar spent on their services, I've generated at least $5 in direct revenue from my social platforms.",
    isVideo: false,
  }
];

// Helper function to get case studies by category/type
export const getCaseStudiesByIndustry = (industry: Industry): CaseStudy[] => {
  if (industry === 'all') return caseStudies;
  return caseStudies.filter(study => study.industry === industry);
};

export const getCaseStudiesByResultType = (resultType: ResultType): CaseStudy[] => {
  if (resultType === 'all') return caseStudies;
  return caseStudies.filter(study => study.resultType === resultType);
};

export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter(study => study.featured);
};

// Helper function for testimonial format
export const getTransformationStories = (): CaseStudy[] => {
  return caseStudies.filter(study => study.category && study.beforeMetrics && study.afterMetrics);
};

export default caseStudies; 