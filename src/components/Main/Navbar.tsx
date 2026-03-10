"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Car", href: "/car" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-0 w-full flex justify-center z-50 px-4">
      {/* Desktop nav */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex gap-8 lg:gap-12 px-10 lg:px-20 py-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg relative"
      >
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                relative text-md font-semibold px-2 py-1 tracking-wide uppercase
                transition-colors duration-300
                ${active ? "text-black" : "text-black/40 hover:text-black"}
              `}
            >
              {item.name}

              {active && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-black rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}
            </Link>
          );
        })}
      </motion.div>

      {/* Mobile hamburger button */}
      <motion.button
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </motion.button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-3 left-4 right-4 md:hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col py-3">
              {navItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      px-6 py-3 text-sm font-semibold uppercase tracking-wide
                      transition-colors duration-200
                      ${active ? "text-black bg-black/5" : "text-black/50 hover:text-black hover:bg-black/5"}
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
