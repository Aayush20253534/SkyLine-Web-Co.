import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/contact";

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

const validate = () => {
  const newErrors = {};

  if (!form.name.trim() || form.name.trim().length < 2) {
    newErrors.name = "Please enter a valid name";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "Please enter a valid email";
  }

  if (form.message.trim().length < 10) {
    newErrors.message =
      "Message should contain at least 10 characters";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    const response = await axios.post(
      API_URL,
      {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    if (response.data.success) {
      toast.success("Briefing submitted successfully");

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }
  } catch (error) {
    console.error(error);

   toast.error(
  error?.response?.data?.message ||
  "Failed to submit form"
);
  } finally {
    setLoading(false);
  }
};
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-300 ${
      isDark ? "bg-neutral-950 text-neutral-50" : "bg-white text-slate-900"
    }`}>
      <Navbar />

      {/* AMBIENT CANVAS BACKGROUND */}
      <div className={`absolute inset-0 -z-20 bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] ${
        isDark
          ? "bg-[radial-gradient(#ffffff05_1px,transparent_1px)]"
          : "bg-[radial-gradient(#94a3b820_1px,transparent_1px)]"
      }`} />
      
      <div className={`absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? "bg-blue-500/[0.06]" : "bg-sky-300/15"
      }`} />
      <div className={`absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? "bg-purple-500/[0.06]" : "bg-blue-200/20"
      }`} />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-32 relative z-10">
        
        {/* HERO HEADER */}
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium ${
              isDark 
                ? "border-neutral-800 bg-neutral-900 text-neutral-400" 
                : "border-sky-200/60 bg-sky-50/60 text-sky-700"
            }`}>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for immediate execution
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              Let’s architect your{" "}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark ? "from-blue-500 to-purple-500" : "from-sky-500 via-blue-500 to-indigo-600"
              }`}>
                next breakthrough.
              </span>
            </h1>

            <p className={`mt-6 max-w-xl text-base md:text-lg leading-relaxed ${
              isDark ? "text-neutral-400" : "text-slate-500"
            }`}>
              From sophisticated AI orchestrations to highly transactional SaaS products, we turn ambitious strategies into pixel-perfect production reality.
            </p>

            {/* KEY METRICS PERFORMANCE STACK */}
            <div className={`mt-10 flex flex-wrap gap-8 border-t pt-8 ${
              isDark ? "border-neutral-900" : "border-slate-100"
            }`}>
              <div>
                <h3 className="text-3xl font-bold tracking-tight">20+</h3>
                <p className="text-neutral-400 dark:text-neutral-500 text-xs font-medium uppercase tracking-wider mt-1">
                  Builds Shipped
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight">99%</h3>
                <p className="text-neutral-400 dark:text-neutral-500 text-xs font-medium uppercase tracking-wider mt-1">
                  Client Retention
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight">&lt; 2h</h3>
                <p className="text-neutral-400 dark:text-neutral-500 text-xs font-medium uppercase tracking-wider mt-1">
                  Response SLA
                </p>
              </div>
            </div>
          </motion.div>

          {/* VISUAL CAPABILITIES CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className={`relative rounded-2xl border backdrop-blur-xl p-6 md:p-8 shadow-sm ${
              isDark 
                ? "border-neutral-800/80 bg-neutral-900/20" 
                : "border-slate-200 bg-white"
            }`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Capabilities Spectrum
                  </p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight">
                    Full-Cycle Engineering Hub
                  </h2>
                </div>
                <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr shadow-md ${
                  isDark 
                    ? "from-blue-500 to-purple-500 shadow-blue-500/20" 
                    : "from-sky-400 to-blue-500 shadow-sky-400/20"
                }`} />
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  "AI Automation Ecosystems",
                  "Enterprise SaaS Core Architecture",
                  "High-Fidelity Interaction Design",
                  "Distributed Cloud Infrastructure",
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 rounded-xl border p-3.5 ${
                      isDark 
                        ? "border-neutral-800/60 bg-neutral-950/40" 
                        : "border-slate-100 bg-slate-50/50"
                    }`}
                  >
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={15} />
                    <span className={`text-xs font-medium ${isDark ? "text-neutral-300" : "text-slate-600"}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* INTERACTION AND UTILITY GRID */}
        <section className="mt-20 lg:mt-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* SECURE INBOUND COMMUNICATIONS FORM */}
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`lg:col-span-7 rounded-2xl border shadow-xl p-6 md:p-8 ${
              isDark 
                ? "border-neutral-800/80 bg-neutral-900/20 shadow-neutral-950/40" 
                : "border-slate-200 bg-white shadow-slate-100"
            }`}
          >
            <h2 className="text-2xl font-bold tracking-tight">Initiate Project Discovery</h2>
            <p className={`mt-2 text-sm ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
              Provide your details below. Our technical leads analyze every submission within 2 business hours.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="text-xs font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-500 outline-none transition ${
                    isDark 
                      ? "border-neutral-800 bg-neutral-950 placeholder-neutral-600 focus:ring-2 focus:ring-blue-500/5" 
                      : "border-slate-200 bg-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/10"
                  }`}
                />
                {errors.name && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                  Corporate Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-500 outline-none transition ${
                    isDark 
                      ? "border-neutral-800 bg-neutral-950 placeholder-neutral-600 focus:ring-2 focus:ring-blue-500/5" 
                      : "border-slate-200 bg-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/10"
                  }`}
                />
                {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                  Project Parameters & Vision
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe the problem, timeline scope, and strategic goals..."
                  className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-500 outline-none resize-none transition ${
                    isDark 
                      ? "border-neutral-800 bg-neutral-950 placeholder-neutral-600 focus:ring-2 focus:ring-blue-500/5" 
                      : "border-slate-200 bg-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/10"
                  }`}
                />
                {errors.message && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading || success}
                className={`group w-full rounded-xl font-semibold text-sm h-12 flex items-center justify-center transition disabled:opacity-60 relative overflow-hidden ${
                  isDark 
                    ? "bg-neutral-50 text-neutral-950" 
                    : "bg-[#1a3d6e] text-white hover:bg-[#16325a]"
                }`}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span key="loading" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 size={16} className="animate-spin" /> Processing Transmission...
                    </motion.span>
                  ) : success ? (
                    <motion.span key="success" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <CheckCircle2 size={16} /> Briefing Received Successfully
                    </motion.span>
                  ) : (
                   <motion.span
  key="idle"
  className="flex items-center gap-2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  Transmit Briefing
  <ArrowRight
    size={16}
    className="transition-transform group-hover:translate-x-1"
  />
</motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.form>

          {/* ASYNC DIRECT COMMUNICATION SIDEBAR */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* INBOUND CHANNELS CARD */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`rounded-2xl border p-6 md:p-8 ${
                isDark ? "border-neutral-800/80 bg-neutral-900/20" : "border-slate-200 bg-white"
              }`}
            >
              <h2 className="text-lg font-bold tracking-tight">Direct Channels</h2>
              <div className="mt-6 space-y-4">
                {[
                  { icon: Mail, label: "Secure Inbound Email", val: "skylinewebco08@gmail.com", href: "mailto:contact@skylinewebco.com" },
                  { icon: Phone, label: "Direct Operations Desk", val: "+977-XXXXXXXXX", href: "tel:+977XXXXXXXXX" },
                  { icon: MessageCircle, label: "Encrypted WhatsApp Node", val: "Instant Support Active", href: "https://wa.me/8936091025" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className={`flex items-center gap-4 rounded-xl border p-3.5 transition group ${
                      isDark 
                        ? "border-neutral-800/60 bg-neutral-950/40 hover:border-neutral-700" 
                        : "border-slate-100 bg-slate-50/50 hover:border-sky-200 hover:bg-white"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition ${
                      isDark 
                        ? "bg-neutral-900 border-neutral-800 text-neutral-400 group-hover:text-white" 
                        : "bg-white border-slate-200 text-slate-500 group-hover:text-slate-900 group-hover:border-sky-200"
                    }`}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">{item.label}</p>
                      <span className={`text-sm font-semibold mt-0.5 block ${isDark ? "text-neutral-300" : "text-slate-700"}`}>{item.val}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* PROCESS ECOSYSTEM CARD */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`rounded-2xl border p-6 md:p-8 ${
                isDark ? "border-neutral-800/80 bg-neutral-900/20" : "border-slate-200 bg-white"
              }`}
            >
              <h2 className="text-lg font-bold tracking-tight">Development Lifecycle</h2>
              <div className={`mt-6 space-y-3.5 relative before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-px ${
                isDark ? "before:bg-neutral-800" : "before:bg-slate-100"
              }`}>
                {[
                  "Deep Alignment & Architecture Blueprinting",
                  "Phased Agile Engineering Sprints",
                  "Automated Isolation Testing & Deployment",
                  "Continuous Production Optimization",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 relative z-10">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold shadow-sm ${
                      isDark 
                        ? "bg-neutral-950 border-neutral-800 text-neutral-300" 
                        : "bg-white border-slate-200 text-slate-700"
                    }`}>
                      {i + 1}
                    </div>
                    <p className={`text-xs font-medium ${isDark ? "text-neutral-400" : "text-slate-600"}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;