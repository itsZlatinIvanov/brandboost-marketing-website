
import { useInView } from "react-intersection-observer";

export const MissionSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(109.6deg,rgba(223,234,247,1)_11.2%,rgba(244,248,252,1)_91.1%)]" />
      </div>
      <div className="container mx-auto relative">
        <div 
          ref={ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Our Mission
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            At Lovable, we're dedicated to transforming the way brands connect with their audience through AI-powered social media solutions.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-primary-500">Innovative AI</h3>
              <p className="text-gray-600">We utilize cutting-edge AI technology to create authentic, engaging content that resonates with your audience.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-primary-500">Data-Driven</h3>
              <p className="text-gray-600">Our strategies are backed by real-time analytics and insights, ensuring maximum impact for your brand.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-primary-500">Client Success</h3>
              <p className="text-gray-600">We measure our success by your results - growing audiences, increasing engagement, and driving revenue.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
