(function () {

    function init(retry = 0) {

        const widget = document.getElementById("mrf-ai-widget");
        const button = document.getElementById("mrf-ai-button");
        const input = document.getElementById("aiMessage");
        const sendBtn = document.getElementById("sendMessage");
        const messages = document.getElementById("mrf-ai-messages");

        if (!widget || !button || !input || !sendBtn || !messages) {

            if (retry < 50) {
                console.log("[AI] waiting for DOM...");
                return setTimeout(() => init(retry + 1), 100);
            }

            console.error("[AI] Widget elements not found.");
            return;
        }

        if (window.__MRF_AI_INITIALIZED__) return;
        window.__MRF_AI_INITIALIZED__ = true;

        console.log("[AI] initialized");

        let opened = false;

        button.addEventListener("click", () => {

            opened = !opened;

            widget.style.display = opened ? "flex" : "none";

            if (opened) {
                setTimeout(() => input.focus(), 100);
            }

        });

        function appendUserMessage(text) {

            messages.insertAdjacentHTML("beforeend", `
                <div class="user-message">${text}</div>
            `);

            messages.scrollTop = messages.scrollHeight;

        }

        function appendBotMessage(text) {

            messages.insertAdjacentHTML("beforeend", `
                <div class="bot-message">${text}</div>
            `);

            messages.scrollTop = messages.scrollHeight;

        }

        async function sendMessage() {

            const text = input.value.trim();

            if (!text) return;

            appendUserMessage(text);

            input.value = "";

            messages.insertAdjacentHTML("beforeend", `
                <div class="bot-message" id="typing">
                    ⏳ Thinking...
                </div>
            `);

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

                document.getElementById("typing")?.remove();

                appendBotMessage(
                    data.reply || "Sorry, I couldn't understand your request."
                );

            } catch (err) {

                document.getElementById("typing")?.remove();

                appendBotMessage("⚠️ AI server is currently unavailable.");

                console.error(err);

            }

        }

        sendBtn.addEventListener("click", sendMessage);

        input.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {
                sendMessage();
            }

        });

    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => init());
    } else {
        init();
    }

})();
