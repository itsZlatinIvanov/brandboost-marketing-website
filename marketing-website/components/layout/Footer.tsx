import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Brand</span>
              <span className="text-white">Boost</span>
            </h3>
            <p className="text-gray-400 mb-3 text-sm">Органичен социален медиен маркетинг за бизнеси, които искат да растат.</p>
            <div className="flex space-x-2 mt-3">
              <a href="https://facebook.com" className="bg-blue-600 p-1.5 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com" className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-1.5 rounded-full hover:opacity-90 transition-opacity">
                <Instagram size={16} />
              </a>
              <a href="https://twitter.com" className="bg-blue-400 p-1.5 rounded-full hover:bg-blue-500 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://linkedin.com" className="bg-blue-700 p-1.5 rounded-full hover:bg-blue-800 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-2">Бързи връзки</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Начало</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">За нас</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">ЧЗВ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Контакт</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-2">Контакти</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center">
                <Mail size={14} className="mr-2 text-blue-400" />
                <a href="mailto:contact@brandboost.bg" className="hover:text-white transition-colors">contact@brandboost.bg</a>
              </li>
              <li className="flex items-center">
                <Phone size={14} className="mr-2 text-blue-400" />
                <a href="tel:+359 87 773 7625" className="hover:text-white transition-colors">+359 87 773 7625</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Brand Boost. Всички права запазени.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Общи условия</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Политика за поверителност</Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">Политика за бисквитки</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 