import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  title: string;
  summary: string;
  imageUrl: string;
  publishDate: string;
  slug: string;
}

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ 
  title = "Our Latest Articles", 
  subtitle = "Insights and guides to help you grow your online presence", 
  posts 
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{post.publishDate}</div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{post.summary}</p>
                <a 
                  href={`/blog/${post.slug}`} 
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium"
                >
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
            View all articles <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}; 