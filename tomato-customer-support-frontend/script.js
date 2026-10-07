const API_URL = "http://localhost:8080/api/chat";
const CLEAR_URL = "http://localhost:8080/api";

const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");

function addMessage(text, sender) {
  const row = document.createElement("div");
  row.className = `message-row ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "mini-avatar";
  avatar.textContent = sender === "bot" ? "🍅" : "You";

  const content = document.createElement("div");
  content.className = "message-content";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = text;

  const time = document.createElement("span");
  time.className = "time";
  time.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  content.appendChild(bubble);
  content.appendChild(time);
  row.appendChild(avatar);
  row.appendChild(content);
  messages.appendChild(row);

  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage(message) {
  if (!message.trim()) return;

  addMessage(message.trim(), "user");
  input.value = "";
  sendBtn.disabled = true;
  typing.classList.add("show");
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message.trim())
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Your Spring controller returns a plain String.
    const reply = await response.text();
    addMessage(reply, "bot");
  } catch (error) {
    addMessage(
      "Sorry, I couldn't connect to Tomato Support. Please make sure the Spring Boot server is running on port 8080.",
      "bot"
    );
    console.error(error);
  } finally {
    typing.classList.remove("show");
    sendBtn.disabled = false;
    input.focus();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});

document.querySelectorAll(".topic-btn").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.message;
    input.focus();
  });
});

clearBtn.addEventListener("click", async () => {
  try {
    await fetch(CLEAR_URL, { method: "DELETE" });
  } catch (error) {
    console.error("Could not clear server history:", error);
  }

  messages.innerHTML = `
    <div class="message-row bot">
      <div class="mini-avatar">🍅</div>
      <div class="message-content">
        <div class="message-bubble">
          Hello! How can I assist you today with your food order?
        </div>
        <span class="time">Just now</span>
      </div>
    </div>
  `;
  input.focus();
});
