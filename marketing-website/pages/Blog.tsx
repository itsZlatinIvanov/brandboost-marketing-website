import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogSection } from '@/components/sections/BlogSection';

export default function Blog() {
  // Define sample blog posts
  const blogPosts = [
    {
      title: "How to Build a Strong Social Media Presence in 2023",
      summary: "Learn the key strategies to establish and grow your social media presence this year.",
      imageUrl: "/images/blog/social-media-presence.jpg",
      publishDate: "June 15, 2023",
      slug: "build-social-media-presence-2023"
    },
    {
      title: "The Ultimate Guide to Content Creation",
      summary: "Everything you need to know about creating engaging and effective content for your audience.",
      imageUrl: "/images/blog/content-creation.jpg",
      publishDate: "May 28, 2023",
      slug: "ultimate-guide-content-creation"
    },
    {
      title: "Leveraging AI for Social Media Growth",
      summary: "Discover how AI tools can accelerate your social media growth and save you time.",
      imageUrl: "/images/blog/ai-social-growth.jpg",
      publishDate: "April 10, 2023",
      slug: "leveraging-ai-social-media"
    }
  ];
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <div className="pt-20"> {/* Add padding to account for fixed header */}
        <BlogSection posts={blogPosts} />
      </div>
      <Footer />
    </div>
  );
} 