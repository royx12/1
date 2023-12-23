const axios = require('axios');

module.exports = {
  config: {
    name: "prompt",
    aliases: ['prompt'],
    version: "1.0",
    author: "JARif | Ace",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Get a Mid journey prompts."
    },
    longDescription: {
      vi: "",
      en: "Get a Mid journey prompts."
    },
    category: "IMAGE",
    guide: {
      en: "   {pn} - reply to an image."
        + "\n {pn} <yourPrompt>"
    }
  },
  
  onStart: async function ({ message, event, args, api }) {
    try {
      const prompt = args.join(" ");
      let imageUrl;

      if (event.type === "message_reply") {
        if (["photo", "sticker"].includes(event.messageReply.attachments[0]?.type)) {
          imageUrl = event.messageReply.attachments[0].url;
        } else {
          return api.sendMessage({ body: "You must be reply to an image." }, event.threadID);
        }
      } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
        imageUrl = args[0];
      } else if (!prompt) {
        return api.sendMessage({ body: "Reply to an image or provide a prompt." }, event.threadID);
      }

      if (imageUrl) {
        const response = await axios.get(
        `https://www.api.vyturex.com/prompt?khankir_chele=${encodeURIComponent(imageUrl)}`
        );
        const description = response.data;

        await message.reply(description);
      } else if (prompt) {
        const response = await axios.get(
        `https://www.api.vyturex.com/promptgen?content=${encodeURIComponent(prompt)}`
        );
        const prompt = response.data;

        await message.reply(prompt);
      }
    } catch (error) {
     message.reply(`${error}`);
    }
  }
};