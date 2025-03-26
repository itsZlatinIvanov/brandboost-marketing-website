import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, X, BarChart, MessageSquare, Search, Film, PenTool, FileText, Shield, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Интерфейс за услугите
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  iconBg: string;
  textColor: string;
  btnBg: string;
}

// Списък с услугите
const services: Service[] = [
  {
    id: 'market-research',
    title: 'Проучване на пазара',
    description: 'Детайлен анализ на пазара и конкуренцията за изграждане на успешна стратегия.',
    icon: <Search className="h-6 w-6 text-blue-600" />,
    features: [
      'Анализ на конкурентите и тяхната стратегия',
      'Идентифициране на целевата аудитория',
      'Проучване на тенденциите в бранша',
      'Откриване на ниши с потенциал'
    ],
    iconBg: 'bg-blue-100',
    textColor: 'text-blue-600',
    btnBg: 'bg-blue-100'
  },
  {
    id: 'content-strategy',
    title: 'Контент Стратегия',
    description: 'Създаваме съдържание, което се вижда от милиони и изгражда разпознаваем бранд.',
    icon: <PenTool className="h-6 w-6 text-purple-600" />,
    features: [
      'Hook + Value + CTA модел за видеа',
      'Адаптирано съдържание за различни платформи',
      'Стратегическо планиране на публикациите',
      'Подход ориентиран към качество, не количество'
    ],
    iconBg: 'bg-purple-100',
    textColor: 'text-purple-600',
    btnBg: 'bg-purple-100'
  },
  {
    id: 'video-production',
    title: 'Видео Продукция',
    description: 'Професионално заснемане и обработка на кратки и дълги видеа с високо качество.',
    icon: <Film className="h-6 w-6 text-red-600" />,
    features: [
      'Организирано заснемане на съдържание',
      'Професионална обработка на видеа',
      'Кратки (viral) и дълги видеа',
      'Оптимизация за повече видимост'
    ],
    iconBg: 'bg-red-100',
    textColor: 'text-red-600',
    btnBg: 'bg-red-100'
  },
  {
    id: 'lead-generation',
    title: 'Генериране на лийдове',
    description: 'Превръщаме следващите във ваши клиенти чрез стратегически подход към конверсиите.',
    icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    features: [
      'Добавяне на lead magnet към видеата',
      'Изграждане на conversion механизми',
      'Стратегически призиви за действие',
      'Проследяване на конверсиите'
    ],
    iconBg: 'bg-green-100',
    textColor: 'text-green-600',
    btnBg: 'bg-green-100'
  },
  {
    id: 'analytics-reporting',
    title: 'Анализи и Отчети',
    description: 'Седмични отчети и задълбочени анализи за постигнатите резултати и оптимизации.',
    icon: <BarChart className="h-6 w-6 text-sky-600" />,
    features: [
      'Седмични детайлни отчети',
      'Анализ на ключови метрики',
      'Препоръки за оптимизация',
      'Проследяване на ROI'
    ],
    iconBg: 'bg-sky-100',
    textColor: 'text-sky-600',
    btnBg: 'bg-sky-100'
  },
  {
    id: 'content-management',
    title: 'Управление на съдържание',
    description: 'Използваме системи за ефективно менажиране на съдържанието за по-добри резултати.',
    icon: <FileText className="h-6 w-6 text-indigo-600" />,
    features: [
      'Организация на съдържанието',
      'Системи за управление на публикации',
      'Структуриран календар за съдържание',
      'Оптимален публикационен график'
    ],
    iconBg: 'bg-indigo-100',
    textColor: 'text-indigo-600',
    btnBg: 'bg-indigo-100'
  },
  {
    id: 'communication',
    title: 'Постоянна комуникация',
    description: 'Поддържаме връзка 24/7 и сме на разположение за въпроси и обсъждане на стратегия.',
    icon: <MessageSquare className="h-6 w-6 text-amber-600" />,
    features: [
      'Достъпност 24/7 чрез WhatsApp или Viber',
      'Бърза реакция при нужда',
      'Редовни срещи за обсъждане на стратегия',
      'Прозрачна комуникация'
    ],
    iconBg: 'bg-amber-100',
    textColor: 'text-amber-600',
    btnBg: 'bg-amber-100'
  },
  {
    id: 'brand-identity',
    title: 'Изграждане на идентичност',
    description: 'Създаваме отличителен бранд, който помага да се откроите в социалните мрежи.',
    icon: <Award className="h-6 w-6 text-violet-600" />,
    features: [
      'Развитие на уникален бранд глас',
      'Визуална идентичност в социалните мрежи',
      'Консистентно представяне на ценностите',
      'Изграждане на отличителен характер'
    ],
    iconBg: 'bg-violet-100',
    textColor: 'text-violet-600',
    btnBg: 'bg-violet-100'
  },
  {
    id: 'trust-building',
    title: 'Изграждане на доверие',
    description: 'Помагаме ти да изградиш доверие с аудиторията, което води до по-висока конверсия.',
    icon: <Shield className="h-6 w-6 text-teal-600" />,
    features: [
      'Създаване на органично съдържание',
      'Създаване на стабилна връзка с аудиторията',
      'Изграждане на авторитет в бранша',
      'Увеличаване на готовността за покупка'
    ],
    iconBg: 'bg-teal-100',
    textColor: 'text-teal-600',
    btnBg: 'bg-teal-100'
  }
];

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const openModal = (serviceId: string) => {
    setSelectedService(serviceId);
    document.body.style.overflow = 'hidden'; // Предотвратява скролване на основната страница
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto'; // Възстановява скролването
  };

  const selectedServiceData = services.find(service => service.id === selectedService);

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Нашите Услуги</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Създаваме съдържание, което се вижда от милиони и изгражда твоя отличителен бранд в социалните мрежи.
          </p>
          
          <div className="flex justify-center items-center mt-10 gap-8 flex-wrap max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 shadow-lg shadow-blue-500/10">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <p className="font-medium text-white">Доверие</p>
              <p className="text-blue-400 font-bold">33.3%</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mb-2 shadow-lg shadow-purple-500/10">
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
              <p className="font-medium text-white">Разпознаваемост</p>
              <p className="text-purple-400 font-bold">33.3%</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mb-2 shadow-lg shadow-cyan-500/10">
                <Award className="h-8 w-8 text-cyan-400" />
              </div>
              <p className="font-medium text-white">Идентичност</p>
              <p className="text-cyan-400 font-bold">33.3%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 shadow-md hover:shadow-lg hover:shadow-blue-500/5 hover:border-slate-600 transition-all p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex-shrink-0`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-white">{service.title}</h3>
                  <p className="text-slate-300 text-sm">{service.description}</p>
                </div>
              </div>
              
              <button 
                onClick={() => openModal(service.id)}
                className={`inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300`}
              >
                Научи повече
                <span className="ml-1">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Модален прозорец */}
      {selectedService && selectedServiceData && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-xl shadow-blue-500/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex-shrink-0`}>
                  {selectedServiceData.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{selectedServiceData.title}</h3>
              </div>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-slate-300 mb-6">{selectedServiceData.description}</p>
              
              <h4 className="font-medium text-white mb-4">Какво включва:</h4>
              <div className="space-y-3 mb-6">
                {selectedServiceData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle2 className={`h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0`} />
                    <p className="text-slate-300">{feature}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-900/20`}
                  onClick={() => {
                    closeModal();
                    document.getElementById('discovery-call')?.scrollIntoView({behavior: 'smooth'});
                  }}
                >
                  Запиши консултация
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 