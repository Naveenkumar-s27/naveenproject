const Contact = () => {
  return (
    <div>
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Your Name" />
        <br />
        <input type="email" placeholder="Your Email" />
        <br />
        <textarea placeholder="Your Message"></textarea>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default Contact;
