import { notFound } from 'next/navigation';
import { getCity, getCities } from "@/lib/cities";

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map(city => ({ slug: city.slug }));
}

export default async function CityPage({ params }) {
  const city = await getCity(params.slug);
  if (!city) return notFound();

  const getStatusColor = (isAvailable) => 
    isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-black">{city.name}</h1>
          <p className="text-lg text-gray-200">{city.description}</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column - City Information */}
          <div className="space-y-8">
            {/* City Statistics */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                City Statistics
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Population</p>
                  <p className="text-2xl font-semibold text-black">{city.population}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="text-2xl font-semibold text-black">{city.area}</p>
                </div>
              </div>
            </div>

            {/* Geographic Location */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Geographic Location
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Latitude</p>
                  <p className="text-lg font-medium text-black">{city.coordinates.lat}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Longitude</p>
                  <p className="text-lg font-medium text-black">{city.coordinates.lon}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - SaaS Services */}
          <div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                SaaS Services
              </h2>
              <div className="space-y-4">
                {Object.entries(city.saasServices).map(([service, isAvailable]) => (
                  <div
                    key={service}
                    className={`px-4 py-3 rounded-lg transition duration-300 ease-in-out hover:shadow-md cursor-pointer ${getStatusColor(isAvailable)}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">
                        {service.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="flex items-center">
                        {isAvailable ? (
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
