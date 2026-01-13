"use client";
import React from "react";

export default function WhatsAppButton(props: any) {
  const phone = props.phone || "923099857806";
  const size = props.size || 60;

  function openWhatsApp() {
    const url = `https://wa.me/${phone}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      onClick={openWhatsApp}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed right-6 bottom-6 z-50 flex items-center justify-center rounded-full shadow-2xl p-4 transition-transform hover:scale-110 hover:shadow-[0_0_25px_#25D366]"
      style={{ width: size, height: size, background: "#25D366" }}
    >
      {/* WhatsApp Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width={size * 0.6}
        height={size * 0.6}
      >
        <path d="M20.52 3.48A11.94 11.94 0 0012 .5C6.21.5 1.5 5.21 1.5 11c0 2.01.53 3.88 1.46 5.53L.5 23l6.68-2.06A11.94 11.94 0 0012 22.5c5.79 0 10.5-4.71 10.5-10.5 0-3.01-1.17-5.78-3.98-8.52zM12 20.25c-1.3 0-2.58-.3-3.74-.88l-.27-.14-3.98 1.23 1.2-3.84-.16-.28A8.74 8.74 0 013.25 11C3.25 6.48 6.98 2.75 11.5 2.75S19.75 6.48 19.75 11 16.02 20.25 12 20.25z" />
        <path d="M17.18 14.07c-.28-.14-1.65-.82-1.9-.92-.25-.1-.43-.14-.61.14-.18.28-.7.92-.86 1.11-.16.18-.31.21-.59.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.18-.28.28-.47.1-.18.04-.35-.02-.49-.07-.14-.61-1.48-.84-2.03-.22-.52-.45-.45-.62-.46l-.53-.01c-.18 0-.47.07-.72.35-.25.28-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.67 4.14 1.66.72 2.33.82 3.16.69.51-.08 1.65-.67 1.88-1.32.22-.65.22-1.2.15-1.32-.07-.12-.25-.18-.53-.32z" />
      </svg>

      {/* Pulse Animation */}
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ boxShadow: "0 0 0 8px rgba(37,211,102,0.15)" }}
      />
    </button>
  );
}


