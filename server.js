require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

// index.html / style.css / script.js を配信する
app.use(express.static("."));

// ChatGPTにメッセージを送るAPI
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.responses.create({
      model: "gpt-4.1-nano",
      input: userMessage,
    });

    res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "ChatGPT APIでエラーが起きました",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});