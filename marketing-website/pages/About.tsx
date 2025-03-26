import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Sparkles, Award, Heart, Target, Zap } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

const About = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Animated section hook
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Team members
  const team = [
    {
      name: "Атанас Панов",
      role: "Съосновател и Главен Стратег",
      photo: "/team/atanas.jpg", 
      bio: "Експерт в изготвянето на печеливши маркетинг стратегии и развитието на брандове в социалните мрежи."
    },
    {
      name: "Васил Грозев",
      role: "Креативен Директор",
      photo: "/team/vasil.jpg", 
      bio: "Специалист в създаването на визуално съдържание и режисирането на видео материали с високо качество."
    },
    {
      name: "Златин Иванов",
      role: "Технологичен Директор",
      photo: "/team/zlatin.jpg",
      bio: "Отговаря за интегрирането на AI технологии и разработването на иновативни решения за клиентите."
    },
    {
      name: "Стоян Йотов",
      role: "Маркетинг Специалист",
      photo: "/team/stoyan.jpg",
      bio: "Отговаря за управлението на социални медии и изграждането на връзка с аудиторията чрез ангажиращо съдържание."
    }
  ];

  // Company values
  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Автентичност",
      description: "Помагаме на клиентите да изразят своята уникална идентичност чрез социалните медии."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Резултатност",
      description: "Фокусираме се върху измерими резултати и реален растеж на бизнеса на нашите клиенти."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Иновации",
      description: "Непрекъснато внедряваме нови технологии и подходи за по-ефективно постигане на целите."
    }
  ];

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
              <Sparkles className="w-4 h-4 mr-2" />
              За нас
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Помагаме на бизнеси да
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> разрастват </span>
              присъствието си
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              BrandBoost е екип от експерти в социалните медии, посветени на създаването на стратегии, 
              които изграждат лоялна аудитория и увеличават приходите за нашите клиенти.
            </p>
            
            <div className="flex justify-center space-x-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <span className="text-3xl font-bold text-blue-600">90+</span>
                <span className="text-gray-600 text-sm">Доволни клиенти</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <span className="text-3xl font-bold text-purple-600">250%</span>
                <span className="text-gray-600 text-sm">Среден растеж</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <span className="text-3xl font-bold text-blue-600">15ч+</span>
                <span className="text-gray-600 text-sm">Спестено време</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Нашата мисия</h2>
              <p className="text-gray-700 text-center">
                Ние създаваме цялостни стратегии за социални медии, които помагат на бизнеси да изградят 
                автентична връзка с аудиторията си, да спестят ценно време и да превърнат последователите 
                си в клиенти. Нашият подход съчетава креативност, AI технологии и задълбочено разбиране 
                на различните индустрии, за да доставим персонализирани решения с измерими резултати.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-100">
                <Users className="w-4 h-4 mr-2" />
                Нашият екип
              </div>
              
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Запознайте се с <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">експертите</span>
              </h2>
              
              <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                Зад BrandBoost стои екип от професионалисти с дългогодишен опит в дигиталния 
                маркетинг, създаването на съдържание и развитието на бизнеси.
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder-avatar.png";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-100">
                <Award className="w-4 h-4 mr-2" />
                Нашите ценности
              </div>
              
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Принципите, които <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ни водят</span>
              </h2>
              
              <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                Тези ценности са в основата на всяко наше решение и определят как работим с нашите клиенти.
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
