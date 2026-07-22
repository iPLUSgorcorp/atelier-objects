"use client";

import { ArrowRight, InstagramLogo, PinterestLogo } from "@phosphor-icons/react";
import Link from "next/link";

const footerCopy = {
  en: {
    shop: "Shop", all: "All Products", seating: "Seating", tables: "Tables", lighting: "Lighting", decor: "Decor",
    collections: "Collections", company: "Company", about: "About", journal: "Journal", sustainability: "Sustainability", careers: "Careers",
    inspired: "Stay inspired", body: "Get updates on new collections and stories from our studio.", placeholder: "Enter your email", rights: "All rights reserved.",
  },
  uk: {
    shop: "Магазин", all: "Усі товари", seating: "Стільці", tables: "Столи", lighting: "Освітлення", decor: "Декор",
    collections: "Колекції", company: "Компанія", about: "Про нас", journal: "Журнал", sustainability: "Сталий розвиток", careers: "Кар’єра",
    inspired: "Будьте на натхненні", body: "Отримуйте оновлення про нові колекції та історії з нашої студії.", placeholder: "Введіть вашу пошту", rights: "Усі права захищені.",
  },
};

export function Footer({ locale = "en" }: { locale?: "en" | "uk" }) {
  const t = footerCopy[locale];
  return (
    <footer className="site-footer" id="about">
      <div className="footer-brand">
        <Link href="/" className="wordmark small">ATELIER OBJECTS</Link>
        <p>© 2024 Atelier Objects. {t.rights}</p>
      </div>
      <div className="footer-column">
        <h3>{t.shop}</h3>
        <Link href="/shop">{t.all}</Link><Link href="/shop?category=Seating">{t.seating}</Link><Link href="/shop?category=Tables">{t.tables}</Link><Link href="/shop?category=Lighting">{t.lighting}</Link><Link href="/shop?category=Decor">{t.decor}</Link>
      </div>
      <div className="footer-column">
        <h3>{t.collections}</h3>
        <Link href="/#collections">New Arrivals</Link><Link href="/#collections">Best Sellers</Link><Link href="/#collections">The Soft Geometry Collection</Link><Link href="/#collections">The Monolith Collection</Link>
      </div>
      <div className="footer-column">
        <h3>{t.company}</h3>
        <Link href="/#about">{t.about}</Link><Link href="/#journal">{t.journal}</Link><Link href="/#about">{t.sustainability}</Link><Link href="/contact">{t.careers}</Link>
      </div>
      <div className="footer-newsletter">
        <h3>{t.inspired}</h3>
        <p>{t.body}</p>
        <form onSubmit={(event) => event.preventDefault()} className="newsletter-form">
          <input type="email" aria-label={t.placeholder} placeholder={t.placeholder} />
          <button aria-label="Subscribe"><ArrowRight size={17} /></button>
        </form>
        <div className="socials"><InstagramLogo size={18} /><PinterestLogo size={18} /></div>
      </div>
    </footer>
  );
}
