import Image from "next/image";

const initiatives = [
  {
    icon: (
      <Image
        src="/icons/clean-water.gif"
        alt="Clean Water"
        width={60}
        height={60}
        unoptimized
      />
    ),
    text: "Our two swimming pools are disinfected with ‘salt’ instead of the much more aggressive chlorine.",
  },
  {
    icon: (
      <Image
        src="/icons/batery.gif"
        alt="Clean Water"
        width={60}
        height={60}
        unoptimized
      />
    ),
    text: "We use solar panels to reduce the local energy grid (as Phangan is an island) and produce our own ‘green energy.’",
  },
  {
    icon: (
      <Image
        src="/icons/water.gif"
        alt="Clean Water"
        width={60}
        height={60}
        unoptimized
      />
    ),
    text: "As a plastic-free zone, all villas have glass bottles, which can be refilled for free in the refilling stations at the reception area and Yoga Shala. ",
  },
  {
    icon: (
      <Image
        src="/icons/organic-product.gif"
        alt="Clean Water"
        width={60}
        height={60}
        unoptimized
      />
    ),
    text: "Organic shower gel and shampoo are provided. ",
  },
  {
    icon: (
      <Image
        src="/icons/green-idea.gif"
        alt="Clean Water"
        width={60}
        height={60}
        unoptimized
      />
    ),
    text: "All our air-conditioning units are inverters, which allow less carbon dioxide emission. We also use energy-efficient LED bulbs and highly encourage everyone to reduce electricity usage by switching off lights and other machines when not in use or when the villas are empty. ",
  },
  {
    icon: (
      <Image
        src="/icons/recycle.gif"
        alt="Clean Water"
        width={60}
        height={60}
        unoptimized
      />
    ),
    text: "A recycling station can also be found at the main entrance. Guests are requested to segregate their garbage.",
  },
];

export default function GivingBackEnvironment() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24" id="eco">
      <div className="max-w-325 mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <h2 className=" text-2xl sm:text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 mb-1.5">
            Giving Back to the Environment
          </h2>
          <div className="flex items-center gap-2">
            <Image
              src="/logo-shape.png"
              alt=""
              width={36}
              height={20}
              className="h-4 w-auto object-contain"
            />
            <span className="font-sans text-sm font-semibold text-[#24a9e1] tracking-[-0.01em]">
              Loving is caring
            </span>
          </div>

          {/* Intro paragraph */}
          <p className="font-sans text-sm leading-relaxed text-slate-500 max-w-3xl mt-6">
            Joy Beach Villas remains unwavering in our commitment to protecting
            the environment. As our planet has gifted us with so much beauty,
            comfort, and resources, we believe that it is our responsibility to
            give back and take care of it. This is exactly why we have
            continuously put green initiatives in place to make our place in Koh
            Phangan eco-friendly.
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-slate-100 mb-12 lg:mb-16" />

        {/* ── Icon grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {initiatives.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 group"
            >
              {/* Icon ring */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full border border-[#24a9e1]/20 bg-[#24a9e1]/4 group-hover:bg-[#24a9e1]/10 group-hover:border-[#24a9e1]/40 transition-all duration-300 shrink-0">
                {item.icon}
              </div>

              {/* Text */}
              <p className="font-sans text-[11px] sm:text-xs leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors duration-200">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
