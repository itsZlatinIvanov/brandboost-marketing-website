
import { useInView } from "react-intersection-observer";

export const CustomerCounter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`text-center mt-12 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">25+</div>
      <p className="text-gray-600">Personal brands revolutionized by our approach</p>
    </div>
  );
};
