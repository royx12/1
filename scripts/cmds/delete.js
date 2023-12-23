module.exports = {
  config: {
    name: "delete",
    aliases: ['del', 'd'],
    version: "1.0",
    author: "AceGerome",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: "Delete File"
    },
    longDescription: {
      vi: "",
      en: "Delete File from Owner provide."
    },
    category: "owner",
    guide: {
      en: "   {pn} <file>"
    }
  },

  onStart: async function ({ api, event, args }) {
    const fs = require('fs');
    const path = require('path');

    const fileName = args[0];

    if (!fileName) {
      api.sendMessage("Please provide a file name to delete.", event.threadID);
      return;
    }

    const filePath = path.join(__dirname, fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        api.sendMessage(`❎ | Failed to delete ${fileName}.`, event.threadID);
        return;
      }
      api.sendMessage(`✅ | Deleted "${fileName}" successfully!`, event.threadID);
    });
  }
};