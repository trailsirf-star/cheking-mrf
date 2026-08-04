const widget = document.getElementById("mrf-ai-widget");
const button = document.getElementById("mrf-ai-button");
const input = document.getElementById("aiMessage");
const sendBtn = document.getElementById("sendMessage");
const messages = document.getElementById("mrf-ai-messages");

let opened = false;

button.addEventListener("click", () => {

    opened = !opened;

    if (opened) {

        widget.style.display = "flex";

        setTimeout(() => {

            input.focus();

        }, 150);

    } else {

        widget.style.display = "none";

    }

});

function appendUserMessage(text) {

    messages.innerHTML += `
        <div class="user-message">
            ${text}
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

}

function appendBotMessage(text) {

    messages.innerHTML += `
        <div class="bot-message">
            ${text}
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

}

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

        document.getElementById("typing")?.remove();

        appendBotMessage(
            data.reply || "Sorry, I couldn't understand your request."
        );

    }

    catch (err) {

        document.getElementById("typing")?.remove();

        appendBotMessage(
            "⚠️ AI server is currently unavailable."
        );

        console.error(err);

    }

}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});