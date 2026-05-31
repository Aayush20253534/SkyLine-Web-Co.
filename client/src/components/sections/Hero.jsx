import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`min-h-screen flex items-center relative overflow-hidden pb-10 pt-10 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {isDark ? (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-sky-300/15 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/15 blur-[120px] rounded-full" />
            <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-indigo-300/10 blur-[100px] rounded-full" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">

          {/* LEFT CONTENT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Building{" "}
              <span className={isDark ? "text-yellow-500" : "text-sky-600"}>
                premium digital
              </span>{" "}
              experiences for ambitious brands.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className={`mt-6 text-lg max-w-2xl ${
                isDark ? "text-neutral-500" : "text-slate-500"
              }`}
            >
              We create modern websites, AI-powered solutions, SaaS products,
              and automation systems that help businesses scale faster and stand
              out online.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <button
                className={`px-7 py-3 rounded-xl hover:scale-105 transition flex items-center gap-2 font-medium shadow-sm ${
                  isDark
                    ? "bg-white text-black hover:bg-neutral-100"
                    : "bg-[#0f2545] text-white hover:bg-[#0c1a2e]"
                }`}
              >
                Start a Project
                <ArrowRight size={18} />
              </button>

              <button
                className={`px-7 py-3 rounded-xl hover:scale-105 transition font-medium ${
                  isDark
                    ? "border border-white/10 text-white hover:bg-white/5"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                View Portfolio
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 55 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="flex gap-10 md:gap-16 mt-14"
            >
              {[
                { value: "20+", label: "Projects Delivered" },
                { value: "10+", label: "Happy Clients" },
                { value: "99%", label: "Satisfaction Rate" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <h3 className={`text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {value}
                  </h3>
                  <p className={`text-sm mt-1 ${isDark ? "text-neutral-500" : "text-slate-500"}`}>
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            {/* Main Card */}
            <div
              className={`rounded-3xl border backdrop-blur-xl p-8 shadow-2xl ${
                isDark
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-sky-200/60 bg-gradient-to-br from-sky-50 via-blue-50/80 to-indigo-50/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? "text-neutral-500" : "text-sky-500/80"}`}>
                    Featured Project
                  </p>
                  <h3 className={`text-2xl font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                    AI Business Platform
                  </h3>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=200&q=80&auto=format&fit=crop"
                  alt="Project Logo"
                  className="w-14 h-14 rounded-2xl object-cover"
                />
              </div>

              {/* Project Images */}
              <div className="mt-8 space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop"
                  alt="Dashboard"
                  className="h-52 w-full object-cover rounded-2xl"
                />
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop"
                    alt="Analytics"
                    className="h-32 w-full object-cover rounded-2xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format&fit=crop"
                    alt="Reports"
                    className="h-32 w-full object-cover rounded-2xl"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {["React", "Node.js", "AI Integration"].map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-sky-200/60 text-sky-700 border border-sky-200"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating Card 1 — Revenue */}
            <div
              className={`hidden md:block absolute -top-8 -left-8 rounded-2xl border px-5 py-4 shadow-xl ${
                isDark
                  ? "border-white/10 bg-neutral-950"
                  : "border-sky-200/70 bg-white shadow-sky-100/60"
              }`}
            >
              <p className={`text-xs ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
                Revenue Growth
              </p>
              <h4 className={`text-2xl font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                +127%
              </h4>
            </div>

            {/* Floating Card 2 — Automation */}
            <div
              className={`hidden md:block absolute -bottom-8 -right-8 rounded-2xl border px-5 py-4 shadow-xl ${
                isDark
                  ? "border-white/10 bg-neutral-950"
                  : "border-sky-200/70 bg-white shadow-sky-100/60"
              }`}
            >
              <p className={`text-xs ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
                Automation Saved
              </p>
              <h4 className={`text-2xl font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                240h
              </h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;