"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { slug: string; quantity: number; color: string };

type StoreContextValue = {
  cart: CartItem[];
  favorites: string[];
  language: "en" | "uk";
  addToCart: (slug: string, color: string, quantity?: number) => void;
  updateQuantity: (slug: string, color: string, quantity: number) => void;
  removeFromCart: (slug: string, color: string) => void;
  toggleFavorite: (slug: string) => void;
  setLanguage: (language: "en" | "uk") => void;
  cartCount: number;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [language, setLanguageState] = useState<"en" | "uk">("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readLocal("atelier-cart", [
      { slug: "arc-lounge-chair", quantity: 1, color: "Oat Bouclé" },
      { slug: "dome-table-lamp", quantity: 1, color: "Brushed Aluminum" },
      { slug: "stone-bowl", quantity: 1, color: "Volcanic Stone" },
    ]));
    setFavorites(readLocal("atelier-favorites", []));
    setLanguageState(readLocal("atelier-language", "en"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("atelier-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("atelier-favorites", JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const addToCart = useCallback((slug: string, color: string, quantity = 1) => {
    setCart((current) => {
      const match = current.find((item) => item.slug === slug && item.color === color);
      if (match) {
        return current.map((item) =>
          item === match ? { ...item, quantity: Math.min(9, item.quantity + quantity) } : item,
        );
      }
      return [...current, { slug, color, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((slug: string, color: string, quantity: number) => {
    setCart((current) =>
      current.map((item) =>
        item.slug === slug && item.color === color
          ? { ...item, quantity: Math.max(1, Math.min(9, quantity)) }
          : item,
      ),
    );
  }, []);

  const removeFromCart = useCallback((slug: string, color: string) => {
    setCart((current) => current.filter((item) => item.slug !== slug || item.color !== color));
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((current) =>
      current.includes(slug) ? current.filter((value) => value !== slug) : [...current, slug],
    );
  }, []);

  const setLanguage = useCallback((nextLanguage: "en" | "uk") => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("atelier-language", JSON.stringify(nextLanguage));
  }, []);

  const value = useMemo(
    () => ({
      cart,
      favorites,
      language,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleFavorite,
      setLanguage,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    }),
    [cart, favorites, language, addToCart, updateQuantity, removeFromCart, toggleFavorite, setLanguage],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
