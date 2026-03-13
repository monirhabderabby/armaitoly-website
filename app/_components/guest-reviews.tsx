import Image from "next/image";

const reviews = [
  {
    avatar: "/profile/desiree.jpg",
    name: "Desiree Qelaj",
    title: '"Joy Beach Villas are spacious"',
    rating: 5,
    body: "Beautiful, well equipped Villas on the beach. I really enjoyed my stay in the Joy Villas, with the spacious rooms and the peaceful garden around. They have the perfect spot on the island with the most amazing sunsets, and one of the best coffee shops just next to it. Also other good restaurants are just in walking distance to reach. It's definitely a place I recommend and I'll always go back to. Thank you for the kind hospitality and service. See you soon.",
    accent: "border-l-[#24a9e1]",
    bg: "bg-[#f0faff]",
  },
  {
    avatar: "/staff.avif",
    name: "Tom Shay",
    title: '"The staff was extremely nice and responsive"',
    rating: 5,
    body: "We had a great stay at Joy. The beachfront villa is very comfortable, with an amazing view, and a great pool next to it. The staff was extremely nice and responsive, which made our stay even better than expected. We will definitely come back next time we are in Koh Phangan. Highly recommended!",
    accent: "border-l-[#24a9e1]",
    bg: "bg-[#f0faff]",
  },
  {
    avatar: "/profile/qelaz.png",
    name: "Laura Hofmann",
    title: '"The Beachfront Villa is a dream"',
    rating: 5,
    body: "The Joy Resort is a beautiful resort in a prime location in Koh Phangan. The bungalows/villas are beautiful and very large (living room/kitchen, bedroom, bathroom and a very large terrace. We had the beach front villa and it was a dream. The whole Joy Resort team is incredibly nice and helpful. We'll be back very soon once again.",
    accent: "border-l-[#5db85d]",
    bg: "bg-[#f4fbf4]",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f5a623">
          <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function GuestReviews() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-325 mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className=" text-2xl sm:text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-slate-900 mb-1.5">
            What our guests say
          </h2>
          <div className="flex items-center gap-2">
            <Image
              src="/logo-shape.png"
              alt=""
              width={36}
              height={20}
              className="h-4 w-auto object-contain"
            />
            <span className="font-sans text-sm font-medium text-[#24a9e1] tracking-[-0.01em]">
              Check out our recent reviews
            </span>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`
                relative flex flex-col gap-4 rounded-xl p-5 sm:p-6
                border border-slate-100 border-l-4 ${review.accent} ${review.bg}
                transition-shadow duration-300 hover:shadow-md hover:shadow-black/6
              `}
            >
              {/* Quote mark */}
              <svg
                className="absolute top-4 right-5 opacity-10"
                width="28"
                height="22"
                viewBox="0 0 28 22"
                fill="#24a9e1"
              >
                <path d="M0 22V13.4C0 9.4 1 6.2 3 3.8 5 1.3 8 0 12 0v4c-2.3 0-4 .8-5.2 2.3C5.6 7.8 5 9.8 5 12.2h5V22H0zm16 0V13.4c0-4 1-7.2 3-9.6C21 1.3 24 0 28 0v4c-2.3 0-4 .8-5.2 2.3-1.2 1.5-1.8 3.5-1.8 5.9h5V22H16z" />
              </svg>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Stars count={review.rating} />
                  <p className="font-sans text-[11px] text-slate-400 font-medium">
                    – {review.name}
                  </p>
                </div>
              </div>

              {/* Title */}
              <p className="font-sans text-xs font-semibold text-slate-700 leading-snug">
                {review.title}
              </p>

              {/* Body */}
              <p className="font-sans text-xs leading-relaxed text-slate-500">
                {review.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
