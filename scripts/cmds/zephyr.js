const axios = require("axios");

module.exports = {
  config: {
    name: "zephyr",
    //aliases: ['zephyr'],
    version: "1.0.0",
    author: "KENLIEPLAYS | Ace",//converted by Ace
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Ask anything in GPTGO by KENLIEPLAYS."
    },
    longDescription: {
      vi: "",
      en: "Ask anything in GPTGO by KENLIEPLAYS."
    },
    category: "AI",
    guides: {
      en: "   {pn} < question >"
    }
  }, 
  
  onStart: async function({ api, event, args }) {  
    let { messageID, threadID, senderID, body } = event;
    const ApiName = `ai.easy-api`;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("Please provide a question.", tid, mid);
    try {
        const res = await axios.get(
        `https://${ApiName}.repl.co/api/zephyr?query=${content}`
        );
        const respond = res.data.content;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
     }
  }
};