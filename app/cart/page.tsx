"use client";

import { ArrowRight, Heart, Minus, Plus, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/components/StoreProvider";
import { findProduct, formatPrice, products } from "@/lib/catalog";

export default function CartPage() {
  const { cart, favorites, updateQuantity, removeFromCart, toggleFavorite } = useStore();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(false);
  const lines = useMemo(() => cart.flatMap((item) => {
    const product = findProduct(item.slug);
    return product ? [{ ...item, product }] : [];
  }), [cart]);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const discountValue = discount ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discountValue) * 0.0875);
  const total = subtotal - discountValue + tax;
  const cartSlugs = [...new Set(lines.map((line) => line.slug))];
  const bagSaved = cartSlugs.length > 0 && cartSlugs.every((slug) => favorites.includes(slug));

  const toggleSavedBag = () => {
    cartSlugs.forEach((slug) => {
      if (bagSaved || !favorites.includes(slug)) toggleFavorite(slug);
    });
  };

  return (
    <>
      <Header />
      <main className="cart-page">
        <header><h1>Shopping Bag</h1><p>{lines.reduce((sum, line) => sum + line.quantity, 0)} items</p></header>
        {lines.length ? (
          <div className="cart-layout">
            <section className="cart-items">
              <div className="cart-columns"><span>ITEM</span><span>DETAILS</span><span>PRICE</span><span>QUANTITY</span><span>TOTAL</span></div>
              {lines.map((line) => {
                const color = line.product.colors.find((item) => item.name === line.color);
                return <article className="cart-line" key={`${line.slug}-${line.color}`}>
                  <Link href={`/product/${line.slug}`} className="cart-image"><Image src={color?.image ?? line.product.image} alt={line.product.name} fill sizes="180px" /></Link>
                  <div className="cart-name"><Link href={`/product/${line.slug}`}><h2>{line.product.name}</h2></Link><span>{line.product.category}</span><strong>{formatPrice(line.product.price)}</strong></div>
                  <div className="cart-details"><small>Finish</small><span><i style={{ background: color?.hex ?? "#ddd" }} /> {line.color}</span><small>Base</small><span>{line.product.base}</span></div>
                  <strong className="cart-unit-price">{formatPrice(line.product.price)}</strong>
                  <div className="quantity-stepper"><button onClick={() => updateQuantity(line.slug, line.color, line.quantity - 1)}><Minus size={14} /></button><span>{line.quantity}</span><button onClick={() => updateQuantity(line.slug, line.color, line.quantity + 1)}><Plus size={14} /></button></div>
                  <strong className="cart-total">{formatPrice(line.product.price * line.quantity)}</strong>
                  <button className="remove-line" onClick={() => removeFromCart(line.slug, line.color)} aria-label={`Remove ${line.product.name}`}><X size={17} /></button>
                </article>;
              })}
              <button className={`save-bag ${bagSaved ? "active" : ""}`} onClick={toggleSavedBag} aria-pressed={bagSaved}>
                <Heart size={17} weight={bagSaved ? "fill" : "light"} />
                <span>{bagSaved ? "Bag Saved" : "Save Bag for Later"}</span>
              </button>
              <section className="cart-recs"><div className="section-heading"><h2>You may also like</h2><Link href="/shop">View all</Link></div><div className="featured-grid">{products.slice(1, 5).map((product) => <ProductCard key={product.slug} product={product} compact />)}</div></section>
            </section>
            <aside className="order-summary">
              <h2>Order Summary</h2>
              <dl><div><dt>Subtotal ({lines.length} items)</dt><dd>{formatPrice(subtotal)}</dd></div>{discount && <div><dt>Demo discount</dt><dd>−{formatPrice(discountValue)}</dd></div>}<div><dt>Shipping</dt><dd>Free</dd></div><div><dt>Estimated Tax</dt><dd>{formatPrice(tax)}</dd></div><div className="summary-total"><dt>Estimated Total</dt><dd>{formatPrice(total)}</dd></div></dl>
              <label>Promo Code</label>
              <div className="promo-row"><input value={promo} onChange={(event) => setPromo(event.target.value)} placeholder="Enter code" /><button onClick={() => setDiscount(promo.trim().toUpperCase() === "ATELIER10")}>Apply</button></div>
              {promo && !discount && <small className="promo-hint">Try demo code ATELIER10</small>}
              <Link className="button dark full" href="/checkout">Proceed to Checkout <ArrowRight size={17} /></Link>
              <div className="summary-benefits"><div><strong>Estimated Delivery</strong><p>5–7 business days with complimentary standard delivery.</p></div><div><strong>Free Returns</strong><p>30-day returns on eligible items.</p></div><div><strong>Need Help?</strong><p><a href="mailto:igorcorp.tech@gmail.com">igorcorp.tech@gmail.com</a></p></div></div>
            </aside>
          </div>
        ) : (
          <section className="empty-cart"><h2>Your bag is ready for something enduring.</h2><p>Explore objects made for quiet, considered living.</p><Link href="/shop" className="button dark">Continue shopping <ArrowRight size={16} /></Link></section>
        )}
      </main>
      <Footer />
    </>
  );
}
