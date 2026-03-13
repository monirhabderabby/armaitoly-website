import Image from "next/image";

const restaurants = [
  { name: "Chana Masala", desc: "Indian (opposite Jay Beach Villas)" },
  { name: "Sati Pot", desc: "Persian (180 meters)" },
  { name: "Romanzo Tropicale", desc: "Italian (200 meters)" },
  { name: "L'Alcove", desc: "French-Thai fusion (350 meters)" },
  { name: "Nena's", desc: "Italian (2 km)" },
  { name: "Beer Bistro", desc: "Western food (2 km)" },
  { name: "Beers", desc: "(2.5 km)" },
  { name: "Seed to feed", desc: "Organic food (3.5 km)" },
  { name: "Beach Garden", desc: "French cuisine (9 km)" },
];

const breakfast = [
  { name: "AROMA", dist: "150 m" },
  { name: "Mimi's Cafe", dist: "1 km" },
  { name: "Cookies", dist: "1.3 km" },
  { name: "Niras Bakery", dist: "4.3 km" },
  { name: "Sweet Cafe Thongsala", desc: "German breakfast", dist: "4.2 km" },
  { name: "World End Cafe Chaloklum", dist: "10 km" },
];

const sunsetSpots = [
  { name: "Seagarden 2", dist: "2.5 km" },
  { name: "Charlie's", dist: "1.5 km" },
  { name: "Seagarden 2", dist: "2.5 km" },
  { name: "Charlie's", dist: "1.5 km" },
  { name: "Top Rock", dist: "3 km" },
  { name: "Apichada View-point bar", dist: "8.5 km" },
  { name: "Top Rock", dist: "3 km" },
  { name: "Apichada View-point bar", dist: "8.5 km" },
];

function SectionHeader({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-0.5">
      <Image
        src="/logo-shape.png"
        alt=""
        width={20}
        height={14}
        className="object-contain"
      />
      <h2 className="font-sans text-sm font-semibold tracking-[-0.01em] text-[#24a9e1]">
        {text}
      </h2>
    </div>
  );
}

function RestaurantIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-3 h-3 shrink-0 mt-px"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
}

function CafeIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-3 h-3 shrink-0 mt-px"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h18M9 3v18m6-18v18M3 12h18"
      />
    </svg>
  );
}

function PinIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-3 h-3 shrink-0 mt-px"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export default function WhereToGo() {
  return (
    <section className="bg-white px-4 py-6 max-w-325 mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="font-sans text-2xl sm:text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-slate-900">
          Where to go?
        </h1>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <Image
            src="/logo-shape.png"
            alt=""
            width={28}
            height={16}
            className="h-4 w-auto object-contain"
          />
          <p className="font-sans text-sm font-semibold text-[#24a9e1] tracking-[-0.01em]">
            Our warm recommendations!
          </p>
        </div>
        <p className="font-sans text-sm leading-relaxed text-slate-500 mt-2 max-w-2xl mx-auto">
          Joy Beach Villas remains unwavering in our commitment to protecting
          the environment. As our planet has gifted us with so much beauty,
          comfort, and resources, we believe that it is our responsibility to
          give back and take care of it. This is exactly why we have
          continuously put green initiatives in place to make our place in Koh
          Phangan eco-friendly.
        </p>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: Restaurants */}
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <div className="px-3 pt-3 pb-1.5">
            <SectionHeader text="Restaurant recommendations" />
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-slate-400 italic mb-2">
              (Please, kindly ask Reception for any booking or special request)
            </p>
          </div>

          {/* Restaurant image */}
          <div className="relative h-36 w-full">
            <Image
              src="/restuarent.jpg"
              alt="Restaurant"
              fill
              className="object-cover"
            />
          </div>

          <div className="px-3 py-2 grid grid-cols-2 gap-x-3 gap-y-2">
            {/* Restaurants list */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-1">
                Restaurants:
              </p>
              <ul className="space-y-0.5">
                {restaurants.map((r, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <RestaurantIcon
                      color={i % 2 === 0 ? "#24a9e1" : "#89A129"}
                    />
                    <span className="font-sans text-sm leading-relaxed text-slate-500">
                      <span className="font-medium text-slate-700">
                        {r.name}
                      </span>
                      {r.desc ? ` – ${r.desc}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Breakfast & Brunch */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-1">
                Breakfast & Brunch:
              </p>
              <ul className="space-y-0.5">
                {breakfast.map((b, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <CafeIcon color={i % 2 === 0 ? "#24a9e1" : "#89A129"} />
                    <span className="font-sans text-sm leading-relaxed text-slate-500">
                      <span className="font-medium text-slate-700">
                        {b.name}
                      </span>
                      {b.desc ? ` (${b.desc})` : ""} – {b.dist}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: More amazing places */}
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <div className="px-3 pt-3 pb-1.5">
            <SectionHeader text="More amazing places" />
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-slate-400 italic mb-2">
              (Please, kindly ask Reception for any booking or special request)
            </p>
          </div>

          {/* Sunset image */}
          <div className="relative h-36 w-full">
            <Image
              src="/sunset-restuarent.jpg"
              alt="Sunset"
              fill
              className="object-cover"
            />
          </div>

          <div className="px-3 py-2">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-1.5">
              Enjoy the beautiful sunset:
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
              {sunsetSpots.map((s, i) => (
                <div key={i} className="flex items-start gap-1">
                  <PinIcon color={i % 2 === 0 ? "#24a9e1" : "#89A129"} />
                  <span className="font-sans text-sm leading-relaxed text-slate-500">
                    <span className="font-medium text-slate-700">{s.name}</span>{" "}
                    ({s.dist})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
