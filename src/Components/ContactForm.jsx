import React, { useState } from 'react';
import { Phone, MessageCircle, Timer, Contact } from 'lucide-react';
import './ContactForm.css';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', number: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Simple validation
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch("https://formsubmit.co/ajax/aswinbalajir2004@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          number: form.number,
          message: form.message
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', number: '', message: '' });
        setError(false);
      } else {
        throw new Error('Form not submitted');
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Leave a Message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="number" placeholder="Contact number" value={form.number} onChange={handleChange} />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />

        <button type="submit">SUBMIT</button>

        {/* Message display */}
        {submitted && <p className="status-msg">✅ Message sent successfully!</p>}
        {error && <p className="status-msg" style={{ color: 'red' }}>❌ Submission failed. Try again.</p>}
      </form>

      <div className="contact-info">
        <div className="info-item">
          <Phone />
          <div>
            <p><strong>Phone:</strong>123–456–7890</p>
            <p>Email: abc@gmail.com</p>
          </div>
        </div>
        <div className="info-item">
          <MessageCircle />
          <div>
            <strong>Support 24x7</strong>
            <p>We are always online</p>
          </div>
        </div>
        <div className="info-item">
          <Timer />
          <div>
            <strong>Shop open timing</strong>
            <p>9am – 11pm</p>
          </div>
        </div>
        <div className="info-item">
          <Contact />
          <div>
            <strong>Address 8770 SE17EB</strong>
            <p>London, UK</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
