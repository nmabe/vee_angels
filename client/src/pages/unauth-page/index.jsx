import { Link } from 'react-router-dom'

export default function UnauthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#892f82] via-[#f9f6fb] to-[#892f82]/60 relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#892f82]/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#892f82]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#892f82]/10 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"></div>
      {/* Content */}
      <div className="z-10 text-center">
        <h1 className="text-7xl font-extrabold text-[#892f82] drop-shadow mb-6">
          401
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          User Not Authorized to be here
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
          <br />
          Let's get you back to somewhere safe.
        </p>
        <Link
          to="/angels/home"
          className="inline-block bg-[#892f82] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#6d2568] transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
