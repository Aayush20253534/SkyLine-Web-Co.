import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const faqs = [
  {
    q: "What services does SkyLine Web Co. provide?",
    a: "We specialize in web development, AI integrations, SaaS platforms, automation systems, RAG architectures, and UI/UX design for modern businesses.",
  },
  {
    q: "Do you work with startups or only large companies?",
    a: "We primarily work with startups, SaaS founders, and growing businesses, but we also handle enterprise-level systems when required.",
  },
  {
    q: "Can you integrate AI into existing products?",
    a: "Yes. We integrate AI chatbots, automation pipelines, and RAG systems into existing platforms without requiring a full rebuild.",
  },
  {
    q: "How long does a typical project take?",
    a: "Depending on complexity, projects typically range from 2 to 8 weeks including design, development, and deployment.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. We offer maintenance, scaling support, and feature upgrades after deployment to ensure long-term stability.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      className={`pt-16 pb-16 border-t transition-colors duration-300 ${
        isDark
          ? "border-neutral-800 bg-black text-neutral-50"
          : "border-slate-200 bg-[#f6fbff] text-slate-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className={`mt-4 text-base md:text-lg ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
            Everything you need to know before starting a project with us.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isDark
                    ? "border-neutral-800 bg-neutral-900/30 hover:border-neutral-700"
                    : "border-slate-200 bg-white/80 hover:border-sky-200 hover:shadow-sm hover:shadow-sky-100/50"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span
                    className={`font-medium text-base md:text-lg transition-colors duration-200 ${
                      isDark
                        ? "text-neutral-200 group-hover:text-white"
                        : "text-slate-700 group-hover:text-slate-900"
                    }`}
                  >
                    {item.q}
                  </span>

                  <span
                    className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    } ${
                      isDark
                        ? `bg-neutral-800 text-neutral-400 ${isOpen ? "bg-neutral-700 text-neutral-100" : ""}`
                        : `bg-slate-100 text-slate-500 ${isOpen ? "bg-sky-100 text-sky-600" : ""}`
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div
                        className={`px-6 pb-6 text-sm md:text-base leading-relaxed max-w-3xl ${
                          isDark ? "text-neutral-400" : "text-slate-500"
                        }`}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;