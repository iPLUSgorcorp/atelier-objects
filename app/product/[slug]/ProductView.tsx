"use client";

import { ArrowRight, Heart, Minus, Plus, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/components/StoreProvider";
import { formatPrice, Product, products } from "@/lib/catalog";
import { assetPath } from "@/lib/paths";

export function ProductView({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const favorite = favorites.includes(product.slug);
  const recommendations = useMemo(() => products.filter((item) => item.slug !== product.slug).slice(0, 4), [product.slug]);
  const isPrimaryColor = selectedColor.name === product.colors[0].name;
  const visibleGallery = isPrimaryColor
    ? product.gallery
    : [selectedColor.image ?? product.image];

  const selectColor = (color: Product["colors"][number]) => {
    setSelectedColor(color);
    setSelectedImage(color.image ?? product.image);
  };

  const handleAdd = () => {
    addToCart(product.slug, selectedColor.name, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  return (
    <>
      <Header />
      <main className="product-page">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/shop">Shop</Link><span>›</span><Link href={`/shop?category=${product.category}`}>{product.category}</Link><span>›</span><strong>{product.name}</strong></div>
        <div className="product-layout">
          <section className={`product-gallery ${visibleGallery.length === 1 ? "single-image" : ""}`}>
            <button className="gallery-main" onClick={() => setModalOpen(true)} aria-label="Open full screen image">
              <Image src={selectedImage} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 46vw" />
              <span className="expand-hint">↗</span>
            </button>
            {visibleGallery.length > 1 && <div className="gallery-thumbs" style={{ gridTemplateRows: `repeat(${Math.min(visibleGallery.length, 4)}, 1fr)` }}>
              {visibleGallery.slice(0, 4).map((image, index) => (
                <button key={`${image}-${index}`} className={selectedImage === image ? "active" : ""} onClick={() => setSelectedImage(image)}>
                  <Image src={image} alt={`${product.name} view ${index + 1}`} fill sizes="150px" />
                </button>
              ))}
            </div>}
          </section>
          <section className="product-info">
            <h1>{product.name}</h1>
            <span>{product.category}</span>
            <strong className="product-price">{formatPrice(product.price)}</strong>
            <div className="product-description"><p>{product.description}</p></div>
            <dl className="product-specs"><div><dt>{product.category === "Seating" ? "UPHOLSTERY" : "FINISH"}</dt><dd>{selectedColor.name}</dd></div><div><dt>BASE</dt><dd>{product.base}</dd></div><div><dt>DESIGN</dt><dd>Atelier Objects Studio</dd></div><div><dt>ORIGIN</dt><dd>{product.origin}</dd></div></dl>
            <div className="variant-picker">
              <p>{product.category === "Seating" ? "Upholstery" : "Finish"}: <strong>{selectedColor.name}</strong></p>
              <div className="swatches">
                {product.colors.map((color) => <button key={color.name} aria-label={color.name} title={color.name} className={selectedColor.name === color.name ? "active" : ""} style={{ background: color.hex }} onClick={() => selectColor(color)} />)}
              </div>
            </div>
            <div className="purchase-label">QUANTITY</div>
            <div className="purchase-row">
              <div className="quantity-stepper"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity(Math.min(9, quantity + 1))}><Plus size={15} /></button></div>
              <button className="button dark add-button" onClick={handleAdd}>{added ? "Added to bag" : "Add to Bag"}</button>
              <button className={`button save-button ${favorite ? "active" : ""}`} onClick={() => toggleFavorite(product.slug)}><Heart size={18} weight={favorite ? "fill" : "regular"} /> {favorite ? "Saved" : "Save"}</button>
            </div>
            <div className="accordions">
              {[
                ["Dimensions", "Designed with residential proportions and generous everyday comfort."],
                ["Materials", `${product.material}, ${selectedColor.name}. Finished by hand.`],
                ["Delivery", "Complimentary standard delivery. White glove delivery available at checkout."],
              ].map(([title, copy]) => <div key={title} className="accordion"><button onClick={() => setOpenAccordion(openAccordion === title ? null : title)}><span>{title}</span><Plus size={16} className={openAccordion === title ? "rotate" : ""} /></button>{openAccordion === title && <p>{copy}</p>}</div>)}
            </div>
          </section>
        </div>
        <section className="recommendations content-section">
          <h2>You may also like</h2>
          <div className="featured-grid">{recommendations.map((item) => <ProductCard key={item.slug} product={item} compact />)}</div>
          <Link href="/shop" className="recommendation-banner"><Image src={assetPath("/images/hero-main.webp")} alt="Atelier Objects collection interior" fill sizes="40vw" /><span>Explore the collection <ArrowRight size={16} /></span></Link>
        </section>
      </main>
      <Footer />
      {modalOpen && <div className="image-modal" role="dialog" aria-modal="true"><button onClick={() => setModalOpen(false)} aria-label="Close full screen image"><X size={26} /></button><div><Image src={selectedImage} alt={product.name} fill sizes="100vw" /></div></div>}
    </>
  );
}
