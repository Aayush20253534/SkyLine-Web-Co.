import {
  Mail,
  ArrowUpRight,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const year = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const socialClass = `w-12 h-12 rounded-xl border flex items-center justify-center hover:-translate-y-1 transition-all duration-300 ${
    isDark
      ? "border-white/10 text-neutral-400 hover:border-yellow-500 hover:text-yellow-500"
      : "border-slate-200 text-slate-500 hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50"
  }`;

  const navLinkClass = `transition ${
    isDark
      ? "hover:text-yellow-500"
      : "hover:text-sky-600"
  }`;

  return (
    <footer
      className={`pb-16 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-black text-neutral-100"
          : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark ? (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-yellow-500/10 blur-[180px] rounded-full" />
        ) : (
          <>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-sky-200/30 blur-[180px] rounded-full" />
            <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-100/30 blur-[120px] rounded-full" />
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Section */}
        <div className="pt-16 pb-16 grid lg:grid-cols-4 gap-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                  isDark
                    ? "bg-yellow-500 text-black"
                    : "bg-[#0f2545] text-white"
                }`}
              >
                A
              </div>
              <div>
                <h3 className={`font-bold text-2xl tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                  SkyLine Web Co.
                </h3>
                <p className={`text-sm ${isDark ? "text-neutral-400" : "text-slate-400"}`}>
                  Full Stack Developer
                </p>
              </div>
            </div>

            <p className={`mt-6 max-w-xl leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
              Building modern web applications, AI-powered systems,
              SaaS platforms, and digital experiences engineered for
              scale, performance, and long-term growth.
            </p>

            {/* Socials */}
            <div className="mt-8 flex gap-4">
              <a href="https://github.com/Aayush20253534" target="_blank" rel="noopener noreferrer" className={socialClass}>
                <FaGithub size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={socialClass}>
                <FaLinkedin size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={socialClass}>
                <FaInstagram size={20} />
              </a>
              <a href="mailto:your@email.com" className={socialClass}>
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`font-semibold mb-5 ${isDark ? "text-white" : "text-slate-900"}`}>
              Navigation
            </h4>
            <ul className={`space-y-3 ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
              {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={navLinkClass}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-semibold mb-5 ${isDark ? "text-white" : "text-slate-900"}`}>
              Contact
            </h4>
            <ul className={`space-y-4 ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
              <li className="flex items-center gap-3">
                <Mail size={16} className={isDark ? "text-yellow-500 shrink-0" : "text-sky-500 shrink-0"} />
                <span>skylinewebco08@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className={isDark ? "text-yellow-500 shrink-0" : "text-sky-500 shrink-0"} />
                <span>+91 89360 91025</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className={isDark ? "text-yellow-500 shrink-0" : "text-sky-500 shrink-0"} />
                <span>India</span>
              </li>
              <li className="flex items-start gap-3">
                <Briefcase size={16} className={`mt-0.5 shrink-0 ${isDark ? "text-yellow-500" : "text-sky-500"}`} />
                <span>Available for freelance & remote work</span>
              </li>
            </ul>
          </div>

        </div>

        {/* CTA Bar */}
        <div
          className={`pt-16 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div>
            <h4 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              Have a project in mind?
            </h4>
            <p className={`mt-2 ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
              Let's build something exceptional together.
            </p>
          </div>

          <a
            href="https://wa.me/918936091025?text=Hi!%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold hover:scale-105 transition ${
              isDark
                ? "bg-yellow-500 text-black hover:bg-yellow-400"
                : "bg-[#0f2545] text-white hover:bg-[#0c1a2e]"
            }`}
          >
            Contact Us
            <ArrowUpRight size={18} />
          </a>
        </div>

        <p className={`mt-8 text-sm ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
          © {year} SkyLine Web Co. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;