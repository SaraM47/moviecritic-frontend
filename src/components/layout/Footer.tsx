import { Link } from "react-router-dom";

// Simple footer with site links and logo
export default function Footer() {
  return (
    <footer className="bg-[#E4100F] mt-24 py-16 text-white">
      <div className="page-container grid gap-12 md:grid-cols-3 items-start text-center md:text-left">

        {/* Links column 1 */}
        <div className="space-y-4 text-lg">
          <Link to="/" className="block hover:underline">
            Home
          </Link>

          <Link to="/movies" className="block hover:underline">
            Movies
          </Link>

          <Link to="/tv-shows" className="block hover:underline">
            TV Shows
          </Link>

          <Link to="/login" className="block hover:underline">
            Login
          </Link>
        </div>

        {/* Links column 2 */}
        <div className="space-y-4 text-lg">
          <Link to="/contact" className="block hover:underline">
            Contact us
          </Link>

          <Link to="/about" className="block hover:underline">
            About us
          </Link>

          <Link to="/terms" className="block hover:underline">
            Terms of service
          </Link>

          <Link to="/recent-releases" className="block hover:underline">
            Recent release
          </Link>
        </div>

        {/* Logo */}
        <div className="flex justify-center md:justify-end text-3xl font-bold">
          <Link to="/" className="hover:opacity-90">
            MovieCritic
          </Link>
        </div>

      </div>
    </footer>
  );
}