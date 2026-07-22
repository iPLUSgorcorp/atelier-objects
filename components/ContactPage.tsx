"use client";

import { ArrowRight, Monitor, SquaresFour, Tote } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useStore } from "./StoreProvider";
import { buildMailto, contactEmail } from "@/lib/mailto";
import { assetPath } from "@/lib/paths";

const copy = {
  en: {
    heading: "Bring this level of design to your brand",
    intro: "If you would like a custom website concept, premium redesign, or product interface with this level of quality and attention to detail, we would be pleased to discuss your project.",
    contact: "Contact us",
    detail: "For design concepts, storefronts, SaaS interfaces, and visual systems.",
    email: "Email us",
    concepts: "View concepts",
    line: "Thoughtful interfaces. Sharp execution. Design that earns trust.",
    services: [
      ["Web Design", "Custom websites with refined interfaces and clean architecture."],
      ["E-commerce", "Premium storefronts built for conversion and clarity."],
      ["SaaS Interfaces", "Intuitive dashboards and product experiences users love."],
    ],
  },
  uk: {
    heading: "Дизайн такого рівня для вашого бренду",
    intro: "Якщо вам потрібен індивідуальний концепт сайту, преміальний редизайн або інтерфейс продукту з таким рівнем якості та уваги до деталей, ми будемо раді обговорити ваш проєкт.",
    contact: "Напишіть нам",
    detail: "Для дизайн-концептів, інтернет-магазинів, SaaS-інтерфейсів і візуальних систем.",
    email: "Написати",
    concepts: "Переглянути концепти",
    line: "Продумані інтерфейси. Точна реалізація. Дизайн, що викликає довіру.",
    services: [
      ["Вебдизайн", "Вишукані сайти з продуманими інтерфейсами та чіткою архітектурою."],
      ["Інтернет-магазини", "Преміальні storefront-рішення, створені для конверсії та ясності."],
      ["SaaS-інтерфейси", "Зрозумілі дашборди й продуктові середовища, які подобаються користувачам."],
    ],
  },
};

const icons = [Monitor, Tote, SquaresFour];

export function ContactPage({ locale }: { locale: "en" | "uk" }) {
  const t = copy[locale];
  const { setLanguage } = useStore();

  useEffect(() => {
    setLanguage(locale);
    document.documentElement.lang = locale === "uk" ? "uk" : "en";
    return () => { document.documentElement.lang = "en"; };
  }, [locale, setLanguage]);

  return (
    <>
      <Header locale={locale} />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-copy">
            <h1>{t.heading}</h1>
            <p className="contact-intro">{t.intro}</p>
            <div className="contact-card">
              <span>{t.contact}</span>
              <a href={buildMailto(locale)} className="contact-email">{contactEmail}</a>
              <p>{t.detail}</p>
              <div className="contact-actions">
                <a href={buildMailto(locale)} className="button dark">{t.email}<ArrowRight size={17} /></a>
                <Link href="/" className="button outline">{t.concepts}<ArrowRight size={17} /></Link>
              </div>
            </div>
            <p className="contact-manifesto"><span />{t.line}</p>
          </div>
          <div className="contact-image"><Image src={assetPath("/images/contact-interior.jpg")} alt="Atelier Objects interior with stone table and boucle chair" fill priority sizes="50vw" /></div>
        </section>
        <section className="service-strip">
          {t.services.map(([title, description], index) => {
            const Icon = icons[index];
            return <div key={title}><Icon size={39} weight="light" /><div><h2>{title}</h2><p>{description}</p></div></div>;
          })}
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
