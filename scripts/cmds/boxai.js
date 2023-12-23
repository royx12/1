const axios = require('axios');
const Prefixes = [
  'box',
];

module.exports = {
  config: {
    name: 'BoxAI',
    version: '1.0',
    author: 'AceGerome', // do not change
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks a response from BoxAI.',
    },
    longDescription: {
      en: 'Asks a response from BoxAI based on user-provided.',
    },
    guide: {
      en: 'Box <query> — No prefix',
    },
  },
  
  onStart: async function() {},
  onChat: async function({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return;
      }
      let query = event.body.substring(prefix.length);
      
      if (query === '') {
        await message.reply("😿 Please provide a question or (Query).");
        return;
      }
      
      await message.reply("BoxAI is searching, please wait...");
      
      const response = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${encodeURIComponent(query)}`);
      
      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }
      
      const messageText = response.data.content.trim();
      
      await message.reply(messageText);
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(`${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`, event.threadID);
    }
  },
};