import { Search, Lightbulb, Code2, Rocket } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const steps = [
  {
    icon: Search,
    title: "Discovery & Research",
    description:
      "We analyze your business, users, and goals to define a clear digital strategy.",
  },
  {
    icon: Lightbulb,
    title: "Planning & Architecture",
    description:
      "We design system architecture, user flows, and technical foundations for scalability.",
  },
  {
    icon: Code2,
    title: "Development & Integration",
    description:
      "We build your product using modern frameworks, AI systems, and clean architecture.",
  },
  {
    icon: Rocket,
    title: "Launch & Optimization",
    description:
      "We deploy, optimize, and continuously improve performance and scalability.",
  },
];

const ProcessTimeline = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`pt-16 pb-16 border-t overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-neutral-950/50 border-neutral-800 text-white"
          : "bg-slate-50 border-slate-200 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-28">
          <span
            className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              isDark
                ? "text-yellow-500 bg-yellow-500/10"
                : "text-sky-600 bg-sky-100"
            }`}
          >
            Execution Roadmap
          </span>
          <h2
            className={`text-3xl md:text-5xl font-bold tracking-tight mt-4 ${
              isDark ? "text-neutral-50" : "text-slate-900"
            }`}
          >
            Our Development Process
          </h2>
          <p className={`mt-4 text-base md:text-lg max-w-xl mx-auto ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
            A structured approach that ensures clarity, speed, and high-quality delivery from idea to production.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">

          {/* Vertical Line */}
          <div
            className={`absolute left-6 md:left-1/2 top-2 bottom-2 w-[2px] -translate-x-1/2 bg-gradient-to-b ${
              isDark
                ? "from-neutral-800 via-neutral-700 to-neutral-800"
                : "from-slate-200 via-sky-200 to-slate-200"
            }`}
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="group relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  {/* Icon Node */}
                  <div
                    className={`absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-2 shadow-sm z-10 transition-all duration-300 group-hover:scale-110 ${
                      isDark
                        ? "border-neutral-800 bg-neutral-900 text-neutral-400 group-hover:border-yellow-500 group-hover:bg-yellow-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-yellow-500/10"
                        : "border-slate-200 bg-white text-slate-400 group-hover:border-sky-500 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-sky-300/40"
                    }`}
                  >
                    <Icon size={20} className="transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  {/* Card */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] pl-16 md:pl-0 ${
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div
                      className={`relative p-6 md:p-8 rounded-2xl border backdrop-blur-md shadow-sm transition-all duration-300 ${
                        isDark
                          ? "border-neutral-800 bg-neutral-900/60 hover:shadow-xl hover:border-neutral-700"
                          : "border-slate-200 bg-white/80 hover:shadow-lg hover:shadow-sky-100/60 hover:border-sky-200"
                      }`}
                    >
                      <span
                        className={`inline-block text-xs font-bold mb-2 ${
                          isDark ? "text-yellow-400/90" : "text-sky-500"
                        }`}
                      >
                        0{index + 1}. Step
                      </span>

                      <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-neutral-100" : "text-slate-900"}`}>
                        {step.title}
                      </h3>

                      <p className={`text-sm md:text-base leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;