import React from "react";
import AboutPage from "../Components/AboutPage";
import Newsletter from "../Components/Newsletter";
import Products from "../Components/Products";
import ContentSection from "../Components/ContentSection";
import Services from "../Components/Services";
import ServicesExtension from "../Components/ServicesExtension";
import BestSeller from "../Components/BestSeller";
import UserHeader from "../Components/user/UserHeader.jsx";
import Cart from "../Components/user/Cart.jsx";
import Wishlist from "../Components/user/Wishlist.jsx";


import ContactForm from "../Components/ContactForm.jsx";
import Layout from "../Components/layout/Layout";

const Home = () => {
  return (
    <Layout>
      <Cart />
      <Wishlist />
      <UserHeader />
      <ContentSection />
      <Services />
      <BestSeller />
      <ServicesExtension />
      <Products />
      <div id="about-section"><AboutPage /></div>
      <Newsletter />
      <ContactForm />
    </Layout>
  );
};

export default Home;