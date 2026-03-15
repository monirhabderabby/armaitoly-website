// "use client";

// import { useState } from "react";

// // ─── Icons ────────────────────────────────────────────────────────────────────
// const IconChevronLeft = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="15 18 9 12 15 6" />
//   </svg>
// );
// const IconCheck = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="20 6 9 17 4 12" />
//   </svg>
// );
// const IconShield = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//   </svg>
// );
// const IconUser = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );
// const IconCreditCard = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
//     <line x1="1" y1="10" x2="23" y2="10" />
//   </svg>
// );
// const IconMapPin = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
//     <circle cx="12" cy="10" r="3" />
//   </svg>
// );
// const IconPhone = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2 .84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );
// const IconMail = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//     <polyline points="22,6 12,13 2,6" />
//   </svg>
// );
// const IconClock = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <polyline points="12 6 12 12 16 14" />
//   </svg>
// );
// const IconLoader = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="animate-spin"
//   >
//     <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//   </svg>
// );

// // ─── Shared primitives — defined at module scope, never inside a component ────
// const SectionHeading = ({ title }: { title: string }) => (
//   <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
//     {title}
//   </h3>
// );

// const Steps = ({ current }: { current: number }) => (
//   <div className="flex items-center gap-2 mb-8">
//     {(
//       [
//         { n: 1, label: "Guest Info" },
//         { n: 2, label: "Payment" },
//       ] as const
//     ).map((s, i) => (
//       <div key={s.n} className="flex items-center gap-2">
//         <div className="flex items-center gap-2">
//           <div
//             className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
//               current >= s.n
//                 ? "bg-[#24a9e1] text-white shadow-sm shadow-[#24a9e1]/30"
//                 : "border border-gray-200 bg-white text-gray-400"
//             }`}
//           >
//             {current > s.n ? <IconCheck /> : s.n}
//           </div>
//           <span
//             className={`text-sm font-medium hidden sm:block ${current >= s.n ? "text-gray-700" : "text-gray-400"}`}
//           >
//             {s.label}
//           </span>
//         </div>
//         {i < 1 && (
//           <div
//             className={`h-px w-8 sm:w-16 transition-colors ${current > s.n ? "bg-[#24a9e1]" : "bg-gray-200"}`}
//           />
//         )}
//       </div>
//     ))}
//   </div>
// );

// // ─── Types ────────────────────────────────────────────────────────────────────
// export interface GuestData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   postcode: string;
//   country: string;
//   arrivalTime: string;
//   comment: string;
// }
// export interface CardData {
//   number: string;
//   expiry: string;
//   cvv: string;
//   name: string;
// }
// export interface VillaInfo {
//   name: string;
//   location: string;
//   image?: string;
//   checkIn: string;
//   checkOut: string;
//   guests: number;
//   cleaningFee: number;
//   total: number;
//   currency?: string;
// }
// interface PaymentFormContainerProps {
//   villa?: VillaInfo;
//   onSubmit?: (data: {
//     guest: GuestData;
//     card: CardData;
//     voucher: string;
//   }) => void;
// }

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// const fmt4 = (v: string) =>
//   v
//     .replace(/\D/g, "")
//     .slice(0, 16)
//     .replace(/(.{4})/g, "$1 ")
//     .trim();
// const fmtExp = (v: string) => {
//   const d = v.replace(/\D/g, "").slice(0, 4);
//   return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
// };
// const inputCls = (err?: boolean) =>
//   `w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-300 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
//     err
//       ? "border-red-300 focus:border-red-400 focus:ring-red-100"
//       : "border-gray-200 focus:border-[#24a9e1] focus:ring-[#24a9e1]/10 hover:border-gray-300"
//   }`;
// const lbl =
//   "mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400";
// const errMsg = (msg?: string) =>
//   msg ? <p className="mt-1 text-xs text-red-500">{msg}</p> : null;

// const defaultVilla: VillaInfo = {
//   name: "Deluxe Garden Villa",
//   location: "Bali, Indonesia",
//   checkIn: "Sunday 12 February",
//   checkOut: "Sunday 19 February",
//   guests: 4,
//   cleaningFee: 850,
//   total: 1300,
//   currency: "USD",
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function PaymentFormContainer({
//   villa = defaultVilla,
//   onSubmit,
// }: PaymentFormContainerProps) {
//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [voucher, setVoucher] = useState("");
//   const [voucherApplied, setVoucherApplied] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [guest, setGuest] = useState<GuestData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postcode: "",
//     country: "",
//     arrivalTime: "",
//     comment: "",
//   });
//   const [card, setCard] = useState<CardData>({
//     number: "",
//     expiry: "",
//     cvv: "",
//     name: "",
//   });
//   const [gErr, setGErr] = useState<Partial<Record<keyof GuestData, string>>>(
//     {},
//   );
//   const [cErr, setCErr] = useState<Partial<Record<keyof CardData, string>>>({});

//   // Stable onChange helpers — setGuest is stable so these won't cause remounts
//   const onGuest =
//     (k: keyof GuestData) =>
//     (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//       setGuest((p) => ({ ...p, [k]: e.target.value }));

//   const validateGuest = () => {
//     const e: Partial<Record<keyof GuestData, string>> = {};
//     if (!guest.firstName.trim()) e.firstName = "Required";
//     if (!guest.lastName.trim()) e.lastName = "Required";
//     if (!/\S+@\S+\.\S+/.test(guest.email)) e.email = "Valid email required";
//     if (!guest.phone.trim()) e.phone = "Required";
//     if (!guest.address.trim()) e.address = "Required";
//     if (!guest.city.trim()) e.city = "Required";
//     setGErr(e);
//     return Object.keys(e).length === 0;
//   };

//   const validateCard = () => {
//     const e: Partial<Record<keyof CardData, string>> = {};
//     if (card.number.replace(/\s/g, "").length < 16)
//       e.number = "Enter a valid 16-digit number";
//     if (card.expiry.length < 5) e.expiry = "Enter valid expiry MM/YY";
//     if (card.cvv.length < 3) e.cvv = "Enter valid CVV";
//     if (!card.name.trim()) e.name = "Name on card is required";
//     setCErr(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleGuestNext = () => {
//     if (validateGuest()) setStep(2);
//   };

//   const handleSubmit = async () => {
//     if (!validateCard()) return;
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 1500));
//     setLoading(false);
//     onSubmit?.({ guest, card, voucher });
//     setStep(3);
//   };

//   const handleReset = () => {
//     setStep(1);
//     setCard({ number: "", expiry: "", cvv: "", name: "" });
//     setGuest({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       postcode: "",
//       country: "",
//       arrivalTime: "",
//       comment: "",
//     });
//     setVoucher("");
//     setVoucherApplied(false);
//     setGErr({});
//     setCErr({});
//   };

//   return (
//     <section className="mx-auto max-w-325 px-4 py-10 lg:px-8 ">
//       {/* Page header */}
//       <div className="mb-2">
//         <div className="mb-2">
//           <span
//             className="rounded-full px-3 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white"
//             style={{ backgroundColor: "#24a9e1" }}
//           >
//             Payment Required
//           </span>
//         </div>
//         <h1 className="text-2xl font-bold tracking-tight text-gray-900">
//           {step === 3
//             ? "You're all set!"
//             : `${villa.name} requires a payment of  ${villa.total.toLocaleString()} ${villa.currency}`}
//         </h1>
//         {step < 3 && (
//           <p className="mt-1 text-sm text-gray-500">
//             Complete the steps below to confirm your booking.
//           </p>
//         )}
//       </div>

//       {step < 3 && <Steps current={step} />}

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//         {/* ── LEFT: Form ────────────────────────────────────────────────────── */}
//         <div className="lg:col-span-2">
//           {/* STEP 1: Guest Information */}
//           {step === 1 && (
//             <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden">
//               <div className="px-6 pt-6 pb-5 border-b border-gray-100">
//                 <SectionHeading title="Guest Information" />
//                 <p className="text-sm text-gray-500">
//                   Tell us who&apos;s staying at the villa.
//                 </p>
//               </div>

//               <div className="px-6 py-6 space-y-5">
//                 {/* Name */}
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                   <div>
//                     <label className={lbl}>
//                       <IconUser /> First Name
//                     </label>
//                     <input
//                       className={inputCls(!!gErr.firstName)}
//                       placeholder="Savannah"
//                       value={guest.firstName}
//                       onChange={onGuest("firstName")}
//                     />
//                     {errMsg(gErr.firstName)}
//                   </div>
//                   <div>
//                     <label className={lbl}>
//                       <IconUser /> Last Name
//                     </label>
//                     <input
//                       className={inputCls(!!gErr.lastName)}
//                       placeholder="Nguyen"
//                       value={guest.lastName}
//                       onChange={onGuest("lastName")}
//                     />
//                     {errMsg(gErr.lastName)}
//                   </div>
//                 </div>

//                 {/* Contact */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className={lbl}>
//                       <IconMail /> Email Address
//                     </label>
//                     <input
//                       type="email"
//                       className={inputCls(!!gErr.email)}
//                       placeholder="you@example.com"
//                       value={guest.email}
//                       onChange={onGuest("email")}
//                     />
//                     {errMsg(gErr.email)}
//                   </div>
//                   <div>
//                     <label className={lbl}>
//                       <IconPhone /> Phone Number
//                     </label>
//                     <input
//                       className={inputCls(!!gErr.phone)}
//                       placeholder="+1 (318) 555-0116"
//                       value={guest.phone}
//                       onChange={onGuest("phone")}
//                     />
//                     {errMsg(gErr.phone)}
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className={lbl}>
//                       <IconMapPin /> Address
//                     </label>
//                     <input
//                       className={inputCls(!!gErr.address)}
//                       placeholder="123 Main St"
//                       value={guest.address}
//                       onChange={onGuest("address")}
//                     />
//                     {errMsg(gErr.address)}
//                   </div>
//                   <div>
//                     <label className={lbl}>
//                       <IconMapPin /> City
//                     </label>
//                     <input
//                       className={inputCls(!!gErr.city)}
//                       placeholder="Paris"
//                       value={guest.city}
//                       onChange={onGuest("city")}
//                     />
//                     {errMsg(gErr.city)}
//                   </div>
//                 </div>

//                 {/* Postcode / Country */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className={lbl}>Postcode</label>
//                     <input
//                       className={inputCls()}
//                       placeholder="2495"
//                       value={guest.postcode}
//                       onChange={onGuest("postcode")}
//                     />
//                   </div>
//                   <div>
//                     <label className={lbl}>Country of Residence</label>
//                     <input
//                       className={inputCls()}
//                       placeholder="France"
//                       value={guest.country}
//                       onChange={onGuest("country")}
//                     />
//                   </div>
//                 </div>

//                 {/* Arrival */}
//                 <div>
//                   <label className={lbl}>
//                     <IconClock /> Estimated Arrival Time
//                   </label>
//                   <input
//                     className={inputCls()}
//                     placeholder="e.g. 3:00 PM"
//                     value={guest.arrivalTime}
//                     onChange={onGuest("arrivalTime")}
//                   />
//                 </div>

//                 {/* Comment */}
//                 <div>
//                   <label className={lbl}>Special Requests / Comments</label>
//                   <textarea
//                     rows={3}
//                     className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-300 hover:border-gray-300 focus:border-[#24a9e1] focus:ring-2 focus:ring-[#24a9e1]/10 resize-none"
//                     placeholder="Any notes for the host..."
//                     value={guest.comment}
//                     onChange={onGuest("comment")}
//                   />
//                 </div>
//               </div>

//               <div className="px-6 pb-6">
//                 <button
//                   onClick={handleGuestNext}
//                   className="w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
//                   style={{ backgroundColor: "#24a9e1" }}
//                 >
//                   Continue to Payment →
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* STEP 2: Card Information */}
//           {step === 2 && (
//             <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden">
//               <div className="px-6 pt-6 pb-5 border-b border-gray-100 flex items-center gap-3">
//                 <button
//                   onClick={() => setStep(1)}
//                   className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-1.5 shadow-sm transition hover:border-gray-300 hover:shadow"
//                 >
//                   <IconChevronLeft />
//                 </button>
//                 <div>
//                   <SectionHeading title="Card Information" />
//                   <p className="text-sm text-gray-500 -mt-2">
//                     Your payment is encrypted and secure.
//                   </p>
//                 </div>
//               </div>

//               <div className="px-6 py-6 space-y-6">
//                 {/* Card visual */}
//                 <div
//                   className="relative overflow-hidden rounded-2xl p-5 text-white"
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#1e293b 0%,#0f172a 60%,#1e3a5f 100%)",
//                     minHeight: "160px",
//                   }}
//                 >
//                   <div className="pointer-events-none absolute -top-12 -right-8 h-40 w-40 rounded-full bg-white/5" />
//                   <div className="pointer-events-none absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-white/5" />
//                   <div className="relative flex justify-between items-start mb-6">
//                     <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
//                       Credit Card
//                     </p>
//                     <div className="flex">
//                       <div className="h-7 w-7 rounded-full bg-red-500/80" />
//                       <div className="-ml-3 h-7 w-7 rounded-full bg-yellow-400/80" />
//                     </div>
//                   </div>
//                   <p className="relative mb-5 font-mono text-base tracking-[0.18em]">
//                     {card.number || "•••• •••• •••• ••••"}
//                   </p>
//                   <div className="relative flex justify-between text-xs">
//                     <div>
//                       <p className="mb-0.5 text-white/40 uppercase tracking-widest text-[10px]">
//                         Cardholder
//                       </p>
//                       <p className="font-semibold uppercase">
//                         {card.name || "Full Name"}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="mb-0.5 text-white/40 uppercase tracking-widest text-[10px]">
//                         Expires
//                       </p>
//                       <p className="font-semibold">{card.expiry || "MM/YY"}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Card fields */}
//                 <div className="space-y-4">
//                   <div>
//                     <label className={lbl}>
//                       <IconCreditCard /> Card Number
//                     </label>
//                     <input
//                       className={inputCls(!!cErr.number)}
//                       placeholder="1234 5678 9012 3456"
//                       value={card.number}
//                       maxLength={19}
//                       onChange={(e) =>
//                         setCard((p) => ({ ...p, number: fmt4(e.target.value) }))
//                       }
//                     />
//                     {errMsg(cErr.number)}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className={lbl}>Expiry Date</label>
//                       <input
//                         className={inputCls(!!cErr.expiry)}
//                         placeholder="MM/YY"
//                         value={card.expiry}
//                         maxLength={5}
//                         onChange={(e) =>
//                           setCard((p) => ({
//                             ...p,
//                             expiry: fmtExp(e.target.value),
//                           }))
//                         }
//                       />
//                       {errMsg(cErr.expiry)}
//                     </div>
//                     <div>
//                       <label className={lbl}>CVV</label>
//                       <input
//                         type="password"
//                         className={inputCls(!!cErr.cvv)}
//                         placeholder="•••"
//                         value={card.cvv}
//                         maxLength={4}
//                         onChange={(e) =>
//                           setCard((p) => ({
//                             ...p,
//                             cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
//                           }))
//                         }
//                       />
//                       {errMsg(cErr.cvv)}
//                     </div>
//                   </div>

//                   <div>
//                     <label className={lbl}>
//                       <IconUser /> Name on Card
//                     </label>
//                     <input
//                       className={inputCls(!!cErr.name)}
//                       placeholder="Full name as on card"
//                       value={card.name}
//                       onChange={(e) =>
//                         setCard((p) => ({ ...p, name: e.target.value }))
//                       }
//                     />
//                     {errMsg(cErr.name)}
//                   </div>
//                 </div>
//               </div>

//               <div className="px-6 pb-6 space-y-3">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
//                   style={{ backgroundColor: "#24a9e1" }}
//                 >
//                   {loading ? (
//                     <>
//                       <IconLoader /> Processing Payment…
//                     </>
//                   ) : (
//                     `Pay ${villa.currency} ${villa.total.toLocaleString()}`
//                   )}
//                 </button>
//                 <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
//                   <IconShield /> 256-bit SSL · PCI DSS Compliant
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STEP 3: Success */}
//           {step === 3 && (
//             <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden text-center">
//               <div className="px-6 py-10">
//                 <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#24a9e1]/10">
//                   <svg
//                     width="32"
//                     height="32"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="#24a9e1"
//                     strokeWidth="2.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <polyline points="20 6 9 17 4 12" />
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
//                   Booking Confirmed!
//                 </h2>
//                 <p className="mt-2 text-sm text-gray-500">
//                   A confirmation was sent to{" "}
//                   <span className="font-semibold text-gray-700">
//                     {guest.email}
//                   </span>
//                 </p>
//               </div>

//               <div className="mx-6 mb-6 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-left space-y-3">
//                 {(
//                   [
//                     { label: "Property", value: villa.name },
//                     { label: "Check-in", value: villa.checkIn },
//                     { label: "Check-out", value: villa.checkOut },
//                     { label: "Guests", value: `${villa.guests}` },
//                   ] as const
//                 ).map((r) => (
//                   <div
//                     key={r.label}
//                     className="flex items-center justify-between text-sm"
//                   >
//                     <span className="text-gray-500">{r.label}</span>
//                     <span className="font-medium text-gray-800">{r.value}</span>
//                   </div>
//                 ))}
//                 <div className="border-t border-gray-200 pt-3 flex items-end justify-between">
//                   <span className="text-sm font-semibold text-gray-700">
//                     Total Paid
//                   </span>
//                   <div>
//                     <span className="text-2xl font-extrabold text-gray-900">
//                       {villa.total.toLocaleString()}
//                     </span>
//                     <span className="ml-1 text-sm text-gray-400">
//                       {villa.currency}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="px-6 pb-6">
//                 <button
//                   onClick={handleReset}
//                   className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-[#24a9e1] hover:text-[#24a9e1]"
//                 >
//                   Start New Booking
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ── RIGHT: Summary (inline JSX, not a sub-component) ──────────────── */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 space-y-4">
//             <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden">
//               <div
//                 className="px-6 pt-6 pb-5 border-b border-gray-100"
//                 style={{
//                   background: "linear-gradient(135deg,#f0f9ff 0%,#fff 100%)",
//                 }}
//               >
//                 <span
//                   className="mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-white"
//                   style={{ backgroundColor: "#24a9e1" }}
//                 >
//                   Villa
//                 </span>
//                 <h2 className="text-lg font-bold tracking-tight text-gray-900">
//                   {villa.name}
//                 </h2>
//                 <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
//                   <IconMapPin /> {villa.location}
//                 </p>
//               </div>

//               <div className="px-6 py-4 space-y-3 border-b border-gray-100">
//                 {[
//                   { label: "Check-in", value: villa.checkIn },
//                   { label: "Check-out", value: villa.checkOut },
//                   { label: "Guests", value: `${villa.guests} guests` },
//                   {
//                     label: "Cleaning fee",
//                     value:
//                       villa.cleaningFee === 0
//                         ? "Free"
//                         : `${villa.cleaningFee} ${villa.currency}`,
//                   },
//                 ].map((row) => (
//                   <div
//                     key={row.label}
//                     className="flex items-center justify-between text-sm"
//                   >
//                     <span className="text-gray-500">{row.label}</span>
//                     <span className="font-medium text-gray-800">
//                       {row.value}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="px-6 py-4 border-b border-gray-100">
//                 <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
//                   Voucher Code
//                 </p>
//                 <div className="flex gap-2">
//                   <input
//                     value={voucher}
//                     onChange={(e) => setVoucher(e.target.value)}
//                     disabled={voucherApplied}
//                     placeholder="Enter code"
//                     className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#24a9e1] focus:ring-2 focus:ring-[#24a9e1]/10 disabled:opacity-50 placeholder:text-gray-300"
//                   />
//                   <button
//                     onClick={() => voucher && setVoucherApplied(true)}
//                     disabled={!voucher || voucherApplied}
//                     className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-[#24a9e1] hover:text-[#24a9e1] disabled:cursor-not-allowed disabled:opacity-40"
//                   >
//                     {voucherApplied ? "✓ Applied" : "Apply"}
//                   </button>
//                 </div>
//               </div>

//               <div className="px-6 py-5">
//                 <div className="flex items-end justify-between">
//                   <span className="text-sm font-semibold text-gray-500">
//                     Grand Total
//                   </span>
//                   <div className="text-right">
//                     <span className="text-2xl font-extrabold text-gray-900">
//                       {villa.total.toLocaleString()}
//                     </span>
//                     <span className="ml-1 text-sm font-medium text-gray-400">
//                       {villa.currency}
//                     </span>
//                   </div>
//                 </div>
//                 <p className="mt-1.5 text-xs text-gray-400">
//                   No charges until booking confirmed
//                 </p>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm space-y-2.5">
//               {[
//                 { icon: <IconShield />, text: "256-bit SSL encryption" },
//                 {
//                   icon: (
//                     <svg
//                       width="14"
//                       height="14"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <polyline points="9 14 4 9 9 4" />
//                       <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
//                     </svg>
//                   ),
//                   text: "Free cancellation within 48h",
//                 },
//                 { icon: <IconPhone />, text: "24/7 guest support" },
//               ].map((b) => (
//                 <div
//                   key={b.text}
//                   className="flex items-center gap-2.5 text-xs text-gray-500"
//                 >
//                   <span className="text-[#24a9e1]">{b.icon}</span>
//                   {b.text}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
