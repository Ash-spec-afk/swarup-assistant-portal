
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquareText, Shield, Clock } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-medical-100/50 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-medical-100/40 to-transparent opacity-50"></div>
      </div>

      <div className="container px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${isLoaded ? 'animate-fade-in-left' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <div className="flex items-center mb-6">
              <div className="h-10 flex items-center gap-2 rounded-full px-4 py-1 bg-medical-50 border border-medical-100">
                <div className="w-2 h-2 rounded-full bg-medical-500 animate-pulse"></div>
                <span className="text-xs font-medium text-medical-700">AI-Powered Healthcare Assistant</span>
              </div>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight hero-text">
              Your Personal <span className="text-medical-600">Medical Assistant</span>, Available 24/7
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Experience the future of healthcare with Swarup's AI medical assistant. Get instant answers to your health questions, symptoms evaluation, and personalized healthcare guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-medical-600 hover:bg-medical-700 text-white rounded-full px-8 py-6">
                Try It Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6">
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-medical-600" />
                <span className="text-sm text-gray-600">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquareText className="h-5 w-5 text-medical-600" />
                <span className="text-sm text-gray-600">Real-time Responses</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-medical-600" />
                <span className="text-sm text-gray-600">24/7 Availability</span>
              </div>
            </div>
          </div>
          
          <div className={`relative ${isLoaded ? 'animate-fade-in-right' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <div className="relative mx-auto w-full max-w-md">
              {/* Chat Interface Mockup */}
              <div className="relative z-10 rounded-2xl shadow-xl overflow-hidden border border-gray-100 bg-white">
                {/* Chat Header */}
                <div className="bg-medical-600 text-white p-4 flex items-center gap-3">
                  <img 
                    src="/lovable-uploads/50e23182-7dd1-4051-95cf-d2b13a63ccad.png" 
                    alt="Swarup Logo" 
                    className="h-8 w-auto" 
                  />
                  <div>
                    <h3 className="font-medium">Swarup Medical Assistant</h3>
                    <p className="text-xs text-medical-100">Online</p>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="p-4 bg-gray-50 h-[350px] overflow-y-auto flex flex-col">
                  {/* Bot message */}
                  <div className="flex gap-3 mb-4 max-w-[75%]">
                    <div className="w-8 h-8 rounded-full bg-medical-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-medical-600 font-medium">S</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                      <p className="text-sm text-gray-700">Hello! I'm your Swarup Medical Assistant. How can I help you today?</p>
                    </div>
                  </div>
                  
                  {/* User message */}
                  <div className="flex gap-3 mb-4 ml-auto max-w-[75%]">
                    <div className="bg-medical-50 p-3 rounded-lg rounded-tr-none shadow-sm">
                      <p className="text-sm text-gray-700">I've been having a headache for the past two days. What should I do?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-600 font-medium">U</span>
                    </div>
                  </div>
                  
                  {/* Bot response */}
                  <div className="flex gap-3 mb-4 max-w-[75%]">
                    <div className="w-8 h-8 rounded-full bg-medical-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-medical-600 font-medium">S</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                      <p className="text-sm text-gray-700">I'm sorry to hear about your headache. There could be several causes like stress, dehydration, or lack of sleep. Have you tried:</p>
                      <ul className="text-sm text-gray-700 list-disc pl-5 mt-2">
                        <li>Drinking water</li>
                        <li>Taking a rest in a quiet, dark room</li>
                        <li>Over-the-counter pain relievers</li>
                      </ul>
                      <p className="text-sm text-gray-700 mt-2">If the headache is severe or persists, please consult with a healthcare provider.</p>
                    </div>
                  </div>
                </div>
                
                {/* Chat Input */}
                <div className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                    <input 
                      type="text" 
                      placeholder="Type your health question..." 
                      className="flex-grow bg-transparent text-sm focus:outline-none"
                    />
                    <button className="w-8 h-8 rounded-full bg-medical-600 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-8 -right-10 w-28 h-28 bg-medical-100 rounded-full opacity-30 animate-float"></div>
              <div className="absolute -bottom-6 -left-10 w-20 h-20 bg-medical-200 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute -z-10 inset-0 -m-8 bg-gradient-radial from-medical-50 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
