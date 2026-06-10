import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500
          ${
            scrolled
              ? isDark
                ? "bg-slate-950/85 backdrop-blur-xl border-white/10"
                : "bg-white/85 backdrop-blur-xl border-sky-100 shadow-[0_8px_30px_rgba(14,165,233,0.08)]"
              : isDark
              ? "bg-black/20 backdrop-blur-md border-transparent"
              : "bg-white/50 backdrop-blur-md border-transparent"
          }
        `}
      >
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-20" : "h-24"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src="/logo.png"
              alt="SkyLine Web Co."
              draggable={false}
              className={`object-contain transition-all duration-300 ${
                scrolled
                  ? "h-14 md:h-16"
                  : "h-20 md:h-24"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative group transition-colors duration-300 ${
                  isActive(link.path)
                    ? isDark
                      ? "text-white"
                      : "text-sky-600 font-semibold"
                    : isDark
                    ? "text-neutral-300 hover:text-white"
                    : "text-slate-600 hover:text-sky-600"
                }`}
              >
                {link.name}

                <span
                  className={`absolute left-0 -bottom-2 h-0.5 rounded-full transition-all duration-300 ${
                    isActive(link.path)
                      ? isDark
                        ? "w-full bg-white"
                        : "w-full bg-sky-500"
                      : isDark
                      ? "w-0 group-hover:w-full bg-white/40"
                      : "w-0 group-hover:w-full bg-sky-400/60"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`
                p-2.5 rounded-xl transition-all duration-300
                border shadow-sm hover:scale-105
                ${
                  isDark
                    ? "border-neutral-800 bg-neutral-900/60 text-amber-400 hover:bg-neutral-800"
                    : "border-slate-200/60 bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                }
              `}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className={`
                md:hidden
                p-2.5 rounded-xl transition-all duration-300 border
                ${
                  isDark
                    ? "border-neutral-800 bg-neutral-900/60 text-white hover:bg-neutral-800"
                    : "border-slate-200/60 bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className={`fixed top-24 left-0 w-full z-50 md:hidden border-t backdrop-blur-xl ${
                isDark
                  ? "bg-slate-950/95 border-white/10"
                  : "bg-white/95 border-sky-100"
              }`}
            >
              <nav className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-6 py-4 text-base transition-colors duration-300 ${
                      isActive(link.path)
                        ? isDark
                          ? "text-white font-semibold"
                          : "text-sky-600 font-semibold"
                        : isDark
                        ? "text-neutral-400 hover:text-white"
                        : "text-slate-600 hover:text-sky-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;