
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Breadcrumb navigation */}
      <div className="bg-gray-50 border-b">
        <div className="container max-w-7xl mx-auto py-3 px-6 lg:px-8">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-medical-600 flex items-center">
              <Home size={16} className="mr-1" />
              Home
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-gray-800 font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>
      
      <main className="flex-grow bg-white">
        <div className="container max-w-4xl mx-auto py-12 px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-xl font-display font-semibold text-gray-800 mt-8 mb-4">1. Introduction</h2>
            <p>
              At Swarup Health Technologies ("Swarup," "we," "us," or "our"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our medical assistant chatbot service.
            </p>
            
            <h2 className="text-xl font-display font-semibold text-gray-800 mt-8 mb-4">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information</strong>: Information that can be used to identify you, such as your name, email address, and phone number.</li>
              <li><strong>Health Information</strong>: Symptoms, medical history, and other health-related information you provide during interactions with our chatbot.</li>
              <li><strong>Audio Recordings</strong>: If you use our voice features, we collect audio recordings of your conversations.</li>
              <li><strong>Technical Information</strong>: Data such as IP address, browser type, device information, and cookies.</li>
              <li><strong>Usage Information</strong>: Data about how you interact with our service, including features used and time spent.</li>
            </ul>
            
            <h2 className="text-xl font-display font-semibold text-gray-800 mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We may use your information for the following purposes:</p>
            <ul>
              <li>To provide and maintain our service</li>
              <li>To identify symptoms and generate medical reports</li>
              <li>To improve and personalize our service</li>
              <li>To communicate with you about our service</li>
              <li>To comply with legal obligations</li>
              <li>For research and analytics</li>
            </ul>
            
            <h2 className="text-xl font-display font-semibold text-gray-800 mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            
            <h2 className="text-xl font-display font-semibold text-gray-800 mt-8 mb-4">5. Data Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Healthcare Providers</strong>: With your consent, we may share your information with healthcare providers for treatment purposes.</li>
              <li><strong>Service Providers</strong>: Third-party vendors who help us operate our service.</li>
              <li><strong>Legal Requirements</strong>: When required by law or to protect our rights.</li>
            </ul>
            
            <h2 className="text-xl font-display font-semibold text-gray-800 mt-8 mb-4">6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your data</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            
            <h2 className="text-xl font-display font-semibold text-gray-800 mt-8 mb-4">7. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 16. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us.
            </p>
            
            <h2 className="text-xl font-display font-semibold text-gray-800 mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-display font-semibold text-gray-800 mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p><strong>Swarup Health Technologies</strong></p>
              <p>Email: privacy@swarup.health</p>
              <p>Address: 123 Health Avenue, Medical District, CA 94105</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
