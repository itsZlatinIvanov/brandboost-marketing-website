import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { BackgroundSection2 } from '../BackgroundSection2';

export const TeamSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const team = [
    {
      name: "Атанас Панов",
      experience: "5+ години",
      photo: "/team/atanas.jpg",
      specialization: "Експерт в изготвянето на печеливши стратегии, и сценарии за viral видеа"
    },
    {
      name: "Васил Грозев",
      experience: "7+ години",
      photo: "/team/vasil.jpg", 
      specialization: "Специалист в заснемането и обработката на long form съдържание"
    },
    {
      name: "Златин Иванов",
      experience: "6+ години",
      photo: "/team/zlatin.jpg",
      specialization: "Експерт по AI и създаването на conversion механизми"
    },
    {
      name: "Стоян Йотов",
      experience: "8+ години",
      photo: "/team/stoyan.jpg", 
      specialization: "Специалист в обработката на кратки видеа",
    }
  ];

  return (
    <BackgroundSection2 className="relative overflow-hidden" noPadding>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          ref={ref}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-12 bg-blue-500"></div>
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Екип</p>
              <div className="h-px w-12 bg-blue-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Нашият <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">експертен</span> екип
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Професионалисти с дългогодишен опит в създаването на стратегии за социални мрежи
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[3px] flex items-center justify-center shadow-xl shadow-blue-500/10 mb-4 hover:shadow-purple-500/20 transition-shadow duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-white/80">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "placeholder.svg";
                      }}
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-1 text-center">{member.name}</h3>
                
                <div className="flex items-center mb-3 text-sm text-purple-700 font-medium">
                  <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{member.experience} професионален опит</span>
                </div>
                
                <div className="text-center px-2">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 text-sm text-slate-700 border border-purple-100/50 shadow-sm hover:shadow-md hover:border-blue-200/50 transition-all duration-300">
                    {member.specialization}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </BackgroundSection2>
  );
};
