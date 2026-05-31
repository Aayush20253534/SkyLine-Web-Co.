import { Code2, Bot, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "High-performance, scalable web applications built with modern frameworks and clean architecture.",
  },
  {
    icon: Bot,
    title: "AI and RAG System Chatbots",
    description:
      "Intelligent conversational systems powered by LLMs and Retrieval-augmented AI systems for automation and customer engagement.",
  },
  {
    icon: Sparkles,
    title: "UI/UX Design",
    description:
      "Minimal, conversion-focused interfaces with premium aesthetics and user-centered design.",
  },
];

const ServicesPreview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
          <h2 className="text-3xl md:text-4xl font-bold">
            Services that build digital leverage
          </h2>
          <p className={`mt-4 text-sm md:text-base ${isDark ? "text-neutral-500" : "text-slate-500"}`}>
            We design and engineer systems that scale startups, automate workflows,
            and turn ideas into production-ready digital products.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-black/30 bg-white/[0.03]"
                    : "border-slate-200 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/60 bg-white/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? "bg-white/5" : "bg-sky-50 border border-sky-100"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={isDark ? "text-white" : "text-sky-600"}
                    />
                  </div>
                  <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {service.title}
                  </h3>
                </div>

                <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-neutral-500" : "text-slate-500"}`}>
                  {service.description}
                </p>

                <div
                  className={`mt-6 text-sm font-medium opacity-70 group-hover:opacity-100 transition ${
                    isDark ? "text-white" : "text-sky-600"
                  }`}
                >
                  Learn more →
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesPreview;