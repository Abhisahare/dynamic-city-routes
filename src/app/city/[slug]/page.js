import { notFound } from 'next/navigation';
import { getCity, getCities } from "@/lib/cities";

// Generate static paths for all cities
export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map(city => ({
    slug: city.slug
  }));
}

export default async function CityPage({ params }) {
  const city = await getCity(params.slug);

  if (!city) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Main City Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* City Header */}
          <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {city.name}
            </h1>
            <p className="text-xl text-gray-600">{city.description}</p>
          </div>

          {/* City Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Population Card */}
              <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-blue-600 mb-2">
                  Population
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                  {city.population}
                </p>
              </div>

              {/* Area Card */}
              <div className="bg-white border border-green-100 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-green-600 mb-2">
                  Area
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                  {city.area}
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Detailed Information
                </h2>
                <div className="space-y-4">
                  {/* Example additional fields - modify according to your data */}
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Founded Year</span>
                    <span className="font-medium">1950</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Time Zone</span>
                    <span className="font-medium">IST (UTC+5:30)</span>
                  </div>
                </div>
              </div>

              {/* City Description */}
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  About {city.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {city.name} is one of India's most prominent cities, known for its 
                  rich history and modern infrastructure. With a population of 
                  {city.population} spread across {city.area}, the city offers a 
                  perfect blend of traditional culture and contemporary development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Back */}
        <div className="mt-8">
          <a 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Back to All Cities
          </a>
        </div>
      </div>
    </div>
  );
}