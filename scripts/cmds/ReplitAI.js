const axios = require("axios");

module.exports = {
  config: {
    name: "ReplitAI",
    aliases: ['replitai'],
    version: "1.0.0",
    author: "Hazeyy | Ace",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: "Interact with Replit-AI."
    },
    longDescription: {
      vi: "",
      en: "Interact with Replit-AI."
    },
    category: "ai - chat",
    guide: {
      en: "   {pn} < query >"
    }
  },
 
  onStart: async function({ api, event, message }) {
  const args = event.body.split(/\s+/);
  args.shift();

  const { threadID, messageID } = event;

  if (!args[0]) {
    message.reply("🖋 Hello, I am Model Chat-Bison Replit AI I'm part of Google a language model trained by Google.\n\nHow may i assist you today?", threadID, messageID);
    return;
  }
  const ApiName = 'hazeyy-api-useless.kyrinwu';
  const input_text = args.join(" ");

  message.reply("🗨 | Replit AI is thinking, Please wait...", threadID, messageID);

  try {
    const response = await axios.get(
    `https://${ApiName}.repl.co/api/replit/ai?input=${encodeURIComponent(input_text)}`
    );

    if (response.data.bot_response.trim() !== "") {
      const formattedResponse = `🎓 Replit ( AI ) \n\n🖋 Title: '${input_text}'\n\n${(response.data.bot_response.trim())}`;
      message.reply(formattedResponse, threadID, messageID);
    } else {
      message.reply("No response found from Replit AI.", threadID, messageID);
    }
  } catch (error) {
    console.error("Error:", error);

    if (error.response && error.response.status === 503) {
      message.reply("The API is unavailable right now. Please try again later.", threadID, messageID);
    } else {
      message.reply("The API is unavailable right now. Please try again later.", threadID, messageID);
    }
  }
 }
};