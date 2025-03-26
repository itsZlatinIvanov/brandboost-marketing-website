import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookCallSection } from '@/components/sections/BookCallSection';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    document.title = "Контакт - BrandBoost";
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        {/* Book a call section */}
        <BookCallSection />
        
        {/* Contact information section */}
        <section className="py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                >
                  Имате допълнителни <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">въпроси?</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-600 mb-8"
                >
                  Ако имате въпроси или се нуждаете от допълнителна информация, не се колебайте да се свържете с нас по някой от следните начини.
                </motion.p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Имейл</h3>
                  <p className="text-gray-600 mb-3">Пишете ни по всяко време</p>
                  <a href="mailto:contact@brandboost.bg" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:underline font-medium">
                    contact@brandboost.bg
                  </a>
                </motion.div>
                
                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full">
                    <Phone className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Телефон</h3>
                  <p className="text-gray-600 mb-3">На ваше разположение сме</p>
                  <a href="tel:+359877737625" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:underline font-medium">
                    +359 87 773 7625
                  </a>
                </motion.div>
                
                {/* Office - Currently hidden
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Офис</h3>
                  <p className="text-gray-600 mb-3">Заповядайте при нас</p>
                  <p className="text-gray-800">
                    ул. Цар Симеон 25<br />София 1000
                  </p>
                </motion.div>
                */}
                
                {/* Work hours */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full">
                    <Clock className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Работно време</h3>
                  <p className="text-gray-600 mb-3">Кога може да ни намерите</p>
                  <p className="text-gray-800">
                    Понеделник - Неделя <br />24/7
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact; 