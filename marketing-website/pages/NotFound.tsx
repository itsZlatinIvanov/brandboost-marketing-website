import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Home } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Log error for analytics
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* 404 Content Section */}
        <section className="pt-28 pb-16 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-gray-100"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1)_0%,rgba(255,255,255,0)_60%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1)_0%,rgba(255,255,255,0)_60%)]"></div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 30 - 15],
                  x: [0, Math.random() * 30 - 15],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-100">
                  <Search className="w-4 h-4 mr-2" />
                  Грешка 404
                </div>
                
                {/* 404 Title with gradient effect */}
                <div className="relative flex justify-center">
                  <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                    404
                  </h1>
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full blur-xl opacity-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    animate={{
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Страницата не е намерена
                </h2>
                
                <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                  Съжаляваме, но страницата, която търсите, не съществува или е преместена на ново място.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link 
                    to="/" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Начална страница
                  </Link>
                  
                  <button 
                    onClick={() => window.history.back()}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Върнете се назад
                  </button>
                </div>
              </motion.div>
              
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-16 p-6 bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-4">
                  Може би търсите някоя от тези страници?
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <Link 
                    to="/about" 
                    className="px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    За нас
                  </Link>
                  <Link 
                    to="/faq" 
                    className="px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    Често задавани въпроси
                  </Link>
                  <Link 
                    to="/contact" 
                    className="px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Контакти
                  </Link>
                  <Link 
                    to="/solutions/ai-ad-creation" 
                    className="px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    AI UGC Създаване
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
