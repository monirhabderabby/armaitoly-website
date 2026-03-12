import { siteInfo } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ItemType {
  id: number;
  name: string;
  href: string;
}

const items = [
  { id: 1, name: "Privacy Policy", href: "/privacy-policy" },
  { id: 2, name: "Imprint", href: "" },
  { id: 3, name: "Terms & Conditions", href: "" },
] as ItemType[];

const headingClass =
  "font-['Playfair_Display'] text-[#0d3a52] text-sm font-semibold mb-3 pb-2 relative w-fit " +
  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-7 after:h-0.5 after:bg-[#24a9e1] after:rounded-full";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-[#f0f8fd] to-[#e6f4fb] border-t-[3px] border-[#24a9e1] font-[Lato,sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@600&display=swap');
      `}</style>

      {/* Mobile logo — spans 2 columns */}
      <div className="flex lg:hidden justify-center col-span-2 pb-2">
        <Image
          src="/logo.png"
          alt="JOY Beach Villas"
          width={130}
          height={75}
          className="object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/*
        Desktop: 5 columns — Info | Address | Logo | Contact | Reception
        Tablet:  2 columns
        Mobile:  1 column
      */}
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_1fr_1fr] gap-8 max-w-325 mx-auto px-8 pt-6 lg:pt-12 pb-8 items-start">
        {/* Col 1 — Info */}
        <div className="flex flex-col gap-1 mx-auto">
          <h4 className={headingClass}>Info</h4>
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href || undefined}
              target={item.href ? "_blank" : undefined}
              className={cn(
                "text-[#4a6a7a] text-xs leading-relaxed tracking-wide transition-all duration-200 w-fit",
                item.href
                  ? "hover:text-[#24a9e1] hover:translate-x-1 cursor-pointer"
                  : "cursor-not-allowed opacity-40 pointer-events-none",
              )}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Col 2 — Address */}
        <div className="flex flex-col gap-0.5 mx-auto">
          <h4 className={headingClass}>Address</h4>
          {[
            "JOY – Beach Villas",
            "4, Hin Kong Rd",
            "84280 Koh Phangan",
            "Surat Thani, Thailand",
          ].map((line) => (
            <p
              key={line}
              className="text-[#4a6a7a] text-xs leading-relaxed tracking-wide"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Col 3 — Logo (desktop only, fills full column with fill layout) */}
        <div className="hidden lg:flex justify-center items-center w-full py-2 mx-auto">
          <div className="relative w-full min-h-22.5">
            <Image
              src="/logo.png"
              alt="JOY Beach Villas"
              fill
              className="object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Col 4 — Contact */}
        <div className="flex flex-col gap-1 mx-auto">
          <h4 className={headingClass}>Contact</h4>
          <a
            href="mailto:reception@joybeachvillas.com"
            className="text-[#4a6a7a] text-xs leading-relaxed tracking-wide transition-all duration-200 hover:text-[#24a9e1] w-fit"
          >
            {siteInfo.email}
          </a>
          <a
            href={`tel:${siteInfo.phone}`}
            className="text-[#4a6a7a] text-xs leading-relaxed tracking-wide transition-all duration-200 hover:text-[#24a9e1] w-fit"
          >
            {siteInfo.phone}
          </a>
        </div>

        {/* Col 5 — Reception + Social */}
        <div className="flex flex-col gap-1 mx-auto">
          <h4 className={headingClass}>Reception</h4>
          {["Opening hours", "Monday – Saturday", "8 am – 5 pm"].map((line) => (
            <p
              key={line}
              className="text-[#4a6a7a] text-xs leading-relaxed tracking-wide"
            >
              {line}
            </p>
          ))}

          {/* Social Icons */}
          <div className="flex gap-2 mt-4">
            <a
              href={siteInfo.facebook}
              target="_blank"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#1877f2]/30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a
              href={siteInfo.instagram}
              target="_blank"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{
                background:
                  "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#24a9e1]/20 py-4 px-6 text-center">
        <p className="text-[#24a9e1]/60 text-xs tracking-wider">
          © {currentYear} Joy Beach Villas – Itworx Ltd
        </p>
      </div>
    </footer>
  );
};

export default Footer;
