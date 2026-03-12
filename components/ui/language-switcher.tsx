"use client";

import { isClient } from "@/lib/client-utils";
import "flag-icons/css/flag-icons.min.css";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useRef, useState } from "react";

type GoogleTranslationConfig = {
  defaultLanguage: string;
  languages: { name: string; title: string }[];
};

declare global {
  interface Window {
    __GOOGLE_TRANSLATION_CONFIG__?: GoogleTranslationConfig;
  }
}

const COOKIE_NAME = "googtrans";

const LANG_META: Record<string, { countryCode: string; code: string }> = {
  en: { countryCode: "us", code: "EN" },
  de: { countryCode: "de", code: "DE" },
  fr: { countryCode: "fr", code: "FR" },
  es: { countryCode: "es", code: "ES" },
};

type Props = {
  mobile?: boolean;
};

const LanguageSwitcherComponent = ({ mobile = false }: Props) => {
  const [currentLang, setCurrentLang] = useState("en");
  const [config, setConfig] = useState<GoogleTranslationConfig | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isClient) return;

    const handleConfig = () => {
      const translationConfig = window.__GOOGLE_TRANSLATION_CONFIG__;
      if (!translationConfig) return;
      setConfig(translationConfig);
      const cookie = parseCookies()[COOKIE_NAME];
      const lang = cookie?.split("/")?.[2] || translationConfig.defaultLanguage;
      setCurrentLang(lang);
    };

    if (window.__GOOGLE_TRANSLATION_CONFIG__) handleConfig();
    window.addEventListener("translationConfigReady", handleConfig);
    return () =>
      window.removeEventListener("translationConfigReady", handleConfig);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLang = (lang: string) => {
    setCookie(undefined, COOKIE_NAME, `/auto/${lang}`, { path: "/" });
    setCurrentLang(lang);
    setLangOpen(false);
    if (isClient) window.location.reload();
  };

  if (!config) return null;

  const activeMeta = LANG_META[currentLang] ?? {
    countryCode: currentLang,
    code: currentLang.toUpperCase(),
  };

  // ── Mobile: pill button row ──────────────────────────────────────────────
  if (mobile) {
    return (
      <div className="flex flex-wrap gap-2">
        {config.languages.map((lang) => {
          const meta = LANG_META[lang.name] ?? {
            countryCode: lang.name,
            code: lang.name.toUpperCase(),
          };
          const isSelected = currentLang === lang.name;
          return (
            <button
              key={lang.name}
              onClick={() => switchLang(lang.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                isSelected
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                  : "text-white/70 hover:text-white hover:bg-white/10 border-white/10"
              }`}
            >
              <span
                className={`fi fi-${meta.countryCode} rounded-sm`}
                style={{ width: 20, height: 15, display: "inline-block" }}
              />
              <span>{meta.code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // ── Desktop: flag + code + chevron dropdown ──────────────────────────────
  return (
    <div ref={langRef} className="relative">
      <button
        onClick={() => setLangOpen(!langOpen)}
        className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-sm px-2 py-1 rounded-lg hover:bg-white/10"
      >
        <span
          className={`fi fi-${activeMeta.countryCode} rounded-sm`}
          style={{ width: 20, height: 15, display: "inline-block" }}
        />
        <span className="font-medium">{activeMeta.code}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
        />
      </button>

      {langOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl">
          {config.languages.map((lang) => {
            const meta = LANG_META[lang.name] ?? {
              countryCode: lang.name,
              code: lang.name.toUpperCase(),
            };
            return (
              <button
                key={lang.name}
                onClick={() => switchLang(lang.name)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors text-left ${
                  currentLang === lang.name
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`fi fi-${meta.countryCode} rounded-sm`}
                  style={{ width: 20, height: 15, display: "inline-block" }}
                />
                <span className="font-medium text-black">{meta.code}</span>
                <span className="text-black/40 text-xs ml-auto">
                  {lang.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const LanguageSwitcher = dynamic(
  () => Promise.resolve(LanguageSwitcherComponent),
  { ssr: false },
);

export default LanguageSwitcher;
