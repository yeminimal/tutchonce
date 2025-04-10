document.addEventListener("DOMContentLoaded", () => {
  // Floating Chat Icon Logic
  const chatIcon = document.getElementById("chatIcon");
  const chatModal = document.getElementById("chatModal");
  const closeModal = document.getElementById("closeModal");

  if (chatIcon && chatModal && closeModal) {
    chatIcon.addEventListener("click", () => {
      chatModal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
      chatModal.style.display = "none";
    });
  } else {
    console.error("Chatbot elements not found in the DOM.");
  }

  // Pricing Data
  const pricingData = {
    "Post-construction cleaning": { range: [400000, 450000] },
    "Residential cleaning": { range: [100000, 250000] },
    "Commercial cleaning": { range: [200000, 400000] },
    "Move-in/Move-out cleaning": { range: [150000, 250000] },
    "Deep cleaning": { range: [200000, 350000] },
    "Fumigation": { range: [200000, 300000] },
    "Janitorial services": { range: [100000, 250000] },
    "Event clean-up": { range: [150000, 300000] },
    "Facility maintenance": { range: [150000, 450000] },
    "Custom cleaning request": { range: [0, 0] }
  };

  // Get Quote Button Logic
  const getQuoteBtn = document.getElementById("getQuote");
  if (getQuoteBtn) {
    getQuoteBtn.addEventListener("click", () => {
      const serviceType = document.getElementById("serviceType").value;
      const priceRange = pricingData[serviceType]?.range;

      if (!priceRange || priceRange[0] === 0) {
        alert("This service requires a custom quote. Click 'Request Custom Quote' to chat with us on WhatsApp.");
      } else {
        alert(
          `Estimated cost for ${serviceType} is between ₦${priceRange[0].toLocaleString()} – ₦${priceRange[1].toLocaleString()} depending on the size and scope.`
        );
      }
    });
  }

  import { supabase } from './supabaseClient.js'; // if you're using ES modules

// Inside each button handler:
await supabase.from('quote_requests').insert([
  {
    service: serviceType,
    room_size: roomSize,
    special_request: specialRequest,
    is_custom: true, // or false if from "Get Instant Quote"
  },
]);
  
  // Custom Quote Button Logic
  const customQuoteBtn = document.getElementById("customQuote");
  if (customQuoteBtn) {
    customQuoteBtn.addEventListener("click", () => {
      const serviceType = document.getElementById("serviceType").value;
      const roomSize = document.getElementById("roomSize").value || "N/A";
      const specialRequest = document.getElementById("specialRequest").value || "N/A";

      const message = `Hello Tutchonce, I'm interested in your ${serviceType} service. Room Size: ${roomSize}. Special Request: ${specialRequest}. Could you provide me with a quotation?`;
      const whatsappURL = `https://wa.me/+2348025058426?text=${encodeURIComponent(message)}`;

      window.location.href = whatsappURL;
    });
  }
});
