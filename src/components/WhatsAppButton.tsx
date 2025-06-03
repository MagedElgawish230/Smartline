import React from "react";

const WHATSAPP_NUMBER = "+201044967896"; // Replace with your number

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: "fixed",
      bottom: "24px",
      right: "24px",
      zIndex: 1000,
      background: "#25D366",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      cursor: "pointer",
      animation: "whatsapp-float 2.5s ease-in-out infinite alternate"
    }}
    aria-label="Contact us on WhatsApp"
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.34 7.09L4 29l7.18-2.31A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.89-.52-5.54-1.5l-.39-.23-4.29 1.38 1.4-4.17-.25-.4A9.94 9.94 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.22.69.24 1.23.38 1.65.49.69.18 1.32.16 1.82.1.56-.07 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
    </svg>
    <style>{`
      @keyframes whatsapp-float {
        0% { transform: translateY(0); }
        100% { transform: translateY(-18px); }
      }
    `}</style>
  </a>
);

export default WhatsAppButton; 