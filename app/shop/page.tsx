"use client";

import { CaretDown, FunnelSimple, X } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/catalog";

const categories = ["Seating", "Tables", "Lighting", "Decor"];
const materials = ["Solid Oak", "Travertine", "Aluminum", "Ceramic", "Fabric", "Marble"];

export default function ShopPage() {
  const [category, setCategory] = useState("All Products");
  const [material, setMaterial] = useState("All Materials");
  const [color, setColor] = useState("All Colors");
  const [price, setPrice] = useState(2500);
  const [sort, setSort] = useState("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const fromUrl = search.get("category");
    if (fromUrl && categories.includes(fromUrl)) setCategory(fromUrl);
    setQuery(search.get("q")?.toLowerCase().trim() ?? "");
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch = category === "All Products" || product.category === category;
      const materialMatch = material === "All Materials" || product.material === material;
      const colorMatch = color === "All Colors" || product.colors.some((item) => item.name.toLowerCase().includes(color.toLowerCase()));
      const queryMatch = !query || `${product.name} ${product.category} ${product.material}`.toLowerCase().includes(query);
      return categoryMatch && materialMatch && colorMatch && product.price <= price && queryMatch;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      if (sort === "Name") return a.name.localeCompare(b.name);
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [category, material, color, price, sort, query]);

  const reset = () => {
    setCategory("All Products"); setMaterial("All Materials"); setColor("All Colors"); setPrice(2500);
  };

  const filters = (
    <>
      <fieldset className="filter-group">
        <legend>Category <CaretDown size={14} /></legend>
        {["All Products", ...categories].map((value) => <label key={value}><input type="radio" name="category" checked={category === value} onChange={() => setCategory(value)} /> {value}</label>)}
      </fieldset>
      <fieldset className="filter-group">
        <legend>Material <CaretDown size={14} /></legend>
        {["All Materials", ...materials].map((value) => <label key={value}><input type="radio" name="material" checked={material === value} onChange={() => setMaterial(value)} /> {value}</label>)}
      </fieldset>
      <fieldset className="filter-group color-filter">
        <legend>Color <CaretDown size={14} /></legend>
        {["All Colors", "Cream", "Sand", "Taupe", "Walnut", "Charcoal", "Black", "White"].map((value) => <label key={value}><input type="radio" name="color" checked={color === value} onChange={() => setColor(value)} /><span className={`filter-color color-${value.toLowerCase().replace(" ", "-")}`} /> {value}</label>)}
      </fieldset>
      <fieldset className="filter-group price-filter">
        <legend>Price <CaretDown size={14} /></legend>
        <div><span>$0</span><span>{price === 2500 ? "$2,500+" : `$${price}`}</span></div>
        <input type="range" min="200" max="2500" step="50" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
      </fieldset>
      <button className="text-button" onClick={reset}>Reset Filters</button>
    </>
  );

  return (
    <>
      <Header />
      <main className="shop-page">
        <header className="shop-title">
          <h1>{query ? `Results for “${query}”` : "All Products"}</h1>
          <p>Timeless objects, thoughtfully made for modern living.</p>
        </header>
        <div className="shop-toolbar">
          <span>{visibleProducts.length || "No"} Products</span>
          <button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}><FunnelSimple size={18} /> Filters</button>
          <label>Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Name</option></select></label>
        </div>
        <div className="shop-layout">
          <aside className="filter-sidebar">{filters}</aside>
          <section className="catalog-grid" aria-live="polite">
            {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
            {visibleProducts.length === 0 && <div className="empty-state"><h2>No objects match these filters.</h2><button className="button dark" onClick={reset}>Reset filters</button></div>}
          </section>
        </div>
        <nav className="pagination" aria-label="Pagination"><button>‹</button><button className="active">1</button><button>2</button><button>3</button><span>…</span><button>15</button><button>›</button></nav>
      </main>
      {filtersOpen && <div className="filter-drawer-backdrop" onClick={() => setFiltersOpen(false)}><aside className="filter-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><h2>Filters</h2><button onClick={() => setFiltersOpen(false)}><X size={22} /></button></div>{filters}<button className="button dark full" onClick={() => setFiltersOpen(false)}>Show {visibleProducts.length} products</button></aside></div>}
      <Footer />
    </>
  );
}
