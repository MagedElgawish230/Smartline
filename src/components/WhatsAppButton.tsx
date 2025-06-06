import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '201044967896'; // WhatsApp number for Smartline
  const message = 'Hello! I have a question about Smartline.'; // Customize the default message

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton; 