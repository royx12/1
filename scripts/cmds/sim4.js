const axios = require("axios");

module.exports = {
  config: {
    name: "sim4",
    aliases: [],
    version: "1",
    author: "Grey | Ace",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Talk with Simsimi"
    },
    longDescription: {
      vi: "",
      en: "Talk with Simsimi."
    },
    category: "fun",
    guide: {
      en: "   {pn} < text >"
    } 
  },
  
  onStart: async function({ api, event, args }) {
  const ApiName = `api.heckerman06`;
	try {
		let message = args.join(" ");
		if (!message) {
			return api.sendMessage(`Please put Message`, event.threadID, event.messageID);
		}

		const response = await axios.get(`https://${ApiName}.repl.co/api/other/simsimi?message=${message}&lang=ph`);
		const respond = response.data.message;
		api.sendMessage(respond, event.threadID, event.messageID);
	} catch (error) {
		console.error("An error occurred:", error);
		api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
	}
 }
};