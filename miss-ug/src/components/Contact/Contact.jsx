import React, { useState } from "react";
import "./Contact.css";

const ContactUs = () => {
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const handleSendMessage = () => {
    if (userMessage.trim() === "") return;
    const newMessages = [...chatMessages, { sender: "user", text: userMessage }];
    setChatMessages(newMessages);
    setUserMessage("");

    setTimeout(() => {
      const botResponse = "Thank you for reaching out! We'll get back to you soon.";
      setChatMessages([...newMessages, { sender: "bot", text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="contact-section">
      <div className="contact-header">
        <p className="contact-tagline">Contact Us</p>
        <h1>SUBMIT YOUR QUESTION</h1>
        <p className="contact-desc">
          For franchising, partnerships and other business requests, please use our
        </p>
        <a href="/become-a-partner" className="partner-button">BECOME OUR PARTNER →</a>
      </div>

      <div className="form-chat-wrapper">
        {/* Contact Form */}
        <form className="contact-form">
          <div className="row">
            <input type="text" placeholder="Name*" required />
            <input type="text" placeholder="Last Name*" required />
          </div>
          <div className="row">
            <input type="email" placeholder="Email*" required />
            <select required>
              <option value="">Purpose of Inquiry*</option>
              <option value="sponsorship">Sponsorship</option>
              <option value="franchise">Franchise</option>
              <option value="media">Media</option>
            </select>
          </div>
          <label>Message</label>
          <textarea placeholder="Type your message here..." required />
          <button type="submit" className="submit-btn">SUBMIT →</button>
        </form>

        {/* Chatbot */}
        <div className="chatbot-container">
          <h3>Live Chat</h3>
          <div className="chat-box">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
