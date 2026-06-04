import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";
import img5 from "../../assets/5.png";

const categories = ["All", "AI", "Infrastructure", "Education"];

const portfolio = [
  {
    id: 1,
    category: "AI",
    title: "RAG AI Summarizer",
    image: img5,
    description:
      "AI-powered document summarization platform using Retrieval-Augmented Generation and vector-based context retrieval.",
    details:
      "A modern AI document processing system built to summarize large text inputs using RAG workflows. It retrieves relevant context, processes document chunks, and generates cleaner, more accurate summaries using LLM-powered pipelines.",
    tech: ["React", "Node.js", "Express", "MongoDB", "LangChain", "Gemini API"],
    github:
      "https://github.com/Aayush20253534/RAG_BASED_AI_SUMMARIZER_UPDATED_AND_ADVANCED",
    live: "https://rag-based-ai-summarizer-updated-and.vercel.app",
  },
  {
    id: 2,
    category: "AI",
    title: "Drone Detection Model",
    description:
      "Computer vision system designed for drone detection using machine learning and image processing techniques.",
    details:
      "A machine learning project focused on detecting drones through computer vision models. The system is designed around object detection workflows, visual processing, and AI-powered aerial object recognition.",
    tech: ["Python", "FastAPI", "OpenCV", "YOLO", "Computer Vision"],
    github: "https://github.com/Aayush20253534/DRONE_DETECTION_MODEL",
    live: "https://github.com/Aayush20253534/DRONE_DETECTION_MODEL",
  },
  {
    id: 3,
    category: "Infrastructure",
    title: "Airgrid",
    image: img4,
    description:
      "Infrastructure-focused project built around scalable connectivity, distributed systems, and real-time data flow.",
    details:
      "A technical project exploring grid-based infrastructure, connectivity, system monitoring, and distributed communication concepts. Built with a focus on scalable architecture and reliable data handling.",
    tech: ["Node.js", "Python", "WebSockets", "Tailwind CSS", "Infrastructure"],
    github: "https://github.com/Aayush20253534/Airgrid",
    live: "https://github.com/Aayush20253534/Airgrid",
  },
  {
    id: 4,
    category: "AI",
    title: "RepoXray",
    image: img3,
    description:
      "AI-powered GitHub repository analysis tool that helps developers understand codebases faster.",
    details:
      "RepoXray analyzes GitHub repositories and generates structural insights, file-level explanations, and architecture summaries. It is designed to reduce the time needed to understand unfamiliar codebases.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Shadcn UI", "AI"],
    github: "https://github.com/Aayush20253534/RepoXray",
    live: "https://repoxray.vercel.app",
  },
  {
    id: 5,
    category: "Education",
    title: "Chanakya Campus Management System",
    image: img1,
    description:
      "Academic administration platform for managing students, faculty, dashboards, and institutional workflows.",
    details:
      "A campus management system designed for educational institutions. It supports role-based access, centralized dashboards, administrative workflows, and structured academic data management.",
    tech: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL"],
    github:
      "https://github.com/Aayush20253534/Campus_management_system-Chanakya-",
    live:
      "https://campus-chanakya.vercel.app",
  },
  {
    id: 6,
    category: "AI",
    title: "ElevateAI",
    image: img2,
    description:
      "AI-driven platform focused on automation, analytics, and intelligent workflow enhancement.",
    details:
      "ElevateAI explores intelligent automation, AI-powered workflows, and predictive data processing. The platform is designed to help businesses automate repetitive processes and extract actionable insights from data.",
    tech: ["Python", "FastAPI", "React", "Machine Learning", "AI"],
    github: "https://github.com/Aayush20253534/ELEVATEAI",
    live: "https://elevateai-pi.vercel.app",
  },
];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const filtered =
    active === "All"
      ? portfolio
      : portfolio.filter((project) => project.category === active);

  return (
    <div
      className={`min-h-screen overflow-x-hidden relative transition-colors duration-300 ${
        isDark
          ? "bg-neutral-950 text-neutral-50"
          : "bg-white text-slate-900"
      }`}
    >
      <div
        className={`absolute inset-0 -z-20 bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] ${
          isDark
            ? "bg-[radial-gradient(#ffffff05_1px,transparent_1px)]"
            : "bg-[radial-gradient(#94a3b820_1px,transparent_1px)]"
        }`}
      />

      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-sky-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-sky-200/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-200/20 blur-[120px] rounded-full" />
          </>
        )}
      </div>

      <Navbar />

      <main className="pt-28 pb-32">
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={`inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                isDark
                  ? "text-yellow-500 bg-yellow-500/10"
                  : "text-sky-600 bg-sky-100"
              }`}
            >
              Selected Work • Skyline Web Co
            </span>

            <h1
              className={`mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-4xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Building websites, AI systems, and scalable digital products.
            </h1>

            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                isDark ? "text-neutral-400" : "text-slate-500"
              }`}
            >
              From AI-powered applications to full-stack web platforms, these
              projects showcase the technologies and solutions we use to help
              businesses build faster and scale smarter.
            </p>
          </motion.div>
        </section>

        <section className="mt-12 max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={`flex gap-2 p-1.5 rounded-xl border backdrop-blur-md w-fit flex-wrap ${
              isDark
                ? "border-neutral-800/60 bg-neutral-900/30"
                : "border-slate-200 bg-slate-50/80"
            }`}
          >
            <LayoutGroup id="filters">
              {categories.map((category) => {
                const isActive = active === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActive(category)}
                    className={`relative px-5 py-2 text-sm font-medium rounded-lg transition duration-300 ${
                      isActive
                        ? isDark
                          ? "text-neutral-50"
                          : "text-slate-900"
                        : isDark
                        ? "text-neutral-400 hover:text-neutral-200"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className={`absolute inset-0 border shadow-sm rounded-lg ${
                          isDark
                            ? "bg-neutral-800 border-neutral-700/60"
                            : "bg-white border-sky-200 shadow-sky-100/40"
                        }`}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </section>

        <section className="mt-12 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  onClick={() => setSelected(item)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden border backdrop-blur-xl transition-all duration-300 flex flex-col h-full ${
                    isDark
                      ? "border-neutral-800/80 bg-neutral-900/20 hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-950/40"
                      : "border-slate-200 bg-white/80 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/40"
                  }`}
                >
                  <div
                    className={`h-52 w-full overflow-hidden relative border-b ${
                      isDark
                        ? "bg-neutral-900 border-neutral-800/60"
                        : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    <div
                      className={`absolute top-4 right-4 p-2.5 rounded-xl border backdrop-blur-md opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 ${
                        isDark
                          ? "bg-neutral-950/80 border-neutral-800/50"
                          : "bg-white/90 border-slate-200/60 shadow-sm"
                      }`}
                    >
                      <ArrowUpRight
                        size={16}
                        className={
                          isDark ? "text-neutral-300" : "text-slate-600"
                        }
                      />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border w-fit ${
                        isDark
                          ? "border-neutral-800 text-neutral-500 bg-neutral-900/50"
                          : "border-sky-100 text-sky-500 bg-sky-50"
                      }`}
                    >
                      {item.category}
                    </span>

                    <h3
                      className={`font-bold text-xl tracking-tight mt-3 transition-colors ${
                        isDark
                          ? "group-hover:text-blue-400"
                          : "group-hover:text-sky-600"
                      } ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`mt-2 text-sm leading-relaxed line-clamp-2 ${
                        isDark ? "text-neutral-400" : "text-slate-500"
                      }`}
                    >
                      {item.description}
                    </p>

                    <div className="mt-auto pt-6 flex flex-wrap gap-1.5">
                      {item.tech.map((technology) => (
                        <span
                          key={technology}
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${
                            isDark
                              ? "border-neutral-800 bg-neutral-900/40 text-neutral-400"
                              : "border-slate-100 bg-slate-50 text-slate-500"
                          }`}
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <AnimatePresence>
          {selected && (
            <motion.div
              className={`fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4 md:p-6 ${
                isDark ? "bg-black/60" : "bg-slate-900/30"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className={`max-w-2xl w-full rounded-3xl border max-h-[90vh] overflow-y-auto shadow-2xl relative ${
                  isDark
                    ? "bg-neutral-900 border-neutral-800"
                    : "bg-white border-slate-200"
                }`}
                initial={{ scale: 0.96, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 10 }}
                transition={{ type: "spring", duration: 0.4 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  onClick={() => setSelected(null)}
                  className={`absolute top-4 right-4 z-20 p-2 rounded-xl border transition ${
                    isDark
                      ? "border-neutral-800/60 hover:bg-neutral-800 text-neutral-400"
                      : "border-slate-200 hover:bg-slate-50 text-slate-500"
                  }`}
                >
                  <X size={18} />
                </button>

                <div
                  className={`h-64 w-full overflow-hidden border-b relative ${
                    isDark
                      ? "bg-neutral-950 border-neutral-800"
                      : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8">
                  <span
                    className={`text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${
                      isDark
                        ? "border-neutral-800 text-neutral-400 bg-neutral-950"
                        : "border-sky-100 text-sky-500 bg-sky-50"
                    }`}
                  >
                    {selected.category}
                  </span>

                  <h2
                    className={`text-2xl md:text-3xl font-bold tracking-tight mt-4 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {selected.title}
                  </h2>

                  <p
                    className={`mt-4 text-base leading-relaxed border-b pb-6 ${
                      isDark
                        ? "text-neutral-400 border-neutral-800/60"
                        : "text-slate-500 border-slate-100"
                    }`}
                  >
                    {selected.details || selected.description}
                  </p>

                  <h4
                    className={`text-xs font-bold tracking-wider uppercase mt-6 ${
                      isDark ? "text-neutral-500" : "text-slate-400"
                    }`}
                  >
                    Technology Stack
                  </h4>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.tech.map((technology) => (
                      <span
                        key={technology}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${
                          isDark
                            ? "border-neutral-800 bg-neutral-950 text-neutral-300"
                            : "border-slate-100 bg-slate-50 text-slate-600"
                        }`}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`mt-8 pt-6 border-t flex flex-wrap items-center gap-4 ${
                      isDark
                        ? "border-neutral-800/60"
                        : "border-slate-100"
                    }`}
                  >
                    <button
                      onClick={() => setSelected(null)}
                      className={`px-5 py-3 rounded-xl border text-sm font-medium transition ${
                        isDark
                          ? "border-neutral-800 hover:bg-neutral-800 text-white"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      Return to Gallery
                    </button>

                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-3 rounded-xl text-sm font-semibold shadow-md flex items-center gap-2 transition ${
                        isDark
                          ? "bg-white text-black hover:bg-neutral-100"
                          : "bg-[#1a3d6e] text-white hover:bg-[#16325a]"
                      }`}
                    >
                      View Repository
                      <FaGithub size={14} />
                    </a>

                    <a
                      href={selected.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-3 rounded-xl border text-sm font-semibold flex items-center gap-2 transition ${
                        isDark
                          ? "border-neutral-800 text-white hover:bg-neutral-800"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      View Project
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Portfolio;