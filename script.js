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

function sendMessage() {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  let reply = "";

  if (text.includes("こんにちは")) {
    reply = "こんにちは！今日も小さく試していこう😊";
  } else if (text.includes("疲れた")) {
    reply = "おつかれさま。今日は無理せず、まずは一息つこう☕";
  } else if (text.includes("仕事")) {
    reply = "仕事のこと考えてるんだね。まずは何がモヤモヤしてるか書き出してみよう。";
  } else if (text.includes("ワイン")) {
    reply = "ワインいいね🍷 白？赤？泡？今日はどんな気分？";
  } else {
    reply = `なるほど。「${text}」について考えているんだね。まずは小さく試してみよう！`;
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

  setTimeout(() => {
    messages[messages.length - 1].content = reply;
    renderMessages();
  }, 800);

  input.value = "";
  input.focus();
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