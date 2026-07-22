import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/catalog";
import { assetPath } from "@/lib/paths";

export default function HomePage() {
  const featured = products.slice(0, 4);
  const bestSellers = [products[2], products[5], products[4], products[6]];

  return (
    <>
      <Header />
      <main>
        <section className="home-hero">
          <Image src={assetPath("/images/hero-main.webp")} alt="Quiet living room overlooking pale mountains" fill priority sizes="100vw" />
          <div className="hero-copy">
            <h1>Objects for<br />Quiet Living</h1>
            <p>Thoughtful design. Honest materials.<br />Made to be lived with, and loved for years.</p>
            <Link className="button dark" href="/shop">Explore Collection <ArrowRight size={16} /></Link>
          </div>
        </section>

        <section className="content-section featured-section">
          <div className="section-heading"><h2>Featured</h2><Link href="/shop">View all</Link></div>
          <div className="featured-grid">
            {featured.map((product) => <ProductCard key={product.slug} product={product} compact />)}
          </div>
        </section>

        <section className="collection-feature content-section" id="collections">
          <div className="collection-image"><Image src={assetPath("/images/collection-interior.jpg")} alt="Soft Geometry dining collection" fill sizes="50vw" /></div>
          <div className="collection-copy">
            <span>FEATURED COLLECTION</span>
            <h2>The Soft Geometry Collection</h2>
            <p>Curved forms, balanced proportions, and tactile materials come together in a study of calm.</p>
            <Link href="/shop" className="button dark">Discover Collection <ArrowRight size={16} /></Link>
          </div>
        </section>

        <section className="materials-strip content-section">
          <div><h3>Solid oak</h3><p>Sustainably sourced wood with visible grain and natural character.</p></div>
          <div><h3>Brushed aluminum</h3><p>Precision finished for a soft sheen and lasting performance.</p></div>
          <div><h3>Made to last</h3><p>Timeless design and quality craftsmanship that stand the test of time.</p></div>
        </section>

        <section className="content-section best-sellers" id="journal">
          <div className="section-heading"><h2>Best Sellers</h2><Link href="/shop">View all</Link></div>
          <div className="best-grid">
            {bestSellers.map((product) => <ProductCard key={product.slug} product={product} compact />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
