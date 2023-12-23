const axios = require("axios");

module.exports = {
  config: {
    name: "dare",
    aliases: [],
    version: "69",
    author: "Ace",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Get random Dare from Dare API"
    },
    longDescription: {
      vi: "",
      en: "Get random Dare from the Official Dare API"
    },
    category: "fun",
    guide: {
      en: "{pn}"
    }
  },
  
  onStart: async function({ api, event }) {
    const ApiName = `sensui-useless-apis.codersensui`;
  try {
    const apiEndpoint = "https://${ApiName}.repl.co/api/fun/dare";
    const response = await axios.get(apiEndpoint);
    const dare = response.data.question;

    const dareMessage = `I dare you to ${dare}`;
    api.sendMessage(dareMessage, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("An error occurred while fetching dare. Please try again later.", event.threadID, event.messageID);
    console.error("Dare API Error:", error.message);
    api.sendMessage("Dare API Error:", error.message, event.threadID, event.messageID);
  }
 } 
};