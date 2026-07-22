const EMAIL = "igorcorp.tech@gmail.com";

export function buildMailto(locale: "en" | "uk"): string {
  const subject = locale === "uk" ? "Запит щодо нового дизайн-проєкту" : "New design project inquiry";
  const body =
    locale === "uk"
      ? "Вітаю, командо I+G!\r\n\r\nХочу обговорити дизайн-проєкт."
      : "Hello I+G team,\r\n\r\nI would like to discuss a design project.";
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const contactEmail = EMAIL;
