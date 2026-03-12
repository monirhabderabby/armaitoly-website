"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Accommodation", href: "/koh-phangan-accommodation" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 w-full px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Glassy background */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl -z-10 max-w-325 mx-auto px-4" />

        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="text-2xl font-bold">
              <Image
                src="/logo.png"
                height={50}
                width={50}
                alt="Joy Beach Villas Logo"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors text-sm font-medium ${
                  isActive(item.href)
                    ? "text-cyan-400"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button
              className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg px-6 py-2 text-sm font-medium transition-all"
              size="sm"
            >
              Check Availability
            </Button>

            {/* Language selector */}
            <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm">
              🇺🇸 EN
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white/80 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-4 pb-4 space-y-3 lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block transition-colors text-sm font-medium ${
                  isActive(item.href)
                    ? "text-cyan-400"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
