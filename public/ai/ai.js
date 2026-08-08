// MRFSMS AI Widget - Robust Initialization
// No top-level DOM access. Safe for dynamic injection.

let aiInitialized = false;
let initRetries = 0;
const MAX_RETRIES = 50;
const RETRY_DELAY = 100;

function initializeAI() {
  // Check if already initialized
  if (aiInitialized) {
    console.log("[AI] already initialized, skipping");
    return;
  }

  // Query all required elements
  const button = document.getElementById("mrf-ai-button");
  const widget = document.getElementById("mrf-ai-widget");
  const input = document.getElementById("aiMessage");
  const sendBtn = document.getElementById("sendMessage");
  const messages = document.getElementById("mrf-ai-messages");

  // Check for missing elements
  if (!button || !widget || !input || !sendBtn || !messages) {
    initRetries++;
    
    if (initRetries > MAX_RETRIES) {
      console.error("[AI] initialization failed after 50 retries. Missing elements:");
      if (!button) console.error("[AI] - #mrf-ai-button not found");
      if (!widget) console.error("[AI] - #mrf-ai-widget not found");
      if (!input) console.error("[AI] - #aiMessage not found");
      if (!sendBtn) console.error("[AI] - #sendMessage not found");
      if (!messages) console.error("[AI] - #mrf-ai-messages not found");
      return;
    }

    console.log(`[AI] waiting for DOM... (retry ${initRetries}/${MAX_RETRIES})`);
    setTimeout(initializeAI, RETRY_DELAY);
    return;
  }

  // Mark as initialized to prevent duplicate listeners
  aiInitialized = true;
  console.log("[AI] initialized");

  // Widget toggle state
  let opened = false;

  // Button click handler - toggle widget
  const handleButtonClick = () => {
    opened = !opened;
    
    if (opened) {
      widget.style.display = "flex";
      setTimeout(() => {
        input.focus();
      }, 150);
    } else {
      widget.style.display = "none";
    }
  };

  // Append user message to chat
  function appendUserMessage(text) {
    messages.innerHTML += `
      <div class="user-message">
        ${escapeHtml(text)}
      </div>
    `;
    messages.scrollTop = messages.scrollHeight;
  }

  // Append bot message to chat
  function appendBotMessage(text) {
    messages.innerHTML += `
      <div class="bot-message">
        ${text}
      </div>
    `;
    messages.scrollTop = messages.scrollHeight;
  }

  // HTML escape to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Send message to AI API
  async function sendMessage() {
    const text = input.value.trim();
    
    if (!text) return;

    appendUserMessage(text);
    input.value = "";

    messages.innerHTML += `
      <div class="bot-message" id="typing">
        ⏳ Thinking...
      </div>
    `;
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text
        })
      });

      const data = await res.json();
      const typingEl = document.getElementById("typing");
      if (typingEl) typingEl.remove();

      appendBotMessage(
        data.reply || "Sorry, I couldn't understand your request."
      );
    } catch (err) {
      const typingEl = document.getElementById("typing");
      if (typingEl) typingEl.remove();
      
      appendBotMessage(
        "⚠️ AI server is currently unavailable."
      );
      console.error("[AI] API error:", err);
    }
  }

  // Register event listeners
  button.addEventListener("click", handleButtonClick);
  sendBtn.addEventListener("click", sendMessage);
  
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

// Start initialization when script loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAI);
} else {
  // DOM already loaded
  initializeAI();
}

