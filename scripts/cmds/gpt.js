const axios = require('axios');

module.exports = {
  config: {
    name: "gpt",
    version: "1.0.0",
    role: 0,
    author: "Eldwin | Unknown",
    credits: "minn",
    shortDescription: "Chat with CatGPT", 
    longDescription: "Chat with CatGPT",
    category: "ai",
  },
  
  onChat: async function () {},
  onStart: async function ({ api, event, args, message }) {
    const input = event.body;
    if (input && (input.trim().toLowerCase().startsWith(`Cat`))) {
      const data = input.split(" ");
      data.shift();
      const q = data.join(" ");
      if (!q) {
        return message.reply(`😾 Kindly provide a question or query!`);
      }

      try {
        const stopTyping = api.sendTypingIndicator(event.threadID);
        await message.reply(`😼 | CAT is thinking...`);
        const response = await axios.post("https://catgpt.guru/api/chat", {
          messages: [
            {
              role: "user",
              content: q,
            },
          ],
        });
        const catResponse = response.data;
        stopTyping();
        message.reply(`🐱 Cat` + catResponse, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
          });
        });
      } catch (error) {
        console.error(error);
        message.reply('catgpt didn\'t meow back😿');
      }
    }
  },
  onReply: async function ({ message, event, Reply, args, api }) {
    let { author, commandName } = Reply;
    if (event.senderID !== author) return;
    const q = args.join(" ");
    try {
      const stopTyping = api.sendTypingIndicator(event.threadID);

      const response = await axios.post("https://catgpt.guru/api/chat", {
        messages: [
          {
            role: "user",
            content: q,
          },
        ],
      });
      const catResponse = response.data;
      stopTyping();
      message.reply(`🐱 Cat` + catResponse, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
        });
      });
    } catch (error) {
      console.error(error);
      message.reply('catgpt didn\'t meow back😿');
    }
  },
};
