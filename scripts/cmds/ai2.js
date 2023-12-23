const axios = require('axios');

let lastQuery = "";

module.exports = {
  config: {
    name: "aiv2",
    aliases: ['ai2'],
    version: "1.0",
    author: "AceGerome",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Ask Anything."
    },
    longDescription: {
      vi: "",
      en: "Ask Anything."
    },
    category: "ai",
    guide: {
      en: "   {pn} [query]"
    }
  },

	onStart: async function({ api, event, args }) {
	  const ApiName = `hazeyy-api-blackbox.kyrinwu`;
		const { threadID, messageID } = event;

		if (!args[0]) {
			api.sendMessage("😿 Please provide a question or (Query).", threadID, messageID);
			return;
		}

		const query = args.join(" ");

		if (query === lastQuery) {
			api.sendMessage("", threadID, messageID);
			return;
		} else {
			lastQuery = query;
		}

		api.sendMessage("", threadID, messageID);

		try {
			const response = await axios.get(`https://${ApiName}.repl.co/ask?q=${encodeURIComponent(query)}`);

			if (response.status === 200 && response.data && response.data.message) {
				const answer = response.data.message;
				const formattedAnswer = `𝗔𝗜𝘃2 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲: \n\n${answer}`; 
				api.sendMessage(formattedAnswer, threadID, messageID);
			} else {
				api.sendMessage("😿 Sorry, No relevant answer found..", threadID, messageID);
			}
		} catch (error) {
			console.error(error);
			api.sendMessage("😿 Unexpected Error, while searching answer...", threadID, messageID);
			return;
		}
	}
};