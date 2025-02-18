import { notFound } from 'next/navigation';
import { getCity } from '@/lib/cities';

export default async function SaasServicePage({ params }) {
  const city = await getCity(params.slug);
  if (!city) return notFound();

  const testimonials = [
    { name: 'John Doe', feedback: 'This SaaS service transformed our business operations!', company: 'TechCorp' },
    { name: 'Jane Smith', feedback: 'Reliable and cost-effective solutions.', company: 'InnovateX' },
  ];

  const faqs = [
    { question: 'What is SaaS?', answer: 'SaaS stands for Software as a Service, offering cloud-based software solutions.' },
    { question: 'How can I subscribe?', answer: 'Simply sign up on our platform and choose a plan that fits your needs.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-black">{city.name} SaaS Services</h1>
          <p className="mt-2 text-lg text-black">Explore top SaaS solutions available in {city.name}</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available SaaS Services</h2>
          <div className="space-y-4">
            {Object.entries(city.saasServices).map(([service, isAvailable]) => (
              <div
                key={service}
                className={`px-4 py-3 rounded-lg ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">
                    {service.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="flex items-center">
                    {isAvailable ? (
                      <span className="text-green-600 font-semibold">Available</span>
                    ) : (
                      <span className="text-gray-400">Coming Soon</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Our Users Say</h2>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 text-bla">
                <p className="italic text-black">{testimonial.feedback}</p>
                <p className="mt- font-semibold text-black">- {testimonial.name}, {testimonial.company}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-3">
                <h3 className="font-semibold text-lg text-black">{faq.question}</h3>
                <p className="text-gray-700 mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
