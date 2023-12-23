module.exports = {
  config: {
    name: "confessv2",
    aliases: ["confessv2"],
    version: "1.1", 
    author: "Ace Gerome",
    countDown: 5,
    role: 0,
    shortDescription: "Confess your feelings.",
    longDescription: "Confess your feelings to sendnthe messages you confess.",
    category: "fun",
    guide: "{pn} <uid> <message>", // Updated guide
  },
  onStart: async function ({ api, event, args }) {
    if (args.length < 2) {
      api.sendMessage("Invalid Format. Use: /confess <uid> <message>", event.threadID, event.messageID);
      return;
    }

    const idbox = args[0];
    const reason = args.slice(1).join(" ");

    const confessionMessage = `Confession Time\n\n🫥 *Someone Confessed to you:* 🫥\n\n${reason}`;

    api.sendMessage(confessionMessage, idbox, () => {
      const youSentMessage = `Confession Sent\n\nYou Sent:\n\n${reason}`;
      api.sendMessage(`${api.getCurrentUserID()}`, () => {
        api.sendMessage(youSentMessage, event.threadID);
      });
    });
  }
};