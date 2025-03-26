import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles, Star, Clock, UserPlus, DollarSign, Check, BarChart3, Zap } from 'lucide-react';

const AiAdCreation = () => {
  useEffect(() => {
    document.title = "AI UGC Създаване - BrandBoost";
    window.scrollTo(0, 0);
  }, []);
  
  // Animated section hooks
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Features list
  const features = [
    {
      icon: <Clock className="h-7 w-7" />,
      title: "Спестете време и ресурси",
      description: "Без продължително въвеждане на криейтъри, ревизии или времеемки графици за продукция. Получете висококачествено UGC съдържание в рамките на 24 часа от заявката."
    },
    {
      icon: <DollarSign className="h-7 w-7" />,
      title: "Рентабилно мащабиране",
      description: "Мащабирайте създаването на съдържание без да увеличавате бюджета си. Създавайте десетки UGC видеа за част от цената, която бихте платили на истински криейтъри."
    },
    {
      icon: <Check className="h-7 w-7" />,
      title: "Съдържание съобразено с бранда",
      description: "Елиминирайте рисковете при работа с криейтъри чрез пълен контрол върху посланията и визуалните елементи. Нашият AI гарантира, че съдържанието винаги е съобразено с вашия бранд."
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "Безкрайна персонализация",
      description: "Адаптирайте всеки AI презентатор към демографските данни на идеалния ви клиент. Коригирайте сценарии, локации, емоции и още с прости инструкции."
    },
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: "Резултати доказани с данни",
      description: "Нашите AI UGC реклами постоянно надминават традиционните реклами с по-висока ангажираност, CTR и нива на конверсия във всички основни платформи."
    },
    {
      icon: <ArrowRight className="h-7 w-7" />,
      title: "Бърза итерация",
      description: "Тествайте множество творчески подходи за дни, а не седмици. Бързо итерирайте върху това, което работи и мащабирайте успешните варианти за максимална възвръщаемост."
    }
  ];
  
  // Process steps
  const steps = [
    {
      number: "01",
      title: "Споделете вашия бриф",
      description: "Разкажете ни за продукта, целевата аудитория и ключовите предимства. Включете специфични предпочитания за външния вид на презентатора, обстановката или тона."
    },
    {
      number: "02",
      title: "AI създаване на сценарий",
      description: "Нашият AI анализира вашия бриф и създава убедителен сценарий, който имитира автентични UGC говорни модели—с естествени паузи, разговорен език и спонтанност."
    },
    {
      number: "03",
      title: "AI генериране на видео",
      description: "Нашата напреднала AI технология създава реалистично изглеждащ презентатор, който представя вашето послание с естествени жестове, изражения и гласови интонации."
    },
    {
      number: "04",
      title: "Доставка и оптимизация",
      description: "Получавате готовото AI UGC видео в рамките на 24 часа, готово за публикуване. Предлагаме и безплатни корекции, за да сте сигурни, че сте напълно доволни от крайния резултат."
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
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-100">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered UGC
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI-генерирано UGC</span> съдържание, което конвертира
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Пропуснете трудностите при наемането на криейтъри. Генерирайте автентично изглеждащи UGC реклами с нашата премиум AI технология — спестявайки време, пари и главоболия.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-colors">
                  Започнете сега
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a href="#how-it-works" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Как работи
                </a>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">200+ бранда</span> използват нашето AI UGC
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src="/images/ai-ugc-creator.jpg" 
                    alt="AI UGC Creator" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2 shadow-lg text-sm font-medium">
                  Готово за 24 часа
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        </section>

      {/* Features Section */}
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
                <Star className="w-4 h-4 mr-2" />
                Предимства
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Защо да изберете <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI-генерирано UGC?</span>
              </h2>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Нашата AI технология създава UGC съдържание, което предоставя автентичността, която потребителите търсят, без сложността на управлението на криейтъри.
              </p>
            </motion.div>
            </div>
            
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
            </div>
          </div>
        </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-100">
                <Clock className="w-4 h-4 mr-2" />
                Процес
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Как работи нашето <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI UGC създаване</span>
              </h2>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Прост 4-стъпков процес, който доставя автентично изглеждащи UGC реклами без трудностите при управление на криейтъри
              </p>
            </motion.div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-grow p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
              </div>
            </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Готови ли сте да трансформирате вашия маркетинг с AI UGC?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Започнете още днес и вижте как нашето AI-генерирано UGC съдържание може да увеличи ангажираността и конверсиите.
              </p>
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                Свържете се с нас
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </motion.div>
          </div>
        </section>
      
      <Footer />
    </div>
  );
};

export default AiAdCreation; 