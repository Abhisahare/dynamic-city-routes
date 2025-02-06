import Link from "next/link";
import { getCities } from "@/lib/cities";

export default async function Home() {
  const cities = await getCities();

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-12">
          Top Indian Cities
        </h1>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              className="bg-white py-4 px-6 rounded-lg shadow-sm 
                       hover:shadow-md hover:bg-blue-50 
                       transform hover:scale-105 
                       transition duration-300 
                       text-center"
            >
              <h2 className="text-gray-800 font-medium">
                {city.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}