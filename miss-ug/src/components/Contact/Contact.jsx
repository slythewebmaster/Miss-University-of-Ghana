import React, { useState } from "react";
import "./Contact.css";

const ContactUs = () => {
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const handleSendMessage = () => {
    if (userMessage.trim() === "") return;

    // Add user's message to chat
    const newMessages = [...chatMessages, { sender: "user", text: userMessage }];
    setChatMessages(newMessages);
    setUserMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = "Thank you for reaching out! We'll get back to you soon.";
      setChatMessages([...newMessages, { sender: "bot", text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="contact-container">
      {/* Contact Form Section */}
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form>
          <label>Name:</label>
          <input type="text" name="name" required />

          <label>Email:</label>
          <input type="email" name="email" required />

          <label>Message:</label>
          <textarea name="message" required />

          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Chatbot Section */}
      <div className="chatbot">
        <h2>Chat with Us</h2>
        <div className="chat-box">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
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
  );
};

export default ContactUs;
