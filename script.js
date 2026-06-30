const messages = [];
const knowledge = {
  "旅行": "旅行ステキだね🛫 次の行き先はどこにする？",
  "ヨガ": "ヨガいいね🧘 今日も自分の体を労われたかな？",
  "副業": "いいね！まずは小さく試してみよう💡",
  "AI": "AIって本当に面白いよね🤖 何を作ってみたい？",
  "プログラミング": "一歩ずつ進めば大丈夫！昨日の自分より1つできることが増えれば十分😊",
  "JavaScript": "JavaScriptはWebアプリの頭脳だよ🧠",
  "Git": "コミットしてから進もう！が合言葉😎",
  "GitHub": "公開できると一気に作品感が出るよ✨",
  "仕事": "仕事のこと考えてるんだね。何が一番モヤモヤしてる？",
  "疲れた": "今日はここまで頑張ったね☕ 少し休憩しよう。",
  "眠い": "眠い日は無理しないのも大事😴",
  "映画": "最近観た映画で一番良かった作品は？🎬",
  "猫": "猫は正義🐈 どんな猫が好き？",
  "犬": "犬も癒されるよね🐶",
  "ワイン": "今日は赤？白？泡？🍷",
  "コーヒー": "コーヒー派？それとも今日はデカフェ？☕",
  "料理": "今日のご飯は何作る予定？🍳",
  "パスタ": "パスタ大好き🍝 オイル系？トマト系？",
  "ラーメン": "ラーメンは罪だけど幸せ🍜",
  "ゲーム": "最近何かゲームしてる？🎮",
  "音楽": "何を聴きながら作業してるの？🎧",
  "こんにちは": [
    "こんにちは！今日も小さく試していこう😊",
    "やあ！今日も来てくれてありがとう✨",
    "こんにちは！今日は何を作ろうか？🚀",
    "おかえり！開発の時間だね😆"],
  "こんばんは": "こんばんは🌙 今日もお疲れさま！",
  "ありがとう": [
    "どういたしまして😊",
    "そう言ってもらえると嬉しい！",
    "また話しかけてね✨"],
  "すごい": "ありがとう！一緒に作ってる成果だね✨",
  "わからない": "それで大丈夫😊 一緒に一歩ずつ考えよう。",
  "勉強": "焦らなくて大丈夫。作りながら覚えるのが一番早いよ📚",
  "ChatGPT": [
    "本家にはまだ勝てないけど頑張ってる🤖",
    "まだ修行中です😂"],
  "エラー": [
    "エラーは敵じゃなくてヒント💡",
    "まずは落ち着いてエラーメッセージを読もう！"]
};
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

  for (const keyword in knowledge) {
    if (text.includes(keyword)) {
      const response = knowledge[keyword];

      if (Array.isArray(response)) {
        const randomIndex = Math.floor(Math.random() * response.length);
        reply = response[randomIndex];
      } else {
        reply = response;
      }
      break;
    }
  }

  if (reply === "") {
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

  let index = 0;

  const intervalId = setInterval(() => {
    messages[messages.length - 1].content = reply.slice(0, index + 1);
    renderMessages();

    index++;

    if (index >= reply.length) {
      clearInterval(intervalId);
    }
  }, 50);

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