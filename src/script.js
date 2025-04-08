document.addEventListener("DOMContentLoaded", () => {
  // Floating Chat Icon Logic
  const chatIcon = document.getElementById("chatIcon");
  const chatModal = document.getElementById("chatModal");
  const closeModal = document.getElementById("closeModal");

  if (chatIcon && chatModal && closeModal) {
    // Open Chat Modal
    chatIcon.addEventListener("click", () => {
      chatModal.style.display = "flex";
    });

    // Close Chat Modal
    closeModal.addEventListener("click", () => {
      chatModal.style.display = "none";
    });
  } else {
    console.error("Chatbot elements not found in the DOM.");
  }
});

  // Get Quote Button Logic
  const getQuoteBtn = document.getElementById("getQuote");
  getQuoteBtn.addEventListener("click", () => {
    const serviceType = document.getElementById("serviceType").value;
    const pricingData = {
      "Post-construction cleaning": { range: [400000, 450000] },
      Fumigation: { range: [130000, 170000] },
    };
    const priceRange = pricingData[serviceType].range;
    alert(
      `Estimated cost for ${serviceType} is between ₦${priceRange[0].toLocaleString()} – ₦${priceRange[1].toLocaleString()} depending on the size and scope.`
    );
  });

  // Custom Quote Button Logic
  const customQuoteBtn = document.getElementById("customQuote");
  customQuoteBtn.addEventListener("click", () => {
    const serviceType = document.getElementById("serviceType").value;
    const roomSize = document.getElementById("roomSize").value || "N/A";
    const specialRequest =
      document.getElementById("specialRequest").value || "N/A";

    const message = `Hello Tutchonce, I'm interested in your ${serviceType} service. Room Size: ${roomSize}. Special Request: ${specialRequest}. Could you provide me with a quotation?`;
    const whatsappURL = `https://wa.me/+2348025058426?text=${encodeURIComponent(
      message
    )}`; // Replace with your actual business number

    window.location.href = whatsappURL;
  });
});
