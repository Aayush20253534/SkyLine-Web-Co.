import Navbar from "../../components/layout/Navbar";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Bot, Palette, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-performance, scalable websites and web apps built with modern, composable architectures.",
    points: [
      "Responsive UI/UX Engineering",
      "Production-level optimization",
      "Semantic architecture & SEO ready",
    ],
    accentDark: "from-blue-500/20 to-cyan-500/20",
    accentLight: "from-sky-100 to-blue-100/60",
    iconColorDark: "text-blue-500",
    iconColorLight: "text-sky-600",
    borderLight: "border-sky-200/50",
  },
  {
    icon: Bot,
    title: "AI Chatbots & RAG Systems",
    desc: "Intelligent conversational systems and Retrieval-Augmented Generation workflows tailored for enterprise knowledge bases.",
    points: [
      "LLM orchestrations & API setups",
      "Vector database embeddings",
      "Automated business pipelines",
    ],
    accentDark: "from-purple-500/20 to-pink-500/20",
    accentLight: "from-indigo-100 to-purple-100/60",
    iconColorDark: "text-purple-500",
    iconColorLight: "text-indigo-600",
    borderLight: "border-indigo-200/50",
  },
  {
    icon: Palette,
    title: "UI/UX Design Systems",
    desc: "Minimal, elegant digital interfaces engineered deliberately for clarity, brand expression, and conversion.",
    points: [
      "Atomic design frameworks",
      "High-fidelity rapid prototyping",
      "User-centric product strategy",
    ],
    accentDark: "from-amber-500/20 to-orange-500/20",
    accentLight: "from-sky-100 to-cyan-100/60",
    iconColorDark: "text-amber-500",
    iconColorLight: "text-sky-600",
    borderLight: "border-sky-200/50",
  },
];

const Services = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDark
        ? "bg-neutral-950 text-neutral-50"
        : "bg-white text-slate-900"
    }`}>

      {/* Background dot grid */}
      <div className={`absolute inset-0 -z-20 bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] ${
        isDark
          ? "bg-[radial-gradient(#ffffff08_1px,transparent_1px)]"
          : "bg-[radial-gradient(#94a3b820_1px,transparent_1px)]"
      }`} />

      {/* Ambient glows */}
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

        {/* Hero Header */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
              Premium Digital Services{" "}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? "from-blue-500 via-cyan-500 to-purple-500"
                  : "from-sky-500 via-blue-500 to-indigo-600"
              }`}>
                Engineered for Scale
              </span>
            </h1>

            <p className={`mt-8 text-lg md:text-xl max-w-2xl leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
              We engineer cutting-edge digital infrastructure combining structural stability,
              intelligent automation, and fluid interface mechanics to fuel sustainable enterprise expansion.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
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

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
                  isDark
                    ? "border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-950/50"
                    : "border-slate-200 bg-white/80 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/50"
                }`}
              >
                {/* Top accent line on hover */}
                <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isDark ? "via-neutral-700" : "via-sky-300"
                }`} />

                {/* Icon box */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border mb-6 shadow-sm ${
                  isDark
                    ? `${service.accentDark} border-neutral-800/50`
                    : `${service.accentLight} ${service.borderLight}`
                }`}>
                  <service.icon className={`w-7 h-7 ${isDark ? service.iconColorDark : service.iconColorLight}`} />
                </div>

                <h3 className={`text-xl font-bold tracking-tight ${isDark ? "text-neutral-100" : "text-slate-900"}`}>
                  {service.title}
                </h3>

                <p className={`mt-3 text-sm leading-relaxed min-h-[64px] ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                  {service.desc}
                </p>

                <ul className={`mt-8 space-y-3 border-t pt-6 ${isDark ? "border-neutral-800/60" : "border-slate-100"}`}>
                  {service.points.map((point, idx) => (
                    <li key={idx} className={`flex items-center gap-3 text-sm ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                      <CheckCircle2 size={16} className={`${isDark ? service.iconColorDark : service.iconColorLight} opacity-80 shrink-0`} />
                      <span className="truncate">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
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
              <div className={`absolute inset-0 bg-gradient-to-br pointer-events-none ${
                isDark
                  ? "from-blue-500/[0.03] via-transparent to-purple-500/[0.03]"
                  : "from-sky-300/10 via-transparent to-blue-300/10"
              }`} />

              <div className="relative z-10">
                <h2 className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                  Let's Build Something{" "}
                  <span className={`block md:inline bg-gradient-to-r bg-clip-text text-transparent ${
                    isDark
                      ? "from-blue-500 via-cyan-500 to-purple-500"
                      : "from-sky-500 via-blue-500 to-indigo-600"
                  }`}>
                    Intelligent
                  </span>
                </h2>

                <p className={`mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                  Partner with us to construct dependable digital ecosystems, optimized pipelines, and elite interface conversions.
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
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
