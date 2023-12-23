const axios = require('axios');

module.exports = {
  config: {
    name: "RexAI",
    aliases: ['rexai'],
    version: "1.0.0",
    author: "August Quinn | Ace",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "RexAI (Reseach-Expert-AI)."
    },
    longDescription: {
      vi: "",
      en: "RexAI (Reseach-Expert-AI)."
    },
    category: "ai - chat",
    guide: {
      en: "{pn} <prompt>"
    }
  },
  
  onStart: async function ({ api, event, args }) {
    const ApiName = `rexai-reseach-expert-ai.august-api`;
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage("Provide a title to proceed.", event.threadID, event.messageID);
    }

    try {
        const response = await axios.post(
        'https://${ApiName}.repl.co/Title', { prompt }
        );
        const responseData = response.data;

        api.sendMessage(`${responseData.google.generated_text}`, event.threadID, event.messageID);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};