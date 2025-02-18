import { notFound } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAnalytics } from '@/lib/analytics';

export default function DataAnalyticsPage({ params }) {
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAnalytics(params.slug);
      if (!data) return notFound();
      setAnalytics(data);
    }
    fetchData();
  }, [params.slug]);

  const handleNavigation = (analyticsId) => {
    router.push(`/analytics/${analyticsId}`);
  };

  if (!analytics) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">{analytics.name} Data Analytics</h1>
          <p className="mt-2 text-lg">Explore detailed insights and analytics reports</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Analytics Reports</h2>
          <div className="space-y-4">
            {analytics.reports.map((report) => (
              <div
                key={report.id}
                className="px-4 py-3 rounded-lg bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition"
                onClick={() => handleNavigation(report.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{report.title}</span>
                  <span className="text-sm text-gray-700">Click to view</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
