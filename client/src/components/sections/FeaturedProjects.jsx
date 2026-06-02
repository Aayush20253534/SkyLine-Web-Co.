import { ExternalLink, Code2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const projects = [
  {
    id: 1,
    title: "RAG Based AI Summarizer",
    description:
      "An AI-powered document summarization platform using Retrieval-Augmented Generation. It helps users process documents, retrieve relevant context, and generate clear AI summaries.",
    tags: ["React", "Node.js", "MongoDB", "LangChain", "Gemini API", "AI"],
    link: "https://github.com/Aayush20253534/RAG_BASED_AI_SUMMARIZER_1",
    github: "https://github.com/Aayush20253534/RAG_BASED_AI_SUMMARIZER_1",
  },
  {
    id: 2,
    title: "Drone Detection Model",
    description:
      "A computer vision project designed to detect drones using machine learning and image processing techniques, with a focus on AI-powered object detection.",
    tags: ["Python", "Computer Vision", "Machine Learning", "AI"],
    link: "https://github.com/Aayush20253534/DRONE_DETECTION_MODEL",
    github: "https://github.com/Aayush20253534/DRONE_DETECTION_MODEL",
  },
  {
    id: 3,
    title: "Airgrid",
    description:
      "A technical project focused on infrastructure, connectivity, and scalable system concepts with an emphasis on reliability and efficient data handling.",
    tags: ["Backend", "Infrastructure", "Networking", "Scalable Systems"],
    link: "https://github.com/Aayush20253534/Airgrid",
    github: "https://github.com/Aayush20253534/Airgrid",
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
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Selected Work</h2>

          <p
            className={`mt-4 text-sm md:text-base ${
              isDark ? "text-neutral-500" : "text-slate-500"
            }`}
          >
            Real-world projects spanning AI applications, machine learning
            systems, scalable backends, and modern web development.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-black/30 bg-white/[0.03]"
                  : "border-slate-200 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/60 bg-white/80"
              }`}
            >
              {/* Title */}
              <h3
                className={`text-lg font-semibold transition ${
                  isDark
                    ? "group-hover:text-yellow-500"
                    : "group-hover:text-sky-600 text-slate-900"
                }`}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isDark ? "text-neutral-500" : "text-slate-500"
                }`}
              >
                {project.description}
              </p>

              {/* Tags */}
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

              {/* Links */}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;