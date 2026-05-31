import Navbar from "../../components/layout/Navbar";
import Reveal from "../../animations/Reveal";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import {
  Brain,
  Rocket,
  ShieldCheck,
  Layers,
  Sparkles,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Clarity",
    desc: "We simplify systems, interfaces, and workflows instead of adding unnecessary layers of technical complexity.",
  },
  {
    icon: Layers,
    title: "Scalability",
    desc: "Every product is engineered with long-term growth, performance architectural consistency, and maintainability in mind.",
  },
  {
    icon: ShieldCheck,
    title: "Precision",
    desc: "We build with intention, empirical data, and rigid structure — completely ignoring assumptions or shortcuts.",
  },
];

const trustPoints = [
  { title: "Production-Ready Architecture", desc: "Enterprise-grade code built to handle millions of requests without breaking a sweat." },
  { title: "AI-First Development Approach", desc: "Deep LLM integration and vector search systems cooked natively into your core product workflow." },
  { title: "Scalable Full-Stack Systems", desc: "Decoupled structures using modern runtimes designed for zero-downtime scaling." },
  { title: "Modern UI/UX Engineering", desc: "Fluid interactions, sub-100ms response feedback loops, and highly responsive rendering layers." },
  { title: "Automation-Focused Workflows", desc: "Replacing tedious human tasks with reliable script triggers and secure webhooks." },
  { title: "Long-Term Technical Scalability", desc: "Clean types, strict documentation, and component modularity that makes onboarding new engineers a breeze." },
];

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${
      isDark
        ? "bg-neutral-950 text-neutral-50"
        : "bg-white text-slate-900"
    }`}>
      
      {/* Background dot grid */}
      <div className={`absolute inset-0 -z-20 bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] ${
        isDark
          ? "bg-[radial-gradient(#ffffff03_1px,transparent_1px)]"
          : "bg-[radial-gradient(#94a3b820_1px,transparent_1px)]"
      }`} />

      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        {isDark ? (
          <>
            <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[20%] right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-sky-300/15 blur-[120px] rounded-full" />
            <div className="absolute bottom-[20%] right-1/4 w-[500px] h-[500px] bg-blue-200/20 blur-[120px] rounded-full" />
          </>
        )}
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative z-10 space-y-32">
        
        {/* HERO SECTION */}
        <Reveal>
          <section className="space-y-8">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border backdrop-blur-md text-xs font-medium shadow-sm ${
              isDark 
                ? "border-neutral-800 bg-neutral-900/80 text-neutral-400" 
                : "border-sky-200/60 bg-sky-50/60 text-sky-700"
            }`}>
              <span className={isDark ? "text-blue-500" : "text-sky-500"}>✦</span> Studio Profile
            </div>

            <h1 className="text-4xl md:text-7xl font-bold tracking-tight max-w-5xl leading-[1.1]">
              We build intelligent, data-driven{" "}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? "from-blue-600 via-cyan-500 to-purple-500"
                  : "from-sky-500 via-blue-500 to-indigo-600"
              }`}>
                Digital Systems
              </span>
            </h1>

            <p className={`max-w-3xl text-lg md:text-xl font-normal leading-relaxed tracking-normal ${
              isDark ? "text-neutral-400" : "text-slate-500"
            }`}>
              SkyLine Web Co. Agency is a modern product engineering studio focused on building
              AI-powered platforms, scalable SaaS ecosystems, automated pipelines,
              and high-performance digital solutions that empower companies to out-pace market complexity.
            </p>

            {/* PERFORMANCE METRICS SPECTRUM */}
            <div className="pt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { number: "100%", label: "Custom Built Codebases" },
                { number: "AI-Native", label: "Core Native Workflows" },
                { number: "24/7/365", label: "Automated Operational Systems" },
                { number: "Infinite", label: "Horizontal Architecture" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border backdrop-blur-md shadow-sm ${
                    isDark
                      ? "border-neutral-800/60 bg-neutral-900/20"
                      : "border-slate-200/60 bg-white/50"
                  }`}
                >
                  <h3 className={`text-2xl md:text-3xl font-bold bg-gradient-to-tr bg-clip-text text-transparent ${
                    isDark ? "from-blue-600 to-purple-500" : "from-sky-500 to-indigo-600"
                  }`}>
                    {item.number}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* STRATEGIC OVERVIEW / STORY */}
        <Reveal>
          <section className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* TEXT ANALYSIS PANEL */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                isDark ? "text-blue-400" : "text-sky-600"
              }`}>
                <Rocket className="w-3.5 h-3.5" />
                Our Genesis
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Born out of frustration with brittle architecture.
              </h2>

              <p className={`text-base leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                We started with a definitive observation: most modern web products are either visually striking but technically hollow under heavy data loads, or mathematically robust but exhausting to navigate.
              </p>
              
              <p className={`text-base leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                SkyLine Web Co. Agency was built to completely bridge that engineering gap. We blend elegant user psychology, modular software blueprints, and predictive AI utilities into operational powerhouses.
              </p>
            </div>

            {/* INTERACTIVE TECH CARD GRAPHIC */}
            <div className="lg:col-span-5 relative">
              <div className={`absolute inset-0 blur-2xl rounded-full ${
                isDark ? "bg-gradient-to-tr from-blue-500/10 to-purple-500/10" : "bg-gradient-to-tr from-sky-400/15 to-blue-400/10"
              }`} />
              
              <div className={`relative rounded-3xl border backdrop-blur-2xl p-8 shadow-xl ${
                isDark 
                  ? "border-neutral-800/80 bg-neutral-900/30" 
                  : "border-slate-200 bg-white"
              }`}>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${
                  isDark 
                    ? "bg-blue-950/50 text-blue-400 border-blue-900/30" 
                    : "bg-sky-50 text-sky-600 border-sky-100"
                }`}>
                  <Brain className="w-6 h-6" />
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight">
                  Design meets Machine Intelligence
                </h3>

                <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                  We treat software as an organic ecosystem. Our integrations leverage data classification and process automation models to ensure workflows learn and self-correct over time.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  {[
                    "Context-Aware RAG",
                    "Elastic Infrastructure",
                    "Multi-Tenant Cores",
                    "Event-Driven Triggers",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-xs font-medium border rounded-lg p-2.5 ${
                        isDark 
                          ? "text-neutral-400 bg-neutral-950/40 border-neutral-800/30" 
                          : "text-slate-600 bg-slate-50 border-slate-100"
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>
        </Reveal>

        {/* TARGET & MISSION MATRICES */}
        <Reveal>
          <section className="grid md:grid-cols-2 gap-6">
            
            {/* MISSION STATEMENT CARD */}
            <div className={`relative overflow-hidden rounded-3xl border p-8 shadow-sm group transition-all duration-300 ${
              isDark 
                ? "border-neutral-800/80 bg-neutral-900/20 hover:border-neutral-700" 
                : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-md"
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-xl rounded-full pointer-events-none" />
              <Cpu className={`w-10 h-10 ${isDark ? "text-blue-400" : "text-sky-600"}`} />
              
              <h3 className="mt-6 text-2xl font-bold tracking-tight">Our Mission</h3>
              <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                To equip scaling entities with pristine technical infrastructure, removing overhead by integrating custom artificial intelligence tools and absolute computational automation.
              </p>
            </div>

            {/* VISION STATEMENT CARD */}
            <div className={`relative overflow-hidden rounded-3xl border p-8 shadow-sm group transition-all duration-300 ${
              isDark 
                ? "border-neutral-800/80 bg-neutral-900/20 hover:border-neutral-700" 
                : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-md"
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-xl rounded-full pointer-events-none" />
              <Rocket className={`w-10 h-10 ${isDark ? "text-purple-400" : "text-indigo-600"}`} />
              
              <h3 className="mt-6 text-2xl font-bold tracking-tight">Our Vision</h3>
              <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                A streamlined global marketplace where software boundaries vanish, enabling operational systems to execute background decisions accurately with zero technical limitation.
              </p>
            </div>

          </section>
        </Reveal>

        {/* THE THREE CORE VALUES */}
        <Reveal>
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Core Operational Values</h2>
              <p className={`text-sm md:text-base max-w-2xl mx-auto ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                The strict principles governing every single branch, layout, configuration file, and pipeline deployment we execute.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className={`relative overflow-hidden p-6 md:p-8 rounded-3xl border shadow-sm transition-all duration-300 ${
                    isDark 
                      ? "border-neutral-800/80 bg-neutral-900/20 hover:border-neutral-700" 
                      : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-md"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    isDark 
                      ? "bg-neutral-950 border-neutral-800 text-blue-400" 
                      : "bg-slate-50 border-slate-200 text-sky-600"
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight">{item.title}</h3>
                  <p className={`mt-2 text-xs md:text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* WHY CLIENTS TRUST US GRID */}
        <Reveal>
          <section className="space-y-12">
            
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Why Foundations Trust Us</h2>
              <p className={`text-sm md:text-base max-w-2xl mx-auto ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                We avoid generic frameworks. We build custom computational models and production systems optimized for clean operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trustPoints.map((item, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                    isDark 
                      ? "border-neutral-800/60 bg-neutral-900/10 hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-950/50" 
                      : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/40"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-mono ${isDark ? "text-neutral-600" : "text-slate-400"}`}>0{i + 1} //</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isDark ? "text-neutral-700 group-hover:text-blue-400" : "text-slate-300 group-hover:text-sky-500"
                      }`} />
                    </div>
                    <h3 className={`text-base font-bold tracking-tight mt-4 ${isDark ? "text-neutral-200" : "text-slate-800"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </section>
        </Reveal>

      </main>
    </div>
  );
};

export default About;