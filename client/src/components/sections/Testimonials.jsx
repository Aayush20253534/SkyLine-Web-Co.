import { Star } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const row1 = [
  {
    name: "Sarah Johnson",
    role: "SaaS Founder",
    text: "Skyline Web Co. helped us build a scalable AI-powered platform in record time. The attention to detail and system design was exceptional.",
  },
  {
    name: "Michael Chen",
    role: "Startup CEO",
    text: "They transformed our workflow with automation and AI integration. The product feels like a premium enterprise system.",
  },
  {
    name: "Aarav Patel",
    role: "E-commerce Brand Owner",
    text: "Our conversion rate increased significantly after the redesign. Clean UI, fast performance, and great communication.",
  },
];

const row2 = [
  {
    name: "Emily Rodriguez",
    role: "Product Director",
    text: "Working with Skyline Web Co. was a game-changer. They didn't just write code; they deeply understood our product strategy.",
  },
  {
    name: "David Kim",
    role: "Tech Co-Founder",
    text: "The architectural foundations they laid down allowed us to scale to 50k active users without a single hitch. Highly recommended!",
  },
  {
    name: "Jessica Taylor",
    role: "Marketing VP",
    text: "Beautiful design aesthetics coupled with bleeding-edge performance. Our load times dropped by 60%, boosting our search rankings.",
  },
];

const Testimonials = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fadeFrom = isDark ? "from-neutral-950" : "from-white";

  return (
    <section
      className={`pt-16 pb-16 border-t overflow-hidden relative transition-colors duration-300 ${
        isDark
          ? "border-neutral-800 bg-neutral-950/30 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          display: flex;
          width: max-content;
          animation: scrollLeft 35s linear infinite;
        }
        .animate-scroll-right {
          display: flex;
          width: max-content;
          animation: scrollRight 35s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Light mode ambient glow */}
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-100/50 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-blue-100/40 blur-[100px] rounded-full" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              isDark
                ? "text-yellow-500 bg-yellow-500/10"
                : "text-sky-600 bg-sky-100"
            }`}
          >
            Wall of Love
          </span>
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mt-4 ${isDark ? "text-neutral-50" : "text-slate-900"}`}>
            What clients say about us
          </h2>
          <p className={`mt-4 text-base md:text-lg max-w-xl mx-auto ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
            Real feedback from founders and teams who built production systems with Skyline Web Co.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="flex flex-col gap-6 w-full relative">

        {/* Edge fades */}
        <div className={`absolute top-0 bottom-0 left-0 w-20 md:w-48 bg-gradient-to-r ${fadeFrom} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute top-0 bottom-0 right-0 w-20 md:w-48 bg-gradient-to-l ${fadeFrom} to-transparent z-10 pointer-events-none`} />

        {/* Row 1 */}
        <div className="overflow-hidden flex w-full">
          <div className="animate-scroll-left pause-on-hover gap-6 py-4">
            {[...row1, ...row1].map((t, index) => (
              <div
                key={`row1-${index}`}
                className={`w-[350px] md:w-[400px] flex-shrink-0 p-6 md:p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                  isDark
                    ? "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
                    : "border-sky-100 bg-gradient-to-br from-white via-sky-50/70 to-blue-50/50 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/60"
                }`}
              >
                <div className="flex gap-1 text-yellow-500">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" className="stroke-none" />
                  ))}
                </div>
                <p className={`mt-4 text-sm md:text-base leading-relaxed font-medium ${isDark ? "text-neutral-300" : "text-slate-600"}`}>
                  "{t.text}"
                </p>
                <div className={`mt-6 flex items-center gap-3 border-t pt-4 ${isDark ? "border-neutral-800/60" : "border-sky-100"}`}>
                  <div className="text-left">
                    <p className={`font-semibold text-sm ${isDark ? "text-neutral-100" : "text-slate-900"}`}>{t.name}</p>
                    <p className={`text-xs font-medium mt-0.5 ${isDark ? "text-neutral-500" : "text-sky-500"}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden flex w-full">
          <div className="animate-scroll-right pause-on-hover gap-6 py-4">
            {[...row2, ...row2].map((t, index) => (
              <div
                key={`row2-${index}`}
                className={`w-[350px] md:w-[400px] flex-shrink-0 p-6 md:p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                  isDark
                    ? "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
                    : "border-sky-100 bg-gradient-to-br from-white via-sky-50/70 to-blue-50/50 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/60"
                }`}
              >
                <div className="flex gap-1 text-yellow-500">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" className="stroke-none" />
                  ))}
                </div>
                <p className={`mt-4 text-sm md:text-base leading-relaxed font-medium ${isDark ? "text-neutral-300" : "text-slate-600"}`}>
                  "{t.text}"
                </p>
                <div className={`mt-6 flex items-center gap-3 border-t pt-4 ${isDark ? "border-neutral-800/60" : "border-sky-100"}`}>
                  <div className="text-left">
                    <p className={`font-semibold text-sm ${isDark ? "text-neutral-100" : "text-slate-900"}`}>{t.name}</p>
                    <p className={`text-xs font-medium mt-0.5 ${isDark ? "text-neutral-500" : "text-sky-500"}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;