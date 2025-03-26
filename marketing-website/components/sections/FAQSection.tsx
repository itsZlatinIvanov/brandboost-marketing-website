import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: "How does the AI avatar creation work?",
      answer: "Our AI technology allows you to create lifelike digital avatars based on provided images or by selecting from our premade templates. You can customize expressions, appearance, and other features to create a unique avatar that represents you or your brand."
    },
    {
      question: "Can I clone my own voice for the AI videos?",
      answer: "Yes! You can clone your voice by providing audio samples, which our AI technology will analyze to replicate your unique voice patterns. This allows you to create videos with voiceovers that sound like you without having to record each script yourself."
    },
    {
      question: "How long does it take to generate an AI video?",
      answer: "Most videos are generated within minutes, depending on length and complexity. Simple, short videos might be ready in 2-3 minutes, while longer or more complex productions could take up to 10-15 minutes to render with all customizations."
    },
    {
      question: "Do I own the rights to the content I create with Clyc.io?",
      answer: "Absolutely. You retain all ownership rights to the content you create using our platform. You can use your AI-generated videos for commercial purposes, marketing campaigns, educational content, or any other application within our terms of service."
    },
    {
      question: "Can I customize the background and settings in my AI videos?",
      answer: "Yes, we offer various background options including solid colors, gradients, and premade scenes. Premium plans allow you to upload custom backgrounds or use green screen technology to place your avatar in any environment."
    },
    {
      question: "What file formats are supported for exporting my videos?",
      answer: "We support exporting videos in popular formats including MP4, MOV, and WebM. You can also choose different resolution options depending on your plan, ranging from standard definition to 4K quality."
    },
    {
      question: "Is there a limit to how many videos I can create?",
      answer: "The number of videos you can create depends on your subscription plan. Basic plans have monthly limits, while our Professional and Enterprise plans offer higher or unlimited video creation capabilities."
    },
    {
      question: "Do you offer multilingual support for AI voiceovers?",
      answer: "Yes, our platform supports multiple languages for AI voiceovers, including English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, and more. Additional languages are regularly added based on user demand."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about our AI avatar and voice cloning technology.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-blue-500" />
                  )}
                </span>
              </button>
              <div 
                className={`px-4 pb-4 ${openIndex === index ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a> for additional help.
          </p>
        </div>
      </div>
    </section>
  );
}; 