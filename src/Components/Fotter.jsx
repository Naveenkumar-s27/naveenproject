import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Fotter = () => {
  return (
    <footer style={styles.footer}>
     
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');`}
      </style>

      <div style={styles.container}>
        
        <div style={styles.column}>
          <div style={styles.logoBox}>
            <div style={styles.logoCircle}>V</div>
            <span style={styles.logoText}>V-Mart</span>
          </div>
          <p style={styles.desc}>Your trusted partner for fresh, organic vegetables.</p>
          <p style={styles.desc}>Quality guaranteed, freshness assured.</p>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.link}><Facebook size={20} /></a>
            <a href="#" style={styles.link}><Instagram size={20} /></a>
            <a href="#" style={styles.link}><Twitter size={20} /></a>
          </div>
        </div>

        
        <div style={styles.column}>
          <h3 style={styles.heading}>Quick Links</h3>
          <ul style={styles.list}>
            <li><a href="#" style={styles.link}>About Us</a></li>
            <li><a href="#" style={styles.link}>Our Products</a></li>
            <li><a href="#" style={styles.link}>Delivery Info</a></li>
            <li><a href="#" style={styles.link}>Privacy Policy</a></li>
            <li><a href="#" style={styles.link}>Terms of Service</a></li>
          </ul>
        </div>

        
        <div style={styles.column}>
          <h3 style={styles.heading}>Categories</h3>
          <ul style={styles.list}>
            <li><a href="#" style={styles.link}>Leafy Greens</a></li>
            <li><a href="#" style={styles.link}>Root Vegetables</a></li>
            <li><a href="#" style={styles.link}>Organic Produce</a></li>
            <li><a href="#" style={styles.link}>Seasonal Specials</a></li>
            <li><a href="#" style={styles.link}>Bulk Orders</a></li>
          </ul>
        </div>

        
        <div style={styles.column}>
          <h3 style={styles.heading}>Contact Info</h3>
          <ul style={styles.list}>
            <li><a href="#" style={styles.link}><MapPin size={16} /> 123 Fresh Street, Green City, GC 12345</a></li>
            <li><a href="#" style={styles.link}><Phone size={16} /> +1 (555) 123-4567</a></li>
            <li><a href="#" style={styles.link}><Mail size={16} /> hello@v-mart.com</a></li>
            <li><a href="#" style={styles.link}><Clock size={16} /> Mon–Sat: 8AM–8PM</a></li>
          </ul>
        </div>
      </div>

     
      <div style={styles.bottomRow}>
        <span>Copyrights © 2025 V-Mart. All rights reserved.</span>
        <span>Made with <span style={styles.heart}>❤️</span> for fresh food lovers</span>
      </div>
    </footer>
  );
};


const styles = {
  footer: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f8f8f8",
    padding: "3rem 1rem 1rem",
    fontSize: "14px",
    color: "#555",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "2rem",
  },
  column: {
    flex: "1 1 200px",
    minWidth: "200px",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  logoCircle: {
    backgroundColor: "green",
    color: "white",
    fontWeight: "bold",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "0.5rem",
  },
  logoText: {
    fontWeight: "600",
    fontSize: "1.2rem",
    color: "#333",
  },
  desc: {
    margin: "0.25rem 0",
    color: "#555",
  },
  socialIcons: {
    marginTop: "0.5rem",
    display: "flex",
    gap: "0.5rem",
  },
  heading: {
    fontWeight: "600",
    marginBottom: "0.75rem",
    color: "#000",
  },
  list: {
    listStyle: "none",
    padding: 0,
    lineHeight: "1.8",
  },
  link: {
    color: "#555",
    textDecoration: "none",
  },
  bottomRow: {
    borderTop: "1px solid #ccc",
    marginTop: "2rem",
    paddingTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    fontSize: "13px",
    color: "#777",
    gap: "1rem",
  },
  heart: {
    color: "red",
    margin: "0 4px",
  },
};

export default Fotter;
