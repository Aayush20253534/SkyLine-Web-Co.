import { Code2, Bot, Rocket, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Modern websites and full-stack web applications built with React, Node.js, MongoDB, PostgreSQL, and clean production-ready architecture.",
  },
  {
    icon: Bot,
    title: "AI & RAG Systems",
    description:
      "AI chatbots, document summarizers, automation tools, and Retrieval-Augmented Generation systems powered by modern LLM workflows.",
  },
  {
    icon: Rocket,
    title: "MVP & SaaS Development",
    description:
      "Startup-ready MVPs, dashboards, client portals, and SaaS platforms built to launch fast, scale properly, and avoid technical chaos.",
  },
];

const ServicesPreview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <section
      className={`pb-16 pt-16 border-t transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-black text-white"
          : "border-slate-200 bg-[#f6fbff] text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span
            className={`inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              isDark
                ? "text-yellow-500 bg-yellow-500/10"
                : "text-sky-600 bg-sky-100"
            }`}
          >
            What We Do
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-bold">
            Services built for startups and growing businesses
          </h2>

          <p
            className={`mt-4 text-sm md:text-base ${
              isDark ? "text-neutral-500" : "text-slate-500"
            }`}
          >
            Skyline Web Co builds websites, web applications, AI tools, and MVPs
            with a small expert team focused on speed, clarity, and reliable
            execution.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <button
                key={service.title}
                type="button"
                onClick={() => navigate("/services")}
                className={`group text-left p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-black/30 bg-white/[0.03]"
                    : "border-slate-200 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/60 bg-white/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark
                        ? "bg-white/5"
                        : "bg-sky-50 border border-sky-100"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={isDark ? "text-white" : "text-sky-600"}
                    />
                  </div>

                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    isDark ? "text-neutral-500" : "text-slate-500"
                  }`}
                >
                  {service.description}
                </p>

                <div
                  className={`mt-6 inline-flex items-center gap-1 text-sm font-medium opacity-70 group-hover:opacity-100 transition ${
                    isDark ? "text-white" : "text-sky-600"
                  }`}
                >
                  Learn more <ArrowRight size={14} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;