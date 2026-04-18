const MSGS = {
  validation: {
    en: "Name, email, and message are required.",
    sv: "Namn, e-post och meddelande krävs.",
    ar: "الاسم والبريد الإلكتروني والرسالة مطلوبة.",
  },
  saveFailed: {
    en: "Could not save the message.",
    sv: "Kunde inte spara meddelandet.",
    ar: "تعذّر حفظ الرسالة.",
  },
  success: {
    en: "Thank you! We will get back to you as soon as we can.",
    sv: "Tack! Vi återkommer så snart vi kan.",
    ar: "شكرًا! سنعود إليكم في أقرب وقت ممكن.",
  },
}

export function pickLang(acceptLanguage) {
  if (!acceptLanguage || typeof acceptLanguage !== "string") return "sv"
  const first = acceptLanguage.split(",")[0].trim().split("-")[0].toLowerCase()
  if (first === "en" || first === "sv" || first === "ar") return first
  return "sv"
}

export function contactMessage(key, lang) {
  const lng = lang === "en" || lang === "sv" || lang === "ar" ? lang : "sv"
  return MSGS[key][lng]
}
