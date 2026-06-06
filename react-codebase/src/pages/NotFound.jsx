import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="pt-[20vh] min-h-[60vh] flex flex-col items-center justify-center px-4">
      <Helmet>
        <title>404 - Page Not Found | P-Tech Scales</title>
      </Helmet>
      <h1 className="text-6xl font-bold text-[#0a1425] mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#6366f1] text-white element-card hover:bg-[#4f46e5] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
