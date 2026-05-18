import React from "react";

// ✅ FIX: All imports use consistent "../Components/..." (capital C) casing
import AboutPage from "../Components/AboutPage";
import Newsletter from "../Components/Newsletter";
import Products from "../Components/Products";
import ContentSection from "../Components/ContentSection";
import Services from "../Components/Services";
import ServicesExtension from "../Components/ServicesExtension";
import BestSeller from "../Components/BestSeller";
import UserHeader from "./user/UserHeader";
import Cart from "./user/Cart";
import ContactForm from "../Components/ContactForm";
import Layout from "../Components/layout/Layout";

// ✅ FIX: Removed <Hero /> — it's a duplicate header (Logo + Search + Cart bar).
//         UserHeader already provides the full header.
//         Layout (via Nav) adds the top green info bar.
//         Having both Hero + UserHeader showed TWO headers on the page.

// ✅ FIX: Removed <Footer /> from here — Layout already wraps with <Fotter />.
//         Rendering both caused a DOUBLE footer.

const Home = () => {
  return (
    <Layout>
      <UserHeader />
      <ContentSection />
      <Services />
      <BestSeller />
      <ServicesExtension />
      <Cart />
      <Products />
      <AboutPage />
      <Newsletter />
      <ContactForm />
    </Layout>
  );
};

export default Home;