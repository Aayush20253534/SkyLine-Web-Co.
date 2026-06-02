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
  Globe2,
  Code2,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Clarity",
    desc: "We keep communication simple, project scope clear, and development decisions easy to understand.",
  },
  {
    icon: Layers,
    title: "Scalability",
    desc: "We build with clean structure, maintainable code, and long-term growth in mind from the beginning.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    desc: "We focus on stable delivery, tested functionality, and post-launch support instead of shiny shortcuts.",
  },
];

const trustPoints = [
  {
    title: "Small Expert Team",
    desc: "You work directly with the people building your product, not five layers of agency noise.",
  },
  {
    title: "Modern Web Stack",
    desc: "React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Python, OpenAI, and LangChain.",
  },
  {
    title: "Affordable-Premium Delivery",
    desc: "Professional quality without inflated agency overhead. A rare mercy in this economy.",
  },
  {
    title: "AI & Automation Focus",
    desc: "We build chatbots, RAG systems, document tools, and automation workflows for real business use.",
  },
  {
    title: "Same-Day Communication",
    desc: "Most project and business inquiries receive a response the same day.",
  },
  {
    title: "Post-Launch Support",
    desc: "We help with bug fixes, improvements, deployment support, and ongoing maintenance after launch.",
  },
];

const metrics = [
  {
    number: "Global",
    label: "Remote Clients",
  },
  {
    number: "Same-Day",
    label: "Typical Response",
  },
  {
    number: "Full-Stack",
    label: "Web Development",
  },
  {
    number: "AI-Ready",
    label: "Modern Systems",
  },
];

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${
        isDark
          ? "bg-neutral-950 text-neutral-50"
          : "bg-white text-slate-900"
      }`}
    >
      {/* Background dot grid */}
      <div
        className={`absolute inset-0 -z-20 bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] ${
          isDark
            ? "bg-[radial-gradient(#ffffff03_1px,transparent_1px)]"
            : "bg-[radial-gradient(#94a3b820_1px,transparent_1px)]"
        }`}
      />

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
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border backdrop-blur-md text-xs font-medium shadow-sm ${
                isDark
                  ? "border-neutral-800 bg-neutral-900/80 text-neutral-400"
                  : "border-sky-200/60 bg-sky-50/60 text-sky-700"
              }`}
            >
              <span className={isDark ? "text-blue-500" : "text-sky-500"}>
                ✦
              </span>
              About Skyline Web Co
            </div>

            <h1 className="text-4xl md:text-7xl font-bold tracking-tight max-w-5xl leading-[1.1]">
              We build modern websites, web apps, and{" "}
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  isDark
                    ? "from-blue-600 via-cyan-500 to-purple-500"
                    : "from-sky-500 via-blue-500 to-indigo-600"
                }`}
              >
                AI-powered digital products
              </span>
            </h1>

            <p
              className={`max-w-3xl text-lg md:text-xl font-normal leading-relaxed tracking-normal ${
                isDark ? "text-neutral-400" : "text-slate-500"
              }`}
            >
              Skyline Web Co is a small expert web development team based in
              India, working with clients worldwide. We build business websites,
              full-stack web applications, SaaS MVPs, AI tools, and automation
              systems with clean code, direct communication, and practical
              execution.
            </p>

            {/* METRICS */}
            <div className="pt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((item) => (
                <div
                  key={item.label}
                  className={`p-5 rounded-2xl border backdrop-blur-md shadow-sm ${
                    isDark
                      ? "border-neutral-800/60 bg-neutral-900/20"
                      : "border-slate-200/60 bg-white/50"
                  }`}
                >
                  <h3
                    className={`text-2xl md:text-3xl font-bold bg-gradient-to-tr bg-clip-text text-transparent ${
                      isDark
                        ? "from-blue-600 to-purple-500"
                        : "from-sky-500 to-indigo-600"
                    }`}
                  >
                    {item.number}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* STORY SECTION */}
        <Reveal>
          <section className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                  isDark ? "text-blue-400" : "text-sky-600"
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                Who We Are
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                A lean team built for focused execution.
              </h2>

              <p
                className={`text-base leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-slate-500"
                }`}
              >
                Skyline Web Co was created to help startups, small businesses,
                and growing teams build reliable digital products without the
                slow process and heavy overhead of traditional agencies.
              </p>

              <p
                className={`text-base leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-slate-500"
                }`}
              >
                Our team includes developers and a dedicated client-side
                coordinator who handles communication, planning, and project
                management. That means faster updates, clearer execution, and
                less confusion. A shocking innovation, apparently.
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              <div
                className={`absolute inset-0 blur-2xl rounded-full ${
                  isDark
                    ? "bg-gradient-to-tr from-blue-500/10 to-purple-500/10"
                    : "bg-gradient-to-tr from-sky-400/15 to-blue-400/10"
                }`}
              />

              <div
                className={`relative rounded-3xl border backdrop-blur-2xl p-8 shadow-xl ${
                  isDark
                    ? "border-neutral-800/80 bg-neutral-900/30"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center border ${
                    isDark
                      ? "bg-blue-950/50 text-blue-400 border-blue-900/30"
                      : "bg-sky-50 text-sky-600 border-sky-100"
                  }`}
                >
                  <Brain className="w-6 h-6" />
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight">
                  Practical tech. Clean delivery.
                </h3>

                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isDark ? "text-neutral-400" : "text-slate-500"
                  }`}
                >
                  We choose technologies based on what the project actually
                  needs, not because a framework became popular on the internet
                  for twelve minutes.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  {[
                    "React & Next.js",
                    "Node.js & Express",
                    "MongoDB & PostgreSQL",
                    "OpenAI & LangChain",
                  ].map((item) => (
                    <div
                      key={item}
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

        {/* MISSION / VISION */}
        <Reveal>
          <section className="grid md:grid-cols-2 gap-6">
            <div
              className={`relative overflow-hidden rounded-3xl border p-8 shadow-sm group transition-all duration-300 ${
                isDark
                  ? "border-neutral-800/80 bg-neutral-900/20 hover:border-neutral-700"
                  : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-md"
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-xl rounded-full pointer-events-none" />
              <Cpu
                className={`w-10 h-10 ${
                  isDark ? "text-blue-400" : "text-sky-600"
                }`}
              />

              <h3 className="mt-6 text-2xl font-bold tracking-tight">
                Our Mission
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-slate-500"
                }`}
              >
                To help businesses launch reliable digital products through
                clean development, modern tools, transparent communication, and
                long-term technical support.
              </p>
            </div>

            <div
              className={`relative overflow-hidden rounded-3xl border p-8 shadow-sm group transition-all duration-300 ${
                isDark
                  ? "border-neutral-800/80 bg-neutral-900/20 hover:border-neutral-700"
                  : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-md"
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-xl rounded-full pointer-events-none" />
              <Rocket
                className={`w-10 h-10 ${
                  isDark ? "text-purple-400" : "text-indigo-600"
                }`}
              />

              <h3 className="mt-6 text-2xl font-bold tracking-tight">
                Our Vision
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-slate-500"
                }`}
              >
                To become a trusted affordable-premium development partner for
                startups and businesses looking to build websites, SaaS
                products, automation systems, and AI-powered tools.
              </p>
            </div>
          </section>
        </Reveal>

        {/* WHAT WE BUILD */}
        <Reveal>
          <section className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe2,
                title: "Business Websites",
                desc: "Fast, responsive, SEO-ready websites designed to help businesses look credible and generate leads.",
              },
              {
                icon: Code2,
                title: "Web Applications",
                desc: "Custom dashboards, portals, internal tools, SaaS MVPs, and full-stack platforms.",
              },
              {
                icon: Brain,
                title: "AI Systems",
                desc: "AI chatbots, RAG systems, summarizers, automation workflows, and LLM-powered tools.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className={`relative overflow-hidden p-6 md:p-8 rounded-3xl border shadow-sm transition-all duration-300 ${
                  isDark
                    ? "border-neutral-800/80 bg-neutral-900/20 hover:border-neutral-700"
                    : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    isDark
                      ? "bg-neutral-950 border-neutral-800 text-blue-400"
                      : "bg-slate-50 border-slate-200 text-sky-600"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight">
                  {item.title}
                </h3>
                <p
                  className={`mt-2 text-xs md:text-sm leading-relaxed ${
                    isDark ? "text-neutral-400" : "text-slate-500"
                  }`}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </section>
        </Reveal>

        {/* CORE VALUES */}
        <Reveal>
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                How We Work
              </h2>
              <p
                className={`text-sm md:text-base max-w-2xl mx-auto ${
                  isDark ? "text-neutral-400" : "text-slate-500"
                }`}
              >
                Simple process, clean execution, and fewer mysterious agency
                rituals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4 }}
                  className={`relative overflow-hidden p-6 md:p-8 rounded-3xl border shadow-sm transition-all duration-300 ${
                    isDark
                      ? "border-neutral-800/80 bg-neutral-900/20 hover:border-neutral-700"
                      : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      isDark
                        ? "bg-neutral-950 border-neutral-800 text-blue-400"
                        : "bg-slate-50 border-slate-200 text-sky-600"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 text-xs md:text-sm leading-relaxed ${
                      isDark ? "text-neutral-400" : "text-slate-500"
                    }`}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* WHY CLIENTS WORK WITH US */}
        <Reveal>
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Why Work With Us
              </h2>
              <p
                className={`text-sm md:text-base max-w-2xl mx-auto ${
                  isDark ? "text-neutral-400" : "text-slate-500"
                }`}
              >
                We combine focused development, clear communication, and modern
                tools to help you move from idea to launch faster.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trustPoints.map((item, i) => (
                <div
                  key={item.title}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                    isDark
                      ? "border-neutral-800/60 bg-neutral-900/10 hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-950/50"
                      : "border-slate-200 bg-white hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/40"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs font-mono ${
                          isDark ? "text-neutral-600" : "text-slate-400"
                        }`}
                      >
                        0{i + 1} //
                      </span>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          isDark
                            ? "text-neutral-700 group-hover:text-blue-400"
                            : "text-slate-300 group-hover:text-sky-500"
                        }`}
                      />
                    </div>

                    <h3
                      className={`text-base font-bold tracking-tight mt-4 ${
                        isDark ? "text-neutral-200" : "text-slate-800"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-xs mt-2 leading-relaxed ${
                        isDark ? "text-neutral-500" : "text-slate-400"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* TEAM NOTE */}
        <Reveal>
          <section
            className={`relative overflow-hidden rounded-[32px] border p-8 md:p-12 text-center ${
              isDark
                ? "border-neutral-800 bg-neutral-900/20"
                : "border-sky-200/60 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/60"
            }`}
          >
            <Users
              className={`mx-auto w-10 h-10 ${
                isDark ? "text-blue-400" : "text-sky-600"
              }`}
            />

            <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">
              Small team. Serious execution.
            </h2>

            <p
              className={`mt-5 max-w-2xl mx-auto text-sm md:text-base leading-relaxed ${
                isDark ? "text-neutral-400" : "text-slate-500"
              }`}
            >
              Skyline Web Co is intentionally lean: two developers and a
              client-focused manager handling communication, coordination, and
              project flow. That keeps the process fast, affordable, and direct,
              which is apparently what happens when bureaucracy is not invited
              to every meeting.
            </p>
          </section>
        </Reveal>
      </main>
    </div>
  );
};

export default About;