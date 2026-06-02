import Navbar from "../../components/layout/Navbar";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Bot,
  Code2,
  Database,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    desc: "Modern, fast, and responsive websites built to help businesses look credible, load quickly, and convert visitors into leads.",
    points: [
      "Responsive design",
      "SEO-ready structure",
      "Fast loading performance",
    ],
    accentDark: "from-blue-500/20 to-cyan-500/20",
    accentLight: "from-sky-100 to-blue-100/60",
    iconColorDark: "text-blue-500",
    iconColorLight: "text-sky-600",
    borderLight: "border-sky-200/50",
  },
  {
    icon: Code2,
    title: "Custom Web Applications",
    desc: "Full-stack web applications built with React, Node.js, Express, MongoDB, PostgreSQL, and Python for real business use cases.",
    points: [
      "Frontend + backend development",
      "Authentication & dashboards",
      "Scalable project structure",
    ],
    accentDark: "from-emerald-500/20 to-teal-500/20",
    accentLight: "from-emerald-100 to-teal-100/60",
    iconColorDark: "text-emerald-500",
    iconColorLight: "text-emerald-600",
    borderLight: "border-emerald-200/50",
  },
  {
    icon: Bot,
    title: "AI & Automation Systems",
    desc: "AI-powered tools, chatbots, RAG systems, and automation workflows designed to make business operations faster and smarter.",
    points: [
      "AI chatbot development",
      "RAG-based systems",
      "OpenAI & LangChain integration",
    ],
    accentDark: "from-purple-500/20 to-pink-500/20",
    accentLight: "from-indigo-100 to-purple-100/60",
    iconColorDark: "text-purple-500",
    iconColorLight: "text-indigo-600",
    borderLight: "border-indigo-200/50",
  },
  {
    icon: Database,
    title: "Backend & API Development",
    desc: "Secure backend systems and APIs built for performance, data handling, integrations, and long-term maintainability.",
    points: [
      "REST API development",
      "MongoDB & PostgreSQL",
      "Secure backend architecture",
    ],
    accentDark: "from-orange-500/20 to-amber-500/20",
    accentLight: "from-orange-100 to-amber-100/60",
    iconColorDark: "text-orange-500",
    iconColorLight: "text-orange-600",
    borderLight: "border-orange-200/50",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    desc: "Post-launch support, bug fixes, improvements, and technical help so your product keeps working after launch. Revolutionary concept.",
    points: [
      "Bug fixes & updates",
      "Performance improvements",
      "Ongoing technical support",
    ],
    accentDark: "from-slate-500/20 to-neutral-500/20",
    accentLight: "from-slate-100 to-gray-100/60",
    iconColorDark: "text-slate-300",
    iconColorLight: "text-slate-600",
    borderLight: "border-slate-200/50",
  },
];

const Services = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-neutral-950 text-neutral-50"
          : "bg-white text-slate-900"
      }`}
    >
      <div
        className={`absolute inset-0 -z-20 bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] ${
          isDark
            ? "bg-[radial-gradient(#ffffff08_1px,transparent_1px)]"
            : "bg-[radial-gradient(#94a3b820_1px,transparent_1px)]"
        }`}
      />

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-blue-500/[0.06] blur-[130px] rounded-full" />
            <div className="absolute bottom-[20%] right-1/4 w-[500px] h-[500px] bg-purple-500/[0.06] blur-[130px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-sky-300/15 blur-[130px] rounded-full" />
            <div className="absolute bottom-[20%] right-1/4 w-[500px] h-[500px] bg-blue-200/20 blur-[130px] rounded-full" />
          </>
        )}
      </div>

      <Navbar />

      <main className="pt-16 md:pt-24">
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              className={`inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                isDark
                  ? "text-yellow-500 bg-yellow-500/10"
                  : "text-sky-600 bg-sky-100"
              }`}
            >
              Skyline Web Co Services
            </span>

            <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
              Affordable-premium web solutions{" "}
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  isDark
                    ? "from-blue-500 via-cyan-500 to-purple-500"
                    : "from-sky-500 via-blue-500 to-indigo-600"
                }`}
              >
                built by a small expert team
              </span>
            </h1>

            <p
              className={`mt-8 text-lg md:text-xl max-w-2xl leading-relaxed ${
                isDark ? "text-neutral-400" : "text-slate-500"
              }`}
            >
              We build websites, web applications, AI tools, APIs, and MVPs for
              startups and businesses worldwide. Clean development, direct
              communication, and same-day responses, because apparently clients
              enjoy knowing what is happening.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate("/contact")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition ${
                  isDark
                    ? "bg-white text-black hover:bg-neutral-100 shadow-white/5"
                    : "bg-[#1a3d6e] text-white hover:bg-[#16325a] shadow-slate-900/10"
                }`}
              >
                Start a Project <ArrowRight size={18} />
              </motion.button>

              <motion.button
                onClick={() => navigate("/portfolio")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-xl border font-medium transition ${
                  isDark
                    ? "border-neutral-800 hover:bg-neutral-900/50 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-sky-200"
                }`}
              >
                View Portfolio
              </motion.button>
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
                  isDark
                    ? "border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-950/50"
                    : "border-slate-200 bg-white/80 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/50"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isDark ? "via-neutral-700" : "via-sky-300"
                  }`}
                />

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border mb-6 shadow-sm ${
                    isDark
                      ? `${service.accentDark} border-neutral-800/50`
                      : `${service.accentLight} ${service.borderLight}`
                  }`}
                >
                  <service.icon
                    className={`w-7 h-7 ${
                      isDark ? service.iconColorDark : service.iconColorLight
                    }`}
                  />
                </div>

                <h3
                  className={`text-xl font-bold tracking-tight ${
                    isDark ? "text-neutral-100" : "text-slate-900"
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`mt-3 text-sm leading-relaxed min-h-[72px] ${
                    isDark ? "text-neutral-400" : "text-slate-500"
                  }`}
                >
                  {service.desc}
                </p>

                <ul
                  className={`mt-8 space-y-3 border-t pt-6 ${
                    isDark ? "border-neutral-800/60" : "border-slate-100"
                  }`}
                >
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className={`flex items-center gap-3 text-sm ${
                        isDark ? "text-neutral-400" : "text-slate-500"
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        className={`${
                          isDark
                            ? service.iconColorDark
                            : service.iconColorLight
                        } opacity-80 shrink-0`}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative pb-32 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-[32px] border backdrop-blur-2xl p-10 md:p-16 shadow-2xl text-center transition-colors duration-300 ${
                isDark
                  ? "border-neutral-800 bg-neutral-900/20"
                  : "border-sky-200/60 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/60"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br pointer-events-none ${
                  isDark
                    ? "from-blue-500/[0.03] via-transparent to-purple-500/[0.03]"
                    : "from-sky-300/10 via-transparent to-blue-300/10"
                }`}
              />

              <div className="relative z-10">
                <h2
                  className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Have an idea for a website, app, or AI tool?{" "}
                  <span
                    className={`block md:inline bg-gradient-to-r bg-clip-text text-transparent ${
                      isDark
                        ? "from-blue-500 via-cyan-500 to-purple-500"
                        : "from-sky-500 via-blue-500 to-indigo-600"
                    }`}
                  >
                    Let's build it properly.
                  </span>
                </h2>

                <p
                  className={`mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed ${
                    isDark ? "text-neutral-400" : "text-slate-500"
                  }`}
                >
                  Skyline Web Co helps startups and businesses turn ideas into
                  reliable digital products with modern tech, clear
                  communication, and practical execution.
                </p>

                <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-10 px-8 py-4 rounded-xl font-semibold text-base shadow-xl transition ${
                    isDark
                      ? "bg-white text-black hover:bg-neutral-100"
                      : "bg-[#1a3d6e] text-white hover:bg-[#16325a]"
                  }`}
                >
                  Start Your Project
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;