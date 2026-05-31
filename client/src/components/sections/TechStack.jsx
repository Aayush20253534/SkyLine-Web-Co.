import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiOpenai,
  SiLangchain,
} from "react-icons/si";

const technologies = [
  { name: "React", icon: SiReact, category: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend" },
  { name: "Framer Motion", icon: SiFramer, category: "Frontend" },
  { name: "Node.js", icon: SiNodedotjs, category: "Backend" },
  { name: "Express", icon: SiExpress, category: "Backend" },
  { name: "MongoDB", icon: SiMongodb, category: "Database" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Database" },
  { name: "Firebase", icon: SiFirebase, category: "Cloud" },
  { name: "OpenAI", icon: SiOpenai, category: "AI" },
  { name: "LangChain", icon: SiLangchain, category: "AI" },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function TechStack() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <section
      className={`relative pt-16 pb-16 overflow-hidden border-t transition-colors duration-300 ${
        isDark
          ? "bg-neutral-950/50 border-neutral-800 text-white"
          : "bg-slate-50 border-slate-200 text-slate-900"
      }`}
    >
      {/* Background Effects */}

      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[180px] ${
            isDark
              ? "bg-purple-500/10"
              : "bg-sky-300/20"
          }`}
        />

        <div
          className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] ${
            isDark
              ? "bg-cyan-500/10"
              : "bg-blue-200/30"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span
            className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              isDark
                ? "text-yellow-500 bg-yellow-500/10"
                : "text-sky-600 bg-sky-100"
            }`}
          >
            Technology Stack
          </span>

          <h2
            className={`mt-5 text-4xl md:text-6xl font-bold tracking-tight ${
              isDark
                ? "text-neutral-50"
                : "text-slate-900"
            }`}
          >
            Built with modern technologies.
          </h2>

          <p
            className={`mt-6 text-lg leading-relaxed ${
              isDark
                ? "text-neutral-400"
                : "text-slate-500"
            }`}
          >
            Every technology is selected based on scalability,
            performance, maintainability, and real-world production
            requirements. Fancy buzzwords are free. Reliable systems
            are not.
          </p>
        </motion.div>

        {/* Grid */}

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {technologies.map((tech, i) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className={`group relative overflow-hidden rounded-3xl border backdrop-blur-md p-6 transition-all duration-500 ${
                  isDark
                    ? `
                      border-neutral-800
                      bg-neutral-900/60
                      hover:border-neutral-700
                      hover:shadow-xl
                    `
                    : `
                      border-slate-200
                      bg-white/80
                      hover:border-sky-200
                      hover:shadow-lg
                      hover:shadow-sky-100/70
                    `
                }`}
              >
                {/* Hover Glow */}

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                    isDark
                      ? "bg-gradient-to-br from-white/10 via-transparent to-transparent"
                      : "bg-gradient-to-br from-sky-100/80 via-transparent to-transparent"
                  }`}
                />

                <div className="relative z-10">
                  {/* Icon */}

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                      isDark
                        ? `
                          bg-white/[0.04]
                          border-white/10
                        `
                        : `
                          bg-sky-50
                          border-sky-100
                        `
                    }`}
                  >
                    <Icon
                      size={28}
                      className={`transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                        isDark
                          ? "text-white"
                          : "text-sky-600"
                      }`}
                    />
                  </div>

                  <h3
                    className={`mt-5 font-semibold text-lg ${
                      isDark
                        ? "text-neutral-100"
                        : "text-slate-900"
                    }`}
                  >
                    {tech.name}
                  </h3>

                  <p
                    className={`mt-1 text-sm ${
                      isDark
                        ? "text-neutral-400"
                        : "text-slate-500"
                    }`}
                  >
                    {tech.category}
                  </p>
                </div>

                {/* Hover Ring */}

                <div
                  className={`absolute inset-0 rounded-3xl ring-1 transition ${
                    isDark
                      ? "ring-transparent group-hover:ring-white/20"
                      : "ring-transparent group-hover:ring-sky-200"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}