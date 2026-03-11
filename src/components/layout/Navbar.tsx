import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

// Navbar component with responsive design and scroll effect
export default function Navbar() {
  // Get user from Redux store to conditionally show profile or login links
  const { user } = useAppSelector((state) => state.auth);
  // State to track if the page has been scrolled for styling purposes
  const [scrolled, setScrolled] = useState(false);
  // State to track if the mobile menu is open
  const [mobileOpen, setMobileOpen] = useState(false);

  // Effect to add scroll listener and update scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Add scroll event listener and call handler to set initial state
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render the navbar with logo, navigation links, search icon, and mobile menu
  return (
    <header className="absolute top-6 left-0 w-full z-40">
      <div className="page-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white leading-none">
          MovieCritic
        </Link>

        {/* Desktop nav */}
        <nav
          className={[
            "hidden md:flex items-center gap-8 rounded-full px-10 py-4 text-base transition-all duration-300",
            "fixed top-6 left-1/2 -translate-x-1/2",
            scrolled
              ? "bg-white/20 backdrop-blur-lg shadow-lg border border-white/20 text-white"
              : "bg-[#d9d9d9] text-black",
          ].join(" ")}
        >
          <Link to="/" className="hover:underline">
            Home
          </Link>

          <Link to="/movies" className="hover:underline">
            Movies
          </Link>

          {user ? (
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="hover:underline">
              Login/Register
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {/* Search */}
          <Link
            to="/movies"
            aria-label="Search movies"
            className="flex h-12 w-12 items-center justify-center text-white"
          >
            <Search size={22} />
          </Link>

          {/* Hambugar */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black border-t border-white/10">
          <nav className="flex flex-col items-center gap-6 py-10 text-lg">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link to="/movies" onClick={() => setMobileOpen(false)}>
              Movies
            </Link>

            {user ? (
              <Link to="/profile" onClick={() => setMobileOpen(false)}>
                Profile
              </Link>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                Login/Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
