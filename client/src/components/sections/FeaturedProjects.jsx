import { ExternalLink, Code2 } from "lucide-react";
import { projects } from "../../data/projectsData";
import { useTheme } from "../../context/ThemeContext";

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
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured Projects
          </h2>
          <p className={`mt-4 text-sm md:text-base ${isDark ? "text-neutral-500" : "text-slate-500"}`}>
            Selected case studies showcasing scalable systems, AI integrations, and modern UX.
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
              <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-neutral-500" : "text-slate-500"}`}>
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
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
                  className={`flex items-center gap-1 transition hover:underline ${
                    isDark ? "hover:text-white" : "hover:text-sky-600"
                  }`}
                >
                  Live <ExternalLink size={14} />
                </a>
                <a
                  href={project.github}
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