"use client";

import { Check, LockSimple, Truck } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useStore } from "@/components/StoreProvider";
import { findProduct, formatPrice } from "@/lib/catalog";

export default function CheckoutPage() {
  const { cart } = useStore();
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [completed, setCompleted] = useState(false);
  const lines = useMemo(() => cart.flatMap((item) => {
    const product = findProduct(item.slug);
    return product ? [{ ...item, product }] : [];
  }), [cart]);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = delivery === "white" ? 95 : delivery === "express" ? 25 : 0;
  const tax = Math.round(subtotal * 0.0875);
  const total = subtotal + shipping + tax;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCompleted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (completed) return <><Header /><main className="confirmation-page"><div className="confirmation-mark"><Check size={36} /></div><span>DEMONSTRATION ORDER</span><h1>Thank you. Your concept order is complete.</h1><p>No payment was processed. This storefront is an interactive portfolio demonstration.</p><Link href="/" className="button dark">Return home</Link></main><Footer /></>;

  return (
    <>
      <Header />
      <main className="checkout-page">
        <div className="checkout-breadcrumbs"><Link href="/cart">Cart</Link><span>›</span><strong>Information</strong><span>›</span><span>Shipping</span><span>›</span><span>Payment</span></div>
        <form className="checkout-layout" onSubmit={handleSubmit}>
          <section className="checkout-form">
            <h1>Checkout</h1><p>Review your order and complete your purchase.</p>
            <CheckoutSection number="1" title="Contact">
              <div className="field-grid one"><label>Email<input required type="email" defaultValue="igorcorp.tech@gmail.com" /></label></div>
            </CheckoutSection>
            <CheckoutSection number="2" title="Shipping Address">
              <div className="field-grid"><label>First name<input required defaultValue="Alex" /></label><label>Last name<input required defaultValue="Morgan" /></label><label className="span-two">Address<input required defaultValue="123 Greenway Terrace" /></label><label>City<input required defaultValue="San Francisco" /></label><label>Postal code<input required defaultValue="94103" /></label><label className="span-two">Delivery instructions<textarea defaultValue="Please leave package at the front door if no one is home." /></label></div>
            </CheckoutSection>
            <CheckoutSection number="3" title="Delivery Method">
              <div className="choice-list">{[["standard", "Standard Delivery", "5–7 business days", "Free"], ["white", "White Glove Delivery", "In-room delivery & packaging removal", "$95.00"], ["express", "Express Delivery", "2–3 business days", "$25.00"]].map(([value, title, note, price]) => <label key={value}><input type="radio" name="delivery" value={value} checked={delivery === value} onChange={() => setDelivery(value)} /><span><strong>{title}</strong><small>{note}</small></span><b>{price}</b></label>)}</div>
            </CheckoutSection>
            <CheckoutSection number="4" title="Payment" note="All transactions are simulated for this demo.">
              <div className="payment-box">
                <label className="payment-choice"><input type="radio" name="payment" checked={payment === "card"} onChange={() => setPayment("card")} /><span>Credit Card</span><LockSimple size={15} /></label>
                {payment === "card" && <div className="card-fields"><label>Card number<input required inputMode="numeric" defaultValue="4242 4242 4242 4242" /></label><div><label>Name on card<input required defaultValue="Alex Morgan" /></label><label>Expiration<input required defaultValue="04 / 27" /></label><label>CVC<input required defaultValue="123" /></label></div></div>}
                <label className="payment-choice"><input type="radio" name="payment" checked={payment === "paypal"} onChange={() => setPayment("paypal")} /><span>PayPal (demo)</span></label>
              </div>
            </CheckoutSection>
            <button className="place-order" type="submit"><span>Place Demo Order</span><strong>{formatPrice(total)}</strong></button>
            <small className="checkout-legal">By placing your order, you agree that this is a non-commercial demonstration with no real payment.</small>
          </section>
          <aside className="checkout-summary">
            <div className="summary-heading"><h2>Order Summary</h2><Link href="/cart">Edit Cart</Link></div>
            <div className="checkout-lines">{lines.map((line) => { const color = line.product.colors.find((item) => item.name === line.color); return <div key={`${line.slug}-${line.color}`}><div className="checkout-thumb"><Image src={color?.image ?? line.product.image} alt={line.product.name} fill sizes="90px" /><span>{line.quantity}</span></div><div><strong>{line.product.name}</strong><small>{line.product.category}</small><small>{line.color}</small></div><b>{formatPrice(line.product.price * line.quantity)}</b></div>; })}</div>
            <dl><div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div><div><dt>Shipping</dt><dd>{shipping ? formatPrice(shipping) : "Free"}</dd></div><div><dt>Estimated Tax</dt><dd>{formatPrice(tax)}</dd></div><div className="checkout-total"><dt>Total <small>USD</small></dt><dd>{formatPrice(total)}</dd></div></dl>
            <div className="checkout-support"><Truck size={38} weight="light" /><div><strong>Shipping Estimate</strong><p>Orders are prepared within 1–2 business days.</p></div><Check size={34} /><div><strong>Returns</strong><p>30-day returns on eligible items.</p></div><span>?</span><div><strong>Need Help?</strong><p><a href="mailto:igorcorp.tech@gmail.com">igorcorp.tech@gmail.com</a></p></div></div>
          </aside>
        </form>
      </main>
      <Footer />
    </>
  );
}

function CheckoutSection({ number, title, note, children }: { number: string; title: string; note?: string; children: React.ReactNode }) {
  return <section className="checkout-section"><header><span>{number}</span><h2>{title}</h2>{note && <small>{note}</small>}</header>{children}</section>;
}
