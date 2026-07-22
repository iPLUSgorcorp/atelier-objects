"use client";

import {
  Bag,
  List,
  MagnifyingGlass,
  User,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./StoreProvider";

const navEn = [
  ["Shop", "/shop"],
  ["Collections", "/#collections"],
  ["Journal", "/#journal"],
  ["About", "/#about"],
];

const navUk = [
  ["Магазин", "/shop"],
  ["Колекції", "/#collections"],
  ["Журнал", "/#journal"],
  ["Про нас", "/#about"],
];

export function Header({ locale }: { locale?: "en" | "uk" }) {
  const pathname = usePathname();
  const { cartCount } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isUk = locale === "uk" || pathname.startsWith("/ua/");
  const nav = isUk ? navUk : navEn;

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="Atelier Objects home">
          ATELIER OBJECTS
        </Link>
        <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link key={label} href={href}>{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          {(pathname === "/contact" || pathname === "/ua/contact") && (
            <div className="language-switch compact" aria-label="Language">
              <Link className={!isUk ? "active" : ""} href="/contact">EN</Link>
              <span>|</span>
              <Link className={isUk ? "active" : ""} href="/ua/contact">UA</Link>
            </div>
          )}
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <MagnifyingGlass size={21} weight="light" />
          </button>
          <button className="icon-button desktop-only" aria-label="Account demo">
            <User size={21} weight="light" />
          </button>
          <Link className="icon-button bag-link" href="/cart" aria-label={`Shopping bag with ${cartCount} items`}>
            <Bag size={21} weight="light" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="icon-button menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={23} /> : <List size={23} />}
          </button>
        </div>
      </header>
      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search products">
          <button className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={24} /></button>
          <div className="search-inner">
            <span>Search Atelier Objects</span>
            <input autoFocus placeholder="Search chairs, tables, lighting…" onKeyDown={(event) => {
              if (event.key === "Enter") window.location.href = `/shop?q=${encodeURIComponent(event.currentTarget.value)}`;
            }} />
            <small>Press Enter to view matching pieces</small>
          </div>
        </div>
      )}
    </>
  );
}
