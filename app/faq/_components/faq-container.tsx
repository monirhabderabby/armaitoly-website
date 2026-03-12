"use client";

import { useGetAllFaqs } from "@/hooks/faqs/use-get-all-faqs";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

const FaqContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetAllFaqs();

  const faqs = useMemo(() => data?.data ?? [], [data]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return faqs;
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q),
    );
  }, [faqs, searchQuery]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center justify-between gap-4 mb-6"
      >
        <h1 className="text-lg font-semibold text-gray-900 whitespace-nowrap tracking-tight">
          Frequently asked questions
        </h1>

        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all placeholder:text-gray-400"
          />
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ originX: 0 }}
        className="h-px bg-gray-200 mb-4"
      />

      {/* Loading skeletons */}
      {isLoading && (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="h-11 bg-gray-100 rounded animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 py-4"
        >
          Failed to load FAQs.
        </motion.p>
      )}

      {/* Empty state */}
      <AnimatePresence>
        {!isLoading && !isError && filtered.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="py-10 text-center"
          >
            <p className="text-sm text-gray-400">
              No FAQs match &quot;{searchQuery}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ List */}
      {!isLoading && !isError && filtered.length > 0 && (
        <motion.div
          className="divide-y divide-gray-100"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.055 } },
          }}
        >
          <AnimatePresence>
            {filtered.map((faq) => {
              const isOpen = openId === faq._id;
              return (
                <motion.div
                  key={faq._id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.25, ease: "easeOut" },
                    },
                  }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                  layout
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq._id)}
                    className="w-full flex items-center justify-between gap-4 py-3 text-left group"
                  >
                    <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="pb-3 text-sm text-gray-500 leading-relaxed pr-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Footer count */}
      <AnimatePresence>
        {!isLoading && !isError && faqs.length > 0 && (
          <motion.p
            key="count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="mt-5 text-xs text-gray-400"
          >
            {filtered.length} of {faqs.length} questions
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqContainer;
