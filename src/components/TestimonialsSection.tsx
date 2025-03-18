
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    title: "Busy Mom of Three",
    content: "Swarup has been a lifesaver for our family. With three young kids, health questions come up all the time, and having instant, reliable answers has saved us countless unnecessary doctor visits.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5
  },
  {
    name: "Michael Chen",
    title: "Healthcare Professional",
    content: "As a nurse, I'm impressed by the accuracy of Swarup's responses. I've started recommending it to patients for non-emergency questions between appointments. It's like having a knowledgeable colleague available 24/7.",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    title: "Chronic Condition Patient",
    content: "Living with a chronic condition means I always have questions about symptoms and medication. Swarup gives me quick, clear answers that help me manage my health more effectively between doctor visits.",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 4
  },
  {
    name: "Robert Taylor",
    title: "Retiree",
    content: "At my age, health concerns come up frequently. Swarup helps me determine what needs immediate attention and what can wait. The peace of mind this gives me is invaluable.",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
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
        nextTestimonial();
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  
  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 bg-medical-50 rounded-full text-medical-600 text-sm font-medium">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-balance">
            Trusted by Thousands of Users
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from people who have transformed their healthcare experience with Swarup.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="glass-card p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      </div>
                      <div>
                        <div className="flex mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "w-5 h-5", 
                                i < testimonial.rating ? "fill-medical-500 text-medical-500" : "text-gray-300"
                              )} 
                            />
                          ))}
                        </div>
                        <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                          "{testimonial.content}"
                        </blockquote>
                        <div>
                          <h4 className="font-display font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-medical-600">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute top-1/2 -translate-y-1/2 -left-5 md:-left-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button 
            className="absolute top-1/2 -translate-y-1/2 -right-5 md:-right-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  currentIndex === index ? "bg-medical-600 w-6" : "bg-gray-300"
                )}
                onClick={() => {
                  setCurrentIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
