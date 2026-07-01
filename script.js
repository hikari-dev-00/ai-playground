const messages = [];

const button = document.getElementById("button");
const input = document.getElementById("input");
const output = document.getElementById("output");

function renderMessages() {
  output.innerHTML = "";

  messages.forEach((message) => {
    if (message.role === "user") {
      output.innerHTML += `
        <div class="user-message">👤 ${message.content}</div>
      `;
    } else {
      output.innerHTML += `
        <div class="ai-message">🤖 ${message.content}</div>
      `;
    }
  });

  output.scrollTop = output.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  messages.push({
    role: "user",
    content: text
  });

  messages.push({
    role: "assistant",
    content: "考え中..."
  });

  renderMessages();

  input.value = "";
  input.focus();

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    messages[messages.length - 1].content = data.reply;
    renderMessages();

  } catch (error) {
    messages[messages.length - 1].content =
      "エラーが起きました。サーバーが起動しているか確認してね。";
    renderMessages();
  }
}

button.addEventListener("click", () => {
  sendMessage();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});