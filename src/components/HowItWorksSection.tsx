
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const steps = [
    {
      title: "Ask Your Health Question",
      description: "Simply type your health concern, symptoms, or medical question into the chat interface just as you would ask a doctor.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Receive Instant Analysis",
      description: "Our AI processes your query against vast medical knowledge databases to provide accurate, relevant information and guidance.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Get Personalized Recommendations",
      description: "Based on your specific situation, receive tailored advice, potential next steps, and suggested actions for your health concern.",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Follow Up and Monitor",
      description: "Easily follow up with additional questions, track symptoms over time, and maintain a secure record of your health interactions.",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80",
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible, steps.length]);
  
  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-white">
      <div className="container px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 bg-medical-50 rounded-full text-medical-600 text-sm font-medium">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-balance">
            Simple Steps to Better Health Insights
          </h2>
          <p className="text-gray-600 text-lg">
            Getting expert medical guidance has never been easier.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={cn(
                    "rounded-xl p-5 transition-all duration-300 cursor-pointer",
                    activeStep === index 
                      ? "bg-medical-50 border-l-4 border-medical-600 transform -translate-x-2" 
                      : "bg-gray-50 hover:bg-gray-100"
                  )}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0",
                      activeStep === index ? "bg-medical-600" : "bg-gray-300"
                    )}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-display font-medium text-xl mb-2 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    {activeStep === index && (
                      <ChevronRight className="ml-auto text-medical-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-2xl overflow-hidden shadow-xl transition-all duration-500 transform",
                    activeStep === index 
                      ? "opacity-100 scale-100 rotate-0" 
                      : "opacity-0 scale-95 rotate-2 absolute inset-0"
                  )}
                >
                  <img 
                    src={step.imageUrl} 
                    alt={step.title} 
                    className="w-full h-[350px] object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                      <p className="text-sm text-white/80">Step {index + 1} of {steps.length}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Navigation Dots */}
              <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      activeStep === index ? "bg-medical-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                    )}
                    onClick={() => setActiveStep(index)}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
