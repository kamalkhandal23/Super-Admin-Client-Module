import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SlideInModal = ({
  isOpen,
  onClose,
  headerText = "Modal",
  position = "right",
  size = "md",
  children,
  footer,
}) => {
  // Responsive size
  const sizeClass =
    size === "sm"
      ? "w-96"
      : size === "lg"
        ? "w-[900px]"
        : size === "full"
          ? "w-full h-full"
          : "w-[600px]";


  // Motion variants
  const variants = {
    hidden: {
      x:
        position === "right"
          ? "100%"
          : position === "left"
            ? "-100%"
            : 0,
      y: position === "bottom" ? "100%" : position === "center" ? "-20px" : 0,
      opacity: 0,
      scale: position === "center" ? 0.95 : 1,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "tween", duration: 0.3 },
    },
    exit: {
      x:
        position === "right"
          ? "100%"
          : position === "left"
            ? "-100%"
            : 0,
      y: position === "bottom" ? "100%" : position === "center" ? "-20px" : 0,
      opacity: 0,
      scale: position === "center" ? 0.95 : 1,
      transition: { type: "tween", duration: 0.25 },
    },
  };

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Panel */}
          <motion.div
            key="slide-panel"
            onClick={(e) => e.stopPropagation()} // click inside doesn’t close
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`flex flex-col bg-white dark:bg-gray-900 shadow-2xl text-gray-900 dark:text-gray-100
              ${position === "center" ? "m-auto rounded-xl" : "h-full"}
              ${position === "right" ? "ml-auto" : ""}
              ${position === "left" ? "mr-auto" : ""}
              ${position === "bottom" ? "mt-auto rounded-t-xl" : ""}
              ${sizeClass}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">{headerText}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-brand dark:hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideInModal;
