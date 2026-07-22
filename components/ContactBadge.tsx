"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./StoreProvider";
import { assetPath } from "@/lib/paths";

export function ContactBadge() {
  const pathname = usePathname();
  const { language } = useStore();
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/contact" || pathname === "/ua/contact") return null;
  const href = language === "uk" ? "/ua/contact" : "/contact";

  return (
    <Link href={href} className={`contact-badge ${footerVisible ? "hidden" : ""}`} aria-label="Contact the I+G team">
      <Image src={assetPath("/images/ig-contact-button-transparent.webp")} alt="I+G — Click to get in touch" width={1086} height={362} priority />
    </Link>
  );
}
