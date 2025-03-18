
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-medical-50">
      <div className="container px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background with blur effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-medical-500 to-medical-700 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/10 -ml-10 -mb-10"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Ready to Transform Your Healthcare Experience?
                </h2>
                <p className="text-medical-50 text-lg mb-8">
                  Join thousands of users who have already discovered the peace of mind that comes with having a medical assistant available 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-medical-700 hover:bg-gray-100 rounded-full px-8 py-6">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-8 py-6">
                    Contact Sales
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-white font-display font-medium text-xl mb-2">For Individuals</h3>
                  <p className="text-medical-50 mb-4">Get personalized health guidance and peace of mind with unlimited access to our AI medical assistant.</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-2xl font-bold text-white">$9.99</span>
                      <span className="text-medical-100">per month</span>
                    </div>
                    <Button size="sm" className="bg-white text-medical-700 hover:bg-gray-100 rounded-full">
                      Start Free Trial
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-white font-display font-medium text-xl mb-2">For Healthcare Providers</h3>
                  <p className="text-medical-50 mb-4">Enhance patient care with AI-powered assistance that integrates with your existing systems.</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-2xl font-bold text-white">Custom Pricing</span>
                      <span className="text-medical-100">for your organization</span>
                    </div>
                    <Button size="sm" className="bg-white text-medical-700 hover:bg-gray-100 rounded-full">
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
