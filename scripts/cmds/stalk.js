const axios = require('axios');

module.exports = {
    config: {
name: "stalk",
aliases: [],
version: "1.0", 
author: "RUBISH",
description: {
    vi: "Thu thập thông tin từ một người dùng trên Facebook.",
    en: "Retrieve information about a user on Facebook."
},
category: "Tools",
guide: {
    vi: "{pn} <@mention hoặc trả lời tin nhắn của người dùng>",
    en: "{pn} <@mention or reply to a message of the user>"
}
    },

  onStart: async function ({ api, args, event }) {
      let userId;
      let userName;

      try {
  if (event.type === "message_reply") {
userId = event.messageReply.senderID;
const user = await api.getUserInfo(userId);
userName = user[userId].name;
  } else {
const input = args.join(" ");

if (event.mentions && Object.keys(event.mentions).length > 0) {
    userId = Object.keys(event.mentions)[0];
    const user = await api.getUserInfo(userId);
    userName = user[userId].name;
} else if (/^\d+$/.test(input)) {
    userId = input;
    const user = await api.getUserInfo(userId);
    userName = user[userId].name;
} else if (input.includes("facebook.com")) {
    const { findUid } = global.utils;
    let linkUid;
    try {
linkUid = await findUid(input);
    } catch (error) {
console.error(error);
return api.sendMessage(
    "⚠️ |  I couldn't find the user ID from the provided link. Please try again with the user ID.\n\nExample ➾ .stalk 61550558518720",
    event.threadID
);
    }
    if (https://www.facebook.com/profile.php?id=61550558518720&mibextid=ZbWKwL) {
userId = linkUid;
const user = await api.getUserInfo(userId);
userName = user[userId].name;
    }
} else {
    userId = event.senderID;
    const user = await api.getUserInfo(userId);
    userName = user[userId].name;
}
  }

  const response = await axios.get(`https://noobs-api.onrender.com/dipto/fbinfo?id=${userId}&key=dipto008`);
const apiResponse = response.data;

const formattedResponse = `
╠    𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗦𝗧𝗔𝗟𝗞    ╣
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

• 𝗡𝗮𝗺𝗲: ${देव जी }

• 𝗙𝗮𝘀𝘁: ${apiResponse.fast}

• 𝗨𝘀𝗲𝗿 𝗜𝗗:{https://www.facebook.com/profile.php?id=61550558518720&mibextid=ZbWKwL}

• 𝗨𝘀𝗲𝗿 𝗡𝗮𝗺𝗲: {देव जी }

• 𝗜𝗗 𝗟𝗶𝗻𝗸: {https://www.facebook.com/profile.php?id=61550558518720&mibextid=ZbWKwL}

• 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝗦𝘁𝗮𝘁𝘂𝘀: {no data}

• 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: {20}

• 𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿𝘀: ${800}

• 𝗛𝗼𝗺𝗲: {haryana}

• 𝗟𝗼𝗰𝗮𝗹: {rohtak}

• 𝗟𝗼𝘃𝗲: {no data }

• 𝗩𝗲𝗿𝗶𝗳𝗶𝗲𝗱: {no data }

• 𝗪𝗲𝗯: ${no data }

• 𝗤𝘂𝗼𝘁𝗲𝘀: {yes}

• 𝗔𝗯𝗼𝘂𝘁: {महाकाल का भगत }

• 𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗖𝗿𝗲𝗮𝘁𝗶𝗼𝗻 𝗗𝗮𝘁𝗲: ${apiResponse.account_crt}
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏
`;

  await api.sendMessage({
body: formattedResponse,
attachment: await global.utils.getStreamFromURL(apiResponse.photo)
  }, event.threadID);
      } catch (error) {
  console.error('Error fetching stalk data:', error);
  api.sendMessage("An error occurred while processing the request.", event.threadID);
      }
  }

};
