const axios = require('axios');

module.exports = {
  config: {
    name: "api",
    aliases: ['api'],
    author: "AceGerome",
    countDown: 5,
    role: 0,
    category: "other",
    guide: {
      en: "   {pn}"
    } 
  },

onStart: async function({ api, event, message }) {
  try {
    const apiUrl = "https://api.publicapis.org/random";
    const res = await axios.get(apiUrl);
    const random = res.data.entries[0];
    const msg = `Public API Entry:\n\n» Title: ${random.API}\n» Description: ${random.Description}\n» URL: ${random.Link}`;
    message.reply(msg, event.threadID, event.messageID);
  } catch (e) {
    console.error("Error fetching random Public API entry:", e);
    message.reply("Error fetching random Public API entry. Please try again later.", event.threadID, event.messageID);
  }
 }
};