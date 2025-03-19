
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section id="contact" className="py-20 bg-medical-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your healthcare experience?
          </h2>
          <p className="text-lg text-medical-100 mb-8">
            Start using Swarup today and experience the future of medical assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chatbot">
              <Button size="lg" className="bg-white text-medical-600 hover:bg-gray-100">
                Try Swarup Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-medical-700">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
