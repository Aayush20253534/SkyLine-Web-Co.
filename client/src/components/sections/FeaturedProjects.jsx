import { ExternalLink, Code2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img5 from "../../assets/5.png";

const projects = [
  {
    id: 1,
    title: "Campus Chanakya",
    description:
      "Academic administration platform for managing students, faculty, dashboards, and institutional workflows.",
    tags: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL"],
    image: img1,
    link: "https://campus-chanakya.vercel.app",
    github:
      "https://github.com/Aayush20253534/Campus_management_system-Chanakya-",
  },
  {
    id: 2,
    title: "ElevateAI",
    description:
      "AI-driven platform focused on automation, analytics, and intelligent workflow enhancement.",
    tags: ["Python", "FastAPI", "React", "Machine Learning", "AI"],
    image: img2,
    link: "https://elevateai-pi.vercel.app",
    github: "https://github.com/Aayush20253534/ELEVATEAI",
  },
  {
    id: 3,
    title: "RAG AI Summarizer",
    description:
      "AI-powered document summarization platform using Retrieval-Augmented Generation and vector-based context retrieval.",
    tags: ["React", "Node.js", "MongoDB", "LangChain", "Gemini API", "AI"],
    image: img5,
    link: "https://rag-based-ai-summarizer-updated-and.vercel.app",
    github:
      "https://github.com/Aayush20253534/RAG_BASED_AI_SUMMARIZER_UPDATED_AND_ADVANCED",
  },
];

const FeaturedProjects = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`py-32 border-t transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-black text-white"
          : "border-slate-200 bg-[#f6fbff] text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Selected Work</h2>

          <p
            className={`mt-4 text-sm md:text-base ${
              isDark ? "text-neutral-500" : "text-slate-500"
            }`}
          >
            Real-world projects spanning AI applications, campus management,
            automation platforms, and modern web development.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-black/30 bg-white/[0.03]"
                  : "border-slate-200 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/60 bg-white/80"
              }`}
            >
              <div
                className={`h-48 w-full overflow-hidden border-b ${
                  isDark ? "border-white/10 bg-neutral-900" : "border-slate-100 bg-slate-50"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3
                  className={`text-lg font-semibold transition ${
                    isDark
                      ? "group-hover:text-yellow-500"
                      : "group-hover:text-sky-600 text-slate-900"
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isDark ? "text-neutral-500" : "text-slate-500"
                  }`}
                >
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-md ${
                        isDark
                          ? "bg-white/10 text-neutral-300"
                          : "bg-sky-50 text-sky-700 border border-sky-100"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className={`mt-6 flex items-center gap-4 text-sm font-medium ${
                    isDark ? "text-neutral-400" : "text-slate-500"
                  }`}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 transition hover:underline ${
                      isDark ? "hover:text-white" : "hover:text-sky-600"
                    }`}
                  >
                    Live <ExternalLink size={14} />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 transition hover:underline ${
                      isDark ? "hover:text-white" : "hover:text-sky-600"
                    }`}
                  >
                    Code <Code2 size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;