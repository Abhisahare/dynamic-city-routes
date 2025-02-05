import Link from "next/link";
import { getCities } from "@/lib/cities";

export default async function Home() {
  const cities = await getCities();

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-8 text-center">Top Cities in India</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/city/${city.slug}`}
            className="p-6 border rounded-lg hover:bg-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold">{city.name}</h2>
            <p className="text-gray-600 mt-2">{city.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};