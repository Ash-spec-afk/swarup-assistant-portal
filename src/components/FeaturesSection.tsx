
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { BrainCircuit, MessageSquareText, ShieldCheck, Stethoscope, Database, Clock, Activity, BarChart3 } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + index * 100);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div 
      className={cn(
        "glass-card p-6 transition-all duration-500 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="w-12 h-12 mb-4 rounded-xl bg-medical-50 flex items-center justify-center text-medical-600">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6" />,
      title: "AI-Powered Medical Advice",
      description: "Get instant, accurate medical guidance powered by advanced AI trained on medical literature and best practices."
    },
    {
      icon: <MessageSquareText className="w-6 h-6" />,
      title: "Natural Conversations",
      description: "Interact naturally with our assistant through simple, conversational language - just like talking to a doctor."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "HIPAA Compliant",
      description: "Your health data is protected with enterprise-grade security and full HIPAA compliance for complete peace of mind."
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "Symptom Analysis",
      description: "Describe your symptoms and receive detailed analysis of possible conditions and recommended next steps."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Medical History Tracking",
      description: "Securely store and reference your medical history for more personalized and contextual healthcare guidance."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Availability",
      description: "Access medical assistance anytime, day or night, without appointments or waiting rooms."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Health Monitoring",
      description: "Track vital signs and health metrics over time with intuitive visualizations and personalized insights."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Health Analytics",
      description: "Gain valuable insights into your health patterns with comprehensive analytics and trend tracking."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 bg-medical-50 rounded-full text-medical-600 text-sm font-medium">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-balance">
            Advanced Healthcare in Your Pocket
          </h2>
          <p className="text-gray-600 text-lg">
            Discover how Swarup transforms your healthcare experience with cutting-edge AI and intuitive design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
