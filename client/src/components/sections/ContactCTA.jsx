import { ArrowRight, MessageSquareText } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";


const ContactCTA = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <section
      className={`pt-16 pb-16 border-t relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "border-neutral-800 bg-black text-neutral-50"
          : "border-slate-200 bg-slate-50 text-slate-900"
      }`}
    >
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {isDark ? (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-amber-500/[0.07] blur-[120px] md:blur-[180px] rounded-full" />
            <div className="absolute top-1/3 left-[40%] w-[300px] h-[300px] bg-orange-500/[0.03] blur-[100px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-sky-400/10 blur-[120px] md:blur-[180px] rounded-full" />
            <div className="absolute top-1/3 left-[40%] w-[300px] h-[300px] bg-blue-400/8 blur-[100px] rounded-full" />
          </>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
          Ready to build something{" "}
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${
              isDark
                ? "from-amber-400 to-orange-400"
                : "from-sky-500 to-blue-600"
            }`}
          >
            intelligent
          </span>?
        </h2>

        {/* Subtext */}
        <p className={`mt-6 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
          Let's design and develop your next digital product — from AI systems to scalable SaaS platforms.
          Built for performance, clarity, and growth.
        </p>

        {/* CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Primary */}
      <button
  onClick={() => navigate("/about")}
  className={`w-full sm:w-auto px-8 py-4 rounded-xl font-medium active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg ${
    isDark
      ? "bg-neutral-50 text-neutral-950 hover:bg-neutral-200 shadow-white/5"
      : "bg-[#0f2545] text-white hover:bg-[#0c1a2e] shadow-slate-900/10"
  }`}
>
  About Us
  <ArrowRight
    size={16}
    className="transform group-hover:translate-x-1 transition-transform duration-200"
  />
</button>

          {/* Secondary */}
          <a
            href="https://wa.me/919860118523?text=Hi!%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-8 py-4 rounded-xl border font-medium active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 ${
              isDark
                ? "border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900 hover:border-neutral-700 text-neutral-300 hover:text-white"
                : "border-slate-200 bg-white/70 hover:bg-white hover:border-sky-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquareText
              size={16}
              className={isDark ? "text-amber-400" : "text-sky-500"}
            />
            Book a Call
          </a>

        </div>

        {/* Response time badge */}
        <div className={`mt-8 flex items-center justify-center gap-2 text-xs font-medium ${isDark ? "text-neutral-400" : "text-slate-400"}`}>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Response time: usually within 24 hours
        </div>

      </div>
    </section>
  );
};

export default ContactCTA;