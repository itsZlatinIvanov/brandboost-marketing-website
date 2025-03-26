import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PlusCircle, MinusCircle, HelpCircle } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { useState } from 'react';

const FAQ = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Animated section hook
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // FAQ items
  const faqItems = [
    {
      question: "Какви услуги предлага BrandBoost?",
      answer: "BrandBoost предлага цялостна стратегия за органичен растеж в социалните мрежи, включваща: създаване на съдържание (кратки видеа, истории, образователно съдържание), оптимизация на профили, и стратегии за увеличаване на видимостта и приходите."
    },
    {
      question: "Как BrandBoost помага на бизнеса ми да расте?",
      answer: "Помагаме на вашия бизнес чрез изграждане на лоялна аудитория, която е готова да купува, спестяваме време чрез управление на вашата стратегия за съдържание, и увеличаваме вашата видимост и приходи в рамките на 90 дни."
    },
    {
      question: "Колко време отнема да се видят резултати?",
      answer: "Типично клиентите ни започват да виждат значително увеличение на ангажираността и органичния растеж в рамките на 30-60 дни. Нашата цел е да изградим лоялна аудитория, готова да купува, в рамките на 90 дни."
    },
    {
      question: "За какви типове бизнеси е подходяща услугата?",
      answer: "Нашите услуги са подходящи за бизнеси от всякакъв размер, които се стремят да увеличат присъствието си в социалните мрежи и да го превърнат в приходи. Особено подходящи сме за бизнеси, които могат да инвестират в качествена маркетинг стратегия и имат какво да предложат на своята аудитория."
    },
  ];

  // Track which FAQ item is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-gray-100"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1)_0%,rgba(255,255,255,0)_60%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1)_0%,rgba(255,255,255,0)_60%)]"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-100">
              <HelpCircle className="w-4 h-4 mr-2" />
              ЧЗВ
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Често задавани
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> въпроси </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Намерете отговори на най-често задаваните въпроси за услугите на BrandBoost и как можем да помогнем на вашия бизнес.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <div 
                  className={`border ${openIndex === index ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50' : 'border-gray-200 bg-white'} rounded-lg transition-colors duration-300`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full p-5 text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                    {openIndex === index ? (
                      <MinusCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <PlusCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-gray-600">{item.answer}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Имате още въпроси?</h2>
              <p className="text-gray-600 mb-6">
                Ако не намирате отговора на вашия въпрос, не се колебайте да се свържете с нас. 
                Екипът ни е готов да ви помогне.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Свържете се с нас
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FAQ; 