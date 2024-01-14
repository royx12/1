const axios = require('axios');

const GPT_API_URL = 'https://sandipapi.onrender.com/gpt';
const PREFIXES = ['ai', '-ai', '!ai', '*ai'];

module.exports = {
  config: {
    name: "ai",
    version: 1.0,
    author: "Eldwin x Sandipapi", 
    role: 0,
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{pn} questions",
    },
  },
  onStart: async function () {
    // Initialization logic if needed
  },
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = PREFIXES.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (!prompt) {
        const defaultMessage = getCenteredHeader("𝗘𝗟 𝗕𝗢𝗧 🤖") + "\n\nKindly provide the question at your convenience and I shall strive to deliver an effective response. Your satisfaction is my top priority.";
        await message.reply(defaultMessage);
        return;
      }

      await message.reply("Answering your question. Please wait a moment...");

      const answer = await getGPTResponse(prompt);

      // Adding header to the answer
      const answerWithHeader = getCenteredHeader("𝗘𝗟 𝗕𝗢𝗧 🤖") + "\n\n" + answer;
      
      await message.reply(answerWithHeader);
    } catch (error) {
      console.error("Error:", error.message);
      // Additional error handling if needed
    }
  }
};

function getCenteredHeader(header) {
  const totalWidth = 32; // Adjust the total width as needed
  const padding = Math.max(0, Math.floor((totalWidth - header.length) / 2));
  return " ".repeat(padding) + header;
}

async function getGPTResponse(prompt) {
  // Implement caching logic here

  const response = await axios.get(`${GPT_API_URL}?prompt=${encodeURIComponent(prompt)}`);
  return response.data.answer;
        }
