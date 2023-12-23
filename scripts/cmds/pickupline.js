const axios = require("axios");

module.exports = {
  config: {
    name: "pickuplines",
    //aliases: ["pickupline"],
    version: "1.0",
    author: "AceGun | AceGerome",
    countDown: 5,
    role: 0,
    shortDescription: "Get pickup lines",
    longDescription: {
      en: "Get random pickup lines.",
    },
    category: "fun",
    guide: {
      en: "‌ ‌ ‌ {pn}",
    },
  },

  onStart: async function({ api, event }) {
    try {
      const response = await axios.get("https://api.popcat.xyz/pickuplines");
      const { pickupline } = response.data;
      const message = `💘 ${pickupline}`;
      return api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  },
};