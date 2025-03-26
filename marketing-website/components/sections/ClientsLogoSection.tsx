import { motion } from 'framer-motion';
import { FC } from 'react';
import { BackgroundSection2 } from '../BackgroundSection2';

interface ClientProps {
  name: string;
  logo: string;
}

export const ClientsLogoSection: FC = () => {
  // Client data with properly formatted relative paths
  const clients: ClientProps[] = [
    { name: "Tony Ink", logo: "clients/tony-ink.jpg" },
    { name: "Andon", logo: "clients/andon.jpg" },
    { name: "Torino Auto Haus", logo: "clients/torinoautohaus.jpg" },
    { name: "Ecom Luka", logo: "clients/ecom-luka.jpg" },
    { name: "NikFit", logo: "clients/nikfit.jpg" },
    { name: "Avo Healthy", logo: "clients/avo-healthy.jpg" },
    { name: "Ink Emperor", logo: "clients/ink-emperor.jpg" },
    { name: "Ventsislav Zisov", logo: "clients/ventsislav-zisov.jpg" },
    { name: "Talent Bars", logo: "clients/talent-bars.jpg" },
    { name: "Kicks Bulgaria", logo: "clients/kicks-bulgaria.jpg" },
    { name: "Dr. Stoychev", logo: "clients/dr-stoychev.jpg" },
    { name: "Cvetita Herbal", logo: "clients/cvetita-herbal.jpg" },
    { name: "Health House", logo: "clients/health-house.jpg" },
    { name: "Grindout", logo: "clients/grindout.jpg" },
    { name: "Bushido", logo: "clients/bushido.jpg" },
    { name: "Prive Club", logo: "clients/prive-club.jpg" },
    { name: "Mr.Pizza", logo: "clients/mr-pizza.jpg" },
    { name: "ANG Cars", logo: "clients/ang-cars.jpg" },
    { name: "Iris Studio", logo: "clients/iris-studio.jpg" },
    { name: "Gold Service", logo: "clients/gold-service.jpg" },
    { name: "Zaropo", logo: "clients/zaropo.jpg" },
    { name: "Elfbar", logo: "clients/elf-bar.jpg" },
    { name: "Chilly Hills", logo: "clients/chilly-hills.jpg" },
    { name: "Velo Art", logo: "clients/velo-art.jpg" },
    { name: "Wakey", logo: "clients/wakey.jpg" },
    { name: "Relx", logo: "clients/relx.jpg" },
    { name: "Vcase", logo: "clients/vcase.jpg" },
    { name: "Paga", logo: "clients/paga.jpg" },
    { name: "Direct2", logo: "clients/direct2.jpg" },
    { name: "Papas&Beer", logo: "clients/papas-beer.jpg" },
    { name: "Rebuild Nutrition", logo: "clients/rebuild-nutrition.jpg" },
    { name: "Top Kvartiri", logo: "clients/top-kvartiri.jpg" },
  ];

  return (
    <BackgroundSection2 className="relative overflow-hidden" noPadding>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-12 bg-blue-500"></div>
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Клиенти</p>
            <div className="h-px w-12 bg-blue-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">
            Малка част от <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">бизнесите</span>, които ни се довериха
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Присъедини се към нашите успешни партньори и трансформирай присъствието си в социалните мрежи.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl py-6 px-4 shadow-xl border border-slate-200"
        >
          <div className="flex flex-wrap justify-center">
            {clients.map((client, index) => (
              <div 
                key={index} 
                className="w-[12%] p-1 group relative"
              >
                <div className="relative w-full aspect-square rounded-full overflow-hidden bg-slate-100 border border-slate-200 p-[2px]">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="w-full h-full object-cover object-center mix-blend-normal opacity-70 group-hover:opacity-100 transition-all duration-300 filter saturate-0 group-hover:saturate-100 scale-100 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "placeholder.svg";
                      }}
                    />
                  </div>
                </div>
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] rounded-md py-1 px-2 shadow-md -translate-x-1/2 left-1/2 top-full mt-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150%] z-10">
                  {client.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </BackgroundSection2>
  );
}; 