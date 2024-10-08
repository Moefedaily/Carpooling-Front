"use client";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import PaymentPage from "@/app/components/ui/paymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentPageWithStripe = () => (
  <Elements stripe={stripePromise}>
    <Header />
    <Hero title="Payment" image="/payment.jpg" />
    <PaymentPage />
    <Footer />
  </Elements>
);

export default PaymentPageWithStripe;
