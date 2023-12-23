module.exports = {
  config: {
    name: "tid",
    version: "1.1",
    author: "LiANE",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "see thread id"
    },
    longDescription: {
      en: "see thread ID of your gc"
    },
    category: "INFO"
  },
  onStart: async function({ message, event }) {
    message.reply(`
${event.threadID.toString()}`);
  }
};