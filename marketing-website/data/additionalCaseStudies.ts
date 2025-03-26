import { CaseStudy, IconType } from './caseStudies';
import { Users, Clock, TrendingUp, Award, BarChart } from 'lucide-react';

// Additional case studies to test our scalable gallery
export const additionalCaseStudies: CaseStudy[] = [
  {
    id: 'jennifer-adams',
    name: 'Jennifer Adams',
    title: 'Mindfulness & Meditation Coach',
    industry: 'life',
    resultType: 'engagement',
    image: '/case-studies/jennifer.jpg',
    logo: '/case-studies/jennifer-logo.svg',
    avatarUrl: '/testimonials/jennifer.jpg',
    category: 'coach',
    stats: [
      { value: '210%', label: 'Engagement Growth', icon: 'trending-up' },
      { value: '7hrs', label: 'Weekly Time Saved', icon: 'clock' },
      { value: '3.5x', label: 'Community Growth', icon: 'users' }
    ],
    challenge: 'Jennifer had been teaching mindfulness and meditation for over 5 years but struggled to scale her impact beyond in-person workshops. Her social media presence was minimal, inconsistent, and failed to capture the essence of her teaching style.',
    solution: 'We created an AI twin that captured her unique approach to mindfulness and developed a content strategy focusing on short-form educational content across Instagram and TikTok, coupled with deeper newsletter insights.',
    results: 'Jennifer\'s engagement increased by 210% within 4 months. Her email list grew from 450 to 3,200 subscribers, and she launched her first digital program that generated $45,000 in its initial release.',
    quote: "The AI content strategy completely transformed my business. I'm reaching people globally now, and the time saved lets me focus on creating premium course material.",
    tags: ['mindfulness', 'meditation', 'wellness', 'personal growth'],
    transformationTime: "4 months",
    beforeMetrics: {
      followers: "1.2K",
      engagement: "1.4%",
      leads: "5-8/month",
      timeSpent: "12 hrs/week"
    },
    afterMetrics: {
      followers: "18K",
      engagement: "5.2%",
      leads: "40-50/month",
      timeSpent: "5 hrs/week"
    }
  },
  {
    id: 'robert-chen',
    name: 'Robert Chen',
    title: 'Executive Leadership Coach',
    industry: 'business',
    resultType: 'revenue',
    image: '/case-studies/robert.jpg',
    logo: '/case-studies/robert-logo.svg',
    avatarUrl: '/testimonials/robert.jpg',
    category: 'consultant',
    stats: [
      { value: '135%', label: 'Revenue Increase', icon: 'trending-up' },
      { value: '10+', label: 'Enterprise Clients', icon: 'users' },
      { value: '8hrs', label: 'Weekly Time Saved', icon: 'clock' }
    ],
    challenge: 'Robert was a highly respected executive coach with Fortune 500 experience, but his online presence didn\'t reflect his expertise. He struggled to consistently create content while managing his high-touch client relationships.',
    solution: 'We developed a LinkedIn-focused content strategy powered by AI that showcased his leadership insights, combined with a weekly newsletter that expanded on trending business topics.',
    results: 'Robert saw a 135% increase in revenue within 6 months as his thought leadership content attracted enterprise clients. His LinkedIn following grew from 2,800 to over 25,000, and he secured a book deal based on his content.',
    quote: "The ROI has been extraordinary. I'm now seen as a thought leader in my space, and clients are coming to me instead of the other way around.",
    tags: ['executive coaching', 'leadership', 'business strategy', 'corporate'],
    featured: true,
    transformationTime: "6 months",
    beforeMetrics: {
      followers: "2.8K",
      engagement: "0.9%",
      leads: "2-3/month",
      timeSpent: "10 hrs/week"
    },
    afterMetrics: {
      followers: "25K",
      engagement: "3.8%",
      leads: "15-20/month",
      timeSpent: "2 hrs/week"
    }
  },
  {
    id: 'sophia-williams',
    name: 'Sophia Williams',
    title: 'Relationship & Dating Coach',
    industry: 'relationship',
    resultType: 'audience',
    image: '/case-studies/sophia.jpg',
    logo: '/case-studies/sophia-logo.svg',
    avatarUrl: '/testimonials/sophia.jpg',
    category: 'coach',
    stats: [
      { value: '425%', label: 'Audience Growth', icon: 'users' },
      { value: '6.2%', label: 'Engagement Rate', icon: 'trending-up' },
      { value: '9hrs', label: 'Weekly Time Saved', icon: 'clock' }
    ],
    challenge: 'Sophia had valuable insights on modern relationships but struggled with the consistency needed to build an audience. Sharing personal relationship advice required a delicate touch that was hard to delegate to traditional content creators.',
    solution: 'We implemented an AI twin that captured her empathetic coaching style and created a multi-platform strategy spanning Instagram, TikTok, and a podcast to reach different segments of her audience.',
    results: 'Within 5 months, Sophia\'s following grew by 425%. Her coaching program waitlist reached 200+ people, and she launched a membership community that generated recurring revenue of $12,000/month.',
    quote: "I was amazed at how the AI captured my voice and approach to sensitive relationship topics. My audience grew exponentially while I focused on high-value coaching.",
    tags: ['relationship coaching', 'dating advice', 'personal growth', 'women empowerment'],
    transformationTime: "5 months",
    beforeMetrics: {
      followers: "3.2K",
      engagement: "1.8%",
      leads: "3-5/month",
      timeSpent: "15 hrs/week"
    },
    afterMetrics: {
      followers: "16.8K",
      engagement: "6.2%",
      leads: "30-40/month",
      timeSpent: "6 hrs/week"
    }
  },
  {
    id: 'david-thompson',
    name: 'David Thompson',
    title: 'Business Growth Strategist',
    industry: 'business',
    resultType: 'time',
    image: '/case-studies/david.jpg',
    logo: '/case-studies/david-logo.svg',
    avatarUrl: '/testimonials/david.jpg',
    category: 'consultant',
    stats: [
      { value: '15hrs', label: 'Weekly Time Saved', icon: 'clock' },
      { value: '2.5x', label: 'Client Capacity', icon: 'users' },
      { value: '92%', label: 'Referral Increase', icon: 'trending-up' }
    ],
    challenge: 'David was spending 20+ hours weekly on content creation, client outreach, and followup, limiting his ability to take on more clients and scale his business growth consultancy.',
    solution: 'We implemented an AI system that handled both his content creation and client communication workflows, generating personalized follow-ups and resources based on his methodology.',
    results: 'David reclaimed 15 hours per week, allowing him to increase his client capacity by 150%. His referral rate increased by 92% as clients received more consistent value and touchpoints.',
    quote: "The time savings alone justified the investment, but the increase in client satisfaction and referrals was the real game-changer for my practice.",
    tags: ['business strategy', 'time management', 'scaling', 'efficiency'],
    transformationTime: "3 months",
    beforeMetrics: {
      followers: "5.5K",
      engagement: "1.2%",
      leads: "5-8/month",
      timeSpent: "20 hrs/week"
    },
    afterMetrics: {
      followers: "12K",
      engagement: "3.4%",
      leads: "15-20/month",
      timeSpent: "5 hrs/week"
    }
  },
  {
    id: 'maria-rodriguez',
    name: 'Maria Rodriguez',
    title: 'Nutritionist & Health Coach',
    industry: 'health',
    resultType: 'engagement',
    image: '/case-studies/maria.jpg',
    logo: '/case-studies/maria-logo.svg',
    avatarUrl: '/testimonials/maria.jpg',
    category: 'coach',
    stats: [
      { value: '8.4%', label: 'Engagement Rate', icon: 'trending-up' },
      { value: '300%', label: 'Program Sales', icon: 'award' },
      { value: '10hrs', label: 'Weekly Time Saved', icon: 'clock' }
    ],
    challenge: 'Maria had extensive nutrition knowledge but struggled to translate it into engaging social media content. Her posts were too technical and failed to build emotional connections with her audience.',
    solution: 'We developed an AI content strategy that simplified complex nutritional concepts into accessible, engaging content that addressed common pain points while maintaining scientific accuracy.',
    results: 'Maria\'s engagement rate soared to 8.4%, and sales of her nutrition programs increased by 300%. She was invited to speak at major health conferences and secured a monthly nutrition column in a national magazine.',
    quote: "The strategy transformed my approach to communication. Complex nutrition topics now connect with people emotionally while remaining scientifically sound.",
    tags: ['nutrition', 'health coaching', 'wellness', 'healthy eating'],
    featured: true,
    transformationTime: "4 months",
    beforeMetrics: {
      followers: "7.2K",
      engagement: "1.9%",
      leads: "8-12/month",
      timeSpent: "18 hrs/week"
    },
    afterMetrics: {
      followers: "32K",
      engagement: "8.4%",
      leads: "50-60/month",
      timeSpent: "8 hrs/week"
    }
  },
  {
    id: 'jonathan-lee',
    name: 'Jonathan Lee',
    title: 'Career Transition Coach',
    industry: 'career',
    resultType: 'revenue',
    image: '/case-studies/jonathan.jpg',
    logo: '/case-studies/jonathan-logo.svg',
    avatarUrl: '/testimonials/jonathan.jpg',
    category: 'coach',
    stats: [
      { value: '210%', label: 'Revenue Increase', icon: 'trending-up' },
      { value: '4.3x', label: 'Conversion Rate', icon: 'award' },
      { value: '9hrs', label: 'Weekly Time Saved', icon: 'clock' }
    ],
    challenge: 'Jonathan had a successful career helping professionals transition into tech roles, but his online presence wasn\'t generating enough leads to scale his business beyond one-on-one coaching.',
    solution: 'We created a multi-platform content strategy focusing on LinkedIn and YouTube that showcased his career transition framework while implementing a lead nurturing system with personalized AI responses.',
    results: 'Jonathan\'s business revenue increased by 210% in 5 months. His lead-to-client conversion rate quadrupled, and he was able to launch a group coaching program that generated $125,000 in its first cohort.',
    quote: "The content strategy completely transformed my business model from one-on-one coaching to scalable programs without sacrificing the quality of my guidance.",
    tags: ['career coaching', 'professional development', 'tech careers', 'job transitions'],
    transformationTime: "5 months",
    beforeMetrics: {
      followers: "4.5K",
      engagement: "1.6%",
      leads: "10-15/month",
      timeSpent: "14 hrs/week"
    },
    afterMetrics: {
      followers: "22K",
      engagement: "4.8%",
      leads: "45-60/month",
      timeSpent: "5 hrs/week"
    }
  },
  {
    id: 'amanda-jackson',
    name: 'Amanda Jackson',
    title: 'Fitness & Lifestyle Coach',
    industry: 'health',
    resultType: 'audience',
    image: '/case-studies/amanda.jpg',
    logo: '/case-studies/amanda-logo.svg',
    avatarUrl: '/testimonials/amanda.jpg',
    category: 'coach',
    stats: [
      { value: '380%', label: 'Audience Growth', icon: 'users' },
      { value: '7.5%', label: 'Engagement Rate', icon: 'trending-up' },
      { value: '11hrs', label: 'Weekly Time Saved', icon: 'clock' }
    ],
    challenge: 'Amanda had a small but dedicated following for her fitness content but couldn\'t scale her reach due to inconsistent posting and lack of a coherent content strategy across platforms.',
    solution: 'We implemented an AI-powered content system that maintained her authentic voice while creating platform-specific content for Instagram, TikTok, and YouTube that highlighted her unique training approach.',
    results: 'Amanda\'s audience grew by 380% in just 4 months. Her fitness app subscriptions increased from 200 to 1,800 users, and she secured a major activewear sponsorship worth $45,000 annually.',
    quote: "The consistency and quality of content completely transformed my brand. I'm reaching people I never could have reached on my own while focusing on creating new fitness programs.",
    tags: ['fitness', 'lifestyle', 'workout programs', 'healthy living'],
    transformationTime: "4 months",
    beforeMetrics: {
      followers: "8.5K",
      engagement: "2.2%",
      leads: "15-20/month",
      timeSpent: "20 hrs/week"
    },
    afterMetrics: {
      followers: "40.8K",
      engagement: "7.5%",
      leads: "100-120/month",
      timeSpent: "9 hrs/week"
    }
  },
  {
    id: 'michael-davis',
    name: 'Michael Davis',
    title: 'Sales Strategy Consultant',
    industry: 'business',
    resultType: 'time',
    image: '/case-studies/michael.jpg',
    logo: '/case-studies/michael-logo.svg',
    avatarUrl: '/testimonials/michael.jpg',
    category: 'consultant',
    stats: [
      { value: '16hrs', label: 'Weekly Time Saved', icon: 'clock' },
      { value: '75%', label: 'Lead Quality Increase', icon: 'award' },
      { value: '190%', label: 'Conversion Rate', icon: 'trending-up' }
    ],
    challenge: 'Michael was spending most of his week creating sales training content and managing outreach, leaving little time for high-value client strategy sessions and developing new offerings.',
    solution: 'We created an AI system that generated customized sales training content based on his methodology and implemented an automated lead qualification system that prioritized high-potential clients.',
    results: 'Michael reclaimed 16 hours weekly, while lead quality improved by 75%. His conversion rate nearly doubled, and he was able to develop and launch two new service offerings that expanded his business model.',
    quote: "The time savings were immediate, but the real value was in how the AI learned to qualify leads. I'm now spending my time exclusively with clients who are ready to implement my strategies.",
    tags: ['sales strategy', 'business development', 'time management', 'lead generation'],
    transformationTime: "3 months",
    beforeMetrics: {
      followers: "3.8K",
      engagement: "1.4%",
      leads: "20-25/month",
      timeSpent: "22 hrs/week"
    },
    afterMetrics: {
      followers: "12K",
      engagement: "3.8%",
      leads: "15-18/month",
      timeSpent: "6 hrs/week"
    }
  },
  {
    id: 'olivia-martinez',
    name: 'Olivia Martinez',
    title: 'Personal Finance Coach',
    industry: 'business',
    resultType: 'revenue',
    image: '/case-studies/olivia.jpg',
    logo: '/case-studies/olivia-logo.svg',
    avatarUrl: '/testimonials/olivia.jpg',
    category: 'expert',
    stats: [
      { value: '245%', label: 'Revenue Growth', icon: 'trending-up' },
      { value: '12K+', label: 'Course Students', icon: 'users' },
      { value: '8hrs', label: 'Weekly Time Saved', icon: 'clock' }
    ],
    challenge: 'Olivia had valuable financial literacy programs but struggled to grow her audience and explain complex financial concepts in an engaging way that would convert into course sales.',
    solution: 'We developed an AI content strategy that simplified financial concepts into digestible, actionable content across Instagram, YouTube, and her blog, with a clear path to her signature courses.',
    results: 'Olivia\'s business revenue grew by 245% in 6 months. Her introductory course enrollment increased from 800 to over 12,000 students, and she secured a publishing deal for a personal finance book.',
    quote: "The strategy completely transformed how I explain financial concepts. Complex topics are now accessible to my audience, and my courses are selling on autopilot.",
    tags: ['personal finance', 'financial literacy', 'money management', 'investing'],
    featured: true,
    transformationTime: "6 months",
    beforeMetrics: {
      followers: "10.2K",
      engagement: "1.8%",
      leads: "50-60/month",
      timeSpent: "15 hrs/week"
    },
    afterMetrics: {
      followers: "65K",
      engagement: "4.2%",
      leads: "300-350/month",
      timeSpent: "7 hrs/week"
    }
  }
];

export default additionalCaseStudies; 