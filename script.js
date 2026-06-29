const button = document.getElementById("button");
const input = document.getElementById("input");
const output = document.getElementById("output");

function sendMessage() {
  const text = input.value;

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

  output.textContent +=
    "👤 " + text +
    "\n🤖 " + reply +
    "\n\n";

  input.value = "";
}

button.addEventListener("click", () => {
  sendMessage();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Enterで改行しない
    sendMessage();
  }
});