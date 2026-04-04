// hooks/use-dynamic-title.ts
"use client";

import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
}

const translations: Record<string, Record<string, PageMeta>> = {
  en: {
    home: {
      title: "Luxury Beach Villas in Koh Phangan | Joy Beach Villas",
      description:
        "Experience the ultimate getaway at Joy Beach Villas with luxury villas in Koh Phangan, offering stunning beach views and exquisite amenities for an unforgettable stay.",
    },
    faq: {
      title: "FAQ | Joy Beach Villas",
      description:
        "Learn more about the great experiences you can have with us by learning more here.",
    },
    about: {
      title: "About Us | Joy Beach Villas",
      description:
        "Enjoy breathtaking sunsets and tranquil beach walks at our eco-friendly beachfront destination in Koh Phangan. Perfect for unforgettable memories.",
    },
    contact: {
      title: "Contact Us | Joy Beach Villas",
      description:
        "Get in touch with us for inquiries and bookings. Get details about our luxury beachfront villas, availability, and personalized experiences in Koh Phangan.",
    },
    blog: {
      title: "Blog | Joy Beach Villas",
      description:
        "Read our blog to discover news, events and tips about traveling to Koh Phangan and Thailand.",
    },
    accommodation: {
      title:
        "Phangan Accommodation: Beach Bungalow & House Stays | Joy Beach Villas",
      description:
        "Find your perfect stay with our accommodations in Phangan. Offering serene beach bungalows and charming beach houses on the beautiful island of Koh Phangan.",
    },
    deals: {
      title: "Oct-Nov Deals | Joy Beach Villas",
      description:
        "Escape to white sand beaches instead! Special October to November deals.",
    },
    terms: {
      title: "Terms & Conditions | Joy Beach Villas",
      description:
        "Please read these terms and conditions carefully as these conditions incorporate the basis on which bookings for Joy Beach Villa are accepted.",
    },
    privacy: {
      title: "Privacy Policy | Joy Beach Villas",
      description:
        "The following information provides a simple overview of what happens to your personal data when you visit our website.",
    },
  },
  de: {
    home: {
      title: "Luxury Beach Villas in Koh Phangan | Joy Beach Villas",
      description:
        "Experience the ultimate getaway at Joy Beach Villas with luxury villas in Koh Phangan, offering stunning beach views and exquisite amenities for an unforgettable stay.",
    },
    faq: {
      title: "FAQ | Joy Beach Villas",
      description:
        "Erfahren Sie mehr über die großartigen Erlebnisse, die Sie mit uns haben können.",
    },
    about: {
      title: "ÜBER UNS | Joy Beach Villas",
      description:
        "Genießen Sie atemberaubende Sonnenuntergänge und ruhige Strandspaziergänge an unserem umweltfreundlichen Strandresort auf Koh Phangan.",
    },
    contact: {
      title: "Contact Us | Joy Beach Villas",
      description:
        "Kontaktieren Sie uns für Anfragen und Buchungen. Erhalten Sie Details zu unseren luxuriösen Strandvillen, Verfügbarkeit und personalisierten Erlebnissen in Koh Phangan.",
    },
    blog: {
      title: "Blogartikel | Joy Beach Villas",
      description:
        "Lesen Sie unseren Blog, um Neuigkeiten, Veranstaltungen und Tipps zu Reisen nach Koh Phangan und Thailand zu erfahren.",
    },
    accommodation: {
      title:
        "Phangan Accommodation: Beach Bungalow & House Stays | Joy Beach Villas",
      description:
        "Finden Sie Ihren perfekten Aufenthalt mit unseren Unterkünften in Phangan. Wir bieten ruhige Strandbungalows und charmante Strandhäuser auf der wunderschönen Insel Koh Phangan.",
    },
    deals: {
      title: "Spezielle Oktober bis November Angebote | Joy Beach Villas",
      description:
        "Willst du im Paradies sein? Spezielle Oktober bis November Angebote.",
    },
    terms: {
      title: "AGB | Joy Beach Villas",
      description:
        "Bitte lesen Sie diese allgemeinen Geschäftsbedingungen sorgfältig durch, da diese Bedingungen die Grundlage enthalten, auf der Buchungen für die Joy Beach Villa akzeptiert werden.",
    },
    privacy: {
      title: "Datenschutz-Bestimmungen | Joy Beach Villas",
      description:
        "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.",
    },
  },
  fr: {
    home: {
      title: "Luxury Beach Villas in Koh Phangan | Joy Beach Villas",
      description:
        "Experience the ultimate getaway at Joy Beach Villas with luxury villas in Koh Phangan, offering stunning beach views and exquisite amenities for an unforgettable stay.",
    },
    faq: {
      title: "FAQ | Joy Beach Villas",
      description:
        "Apprenez-en plus sur les expériences incroyables que vous pouvez vivre avec nous.",
    },
    about: {
      title: "About Us | Joy Beach Villas",
      description:
        "Profitez de couchers de soleil à couper le souffle et de promenades tranquilles sur la plage dans notre destination balnéaire écologique à Koh Phangan.",
    },
    contact: {
      title: "Contact Us | Joy Beach Villas",
      description:
        "Contactez-nous pour des demandes et des réservations. Obtenez des détails sur nos villas de luxe en bord de mer, la disponibilité et les expériences personnalisées à Koh Phangan.",
    },
    blog: {
      title: "Articles de blog | Joy Beach Villas",
      description:
        "Lisez notre blog pour découvrir des actualités, des événements et des conseils sur les voyages à Koh Phangan et en Thaïlande.",
    },
    accommodation: {
      title:
        "Phangan Accommodation: Beach Bungalow & House Stays | Joy Beach Villas",
      description:
        "Trouvez votre séjour idéal avec nos hébergements à Phangan. Offrant de sereins bungalows de plage et de charmantes maisons de plage sur la belle île de Koh Phangan.",
    },
    deals: {
      title: "Envie être au paradis ? | Joy Beach Villas",
      description:
        "Envie d'être au paradis ? Offres spéciales d'octobre à novembre.",
    },
    terms: {
      title: "Conditions générales | Joy Beach Villas",
      description:
        "Veuillez lire attentivement ces termes et conditions car ils constituent la base sur laquelle les réservations pour Joy Beach Villa sont acceptées.",
    },
    privacy: {
      title: "Politique de confidentialité | Joy Beach Villas",
      description:
        "Les informations suivantes donnent un aperçu simple de ce qui arrive à vos données personnelles lorsque vous visitez notre site Web.",
    },
  },
  es: {
    home: {
      title: "Luxury Beach Villas in Koh Phangan | Joy Beach Villas",
      description:
        "Experience the ultimate getaway at Joy Beach Villas with luxury villas in Koh Phangan, offering stunning beach views and exquisite amenities for an unforgettable stay.",
    },
    faq: {
      title: "FAQ | Joy Beach Villas",
      description:
        "Aprenda más sobre las increíbles experiencias que puede tener con nosotros.",
    },
    about: {
      title: "About Us | Joy Beach Villas",
      description:
        "Disfrute de impresionantes puestas de sol y tranquilos paseos por la playa en nuestro destino costero ecológico en Koh Phangan.",
    },
    contact: {
      title: "Contact Us | Joy Beach Villas",
      description:
        "Póngase en contacto con nosotros para consultas y reservas. Obtenga detalles sobre nuestras lujosas villas frente al mar, disponibilidad y experiencias personalizadas en Koh Phangan.",
    },
    blog: {
      title: "Artículos de blog | Joy Beach Villas",
      description:
        "Lea nuestro blog para descubrir noticias, eventos y consejos sobre cómo viajar a Koh Phangan y Tailandia.",
    },
    accommodation: {
      title:
        "Phangan Accommodation: Beach Bungalow & House Stays | Joy Beach Villas",
      description:
        "Encuentre su estancia perfecta con nuestros alojamientos en Phangan. Ofrecemos tranquilos bungalows de playa y encantadoras casas de playa en la hermosa isla de Koh Phangan.",
    },
    deals: {
      title: "Especial Ofertas de octubre a noviembre | Joy Beach Villas",
      description:
        "¿Quieres estar en el paraíso? Especial ofertas de octubre a noviembre.",
    },
    terms: {
      title: "Condiciones Generales | Joy Beach Villas",
      description:
        "Por favor lea estos términos y condiciones cuidadosamente ya que estas condiciones incorporan la base sobre la cual se aceptan las reservas de Joy Beach Villa.",
    },
    privacy: {
      title: "Política de privacidad | Joy Beach Villas",
      description:
        "La siguiente información proporciona una descripción general simple de lo que sucede con sus datos personales cuando visita nuestro sitio web.",
    },
  },
};

function getGoogleTranslateLang(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/[a-z]+\/([a-z]+)/);
  return match ? match[1] : "en";
}

function updateMeta(pageKey: string) {
  const lang = getGoogleTranslateLang();
  const langMeta = translations[lang]?.[pageKey] ?? translations["en"][pageKey];

  // Update title
  document.title = langMeta.title;

  // Update meta description
  const metaDesc = document.querySelector("meta[name='description']");
  if (metaDesc) {
    metaDesc.setAttribute("content", langMeta.description);
  }
}

export function useDynamicTitle(pageKey: string) {
  useEffect(() => {
    updateMeta(pageKey);

    const observer = new MutationObserver(() => updateMeta(pageKey));
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let lastLang = getGoogleTranslateLang();
    const interval = setInterval(() => {
      const currentLang = getGoogleTranslateLang();
      if (currentLang !== lastLang) {
        lastLang = currentLang;
        updateMeta(pageKey);
      }
    }, 500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [pageKey]);
}
