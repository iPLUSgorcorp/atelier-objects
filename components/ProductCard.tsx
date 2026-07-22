"use client";

import { Heart } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice, Product } from "@/lib/catalog";
import { useStore } from "./StoreProvider";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { favorites, toggleFavorite } = useStore();
  const [image, setImage] = useState(product.image);
  const active = favorites.includes(product.slug);

  return (
    <article className={`product-card ${compact ? "compact-card" : ""}`}>
      <div className="product-image-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`favorite-button ${active ? "active" : ""}`} aria-label={active ? "Remove from favorites" : "Add to favorites"} onClick={() => toggleFavorite(product.slug)}>
          <Heart size={22} weight={active ? "fill" : "light"} />
        </button>
        <Link href={`/product/${product.slug}`}>
          <Image src={image} alt={product.name} width={700} height={700} sizes="(max-width: 760px) 50vw, 25vw" />
        </Link>
      </div>
      <div className="product-card-copy">
        <Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link>
        <span>{product.category}</span>
        <strong>{formatPrice(product.price)}</strong>
        {!compact && product.colors.length > 1 && (
          <div className="mini-swatches" aria-label="Available colors">
            {product.colors.map((color) => (
              <button key={color.name} title={color.name} aria-label={color.name} style={{ background: color.hex }} onMouseEnter={() => setImage(color.image ?? product.image)} onFocus={() => setImage(color.image ?? product.image)} onClick={() => setImage(color.image ?? product.image)} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
